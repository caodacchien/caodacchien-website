import Link from "next/link";
import Image from "next/image";
import { getPillar } from "@/lib/pillars";
import styles from "./PostCard.module.css";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  pillar: string;
  publishedAt?: string | null;
  coverImage?: { url?: string | null; alt?: string | null } | null;
};

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

/**
 * Thẻ bài viết dùng ở trang chủ và trang danh sách.
 *
 * Theo DESIGN.md §Section Showcase Card: nền trắng, bo 8px, viền 1px, đệm 20px.
 * Chiều sâu đến từ viền chứ không từ bóng đổ — đó là luật của hệ này.
 */
export default function PostCard({ post }: { post: PostCardData }) {
  const pillar = getPillar(post.pillar);
  const date = formatDate(post.publishedAt);

  return (
    <article className={styles.card}>
      {post.coverImage?.url && (
        <div className={styles.media}>
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt ?? ""}
            width={800}
            height={450}
            sizes="(max-width: 700px) 100vw, 380px"
          />
        </div>
      )}

      <div className={styles.meta}>
        {pillar && <span className={styles.pillar}>{pillar.title}</span>}
        {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
      </div>

      <h3 className={styles.title}>
        {/* Cả thẻ đều bấm được nhờ ::after phủ lên, nhưng vùng chữ vẫn là link thật
            để trình đọc màn hình đọc đúng đích đến. */}
        <Link href={`/bai-viet/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className={styles.excerpt}>{post.excerpt}</p>
    </article>
  );
}
