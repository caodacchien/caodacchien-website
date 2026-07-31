import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  articleFrontmatterSchema,
  formatIssues,
  readRawScalar,
  DATE_FIELDS,
  type ArticleFrontmatter,
} from "./writing.schema.ts";
import {
  FEATURED_WRITING_MIN,
  type ArticleMeta,
  type ArticleSource,
} from "./writing.ts";

// Lớp đọc nội dung Writing — SERVER-ONLY.
// Dùng `node:fs`, nên bất kỳ import nào từ client component sẽ fail lúc build.
// Không thêm package `server-only` (một dependency nữa) khi `node:fs` đã tự chặn.
//
// Module boundary: nơi này trả OBJECT THƯỜNG đã validate + MDX THÔ.
// KHÔNG bao giờ trả React element đã compile. Việc compile một thân bài thuộc
// checkpoint route bài viết (Checkpoint B).

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");
const FILE_SUFFIX = ".vi.mdx";

/**
 * Slug hợp lệ: ASCII thường, kebab-case, không dấu tiếng Việt, không gạch dưới,
 * không gạch đầu/cuối, không gạch đôi. Slug CHÍNH LÀ URL công khai nên phải bền.
 */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Slug bị cấm vì có thể đụng hành vi route hiện tại hoặc đã lên kế hoạch.
 * Giữ danh sách NHỎ NHẤT bảo vệ được — không dựng registry route tổng quát.
 * `page` = phân trang Phase 2 (`/writing/page/[n]/`, IA §29); `feed`/`rss` = RSS (1.8);
 * còn lại là các segment quy ước dễ va.
 */
const RESERVED_SLUGS = new Set([
  "page",
  "feed",
  "rss",
  "index",
  "new",
  "edit",
  "draft",
  "admin",
  "api",
]);

export type ContentIssue = { file: string; problems: string[] };

export class ContentError extends Error {
  readonly issues: ContentIssue[];
  constructor(issues: ContentIssue[]) {
    const detail = issues
      .map((i) => `\n  ${i.file}\n${i.problems.map((p) => `    - ${p}`).join("\n")}`)
      .join("");
    super(`Nội dung Writing không hợp lệ:${detail}\n`);
    this.name = "ContentError";
    this.issues = issues;
  }
}

/** Tên file thật của một bài: kết thúc `.vi.mdx`, không bắt đầu bằng `_`. */
function isArticleFile(fileName: string): boolean {
  return fileName.endsWith(FILE_SUFFIX) && !fileName.startsWith("_");
}

/** Liệt kê file bài viết. Thư mục chưa tồn tại → mảng rỗng (0 bài là trạng thái hợp lệ). */
function listArticleFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter(isArticleFile).sort();
}

/**
 * Ước lượng phút đọc từ thân MDX.
 *
 * Giới hạn đã biết, nói thẳng: đây là phép đếm từ thô, KHÔNG phải bộ phân tích
 * ngôn ngữ. Nó loại code fence, thẻ JSX/HTML, link/ảnh Markdown và ký tự cú pháp
 * hay gặp; nhưng tiếng Việt đếm theo "tiếng" cách nhau bởi khoảng trắng nên số từ
 * cao hơn tiếng Anh với cùng lượng nội dung. 200 từ/phút là mốc Owner đã duyệt (D7),
 * dùng nhất quán chứ không tuyên bố là chính xác tuyệt đối.
 */
function estimateReadingMinutes(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, " ") // code fence
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/<[^>]+>/g, " ") // thẻ JSX/HTML
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // ảnh Markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // link Markdown → giữ phần chữ
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, " ") // dấu heading/quote/list
    .replace(/[*_~|]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words === 0) return 0;
  return Math.max(1, Math.ceil(words / 200));
}

/** Slug = tên file bỏ hậu tố `.vi.mdx` (D2). Không có trường `slug` trong frontmatter. */
function slugFromFileName(fileName: string): string {
  return fileName.slice(0, -FILE_SUFFIX.length);
}

function checkSlug(slug: string): string[] {
  const problems: string[] = [];
  if (!slug) {
    problems.push("slug rỗng — tên file phải có phần slug trước `.vi.mdx`");
    return problems;
  }
  if (!SLUG_PATTERN.test(slug)) {
    problems.push(
      `slug "${slug}" không hợp lệ — chỉ chữ thường a-z, số 0-9 và dấu gạch ngang đơn (ví dụ: khung-dinh-vi-thuong-hieu)`,
    );
  }
  if (RESERVED_SLUGS.has(slug)) {
    problems.push(`slug "${slug}" nằm trong danh sách dành riêng, hãy đổi tên file`);
  }
  return problems;
}

type LoadedArticle = { meta: ArticleMeta; source: string };

