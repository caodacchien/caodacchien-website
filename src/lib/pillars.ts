// Năm trụ nội dung — nguồn sự thật duy nhất.
// Giữ nguyên từ BRAND_POSITIONING §3 và slug đã khóa ở D51 của hệ tài liệu cũ.
// Case study bị bỏ khỏi bản này (quyết định E), nhưng năm trụ thì giữ nguyên.

export type Pillar = {
  slug: string;
  title: string;
  scope: string;
};

export const PILLARS: Pillar[] = [
  {
    slug: "chien-luoc",
    title: "Chiến lược",
    scope: "Chiến lược marketing, chiến lược thương hiệu, tăng trưởng kinh doanh.",
  },
  {
    slug: "tang-truong-so",
    title: "Tăng trưởng số",
    scope: "Marketing số và tự động hóa marketing.",
  },
  {
    slug: "noi-dung-truyen-thong",
    title: "Nội dung và Truyền thông",
    scope: "Marketing nội dung và chiến lược truyền thông.",
  },
  {
    slug: "ai-cho-marketing",
    title: "AI cho Marketing",
    scope: "Ứng dụng trí tuệ nhân tạo vào công việc marketing.",
  },
  {
    slug: "lanh-dao-quan-diem",
    title: "Lãnh đạo và Quan điểm",
    scope: "Lãnh đạo đội ngũ marketing và quan điểm cá nhân về ngành.",
  },
];

export const PILLAR_SLUGS = PILLARS.map((p) => p.slug);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
