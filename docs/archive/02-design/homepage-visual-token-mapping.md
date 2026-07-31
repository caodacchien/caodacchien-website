# Homepage Visual Token Implementation Mapping

## 1. Status and Scope

- **Planning specification** (Checkpoint 0.6A) — **không** CSS, **không** source code, **không** token file production, **không** framework.
- **Phạm vi:** chỉ Homepage MVP. Chưa áp dụng cho dashboard, CMS, admin.
- **Vai trò:** ánh xạ quyết định đã khóa → tên token + phân loại + source-of-truth + trạng thái (Locked/Derived/Deferred) + nơi dùng ở checkpoint CSS sau. **Không tạo quyết định thiết kế mới.**
- **Giá trị canonical:** `COMPONENT_INVENTORY.md §B` (số) + `DECISION_LOG` (D46–D55) + `homepage-visual-implementation-contract.md` (section-application). File này **không** phát minh value; khi cần con số, dẫn chiếu §B.
- **Chưa được phép triển khai:** CSS/Tailwind/React/Next.js/component/animation/screenshot; không chọn framework.

## 2. Governance and Source-of-Truth Matrix

Thứ tự thẩm quyền: Decision Log → Design Bible → Design System → Component Inventory → Visual Implementation Contract → **Visual Token Mapping (file này)** → Source. File này **không** override tầng trên.

| Token domain | Source of truth | Document ref | Decision | Owner | Status | Conflict policy |
|---|---|---|---|---|---|---|
| Color primitives | Component Inventory | §B.8 | D47 | Design System | **Locked** | Decision Log thắng |
| Orange scale (derived) | Component Inventory | §B.8 | D47 | Design System | **Derived (locked)** | không thêm bậc |
| Semantic per surface | Component Inventory | §B.8 | D46/D47 | Design System | **Locked** | — |
| Functional (success/warning) | — | — | — | Owner | **Deferred** | không dùng cam làm danger |
| Danger | — | — | D47 (Pending) | Owner | **Deferred (Pending)** | không HEX |
| Typography scale | Component Inventory | §B.1 | D43/D48 | Design System | **Locked (values) / Deferred (per-role pixel)** | Contract §7 |
| Spacing | Component Inventory | §B.2 | D32 | Design System | **Locked** | — |
| Container/breakpoint | Component Inventory | §B.3/§B.9 | D36/D44 | Design System | **Locked** | — |
| Radius | Component Inventory | §B.4 | D49 (R3) | Design System | **Locked** | — |
| Elevation/border | Component Inventory | §B.5/§B.7 | D32 | Design System | **Locked** | — |
| Motion duration | Component Inventory | §B.6 | D32/P9 | Design System | **Locked (duration) / Deferred (easing)** | trần 200ms |
| Component aliases | Component Inventory | Phần A | D33/D46 | Design System | **Derived** | truy ngược semantic |
| State | Component Inventory | §B.6/§B.7 | D34 | Design System | **Locked (arch) / Deferred (functional HEX)** | không màu-only |

**Không parallel source of truth:** con số sống ở Component Inventory; file này chỉ *đặt tên + phân loại + chỉ nơi dùng*.

## 3. Token Naming Convention

Framework-agnostic, 6 tầng phân biệt. Semantic token đã có ở `§B.8` giữ nguyên tên; file này chuẩn hóa naming cho các tầng còn lại.

