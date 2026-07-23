# Database Design

## Trạng thái

Bản thiết kế v1.0 — 2026-07-23. **Chưa tạo migration.** Migration đầu tiên được viết ở Milestone 1.3.

Thiết kế này phản ánh D2: blog nằm trong MDX, chỉ dữ liệu có cấu trúc nằm trong Supabase. Các bảng `posts`, `categories`, `tags` trong bản thiết kế trước đã bị **loại bỏ**.

## Phạm vi

### Bảng thuộc MVP
- `profiles`
- `experiences`
- `projects`
- `project_media`
- `contacts`

### Bảng thuộc Phase 2, chưa tạo migration
- `resources` — đi cùng trang Resources, lùi theo D4
- `newsletter_subscribers` — đi cùng Newsletter ở Phase 2

## Quy ước chung

- Khóa chính: `id uuid primary key default gen_random_uuid()`.
- Mọi bảng có `created_at timestamptz not null default now()` và `updated_at timestamptz not null default now()`, cập nhật `updated_at` bằng trigger.
- Trạng thái xuất bản dùng `status text not null default 'draft'` kèm `check (status in ('draft','published','archived'))`. Dùng CHECK thay vì enum của Postgres để dễ tiến hóa mà không cần migration kiểu.
- Cột i18n theo D1:
  - `locale text not null default 'vi'` kèm `check (locale in ('vi','en'))`
  - `translation_key text not null` — định danh ổn định dùng chung giữa các bản dịch của cùng một nội dung
  - `unique (translation_key, locale)`
  - `unique (slug, locale)` với các bảng có slug
- Slug dùng kebab-case, chỉ chữ thường, số và dấu gạch nối.

Hai cột i18n được thêm ngay từ migration đầu tiên dù MVP chỉ dùng `vi`. Đây là chủ đích theo D1: thêm hai cột lúc này tốn gần như không có gì, còn thêm sau khi đã có dữ liệu production thì phải backfill và đổi ràng buộc unique.

---

## profiles

Hồ sơ của chủ dự án. Mỗi locale đúng một bản ghi.

| Cột | Kiểu | Ràng buộc |
| --- | --- | --- |
| `id` | uuid | PK |
| `translation_key` | text | not null |
| `locale` | text | not null, default `'vi'` |
| `full_name` | text | not null |
| `headline` | text | not null |
| `short_bio` | text | not null |
| `long_bio` | text | |
| `avatar_url` | text | |
| `og_image_url` | text | |
| `location` | text | |
| `email` | text | |
| `social_links` | jsonb | not null, default `'[]'` |
| `skills` | jsonb | not null, default `'[]'` |
| `education` | jsonb | not null, default `'[]'` |
| `certifications` | jsonb | not null, default `'[]'` |
| `core_values` | jsonb | not null, default `'[]'` |
| `services_offered` | jsonb | not null, default `'[]'` |
| `status` | text | not null, default `'draft'` |

Ràng buộc: `unique (translation_key, locale)`

Ghi chú về `services_offered`: nguồn dữ liệu cho khối "Làm việc cùng tôi" trên Home và About, chốt theo D18. Mỗi phần tử gồm `{ title, description, fit, not_fit }`, trong đó `fit` và `not_fit` mô tả loại bài toán phù hợp và không phù hợp. **Không có trường giá.** Đây là khối thông tin, không phải phễu bán hàng.

Ghi chú: `skills`, `education`, `certifications`, `core_values`, `social_links`, `services_offered` dùng `jsonb` thay vì tách bảng riêng. Đây là dữ liệu chỉ đọc, chỉ thuộc về một chủ thể duy nhất và không cần truy vấn chéo. Tách thành 5 bảng con là over-engineering, vi phạm `PROJECT_CONSTITUTION.md` §4. Cấu trúc bên trong `jsonb` được validate bằng Zod ở tầng service.

---

## experiences

