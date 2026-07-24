# Personal Brand OS

Nền tảng xuất bản cá nhân của **Cao Đắc Chiến** tại `caodacchien.io.vn`.

## Định vị

**Cao Đắc Chiến — Marketing Leader / Brand & Marketing Strategist.**

Website là **Publishing Platform** của người đó. Không phải portfolio, không phải gallery, không phải personal homepage, không phải consulting landing page, không phải website công ty.

Nguồn sự thật: `docs/01-product/BRAND_POSITIONING.md`. Chốt theo D12, tinh chỉnh theo D20, D21, D22.

Mười vùng năng lực website phải chứng minh: Marketing Strategy · Brand Strategy · Communication Strategy · Content Marketing · Digital Marketing · Marketing Automation · AI for Marketing · Marketing Leadership · Business Growth · quan điểm cá nhân về marketing và truyền thông.

Cảm giác đích: **tổng hành dinh số của một Marketing Leader**.

Hướng thiết kế đã khóa (D36): **A Strategic Editorial Platform for a Marketing Leader** — *Strategic Editorial with Product-Level Precision*, editorial-first.

## Mục tiêu

Hệ thống là nền tảng xuất bản cho:

- Bài viết chuyên sâu dạng dài
- Case study
- Trưng bày dự án
- Hướng dẫn marketing thực chiến
- Framework và template
- Speaking
- Consulting
- Sản phẩm số trong tương lai

Roboworld là **một case study trong nhiều case study**, không phải khung định vị. Xem D13.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS + shadcn/ui
- **MDX cho bài viết và case study** (D35)
- **`profile.config.ts` cho hồ sơ và kinh nghiệm** (D35)
- **Supabase chỉ giữ bảng `contacts`** (D35)
- Vercel cho triển khai ứng dụng
- Cloudflare cho DNS, SSL và bảo vệ tên miền
- GitHub cho source control
- Claude Code cho AI-assisted development

## Quyết định đã chốt

Chi tiết tại `docs/00-foundation/DECISION_LOG.md`.

| ID | Quyết định |
| --- | --- |
| D1 | MVP chỉ tiếng Việt, kiến trúc sẵn sàng song ngữ |
| D2 | Blog dùng MDX, dữ liệu có cấu trúc dùng Supabase *(amended by D35: toàn bộ nội dung sang MDX/config, Supabase chỉ còn `contacts`)* |
| D3 | MVP không có CMS và không có Authentication |
| D4 | MVP scope trang *(tu chỉnh bởi D26: Home · Viết · Case study · Chủ đề · About+Experience · Contact)* |
| D5 | Toàn bộ hạ tầng thuộc tài khoản cá nhân, không thuộc Roboworld |
| D6 | Ranh giới thông tin với Roboworld, nội dung liên quan phải được kiểm duyệt |
| D7 | Cấm bịa nội dung, placeholder phải đánh dấu rõ |
| D8 | Email dùng Resend, tích hợp ở Milestone 1.7 |
| D9 | MVP chỉ dùng Google Analytics 4 |
| D10 | MVP hỗ trợ cả light mode và dark mode |
| **D12** | **Định vị: Publishing Platform, không phải portfolio** (tinh chỉnh bởi D20) |
| D13 | Roboworld là một case study, không phải khung định vị |
| D14 | `projects` là mô hình case study marketing, không phải dự án phần mềm |
| D15 | Tệp khán giả định nghĩa lại, có xếp ưu tiên |
| D16 | Năm trụ nội dung cố định |
| D17 | Hủy kết quả Milestone 0.3, làm lại theo định vị mới |
| D18 | MVP giữ khối "Làm việc cùng tôi" trên Home và About, Resources sang Phase 2 *(nav sau đó chốt 5 mục theo D26)* |
| **D20** | **Định vị đầy đủ: Marketing Leader / Brand & Marketing Strategist** |
| D21 | Thứ tự khán giả: CEO/Founder trước, nhà tuyển dụng cuối |
| **D22** | **Triết lý thiết kế: khả năng đọc → xuất bản → mở rộng → thẩm mỹ** |
| D23 | Chuyển đổi hai tầng (newsletter → tư vấn lọc); trần 2 CTA/trang |
| D24 | Thứ tự cảm giác: Editorial trước; loại Academic, hạ Friendly |
| D25 | Luồng Home; Home lấy nội dung nổi bật qua `featured: true` |
| D29 | **Design Direction: Tòa soạn + Thư viện + khối dữ liệu** |
| D30 | 8 Design Principle là tầng quyết định cao nhất |
| D31 | Information Architecture; giữ `/topics/[pillar]` 5 trụ |
| D32 | Kiến trúc Design Token (màu điền ở 0.4) |
| D33 | 19 component; Search/Pagination/Filter/Newsletter → Phase 2 |
| D34 | 12 Design Constraint |
| **D35** | **Option B — MDX-first; Supabase chỉ còn bảng `contacts`** |
| **D36** | **Design Direction: Strategic Editorial with Product-Level Precision** — editorial-first + interaction-first; tham khảo resend.com + recent.design; thêm P11–P13; Sound & Interaction (mặc định ON, future); tu chỉnh typography + container của D32 |
| D11 | Media storage = `public/` + `next/image` |
| D19 | Vercel Hobby → Pro khi bật consulting (gate 1.8) |
| **D26** | **Nav 5 mục theo loại nội dung; Experience là section trong About** (tu chỉnh D4) |
| D27 | Newsletter hoãn Phase 2; MVP còn 19 component |

