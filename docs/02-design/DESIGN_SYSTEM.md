# Design System

## Trạng thái

**Chưa khóa. Không được viết UI production trước khi chủ dự án chọn Design Direction.**

Bảng màu cụ thể chưa được quyết định. Chỉ được chốt sau Milestone 0.3.

## Ràng buộc đã chốt trước khi thiết kế

Các quyết định sau đã được duyệt và mọi Design Direction đề xuất đều phải thỏa mãn. Xem `docs/00-foundation/DECISION_LOG.md`.

| ID | Ràng buộc |
| --- | --- |
| D4 | Navigation toàn cục chỉ có 6 mục: Home, About, Experience, Projects, Blog, Contact |
| D10 | Bắt buộc có cả light mode và dark mode ngay ở MVP |
| D1 | Bố cục phải chịu được text tiếng Việt có dấu, và sau này chịu được text tiếng Anh dài hơn khoảng 20–30% khi bật locale `en` |
| D7 | Mọi thành phần hiển thị số liệu phải có trạng thái "chưa có dữ liệu" tử tế, vì nội dung thật chưa sẵn sàng |

## Quy trình thiết kế bắt buộc

### Phase 1 — Design Direction
Claude Code phải đề xuất 3–5 hướng thiết kế. Mỗi hướng gồm:
- Triết lý
- Mood
- Màu sắc, mô tả cho **cả light mode và dark mode**
- Typography
- Layout
- Motion
- Component style
- Ưu / nhược điểm
- Website tham khảo

### Phase 2 — Design Tokens
Sau khi chọn hướng:
- Color tokens
- Typography scale
- Spacing
- Grid
- Radius
- Shadow
- Motion duration
- Breakpoints
- Container width

Quy tắc đặt tên token, bắt buộc theo D10:

- Tầng sử dụng chỉ được dùng token **semantic**: `--color-surface`, `--color-surface-raised`, `--color-text-primary`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-danger`.
- Token nguyên thủy theo giá trị màu như `--gray-900` chỉ tồn tại ở tầng định nghĩa, **cấm** dùng trực tiếp trong component.
- Mỗi token semantic phải có giá trị cho cả hai chế độ.
- Shadow trong dark mode không được sao chép từ light mode. Dark mode dùng phân tầng bằng độ sáng bề mặt thay vì đổ bóng.

### Phase 3 — Wireframe
Wireframe cho:
- Desktop
- Tablet
- Mobile

### Phase 4 — UI Specification
Mô tả:
- Hover
- Focus
- Loading
- Error
- Empty
- Success
- Dark mode

Yêu cầu riêng cho theme, theo D10:

- Mặc định theo `prefers-color-scheme` của hệ thống.
- Có nút chuyển theme với ba trạng thái: system, light, dark.
- Lưu lựa chọn của người dùng và khôi phục ở lần truy cập sau.
- Không được nhấp nháy sai theme khi tải trang.
- Nút chuyển theme phải truy cập được bằng bàn phím và có nhãn cho screen reader.

## Nguồn tham khảo định hướng

- Apple: bố cục và khoảng trắng
- Vercel: typography và tính kỹ thuật
- Linear: motion và dashboard
- Notion: content readability
- Framer: landing page presentation
- shadcn/ui: component foundation
- Lucide: iconography

## Nguyên tắc không được vi phạm

- Không copy nguyên bản website tham khảo.
- Không dùng quá nhiều gradient hoặc glassmorphism.
- Không hy sinh readability cho hiệu ứng.
- Không dùng animation dài hoặc gây cản trở.
- Mọi màu phải đạt độ tương phản hợp lý. Kiểm tra tương phản **riêng cho từng chế độ sáng và tối**, không suy diễn kết quả từ chế độ này sang chế độ kia.
- Component phải nhất quán toàn site.
- Tôn trọng `prefers-reduced-motion`.