| Cột | Kiểu | Ràng buộc |
| --- | --- | --- |
| `id` | uuid | PK |
| `translation_key` | text | not null |
| `locale` | text | not null, default `'vi'` |
| `company` | text | not null |
| `role` | text | not null |
| `location` | text | |
| `start_date` | date | not null |
| `end_date` | date | null nghĩa là đang làm |
| `description` | text | |
| `responsibilities` | jsonb | not null, default `'[]'` |
| `achievements` | jsonb | not null, default `'[]'` |
| `sort_order` | integer | not null, default 0 |
| `status` | text | not null, default `'draft'` |

Ràng buộc:
- `unique (translation_key, locale)`
- `check (end_date is null or end_date >= start_date)`

Index: `(status, locale, sort_order desc, start_date desc)`

Ghi chú theo D6: `achievements` chỉ được chứa số liệu đã được phép công khai.

---

## projects

| Cột | Kiểu | Ràng buộc |
| --- | --- | --- |
| `id` | uuid | PK |
| `translation_key` | text | not null |
| `locale` | text | not null, default `'vi'` |
| `experience_id` | uuid | FK tới `experiences(id)` on delete set null, nullable |
| `title` | text | not null |
| `slug` | text | not null |
| `summary` | text | not null |
| `problem` | text | |
| `solution` | text | |
| `result` | text | |
| `my_role` | text | |
| `engagement_type` | text | not null, check in (`'in_house'`,`'consulting'`,`'advisory'`,`'personal'`) |
| `services` | text[] | not null, default `'{}'` — dịch vụ đã cung cấp, trục filter chính |
| `industry` | text | ngành của khách hàng, chỉ dùng để phân loại |
| `client_name` | text | nullable, chịu ràng buộc kiểm duyệt của D6 |
| `client_is_public` | boolean | not null, default false |
| `outcome_metrics` | jsonb | not null, default `'[]'` |
| `cover_image_url` | text | |
| `reference_url` | text | trỏ tới chiến dịch hoặc sản phẩm thật |
| `is_featured` | boolean | not null, default false |
| `sort_order` | integer | not null, default 0 |
| `published_at` | timestamptz | |
| `status` | text | not null, default `'draft'` |

Ràng buộc:
- `unique (slug, locale)`
- `unique (translation_key, locale)`

Index:
- `(status, locale, published_at desc)`
- `(is_featured) where status = 'published'`
- GIN trên `services` để phục vụ filter theo dịch vụ ở trang Projects
- `(industry)` để phục vụ filter theo ngành

Ghi chú:
- Bảng này mô hình hóa **case study marketing**, không phải dự án phần mềm. Chốt theo D14. Thiết kế trước đó có `tech_stack` và `repository_url` là sai archetype và đã bị loại bỏ.
- `services` là trục phân loại chính, chứa các giá trị như `Brand Strategy`, `Content Marketing`, `Marketing Automation`. Nên rút từ mười vùng năng lực ở `BRAND_POSITIONING.md` §2 để giữ nhất quán với ngôn ngữ toàn site.
- `industry` chỉ để phân loại và lọc. **Không được dùng để suy ra tệp khách hàng mục tiêu của website.** Xem D13.
- `client_name` và `client_is_public` tách riêng có chủ đích: nhiều case study có tên khách hàng trong database phục vụ quản lý nội bộ, nhưng chưa được phép công khai. Tầng service chỉ trả `client_name` ra ngoài khi `client_is_public = true`. Đây là ràng buộc D6 được thi hành ở tầng dữ liệu thay vì trông chờ vào kỷ luật của người biên tập.
- `outcome_metrics` là mảng các đối tượng `{ label, value, note }`, ví dụ `{ "label": "Tăng trưởng lead", "value": "+180%", "note": "6 tháng, so với cùng kỳ" }`. Dùng `jsonb` vì số lượng và loại chỉ số khác nhau ở từng dự án. Validate bằng Zod ở tầng service. Chỉ ghi số liệu đã được phép công khai theo D6.
- `experience_id` giải quyết yêu cầu "Related projects" của `PRODUCT_REQUIREMENTS.md` §5. Một experience có nhiều project. Dùng khóa ngoại một chiều thay vì bảng nối vì quan hệ thực tế là một-nhiều.
- `my_role` bắt buộc có nội dung với các dự án tập thể, để không gây hiểu nhầm về phần đóng góp cá nhân.