**Không còn Decision OPEN trong Foundation** (đóng ở Milestone 0.5D — 2026-07-25). Future Enhancement (Sound, View Transitions, header collapse, PWA) ở `DESIGN_SYSTEM.md`.

## Nguyên tắc bắt buộc

1. Không bắt đầu code trước khi hoàn tất Product Requirements và Design Direction.
2. Không tự ý thay đổi Design System sau khi đã được duyệt.
3. Mỗi milestone phải có checklist chức năng, SEO, hiệu năng, bảo mật, nội dung và kiểm thử.
4. Repository là nguồn sự thật duy nhất của dự án.
5. Mọi quyết định quan trọng phải được ghi vào Decision Log.
6. Không bịa nội dung, không đưa dữ liệu mật của Roboworld lên website.

## Cấu trúc tài liệu

- `CLAUDE.md`: hướng dẫn Claude Code
- `docs/00-foundation/PROJECT_CONSTITUTION.md`: hiến pháp dự án
- `docs/00-foundation/DECISION_LOG.md`: nhật ký quyết định D1–D35
- `docs/01-product/BRAND_POSITIONING.md`: **nguồn sự thật về định vị**
- `docs/01-product/PRODUCT_REQUIREMENTS.md`: yêu cầu sản phẩm
- `docs/01-product/CONTENT_INVENTORY.md`: danh mục nội dung thật cần cung cấp
- `docs/02-design/DESIGN_SYSTEM.md`: hệ thống thiết kế, Design Principles và Constraints
- `docs/02-design/INFORMATION_ARCHITECTURE.md`: sitemap, taxonomy, URL, điều hướng
- `docs/02-design/COMPONENT_INVENTORY.md`: 19 component MVP và kiến trúc Design Token
- `docs/03-engineering/SYSTEM_ARCHITECTURE.md`: kiến trúc hệ thống
- `docs/03-engineering/DATABASE.md`: mô hình dữ liệu
- `docs/04-ai/AI_RULEBOOK.md`: quy tắc AI
- `docs/05-devops/DEPLOYMENT.md`: triển khai
- `docs/06-operations/ROADMAP.md`: lộ trình
- `START_HERE.md`: hướng dẫn khởi động

## Trạng thái

**Phase hiện tại:** Phase 0 — Foundation
**Milestone hiện tại:** 0.1, 0.2, 0.2b, 0.3, 0.5 (A–D) hoàn tất. **Không còn Decision OPEN.**
**Chặn Phase 1:** Milestone 0.4 (giá trị màu + font + wireframe) chưa xong; và `CONTENT_INVENTORY.md` chưa có nội dung thật.

**Không được viết production code trước khi Design System được khóa màu ở 0.4.**
