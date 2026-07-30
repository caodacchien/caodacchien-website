import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// About page — kế thừa design Homepage (White surface, D46 — không global dark mode/ThemeToggle).
// Nội dung VERIFIED từ CONTENT_INVENTORY (Owner 1.5 About). KHÔNG bịa fact/ngày/số liệu/khách hàng (D7).
// Roboworld hiển thị công khai ở mức "Marketing Manager tại Roboworld" (C-ID15/D6/D13); KHÔNG "CEO".

export const metadata: Metadata = {
  title: "About | Cao Đắc Chiến",
  description:
    "Cao Đắc Chiến là Marketing Leader tập trung vào chiến lược Marketing, chiến lược thương hiệu, Performance Marketing và ứng dụng AI trong Marketing.",
};

// Vùng chuyên môn (A-ID01/A-ID04/B-ID12 — Owner approved). Dạng index biên tập (rows), không card.
const expertise = [
  "Chiến lược Marketing",
  "Chiến lược thương hiệu",
  "Performance Marketing",
  "Marketing B2B",
  "Chiến lược website",
  "AI cho Marketing",
  "Dẫn dắt đội ngũ",
];

// Kinh nghiệm (A-ID04/A-ID05). Không ngày (Owner: không bắt buộc, không bịa). Hiện tại = Roboworld.
type Experience = { role: string; org: string; note?: string };
const experiences: Experience[] = [
  { role: "Marketing Manager", org: "Roboworld", note: "Hiện tại" },
  { role: "Founder", org: "CDC Agency" },
  { role: "Marketing Manager", org: "Hato" },
  { role: "Ecommerce Marketing Manager", org: "Crown UK" },
];

// Giá trị cốt lõi (B-ID06). Chỉ tiêu đề (giải thích chưa cung cấp — không bịa).
const values = [
  "Tư duy dài hạn",
  "Hệ thống hơn chiến dịch",
  "Bằng chứng trước quan điểm",
  "Học hỏi liên tục",
  "Công nghệ khuếch đại con người",
];

// Cách làm việc (B-ID10) — chuỗi có thứ tự.
const principles = [
  "Nghiên cứu",
  "Ra quyết định",
  "Triển khai",
  "Đo lường",
  "Lặp lại cải tiến",
  "Ghi chép tài liệu",
  "Tự động hóa",
];

