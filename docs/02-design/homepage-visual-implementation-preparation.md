# Homepage Visual Implementation Preparation (1.5A)

> **Preparation only.** KHÔNG sửa source (page/layout/globals), KHÔNG triển khai typography/màu/border/radius/CTA/responsive-visual/animation, KHÔNG commit. Chỉ đặc tả để 1.5B triển khai visual.
>
> Đây **không** phải source-of-truth mới — chỉ chuyển nguyên tắc đã khóa thành visual implementation plan. Con số sống ở `COMPONENT_INVENTORY §B` + `DECISION_LOG`. Khi cần giá trị → dẫn token/§B, **không** phát minh pixel.

## 1. Document status and authority

- **Checkpoint:** 1.5A — Homepage Visual Implementation Preparation (Research → Decision → Documentation).
- **Mục đích:** biến direction đã khóa (D46–D57 + Bible + Contract) thành visual plan cụ thể cho typography, color/surface, border/divider, radius, link/CTA, rhythm, responsive, state, a11y, CSS ownership — đủ để 1.5B triển khai **không phải tự phát minh** design.
- **Phạm vi:** chỉ Homepage; chỉ visual layer chồng lên semantic skeleton (1.3) + layout (1.4) đã approve. **Không** đổi semantics/content/route/layout-structure.
- **Source of truth (hierarchy D50):** Decision Log → Design Bible → DESIGN_SYSTEM → COMPONENT_INVENTORY (§B, số canonical) → Visual Implementation Contract → Visual Token Mapping → CSS Architecture Spec → Layout Prep → **file này** → Source. Tầng dưới không override tầng trên; file này tiêu thụ, không tạo value.
- **Kế thừa:** `homepage-visual-implementation-contract.md` (0.5C), `homepage-visual-token-mapping.md` (0.6A), `homepage-css-architecture-spec.md` (0.6B/OD-CSS-1..8), `homepage-layout-implementation-preparation.md` (1.4A), semantic skeleton (1.3), `globals.css` token foundation (1.2C).
- **Governed vs deferred:** giá trị §B đã khóa (scale/spacing/radius/duration/container/breakpoint, 4 primitive, semantic-per-surface) = **governed**; per-role exact pixel, easing curve, functional/danger HEX, selected/disabled slot = **deferred** (contract §7/§19, token-mapping §18, css-arch §18).
- **File này KHÔNG** là approval cho content giả hoặc cho render S2/S3/S5 khi content chưa READY (D7/D54/D55). Visual plan cho S2/S3/S5 là **forward-only** (không kích hoạt render).

## 2. Visual thesis

Homepage là **cửa vào tổng hành dinh số của một Marketing Leader xây hệ thống** (BRAND §6b, contract §2). Visual chứng minh thẩm quyền bằng **cấu trúc, tiết chế, bằng chứng** — không bằng trang trí. Cụ thể hóa bằng **hành vi thiết kế** (không tính từ mơ hồ):

| Nguyên tắc | Thể hiện visual bằng hành vi cụ thể |
|---|---|
| **Editorial-first** | type-scale phân vai rõ (statement ≫ heading ≫ body ≫ meta); measure kiểm soát (body 68ch, §B.1); text-first, ảnh chỉ khi là bằng chứng; không component-showcase. |
| **Quiet authority** | 4 màu, phần lớn White + ink đen; Orange **chỉ** 1 CTA + 1 marker; border 1px hairline thay shadow; không gradient/glow/glass; whitespace làm nhấn (Bible). |
| **Content-led** | visual không thêm khối không nội dung; omit sạch (S2/S3/S5); hierarchy đến từ nội dung thật, không từ ô/tile trang trí. |
| **Intentional asymmetry** | S1 statement bám left-rail (không centered); S3 (khi render) artifact 7/5; **không** 50/50 hàng loạt; chỉ S6 centered có chủ đích. |
| **Systems thinking** | nhất quán token xuyên section (cùng semantic → cùng behavior); rhythm biến thiên có quy luật (density curve); 1 memorable moment (Hero) + 1 evidence peak (S3). |

**Phân biệt (fail-test):** không **agency** (không case-parade/testimonial); không **SaaS landing** (không feature-grid/KPI-tile/CTA-obsession/hero-split); không **portfolio template** (không gallery/tile); không **magazine clone** (không ảnh-grid trang trí); không **dashboard** (không ô số/mật độ đều); không **AI-generated template** (không bento/equal-spacing/gradient/giant-ghost/rounded-everything). Replace-name test: đổi tên → trang phải **mất nghĩa** (authorial fingerprint qua copy + cách sắp bằng chứng).

## 3. Attention map

Kế thừa layout-prep §19 + contract §3. Visual layer phải **giữ** hierarchy này, không tạo cạnh tranh mới:

