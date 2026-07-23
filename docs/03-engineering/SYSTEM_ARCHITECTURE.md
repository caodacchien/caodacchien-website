# System Architecture

## 1. Kiến trúc đề xuất cho MVP

```text
User
  |
Cloudflare DNS / SSL
  |
Vercel
  |
Next.js Application
  |---- Supabase Database
  |---- Supabase Auth
  |---- Media storage (ưu tiên Supabase Storage hoặc Cloudinary khi cần)
  |---- Email service
  |---- Analytics
```

## 2. Nguyên tắc kiến trúc

- Bắt đầu bằng một Next.js application.
- Không monorepo nếu chưa có nhu cầu thực tế.
- Không tách CMS thành app riêng ở MVP.
- Ưu tiên server-side rendering và static generation cho content.
- API routes/server actions chỉ dùng khi cần.
- Tích hợp bên ngoài thông qua adapter/service layer.

## 3. Stack đề xuất

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Zod
- pnpm
- Vercel
- Cloudflare DNS

## 4. Cấu trúc code dự kiến

```text
src/
  app/
  components/
  features/
  lib/
  services/
  config/
  types/
  styles/
content/
public/
supabase/
docs/
```

## 5. Yêu cầu chất lượng

- TypeScript strict
- ESLint
- Prettier
- Error handling rõ ràng
- Logging tối thiểu
- Validation ở boundary
- Test cho logic quan trọng
- Không phụ thuộc trực tiếp service bên ngoài trong UI component

## 6. Quyết định chưa khóa

- CMS dùng Supabase custom admin hay headless CMS
- Media dùng Supabase Storage hay Cloudinary
- Email dùng Resend hay Gmail workflow
- Blog dùng MDX, database hay hybrid
