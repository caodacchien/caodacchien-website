# Roadmap

Cập nhật 2026-07-23 theo Decision Log D1–D19.

Định vị sản phẩm nằm ở `docs/01-product/BRAND_POSITIONING.md`. Sản phẩm là nền tảng xuất bản, không phải portfolio. Mọi milestone phải phục vụ định vị đó.

## Phase 0 — Foundation

Chỉ làm tài liệu và hạ tầng. Không viết application code.

| # | Milestone | Nội dung | Điều kiện hoàn thành |
| --- | --- | --- | --- |
| 0.1 | Giải quyết mâu thuẫn | Ghi Decision Log D1–D10, sửa mọi tài liệu cho nhất quán | ✅ Xong |
| 0.2 | Chốt MVP scope | PRD v1.0 với 6 trang và acceptance criteria | ✅ Xong |
| **0.2b** | **Reset định vị sản phẩm** | Tạo `BRAND_POSITIONING.md`, ghi D12–D22, gỡ archetype portfolio lập trình viên khỏi toàn bộ tài liệu | ✅ Xong |
| 0.3 | Design Direction — **làm lại từ đầu** | Nghiên cứu tối thiểu 30 website thật, tổng hợp thành 5 hướng thiết kế hoàn toàn mới theo định vị D20 và triết lý D22. Kết quả lần một đã hủy theo D17 và **không được tái sử dụng** | Chủ dự án chọn 1 hướng |
| 0.4 | Design Tokens và Wireframe | Semantic token cho hai chế độ, kiểm tra tương phản AA, wireframe desktop/tablet/mobile, UI spec đầy đủ trạng thái | `DESIGN_SYSTEM.md` được khóa |
| 0.5 | Khóa kiến trúc và database | Chốt D11 media storage, hoàn thiện schema, RLS, migration plan và rollback plan | Chủ dự án duyệt `SYSTEM_ARCHITECTURE.md` và `DATABASE.md` |
| 0.6 | Hạ tầng | Tạo GitHub repo, kết nối Vercel, tạo Supabase project, xác nhận `.io.vn` trỏ được nameserver sang Cloudflare | Ba môi trường sẵn sàng |

Song song, chủ dự án điền `docs/01-product/CONTENT_INVENTORY.md`. Đây là đường găng của Phase 1.

## Phase 1 — MVP

Mỗi milestone là một pull request riêng. Không gộp.

| # | Milestone | Phạm vi | Điều kiện mở khóa |
| --- | --- | --- | --- |
| 1.1 | Project setup | Next.js App Router, TypeScript strict, Tailwind với token từ 0.4, shadcn/ui, ESLint, Prettier, Zod, cấu trúc `src/` theo kiến trúc, `[locale]` routing, MDX pipeline, `.nvmrc`, CI GitHub Actions | 0.4 và 0.6 xong |
| 1.2 | Global layout | Header, navigation 6 mục, footer, theme provider với system/light/dark, skip link, focus ring, container, trang 404 và 500 | 1.1 xong |
| 1.3 | Data layer | Supabase client tách server và browser, migration đầu tiên với RLS đầy đủ, content service layer hợp nhất MDX và database, Zod schema, seed dữ liệu | 1.2 xong, D11 đã chốt |
| 1.4 | Home và About | Hero, latest posts, featured case studies, career highlights, **khối "Làm việc cùng tôi"** theo D18, CTA; About với bio, values, skills, education, certifications, timeline và khối "Làm việc cùng tôi" | **Cổng mở khóa nội dung** trong `CONTENT_INVENTORY.md` đạt `READY` |
| 1.5 | Experience và Case study | Danh sách, filter theo **dịch vụ và ngành**, trang case study Bối cảnh/Vấn đề/Cách tiếp cận/Kết quả, số liệu kết quả có cấu trúc, gallery | 1.4 xong |
| 1.6 | Blog | Danh sách, **phân loại theo 5 trụ nội dung của D16**, tag, search phía client, reading time, table of contents, related posts, SEO từng bài | 1.3 xong |
| 1.7 | Contact | Form với validation server-side, honeypot, rate limit, ghi Supabase qua Server Action, gửi email qua Resend | 1.3 xong |
| 1.8 | SEO, Analytics và Deploy | sitemap.xml, robots.txt, canonical, OpenGraph, OG image động, JSON-LD, GA4, Privacy Policy, tối ưu Lighthouse, chạy toàn bộ checklist trước production | mọi milestone trên xong |

Deploy production chỉ thực hiện khi chủ dự án yêu cầu rõ ràng.

### Đường găng của Phase 1

1. Design Direction ở 0.3 và 0.4 chặn 1.2 trở đi.
2. Nội dung thật trong `CONTENT_INVENTORY.md` chặn 1.4 trở đi.

Milestone 1.6 và 1.7 chỉ phụ thuộc 1.3 nên có thể làm trước 1.4 nếu nội dung chưa sẵn sàng.

## Phase 2 — Content Operations

Ưu tiên Phase 2 đã thay đổi theo D12. Với định vị nền tảng xuất bản, Resources không còn là phần phụ mà là hạ tầng chứng minh năng lực.

- **Trang Resources: framework và template tải về** — ưu tiên cao nhất của Phase 2 nếu D18 không kéo nó vào MVP
- **Trang Speaking / Teaching** — phục vụ nhóm khán giả số 4
- CMS và Supabase Auth
- Media management
- Draft / Review / Publish
- Locale tiếng Anh
- Newsletter
- Cân nhắc lại Microsoft Clarity
- Cân nhắc Cloudflare Turnstile nếu contact form bị lạm dụng

## Phase 3 — AI Assistance

- Generate draft
- Improve writing
- SEO suggestions
- Tags and metadata
- Manual review before publish

## Phase 4 — Community

- Subscription
- Community features
- Events / Speaking
- Knowledge base
- Mini CRM

## Milestone rule

Mỗi milestone phải có:
- Scope
- Acceptance criteria
- Test checklist
- SEO checklist
- Performance checklist
- Security checklist
- Content checklist: không có nội dung bịa, không còn placeholder chưa đánh dấu
- Documentation update
