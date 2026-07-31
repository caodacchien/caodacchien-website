# caodacchien.io.vn

Nền tảng xuất bản cá nhân của **Cao Đắc Chiến** — Marketing Leader, Brand & Marketing Strategist.

Website cá nhân nhưng hướng ra cộng đồng: bài viết về chiến lược marketing, thương hiệu và
truyền thông, kèm tài liệu tải về dùng được ngay.

## Chạy trên máy

```bash
pnpm install
cp .env.example .env.local     # rồi điền giá trị thật
pnpm dev
```

| Địa chỉ | Là gì |
|---|---|
| http://localhost:3000 | Website |
| http://localhost:3000/admin | Trang quản trị nội dung |

Lần đầu vào `/admin` sẽ có màn hình tạo tài khoản quản trị.

## Ngăn xếp

Next.js 15 · React 19 · TypeScript · Payload CMS 3 · Supabase Postgres ·
CSS thuần + CSS Modules · Vercel

## Lệnh

```bash
pnpm dev                  # phát triển
pnpm check                # lint + typecheck
pnpm build                # dựng bản production — PHẢI dừng dev trước
pnpm generate:types       # sinh lại kiểu sau khi đổi collection
pnpm generate:importmap   # sau khi thêm plugin có giao diện
```

## Quy trình lên sóng

```
Máy cá nhân → git push → GitHub → Vercel tự dựng → caodacchien.io.vn
```

Đẩy lên nhánh `main` là thay bản đang chạy thật. Đẩy lên nhánh khác thì Vercel tạo một
đường link xem thử riêng, không đụng tới tên miền chính.

## Tài liệu

- **`CLAUDE.md`** — nguồn sự thật về kiến trúc, hệ thiết kế, quy tắc viết code và những cái
  bẫy đã sập. Đọc file này trước khi sửa bất cứ thứ gì.
- **`docs/archive/`** — tài liệu Phase 0, đã hết hiệu lực, chỉ giữ để tra cứu lịch sử.
  Xem `docs/archive/README.md` để biết bốn thứ đã đổi so với thời đó.
