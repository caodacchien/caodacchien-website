// Data contract cho Writing (Milestone Writing Foundation).
// KHÔNG data-layer/CMS/MDX ở checkpoint này (D35 MDX-first sẽ nối ở Milestone 1.3).
// Hình dạng type khớp frontmatter MDX dự kiến để 1.3 không phải viết lại UI.

/**
 * Trụ nội dung — ĐÓNG, đúng 5 giá trị (D16).
 * Taxonomy đóng: thêm giá trị ngoài union này là type error lúc build,
 * tương ứng ràng buộc Zod enum sẽ dựng ở Milestone 1.3.
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

export type ArticleImage = {
  src: string;
  /** Alt bắt buộc — ảnh nội dung không được để alt rỗng (WCAG 1.1.1). */
  alt: string;
  width: number;
  height: number;
};

/**
 * Bài viết. Mọi trường tùy chọn chỉ render khi có giá trị thật (D7/D55):
 * không ngày giả, không reading time ước lượng, không ảnh placeholder.
 */
export type Article = {
  /** Slug tiếng Việt không dấu (D31). URL cuối: /writing/[slug]/ */
  slug: string;
  title: string;
  /** Tóm tắt biên tập. Không sinh tự động từ thân bài. */
  summary: string;
  pillar: Pillar;
  /** ISO date — chỉ set khi có ngày xuất bản thật. */
  publishedAt?: string;
  /** Phút đọc — chỉ set khi tính từ nội dung thật. */
  readingMinutes?: number;
  featuredImage?: ArticleImage;
  /** Owner đánh dấu featured (D25 `featured: true`). */
  featured?: boolean;
};

/**
 * Ngưỡng render Featured Writing (D55): cần ≥3 bài thật + Owner chọn featured.
 * Dùng chung với Homepage S2 để hai trang không lệch quy tắc.
 */
export const FEATURED_WRITING_MIN = 3;

/**
 * Nguồn bài viết — RỖNG.
 * CONTENT_INVENTORY §10 = TODO: chưa có bài viết nào đạt READY.
 * Không seed fixture/placeholder công khai (D7, AI_RULEBOOK §4.4).
 * Milestone 1.3 sẽ thay mảng này bằng lớp đọc MDX, giữ nguyên type Article.
 */
export const articles: Article[] = [];

/** Đường dẫn công khai của một bài (URL bất biến, D31). */
export function articleHref(slug: string): string {
  return `/writing/${slug}/`;
}

/** Bài featured hợp lệ: đủ ngưỡng D55 VÀ được Owner đánh dấu. */
export function getFeaturedArticle(list: Article[] = articles): Article | null {
  if (list.length < FEATURED_WRITING_MIN) return null;
  return list.find((a) => a.featured) ?? null;
}

/** Bài mới nhất. Chỉ sắp xếp khi có ngày thật; bài thiếu ngày giữ nguyên thứ tự nguồn. */
export function getLatestArticles(list: Article[] = articles): Article[] {
  return [...list].sort((a, b) => {
    if (!a.publishedAt || !b.publishedAt) return 0;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}
