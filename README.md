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

- Next.js + React + TypeScript (App Router, static-first)
- **Native CSS + CSS Modules** (OD-CSS-1; không Tailwind/shadcn)
- **MDX cho bài viết và case study** (D35)
- **`profile.config.ts` cho hồ sơ và kinh nghiệm** (D35)
- **Supabase chỉ giữ bảng `contacts`** (D35)
- Triển khai: **hiện tại Vercel** phục vụ production và preview; **target đã duyệt là Cloudflare Pages** static-first (D56) — **chưa provision**. Chi tiết ở `docs/05-devops/DEPLOYMENT.md`
- Cloudflare cho DNS, SSL và bảo vệ tên miền
- GitHub branch `main` là source of truth cho source control
- Claude Code cho AI-assisted development

Ghi chú posture MVP: route **phẳng `/`**, ngôn ngữ mặc định **tiếng Việt** (`<html lang="vi">`), **không** `[locale]`/i18n ở MVP (D57 — song ngữ là Phase 2). Cơ chế build/deploy (static export/adapter) **chưa khóa** — quyết ở deployment checkpoint (D56).

> CSS approach đã khóa: **Native CSS + CSS Modules** (OD-CSS-1, `homepage-css-architecture-spec.md`) — không Tailwind/shadcn.

## Phát triển cục bộ

Yêu cầu: **Node 24.18.0** (xem `.nvmrc`) · **pnpm 10.15.1** (Corepack, xem `packageManager`).

```bash
corepack enable          # bật pnpm đúng version
pnpm install             # cài dependency
pnpm dev                 # chạy dev server (http://localhost:3000)
pnpm lint                # ESLint
pnpm typecheck           # TypeScript (tsc --noEmit)
pnpm build               # build production
pnpm check               # lint + typecheck
```

Milestone 1.1 mới là **nền móng kỹ thuật** (technical shell) — chưa phải homepage production.

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
| D10 | ~~MVP hỗ trợ cả light mode và dark mode~~ *(superseded by D46)* |
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
| D33 | 19 component; Search/Pagination/Filter/Newsletter → Phase 2 *(nay 18 sau D46)* |
| D34 | 12 Design Constraint |
| **D35** | **Option B — MDX-first; Supabase chỉ còn bảng `contacts`** |
| **D36** | **Design Direction: Strategic Editorial with Product-Level Precision** — editorial-first + interaction-first; tham khảo resend.com + recent.design; thêm P11–P13; Sound & Interaction (mặc định ON, future); tu chỉnh typography + container của D32 |
| D11 | Media storage = `public/` + `next/image` |
| D19 | Vercel Hobby → Pro khi bật consulting (gate 1.8) — *superseded bởi D56* |
| **D26** | **Nav 5 mục theo loại nội dung; Experience là section trong About** (tu chỉnh D4) |
| D27 | Newsletter hoãn Phase 2; MVP còn 19 component *(nay 18 sau D46)* |
| **D46** | **Section-based color composition; bỏ light/dark toggle** (supersede D10); loại `ThemeToggle` → 18 component |
| **D47** | **Khóa 4 primitive Kinetic** (White/Black/Grey/Orange) + semantic per surface; **Danger = Pending** |
| **D48** | **Geist Sans-only**; loại Geist Mono khỏi visible UI; số dùng `tabular-nums` |
| **D49** | **Radius contract R3** (control 8–10 · card 12–16 · panel 20–28 · signature 36–48) — supersede trần 8px D32 |
| **D50** | **Design Governance hierarchy**; ratify CDC Design Bible làm governance layer |
| **D56** | **Hosting MVP = Cloudflare Pages, static-first**; foundation deployment-agnostic; không mặc định Vercel (amend D19/D5) |
| **D57** | **Routing MVP phẳng `/`, `lang="vi"`**; không `[locale]`/i18n ở MVP; song ngữ Phase 2 (amend D1) |

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
- `docs/00-foundation/DECISION_LOG.md`: nhật ký quyết định D1–D50
- `docs/01-product/BRAND_POSITIONING.md`: **nguồn sự thật về định vị**
- `docs/01-product/PRODUCT_REQUIREMENTS.md`: yêu cầu sản phẩm
- `docs/01-product/CONTENT_INVENTORY.md`: danh mục nội dung thật cần cung cấp
- `docs/02-design/DESIGN_SYSTEM.md`: hệ thống thiết kế, Design Principles và Constraints
- `docs/02-design/INFORMATION_ARCHITECTURE.md`: sitemap, taxonomy, URL, điều hướng
- `docs/02-design/COMPONENT_INVENTORY.md`: 18 component MVP và kiến trúc Design Token (nguồn giá trị token)
- `docs/design-bible/`: **governance layer** (D50) — thinking model, anti-patterns, reference philosophy, review gates
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
