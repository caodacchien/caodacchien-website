# Product Requirements Document

Phiên bản: 1.3 — 2026-07-24 (đồng bộ bản khóa D23–D35)
Trạng thái: Đã duyệt cho Phase 1. Mọi thay đổi phải đi qua `docs/00-foundation/DECISION_LOG.md`.

Định vị sản phẩm nằm ở `docs/01-product/BRAND_POSITIONING.md`. Tài liệu này diễn giải định vị đó thành yêu cầu sản phẩm. Khi hai bên mâu thuẫn, `BRAND_POSITIONING.md` là bên đúng.

## 1. Tổng quan

Sản phẩm là **Publishing Platform** của Cao Đắc Chiến, **Marketing Leader / Brand & Marketing Strategist**.

Website chứng minh năng lực ở mười vùng chuyên môn liệt kê tại `BRAND_POSITIONING.md` §2, và phục vụ việc xuất bản bài viết chuyên sâu, case study, quan điểm về ngành, hướng dẫn thực chiến, và về sau là framework, template và speaking.

Đây không phải portfolio, không phải gallery, không phải personal homepage. Trung tâm là cách nghĩ, không phải danh sách việc đã làm. Chốt theo D12, tinh chỉnh theo D20.

## 2. Đối tượng chính

Sáu nhóm có xếp ưu tiên **bắt buộc**. Chi tiết đầy đủ tại `BRAND_POSITIONING.md` §5. Chốt theo D21.

| # | Nhóm | Trang phục vụ chính |
| --- | --- | --- |
| 1 | CEO và Founder cần chiến lược marketing và thương hiệu | Home, Case study, Làm việc cùng tôi |
| 2 | CMO, Marketing Director, Marketing Manager | Viết, Case study |
| 3 | Người làm marketing chuyên nghiệp | Viết |
| 4 | Chủ doanh nghiệp vừa và nhỏ | Viết, Case study, Làm việc cùng tôi |
| 5 | Sinh viên marketing | Viết |
| 6 | Nhà tuyển dụng | About (section Experience) |

**Quy tắc giải xung đột:** khi hai nhóm mâu thuẫn về một quyết định UX, nhóm có số nhỏ hơn thắng.

Nhóm 1 và 2 quyết định thiết kế của Home, Case study và khối Làm việc cùng tôi. Nhóm 2, 3 và 5 quyết định trải nghiệm đọc dài ở trang Viết (bài viết).

Ghi chú về nhóm 6: nhà tuyển dụng đứng cuối có chủ đích. Website này không phải công cụ tìm việc. Trang Experience vẫn phải đầy đủ và chính xác nhưng không chiếm ưu tiên trong kiến trúc thông tin.

Ghi chú về ngôn ngữ: MVP chỉ có tiếng Việt theo D1. Nhu cầu tiếng Anh cho hồ sơ du học sẽ được đáp ứng khi bật locale `en` ở Phase 2.

## 3. Giá trị cốt lõi

Website phải giúp người xem nhanh chóng trả lời:

- Người này nghĩ về marketing và thương hiệu như thế nào?
- Cách nghĩ đó đã tạo ra kết quả gì, đo được bằng gì?
- Có khung tư duy nào tôi dùng được ngay không?
- Người này mạnh nhất ở vùng năng lực nào?
- Có thể mời tư vấn, mời chia sẻ hoặc hợp tác bằng cách nào?

Thứ tự các câu hỏi này có chủ đích. Câu hỏi về **cách nghĩ** đứng trước câu hỏi về **danh tính**, vì đó là điều phân biệt một nền tảng xuất bản với một portfolio.

## 3b. Bản thân website là bằng chứng năng lực

Ràng buộc bắt buộc, xem `BRAND_POSITIONING.md` §6.

Với một người làm chiến lược thương hiệu, chất lượng thương hiệu của chính website là bằng chứng năng lực đầu tiên mà nhóm khán giả 1 và 2 nhìn thấy, trước khi họ đọc một chữ nào trong case study.

Hệ quả với yêu cầu sản phẩm:

- Copywriting của mọi trạng thái, kể cả trang lỗi và trạng thái rỗng, phải đạt chuẩn xuất bản. Không được để chuỗi mặc định kiểu "Không có dữ liệu".
- Kiến trúc thông tin phải tự nó thể hiện tư duy hệ thống.
- Sự nhất quán của hệ thống thiết kế được coi là yêu cầu chức năng, không phải yêu cầu thẩm mỹ.

