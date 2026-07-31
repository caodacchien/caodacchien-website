# Human Composition

> First-class Design Bible domain (Owner Decision 1). Tầng nguyên tắc về **cách một bố cục được nghĩ ra** — để trang giống do một biên tập viên dựng, không phải do máy sinh.
>
> **Chỉ nguyên tắc, không giá trị triển khai.** Con số (spacing, measure, radius, breakpoint) sống ở `COMPONENT_INVENTORY.md`; file này trỏ tới, không lặp lại.

Vị trí trong hierarchy: Decision Log → Design Bible → **Human Composition** → Editorial Intelligence → Reference Philosophy → Design System → Component Inventory → AI Rulebook → CLAUDE.md → Source.

Năm nhóm nguyên tắc: Composition Principles · Editorial Rhythm · Narrative Sequencing · Visual Tension · Reading Psychology.

---

## 1. Composition Principles

- **Content-first, không component-first.** Component sinh từ nội dung và route thật (xem `07-components.md`). Section ra đời trước nội dung của nó là sai — đây là gốc rễ của phần lớn anti-pattern.
- **Structured asymmetry là mặc định.** Đối xứng 50/50 chỉ dùng khi có lý do narrative (ví dụ statement offset), không phải vì "an toàn".
- **Một điểm nặng thị giác mỗi viewport.** Trọng lượng (scale, độ đậm, tương phản, diện tích tối) phân bổ không đều có chủ đích. Nhiều điểm nặng cạnh tranh = không có điểm nặng.
- **Image-to-text balance theo vai trò section**, không theo template. Mỗi vùng ảnh phải trả lời "bằng chứng gì", không phải "trang trí gì" (đồng bộ `08-imagery-evidence.md`).
- **Visual silence là công cụ nhấn.** Khoảng trắng lớn phải đứng cạnh một điểm nặng để tạo tension; khoảng trắng không mục đích chỉ là "trống".
- **Một signature gesture mỗi viewport** (đồng bộ `03-visual-language.md`).

## 2. Editorial Rhythm

*(Gồm cả Editorial Rhythm — merge vào đây theo Owner Decision 1, không tách file riêng.)*

- **Narrative density biến thiên** theo mạch kể; không đồng đều toàn trang.
- **Không lặp cùng một nhịp quá hai lần liên tiếp** (nhịp = chuỗi thay đổi mật độ/surface/alignment/scale).
- **Section rhythm ngữ nghĩa** Major / Standard / Compact — thang khoảng cách ở `COMPONENT_INVENTORY.md §B.2` và `DESIGN_SYSTEM.md §Section rhythm`. Không lặp số ở đây.
- **Tension vs release:** sau một vùng căng (Deep Black statement, mật độ cao) phải có vùng thả (whitespace, editorial nhẹ). **Không hai vùng căng liên tiếp.**

## 3. Narrative Sequencing

- **Section transition logic:** mỗi chuyển tiếp phải có lý do narrative. Agent phải viết được một câu nối giữa hai section bất kỳ. Không viết được → thứ tự tùy tiện, có thể xáo mà không mất gì.
- **Emotional cadence** khớp năm vai trò nội dung (`02-brand-expression.md`): Positioning → Perspective → Evidence → Method → Invitation. Không mời gọi trước khi tạo tin cậy (P2 Reading before Selling).
- **Reading momentum:** bố cục tạo lực kéo người đọc xuống — mở nhanh → chậm lại ở bằng chứng → tăng tốc ở index → dừng ở statement.
- **Story arc (long-form):** trang dài có mở–thân–chuyển–kết như một bài biên tập, không phải chuỗi khối. Mỗi long-form phải phát biểu được arc của nó bằng một dòng.

## 4. Visual Tension

- **Contrast of information:** đặt cạnh nhau hai loại thông tin khác bản chất (quan điểm ↔ bằng chứng; tổng quát ↔ cụ thể) để tạo nghĩa qua đối sánh.
- Tension đến từ quan hệ **scale / spacing / surface / vị trí**, không từ trang trí (gradient/glow/shadow không được gánh việc của cấu trúc).
- **Cognitive rest points:** trang dài phải có điểm nghỉ nhận thức (statement ngắn, divider có ý nghĩa) trước khi đòi hỏi nỗ lực đọc tiếp.

## 5. Reading Psychology

- **Progressive disclosure** theo tầng cam kết của người đọc: 5s → 30s → 2ph → 5ph (design test ở `01-design-thesis.md`). Không đổ hết thông điệp ở hero; không giấu bằng chứng quá sâu.
- **Measure và whitespace phục vụ đọc dài** — giá trị measure/độ dài dòng ở `COMPONENT_INVENTORY.md §B.1/§B.3`.
- **Authorial fingerprint:** mỗi trang chứa ít nhất một lựa chọn chỉ đúng với Cao Đắc Chiến (quan điểm, cách sắp bằng chứng, câu chữ) — trực tiếp phục vụ Replace-name test (`10-anti-patterns.md`).

---

## Governance gate

Trước khi dựng bất kỳ trang nào, agent khai báo **editorial brief** (mật độ · nhịp · điểm nặng · story arc · transition logic). Quy trình khai báo và các mandatory rule nằm ở `editorial-intelligence.md` — Human Composition cung cấp *nguyên tắc*, Editorial Intelligence cung cấp *quy trình tư duy* dùng các nguyên tắc đó.
