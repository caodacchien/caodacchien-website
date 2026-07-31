// Taxonomy + kiểu dữ liệu + hằng số route của Writing.
// Module này CỐ Ý không đọc filesystem và không import Zod: nó phải an toàn để import
// từ bất kỳ component nào. Phần đọc nội dung nằm ở `src/lib/mdx.ts` (server-only).

/**
 * Trụ nội dung — ĐÓNG, đúng 5 giá trị (D16).
 * Taxonomy đóng: thêm giá trị ngoài union này là type error lúc build,
 * tương ứng ràng buộc Zod enum ở `writing.schema.ts`.
 */
export type Pillar =
  | "Chiến lược"
  | "Tăng trưởng số"
  | "Nội dung và Truyền thông"
  | "AI cho Marketing"
  | "Lãnh đạo và Quan điểm";

export type PillarEntry = {
  title: Pillar;
  /** Route hub của trụ (D51 — slug tiếng Việt không dấu, chốt cứng). */
  href: string;
  /** Phạm vi trụ. Nguồn: BRAND_POSITIONING §3 / D16 — không mô tả bịa. */
  scope: string;
};

/** 5 trụ cố định (D16), slug theo D51. Đồng bộ với Pillar Map trên Home. */
export const PILLARS: PillarEntry[] = [
  {
    title: "Chiến lược",
    href: "/topics/chien-luoc/",
    scope: "Marketing Strategy, Brand Strategy, Business Growth.",
  },
  {
    title: "Tăng trưởng số",
    href: "/topics/tang-truong-so/",
    scope: "Digital Marketing, Marketing Automation.",
  },
  {
    title: "Nội dung và Truyền thông",
    href: "/topics/noi-dung-truyen-thong/",
    scope: "Content Marketing, Communication Strategy.",
  },
  {
    title: "AI cho Marketing",
    href: "/topics/ai-cho-marketing/",
    scope: "Ứng dụng AI trong marketing.",
  },
  {
    title: "Lãnh đạo và Quan điểm",
    href: "/topics/lanh-dao-quan-diem/",
    scope: "Marketing Leadership và quan điểm cá nhân về ngành.",
  },
];

/** Danh sách giá trị trụ hợp lệ — nguồn duy nhất cho Zod enum. */
export const PILLAR_TITLES = PILLARS.map((p) => p.title) as [Pillar, ...Pillar[]];

/** Trạng thái xuất bản (D1). Chỉ `published` mới lộ ra công khai. */
export type ArticleStatus = "draft" | "published";

export type ArticleImage = {
  src: string;
  /** Alt bắt buộc — ảnh nội dung không được để alt rỗng (WCAG 1.1.1). */
  alt: string;
  width: number;
  height: number;
};

/**
 * Metadata một bài viết — thứ các component danh sách tiêu thụ.
 * KHÔNG chứa thân bài (xem `ArticleSource`).
 *
 * `publishedAt` và `readingMinutes` là BẮT BUỘC ở đây (khác bản foundation trước):
 * schema ép có ngày thật, còn reading time thì tính từ nội dung thật — nên không
 * còn trường hợp hợp lệ nào mà một bài đã validate lại thiếu hai giá trị này.
 */
export type ArticleMeta = {
  /** Slug tiếng Việt không dấu (D31), derive từ TÊN FILE. URL cuối: /writing/[slug]/ */
  slug: string;
  title: string;
  /** Tóm tắt biên tập — dùng cho thẻ danh sách VÀ meta description. */
  summary: string;
  /** ISO date YYYY-MM-DD, đã kiểm tra là ngày có thật trên lịch. */
  publishedAt: string;
  status: ArticleStatus;
  pillar: Pillar;
  /** Phút đọc — TÍNH lúc build từ thân bài, không nằm trong frontmatter (D7). */
  readingMinutes: number;
  /** Owner đánh dấu featured (D25). Mặc định false. */
  featured: boolean;
  updatedAt?: string;
  /**
   * Ảnh bìa — CHƯA được lớp đọc điền ở checkpoint này.
   *
   * Frontmatter đã khóa (D1) chỉ có `coverImage` + `coverImageAlt`, KHÔNG có kích thước,
   * trong khi `next/image` bắt buộc `width`/`height`. Schema vẫn validate hai trường đó
   * để nội dung Owner viết hôm nay không bị sai về sau, nhưng việc nối ảnh vào UI cần
   * một quyết định về nguồn kích thước (thêm trường frontmatter, đọc kích thước lúc
   * build, hay dùng `fill` + CSS) — thuộc checkpoint route bài viết.
   *
   * Giữ trường ở đây để `ArticleCard`/`FeaturedArticle` đã duyệt không phải sửa markup.
   */
  featuredImage?: ArticleImage;
};

/** Một bài viết kèm thân MDX thô. Chỉ trang chi tiết mới cần dạng này. */
export type ArticleSource = {
  meta: ArticleMeta;
  /** MDX THÔ, chưa compile. Việc compile thuộc checkpoint route bài viết. */
  source: string;
};

/**
 * Ngưỡng render Featured Writing (D55): cần ≥3 bài thật + Owner chọn featured.
 * Dùng chung với Homepage S2 để hai trang không lệch quy tắc.
 */
export const FEATURED_WRITING_MIN = 3;

/** Đường dẫn công khai của một bài (URL bất biến, D31). */
export function articleHref(slug: string): string {
  return `/writing/${slug}/`;
}
