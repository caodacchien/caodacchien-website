# AI Rulebook

## 1. Mục đích

Quy định cách AI agent làm việc để giữ dự án nhất quán, an toàn và dễ bảo trì.

## 2. Trước khi hành động

AI phải:
- Đọc tài liệu liên quan, bao gồm `docs/00-foundation/DECISION_LOG.md`
- Xác định phạm vi
- Nêu giả định
- Liệt kê file thay đổi
- Không sửa ngoài phạm vi

Khi phát hiện tài liệu mâu thuẫn với Decision Log, phải dừng lại và báo. Decision Log là bên đúng.

## 3. Khi viết code

- Không tạo code giả.
- Không để TODO không giải thích.
- Không tạo abstraction khi chưa cần.
- Không thêm dependency tùy tiện.
- Không thay đổi public API âm thầm.
- Không sửa format toàn repository cho một thay đổi nhỏ.

## 4. Khi làm nội dung

Đây là quy tắc bắt buộc, xem D6, D7, D12 và D13 trong Decision Log.

### 4.0 Định vị là nguồn sự thật

`docs/01-product/BRAND_POSITIONING.md` là nguồn sự thật về định vị. Trước mỗi milestone liên quan tới thiết kế, kiến trúc thông tin, copywriting, UX hoặc chiến lược nội dung, phải đọc tài liệu đó trước.

**Cấm suy ra định vị từ nguồn ngoài repository.** Cụ thể, cấm suy ra tệp khách hàng, ngành dọc, chủ đề nội dung hoặc ngôn ngữ thẩm mỹ từ công việc hiện tại của chủ dự án, từ hồ sơ cá nhân trong cấu hình toàn cục, hay từ bất kỳ ngữ cảnh nào bên ngoài `BRAND_POSITIONING.md`.

Lý do quy tắc này tồn tại: ở Milestone 0.3, AI agent đã lấp khoảng trống định vị trong tài liệu bằng thông tin về công ty hiện tại của chủ dự án, và đề xuất một hướng thiết kế lấy cảm hứng từ ngành robot. Toàn bộ vòng làm việc đó phải bỏ đi. Xem D17.

Khi phát hiện tài liệu thiếu thông tin định vị cần thiết, **hỏi chủ dự án**, không tự suy diễn.

### 4.1 Cấm bịa
Không được tạo ra thành tích, số liệu, chức danh, tên dự án, tên khách hàng, học vấn hoặc chứng chỉ không có thật. Khi thiếu thông tin, phải hỏi chủ dự án, không được suy đoán rồi điền vào.

### 4.2 Quy ước placeholder
Khi cần nội dung tạm để dựng giao diện:
- Văn bản bắt đầu bằng `PLACEHOLDER:` hoặc `DRAFT:`
- Số liệu dùng `--` hoặc `PLACEHOLDER`, tuyệt đối không dùng con số trông như thật
- Ảnh dùng ô xám có nhãn `PLACEHOLDER`, không dùng ảnh người thật lấy từ nguồn khác

Mọi placeholder phải tìm được bằng grep. Không deploy production khi nội dung công khai còn placeholder.

### 4.3 Ranh giới Roboworld
Không đưa lên website: dữ liệu mật, tài liệu nội bộ, thông tin khách hàng chưa được phép nêu, thông tin tài chính, mã nguồn thuộc sở hữu công ty.

AI **không được tự phán đoán** một thông tin là công khai hay không. Mọi nội dung nhắc tới Roboworld hoặc khách hàng của Roboworld phải được đánh dấu `REVIEW-REQUIRED` trong `docs/01-product/CONTENT_INVENTORY.md` và chờ chủ dự án kiểm duyệt.

## 5. Khi thay đổi UI

- Bám Design System. Hướng đã khóa là **Strategic Editorial with Product-Level Precision** (D36) — editorial-first và interaction-first, không phải visual-first, không phải SaaS/dashboard.
- Mọi quyết định UI phải nhất quán với 11 Design Principle và 12 Design Constraint trong `DESIGN_SYSTEM.md`.
- **P13 — Interaction Before Decoration:** mọi effect, animation, motion, sound, hover, micro-interaction phải phục vụ usability/feedback/hiểu nội dung. Hiệu ứng trang trí chỉ được phép khi không cạnh tranh với nội dung. **"Sound is feedback, not decoration."**
- Không tự sáng tạo direction mới.
- Không đổi font, màu hoặc radius tùy hứng.
- Chỉ dùng semantic design token. Không hard-code giá trị màu trong component.
- Mọi thay đổi UI phải kiểm tra ở cả light mode và dark mode (hai chế độ đều first-class, D10/D36).
- Chụp hoặc mô tả before/after khi thay đổi lớn.

## 6. Khi làm database

- Không chạy migration production tự động.
- Phải trình bày migration plan.
- Phải nêu rollback plan.
- Phải kiểm tra RLS cho từng bảng mới hoặc bảng bị sửa.
- Không để service role key lọt vào bundle client.

## 7. Khi làm Git

- Không force push.
- Không commit secret.
- Không commit file build.
- Commit nhỏ, có nghĩa.
- Đề xuất Conventional Commit.
- Không tự commit khi chủ dự án chưa kiểm tra, trừ khi được yêu cầu rõ ràng.

## 8. Khi deploy

- Không deploy production nếu chưa được yêu cầu.
- Phải kiểm tra env.
- Phải báo rõ service và tài khoản sử dụng.
- Không in secret trong log hoặc chat.

## 9. Definition of Done

Một task chỉ hoàn thành khi:
- Chức năng đúng yêu cầu
- Typecheck pass
- Lint pass
- Test phù hợp pass
- Không có secret
- Không còn placeholder chưa được đánh dấu
- Không có nội dung bịa
- Kiểm tra ở cả light mode và dark mode nếu có thay đổi UI
- Tài liệu được cập nhật, gồm cả Decision Log nếu có quyết định mới
- Có tóm tắt và commit message đề xuất