export default function AboutPage() {
  return (
    <>
      {/* Header dùng chung (Global Layout Adoption). aria-current="page" trên "Giới thiệu". */}
      <SiteHeader currentPath="/about/" />

      <main id="main-content">
        {/* Hero — không portrait; hierarchy bằng type + measure + spacing (Owner asset ảnh chưa có). */}
        <section className="about-hero container-content" aria-labelledby="about-heading">
          <p className="eyebrow">Marketing Leader · Brand &amp; Marketing Strategist</p>
          <h1 id="about-heading">Cao Đắc Chiến</h1>
          <p className="about-lead">
            Tôi là Cao Đắc Chiến, Marketing Leader chuyên xây dựng hệ thống marketing tạo ra
            tăng trưởng bền vững cho doanh nghiệp.
          </p>
          <p className="about-lead">
            Tôi tập trung vào chiến lược thương hiệu, Performance Marketing, Marketing B2B và ứng
            dụng AI để xây dựng đội ngũ, quy trình và hệ thống có thể vận hành lâu dài thay vì chỉ
            tối ưu các chiến dịch ngắn hạn.
          </p>
        </section>

        {/* Personal Story — editorial, prose measure. */}
        <section className="about-story about-section container-prose" aria-labelledby="story-heading">
          <h2 id="story-heading">Hành trình</h2>
          <p>
            Tôi bắt đầu sự nghiệp với Performance Marketing, nhưng càng làm tôi càng nhận ra rằng
            quảng cáo chỉ là một phần rất nhỏ của Marketing.
          </p>
          <p>
            Một doanh nghiệp có thể tạo ra doanh thu trong ngắn hạn bằng quảng cáo, nhưng sẽ rất khó
            tăng trưởng lâu dài nếu không có chiến lược thương hiệu, hệ thống nội dung, quy trình vận
            hành và đội ngũ phù hợp.
          </p>
          <p>
            Trong nhiều năm làm việc ở các lĩnh vực như giáo dục, thương mại điện tử, bán lẻ và robot
            dịch vụ, tôi nhiều lần tham gia xây dựng hoặc tái cấu trúc phòng Marketing từ đầu. Công
            việc của tôi không chỉ là triển khai chiến dịch, mà còn là thiết kế cách một tổ chức vận
            hành Marketing như một hệ thống hoàn chỉnh.
          </p>
          <p>
            Hiện nay tôi dành nhiều thời gian nghiên cứu cách AI có thể hỗ trợ Marketing ở cấp độ
            chiến lược và vận hành. Tôi tin rằng AI không thay thế marketer, mà giúp marketer tập
            trung nhiều hơn vào tư duy, ra quyết định và xây dựng hệ thống.
          </p>
          <p>
            Thông qua website này, tôi chia sẻ góc nhìn, kinh nghiệm thực tế và những bài học về
            Marketing Strategy, Brand Strategy, Content, AI và Leadership để giúp doanh nghiệp xây
            dựng tăng trưởng bền vững.
          </p>
        </section>

        {/* Marketing Philosophy. */}
        <section className="about-philosophy about-section container-content" aria-labelledby="philosophy-heading">
          <h2 id="philosophy-heading">Quan điểm về Marketing</h2>
          <p className="about-statement">
            Marketing không phải là quảng cáo. Marketing là hệ thống kết nối chiến lược, thương hiệu,
            nội dung, vận hành và con người thành tăng trưởng kinh doanh bền vững.
          </p>
          <ul className="about-values">
            {values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p>
            Vai trò của một marketing leader không phải tự làm mọi thứ một mình, mà là thiết kế những
            hệ thống giúp đội ngũ liên tục tạo ra công việc xuất sắc.
          </p>
          <p>AI nên nâng chất lượng tư duy, thay vì chỉ tăng số lượng nội dung.</p>
        </section>

        {/* Areas of Expertise — index biên tập 2 cột (desktop), không card/grid-viền, không mô tả bịa. */}
        <section className="about-expertise about-section container-content" aria-labelledby="expertise-heading">
          <h2 id="expertise-heading">Vùng chuyên môn</h2>
          <ul className="expertise-list">
            {expertise.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>

        {/* Experience — editorial list, không ngày, không CV-density. */}
        <section
          className="about-experience about-section container-content"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <h2 id="experience-heading">Kinh nghiệm</h2>
          <ul className="about-rows">
            {experiences.map((x) => (
              <li key={x.org}>
                <h3>{x.role}</h3>
                <p className="exp-org">
                  {x.org}
                  {x.note ? ` · ${x.note}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Working Principles — chuỗi có thứ tự (ol), meaningful không decorative. */}
        <section className="about-principles about-section container-content" aria-labelledby="principles-heading">
          <h2 id="principles-heading">Cách làm việc</h2>
          <ol className="principles-list">
            {principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </section>

        {/* Contact CTA — reuse treatment Homepage; mailto thật. Bridge ngắn dẫn từ định vị đã duyệt (A-ID03). */}
        <section className="contact-cta about-section container-content" aria-labelledby="about-contact-heading">
          <h2 id="about-contact-heading">Liên hệ</h2>
          <p className="about-cta-lead">
            Nếu bạn đang xây dựng hoặc tái cấu trúc hệ thống marketing, tôi sẵn sàng trao đổi.
          </p>
          <p className="contact-actions">
            <a href="mailto:forwork.chiencd@gmail.com">Bắt đầu trao đổi</a>
          </p>
        </section>
      </main>

      {/* Footer dùng chung; modifier `site-footer-long` = cân bằng ending cho trang dài (giữ nguyên nhịp đã duyệt). */}
      <SiteFooter className="site-footer-long" />
    </>
  );
}