---

## project_media

Gallery ảnh của case study.

| Cột | Kiểu | Ràng buộc |
| --- | --- | --- |
| `id` | uuid | PK |
| `project_id` | uuid | FK tới `projects(id)` on delete cascade, not null |
| `url` | text | not null |
| `alt_text` | text | not null |
| `caption` | text | |
| `width` | integer | |
| `height` | integer | |
| `sort_order` | integer | not null, default 0 |

Index: `(project_id, sort_order)`

Ghi chú: `alt_text` là `not null` vì yêu cầu WCAG AA. Vị trí lưu file thực tế phụ thuộc D11, hiện còn mở.

---

## contacts

| Cột | Kiểu | Ràng buộc |
| --- | --- | --- |
| `id` | uuid | PK |
| `name` | text | not null |
| `email` | text | not null |
| `subject` | text | |
| `message` | text | not null |
| `ip_hash` | text | not null |
| `user_agent` | text | |
| `status` | text | not null, default `'new'`, check in (`'new'`,`'read'`,`'replied'`,`'spam'`) |
| `created_at` | timestamptz | not null, default now() |

Index: `(ip_hash, created_at desc)` phục vụ rate limit

Ghi chú bảo mật:
- `ip_hash` là SHA-256 của địa chỉ IP nối với một salt lấy từ biến môi trường `CONTACT_IP_HASH_SALT`. **Không lưu IP thô** để giảm phạm vi dữ liệu cá nhân phải bảo vệ.
- Bảng này chứa dữ liệu cá nhân. Không bao giờ được để anon key đọc.

---

## Row Level Security

RLS bật cho **tất cả** các bảng. Đây là ràng buộc bắt buộc của `PROJECT_CONSTITUTION.md` §2.4.

Mô hình quyền của MVP rất hẹp vì không có Authentication theo D3:

| Bảng | `anon` | `service_role` |
| --- | --- | --- |
| `profiles` | SELECT khi `status = 'published'` | toàn quyền |
| `experiences` | SELECT khi `status = 'published'` | toàn quyền |
| `projects` | SELECT khi `status = 'published'` | toàn quyền |
| `project_media` | SELECT khi project cha đã published | toàn quyền |
| `contacts` | **không có policy nào** — deny all | toàn quyền |

Policy mẫu:

```sql
alter table public.projects enable row level security;

create policy "public_read_published_projects"
  on public.projects
  for select
  to anon, authenticated
  using (status = 'published');

alter table public.project_media enable row level security;

create policy "public_read_media_of_published_projects"
  on public.project_media
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_media.project_id
        and p.status = 'published'
    )
  );

-- contacts: bật RLS và không tạo policy nào cho anon.
-- Kết quả là anon bị từ chối mọi thao tác. Ghi dữ liệu chỉ đi qua
-- Server Action phía server dùng service role.
alter table public.contacts enable row level security;
```

Lý do `contacts` không cho anon insert trực tiếp: nếu mở INSERT cho anon thì bất kỳ ai có anon key, vốn nằm công khai trong bundle client, đều có thể bơm dữ liệu rác thẳng vào database mà bỏ qua toàn bộ validation, honeypot và rate limit. Đi qua Server Action là bắt buộc.

`service_role` bỏ qua RLS theo thiết kế của Postgres. Key này chỉ dùng phía server.

---

## Rate limit cho Contact Form

`PROJECT_CONSTITUTION.md` §2.4 và `DEPLOYMENT.md` đều bắt buộc có rate limit. Stack hiện tại không có Redis và không được thêm dịch vụ trả phí.

