# Editorial Intelligence

> Independent governance chapter (Owner Decision 2). Định nghĩa **thinking rules** — cách agent *suy nghĩ* trước khi bố cục.
>
> **Không implementation. Không UI. Không giá trị.** Đây là "hệ điều hành cho phần nghĩ", không phải hướng dẫn dựng.

Vị trí: Human Composition → **Editorial Intelligence** → Reference Philosophy → Design System → …

**Quan hệ (chống trùng lặp):** Editorial Intelligence *rút nguyên tắc* từ `human-composition.md`, *dùng rào chắn* của `10-anti-patterns.md`, *tuân* `reference-philosophy.md`. Nó không lặp nội dung các file đó — nó là **quy trình + rule bắt buộc + gate** vận hành chúng.

---

## Mô hình tư duy

Website giống "AI-generated" khi nó được dựng **component-first** — chọn khối rồi nhồi nội dung. Editorial Intelligence đảo quy trình: **nghĩ như biên tập trước, chọn hình hài sau.** Đây là tuyến phòng thủ tận gốc cho toàn bộ anti-pattern.

## Mandatory Rule 1 — Editorial Brief trước Composition

Trước khi dựng bất kỳ trang nào, agent phải khai báo:

- **Narrative density** dự kiến của từng section.
- **Nhịp (rhythm)** và nơi đặt tension / release.
- **Điểm nặng thị giác** của mỗi viewport (đúng một).
- **Story arc** (một dòng) cho long-form.
- **Transition logic** — câu nối giữa các section.

Không có editorial brief → không được dựng.

## Mandatory Rule 2 — One Memorable Editorial Moment (Owner Decision 6)

**Mỗi trang phải có đúng một khoảnh khắc biên tập đáng nhớ.**

Ví dụ (danh sách mở, không đóng): manifesto · typography interruption · statement band · oversized whitespace · editorial image.

- Đây là **rule tư duy**, không phải implementation — file này không mô tả cách dựng.
- **Một** moment mỗi trang. Nhiều "moment" thì không moment nào đáng nhớ (đồng bộ "một signature gesture / viewport", `03-visual-language.md`).
- Moment phải phục vụ nội dung hoặc quan điểm, không phải trang trí (P13 Interaction Before Decoration).
- Nếu không chỉ ra được moment của trang → trang chưa xong về mặt biên tập.

## Mandatory Rule 3 — Self-audit trước Review

Chạy toàn bộ **detection heuristics** của `10-anti-patterns.md` trước khi trình review. Mọi cờ đỏ phải được giải trình hoặc sửa, không được bỏ qua im lặng.

## Thinking Gate (câu hỏi bắt buộc trước review)

- Đã khai báo editorial brief chưa?
- Nhịp có biến thiên (không lặp quá 2 lần liên tiếp)?
- Mỗi viewport có đúng một điểm nặng?
- Có đúng **một** memorable editorial moment?
- Viết được câu nối cho **mọi** transition?
- Bỏ màu (grayscale) — hierarchy còn giữ?
- Bỏ tên "Cao Đắc Chiến" — trang còn tự đứng (Replace-name)?
- Mọi viện dẫn reference có kèm "principle extracted" (`reference-philosophy.md`)?

Một câu trả lời "không" là một cổng chưa qua.
