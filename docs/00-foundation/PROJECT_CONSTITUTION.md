# Project Constitution

## 1. Tầm nhìn

Xây dựng `caodacchien.io.vn` thành **Publishing Platform** của một **Marketing Leader / Brand & Marketing Strategist**, bền vững trong 5–10 năm.

Sản phẩm chứng minh năng lực chuyên môn ở mười vùng: Marketing Strategy, Brand Strategy, Communication Strategy, Content Marketing, Digital Marketing, Marketing Automation, AI for Marketing, Marketing Leadership, Business Growth, và quan điểm cá nhân về marketing và truyền thông.

Đây là **nền tảng xuất bản**. Nó không phải portfolio, không phải gallery, không phải personal homepage, không phải consulting landing page, không phải portfolio freelancer, và không phải website công ty. Trung tâm của sản phẩm là bài viết, khung tư duy và case study.

Cảm giác đích cần đạt: **tổng hành dinh số của một Marketing Leader**.

Nguồn sự thật về định vị: `docs/01-product/BRAND_POSITIONING.md`. Chốt theo D12, tinh chỉnh theo D20 và D22.

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
Mã nguồn, domain, database và hạ tầng cá nhân phải nằm dưới tài khoản cá nhân của chủ dự án. Xem D5 trong `DECISION_LOG.md`.

| Hạng mục | Tài khoản |
| --- | --- |
| Domain | `caodacchien.io.vn`, sở hữu cá nhân |
| Email hạ tầng | `forwork.chiencd@gmail.com` |
| GitHub | `caodacchien` |
| Cloudflare, Vercel, Supabase | tài khoản cá nhân dùng email hạ tầng ở trên |

Không dùng email công ty, tổ chức GitHub hoặc team Vercel của Roboworld cho dự án này.

### 2.4 Bảo mật theo mặc định
- Không commit secret
- Phân quyền tối thiểu
- Validate dữ liệu đầu vào
- Có rate limit với endpoint công khai
- Có backup và recovery plan

### 2.5 Tài liệu là bắt buộc
Mọi thay đổi lớn phải cập nhật tài liệu liên quan và được ghi vào `DECISION_LOG.md`.

### 2.6 Ranh giới với công ty hiện tại

Roboworld là **một case study trong nhiều case study**, và là **một mục trong Experience**. Không hơn. Xem D13.

Cấm dùng công ty hiện tại của chủ dự án làm khung định vị website, làm nguồn suy ra tệp khách hàng mục tiêu, làm nguồn suy ra chủ đề nội dung, hoặc làm nguồn cảm hứng thẩm mỹ cho thiết kế. Năng lực marketing là năng lực xuyên ngành; website không được mặc định khách hàng thuộc bất kỳ ngành dọc nào.

Về mặt bảo mật, website được phép nhắc tới Roboworld trong Experience và Projects dưới góc độ portfolio cá nhân. Xem D6 trong `DECISION_LOG.md`.

Được phép:
- Chức danh, giai đoạn công tác, phạm vi trách nhiệm
- Case study đã được phép công khai
- Thông tin đã công bố trên kênh chính thức của công ty

Cấm tuyệt đối:
- Dữ liệu mật và tài liệu nội bộ
- Thông tin khách hàng chưa được phép nêu
- Thông tin tài chính, doanh thu, biên lợi nhuận, giá bán
- Mã nguồn hoặc tài sản kỹ thuật thuộc sở hữu công ty

Mọi nội dung chạm tới ranh giới này phải được đánh dấu `REVIEW-REQUIRED` và chỉ xuất bản sau khi chủ dự án kiểm duyệt. AI agent không được tự phán đoán một thông tin là công khai hay không.

### 2.7 Tính trung thực của nội dung
Không được tạo ra thành tích, số liệu, chức danh, dự án, khách hàng, học vấn hoặc chứng chỉ không có thật. Xem D7 trong `DECISION_LOG.md`.

Khi chưa có nội dung thật, placeholder phải được đánh dấu bằng tiền tố `PLACEHOLDER:` hoặc `DRAFT:` để có thể tìm bằng grep. Không deploy production khi nội dung công khai còn placeholder.

## 3. Phạm vi sản phẩm

Bản chất sản phẩm là nền tảng xuất bản. Mọi giai đoạn đều phải giữ được năng lực xuất bản đều đặn làm trục chính, thay vì tích lũy tính năng.

### MVP — 6 trang
Chốt theo D4 trong `DECISION_LOG.md`. Đang chờ quyết định D18 về việc có bổ sung khối "Làm việc cùng tôi" hoặc trang Resources hay không.

- Home
- About
- Experience
- Projects
- Blog
- Contact
- SEO nền tảng
- Analytics (chỉ Google Analytics 4, theo D9)
- Light mode và dark mode (theo D10)
- Tiếng Việt, kiến trúc sẵn sàng song ngữ (theo D1)

MVP **không** bao gồm CMS và Authentication. Nội dung được sửa qua Git với bài blog dạng MDX, và qua Supabase Studio với dữ liệu có cấu trúc. Xem D3.

### Giai đoạn sau
- CMS và content workflow
- Resources
- Speaking / Teaching
- Locale tiếng Anh
- AI Content Studio
- Newsletter
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
- Không bịa nội dung hoặc số liệu. Xem §2.7.
- Không đưa dữ liệu mật của Roboworld lên website. Xem §2.6.
- Không dùng hạ tầng thuộc tài khoản công ty cho dự án này. Xem §2.3.

## 5. Quyền quyết định

Chủ dự án phê duyệt:
- Scope
- Design Direction
- Tech stack
- Chi phí
- Deploy production
- Database migration quan trọng
- Nội dung có liên quan tới Roboworld hoặc bên thứ ba

Claude Code được phép:
- Đề xuất
- Phân tích
- Viết code sau khi được giao
- Chạy kiểm thử
- Cập nhật tài liệu trong phạm vi nhiệm vụ

## 6. Decision Log

Mọi quyết định lớn được ghi tại `docs/00-foundation/DECISION_LOG.md` với ID cố định từ D1 trở đi.

Khi một tài liệu mâu thuẫn với Decision Log, tài liệu đó phải được sửa cho khớp, không phải ngược lại. Muốn thay đổi một quyết định đã duyệt thì tạo ID mới và đánh dấu ID cũ là `Superseded`.
