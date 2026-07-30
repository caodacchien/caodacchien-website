import { SITE_NAME } from "@/lib/site";

// Hero của /writing. Server component.
// Copy bám định vị đã duyệt (PROJECT_CONSTITUTION §1, BRAND_POSITIONING §1/§3):
// nền tảng xuất bản, nội dung xoay quanh 5 trụ (D16). Không buzzword, không hứa hẹn số lượng/tần suất.

export default function WritingHero() {
  return (
    <section className="writing-hero container-content" aria-labelledby="writing-heading">
      <p className="eyebrow">Bài viết · {SITE_NAME}</p>
      <h1 id="writing-heading">Viết</h1>
      <p className="writing-lead">
        Nơi tôi ghi lại cách xây dựng marketing như một hệ thống: chiến lược, thương hiệu,
        nội dung, vận hành và cách AI tham gia vào công việc đó.
      </p>
      <p className="writing-lead writing-lead-secondary">
        Bài viết ở đây thiên về khung tư duy và cách làm có thể áp dụng lại, thay vì tin tức
        ngành. Mỗi bài thuộc một trong năm trụ nội dung bên dưới.
      </p>
    </section>
  );
}
