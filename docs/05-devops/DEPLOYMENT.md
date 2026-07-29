# Deployment

> **Tu chỉnh bởi D56 (2026-07-28):** **hosting target MVP = Cloudflare Pages, static-first.** Vercel **không còn** là production target bắt buộc. Foundation deployment-agnostic (không Vercel-specific config). **Cơ chế build/deploy** (static export `output:"export"` hoặc Cloudflare-compatible adapter) là **deferred deployment decision** — quyết ở deployment checkpoint riêng sau khi content/image/runtime rõ. Chưa deploy production. Phân biệt **"hosting target"** (Cloudflare Pages) với **"build/runtime mechanism"** (chưa khóa). Các mục Vercel dưới đây (cost table, rủi ro giấy phép, hạ tầng 0.6C) giữ để tra cứu lịch sử — **posture Vercel đã superseded**.

## Mô hình triển khai — tài liệu canonical (Deployment Governance Lock, 2026-07-29)

Đây là **nguồn sự thật duy nhất** về mô hình triển khai. Tài liệu khác chỉ tóm tắt hoặc trỏ về đây, không lặp lại quy trình.

Trạng thái được tách làm ba khối. **Không đọc khối "Kiến trúc mục tiêu đã duyệt" như mô tả hiện trạng.**

### Current reality — hiện trạng đang chạy

- **Vercel đang phục vụ cả production lẫn preview deployment.** Vercel project đặt production branch `main`; domain `caodacchien.io.vn` đang gắn vào Vercel; TLS cert do Vercel cấp.
- **Vercel repository checks đang hoạt động** trên pull request (GitHub integration).
- **GitHub branch `main` là source of truth.**
- **Local development dùng checkout của chính repository GitHub này.** Không tồn tại bản source riêng nằm ngoài Git.
- **Các deployment Vercel mới nhất đều Ready** (production và preview).

### Approved target architecture — kiến trúc mục tiêu đã duyệt

- **Cloudflare Pages là production hosting target đã duyệt cho tương lai** (D56, static-first).
- **Vercel về sau chỉ còn giữ vai preview deployment và repository checks**, không giữ vai production.
- **Application code phải deployment-agnostic.**
- **Không thêm vendor-specific configuration** (kể cả `vercel.json`) khi chưa có requirement được duyệt.

### Not yet completed — việc chưa làm

- [ ] Provision Cloudflare Pages production project
- [ ] Verify production deployment trên Cloudflare
- [ ] Migrate DNS và TLS từ Vercel sang Cloudflare
- [ ] Gỡ vai trò production của Vercel

Bốn mục trên **chưa thực hiện**. Cho tới khi cả bốn hoàn tất, D56 là **target đã duyệt**, **không phải hiện trạng**.

### Ràng buộc thường trực

- Không để production phụ thuộc bắt buộc vào Vercel.
- Một deployment Vercel **fail trong lịch sử** không đồng nghĩa production đang lỗi, khi deployment mới nhất ở trạng thái Ready.
- Mỗi milestone đã merge phải để local `main` đồng bộ `origin/main` và working tree sạch.

## Kiến trúc chi phí thấp

| Hạng mục | Dịch vụ | Tài khoản | Ghi chú |
| --- | --- | --- | --- |
| Domain | `caodacchien.io.vn` | cá nhân, đã sở hữu | |
| DNS/SSL | Cloudflare Free | cá nhân (chủ dự án) | |
| Source | GitHub | `caodacchien` | repository **Public** (D40) |
| Hosting — hiện tại | Vercel Hobby | cá nhân (chủ dự án) | đang phục vụ production và preview |
| Hosting — target đã duyệt | **Cloudflare Pages** Free (static-first, D56) | cá nhân (chủ dự án) | **chưa provision**; ~~Vercel Hobby → Pro (D19)~~ superseded bởi D56; cơ chế build/deploy chưa khóa |
| Database | Supabase Free | cá nhân (chủ dự án) | region **Singapore**, server-only (D42) |
| Analytics | Google Analytics 4 | cá nhân | chỉ GA4, xem D9 |
| Email | Resend | cá nhân | tích hợp ở Milestone 1.7, xem D8 |

Toàn bộ hạ tầng nằm dưới tài khoản cá nhân, không thuộc Roboworld. Xem D5.

### Runtime & Repository contract (D37, D38, D40, D42)

