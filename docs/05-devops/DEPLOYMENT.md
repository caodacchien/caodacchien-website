# Deployment

## Kiến trúc chi phí thấp

- Domain: `caodacchien.io.vn`
- DNS/SSL: Cloudflare Free
- Source: GitHub
- Hosting: Vercel Hobby
- Database/Auth: Supabase Free
- Analytics: Google Analytics và Microsoft Clarity
- Email: lựa chọn sau khi xác định volume

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

## Môi trường

- Local
- Preview
- Production

Không dùng chung secret giữa các môi trường nếu không cần.

## Checklist trước production

- Build pass
- Typecheck pass
- Lint pass
- Sitemap
- robots.txt
- Canonical
- OpenGraph
- Error pages
- Env variables
- Database RLS
- Contact form rate limit
- Analytics consent nếu cần
- Domain và SSL

## Cloudflare

Cloudflare được dùng cho:
- DNS
- SSL
- Basic protection
- Domain management

Không bật proxy hoặc caching rule phức tạp trước khi xác nhận tương thích với Vercel.
