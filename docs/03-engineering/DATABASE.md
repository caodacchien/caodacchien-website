# Database Design

## Trạng thái

Bản thiết kế ban đầu. Chưa tạo migration production.

## Các thực thể chính

### profiles
- id
- full_name
- headline
- short_bio
- long_bio
- avatar_url
- location
- email
- status

### experiences
- id
- company
- role
- start_date
- end_date
- description
- achievements
- sort_order
- published

### projects
- id
- title
- slug
- summary
- problem
- solution
- result
- cover_image
- demo_url
- repository_url
- published_at
- status

### posts
- id
- title
- slug
- excerpt
- content
- cover_image
- status
- published_at
- seo_title
- seo_description

### categories
- id
- name
- slug

### tags
- id
- name
- slug

### resources
- id
- title
- type
- description
- url
- status

### contacts
- id
- name
- email
- subject
- message
- created_at
- status

### newsletter_subscribers
- id
- email
- status
- subscribed_at

## Quy tắc

- Mọi bảng có timestamp phù hợp.
- Slug phải unique.
- Public content có status.
- Contact form phải có rate limit và spam protection.
- Row Level Security bắt buộc khi dùng Supabase.
- Không lưu secret trong database public schema.