| Vùng | Section | Vai trò visual | Cách nhấn (không tính từ) |
|---|---|---|---|
| **Primary / memorable** | S1 Hero | định vị | type lớn nhất (statement, §B.1 h1), silence quanh, left-rail asymmetry |
| **Editorial rest / scan** | S4 Pillar Map | bản đồ tư duy | mật độ thấp, rows hairline, type vừa; **không** sales grid/cards |
| **Action peak (hiện tại)** | S6 Contact CTA | hành động | centered isolation, **1 CTA cam** (điểm Orange duy nhất rõ), silence cao |
| **Evidence peak (khi render)** | S3 Case | bằng chứng | Black surface, mật độ cao ws thấp, artifact 7/5, signature radius ≤1 |
| **Supporting (khi render)** | S5 Work | lời mời | Grey surface, balanced two-region, tiết chế |
| **De-escalation** | S7 Footer | kết | type-muted, cường độ thấp nhất, hairline tách khỏi S6 |

**Ràng buộc visual bắt buộc:**
- **Hero không tranh chấp CTA:** Hero CTA (link "Đọc bài viết") = **subordinate** (ink link, không cam-fill); CTA cam-fill duy nhất ở S6. → chỉ **một** điểm Orange nổi.
- **S4 = scan/thinking, không sales grid:** không tô nền/viền từng ô; rows + hairline.
- **S6 = action peak hiện tại** (S3 omit → S6 là đỉnh chú ý cuối).
- **S3 = evidence peak duy nhất khi render** (Black duy nhất); **nếu S3 omit KHÔNG** nâng S4 thành peak giả.
- **Orange không xuất hiện nhiều điểm cạnh tranh:** budget 1 CTA (S6) + tối đa 1 marker (S1, optional). Link thường **không** cam (xem §5/§9).

## 4. Typography system

Geist Sans **duy nhất** (D48); scale/measure/lh canonical `§B.1` (đã ở `globals.css` `:root`: `--text-h1..xs`, `--weight-*`, `--leading-*`, `--measure-prose`). **Per-role exact pixel + fluid clamp = deferred implementation detail** (contract §7) — 1.5B ánh xạ role→token, mobile step-down bằng `clamp()` **trong biên §B.1** (desktop/mobile pair đã khóa), **không** invent size mới.

| Role | Purpose / hierarchy | Scale (token §B.1, desktop/mobile) | Weight | Line-height | Measure | Letter-spacing | Wrapping / mobile | Consumer (hiện có) |
|---|---|---|---|---|---|---|---|---|
| **Hero statement (display)** | định vị, đỉnh hierarchy | `--text-h1` 45/34 (clamp) | `--weight-heading` 600 (không 700) | `--leading-heading` 1.15 | ≤~46ch tạm (final ≤17ch cần type lớn — deferred) | ≤−0.01em (kiểm dấu Ế/Ữ) | line-break art-direct riêng mobile; **không** one-word/line | `.hero h1` |
| **Section eyebrow** | nhãn ngữ cảnh | `--text-xs` 14 | 450–500 | `--leading-ui` 1.5 | — | 0–0.02em | sentence, **không uppercase dài** | `.hero .eyebrow` |
| **Section heading (h2)** | mục cấp trang | `--text-h2` 36/28 (clamp) | 600 | 1.15 | — | 0 | — | `.pillar-map h2`, `.contact-cta h2`, (S2/S3/S5 khi render) |
| **Editorial row title (h3)** | trụ / bài / case title | `--text-h3` 28/24 hoặc `--text-lg` | 600 | 1.2 | — | 0 | không cắt nhãn 320px | `.pillars > li h3`, article/case h3 |
| **Editorial row description** | mô tả trụ | `--text-body`/`--text-sm` | `--weight-body` 400 | 1.5–1.7 | ≤46ch (đã có) | 0 | wrap dưới title ở mobile | `.pillars > li p` |
| **Body lead** | mở đoạn (S5 lead, khi render) | `--text-lg` 22/19 | 400–500 | 1.45 | ≤60ch | 0 | — | `.work-lead` (forward) |
| **Body standard** | đọc dài (S2, khi render) | `--text-body` 19/17 | 400 | `--leading-body` 1.7 | `--measure-prose` 68ch | 0 | lh rộng cho dấu VN | S2 body (forward) |
| **Supporting / metadata** | ngày/reading-time (khi content thật) | `--text-xs`/`--text-sm` 14–16 | 450–500 | 1.5 | — | 0–0.02em | **tabular-nums** chỉ khi số thật | `.meta` (forward, gated) |
| **Navigation** | nav | `--text-sm` 16 | `--weight-medium` 500 | 1.5 | — | 0 | wrap/compact | `.primary-nav`, `.footer-nav` |
| **CTA label** | hành động | `--text-sm` 16 | 600 | 1.2 | — | 0 | không wrap giữa từ | `.contact-actions` (S6) |
| **Footer text** | kết, muted | `--text-sm`/`--text-xs` | 400–450 | 1.5 | — | 0 | — | `.site-footer`, `.copyright` |

