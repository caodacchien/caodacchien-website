// Homepage — semantic skeleton S0–S7 (Checkpoint 1.3B).
// Server component. Chỉ landmark + heading + slot trung thực + conditional rendering.
// KHÔNG art-direction/grid/card/image/animation (checkpoint layout sau).
// Copy chỉ dùng nguồn thật: BRAND_POSITIONING §1/§3, CONTENT_INVENTORY §9, routes IA/D51/D57.

import Link from "next/link";

// ---- Types (đủ đơn giản, không data-layer/CMS) ----
type Pillar = { title: string; href: string; scope: string };
type FeaturedArticle = {
  title: string;
  href: string;
  pillar: string;
  publishedAt?: string; // ISO date — chỉ set khi có ngày thật (không <time> giả)
  readingMinutes?: number;
  excerpt?: string;
};
type CaseStudy = {
  title: string;
  href: string;
  context: string;
  problem: string;
  approach: string;
  result: string;
};
type Services = { lead: string; fit: string[]; notFit: string[] };

// ---- Ngưỡng render đã khóa ----
const FEATURED_WRITING_MIN = 3; // D55: ≥3 bài thật + Owner featured

// ---- Nội dung VERIFIED (có nguồn) ----
const pillars: Pillar[] = [
  // 5 trụ cố định (D16 / BRAND_POSITIONING §3); slug D51.
  { title: "Chiến lược", href: "/topics/chien-luoc/", scope: "Marketing Strategy, Brand Strategy, Business Growth." },
  { title: "Tăng trưởng số", href: "/topics/tang-truong-so/", scope: "Digital Marketing, Marketing Automation." },
  { title: "Nội dung và Truyền thông", href: "/topics/noi-dung-truyen-thong/", scope: "Content Marketing, Communication Strategy." },
  { title: "AI cho Marketing", href: "/topics/ai-cho-marketing/", scope: "Ứng dụng AI trong marketing." },
  { title: "Lãnh đạo và Quan điểm", href: "/topics/lanh-dao-quan-diem/", scope: "Marketing Leadership và quan điểm cá nhân về ngành." },
];

// ---- Content gates: chưa có nội dung thật → omit (không fixture/placeholder công khai) ----
const featuredWriting: FeaturedArticle[] = []; // CONTENT_INVENTORY §10 = TODO → omit S2 (D55)
const featuredCaseStudy: CaseStudy | null = null; // CONTENT_INVENTORY §5 = TODO → omit S3 (D55/D6)
const servicesOffered: Services | null = null; // CONTENT_INVENTORY §8b OWNER ASSET → omit S5 (D54)
const linkedInUrl: string | null = null; // CONTENT_INVENTORY §9 OWNER ASSET → không render tới khi có URL (D53)

