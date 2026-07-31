import { z } from "zod";
import { PILLAR_TITLES } from "./writing.ts";

// Zod schema cho frontmatter bài viết (D3). Frontmatter sai → THROW → build FAIL.
// Không viết validator tay song song: mọi quy tắc diễn đạt được bằng Zod thì dùng Zod.

/**
 * Ngày phải là YYYY-MM-DD VÀ tồn tại thật trên lịch.
 * Regex một mình không đủ: "2026-02-31" đúng định dạng nhưng không tồn tại.
 *
 * Timezone-safe: dựng ngày bằng Date.UTC từ ba số nguyên rồi so lại từng thành phần.
 * KHÔNG dùng `new Date("2026-02-31")` — nó parse theo local time và có thể trượt ngày.
 * Giá trị trả về giữ nguyên chuỗi gốc, không bao giờ format lại.
 */
function isRealCalendarDate(value: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return false;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const utc = new Date(Date.UTC(year, month - 1, day));
  return (
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  );
}

const isoDate = z
  .string()
  .refine(isRealCalendarDate, "phải là ngày có thật theo định dạng YYYY-MM-DD");

/** Các trường ngày — giá trị của chúng phải được đọc từ văn bản gốc, xem `readRawScalar`. */
export const DATE_FIELDS = ["publishedAt", "updatedAt"] as const;

/**
 * Lấy giá trị NGUYÊN VĂN của một khóa cấp một trong khối frontmatter thô.
 *
 * Bắt buộc phải làm thế này cho các trường ngày: js-yaml tự chuyển `2026-07-20`
 * không đóng ngoặc thành object `Date`, và với ngày không tồn tại như `2026-02-31`
 * nó CUỘN sang `2026-03-03` — tức là âm thầm "sửa" một ngày sai thành ngày hợp lệ.
 * Validate trên văn bản gốc thì không thể xảy ra chuyện đó.
 *
 * Trả về `null` khi không tìm thấy khóa, để Zod báo lỗi "thiếu trường" như bình thường.
 */
export function readRawScalar(rawFrontmatter: string, key: string): string | null {
  const line = new RegExp(`^${key}:[ \\t]*(.*)$`, "m").exec(rawFrontmatter);
  if (!line) return null;
  const value = line[1].trim().replace(/\s+#.*$/, "");
  if (value === "") return null;
  return value.replace(/^["'](.*)["']$/, "$1");
}

const nonEmpty = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} không được để trống`);

/**
 * `strictObject` — khóa lạ trong frontmatter là LỖI, không im lặng bỏ qua.
 * Lý do: gõ sai tên trường (`sumary`, `pubishedAt`) sẽ âm thầm mất dữ liệu
 * nếu chỉ strip. Ở đây nó fail ngay với tên khóa cụ thể.
 */
export const articleFrontmatterSchema = z
  .strictObject({
    title: nonEmpty("title"),
    summary: nonEmpty("summary"),
    publishedAt: isoDate,
    status: z.enum(["draft", "published"]),
    pillar: z.enum(PILLAR_TITLES),
    featured: z.boolean().default(false),
    updatedAt: isoDate.optional(),
    coverImage: nonEmpty("coverImage").optional(),
    coverImageAlt: nonEmpty("coverImageAlt").optional(),
  })
  // Ảnh nội dung bắt buộc có alt (WCAG 1.1.1) — không cho phép ảnh alt rỗng.
  .refine((d) => !(d.coverImage && !d.coverImageAlt), {
    error: "có coverImage thì bắt buộc phải có coverImageAlt",
    path: ["coverImageAlt"],
  })
  // alt không có ảnh là dấu hiệu sửa dở dang → fail để Owner biết.
  .refine((d) => !(d.coverImageAlt && !d.coverImage), {
    error: "có coverImageAlt nhưng thiếu coverImage",
    path: ["coverImage"],
  })
  // Ngày cập nhật không thể sớm hơn ngày xuất bản.
  .refine((d) => !d.updatedAt || d.updatedAt >= d.publishedAt, {
    error: "updatedAt không được sớm hơn publishedAt",
    path: ["updatedAt"],
  });

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

/** Gộp mọi issue của Zod thành các dòng "field: lý do" đọc được cho người không phải dev. */
export function formatIssues(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}