**Bắt buộc:** không Geist Mono visible · không slashed zero · metric `tabular-nums` (chỉ khi số thật) · **không mặc định weight 700** (ưu tiên 600) · **không uppercase máy móc** · không italic metric · không dùng mono để "trông technical". Fluid type (nếu dùng): role rõ, min=mobile-§B.1, max=desktop-§B.1, guardrail chống one-word/line 320px + chống overfit wide.

## 5. Color role mapping

4 primitive (D47): White `#FBFBFB` · Black `#040404` · Grey `#DEDEDE` · Orange `#FF4000`. Semantic-per-surface **đã có** ở `globals.css` `@layer surfaces` (§B.8). Visual layer **tiêu thụ semantic**, không đọc primitive.

| Semantic role | Token (đã có) | White (default) | Grey (S5) | Black (S3) | Ghi chú contrast (token-mapping §16) |
|---|---|---|---|---|---|
| Page background | `--color-surface` | #FBFBFB | #DEDEDE | #040404 | — |
| Default text | `--color-text-primary` | #040404 | #040404 | #FBFBFB | 19.6:1 / ~15:1 / ~19:1 PASS |
| Secondary text | `--color-text-secondary` | #3A3A3A | #3A3A3A | #B0B0B0 | — |
| Muted text | `--color-text-muted` | #6E6E6E | #555555 | #8A8A8A | metadata only; muted-on-Grey/Black **đo ở contrast checkpoint** |
| Border / divider | `--color-border` | #DEDEDE | #B0B0B0 | #3A3A3A | 1px hairline |
| Primary action (fill) | `--color-accent` | #FF4000 | #FF4000 | #FF4000 | CTA fill; text trên = `--color-on-accent` #040404 (5.84:1 PASS) |
| Accent-text (link/marker) | `--color-accent-text` | #C42F00 (o-700) | #A62800 (o-800) | #FF4000 (o-500) | link nhấn có chủ đích; 5.41 / 5.34 / 5.84 PASS |
| Focus ring | `--color-focus-ring` | #FF4000 | #A62800 (o-800, đã fix) | #FF4000 | non-text 3:1; Grey dùng o-800 (đã khóa 1.2C) |

**Action state (nguyên tắc, HEX từ derived scale token-mapping §5):** hover = brightness↓ / o-400; active/pressed = o-600 `#E03600`; focus-visible = ring 2px (đã có accessibility layer). **Easing curve = deferred.** State **không** chỉ bằng màu (kèm underline/border) — §12.

**Ràng buộc bắt buộc:**
- White = surface mặc định; **Black chỉ S3 khi render**; **Grey chỉ S5 khi render**; Orange = **control/marker**, không decorative fill, **không** Orange-section toàn khối, **không** `data-surface="orange"` cho section (chỉ CTA control dùng accent).
- **Không** alternating stripe · **không** global dark mode · **không** thêm màu ngoài 4 primitive + derived §B.8 · **không** tint nhiều cấp ngoài §B.8 · **không** opacity-based text quá nhạt (dùng ink ramp token, không `opacity`).
- **Link color correction (governed, contract §6 "cấm cam nav"):** base hiện `a{color:accent-text}` khiến **mọi** link = o-700 (cam) — vi phạm "cam nav/mọi trụ prohibited" (contract §6 S0/S4). 1.5B **phải** đặt link editorial/nav/pillar/footer về **ink** (`--color-text-primary`) + affordance non-color (underline/hairline), giữ `accent-text` cho **link nhấn có chủ đích** hoặc surface Black. → giảm Orange về đúng budget. *(Implementation inference dựa contract §6; căn cứ = bảng accent prohibited per section.)*
- Phân tầng: **primitive** (chỉ `:root`) → **semantic** (component đọc) → **component treatment** (alias khi cần) → **section ownership** (`data-surface`). Component **không** hardcode HEX.

## 6. Surface and section expression

Section-based (D46). White sections dùng `body` default; S3/S5 dùng `data-surface` (hook đã có ở page.tsx) + **rule paint** (governed, cần ở 1.5B).

> **Surface paint (governed, css-arch §7):** hiện `@layer surfaces` chỉ re-map custom property, **chưa** có rule sơn nền cho section mang `data-surface`. 1.5B thêm (layer `surfaces`):
> `:where([data-surface]) { background-color: var(--color-surface); color: var(--color-text-primary); }`
> → S3 Black / S5 Grey hiển thị nền đúng **khi render**; full-bleed surface + inner container (đã có). White sections không cần (body đã sơn). *(Forward-only — S3/S5 vẫn omit.)*

