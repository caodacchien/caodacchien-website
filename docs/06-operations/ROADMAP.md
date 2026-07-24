# Roadmap

Cập nhật 2026-07-25 theo Decision Log D1–D36 (D26/D27/D11/D19 đã đóng ở Milestone 0.5D).

Định vị sản phẩm nằm ở `docs/01-product/BRAND_POSITIONING.md`. Sản phẩm là nền tảng xuất bản, không phải portfolio. Mọi milestone phải phục vụ định vị đó.

## Phase 0 — Foundation

Chỉ làm tài liệu và hạ tầng. Không viết application code.

| # | Milestone | Nội dung | Điều kiện hoàn thành |
| --- | --- | --- | --- |
| 0.1 | Giải quyết mâu thuẫn | Ghi Decision Log D1–D10, sửa mọi tài liệu cho nhất quán | ✅ Xong |
| 0.2 | Chốt MVP scope | PRD v1.0 với 6 trang và acceptance criteria | ✅ Xong |
| **0.2b** | **Reset định vị sản phẩm** | Tạo `BRAND_POSITIONING.md`, ghi D12–D22, gỡ archetype portfolio lập trình viên khỏi toàn bộ tài liệu | ✅ Xong |
| 0.3 | Design Direction + UX/IA/Architecture | Nghiên cứu website thật, khóa Design Direction (D29), Design Principles (D30), IA (D31), Token (D32), Component (D33), Constraint (D34), Option B MDX-first (D35) | ✅ Xong |
| 0.4 | Design Tokens (màu) và Wireframe | Điền giá trị màu vào kiến trúc token đã có, kiểm tra tương phản AA hai chế độ, kiểm dấu tiếng Việt ở 15px, wireframe desktop/tablet/mobile | `DESIGN_SYSTEM.md` khóa màu |
| 0.5 | Foundation research + Decision lock | 0.5A research (Design DNA/Layout/Wireframe/Motion), 0.5B consolidation, 0.5C decision review, **0.5D: đóng D11(public/)·D19(Hobby→Pro)·D26(nav 5 mục)·D27(newsletter Phase 2)** | ✅ Xong (không còn Decision OPEN) |
| 0.6 | Hạ tầng (D37) | Infrastructure accounts + runtime/repo contract + env contract + DNS/deploy readiness + freeze. **Application scaffold và full CI vẫn thuộc Milestone 1.1**, phụ thuộc 0.4 | Ba môi trường sẵn sàng + freeze |
| 0.6A | Research & Readiness Audit | Audit repo/runtime, scope matrix, risk register, quyết định O-1..O-6 | ✅ Xong |
| 0.6B | Runtime & Repository Baseline | `.nvmrc` (Node 24.18.0, D38), `engines.node`, env contract Supabase server-only (D42), ghi D37–D42, đồng bộ docs hạ tầng | Đang thực hiện |
| 0.6C | Owner Infrastructure Setup | Owner thao tác dashboard: Vercel · Supabase (region Singapore) · Cloudflare · DNS `.io.vn` · branch protection · env vars | Chờ |
| 0.6D | Infrastructure Audit & Freeze | Verify env/DNS/branch-protect; tag mốc `v0.6` | Chờ |

Song song, chủ dự án điền `docs/01-product/CONTENT_INVENTORY.md`. Đây là đường găng của Phase 1.

## Phase 1 — MVP

Mỗi milestone là một pull request riêng. Không gộp.

| # | Milestone | Phạm vi | Điều kiện mở khóa |
| --- | --- | --- | --- |
| 1.1 | Project setup | Next.js App Router, TS strict, Tailwind với token từ 0.4, shadcn/ui, ESLint, Prettier, Zod, cấu trúc `src/` theo kiến trúc, `[locale]` routing, **MDX pipeline (writing + case-studies)**, `profile.config.ts`, `.nvmrc`, CI GitHub Actions | 0.4 và 0.6 xong |
| 1.2 | Global layout | Header (nav 5 mục, D26), footer, theme provider system/light/dark, skip link, focus ring, container, 404/500. 19 component MVP theo D33/D27 | 1.1 xong |
| 1.3 | Content layer | Lớp đọc MDX (writing, case-studies), đọc `profile.config.ts`, Zod schema frontmatter, `/topics/[pillar]`, seed nội dung DRAFT. **Không có migration nội dung — chỉ dữ liệu tĩnh** | 1.2 xong |
| 1.4 | Home và About | Home theo luồng D25 (featured articles + featured case study + bản đồ trụ + Làm việc cùng tôi); About với bio, values, skills, education, certifications, experience timeline, Làm việc cùng tôi | **Cổng mở khóa nội dung** trong `CONTENT_INVENTORY.md` đạt `READY` |
| 1.5 | Case study | Danh sách (hiển thị hết — **filter Phase 2**), trang case study Bối cảnh/Vấn đề/Cách tiếp cận/Kết quả, `MetricGroup`, gallery | 1.4 xong |
| 1.6 | Writing (bài viết) | Danh sách + hub `/topics/[pillar]` theo 5 trụ, reading time, TOC, related cùng trụ, SEO từng bài. **Search và tag Phase 2** | 1.3 xong |
| 1.7 | Contact | Form validation server-side, honeypot, rate limit, ghi bảng `contacts` qua Server Action, gửi email qua Resend | 1.3 xong |
| 1.8 | SEO, Analytics và Deploy | sitemap.xml, robots.txt, canonical, OpenGraph, OG image động, JSON-LD, GA4, Privacy Policy, tối ưu Lighthouse, chạy toàn bộ checklist trước production | mọi milestone trên xong |

Deploy production chỉ thực hiện khi chủ dự án yêu cầu rõ ràng.

### Đường găng của Phase 1

1. Design Direction ở 0.3 và 0.4 chặn 1.2 trở đi.
2. Nội dung thật trong `CONTENT_INVENTORY.md` chặn 1.4 trở đi.

Milestone 1.6 và 1.7 chỉ phụ thuộc 1.3 nên có thể làm trước 1.4 nếu nội dung chưa sẵn sàng.

## Phase 2 — Content Operations

Ưu tiên Phase 2 đã thay đổi theo D12. Với định vị nền tảng xuất bản, Resources không còn là phần phụ mà là hạ tầng chứng minh năng lực.

- **Search, Pagination, Filter** — hoãn từ MVP theo D33
- **Tags và trang `/tags/[tag]`** — hoãn từ MVP theo D31
- **Trang Resources: framework và template tải về** — ưu tiên cao của Phase 2
- **Trang Speaking / Teaching** — phục vụ nhóm khán giả số 4
- Newsletter đầy đủ *(nếu R6/D27 không kéo bản nhúng vào MVP)*
- CMS và Supabase Auth
- Media management
- Draft / Review / Publish
- Locale tiếng Anh
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
