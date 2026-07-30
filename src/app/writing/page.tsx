import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WritingHero from "@/components/WritingHero";
import FeaturedArticle from "@/components/FeaturedArticle";
import PillarStrip from "@/components/PillarStrip";
import ArticleCard from "@/components/ArticleCard";
import StatusMessage from "@/components/StatusMessage";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getFeaturedArticle, getLatestArticles } from "@/lib/writing";

// /writing/ — trang danh sách bài viết (route contract D31/D57/IA §1, §4).
// Server component, không client JS. Kế thừa design language Home/About (White surface, D46).
//
// Trạng thái nội dung: CONTENT_INVENTORY §10 = TODO → chưa có bài thật.
// Featured omit theo ngưỡng D55; danh sách hiển thị empty state biên tập.
// KHÔNG seed bài giả, KHÔNG ngày giả, KHÔNG metric giả (D7).

const PATH = "/writing/";
const TITLE = "Viết | Cao Đắc Chiến";
const DESCRIPTION =
  "Bài viết của Cao Đắc Chiến về chiến lược marketing, chiến lược thương hiệu, nội dung và truyền thông, AI cho marketing và dẫn dắt đội ngũ.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: PATH,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function WritingPage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles();
  const hasArticles = latest.length > 0;

  // JSON-LD: CollectionPage mô tả trang danh sách. KHÔNG phát sinh Article/datePublished
  // khi chưa có bài thật — không bịa ngày xuất bản.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Viết",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    inLanguage: "vi-VN",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    about: { "@type": "Person", name: SITE_NAME, url: `${SITE_URL}/about` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader currentPath={PATH} />

      <main id="main-content">
        <WritingHero />

        {/* Featured Article — omit-when-empty (D55). Chỉ render khi đủ ngưỡng + Owner đánh dấu. */}
        {featured && (
          <section
            className="writing-featured container-content"
            aria-labelledby="featured-heading"
          >
            <h2 id="featured-heading">Bài viết nổi bật</h2>
            <FeaturedArticle article={featured} />
          </section>
        )}

        {/* Danh mục — đúng 5 trụ đóng (D16), non-interactive cho tới khi /topics/ tồn tại. */}
        <section className="writing-pillars container-content" aria-labelledby="pillars-heading">
          <h2 id="pillars-heading">Chủ đề</h2>
          <p className="writing-section-lead">
            Toàn bộ bài viết được phân loại theo năm trụ nội dung cố định.
          </p>
          <PillarStrip />
        </section>

        {/* Bài viết mới nhất — danh sách thật hoặc empty state biên tập. */}
        <section className="writing-latest container-content" aria-labelledby="latest-heading">
          <h2 id="latest-heading">Bài viết mới nhất</h2>

          {hasArticles ? (
            <ul className="article-list writing-grid">
              {latest.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          ) : (
            <StatusMessage
              title="Những bài viết dài đầu tiên đang được chuẩn bị."
              description="Nội dung đáng xuất bản cần thời gian. Khi bài đầu tiên hoàn chỉnh, nó sẽ xuất hiện tại đây."
            />
          )}
        </section>
      </main>

      <SiteFooter className="site-footer-long" />
    </>
  );
}