| S | Visual expression | Bắt buộc / Cấm |
|---|---|---|
| **S0 Header** | quiet, compact band; wordmark 600 + nav 500 ink; split hai biên; hairline dưới header **optional** (governed: whitespace ưu tiên, contract §6). | Cấm app-shell/nav-pill lớn/floating-CTA/ThemeToggle/icon. Sticky **deferred**. |
| **S1 Hero** | statement-led (h1 lớn, left-rail); eyebrow nhỏ trên; hero-actions link ink subordinate; hierarchy bằng **type + measure + spacing + contrast**, không media. | Cấm centered-SaaS/full-screen/decorative-image/browser-frame/portrait-placeholder. Portrait omit → không cột rỗng. CTA subordinate. |
| **S2 Featured Writing** (forward) | **không render**; plan: prose text-first, 1 featured lớn + list; title link ink + underline hover; meta muted `tabular-nums` chỉ khi thật; ảnh optional. | Cấm three-card-grid mặc định/blog-card/thumbnail bắt buộc. |
| **S3 Featured Case Study** (forward) | **không render**; plan: **Black evidence peak duy nhất**; artifact-first khi có artifact; project title h3 trắng; metric `tabular-nums` (số thật); **signature radius ≤1** cho evidence frame nếu phù hợp. | Cấm fake-dashboard/metric-theater/browser-chrome-giả/nhiều-black-section. |
| **S4 Pillar Map** | editorial index rows (đã layout): mỗi hàng = number optional / title h3 / supporting muted / link affordance; hairline `--color-border` ranh giới hàng; hover/focus **không** biến hàng thành card nổi (đổi màu title/underline, không shadow/lift/bg-tile). | Cấm equal-cards/icon-per-pillar/feature-grid/bento/tiles/carousel/floating-panel. Scan tốt mobile (title→scope stack). |
| **S5 Work With Me** (forward) | **không render**; plan: **Grey supporting surface**; balanced two-region; lead type-lg; 1 CTA link theo content duyệt. | Cấm pricing-table/service-cards/booking-funnel. |
| **S6 Contact CTA** | action peak; **1 primary CTA** = accent-fill control (`--color-accent` bg, `--color-on-accent` text, radius control) — **điểm Orange rõ duy nhất**; centered isolation; transition xuống Footer bằng spacing. | Cấm giant-orange-island/form/calendar/widget/multiple-CTA/Orange-full-section. |
| **S7 Footer** | quiet editorial ending; type muted, cường độ thấp nhất; hairline `border-block-start` tách S6 (đã có); chỉ real links; `<address>` email. | Cấm mega-footer/newsletter/fake-social/legal-sitemap-giả/logo-wall. |

## 7. Border, divider and separation logic

Token: `--color-border` 1px (per surface §B.8). Phân tầng bằng **border (light) / surface-contrast (Black) / whitespace** — **không shadow** (contract §6, §B.5 elevation 2 mức không shadow trang trí).

| Dùng | Khi nào | Ownership |
|---|---|---|
| **Whitespace** (ưu tiên) | phần lớn ranh giới section/nhóm; transition mạch đọc | section padding (layer layout, đã có) |
| **Hairline 1px** | ranh giới hàng editorial (S4 pillars — đã có), tách Footer (đã có), header underline (optional) | section/content, `border-block-*` |
| **Surface contrast** | S2→S3 (White→Black), S4→S5 (White→Grey) | `data-surface` (khi render) |

**Cấm:** box-shadow làm separation mặc định · card chrome · border **mọi** phần tử · table-like UI (dl/table chỉ khi dữ liệu thật, không dùng cho layout) · double-border/nested-frame. **Divider-vs-whitespace:** governed = whitespace-first + hairline cho editorial rows/footer (đã áp 1.4B); **deferred** = hairline trang trí thêm (header underline, section rules) → 1.5B chọn tối giản, **không** khóa production polish thừa.

## 8. Radius policy

Contract R3 (D49, `§B.4`; token `--radius-control/card/panel/signature/pill` đã có). **Không** value/scale mới.

| Element | Radius | Ghi chú |
|---|---|---|
| **CTA / button (S6)** | `--radius-control` (8–10) | control affordance; **không** pill/capsule |
| ContentCard (S2/S3, forward) | `--radius-card` (12–16) | chỉ khi render |
| Evidence frame (S3, forward) | `--radius-signature` (36–48) | **tối đa 1 object/trang**, chỉ khi có evidence thật; optional |
| **Section / surface / row / nav / link / footer** | **0 (không radius)** | full-width surface không bo; editorial row không bo; link/nav không pill |

**Cấm:** pill-everything · rounded section · rounded editorial row hàng loạt · capsule mọi button · radius lớn "AI signature". Signature radius **chỉ** evidence frame S3 khi evidence thật (hiện omit → **không** dùng).

## 9. Link and CTA treatment

Sửa over-orange hiện tại (§5). State đầy đủ ở §12. Affordance **non-color** bắt buộc.

| Loại | Resting | Hover | Focus-visible | Active | Affordance ngoài màu |
|---|---|---|---|---|---|
| **Nav link** (S0/S7) | ink `--color-text-primary`, không underline | underline hoặc ink đậm | ring 2px `--color-focus-ring` (đã có) | — | underline on hover |
| **Inline editorial link** | ink + **underline** (resting) | underline đậm/accent-text | ring | — | underline luôn có |
| **Pillar row link** (S4) | title ink, cả hàng là target | title → accent-text hoặc underline; **không** card-lift/shadow/bg | ring quanh hàng/title | — | underline/màu-title đổi |
| **Primary CTA** (S6) | **accent fill** control (`--color-accent` bg + `--color-on-accent` text) | brightness↓ / o-400, không layout-shift | ring 2px (offset) | o-600 pressed | fill + label 600 (không chỉ màu) |
| **Secondary text action** (Hero "Đọc bài viết") | ink + underline, **subordinate** (không fill) | underline đậm | ring | — | underline |
| **Footer link** | muted→ink + underline hover | underline | ring | — | underline |

