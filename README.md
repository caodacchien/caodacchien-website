# Personal Brand OS

Nền tảng thương hiệu cá nhân của **Cao Đắc Chiến** tại `caodacchien.io.vn`.

## Mục tiêu

Dự án được xây dựng theo hướng **Personal Brand OS**, không chỉ là website portfolio. Hệ thống phục vụ:

- Xây dựng thương hiệu cá nhân
- Hồ sơ ứng tuyển
- Portfolio động
- Blog chuyên môn
- Hồ sơ du học
- Chia sẻ tài nguyên
- CMS và AI-assisted content workflow
- Mở rộng newsletter, community và automation trong tương lai

## Stack

- Next.js + React + TypeScript
- Tailwind CSS + shadcn/ui
- MDX cho bài viết blog
- Supabase cho Database
- Vercel cho triển khai ứng dụng
- Cloudflare cho DNS, SSL và bảo vệ tên miền
- GitHub cho source control
- Claude Code cho AI-assisted development

## Quyết định đã chốt

Chi tiết tại `docs/00-foundation/DECISION_LOG.md`.

| ID | Quyết định |
| --- | --- |
| D1 | MVP chỉ tiếng Việt, kiến trúc sẵn sàng song ngữ |
| D2 | Blog dùng MDX, dữ liệu có cấu trúc dùng Supabase |
| D3 | MVP không có CMS và không có Authentication |
| D4 | MVP gồm 6 trang: Home, About, Experience, Projects, Blog, Contact |
| D5 | Toàn bộ hạ tầng thuộc tài khoản cá nhân, không thuộc Roboworld |
| D6 | Ranh giới thông tin với Roboworld, nội dung liên quan phải được kiểm duyệt |
| D7 | Cấm bịa nội dung, placeholder phải đánh dấu rõ |
| D8 | Email dùng Resend, tích hợp ở Milestone 1.7 |
| D9 | MVP chỉ dùng Google Analytics 4 |
| D10 | MVP hỗ trợ cả light mode và dark mode |

Còn mở: **D11** — media storage, cần chốt trước Milestone 1.3.

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
- `docs/00-foundation/DECISION_LOG.md`: nhật ký quyết định D1–D11
- `docs/01-product/PRODUCT_REQUIREMENTS.md`: yêu cầu sản phẩm
- `docs/01-product/CONTENT_INVENTORY.md`: danh mục nội dung thật cần cung cấp
- `docs/02-design/DESIGN_SYSTEM.md`: hệ thống thiết kế
- `docs/03-engineering/SYSTEM_ARCHITECTURE.md`: kiến trúc hệ thống
- `docs/03-engineering/DATABASE.md`: mô hình dữ liệu
- `docs/04-ai/AI_RULEBOOK.md`: quy tắc AI
- `docs/05-devops/DEPLOYMENT.md`: triển khai
- `docs/06-operations/ROADMAP.md`: lộ trình
- `START_HERE.md`: hướng dẫn khởi động

## Trạng thái

**Phase hiện tại:** Phase 0 — Foundation
**Milestone hiện tại:** 0.1 và 0.2 hoàn tất. Tiếp theo là 0.3 Design Direction.
**Chặn Phase 1:** Design Direction chưa chọn, và `CONTENT_INVENTORY.md` chưa có nội dung thật.

**Không được viết production code trước khi Design System được khóa.**
