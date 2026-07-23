# Product Requirements Document

Phiên bản: 1.0 — 2026-07-23
Trạng thái: Đã duyệt cho Phase 1. Mọi thay đổi phải đi qua `docs/00-foundation/DECISION_LOG.md`.

## 1. Tổng quan

Sản phẩm là website thương hiệu cá nhân của Cao Đắc Chiến, phục vụ đồng thời mục tiêu nghề nghiệp, học thuật và chia sẻ kiến thức.

## 2. Đối tượng chính

1. Nhà tuyển dụng và Hiring Manager
2. Khách hàng và đối tác
3. Đồng nghiệp trong ngành
4. Sinh viên/người mới
5. Hội đồng tuyển sinh
6. Thành viên cộng đồng

Ghi chú về nhóm 5: MVP chỉ có tiếng Việt theo D1. Nhu cầu tiếng Anh cho hồ sơ du học sẽ được đáp ứng khi bật locale `en` ở Phase 2.

## 3. Giá trị cốt lõi

Website phải giúp người xem nhanh chóng trả lời:
- Cao Đắc Chiến là ai?
- Có kinh nghiệm gì?
- Đã tạo ra kết quả gì?
- Có năng lực chuyên môn nào?
- Có thể liên hệ hoặc hợp tác bằng cách nào?

## 4. Kiến trúc thông tin

### MVP — 6 trang
Chốt theo D4.

- Home
- About
- Experience
- Projects
- Blog
- Contact

### Phase 2
- Resources
- Speaking / Teaching

Hai mục này bị lùi vì chưa có nội dung thật. Xuất bản trang rỗng vi phạm yêu cầu empty state có ý nghĩa ở §6.

## 5. Yêu cầu chức năng MVP

Nguồn dữ liệu của từng trang được chốt theo D2.

### Home
Nguồn: Supabase (profile, featured projects) + MDX (latest posts)
- Hero rõ định vị
- Featured projects
- Latest posts
- Career highlights
- CTA liên hệ

### About
Nguồn: Supabase (`profiles`)
- Biography
- Core values
- Skills
- Education
- Certifications
- Timeline

### Experience
Nguồn: Supabase (`experiences`)
- Company
- Role
- Period
- Responsibilities
- Quantified impact — chỉ số liệu đã được phép công khai, theo D6
- Related projects — liên kết tới `projects` qua khóa ngoại

### Projects
Nguồn: Supabase (`projects`, `project_media`)
- List và filter theo công nghệ
- Case study
- Problem / Solution / Result
- Gallery
- Tech stack
- Demo / GitHub nếu có

### Blog
Nguồn: MDX trong `content/blog/`
- Categories và tags từ frontmatter
- Search phía client trên chỉ mục tĩnh sinh lúc build
- Reading time tính lúc build
- Table of contents sinh từ heading
- Related posts theo category và tag chung
- SEO metadata cho từng bài

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

- Hoàn thành MVP 6 trang
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