| Tầng | Cú pháp đề xuất | Ví dụ |
|---|---|---|
| **Primitive** | `color.<name>.<step>` | `color.orange.500`, `color.white`, `color.black`, `color.grey` |
| **Semantic** (surface-scoped) | `--color-<slot>` (tên đã có §B.8) | `--color-surface`, `--color-text-primary`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-text`, `--color-on-accent`, `--color-focus-ring` |
| **Component** | `--<component>-<slot>` | `--button-bg`, `--card-border`, `--metric-fg` |
| **State** | selector/attr, không token riêng cho màu | `:hover`, `:focus-visible`, `[data-state="disabled"]` |
| **Responsive** | `--container-<name>`, `--bp-<name>` | `--container-content`, `--bp-lg` |
| **Motion** | `--duration-<speed>`, `--easing-<name>` | `--duration-fast`, `--easing-standard` |

**Nguyên tắc mấu chốt (section-based, D46):** semantic token **surface-agnostic về tên**; **surface context** (`data-surface="white|grey|black|orange"` hoặc scope section) **gán giá trị cụ thể** cho cùng một tên. Component **chỉ** tham chiếu semantic name → không màu riêng, không parallel source. **Không** đặt tên token gắn cứng một section nếu bản chất tái sử dụng được.

## 4. Color Primitive Mapping

| Token | HEX | Role | Allowed use | Forbidden use | Contrast note | Source | Decision | Status |
|---|---|---|---|---|---|---|---|---|
| `color.white` | `#FBFBFB` | Pure White | surface nền chính, long-form | — | fg đen 19.6:1 | §B.8 | D47 | Locked |
| `color.black` | `#040404` | Deep Black | text; surface evidence peak (S3), footer | — | trên cam 5.84:1 | §B.8 | D47 | Locked |
| `color.grey` | `#DEDEDE` | Neutral Grey | supporting/transition (S5) | **long-form chính** | — | §B.8 | D46/D47 | Locked |
| `color.orange.500` | `#FF4000` | Kinetic Orange | CTA/focal/marker/focus | **body/link nhỏ trên White/Grey (FAIL AA)**, **danger** | 3.39:1 trên White = FAIL | §B.8 | D47 | Locked |

**Không thêm brand primitive mới.** Functional (success/warning/danger): **separate functional domain**, không thuộc brand palette; **danger HEX chưa khóa** (D47 Pending); **không** dùng Kinetic Orange làm danger.

## 5. Derived Color Scale

Chỉ giữ các bậc thật sự cần (không sinh scale hàng loạt).

| Token | HEX | Lý do sử dụng cụ thể | Status |
|---|---|---|---|
| `color.orange.100` | `#FFE0D4` | selection tint / subtle bg | Derived (locked, §B.8) |
| `color.orange.300` | `#FF8A63` | (dự phòng hover trên nền tối) — chỉ dùng khi cần | Derived |
| `color.orange.400` | `#FF6A3C` | hover của accent-fill | Derived |
| `color.orange.500` | `#FF4000` | base fill; accent-text trên Black | Locked |
| `color.orange.600` | `#E03600` | active/pressed của CTA | Derived |
| `color.orange.700` | `#C42F00` | **accent-text trên White** (AA 5.41:1) | Derived (locked) |
| `color.orange.800` | `#A62800` | **accent-text trên Grey** (AA 5.34:1) | Derived (locked) |
| neutral: `#3A3A3A` | secondary fg (White/Grey); border-strong (Black) | — | Derived |
| neutral: `#6E6E6E` / `#555555` / `#8A8A8A` | muted (White / Grey / Black) | — | Derived |
| neutral: `#B0B0B0` | border-strong (White) / secondary (Black) | — | Derived |

Phục vụ: fg · muted · border · hover · active · focus · selected · accent-text-contrast-safe. **Không** thêm tint/shade "cho đủ bộ".

## 6. Semantic Surface Mapping

Section-based (D46). Cùng tên semantic, giá trị đổi theo surface context. Giá trị canonical `§B.8`.

| Slot / surface | White `#FBFBFB` | Grey `#DEDEDE` | Black `#040404` | Orange `#FF4000` |
|---|---|---|---|---|
| `--color-surface` | `#FBFBFB` | `#DEDEDE` | `#040404` | `#FF4000` |
| `--color-text-primary` | `#040404` | `#040404` | `#FBFBFB` | `#040404` |
| `--color-text-secondary` | `#3A3A3A` | `#3A3A3A` | `#B0B0B0` | `#1A0A05` |
| `--color-text-muted` | `#6E6E6E` | `#555555` | `#8A8A8A` | `#2A1206` |
| `--color-border` | `#DEDEDE` | `#B0B0B0` | `#3A3A3A` | `#040404` |
| `--color-border-strong` | `#B0B0B0` | `#8A8A8A` | `#555555` | `#040404` |
| `--color-divider` | = border | = border | = border | = border |
| `--color-accent` (fill) | `#FF4000` | `#FF4000` | `#FF4000` | — (nền là cam) |
| `--color-accent-text` (link/marker) | `#C42F00` (o-700) | `#A62800` (o-800) | `#FF4000` (o-500) | `#040404` |
| `--color-on-accent` | `#040404` | `#040404` | `#040404` | `#FBFBFB` |
| `--color-icon` | = text role | = text role | = text role | = text role |
| `--color-focus-ring` | `#FF4000` | `#FF4000` | `#FF4000` | `#040404` |
| `--color-selected` | o-100 `#FFE0D4` (documented) | *proposed alias, Deferred* | *proposed alias, Deferred* | — |
| `--color-disabled` | muted + surface sunken *(sunken chưa canonical, Deferred)* | như trên | như trên | muted |

