# 09 — Motion & Interaction

Motion chỉ phục vụ orientation, feedback, continuity, focus và delight có tiết chế.

## Timing

Giá trị canonical ở `COMPONENT_INVENTORY.md §B.6` (D32/P9). **Trần 200ms; không reveal khi cuộn** (P9/C10) — không dùng section-reveal 300–400ms.

- Micro: 120ms · Standard: 160ms · Slow: 200ms (trần).
- Ưu tiên `opacity` + `transform` nhỏ; bọc trong `prefers-reduced-motion`.

## Quy tắc

- Hover không làm layout nhảy; focus rõ hơn hover.
- Keyboard navigation và reduced motion là bắt buộc.
- Không autoplay âm thanh.
- Không parallax mạnh, cursor follower, magnetic button, scroll hijacking hoặc animate mọi heading.
- CTA chính/phụ khác bằng hierarchy, không cần hai màu mạnh.
