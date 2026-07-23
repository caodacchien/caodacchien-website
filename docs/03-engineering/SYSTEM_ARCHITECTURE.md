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
  |---- Nội dung MDX trong repository  (blog)
  |---- Supabase Database              (profile, experience, project, contact)
  |---- Resend                         (email thông báo contact form, từ Milestone 1.7)
  |---- Google Analytics 4
```

MVP **không** dùng Supabase Auth và **không** có CMS. Xem D3.

## 2. Nguyên tắc kiến trúc

- Bắt đầu bằng một Next.js application.
- Không monorepo nếu chưa có nhu cầu thực tế.
- Không tách CMS thành app riêng ở MVP.
- Ưu tiên server-side rendering và static generation cho content.
- API routes/server actions chỉ dùng khi cần.
- Tích hợp bên ngoài thông qua adapter/service layer.
- Dự án có hai nguồn nội dung theo D2. Bắt buộc có một **content service layer hợp nhất** tại `src/services/content/` để tầng UI không cần biết dữ liệu đến từ MDX hay từ database.
- Sản phẩm là nền tảng xuất bản theo D12, không phải portfolio. Hệ quả kiến trúc: đường đi từ "viết xong một bài" tới "bài đã lên production" phải ngắn và ít ma sát. Mọi lựa chọn kỹ thuật làm chậm đường đi đó đều phải được cân nhắc lại, kể cả khi nó tối ưu ở khía cạnh khác.
- Tầng service chịu trách nhiệm thi hành ranh giới D6. Cụ thể, `client_name` chỉ được trả ra ngoài khi `client_is_public = true`. Không để việc này phụ thuộc vào kỷ luật của tầng UI.

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
    [locale]/          # route group theo locale, MVP chỉ có 'vi'
  components/
  features/
  lib/
  services/
    content/           # lớp hợp nhất MDX + database
    supabase/
    email/
  config/
    i18n/              # chuỗi giao diện, vi.ts
  types/
  styles/
content/
  blog/                # bài viết MDX, đặt tên slug.vi.mdx
public/
supabase/
  migrations/
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
- CI trên GitHub Actions chạy typecheck, lint và build cho mọi pull request

## 6. Quyết định đã khóa

| Vấn đề | Quyết định | Tham chiếu |
| --- | --- | --- |
| CMS | Không có ở MVP. Không dùng Supabase Auth ở Phase 1. Lùi sang Phase 2. | D3 |
| Blog | MDX trong repository, build tĩnh | D2 |
| Dữ liệu có cấu trúc | Supabase | D2 |
| Email | Resend, tích hợp ở Milestone 1.7, không tạo API key ở Phase 0 | D8 |
| Analytics | Chỉ Google Analytics 4 ở MVP | D9 |
| Ngôn ngữ | `vi` ở MVP, kiến trúc sẵn sàng song ngữ | D1 |
| Theme | Light và dark ngay ở MVP | D10 |

## 7. Quyết định còn mở

| Vấn đề | Hạn chót | Tham chiếu |
| --- | --- | --- |
| Media storage: `public/` hay Supabase Storage hay Cloudinary | trước Milestone 1.3 | D11 |
| Gói Vercel khi bật nội dung consulting | trước Milestone 1.8 | D19 |

**D18 đã chốt:** MVP giữ sáu trang, bổ sung khối "Làm việc cùng tôi" trên Home và About, Resources lùi sang Phase 2.

Ràng buộc kiến trúc kèm theo: hệ thống điều hướng và bố cục phải chứa được Resources và Speaking ở Phase 2 mà không cần thiết kế lại. Khi Resources được bật, kiến trúc sẽ cần bổ sung khả năng phát hành file tải về, kéo theo quyết định lưu trữ file và có thể kéo theo luồng thu thập email trước khi tải, vốn là một luồng dữ liệu cá nhân mới cần đánh giá riêng về privacy. Thiết kế MVP không được tạo ra rào cản cho việc đó.

## 8. Internationalization

Theo D1, MVP chỉ xuất bản tiếng Việt nhưng kiến trúc phải sẵn sàng cho song ngữ.

- Cấu hình tập trung tại `src/config/i18n/index.ts` với `defaultLocale = 'vi'` và `locales = ['vi']`.
- Route nằm dưới `src/app/[locale]/`.
- Middleware rewrite `/` sang `/vi` ở tầng nội bộ. URL công khai ở MVP **không** có tiền tố locale để tránh làm loãng tín hiệu SEO khi chỉ có một ngôn ngữ.
- Chuỗi giao diện đặt trong `src/config/i18n/vi.ts`, không hard-code trong JSX.
- Mọi bảng nội dung có cột `locale` và `translation_key`. Xem `DATABASE.md`.
- File MDX đặt tên `slug.vi.mdx`.
- Khi bật `en` ở Phase 2: thêm locale vào cấu hình, bật tiền tố URL cho cả hai locale, thêm thẻ `hreflang` và cập nhật sitemap. Không cần migration schema.

## 9. Content pipeline cho MDX

- Bài viết nằm ở `content/blog/<slug>.<locale>.mdx`.
- Frontmatter được validate bằng Zod lúc build. Frontmatter sai thì **build fail**, không được im lặng bỏ qua bài viết.
- Reading time, table of contents và chỉ mục tìm kiếm được sinh lúc build, không tính lại ở runtime.
- Search của Blog chạy phía client trên chỉ mục tĩnh. Phương án này đủ cho quy mô dưới khoảng 100 bài và không cần thêm dịch vụ tìm kiếm nào.
- Ảnh trong bài viết đi qua `next/image`.

## 10. Bảo mật

- Anon key của Supabase chỉ đọc được bản đã xuất bản. Chi tiết policy nằm ở `DATABASE.md`.
- Service role key chỉ dùng phía server, không bao giờ xuất hiện trong bundle client, không có tiền tố `NEXT_PUBLIC_`.
- Contact form không ghi trực tiếp từ client vào Supabase. Client gọi Server Action, Server Action validate bằng Zod rồi mới ghi bằng service role.
- Contact form có honeypot và rate limit theo IP đã băm. Chi tiết ở `DATABASE.md`.
- Mọi dữ liệu đầu vào từ bên ngoài đều được validate ở boundary bằng Zod.
