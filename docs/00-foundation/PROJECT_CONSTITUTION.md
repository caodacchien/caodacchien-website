# Project Constitution

## 1. Tầm nhìn

Xây dựng `caodacchien.io.vn` thành nền tảng thương hiệu cá nhân bền vững trong 5–10 năm, kết hợp portfolio, blog, hồ sơ nghề nghiệp, hồ sơ học thuật và AI-assisted publishing.

## 2. Nguyên tắc cốt lõi

### 2.1 Product trước Code
Không viết production code trước khi:
- PRD được duyệt
- Design Direction được chọn
- Design System nền tảng được khóa
- Kiến trúc hệ thống được duyệt

### 2.2 Chi phí vận hành thấp
Ưu tiên free tier và kiến trúc đơn giản:
- GitHub Free
- Vercel Hobby
- Supabase Free
- Cloudflare Free
- Dịch vụ trả phí chỉ được thêm khi có nhu cầu thực tế

### 2.3 Tính sở hữu
Mã nguồn, domain, database và hạ tầng cá nhân phải nằm dưới tài khoản cá nhân của chủ dự án.

### 2.4 Bảo mật theo mặc định
- Không commit secret
- Phân quyền tối thiểu
- Validate dữ liệu đầu vào
- Có rate limit với endpoint công khai
- Có backup và recovery plan

### 2.5 Tài liệu là bắt buộc
Mọi thay đổi lớn phải cập nhật tài liệu liên quan.

## 3. Phạm vi sản phẩm

### MVP
- Home
- About
- Experience
- Projects
- Blog
- Contact
- SEO nền tảng
- Analytics
- CMS tối thiểu hoặc content workflow đơn giản

### Giai đoạn sau
- AI Content Studio
- Newsletter
- Resource Library
- Speaking/Teaching
- Community
- Mini CRM
- Automation Center

## 4. Những điều cấm

- Không over-engineering ở MVP.
- Không xây nhiều app riêng nếu một app đủ dùng.
- Không thêm microservice ở giai đoạn đầu.
- Không dùng database local làm source of truth production.
- Không thêm AI API khi chưa có use case và ngân sách rõ ràng.
- Không sao chép nguyên giao diện của website tham khảo.

## 5. Quyền quyết định

Chủ dự án phê duyệt:
- Scope
- Design Direction
- Tech stack
- Chi phí
- Deploy production
- Database migration quan trọng

Claude Code được phép:
- Đề xuất
- Phân tích
- Viết code sau khi được giao
- Chạy kiểm thử
- Cập nhật tài liệu trong phạm vi nhiệm vụ