- **Node.js:** `24.18.0` — pin exact ở `.nvmrc`; `package.json.engines.node = ">=24.18.0 <25"`. Không upgrade/downgrade ngoài quyết định. Tương thích Next.js major sẽ xác minh lại ở Milestone 1.1.
- **pnpm:** `10.15.1` — pin qua `package.json.packageManager` (Corepack). Không cần `engines.pnpm`.
- **Repository visibility:** **Public** (D40). Secret và `.env*` tuyệt đối không commit; `.env*` đã nằm trong `.gitignore` (trừ `.env.example`).
- **Supabase:** dùng **server-only** (`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`); **không** ship credential Supabase xuống client. Không dùng `NEXT_PUBLIC_SUPABASE_*` ở MVP (D42, D35).
- **Milestone scope:** 0.6 chỉ gồm infrastructure/runtime/env contract + DNS/deploy readiness + freeze; application scaffold + full CI thuộc Milestone 1.1 (D37).
- **Follow-up không chặn (ghi 2026-07-29):** `engines.node` yêu cầu `>=24.18.0 <25` nhưng build trên Vercel chạy Node `24.15.0` (project setting `Node.js Version: 24.x`), sinh cảnh báo `Unsupported engine`. Build vẫn pass vì pnpm không bật `engine-strict`. Lưu ý `.nvmrc` **không** được Vercel đọc — Vercel dùng setting trên dashboard. **Không xử lý ở checkpoint này**; rà lại ở deployment checkpoint chuyển Cloudflare Pages.

### Rủi ro giấy phép Vercel Hobby — đã nâng mức

Gói Vercel Hobby cấm sử dụng cho mục đích thương mại.

Khi định vị còn là "website thương hiệu cá nhân" chung chung, rủi ro này ở mức lý thuyết. **D12 đã đổi tình thế.** Consulting và sản phẩm số giờ là mục đích được tuyên bố công khai của sản phẩm, xem `BRAND_POSITIONING.md` §4. Một trang mời gọi tư vấn trả phí rất khó lập luận là phi thương mại.

Hướng xử lý, chờ chốt tại D19:

- Phase 1: giữ Hobby, MVP không đặt lời mời chào dịch vụ trả phí.
- Ngay khi bật nội dung consulting: nâng Vercel Pro, khoảng 20 USD mỗi tháng.

Đây là ngoại lệ có lý do đối với nguyên tắc free tier ở `PROJECT_CONSTITUTION.md` §2.2. Nguyên tắc đó cho phép thêm dịch vụ trả phí khi có nhu cầu thực tế, và tránh bị gỡ site đúng lúc khách hàng đang xem là nhu cầu thực tế.

### Không dùng ở MVP

- Microsoft Clarity. Lùi sang Phase 2 để giảm script bên thứ ba và đơn giản hóa cookie consent. Xem D9.
- Supabase Auth. MVP không có đăng nhập. Xem D3.

## Quy trình

```text
Local checkout (cùng repository GitHub)
  -> Git commit
  -> Push branch lên GitHub
  -> Vercel preview deployment + repository checks
  -> Review
  -> Squash merge vào `main`
  -> Production deployment
     (target đã duyệt: Cloudflare Pages — D56; hiện tại: Vercel — xem "Mô hình triển khai")
```

**CI GitHub Actions — chưa triển khai.** Repository hiện **không có** workflow nào trong `.github/workflows/`. Yêu cầu "pull request phải qua CI GitHub Actions với typecheck, lint và build trước khi merge" thuộc phạm vi Milestone 1.1 nhưng **chưa đạt**. Gate chất lượng trước merge hiện dựa vào lint/typecheck/build chạy cục bộ cộng với Vercel deployment check. Cần đóng ở checkpoint hạ tầng riêng.

## Môi trường

- Local
- Preview
- Production

Không dùng chung secret giữa các môi trường nếu không cần. Supabase project của preview và production nên tách riêng khi bắt đầu có dữ liệu thật.

## Biến môi trường

Khai báo tại `.env.example` với giá trị rỗng. Giá trị thật chỉ đặt trong `.env.local` ở máy cá nhân và trong environment variables của nền tảng đang phục vụ môi trường đó — hiện tại là Vercel (preview và production); sau khi chuyển production sang Cloudflare Pages thì là Cloudflare Pages cho production.

| Biến | Milestone | Client-side | Ghi chú |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 1.1 | có | |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | 1.1 | có | `vi` |
| `SUPABASE_URL` | 1.7 | **không** | server-only; chỉ dùng cho contact form (D42) |
| `SUPABASE_SERVICE_ROLE_KEY` | 1.7 | **không** | chỉ dùng phía server, ghi `contacts` qua Server Action |
| `RESEND_API_KEY` | 1.7 | **không** | chưa tạo ở Phase 0 |
| `CONTACT_TO_EMAIL` | 1.7 | **không** | `forwork.chiencd@gmail.com` |
| `CONTACT_IP_HASH_SALT` | 1.7 | **không** | salt cho băm IP |
| `NEXT_PUBLIC_GA_ID` | 1.8 | có | |

Không commit API key hoặc bất kỳ secret nào. `.env.local` đã nằm trong `.gitignore`.

## Checklist trước production

### Chất lượng
- Build pass
- Typecheck pass
- Lint pass
- Test pass

