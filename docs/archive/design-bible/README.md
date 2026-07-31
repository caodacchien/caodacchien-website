# CDC Design Bible

**Dự án:** Website thương hiệu cá nhân Cao Đắc Chiến  
**Phiên bản:** 1.0 — Foundation  
**Vai trò:** Nguồn chuẩn để Claude Code nghiên cứu, đề xuất, thiết kế, review và triển khai UI.

## Mục đích

- Có bản sắc cá nhân, không mang cảm giác “AI template”.
- Thể hiện đúng vai trò Marketing Leader / strategist / operator.
- Ưu tiên tư duy, bằng chứng, nội dung dài và trải nghiệm đọc.
- Có tính biên tập, có nhịp, có chủ đích nhưng không phô diễn kỹ thuật.
- Duy trì nhất quán khi mở rộng Writing, Case Studies, Topics, About và Contact.

## Thứ tự ưu tiên khi có xung đột

1. Nội dung thật và bằng chứng thật.
2. Khả năng đọc và hiểu.
3. Luận điểm thương hiệu.
4. Nhịp bố cục và art direction.
5. Tính nhất quán của design system.
6. Hiệu ứng và trang trí.

## Quy trình bắt buộc

**Research → Decision → Edit → Review → Commit → Push**

Mỗi thay đổi phải trả lời: vấn đề gì, quy tắc nào hỗ trợ, nội dung thật nào tạo bố cục, điều gì bị loại bỏ, grayscale còn rõ không, và Replace-name test có thất bại không.

## Cấu trúc Design Bible

Design Bible là **governance layer**, đứng dưới Decision Log và trên Design System (xem hierarchy). Con số triển khai (spacing, radius, màu, breakpoint) sống ở `COMPONENT_INVENTORY.md`; các chapter dưới đây giữ **nguyên tắc**, không lặp giá trị.

| Nhóm | File |
| --- | --- |
| Foundation — WHY / WHO | `01-design-thesis.md` · `02-brand-expression.md` |
| **Thinking — HOW nghĩ** | `human-composition.md` · `editorial-intelligence.md` · `reference-philosophy.md` |
| Craft — WHAT | `03-visual-language.md` → `09-motion-interaction.md` |
| Guardrails | `10-anti-patterns.md` · `checklists/design-review.md` |
| Appendix | `references/source-notes.md` |

## Trật tự đọc bắt buộc

```
Decision Log  →  Design Bible
   ├─ 01 Design Thesis  ├─ 02 Brand Expression
   ├─ Human Composition        (bố cục được nghĩ thế nào)
   ├─ Editorial Intelligence   (thinking rules + memorable moment)
   ├─ Reference Philosophy     (mượn nguyên tắc, cấm clone)
   ├─ 03–09 Craft              (visual/layout/type/color/component/imagery/motion)
   └─ 10 Anti-patterns + checklists  (rào chắn)
→  Design System → Component Inventory → AI Rulebook → CLAUDE.md → Source
```

Nghĩ (Human Composition + Editorial Intelligence) đứng **trước** dựng (Craft): agent phải nghĩ như biên tập trước khi chọn component.