Phương án cho MVP, thực hiện hoàn toàn bằng Postgres:

1. Server Action băm IP thành `ip_hash`.
2. Đếm số bản ghi cùng `ip_hash` trong 60 phút gần nhất. Quá 3 thì từ chối.
3. Đếm tổng số bản ghi trong 60 phút gần nhất. Quá 30 thì từ chối, đây là van an toàn toàn cục.
4. Trường `website` dạng honeypot trong form. Có giá trị nghĩa là bot, ghi với `status = 'spam'` nhưng vẫn trả về màn hình thành công để không lộ cơ chế.
5. Có index `(ip_hash, created_at desc)` nên hai truy vấn đếm ở trên đều rẻ.

Hạn chế đã ghi nhận: cách này không chặn được kẻ tấn công đổi IP liên tục. Chấp nhận được ở quy mô website cá nhân. Nếu bị lạm dụng thực tế thì cân nhắc Cloudflare Turnstile ở Phase 2, gói free.

---

## Migration plan

- Toàn bộ migration nằm ở `supabase/migrations/`, đặt tên theo dấu thời gian.
- Migration đầu tiên tạo 5 bảng của MVP, trigger `updated_at`, toàn bộ index và toàn bộ policy RLS trong cùng một transaction.
- Áp dụng theo thứ tự: local, rồi preview, rồi production.
- **Không** chạy migration production tự động. Phải có phê duyệt của chủ dự án theo `AI_RULEBOOK.md` §5.

## Rollback plan

- Mỗi migration đi kèm một script `down` tương ứng, được kiểm thử ở local trước.
- Trước bất kỳ migration production nào: xuất bản sao bằng `pg_dump` và lưu ngoài Supabase.
- Supabase Free chỉ giữ backup tự động 7 ngày. Với thay đổi có phá vỡ dữ liệu, bản sao thủ công là bắt buộc, không phải tùy chọn.

---

## Nguồn nội dung không nằm trong database

Theo D2, bài viết blog nằm trong `content/blog/<slug>.<locale>.mdx`. Frontmatter được validate bằng Zod lúc build, sai thì build fail.

Schema frontmatter:

```yaml
title: string                 # bắt buộc
slug: string                  # bắt buộc, kebab-case, khớp tên file
excerpt: string               # bắt buộc, dùng cho meta description và thẻ danh sách
publishedAt: YYYY-MM-DD       # bắt buộc
updatedAt: YYYY-MM-DD         # tùy chọn
status: draft | published     # bắt buộc, chỉ 'published' mới được build ra trang
category: string              # bắt buộc, PHẢI là một trong năm trụ nội dung của D16
tags: string[]                # tùy chọn, tự do
coverImage: string            # tùy chọn
seoTitle: string              # tùy chọn, mặc định lấy title
seoDescription: string        # tùy chọn, mặc định lấy excerpt
```

`category` bị ràng buộc bằng Zod enum vào đúng năm giá trị của D16:

```
'Chiến lược' | 'Tăng trưởng số' | 'Nội dung và Truyền thông' | 'AI cho Marketing' | 'Lãnh đạo và Quan điểm'
```

Danh mục nằm ngoài năm giá trị này làm build fail. Đây là cách thi hành D16 ở tầng kỹ thuật thay vì trông chờ vào kỷ luật khi viết bài.

`readingTime`, `tableOfContents` và chỉ mục tìm kiếm được sinh lúc build, không lưu trong frontmatter để tránh lệch dữ liệu.

---

## Quy tắc

- Mọi bảng có timestamp phù hợp.
- Slug phải unique trong phạm vi từng locale.
- Public content có status.
- Contact form phải có rate limit và spam protection.
- Row Level Security bắt buộc cho mọi bảng.
- Không lưu secret trong database public schema.
- Không lưu IP thô, chỉ lưu bản băm có salt.
- Không tách bảng cho dữ liệu chỉ đọc và chỉ thuộc một chủ thể duy nhất.
