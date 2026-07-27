# Reference Philosophy

> Independent governance chapter (Owner Decision 3). Quy định cách dùng tham khảo bên ngoài.
>
> **Nguyên tắc bất biến: Extract principles. Never reproduce layouts.**

Vị trí: Editorial Intelligence → **Reference Philosophy** → Design System → …

Danh sách link nguồn ở `references/source-notes.md` (phụ lục). File này giữ **nguyên tắc diễn giải** — không lặp link.

---

## Nguyên tắc gốc

Reference cho biết một vấn đề đã được giải tốt **ở tầng nguyên tắc** như thế nào; nó **không** trao quyền tái tạo *hình hài* của giải pháp.

> Nếu một quyết định thiết kế chỉ giải thích được bằng "vì [nguồn] làm vậy", quyết định đó **sai** và phải bị loại.

## Allowed principles vs Forbidden copying

| Được rút (principle) | Cấm tuyệt đối (layout / identity) |
| --- | --- |
| Cách whitespace phục vụ đọc; quan hệ spacing ↔ density ↔ focus | Type-scale, letter-spacing, spacing token đặc trưng của nguồn |
| Triết lý motion "phục vụ feedback"; timing hợp lý | Hiệu ứng / transition / micro-interaction nhận diện của nguồn |
| Focus management, keyboard, semantic states | Component, primitive code của nguồn |
| Nguyên tắc cấu trúc, phân tầng container | Grid cụ thể, thứ tự section, khung wireframe |
| Tiêu chuẩn ảnh thật / bằng chứng | Style ảnh, treatment, hoặc asset của nguồn |
| Cách dẫn dắt / progressive disclosure | IA, copywriting, section naming của nguồn |
| — | Màu, token, brand identity của nguồn |

## Reference categories (domain)

Structural · Editorial · Motion · Interaction · Typography · Photography · Composition · Spacing · Narrative. Mỗi domain chỉ cho phép rút **nguyên tắc** trong domain đó; cấm mượn chéo sang *hình hài*.

## Reference Priority Matrix (Owner Decision 5 — governance only)

Mỗi nguồn được viện dẫn cho **đúng một vai trò**. Mượn chéo vai trò (lấy "look" từ Radix, lấy "layout" từ Aside) là vi phạm.

| Nguồn | Ưu tiên rút (đúng một vai trò) | Loại |
| --- | --- | --- |
| **Aside** | Editorial spacing | Visual-craft ref (D45) |
| **Resend** | Interaction refinement | Visual-craft ref (D36) |
| **Apple** | Product clarity | Governance ref |
| **Impeccable** | Governance (anti-AI heuristics) | Governance ref |
| **Material** | Accessibility | Governance ref |
| **Radix** | Behavior (focus / keyboard / semantics) | Governance ref |
| **recent.design** | Micro-interaction inspiration | Visual-craft ref (D36) |

## Per-source allow / forbid

| Nguồn | Chỉ được rút | Cấm |
| --- | --- | --- |
| **Impeccable (pbakaus)** | Bộ nguyên tắc chống AI-UI, detection heuristic, cách tự-audit | Không phải nguồn thị giác — cấm mọi hình hài |
| **Apple HIG** | Typography linh hoạt, readability, a11y, layout đa thiết bị (nguyên tắc) | "Look" Apple, component, spacing đặc trưng |
| **Material 3** | Layout hướng chú ý, quan hệ spacing / density | Material components, elevation / màu đặc trưng |
| **Radix** | A11y, focus, keyboard, semantic primitives | Coi là nguồn visual |
| **Resend** | Chất lượng refinement, cảm giác whitespace / typography (nguyên tắc) | Hero, 3D, dashboard, code editor, **SaaS IA & copywriting** (D36) |
| **Aside** | Cảm giác tương phản / khoảng trắng / hierarchy (chỉ tham chiếu thị giác) | Mã màu, bố cục, component, animation, asset, source, **nhận diện Aside** (D45) |
| **recent.design** | Interaction quality, sound-as-feedback (nguyên tắc) | Interaction / sound signature |

## Governance gate (chống clone)

- Mỗi lần viện dẫn reference, agent phải ghi **"principle extracted"** = một câu nguyên tắc. **Không** đính ảnh chụp / URL như khuôn để bắt chước.
- Nếu chỉ mô tả được *hình hài* mà không phát biểu được *nguyên tắc* → không được dùng.
- Câu hỏi review bắt buộc: **"Bỏ tên nguồn ra, quyết định này còn tự đứng bằng nguyên tắc không?"**
- Kết quả cuối phải qua Replace-name test và không được nhận ra là bản sao của bất kỳ nguồn nào.