> **Ghi chú (honesty):** `§B.8` **chưa** định nghĩa slot `selected`/`disabled` per-surface. White selected dùng o-100 (đã documented); Grey/Black selected và mọi `disabled` value là **Proposed implementation alias — Deferred** (xem §18), **chưa** phải giá trị khóa. Không dùng như canonical cho tới khi Component Inventory bổ sung.

**Ràng buộc:** White = nền long-form chính; Grey chỉ supporting/transition (S5); Black chỉ **một** evidence peak (S3); Orange **không** làm body/link nhỏ trên White/Grey nếu không đạt AA; **không** global light/dark.

## 7. Typography Token Mapping

Geist Sans **duy nhất** visible UI (D48). Không Geist Mono/monospace/slashed-zero; metric `tabular-nums`. Scale canonical `§B.1`. **Value per-role = Deferred implementation detail** (Contract §7) — bắt buộc trong hierarchy/weight/lh/measure/VN đã khóa.

| Role | Family | Weight | Size strategy (ref §B.1) | Line-height | Measure | Letter-spacing | Casing | VN | Status |
|---|---|---|---|---|---|---|---|---|---|
| display statement (Hero h1) | Sans | 600 | h1 45/34 clamp | 1.15 | ≤17ch | ≤−0.01em (kiểm Ế/Ữ) | sentence | dấu cần thở | Locked role / Deferred px |
| page title | Sans | 600 | h1/h2 | 1.15 | — | ≤−0.01em | sentence | — | Locked/Deferred |
| section title (h2) | Sans | 600 | h2 36/28 | 1.15 | — | 0 | sentence | — | Locked/Deferred |
| project title (h3) | Sans | 600 | h3 28/24 | 1.2 | — | 0 | sentence | — | Locked/Deferred |
| article title (h3) | Sans | 600 | lg/h3 | 1.2 | — | 0 | sentence | — | Locked/Deferred |
| body long-form | Sans | 400 | body 19/17 | 1.7 | 68ch | 0 | sentence | lh rộng cho dấu | Locked |
| body compact | Sans | 400 | sm 16 | 1.55 | — | 0 | sentence | — | Locked/Deferred |
| lead | Sans | 400–500 | lg 22/19 | 1.45 | ≤60ch | 0 | sentence | — | Locked/Deferred |
| navigation | Sans | 500 | sm 16 | 1.5 | — | 0 | sentence | — | Locked |
| button | Sans | 600 | sm 16 | 1.2 | — | 0 | sentence | — | Locked |
| label / eyebrow | Sans | 450–500 | xs 14 | 1.5 | — | 0–0.02em | **sentence, không uppercase dài** | — | Locked |
| metadata | Sans | 450–500 | xs/sm 14–16 | 1.5 | — | 0–0.02em | sentence | **tabular-nums** | Locked |
| metric | Sans | 600–700 | h3/h2 | 1.1 | — | 0 | — | **tabular-nums**, không italic/slashed | Locked/Deferred |
| caption | Sans | 450 | xs 14 | 1.5 | — | 0 | sentence | — | Locked/Deferred |
| helper text | Sans | 400–450 | xs 14 | 1.5 | — | 0 | sentence | — | Locked/Deferred |

**Không mặc định weight 700 cho mọi heading** (ưu tiên 600). Hero mobile line-break art-direct riêng. Không hardcode toàn bộ pixel scale (deferred).

## 8. Spacing and Whitespace Mapping

Base 4px (`§B.2`): `space-1..10` = 4/8/12/16/24/32/48/64/96/128.