### Nội dung
- Không còn chuỗi `PLACEHOLDER:` hoặc `DRAFT:` trong nội dung công khai
- Nội dung liên quan Roboworld đã được chủ dự án kiểm duyệt
- Không có số liệu hoặc thành tích chưa được xác nhận
- **Content readiness gate (D52–D55):**
  - **Không render public placeholder** (bài/case/dịch vụ giả) — chưa đủ nội dung thật thì **omit** (D54/D55)
  - **Không render social URL chưa xác nhận** — chỉ Email + RSS (+ LinkedIn khi có URL thật); GitHub không phải social MVP (D52/D53)
  - **Không render "Làm việc cùng tôi"** khi `servicesOffered` chưa được Owner duyệt (D54)
  - **Không render case metric** chưa được phép công khai (D6/D55); không fake/sample metric

### SEO
- Sitemap
- robots.txt
- Canonical
- OpenGraph và Twitter card
- JSON-LD cho Person và Article

### Giao diện
- Kiểm tra tương phản AA **theo từng surface** (section-based, D46 — không light/dark toggle)
- Lighthouse đạt mục tiêu
- Kiểm tra bàn phím và focus ring

### Hạ tầng và bảo mật
- Env variables đầy đủ ở đúng môi trường
- `SUPABASE_SERVICE_ROLE_KEY` không lọt vào bundle client
- Theo D35: nội dung công khai là MDX/config, không đọc từ database. Supabase dùng **server-only** (D42) — chỉ `SUPABASE_URL` + service role phía server; **không** ship credential Supabase xuống client. Bảng `contacts` bật RLS deny-all cho anon; ghi qua Server Action
- Contact form rate limit hoạt động
- Trang Privacy Policy đã có
- Analytics consent nếu cần
- Domain và SSL

## Cloudflare

Cloudflare được dùng cho:
- DNS
- SSL
- Basic protection
- Domain management

Không bật proxy hoặc caching rule phức tạp trước khi xác nhận tương thích với nền tảng đang phục vụ production.

Lưu ý riêng cho `.io.vn`: **đã xác nhận (Milestone 0.6C, 2026-07-25)** — nhà đăng ký **Nhân Hòa** cho phép đổi nameserver; nameserver đã trỏ sang Cloudflare và zone active. Rủi ro R4 đã giải quyết.

## Hiện trạng hạ tầng đã xác minh (Milestone 0.6C — 2026-07-25)

Ghi lại fact **không chứa secret**. Đây là bằng chứng hạ tầng đã thiết lập, không phải cấu hình runtime (secret/table/CI vẫn ở milestone sau).

> **Bảng dưới là ảnh chụp ngày 2026-07-25** và giữ nguyên làm mốc lịch sử. Hai điểm đã thay đổi tính đến 2026-07-29: application scaffold **đã có** (nên ghi chú "404 là expected" không còn đúng), và Vercel Framework Preset đã đổi từ `Other` sang `Next.js`. Hiện trạng mới nhất xem mục **Mô hình triển khai** ở đầu tài liệu.

| Hạng mục | Hiện trạng |
| --- | --- |
| GitHub repository | `caodacchien/caodacchien-website` — **Public**, default branch `main` |
| GitHub protection | Ruleset **"Protect Main Branch"** active: require PR before merging, required approvals = 0, block force pushes, **chưa** required status checks (CI ở 1.1) |
| Vercel | project `caodacchien-website`, gói **Hobby**, GitHub đã kết nối, production branch `main`, deployment **Ready** (404 hiện tại là expected — chưa có application scaffold) |
| Vercel custom domain | `caodacchien.io.vn` — **Valid Configuration** |
| Supabase | project `caodacchien-website`, gói **Free**, region **Southeast Asia (Singapore) `ap-southeast-1`**. Chưa tạo table/migration/integration/key |
| Cloudflare | gói **Free**, zone `caodacchien.io.vn` **active/protected** |
| Nameserver | đã trỏ sang cặp nameserver do Cloudflare cấp cho zone. Giá trị cụ thể **không ghi ở đây** vì có thể thay đổi — xác minh bằng `dig NS caodacchien.io.vn +short` hoặc mục Cloudflare → DNS → Nameservers |
| DNS record → Vercel | **DNS only** (không proxy), đúng ràng buộc mục Cloudflare bên dưới |
| TLS/SSL | Cert do **Vercel** cấp (vì DNS-only); Cloudflare hiện đóng vai trò **authoritative DNS**. HTTPS đã xác minh hoạt động, không cảnh báo chứng chỉ |
| Registrar | Nhân Hòa |
| Secrets / DB / CI | **Chưa** nhập secret thật · **chưa** tạo database table/migration · **chưa** tạo CI |
| Chi phí | GitHub Free · Vercel Hobby · Cloudflare Free · Supabase Free — không kích hoạt dịch vụ trả phí |

## Vận hành Supabase Free

Supabase Free tạm dừng project sau 7 ngày không có hoạt động. Đây là một lý do khiến blog được đặt trong MDX theo D2: trang có giá trị SEO cao nhất được build tĩnh và không phụ thuộc trạng thái của database.
