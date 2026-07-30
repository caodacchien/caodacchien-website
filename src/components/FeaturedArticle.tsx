import Image from "next/image";
import Link from "next/link";
import { articleHref, type Article } from "@/lib/writing";

// Featured Article — chỉ metadata, không trích nội dung thân bài.
// Chỉ được render khi qua ngưỡng D55 (≥3 bài thật) VÀ Owner đánh dấu featured.
// Trang gọi chịu trách nhiệm gate; component không tự bịa trạng thái.

export default function FeaturedArticle({ article }: { article: Article }) {
  const href = articleHref(article.slug);
  const hasMeta = Boolean(article.publishedAt || article.readingMinutes);

  return (
    <article className="featured-article">
      {article.featuredImage && (
        <div className="featured-article-media">
          <Image
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            sizes="(min-width: 1024px) 640px, 100vw"
            priority
          />
        </div>
      )}

      <div className="featured-article-body">
        <p className="article-card-pillar">{article.pillar}</p>

        <h3 className="featured-article-title">
          <Link href={href}>{article.title}</Link>
        </h3>

        <p className="featured-article-summary">{article.summary}</p>

        {hasMeta && (
          <p className="article-card-meta">
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            )}
            {article.publishedAt && article.readingMinutes ? " · " : ""}
            {article.readingMinutes ? `${article.readingMinutes} phút đọc` : ""}
          </p>
        )}
      </div>
    </article>
  );
}