**Cấm:** biến mọi link thành button · mọi button thành pill · Orange cho **mọi** link · hover **chỉ** bằng màu (phải kèm underline/border) · icon mũi tên cho mọi link (không có icon system — cấm ad-hoc) · CTA giả / secondary-CTA chưa duyệt · CTA thứ hai cạnh tranh ở S6. Transition state ≤200ms, reduced-motion-safe (§12).

## 10. Visual rhythm and density

Kế thừa layout density curve (1.4A §17, đã áp 1.4B): header `space-5` / hero `space-8..9` / pillar `space-7` / contact `space-9` / footer `space-7` (non-equal). Visual layer **hỗ trợ**, phân biệt 5 loại spacing:

| Loại spacing | Ownership | Token |
|---|---|---|
| **Layout / section** | layer layout (đã có) | `--space-5..10` (rhythm ngữ nghĩa) |
| **Typography** (title↔body, lh) | role styling 1.5B | `--space-3..5`, `--leading-*` |
| **Component internal** | component/composition 1.5B | `--space-*` |
| **Section transition** | section padding (đã có) | Major/Standard/Compact |
| **Optical adjustment** | 1.5B (align baseline, letter-spacing dấu VN) | tinh chỉnh nhỏ, có lý do |

**Hỗ trợ:** Header compact → Hero major/thoáng (silence quanh statement) → S4 scan (ws cao, rows) → S6 action (silence, CTA nổi) → Footer de-escalation (muted, compact). **Cấm:** equal-spacing mọi section · whitespace kiểu presentation-deck · nén kiểu dashboard · negative-margin tạo style · arbitrary spacing "cho đẹp" (dùng token §B.2).

## 11. Responsive visual strategy

Behavioral tiers (§B.9: 768/1024/1280 +640/1536), mobile-first (OD-CSS-2). Layout gutter/footer đã có (1.4B); visual layer thêm **type-scale + measure + affordance** adaptation. **Exact breakpoint pixel deferred → §B.9** (dùng đúng, không invent).

| Width | Type scale | Wrapping / measure | Nav | Pillar row | CTA | Footer | Divider/focus/touch |
|---|---|---|---|---|---|---|---|
| 320 | min (§B.1 mobile: h1 34, h2 28…) via clamp | 68ch→padding co; **không** one-word/line h1 | wrap/compact | title→scope **stack** dọc | full-width control | stack | hairline giữ; focus ring rõ; touch ≥44px |
| 375 / 390 / 430 | min→giữa (clamp) | như trên; line-break Hero art-direct | wrap | stack hoặc title/scope cùng dòng nếu đủ | full-width | stack | như trên |
| 768 | giữa (clamp) | measure giữ; gutter `space-6` | ngang/rút gọn | title trái / scope phải (baseline) | inline hoặc full theo width | row two-col-ready (đã có) | như trên |
| 1024 | tiến max | gutter `space-7`; measure 68ch | ngang 5 | title/scope hai cột | inline | two-col | như trên |
| 1280 / 1440 / 1920 | max (§B.1 desktop: h1 45, h2 36…) | container cap (content 1080 / wide 1280) căn giữa; **không** giãn type quá max | ngang | hàng đầy đủ | inline | two-col | container cap; không tràn |

**Cấm:** thu nhỏ desktop cho mobile (composition riêng) · duplicate DOM · ẩn meaningful content · viewport-JS/ResizeObserver · arbitrary breakpoint proliferation · **container query** (chưa canonical-approve — deferred) · pixel-overfit một screenshot · type-overscaling (giant heading mobile) · one-word/line.

## 12. State matrix

Chỉ state có use-case thật ở Homepage hiện tại. `§B.6/§B.7`, token-mapping §11. Transition opacity/transform/background-color, ≤200ms; **không color-only**.

| State | Áp dụng | Biểu diễn | A11y |
|---|---|---|---|
| **default** | mọi link/CTA | semantic token theo surface | — |
| **hover** | link/CTA (device có hover) | underline (link) / brightness↓ (CTA); **không** layout-shift | không chỉ màu |
| **focus-visible** | mọi interactive | ring 2px `--color-focus-ring` offset (đã có accessibility layer) | rõ hơn hover; keyboard visible |
| **active/pressed** | CTA/link | o-600 / pressed nhẹ | — |
| **visited** | *không* style riêng (editorial, tránh nhiễu) | = default | — |
| **no-hover / touch** | mobile | underline/affordance **luôn hiện** (không phụ thuộc hover); touch ≥44px | không hover-only |
| **reduced-motion** | toàn trang | tắt transition không thiết yếu (đã có `@media prefers-reduced-motion`) | tôn trọng |
| **high zoom / text resize** | toàn trang | reflow, không clip, không overflow (ch/rem/%) | — |