| Token/nhóm | Giá trị | Vai trò |
|---|---|---|
| `space.base` | 4px | đơn vị gốc |
| Compact rhythm | `space-5..6` (24–32) | trong khối; title↔body |
| Standard rhythm | `space-7..8` (48–64) | giữa khối cùng nhóm; text↔evidence |
| Major rhythm | `space-9..10` (96–128) | ranh giới khối đổi mục đích |
| section padding | lề `space-5` mobile / `space-7` desktop | — |
| content gap (gutter) | `space-5` (24) | grid |
| editorial measure | 68ch | body long-form |
| visual silence | Major/`space-9..10` cạnh weight | nhấn (Hero/CTA) |
| cognitive rest | whitespace cao ở S4 | điểm nghỉ |

**Chống:** equal-spacing toàn trang · mọi section cùng padding · card-grid spacing máy móc · whitespace "làm sang" không phục vụ narrative. **Spacing phụ thuộc:** section function · reading momentum · evidence density · tension/release · breakpoint. Mật độ: thưa S1/S4/S6; chặt S3.

## 9. Radius and Shape Mapping

Contract R3 (`§B.4`, D49) — không value mới.

| Token | Giá trị | Allowed archetype | Max frequency | Mobile | Source | Decision |
|---|---|---|---|---|---|---|
| `radius.control` | 8–10px | button, input | mọi control | như desktop | §B.4 | D49 |
| `radius.card` | 12–16px | ContentCard | mọi card | như desktop | §B.4 | D49 |
| `radius.panel` | 20–28px | khối lớn nếu cần | hiếm | như desktop | §B.4 | D49 |
| `radius.signature` | 36–48px | **evidence frame S3** | **≤1 object/trang** | giữ (không bo section) | §B.4 | D49 |
| `radius.pill` | 999px | tag/chip có ngữ nghĩa | chỉ khi filter thật | như desktop | §B.4 | D49 |

**Bắt buộc:** full-width section **không** bo · không nested rounded card · không bo mọi section · pill chỉ control/tag có lý do · CTA **không** mặc định capsule · **signature ≤1, chỉ evidence frame S3** (optional).

## 10. Border, Divider and Elevation Mapping

`§B.5`/`§B.7`. Không heavy shadow/glass/glow; không dùng shadow thay hierarchy.

| Token | Giá trị/nguồn | Dùng |
|---|---|---|
| `border.default` | 1px, `--color-border` | phân tầng nhẹ, khung card |
| `border.subtle` | 1px, muted của border | divider mảnh |
| `border.strong` | 1px, `--color-border-strong` | nhấn |
| `divider.editorial` | 1px, `--color-border` | ranh giới section/list |
| `outline.focus` | **2px** (`border-width-thick`), `--color-focus-ring` `#FF4000` | focus-visible |
| `outline.selected` | 2px + `--color-selected` bg | selected |
| `frame.evidence` | 1px border + radius signature (S3) | case artifact |
| elevation | 2 mức (`§B.5`): light = viền; trên Black = độ sáng bề mặt | không shadow |

Ưu tiên phân tầng: border → surface contrast → overlap có chủ đích → spatial hierarchy.

## 11. Interactive State Mapping

Trạng thái **không** phân biệt chỉ bằng màu; luôn kèm border/scale/icon/text.

| State | Color | Border | Text/Icon | Cursor | Motion | A11y |
|---|---|---|---|---|---|---|
| default | semantic surface | `border.default` | text role | auto | — | — |
| hover | fill brightness↓ (o-600 với CTA) | strong | không đổi | pointer | 120–160ms | không layout shift |
| active | o-600/pressed | strong | — | pointer | 120ms | — |
| focus-visible | — | **outline.focus 2px #FF4000** | — | — | 120ms | ring rõ hơn hover |
| selected | `--color-selected` | outline.selected | + check/marker | — | — | không màu-only |
| disabled | surface sunken + muted | subtle | muted + `aria-disabled` | not-allowed | — | không chỉ mờ màu |
| loading | — | — | spinner/skeleton + `aria-busy` | progress | ≤200ms | không giả success |
| success | **functional (Deferred HEX)** + icon ✓ + text | — | icon+text | — | — | hue riêng + icon + text |
| warning | **functional (Deferred HEX)** + icon + text | — | icon+text | — | — | hue riêng |
| danger/error | **Pending HEX (D47)** + icon + text | — | icon+text | — | — | **không dùng cam**; hue riêng + icon + text |

## 12. Motion Token Mapping

`§B.6`/Bible 09. Trần 200ms.

