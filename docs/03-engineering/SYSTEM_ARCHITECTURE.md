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
  |---- content/writing/*.mdx        (bài viết)
  |---- content/case-studies/*.mdx   (case study)
  |---- src/config/profile.config.ts (hồ sơ, kinh nghiệm, "Làm việc cùng tôi")
  |---- Supabase                     (CHỈ bảng contacts, ghi-một-chiều)
  |---- Resend                       (email thông báo contact form, từ Milestone 1.7)
  |---- Google Analytics 4
```

Kiến trúc MDX-first theo **D35**. Toàn bộ nội dung công khai build tĩnh 100%, không phụ thuộc Supabase uptime. Supabase chỉ tham gia đúng một đường: ghi một bản liên hệ mới.

MVP **không** dùng Supabase Auth và **không** có CMS. Xem D3.

## 2. Nguyên tắc kiến trúc

- Bắt đầu bằng một Next.js application.
- Không monorepo nếu chưa có nhu cầu thực tế.
- Không tách CMS thành app riêng ở MVP.
- Ưu tiên server-side rendering và static generation cho content.
- API routes/server actions chỉ dùng khi cần.
- Tích hợp bên ngoài thông qua adapter/service layer.
- Theo D35, nội dung đọc từ **MDX + config file**, không từ database. Không cần "content service layer hợp nhất MDX + DB" như thiết kế cũ. Chỉ cần: lớp đọc MDX (bài viết, case study), lớp đọc config (hồ sơ), và một Server Action ghi `contacts`.
- **Nguyên tắc kiến trúc P6 — Publish Cheap (thay cho design principle cùng tên):** đường đi từ "viết xong một bài" tới "bài đã lên production" chỉ gồm thêm một file `.mdx` và `git push`. Không thao tác thủ công nào bắt buộc cho mỗi bài mới (reading time, mục lục, bài liên quan, OG image đều sinh tự động). Mọi lựa chọn kỹ thuật làm chậm đường đi này phải bị loại.
- Tầng đọc case study chịu trách nhiệm thi hành ranh giới D6. Cụ thể, tên khách hàng (`client`) chỉ được render khi `clientIsPublic = true`. Không để việc này phụ thuộc vào kỷ luật của tầng UI.

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
    content/           # đọc + parse MDX (bài viết, case study)
    supabase/          # client + Server Action ghi contacts
    email/
  config/
    i18n/              # chuỗi giao diện, vi.ts
    profile.config.ts  # hồ sơ, kinh nghiệm, "Làm việc cùng tôi" (D35)
  types/
  styles/
content/
  writing/             # bài viết MDX, đặt tên slug.vi.mdx
  case-studies/        # case study MDX, đặt tên slug.vi.mdx
public/
supabase/
  migrations/          # chỉ một bảng: contacts
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
| Bài viết | MDX trong `content/writing/`, build tĩnh | D2, D35 |
| Case study | MDX trong `content/case-studies/`, build tĩnh | D14, D35 |
| Hồ sơ + kinh nghiệm | `src/config/profile.config.ts` | D35 |
| Database | Chỉ bảng `contacts` trên Supabase, ghi-một-chiều | D35 |
| Email | Resend, tích hợp ở Milestone 1.7, không tạo API key ở Phase 0 | D8 |
| Analytics | Chỉ Google Analytics 4 ở MVP | D9 |
| Ngôn ngữ | `vi` ở MVP, kiến trúc sẵn sàng song ngữ | D1 |
| Theme | Light và dark ngay ở MVP | D10 |
| Search, Pagination, Filter | Hoãn Phase 2 | D33 |
| Topics `/topics/[pillar]` | Giữ trong MVP, đúng 5 pillar | D31 |

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

- Bài viết ở `content/writing/<slug>.vi.mdx`; case study ở `content/case-studies/<slug>.vi.mdx`.
- Frontmatter validate bằng Zod lúc build. Sai thì **build fail**, không im lặng bỏ qua.
- Reading time và table of contents sinh lúc build, không tính lại ở runtime.
- **Search hoãn Phase 2** theo D33. MVP không có search; ở quy mô ra mắt (<20 bài) duyệt tay là đủ.
- Ảnh trong bài đi qua `next/image`. Ảnh là tùy chọn theo P3 — bài chỉ có chữ vẫn phải build và hiển thị đẹp.

## 10. Bảo mật

- **Không còn đường đọc database công khai.** Toàn bộ nội dung công khai là file tĩnh; anon key không đọc được gì (không có bảng nội dung nào trên Supabase). Bề mặt tấn công database gần bằng không — lợi ích của D35.
- Service role key chỉ dùng phía server, không bao giờ xuất hiện trong bundle client, không có tiền tố `NEXT_PUBLIC_`.
- Contact form không ghi trực tiếp từ client vào Supabase. Client gọi Server Action, Server Action validate bằng Zod rồi mới ghi bằng service role.
- Contact form có honeypot và rate limit theo IP đã băm. Chi tiết ở `DATABASE.md`.
- Tên khách hàng trong case study chỉ render khi `clientIsPublic = true`. Thi hành D6 ở tầng đọc nội dung.
- Mọi dữ liệu đầu vào từ bên ngoài đều được validate ở boundary bằng Zod.