**Không tạo** loading/skeleton/disabled state (Homepage không có use-case; disabled chỉ khi có element thật). **Không** giả success/urgency.

## 13. Accessibility visual contract (nguyên tắc — không phải WCAG certification)

- **Contrast (đo, không đoán, §B.8/token-mapping §16):** text-primary mọi surface PASS (19.6/~15/~19:1); accent-text o-700/o-800/o-500 PASS (5.41/5.34/5.84); **Orange #FF4000 body/link nhỏ trên White (3.39) & Grey (2.61) = FAIL → CẤM** làm body/link nhỏ; muted-on-Grey/Black = **TBD, đo ở contrast checkpoint** trước khi dùng cho text nhỏ.
- **Focus visibility:** ring 2px, offset, không suppress (đã có); Grey surface dùng o-800 ring (đã fix 1.2C).
- **Non-color affordance:** link có underline/hairline; state không chỉ màu (§9/§12).
- **Zoom 200% / text resize / reflow 320px:** ch/rem/%/clamp; không fixed-height cắt nội dung; no horizontal overflow.
- **Target spacing:** nav/CTA ≥44px touch (gap/padding).
- **Line length:** body 68ch, description ≤46ch — dễ đọc.
- **Heading distinction:** h1≫h2≫h3 bằng scale+weight thật (không chỉ màu/spacing).
- **Reduced-motion** tôn trọng; **no hidden meaningful content**; **no focus suppression**.
- **Surface contrast risk:** Black/Grey/Orange — verify muted + focus-ring per surface ở contrast checkpoint trước khi S3/S5 render.

## 14. CSS implementation ownership

Map vào `@layer` hiện có (LOCKED OD-CSS-4, css-arch §3/§13.1). **Không** layer mới, **không** đổi order.

| Layer | Trách nhiệm visual 1.5B | KHÔNG chứa |
|---|---|---|
| `tokens` | (đã đủ) — chỉ thêm semantic alias nếu §B cho phép; **không** primitive/HEX mới | layout/component selector |
| `base` | element default typography (body/heading role qua `:where()`), link base **ink + underline** (sửa over-orange) | layout/màu-section |
| `layout` | (đã có, không đụng nhiều) | màu/type treatment |
| `surfaces` | **thêm rule paint** `[data-surface]{background/color}` (§6); giữ 4 block re-map | layout |
| `components` | treatment CTA (accent fill), pillar row hover, link states, footer muted | primitive trực tiếp |
| `states` | hover/active/focus semantics (focus-visible ở accessibility) | layout mới |
| `responsive` | type-scale clamp + affordance theo breakpoint | token mới |
| `accessibility` | (đã có: skip/focus/reduced-motion) — chỉ a11y | generic override |
| `utilities` | không cần (utilities-safe) | one-off fix |

**Pseudo-mapping minh hoạ (không phải code triển khai):**
```
@layer base { a { color: var(--color-text-primary); text-decoration: underline; text-underline-offset: … } }
@layer surfaces { :where([data-surface]) { background-color: var(--color-surface); color: var(--color-text-primary) } }
@layer components { .contact-actions a { background: var(--color-accent); color: var(--color-on-accent); border-radius: var(--radius-control); … } }
```
**Reuse custom property:** `--color-*` (semantic), `--text-*`, `--weight-*`, `--leading-*`, `--space-*`, `--radius-control`, `--container-*`, `--color-focus-ring`. **Semantic var có thể cần** (nếu §B cho phép): `--color-selected`/`--color-disabled` = **deferred** (chưa dùng). **Cấm:** inline style · CSS-in-JS · `!important` mới (trừ a11y đã có) · utility soup · local primitive redefinition · layer mới · magic value (dùng token; `ch` measure = readability OK).

## 15. Implementation boundary (1.5B)

**Allowed (1.5B):** visual styling cho source hiện tại (`page.tsx` nếu cần className hook nhỏ; chủ yếu `globals.css`) · CSS token mapping · typography role styling · section surface painting (`[data-surface]`) · border/divider hairline · CTA/link visual states · responsive visual (type clamp, affordance) · accessibility visual states. Sửa base link color (§5 correction).

**NOT allowed без Owner approval:** content mới · route mới · component system lớn · dependency mới · animation library · sound · imagery giả · **render S2/S3/S5 công khai** · global theme/ThemeToggle · redesign layout · sticky Header · hamburger logic · booking form · newsletter · fake social · icon system · WebGL/canvas · visual effect gây scope-creep.

**"Visual complete" (mục tiêu 1.5B):** rendered sections S0/S1/S4/S6/S7 có typography role rõ, surface đúng (White + CTA Orange), link/CTA states đủ, border/rhythm biên tập, responsive type/affordance, a11y visual — **đọc như một ấn phẩm biên tập**. **Chưa (deferred):** motion/interaction polish, imagery, S2/S3/S5 render, final cross-browser QA, evidence-frame treatment thật.

