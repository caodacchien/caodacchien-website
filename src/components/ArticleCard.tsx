import Image from "next/image";
import Link from "next/link";
import { articleHref, type Article } from "@/lib/writing";

// Card bài viết dùng lại được (Writing list, Topic hub, Related — cùng một hợp đồng).
// Server component. Mọi trường tùy chọn render có điều kiện: KHÔNG <time> giả,
// KHÔNG reading time ước lượng, KHÔNG khung ảnh rỗng khi thiếu featuredImage (D7).

// h3 vì card luôn nằm dưới một <h2> section (Writing list, Topic hub, Related).
export default function ArticleCard({ article }: { article: Article }) {
  const href = articleHref(article.slug);
  const hasMeta = Boolean(article.publishedAt || article.readingMinutes);

  return (
    <article className="article-card">
      {/* Ảnh không bọc <Link>: tránh hai link trùng đích trong cùng một card
          (điều hướng bằng bàn phím phải dừng đúng một lần ở tiêu đề). */}
      {article.featuredImage && (
        <div className="article-card-media">
          <Image
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}

      <p className="article-card-pillar">{article.pillar}</p>

      <h3 className="article-card-title">
        <Link href={href}>{article.title}</Link>
      </h3>

      <p className="article-card-summary">{article.summary}</p>

      {hasMeta && (
        <p className="article-card-meta">
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
          )}
          {article.publishedAt && article.readingMinutes ? " · " : ""}
          {article.readingMinutes ? `${article.readingMinutes} phút đọc` : ""}
        </p>
      )}
    </article>
  );
}