## 4. Kiến trúc thông tin

### MVP — trang & điều hướng
Chốt theo D4, tu chỉnh theo **D26** và D18.

Trang MVP:
- Home — có khối "Làm việc cùng tôi"
- Viết / Writing — MDX (`content/writing/`)
- Case study — MDX (`content/case-studies/`)
- Chủ đề — hub `/topics/[pillar]` (5 trụ)
- About — gồm **section Experience (timeline)** + khối "Làm việc cùng tôi"
- Contact

**Navigation chính (5 mục, D26):** Viết · Case study · Chủ đề · Giới thiệu · Liên hệ. Home là logo; "Làm việc cùng tôi" là khối, không lên nav (D18). Experience **không còn trang riêng** — là section trong About, có anchor ở footer.

### Phase 2
- Resources — framework và template tải về
- Speaking / Teaching

Hai mục này bị lùi vì chưa có nội dung thật. Xuất bản trang rỗng vi phạm yêu cầu empty state có ý nghĩa ở §6.

**Ràng buộc bắt buộc theo D18:** kiến trúc thông tin của MVP phải chứa được hai mục Phase 2 **mà không cần thiết kế lại**. Hệ thống điều hướng phải được chứng minh là chịu được 8 mục, dù MVP chỉ hiển thị 6. Đây là tiêu chí đánh giá ở Milestone 0.3 và 0.4.

**Ghi chú đồng bộ theo bản khóa 2026-07-24:**

- Kiến trúc thông tin chi tiết (sitemap, taxonomy, URL, breadcrumb, liên kết nội bộ) nằm ở `docs/02-design/INFORMATION_ARCHITECTURE.md`, chốt theo D31.
- MVP giữ thêm hub `/topics/[pillar]` với đúng 5 trụ (D31).
- **Search, Pagination, Filter hoãn Phase 2** (D33).
- **Nhãn điều hướng và Experience đã chốt theo D26 (Approved):** nav 5 mục (Viết · Case study · Chủ đề · Giới thiệu · Liên hệ); Experience là section trong About, không còn route riêng.

## 5. Yêu cầu chức năng MVP

Nguồn dữ liệu chốt theo **D35 (MDX-first)**: bài viết và case study là MDX; hồ sơ và kinh nghiệm ở `src/config/profile.config.ts`; chỉ `contacts` nằm trên Supabase.

### Home
Nguồn: `profile.config.ts` + MDX (bài viết và case study có `featured: true`). Thứ tự khối chốt theo **D25**:

1. Hero — định vị dạng phát biểu vấn đề (Marketing Leader / Brand & Marketing Strategist)
2. **Bài viết featured** — lấy theo cờ `featured: true`, không phải "mới nhất"
3. **Case study featured** — `featured: true`, có số liệu kết quả nổi bật
4. Bản đồ 5 trụ nội dung (dẫn tới `/topics/[pillar]`)
5. **Khối "Làm việc cùng tôi"** — D18, đứng sau bằng chứng
6. CTA chính = **"Làm việc cùng tôi" / Liên hệ** (newsletter hoãn Phase 2 theo D27)
7. Footer

Thứ tự phục vụ nhóm khán giả 1 trước: trả lời "người này nghĩ thế nào về tăng trưởng" trước "người này đã làm ở đâu". Experience không nằm ở thân Home (D21) — chỉ ở section About + anchor footer.

### About
Nguồn: `profile.config.ts`
- Biography
- Core values
- Skills
- Education
- Certifications
- Timeline
- **Khối "Làm việc cùng tôi"** — chốt theo D18

### Khối "Làm việc cùng tôi"
Nguồn: `profile.config.ts` → `servicesOffered`. Xuất hiện trên Home và About.

- Các hình thức hợp tác đang nhận
- Loại bài toán phù hợp và loại bài toán không phù hợp
- Cách bắt đầu một cuộc trao đổi

Ranh giới bắt buộc theo D18: đây là **khối thông tin**, không phải phễu bán hàng. Không bảng giá, không nút đặt lịch chớp nháy, không lời chứng thực dàn dựng, không đếm ngược, không pop-up chặn màn hình.

### Experience — section trong About (D26)
Nguồn: `profile.config.ts` → `experiences`. Là một section (timeline) trong trang About, không phải trang riêng; có anchor ở footer.
- Company, Role, Period
- Responsibilities
- Quantified impact — chỉ số liệu đã được phép công khai, theo D6
- Related case studies — làm bằng link inline trong nội dung, không qua schema