## 16. Anti-pattern gate (checklist cho 1.5B)

☐ SaaS hero · ☐ centered-everything · ☐ giant display thiếu kiểm soát · ☐ card explosion · ☐ bento · ☐ feature grid · ☐ equal pillar cards · ☐ dashboard tiles · ☐ app shell · ☐ nav pill · ☐ floating CTA · ☐ giant Orange section · ☐ alternating stripes · ☐ fake evidence · ☐ browser frame · ☐ metric theater · ☐ decorative media placeholder · ☐ gradient · ☐ glass · ☐ glow · ☐ neon · ☐ shadow-heavy card · ☐ rounded-everything · ☐ icon-per-pillar · ☐ fake logo/testimonial/social · ☐ ThemeToggle · ☐ global dark mode · ☐ visible Geist Mono · ☐ all-caps overuse · ☐ ultra-light low-contrast text · ☐ excessive letter-spacing · ☐ one-word/line mobile heading · ☐ hover-only affordance · ☐ focus suppression · ☐ animation before content readiness · ☐ typography overfit · ☐ arbitrary magic value · ☐ dependency addition · ☐ source scope creep. *(Detection heuristic đầy đủ: contract §15 + css-arch §17.)*

## 17. Validation plan (cho 1.5B)

**A. Static:** `pnpm lint` · `pnpm exec eslint src --max-warnings=0` · `pnpm typecheck` · `pnpm build` · `git diff --check` · scan forbidden (gradient/glass/glow/ThemeToggle/dark-mode/GeistMono/`"use client"`/inline-style/`!important`-mới/dependency) · CSS layer inspection (rule đúng layer, order không đổi) · token inspection (không HEX/primitive mới) · source scope (chỉ page.tsx/globals.css).

**B. Runtime structural:** section sequence S0→S1→S4→S6→S7 · S2/S3/S5 omit (no blank surface/empty landmark) · no duplicate DOM · no overflow · heading/landmark structure giữ.

**C. Visual review** tại 320/375/390/430/768/1024/1280/1440/1920: hierarchy · type wrapping · measure · surface · CTA · pillar scanning · footer de-escalation · visual competition (chỉ 1 Orange) · focus · zoom 200% · touch.

**Phân biệt evidence (bắt buộc ghi rõ):** *source evidence* (grep/read) ≠ *runtime structural evidence* (HTML/HTTP/build) ≠ *visual screenshot evidence* (pixel) ≠ *Owner subjective approval*. **Không** gọi source/HTML inspection là pixel-level Visual QA; nếu không có screenshot tooling → nêu rõ, dựa structural + build.

## 18. Test matrix

| Trục | Case | Cách test (không content giả) |
|---|---|---|
| Render state | S0/S1/S4/S6/S7 hiện tại | runtime thật |
| Forward S2/S3/S5 | on lần lượt + tổ hợp (2^3, layout-prep §22) | **synthetic local** flip biến, **revert trước commit**, không ship |
| Surface transition | White→Black (S2→S3), White→Grey (S4→S5) | synthetic |
| Responsive | 320–1920 (9 width) | resize/devtools |
| No-hover / touch | affordance luôn hiện | emulate touch |
| Keyboard | focus order = DOM, ring rõ | tab-through |
| Reduced-motion | transition tắt | emulate |
| Zoom / text-resize | 200%, no overflow | browser zoom |
| Long Vietnamese copy | h1/pillar wrap, không tràn/one-word | synthetic dài |
| Pillar label ngắn/dài | rows co giãn hợp lệ | synthetic |
| Missing optional asset | portrait/artifact omit → không frame rỗng | render thật (đang omit) |
| CTA label wrapping | không cắt giữa từ | synthetic dài |

**Bắt buộc:** không render content giả cho public output; synthetic chỉ local, revert, không fixture lâu dài, không đổi content status.

## 19. Risks

