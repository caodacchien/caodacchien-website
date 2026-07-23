# Roadmap

Cập nhật 2026-07-23 theo Decision Log D1–D10.

## Phase 0 — Foundation

Chỉ làm tài liệu và hạ tầng. Không viết application code.

| # | Milestone | Nội dung | Điều kiện hoàn thành |
| --- | --- | --- | --- |
| 0.1 | Giải quyết mâu thuẫn | Ghi Decision Log D1–D10, sửa mọi tài liệu cho nhất quán | Không còn mâu thuẫn giữa các tài liệu |
| 0.2 | Chốt MVP scope | PRD v1.0 với 6 trang và acceptance criteria | Chủ dự án duyệt PRD |
| 0.3 | Design Direction | Đề xuất 3–5 hướng thiết kế, mỗi hướng mô tả cả light lẫn dark mode | Chủ dự án chọn 1 hướng |
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
| 1.4 | Home và About | Hero, featured projects, latest posts, career highlights, CTA; About với bio, values, skills, education, certifications, timeline | **Cổng mở khóa nội dung** trong `CONTENT_INVENTORY.md` đạt `READY` |
| 1.5 | Experience và Projects | Danh sách, filter theo công nghệ, trang case study Problem/Solution/Result, gallery, tech stack | 1.4 xong |
| 1.6 | Blog | Danh sách, category, tag, search phía client, reading time, table of contents, related posts, SEO từng bài | 1.3 xong |
| 1.7 | Contact | Form với validation server-side, honeypot, rate limit, ghi Supabase qua Server Action, gửi email qua Resend | 1.3 xong |
| 1.8 | SEO, Analytics và Deploy | sitemap.xml, robots.txt, canonical, OpenGraph, OG image động, JSON-LD, GA4, Privacy Policy, tối ưu Lighthouse, chạy toàn bộ checklist trước production | mọi milestone trên xong |

Deploy production chỉ thực hiện khi chủ dự án yêu cầu rõ ràng.

### Đường găng của Phase 1

1. Design Direction ở 0.3 và 0.4 chặn 1.2 trở đi.
2. Nội dung thật trong `CONTENT_INVENTORY.md` chặn 1.4 trở đi.

Milestone 1.6 và 1.7 chỉ phụ thuộc 1.3 nên có thể làm trước 1.4 nếu nội dung chưa sẵn sàng.

## Phase 2 — Content Operations

- CMS và Supabase Auth
- Media management
- Draft / Review / Publish
- Trang Resources
- Trang Speaking / Teaching
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