| Token | Giá trị/nguồn | Dùng | Status |
|---|---|---|---|
| `duration.instant` | ~80–100ms | micro feedback | Derived |
| `duration.fast` | 120ms (`--duration-fast`) | hover | Locked |
| `duration.standard` | 160ms (`--duration-base`) | state transition | Locked |
| `duration.slow` | 200ms (`--duration-slow`, **trần**) | reveal có chủ đích (không scroll) | Locked |
| `easing.standard` | (chưa khóa curve) | chung | **Deferred** |
| `easing.emphasized` | (chưa khóa) | nhấn nhẹ | **Deferred** |
| hover/focus/state transition | opacity/transform/bg only | feedback | Locked |

**Cấm:** scroll reveal · parallax · animation trang trí · signature motion vay mượn reference · cursor follower · magnetic button. Tôn trọng `prefers-reduced-motion`. **Audio: out-of-scope MVP** (D36 Future) — không token, không playback.

## 13. Container and Responsive Token Mapping

`§B.3`/`§B.9`.

| Token | Giá trị | Dùng | Section |
|---|---|---|---|
| `--container-prose` | ~68ch | cột đọc | S2 |
| `--container-content` | ~1080px | section chuẩn | S0/S4/S6/S7 |
| `--container-wide` | ~1280px | evidence thở | S3/S5 |
| `--container-full` | 100% | **chỉ surface/background** | nền S3/S5 |
| rail / gutter | 24px (`space-5`) | grid 12-col | — |
| section inset | `space-5` mobile / `space-7` desktop | lề | — |
| `--bp-md` / `--bp-lg` / `--bp-xl` | 768 / 1024 / 1280 | tablet/desktop/wide | — |
| `--bp-sm` / `--bp-2xl` | 640 / 1536 (phụ) | large-mobile/ultrawide | — |

**Responsive:** desktop / narrow desktop / tablet / mobile 390 / small — **mobile là composition riêng**, không scale xuống. **Full-width = surface**; nội dung trong `wide`. Không horizontal overflow; không ép mọi section vào một container.

## 14. Component Token Dependency Matrix

18 component (D33/D46); Homepage subset. Component **chỉ** tham chiếu semantic; không màu riêng. Hero/CTA = composition (không component).

| Component | Semantic tokens | Component aliases | States | Responsive | Radius | Type role | Evidence | Orange? | Section |
|---|---|---|---|---|---|---|---|---|---|
| `Header` | surface, text-primary, border, accent-text | `--nav-link`, `--nav-active` | default/hover/focus | → hamburger ≤768 | control | nav | — | không | S0 |
| `Footer` | surface, text-muted, border, accent-text | `--footer-link` | default/hover/focus | collapse cột | — | metadata/nav | — | không | S7 |
| `Container` | — | `--container-*` | — | mọi bp | — | — | — | — | mọi |
| `ContentCard` (article) | surface, text-primary, muted, border | `--card-border`, `--card-bg` | default/hover/focus | stacked | card | article title/meta | tùy chọn | không | S2 |
| `ContentCard` (caseStudy) | surface(Black), text-primary, muted, border | `--card-border` | default/hover/focus | artifact-trên-copy | card + frame.evidence(signature) | project title | required | marker o-500 | S3 |
| `ArticleMeta` | text-muted | — | — | wrap | metadata (tabular) | — | — | không | S2 |
| `Label` | text-secondary, border-strong | `--label-border` | default | — | pill (chỉ filter thật) | label | — | không | S2/S4 |
| `MetricGroup` | text-primary(Black), accent-text | `--metric-fg` | default | stack | — | metric (tabular) | required | marker | S3 |
| `PillarMap` | text-primary, accent-text, border | `--pillar-link` | default/hover/focus | dọc | — | section/label | — | không | S4 |
| `WorkWithMeBlock` | surface(Grey), text-primary, muted | `--wwm-cta` | default/hover/focus | stacked | control(button) | editorial/body | — | không (link) | S5 |
| `StatusMessage` | text-muted, functional(deferred) | `--status-*` | success/warning/danger | — | control | body | — | không (danger hue riêng) | S2/S3 empty-state |
| Hero *(composition)* | surface, text-primary, accent, focus-ring | `--hero-cta` | — | line-break riêng | control(button) | display statement | portrait slot | **1 CTA + 1 marker** | S1 |
| CTA *(composition)* | accent, on-accent, focus-ring | `--cta-*` | default/hover/active/focus | full-width mobile | control | button | — | **1 CTA chính** | S6 |