| # | Risk | Severity | Likelihood | Detection | Mitigation | Owner decision? |
|---|---|---|---|---|---|---|
| 1 | Generic AI visual drift | High | Med | anti-pattern gate §16, Replace-name test | thesis §2 hành vi cụ thể; token-driven | Không |
| 2 | SaaS drift (hero-split/feature-grid) | High | Med | §16, section expression §6 | editorial thesis; S4 rows | Không |
| 3 | Typography over-scaling (giant heading) | Med | Med | visual review 320/1920 | clamp trong §B.1 bound; guardrail one-word/line | Không |
| 4 | Orange overuse | High | Med | scan accent usage; §5 budget | link→ink correction; 1 CTA fill; marker optional | Không |
| 5 | Black surface leak khi S3 omit | Med | Low | runtime scan `data-surface` | paint rule + section trong conditional (đã có) | Không |
| 6 | Grey surface leak khi S5 omit | Med | Low | runtime scan | như trên | Không |
| 7 | Cardification S4 | High | Med | §16; hover không lift | rows + hairline; hover đổi title/underline | Không |
| 8 | Under-designed Footer | Low | Med | visual review | muted type + hairline de-escalation | Không |
| 9 | Over-designed CTA (giant island) | Med | Med | §6 S6 cấm | control fill + centered, không banner | Không |
| 10 | Mobile wrapping (one-word/line) | Med | Med | 320 review | clamp min + line-break art-direct | Không |
| 11 | Low contrast (muted on Grey/Black) | High | Med | contrast measure §13 | **đo trước khi dùng**; TBD → không dùng cho text nhỏ tới khi PASS | **Có** (contrast checkpoint) |
| 12 | Visual hierarchy competition (Hero vs CTA) | Med | Med | attention map §3 | Hero CTA subordinate; 1 Orange | Không |
| 13 | CSS ownership drift (layer/`!important`) | Med | Low | layer inspection §17 | ownership §14; specificity budget | Không |
| 14 | Token bypass (magic HEX/px) | Med | Low | scan §17 | semantic-only; ch measure OK | Không |
| 15 | Exact pixel khóa quá sớm | Med | Med | review deferred discipline | per-role px deferred → clamp §B.1 | Không |
| 16 | Future section insert → spacing regression | Med | Low | conditional-collapse §18/test | rhythm token; join logic (1.4A §22) | Không |
| 17 | Visual polish lấn content/interaction | Med | Med | boundary §15 | scope gate; motion/imagery deferred | Không |

## 20. Open decisions

| Mục | Phân loại |
|---|---|
| 4 primitive / semantic-per-surface / surface logic | **A. Governed (LOCKED)** — D46/D47/§B.8 |
| Typography scale §B.1 (desktop/mobile pair) | **A. Governed** — §B.1; per-role exact px & clamp = **B. implementation-level** (trong bound) |
| Radius R3 / signature ≤1@S3 | **A. Governed** — D49 |
| Link → ink + underline (sửa over-orange) | **B. Implementation-level** (căn cứ contract §6; inference ghi rõ §5) |
| Surface paint rule `[data-surface]` | **B. Implementation-level** (css-arch §7) |
| CTA = accent fill control | **B. Implementation-level** (contract §6/§14, token-mapping §14) |
| Header underline / divider trang trí | **B. Implementation-level** (whitespace-first; tối giản) |
| Easing curve · functional/danger HEX · selected/disabled slot | **C. Deferred** (không tự quyết; token-mapping §18) |
| Muted-on-Grey/Black + focus-ring contrast per surface | **D. Owner/contrast checkpoint** (đo trước khi S3/S5 render text nhỏ) |
| Sticky Header · hamburger · container query · imagery · S2/S3/S5 render · motion/sound | **C. Deferred / D. Owner** — không kích hoạt ở 1.5B |

**Không** mục nào đang **chặn** 1.5B (rendered S0/S1/S4/S6/S7 triển khai được). #11 (contrast Grey/Black) chỉ chặn **text nhỏ trên Black/Grey** — mà S3/S5 đang omit → non-blocking cho visual hiện tại.

## 21. Handoff to implementation (1.5B)

- **File dự kiến sửa:** `src/app/globals.css` (chính: base type/link, surfaces paint, components CTA/link/pillar states, responsive type clamp); `src/app/page.tsx` **chỉ** nếu cần className hook nhỏ (vd eyebrow/role) — ưu tiên không đụng.
- **Source hooks hiện có (tái dùng):** `.site-header .hero .eyebrow .hero-actions .pillar-map .pillars>li .contact-cta .contact-actions .site-footer .footer-* .work-* .featured-*` + `data-surface="black|grey"` + container classes.
- **Token reuse:** `--color-*` semantic · `--text-* --weight-* --leading-* --measure-prose` · `--space-*` · `--radius-control` · `--container-*` · `--color-focus-ring`. **Không** token/HEX/px mới.
- **Section order triển khai:** base type/link → surfaces paint → S0 header → S1 hero → S4 pillar rows → S6 CTA → S7 footer → responsive type → (forward CSS S2/S3/S5 tối thiểu, không render).
- **Validation order:** static (lint/eslint/typecheck/build/diff-check/scan) → runtime structural (order/omit/overflow) → visual review 9 widths → evidence phân loại rõ.
- **Stop conditions:** cần content/route/dependency/component-lớn/governance-change/render-S2-S3-S5 → dừng báo Owner; contrast Grey/Black text nhỏ chưa đo → không dùng.
- **Evidence báo cáo:** files changed + scope · lint/typecheck/build · targeted scan · runtime structural · visual review (ghi rõ loại evidence) · anti-pattern audit · diff.
- **TUYỆT ĐỐI KHÔNG triển khai:** content/route/dependency mới · animation/sound · imagery giả · render S2/S3/S5 công khai · global theme/ThemeToggle · sticky/hamburger · icon system · fake social/testimonial/metric · redesign layout · commit/push (đến review gate).
