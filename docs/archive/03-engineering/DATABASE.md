# Database Design

## Trạng thái

Bản thiết kế v2.0 — 2026-07-24. **Chưa tạo migration.** Migration đầu tiên được viết ở Milestone 1.3.

Bản này phản ánh **D35 (Option B — MDX-first)**. So với v1.0:

- Bài viết và case study nằm trong **MDX**, không nằm trong database.
- Hồ sơ và kinh nghiệm nằm trong **`src/config/profile.config.ts`**, không nằm trong database.
- Supabase chỉ còn **một bảng: `contacts`**, ghi-một-chiều qua Server Action.
- Các bảng `profiles`, `experiences`, `projects`, `project_media` của v1.0 đã bị **loại bỏ khỏi MVP**.

D35 tu chỉnh D2 và D14. Ranh giới nội dung của D14 (case study là marketing, không phải phần mềm) **giữ nguyên hiệu lực** — nó chỉ chuyển từ cột database sang frontmatter MDX.

---

## 1. Nguồn dữ liệu của toàn bộ nội dung

| Loại nội dung | Nơi lưu | Định dạng |
| --- | --- | --- |
| Bài viết | `content/writing/<slug>.vi.mdx` | MDX + frontmatter |
| Case study | `content/case-studies/<slug>.vi.mdx` | MDX + frontmatter |
| Hồ sơ, kinh nghiệm, kỹ năng, học vấn, chứng chỉ, giá trị, social, "Làm việc cùng tôi" | `src/config/profile.config.ts` | TypeScript typed object |
| Liên hệ gửi từ form | Supabase, bảng `contacts` | Postgres |

Toàn bộ nội dung công khai build tĩnh 100%. Website không phụ thuộc uptime Supabase để hiển thị bất kỳ trang nội dung nào. Supabase chỉ tham gia đúng một đường: **ghi** một bản liên hệ mới.

---

## 2. `src/config/profile.config.ts`

Một người, một hồ sơ. Đây là dữ liệu chỉ đọc, chỉ thuộc một chủ thể duy nhất — đúng loại dữ liệu mà việc dựng bảng database là over-engineering (`PROJECT_CONSTITUTION.md` §4).

Cấu trúc (validate bằng Zod lúc build):

```ts
{
  fullName, headline, shortBio, longBio,
  avatarUrl, ogImageUrl, location, email,
  socialLinks:   [{ platform, url }],
  skills:        [{ group, items[] }],
  coreValues:    [{ title, description }],
  education:     [{ school, degree, field, from, to }],
  certifications:[{ name, issuer, issuedAt, url }],
  experiences:   [{ company, role, location, startDate, endDate,
                   description, responsibilities[], achievements[] }],
  servicesOffered:[{ title, description, fit[], notFit[] }],  // khối "Làm việc cùng tôi", D18
}
```

Ghi chú:

- `experiences` chuyển từ bảng Supabase (v1.0) sang đây vì D35 chỉ giữ `contacts` trên Supabase. Kinh nghiệm là dữ liệu hồ sơ của một người, thuộc về file config.
- `servicesOffered` **không có trường giá**. Khối thông tin, không phải phễu. D18.
- `achievements` và số liệu trong experiences chỉ chứa thông tin đã được phép công khai. D6.
- Sẵn sàng song ngữ theo D1: khi bật `en`, tách thành `profile.vi.ts` / `profile.en.ts` hoặc thêm khóa locale. Không cần migration database.

---

## 3. Frontmatter — Bài viết

`content/writing/<slug>.vi.mdx`. Validate bằng Zod lúc build; sai thì **build fail**.

```yaml
title:        string           # bắt buộc
excerpt:      string           # bắt buộc — dùng cho thẻ danh sách VÀ meta description
publishedAt:  YYYY-MM-DD        # bắt buộc
status:       draft | published # bắt buộc, chỉ 'published' mới build ra trang
category:     <1 trong 5 trụ>   # bắt buộc, Zod enum theo D16
featured:     boolean           # tùy chọn, default false — Home lấy featured=true (D25)
updatedAt:    YYYY-MM-DD         # tùy chọn
coverImage:   string            # tùy chọn — KHÔNG bắt buộc, theo P3
```

`category` bị ràng buộc Zod enum vào đúng năm trụ của D16:

```
'Chiến lược' | 'Tăng trưởng số' | 'Nội dung và Truyền thông' | 'AI cho Marketing' | 'Lãnh đạo và Quan điểm'
```

Đã loại khỏi frontmatter so với v1.0, vì derive được hoặc chưa cần ở MVP:

- `slug` → derive từ tên file.
- `seoTitle` → mặc định lấy `title`.
- `seoDescription` → mặc định lấy `excerpt`.
- `tags` → hoãn Phase 2 (tag page thuộc Phase 2).
- `relatedCaseStudies` → bỏ; liên kết bài ↔ case study làm bằng link inline trong thân MDX.

`readingTime`, `tableOfContents` được sinh lúc build, không lưu trong frontmatter để tránh lệch dữ liệu.

---

## 4. Frontmatter — Case study

`content/case-studies/<slug>.vi.mdx`. Phần tường thuật (Bối cảnh / Vấn đề / Cách tiếp cận / Kết quả) nằm ở **thân MDX**, không phải frontmatter.

