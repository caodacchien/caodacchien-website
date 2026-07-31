import type { Where } from "payload";
import { payloadClient, isAuthenticated } from "./payload";
import type { PostCardData } from "@/components/PostCard";

type FindOptions = {
  limit?: number;
  pillar?: string;
};

/**
 * Lấy danh sách bài đã đăng, mới nhất trước.
 *
 * Chủ website đã đăng nhập thì thấy cả bản nháp — để xem trước danh sách trông thế nào
 * trước khi bấm đăng. Người ngoài chỉ thấy bài đã đăng.
 */
export async function findPosts({ limit = 12, pillar }: FindOptions = {}): Promise<
  PostCardData[]
> {
  const payload = await payloadClient();
  const canSeeDrafts = await isAuthenticated();

  const conditions: Where[] = [];
  if (!canSeeDrafts) conditions.push({ status: { equals: "published" } });
  if (pillar) conditions.push({ pillar: { equals: pillar } });

  const { docs } = await payload.find({
    collection: "posts",
    where: conditions.length ? { and: conditions } : {},
    sort: "-publishedAt",
    limit,
    depth: 1,
    overrideAccess: canSeeDrafts,
  });

  return docs.map((d) => ({
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    pillar: d.pillar,
    publishedAt: d.publishedAt,
    coverImage:
      typeof d.coverImage === "object" && d.coverImage
        ? { url: d.coverImage.url, alt: d.coverImage.alt }
        : null,
  }));
}
