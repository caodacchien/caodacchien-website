# Deployment

## Kiến trúc chi phí thấp

| Hạng mục | Dịch vụ | Tài khoản | Ghi chú |
| --- | --- | --- | --- |
| Domain | `caodacchien.io.vn` | cá nhân, đã sở hữu | |
| DNS/SSL | Cloudflare Free | cá nhân, `forwork.chiencd@gmail.com` | |
| Source | GitHub | `caodacchien` | repository private cho tới khi có quyết định khác |
| Hosting | Vercel Hobby | cá nhân, `forwork.chiencd@gmail.com` | |
| Database | Supabase Free | cá nhân, `forwork.chiencd@gmail.com` | |
| Analytics | Google Analytics 4 | cá nhân | chỉ GA4, xem D9 |
| Email | Resend | cá nhân | tích hợp ở Milestone 1.7, xem D8 |

Toàn bộ hạ tầng nằm dưới tài khoản cá nhân, không thuộc Roboworld. Xem D5.

Vercel Hobby cấm sử dụng thương mại. Website phải giữ đúng tính chất portfolio cá nhân. Nếu về sau bổ sung nội dung bán hàng hoặc dịch vụ thì phải nâng cấp gói trước khi xuất bản.

### Không dùng ở MVP

- Microsoft Clarity. Lùi sang Phase 2 để giảm script bên thứ ba và đơn giản hóa cookie consent. Xem D9.
- Supabase Auth. MVP không có đăng nhập. Xem D3.

## Quy trình

```text
Local
  -> Git commit
  -> GitHub push
  -> Vercel preview
  -> Review
  -> Merge main
  -> Production deployment
```

Pull request phải qua CI trên GitHub Actions với typecheck, lint và build trước khi merge.

## Môi trường

- Local
- Preview
- Production

Không dùng chung secret giữa các môi trường nếu không cần. Supabase project của preview và production nên tách riêng khi bắt đầu có dữ liệu thật.

## Biến môi trường

Khai báo tại `.env.example` với giá trị rỗng. Giá trị thật chỉ đặt trong `.env.local` ở máy cá nhân và trong Vercel Environment Variables.

| Biến | Milestone | Client-side | Ghi chú |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 1.1 | có | |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | 1.1 | có | `vi` |
| `NEXT_PUBLIC_SUPABASE_URL` | 1.3 | có | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 1.3 | có | chỉ đọc bản đã xuất bản |
| `SUPABASE_SERVICE_ROLE_KEY` | 1.3 | **không** | chỉ dùng phía server |
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

### SEO
- Sitemap
- robots.txt
- Canonical
- OpenGraph và Twitter card
- JSON-LD cho Person và Article

### Giao diện
- Kiểm tra ở cả light mode và dark mode
- Không nhấp nháy sai theme khi tải trang
- Lighthouse đạt mục tiêu trên cả hai chế độ
- Kiểm tra bàn phím và focus ring

### Hạ tầng và bảo mật
- Env variables đầy đủ ở đúng môi trường
- `SUPABASE_SERVICE_ROLE_KEY` không lọt vào bundle client
- Database RLS bật cho mọi bảng và đã kiểm tra bằng anon key
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

Không bật proxy hoặc caching rule phức tạp trước khi xác nhận tương thích với Vercel.

Lưu ý riêng cho `.io.vn`: cần xác nhận nhà đăng ký cho phép trỏ nameserver sang Cloudflare. Việc này phải kiểm tra ở Milestone 0.6, trước khi bắt đầu Phase 1.

## Vận hành Supabase Free

Supabase Free tạm dừng project sau 7 ngày không có hoạt động. Đây là một lý do khiến blog được đặt trong MDX theo D2: trang có giá trị SEO cao nhất được build tĩnh và không phụ thuộc trạng thái của database.