```yaml
title:          string          # bắt buộc
excerpt:        string          # bắt buộc
publishedAt:    YYYY-MM-DD       # bắt buộc
status:         draft | published # bắt buộc
featured:       boolean          # tùy chọn, default false — Home lấy featured=true
engagementType: in_house | consulting | advisory | personal   # bắt buộc
services:       string[]         # bắt buộc — dịch vụ đã cung cấp, rút từ 10 vùng năng lực (§BRAND_POSITIONING §2)
industry:       string           # tùy chọn — chỉ để phân loại, KHÔNG suy ra tệp khách hàng (D13)
client:         string           # tùy chọn
clientIsPublic: boolean          # bắt buộc nếu có client — chỉ render tên khi true (D6)
metrics:        [{ label, value, note }]   # số liệu kết quả, chỉ số đã được phép công khai (D6)
coverImage:     string           # tùy chọn
reference:      string           # tùy chọn — link chiến dịch/sản phẩm thật
```

Ghi chú D14 (giữ nguyên hiệu lực):

- Đây là **case study marketing**, không phải dự án phần mềm. Không có `techStack`, không có `repositoryUrl`.
- `services` là trục phân loại. Bộ lọc theo dịch vụ/ngành là **Phase 2** (D33), nên MVP chỉ hiển thị, chưa lọc.
- `client` + `clientIsPublic`: tầng render chỉ hiển thị tên khách khi `clientIsPublic = true`. Thi hành D6 ở tầng dữ liệu, không trông chờ kỷ luật biên tập.

---

## 5. `contacts` — bảng Supabase duy nhất

| Cột | Kiểu | Ràng buộc |
| --- | --- | --- |
| `id` | uuid | PK, default `gen_random_uuid()` |
| `name` | text | not null |
| `email` | text | not null |
| `subject` | text | |
| `message` | text | not null |
| `ip_hash` | text | not null |
| `user_agent` | text | |
| `status` | text | not null, default `'new'`, check in (`'new'`,`'read'`,`'replied'`,`'spam'`) |
| `created_at` | timestamptz | not null, default now() |

Index: `(ip_hash, created_at desc)` phục vụ rate limit.

Ghi chú bảo mật:

- `ip_hash` là SHA-256 của IP nối salt từ `CONTACT_IP_HASH_SALT`. **Không lưu IP thô.**
- Bảng chứa dữ liệu cá nhân. Không bao giờ để anon key đọc.

---

## 6. Row Level Security

RLS bật cho `contacts`. Vì đây là bảng duy nhất, mô hình quyền cực kỳ hẹp:

| Bảng | `anon` | `service_role` |
| --- | --- | --- |
| `contacts` | **không có policy nào** — deny all | toàn quyền (chỉ dùng phía server) |

```sql
-- contacts: bật RLS, không tạo policy nào cho anon.
-- anon bị từ chối mọi thao tác. Ghi chỉ qua Server Action dùng service role.
alter table public.contacts enable row level security;
```

Lý do không cho anon insert trực tiếp: anon key nằm công khai trong bundle client; nếu mở INSERT thì ai cũng bơm rác thẳng vào DB, bỏ qua validation, honeypot và rate limit. Ghi qua Server Action là bắt buộc.

**Không còn policy đọc nào** vì không còn bảng nội dung nào trong Supabase. Đây là hệ quả trực tiếp và là lợi ích bảo mật của D35: bề mặt tấn công của database gần như bằng không.

---

## 7. Rate limit cho Contact Form

Không đổi so với v1.0. Thực hiện hoàn toàn bằng Postgres, không cần Redis:

1. Server Action băm IP thành `ip_hash`.
2. Đếm bản ghi cùng `ip_hash` trong 60 phút gần nhất; quá 3 thì từ chối.
3. Đếm tổng bản ghi trong 60 phút gần nhất; quá 30 thì từ chối (van toàn cục).
4. Trường `website` honeypot: có giá trị nghĩa là bot → ghi `status = 'spam'` nhưng vẫn trả màn hình thành công.
5. Index `(ip_hash, created_at desc)` khiến hai truy vấn đếm đều rẻ.

Hạn chế: không chặn được kẻ đổi IP liên tục. Chấp nhận được ở quy mô cá nhân. Nếu bị lạm dụng, cân nhắc Cloudflare Turnstile ở Phase 2.

---

## 8. Migration plan

- Migration nằm ở `supabase/migrations/`, đặt tên theo dấu thời gian.
- **Migration đầu tiên chỉ tạo một bảng `contacts`**, trigger `updated_at` (nếu cần), index và policy RLS, trong một transaction.
- Áp dụng theo thứ tự: local → preview → production.
- **Không** chạy migration production tự động. Cần phê duyệt chủ dự án (`AI_RULEBOOK.md` §5).

## 9. Rollback plan

- Vì chỉ có một bảng ghi-một-chiều, rủi ro migration gần như bằng không.
- Mỗi migration vẫn kèm script `down` kiểm thử ở local.
- `contacts` chứa dữ liệu cá nhân người dùng gửi: trước thay đổi phá vỡ dữ liệu, `pg_dump` sao lưu ngoài Supabase. Supabase Free chỉ giữ backup tự động 7 ngày.

---

## 10. Quy tắc

- Nội dung công khai không nằm trong database. Chỉ dữ liệu người dùng gửi (`contacts`) nằm trong Supabase.
- Slug bài viết và case study derive từ tên file, unique trong phạm vi từng locale.
- Frontmatter sai làm build fail — không im lặng bỏ qua.
- `category` bài viết phải thuộc đúng 5 trụ (Zod enum).
- Tên khách hàng chỉ render khi `clientIsPublic = true` (D6).
- Row Level Security bắt buộc cho `contacts`.
- Không lưu secret trong database. Không lưu IP thô, chỉ băm có salt.

---

## Ghi chú cần Review sau (không tự sửa)

- **D11 (media storage) — Approved (2026-07-25):** ảnh case study để trong **`public/`**, tối ưu bằng `next/image`. Không còn bảng `project_media`; không kéo Supabase/Cloudinary vào đường đọc. Xem lại nếu ảnh phình lớn (Future).