export default function HomePage() {
  const showWriting = featuredWriting.length >= FEATURED_WRITING_MIN;
  const showCase = featuredCaseStudy !== null;
  const showServices = servicesOffered !== null;

  return (
    <>
      {/* ===== S0 — Site Header ===== */}
      <header className="site-header container-content">
        <p className="wordmark">
          <Link href="/">Cao Đắc Chiến</Link>
        </p>
        <nav className="primary-nav" aria-label="Điều hướng chính">
          <ul>
            <li><Link href="/writing/">Viết</Link></li>
            <li><Link href="/case-studies/">Case study</Link></li>
            <li><Link href="/topics/">Chủ đề</Link></li>
            <li><Link href="/about/">Giới thiệu</Link></li>
            <li><Link href="/contact/">Liên hệ</Link></li>
          </ul>
        </nav>
      </header>

      <main id="main-content">
        {/* ===== S1 — Hero / Positioning Statement ===== */}
        <section className="hero container-content" aria-labelledby="hero-heading">
          <p className="eyebrow">Marketing Leader · Brand &amp; Marketing Strategist</p>
          {/* H1 duy nhất. Nguồn: BRAND_POSITIONING §1 (VERIFIED). */}
          <h1 id="hero-heading">
            Người dẫn dắt marketing và làm chiến lược thương hiệu, viết và xuất bản
            về cách xây dựng tăng trưởng bền vững cho doanh nghiệp.
          </h1>
          {/* 1 CTA nhẹ → route canonical (page dựng sau; runtime hiện 404). */}
          <p className="hero-actions">
            <Link href="/writing/">Đọc bài viết</Link>
          </p>
          {/* Portrait = OWNER ASSET (CONTENT §3): chưa có → không <img> rỗng, omit. */}
        </section>

        {/* ===== S2 — Featured Writing (D55: omit-when-empty) ===== */}
        {showWriting && (
          <section className="featured-writing container-prose" aria-labelledby="writing-heading">
            <h2 id="writing-heading">Viết</h2>
            <ul className="article-list">
              {featuredWriting.map((article) => (
                <li key={article.href}>
                  <article>
                    <p className="topic">{article.pillar}</p>
                    <h3>
                      <Link href={article.href}>{article.title}</Link>
                    </h3>
                    {article.excerpt && <p className="excerpt">{article.excerpt}</p>}
                    {article.publishedAt && (
                      <p className="meta">
                        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                        {article.readingMinutes ? ` · ${article.readingMinutes} phút đọc` : ""}
                      </p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ===== S3 — Featured Case Study (D55/D6: omit-when-empty) ===== */}
        {showCase && featuredCaseStudy && (
          <section
            className="featured-case-study"
            data-surface="black"
            aria-labelledby="case-heading"
          >
            <div className="container-wide">
              <h2 id="case-heading">Case study tiêu biểu</h2>
              <article className="case">
                <h3>
                  <Link href={featuredCaseStudy.href}>{featuredCaseStudy.title}</Link>
                </h3>
                <h4>Bối cảnh</h4>
                <p>{featuredCaseStudy.context}</p>
                <h4>Vấn đề</h4>
                <p>{featuredCaseStudy.problem}</p>
                <h4>Cách tiếp cận</h4>
                <p>{featuredCaseStudy.approach}</p>
                <h4>Kết quả</h4>
                <p>{featuredCaseStudy.result}</p>
              </article>
            </div>
          </section>
        )}

        {/* ===== S4 — Pillar Map (bắt buộc; 5 trụ thật D16/D51) ===== */}
        <section className="pillar-map container-content" aria-labelledby="pillar-heading">
          <h2 id="pillar-heading">Chủ đề — năm trụ nội dung</h2>
          <ul className="pillars">
            {pillars.map((pillar) => (
              <li key={pillar.href}>
                <h3>
                  <Link href={pillar.href}>{pillar.title}</Link>
                </h3>
                <p>{pillar.scope}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ===== S5 — Work With Me (D54: conditional-hidden; ẩn → S6 nối sau S4) ===== */}
        {showServices && servicesOffered && (
          <section
            className="work-with-me"
            id="work-with-me"
            data-surface="grey"
            aria-labelledby="work-heading"
          >
            <div className="container-content">
              <h2 id="work-heading">Làm việc cùng tôi</h2>
              <p className="work-lead">{servicesOffered.lead}</p>
              <div className="work-regions">
                <div className="work-region">
                  <h3>Phù hợp khi</h3>
                  <ul>
                    {servicesOffered.fit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="work-region">
                  <h3>Có thể chưa phù hợp khi</h3>
                  <ul>
                    {servicesOffered.notFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p>
                <Link href="/contact/">Cách một cuộc trao đổi bắt đầu</Link>
              </p>
            </div>
          </section>
        )}

        {/* ===== S6 — Contact CTA (bắt buộc; action peak) ===== */}
        <section className="contact-cta container-content" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Liên hệ</h2>
          <p className="contact-actions">
            <Link href="/contact/">Bắt đầu trao đổi</Link>
          </p>
        </section>
      </main>

      {/* ===== S7 — Site Footer ===== */}
      <footer className="site-footer container-content">
        <p className="wordmark">Cao Đắc Chiến</p>

        <nav className="footer-nav" aria-label="Điều hướng phụ">
          <ul>
            <li><Link href="/writing/">Viết</Link></li>
            <li><Link href="/case-studies/">Case study</Link></li>
            <li><Link href="/topics/">Chủ đề</Link></li>
            <li><Link href="/about/">Giới thiệu</Link></li>
            <li><Link href="/about/#experience">Kinh nghiệm</Link></li>
            <li><Link href="/contact/">Liên hệ</Link></li>
          </ul>
        </nav>

        <nav className="footer-connect" aria-label="Kết nối">
          <ul>
            {/* Chỉ render social khi có URL thật (D53). GitHub không render ở MVP (D52). */}
            <li><a href="/rss.xml">RSS</a></li>
            {linkedInUrl && (
              <li>
                <a href={linkedInUrl}>LinkedIn</a>
              </li>
            )}
          </ul>
        </nav>

        {/* address chỉ bao thông tin liên hệ của chủ website (email READY, CONTENT §9). */}
        <address className="footer-contact">
          Liên hệ: <a href="mailto:forwork.chiencd@gmail.com">forwork.chiencd@gmail.com</a>
        </address>

        <p className="copyright">
          © {new Date().getFullYear()} Cao Đắc Chiến ·{" "}
          <Link href="/privacy/">Chính sách riêng tư</Link>
        </p>
      </footer>
    </>
  );
}
