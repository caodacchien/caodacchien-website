# 06 — Color & Surfaces

## Brand primitives

- Pure White `#FBFBFB`
- Deep Black `#040404`
- Neutral Grey `#DEDEDE`
- Kinetic Orange `#FF4000`

Semantic token được phép dùng tint/shade để đảm bảo text, border, hover, focus, selected, disabled và trạng thái chức năng.

> Khóa theo **D46** (section-based, không light/dark toggle) và **D47** (khóa 4 primitive). **Giá trị semantic per surface + orange scale canonical ở `COMPONENT_INVENTORY.md §B.8`** — file này giữ nguyên tắc, không lặp HEX. **Danger color = `Pending — Phase Color System` (D47)**: không HEX, phân biệt bằng icon + text.

## Section-based composition

- White: long-form, Writing, About, giải thích.
- Grey: chuyển nhịp / supporting, không dùng cho long-form chính.
- Black: statement, featured evidence, Work With Me, footer.
- Orange: focal point, marker, CTA chính, focus có kiểm soát.

## Orange budget

- Tối đa 1 CTA cam và 1 marker/keyword nổi bật trong một viewport.
- Link thường ưu tiên đen + underline/hairline.
- Không dùng cam làm body text nhỏ trên nền White/Grey nếu không đạt tương phản.
- Không dùng cam cho danger.

Functional colors phải có hue riêng và luôn đi cùng icon + text.