/**
 * Đọc + validate TOÀN BỘ file bài viết (cả draft lẫn published).
 * Gom hết lỗi rồi mới throw một lần — Owner thấy mọi vấn đề trong một lần chạy,
 * không phải sửa từng lỗi rồi chạy lại.
 */
function loadAll(): LoadedArticle[] {
  const files = listArticleFiles();
  const issues: ContentIssue[] = [];
  const loaded: LoadedArticle[] = [];
  const seenSlugs = new Map<string, string>();

  for (const file of files) {
    const problems: string[] = [];
    const slug = slugFromFileName(file);
    problems.push(...checkSlug(slug));

    // Tên file đã chuẩn hoá về chữ thường nên trùng slug chỉ xảy ra khi khác hoa/thường.
    const duplicateOf = seenSlugs.get(slug.toLowerCase());
    if (duplicateOf) {
      problems.push(`slug "${slug}" trùng với file ${duplicateOf}`);
    } else {
      seenSlugs.set(slug.toLowerCase(), file);
    }

    let frontmatter: ArticleFrontmatter | null = null;
    let body = "";

    try {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const parsed = matter(raw);
      body = parsed.content;

      // Ngày phải lấy NGUYÊN VĂN, không lấy giá trị js-yaml đã chuyển thành Date
      // (xem `readRawScalar`: `2026-02-31` sẽ bị cuộn thành `2026-03-03`).
      const data: Record<string, unknown> = { ...parsed.data };
      for (const field of DATE_FIELDS) {
        if (field in data) {
          data[field] = readRawScalar(parsed.matter, field) ?? data[field];
        }
      }

      const result = articleFrontmatterSchema.safeParse(data);
      if (result.success) {
        frontmatter = result.data;
      } else {
        problems.push(...formatIssues(result.error));
      }
    } catch (error) {
      problems.push(
        `không đọc/parse được frontmatter: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    if (frontmatter && frontmatter.status === "published" && body.trim() === "") {
      problems.push("bài đã published nhưng thân bài trống");
    }

    if (problems.length > 0 || !frontmatter) {
      issues.push({ file, problems });
      continue;
    }

    loaded.push({
      meta: {
        slug,
        title: frontmatter.title,
        summary: frontmatter.summary,
        publishedAt: frontmatter.publishedAt,
        status: frontmatter.status,
        pillar: frontmatter.pillar,
        readingMinutes: estimateReadingMinutes(body),
        featured: frontmatter.featured,
        ...(frontmatter.updatedAt ? { updatedAt: frontmatter.updatedAt } : {}),
      },
      source: body,
    });
  }

  if (issues.length > 0) throw new ContentError(issues);
  return loaded;
}

/** Mới nhất trước; cùng ngày thì slug A→Z để thứ tự build luôn tất định. */
function byNewest(a: ArticleMeta, b: ArticleMeta): number {
  if (a.publishedAt !== b.publishedAt) {
    return b.publishedAt.localeCompare(a.publishedAt);
  }
  return a.slug.localeCompare(b.slug);
}

/**
 * Bài đã xuất bản, loại draft và template, đã sắp xếp.
 * Chưa có bài nào → mảng rỗng (trang Writing giữ nguyên empty state đã duyệt).
 * Draft bị loại ở MỌI môi trường — không có phân nhánh dev/prod để tránh
 * cảnh "máy tôi thấy mà production không thấy".
 */
export function getPublishedArticles(): ArticleMeta[] {
  return loadAll()
    .map((a) => a.meta)
    .filter((m) => m.status === "published")
    .sort(byNewest);
}

/** Một bài đã xuất bản kèm MDX thô. Không tìm thấy hoặc là draft → null. */
export function getArticleBySlug(slug: string): ArticleSource | null {
  const found = loadAll().find(
    (a) => a.meta.slug === slug && a.meta.status === "published",
  );
  return found ? { meta: found.meta, source: found.source } : null;
}

/** Slug đã xuất bản — dùng cho `generateStaticParams()` ở checkpoint route bài viết. */
export function getPublishedSlugs(): string[] {
  return getPublishedArticles().map((m) => m.slug);
}

/**
 * Bài featured hợp lệ: đủ ngưỡng D55 (≥3 bài thật) VÀ được Owner đánh dấu.
 * Không đủ → null, Home/Writing omit khối Featured (không dựng bài giả).
 */
export function getFeaturedArticle(): ArticleMeta | null {
  const published = getPublishedArticles();
  if (published.length < FEATURED_WRITING_MIN) return null;
  return published.find((m) => m.featured) ?? null;
}

/** Dùng cho `pnpm content:check`: chạy đúng đường validate, trả số file đã kiểm. */
export function validateAllContent(): { fileCount: number } {
  return { fileCount: loadAll().length };
}