`ContactForm` không ở Home (thuộc `/contact`). `Breadcrumb`/`Prose`/`ContentHeader`/`TOC`/`Callout`/`FrameworkBlock`/`AuthorBio` — không dùng ở Home. **Không component mới.**

## 15. Section-by-Section Token Application

| S | Surface | fg | Type roles | Spacing rhythm | Radius allowance | Accent budget | Border/divider | Motion | Evidence | Anchor (P/S) |
|---|---|---|---|---|---|---|---|---|---|---|
| S0 | White | primary | nav/wordmark | Compact | control | 0 (link hairline) | border.default | orientation | — | wordmark / nav |
| S1 | White | primary | display/eyebrow/body | Major | control | **1 CTA + 1 marker** | subtle | focus CTA | portrait slot | statement / CTA |
| S2 | White | primary | article/meta/label | Standard | card | 0 | divider.editorial | hover link | bài (T1) | article title / trụ |
| S3 | **Black** | primary(#FBFBFB) | project/metric/body | Major, whitespace thấp | card + **signature(≤1)** | 1 marker (o-500) | border(Black) | feedback | case+artifact+metric | artifact / project title |
| S4 | White | primary | section/label | Standard, whitespace cao | — | 0 | divider | hover trụ | taxonomy | AI-cho-Marketing / 5 trụ |
| S5 | **Grey** | primary | editorial/body | Standard | control | 0 (link) | border(Grey) | focus CTA | servicesOffered | headline / phù-hợp |
| S6 | White | primary | button/body | Compact, silence cao | control | **1 CTA chính** | — | focus/active | — | CTA / link |
| S7 | White | muted | metadata/nav | Compact | — | 0 | border.default | orientation | — | wordmark / nav |

**Ràng buộc:** S3 = Deep Black evidence peak **duy nhất**; S5 = Grey supporting; Orange = 1 CTA (S6) + 1 marker (S1); Hero = memorable moment duy nhất; không hai peak liền kề; không section thành component showcase.

## 16. Accessibility and Contrast Matrix

Tỉ lệ documented ở D47/`§B.8`. **Không tuyên bố PASS khi thiếu dữ liệu** — đánh dấu `TBD` chỗ chưa đo.

| Cặp | Ratio | AA | Ghi chú |
|---|---|---|---|
| `#040404` trên White | 19.6:1 | **PASS** | body/heading |
| muted `#6E6E6E` trên White | ~4.8:1 (cần đo lại) | PASS (verify) | chỉ metadata; **kiểm 0.4B non-blocking** |
| `#040404` trên Grey | ~15:1 (cần đo) | PASS (verify) | — |
| muted `#555555` trên Grey | TBD | **TBD** | đo ở checkpoint sau |
| `#FBFBFB` trên Black | ~19:1 (cần đo) | PASS (verify) | — |
| muted `#8A8A8A` trên Black | TBD | **TBD** | không làm nhạt hơn specimen (D43 note) |
| Orange `#FF4000` trên Black | 5.84:1 | **PASS** | accent-text/marker |
| Black `#040404` trên Orange | 5.84:1 | **PASS** | text trên cam |
| accent-text o-700 trên White | 5.41:1 | **PASS** | link |
| accent-text o-800 trên Grey | 5.34:1 | **PASS** | link |
| Orange `#FF4000` trên White | 3.39:1 | **FAIL** (body) | **forbidden** cho body/link nhỏ |
| Orange `#FF4000` trên Grey | 2.61:1 | **FAIL** | **forbidden** |
| focus ring `#FF4000` | — | non-text 3:1 (cần đo trên từng surface) | **TBD** trên Orange surface |
| disabled (muted+sunken) | TBD | **TBD** | không màu-only |

**Forbidden combinations:** cam làm body/link nhỏ trên White/Grey; cam làm danger. **Cần đo bổ sung** (checkpoint contrast): muted trên Grey/Black, focus ring trên mỗi surface, disabled.

## 17. Implementation Translation Map

Cách mapping chuyển sang CSS ở checkpoint sau — **không** viết CSS, **không** chọn framework.

| Loại | Cách dự kiến (mô tả) |
|---|---|
| root primitive candidates | `:root` custom properties cho `color.*`, `space.*`, `radius.*`, `duration.*`, `--container-*`, `--bp-*` |
| semantic aliases | custom properties `--color-*` re-resolve theo `[data-surface]` scope (section-based) |
| component aliases | `--<component>-*` trỏ semantic; không HEX trực tiếp |
| responsive custom properties | container/measure qua `clamp()`; breakpoint qua media-query (giá trị §B.9) |
| state attributes | `:hover`/`:focus-visible`/`[data-state]`/`[aria-disabled]` |
| data-surface usage | `data-surface="white|grey|black|orange"` trên section → gán semantic values |
| reduced-motion | `@media (prefers-reduced-motion: reduce)` tắt transition không thiết yếu |

**Không** chọn Tailwind/CSS Modules/styled-components ở checkpoint này.

## 18. Deferred Decisions

| Mục | Vì sao deferred | Checkpoint giải quyết | Thẩm quyền | Blocker? |
|---|---|---|---|---|
| Danger HEX | D47 Pending — Phase Color System | Phase màu functional | Owner | Non-blocker (danger = icon+text) |
| Success/Warning HEX | ngoài phạm vi D47 | Phase màu functional | Owner | Non-blocker |
| Pillar colors (1..5) | chưa khóa; MVP phân biệt bằng nhãn | Phase sau | Owner | Non-blocker |
| Typography per-role pixel | Contract §7 Deferred implementation detail | 0.6B/token phase | Design System | Non-blocker |
| Easing curves | §B.6 chưa khóa curve | 0.6B | Design System | Non-blocker |
| Focus-ring trên Orange surface | contrast chưa đo | contrast checkpoint | Design System | Non-blocker (dùng đen trên cam) |
| Implementation syntax/framework | ngoài phạm vi 0.6A | 0.6B CSS Architecture | Design System | Non-blocker |
| Instant duration value | chưa canonical | 0.6B | Design System | Non-blocker |
| `selected`/`disabled` slot per-surface | §B.8 chưa có slot (Grey/Black selected, sunken) | token phase (amend §B.8) | Design System | Non-blocker |

## 19. Conflict and Risk Register

| # | Rủi ro | Kiểm | Trạng thái | Phòng ngừa |
|---|---|---|---|---|
| 1 | token trùng tên khác nghĩa | — | Không phát hiện | naming §3 |
| 2 | primitive dùng như semantic | component chỉ ref semantic | OK | §3/§14 |
| 3 | Orange lạm dụng | budget 1 CTA + 1 marker | OK | §6/§15 |
| 4 | Grey thành nền long-form | Grey chỉ S5 | OK | §6 (D46) |
| 5 | radius thành phong cách chung | signature ≤1@S3 | OK | §9 (D49) |
| 6 | quá nhiều type role | 16 role có mục đích riêng | OK | §7 |
| 7 | equal-spacing | rhythm ngữ nghĩa | OK | §8 |
| 8 | hardcoded values | value ở §B, deferred đúng chỗ | OK | §2 |
| 9 | parallel token source | số chỉ ở Component Inventory | OK | §2 |
| 10 | component tự tạo màu | component alias → semantic | OK | §14 |
| 11 | responsive chỉ desktop | 5 breakpoint | OK | §13 |
| 12 | state chỉ khác màu | state kèm border/icon/text | OK | §11 |
| 13 | framework làm sai governance | chưa chọn framework | OK | §17 |

**Không conflict cứng.** Không tự chọn bên; các mục Deferred (§18) chờ checkpoint/Owner.

## 20. Readiness for CSS Architecture Specification

| Trục | Điểm |
|---|---|
| Governance completeness | 10/10 |
| Token completeness | 8/10 (functional/easing deferred) |
| Semantic clarity | 9/10 (section-based re-resolve rõ) |
| Contrast readiness | 6/10 (muted/focus/disabled TBD) |
| Responsive readiness | 8/10 |
| Component dependency readiness | 9/10 |
| Unresolved blockers | 0 blocker (chỉ deferred non-blocker) |

**Kết luận: READY WITH DEFERRED DETAILS** — đủ để đặc tả CSS Architecture (0.6B); các mục deferred (danger/functional HEX, easing, per-role pixel, một số contrast) là non-blocker, giải ở checkpoint sau.