### Case study
Nguồn: **MDX** trong `content/case-studies/`. Mô hình nội dung chốt theo D14, chuyển sang MDX theo D35.
- Danh sách hiển thị hết (**filter theo dịch vụ/ngành hoãn Phase 2**, D33)
- Case study đầy đủ: Bối cảnh / Vấn đề / Cách tiếp cận / Kết quả — viết trong thân MDX
- Số liệu kết quả có cấu trúc (`metrics`), hiển thị nổi bật
- Vai trò cụ thể của chủ dự án trong dự án tập thể
- Hình thức tham gia: in-house, consulting, advisory hay dự án cá nhân
- Tên khách hàng chỉ hiển thị khi `clientIsPublic = true`, tuân thủ D6
- Gallery ảnh (tùy chọn)
- Liên kết tới chiến dịch hoặc sản phẩm thật nếu có

Không có tech stack, không có link repository. Xem `BRAND_POSITIONING.md` §8.

### Writing (bài viết)
Nguồn: **MDX** trong `content/writing/`
- Phân loại theo đúng **năm trụ nội dung** của D16, hub tại `/topics/[pillar]`
- Reading time tính lúc build
- Table of contents sinh từ heading
- Related posts theo cùng trụ, gần ngày nhất
- SEO metadata sinh từ `title`/`excerpt`
- **Search hoãn Phase 2** (D33). **Tags hoãn Phase 2.**

### Contact
Nguồn: Supabase (`contacts`) + Resend
- Contact form với validation phía server bằng Zod
- Honeypot và rate limit
- Social links
- Email
- Calendar booking để ở Phase 2

## 6. Yêu cầu phi chức năng

- Responsive, mobile-first
- Accessible, tối thiểu WCAG AA
- Lighthouse mục tiêu từ 90 trở lên cho Performance, SEO, Accessibility trong điều kiện hợp lý
- Core Web Vitals tốt
- Metadata đầy đủ
- Không phụ thuộc JavaScript cho nội dung SEO chính
- Có error state, loading state và empty state
- Light mode và dark mode, mặc định theo `prefers-color-scheme`, có nút chuyển và lưu lựa chọn, không nhấp nháy sai theme khi tải trang. Cả hai chế độ đều phải đạt tương phản AA. Xem D10.
- Kiến trúc sẵn sàng song ngữ: routing theo locale, chuỗi giao diện tách khỏi JSX, dữ liệu có cột `locale`. MVP chỉ xuất bản `vi`. Xem D1.

## 7. Nội dung

Ngôn ngữ website đã được chốt tại D1: MVP chỉ tiếng Việt, kiến trúc sẵn sàng cho tiếng Anh ở Phase 2.

Toàn bộ nội dung thật cần cung cấp được quản lý tại `docs/01-product/CONTENT_INVENTORY.md`, gồm positioning statement, bio ngắn và dài, ảnh chân dung, danh sách kinh nghiệm, danh sách project, học vấn, chứng chỉ, kỹ năng, social links và metadata SEO mặc định.

Milestone 1.4 chỉ bắt đầu khi 5 mục trong "Cổng mở khóa Milestone 1.4" của file đó đạt trạng thái `READY`.

## 8. Success Metrics

- Hoàn thành MVP theo §4 (Home · Viết · Case study · Chủ đề · About · Contact; nav 5 mục theo D26)
- Index trên Google
- Form liên hệ hoạt động, email về tới `forwork.chiencd@gmail.com`
- Tăng số lượt xem portfolio/blog
- Có ít nhất 3 case study chất lượng
- Có quy trình xuất bản nội dung ổn định
- Lighthouse đạt mục tiêu ở §6 trên cả light mode và dark mode

## 9. Chính sách nội dung

Theo D7 và D6:

- Cấm tạo ra thành tích, số liệu, chức danh, dự án, khách hàng, học vấn hoặc chứng chỉ không có thật.
- Placeholder trong lúc dựng giao diện phải có tiền tố `PLACEHOLDER:` hoặc `DRAFT:`.
- Không deploy production khi nội dung công khai còn placeholder.
- Nội dung nhắc tới Roboworld hoặc khách hàng của Roboworld phải được chủ dự án kiểm duyệt trước khi xuất bản.
