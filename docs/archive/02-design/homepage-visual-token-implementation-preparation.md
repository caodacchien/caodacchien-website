# Homepage Visual Token Implementation Preparation (1.2A)

> **Preparation only.** KHÔNG CSS/component/homepage/utility-class/Tailwind. KHÔNG value/token mới. Chỉ **kế hoạch triển khai** để 1.2B code trực tiếp.
>
> **Source of truth:** giá trị số ở `COMPONENT_INVENTORY.md §B` + `homepage-visual-token-mapping.md`; kiến trúc CSS ở `homepage-css-architecture-spec.md`; art-direction ở `homepage-visual-implementation-contract.md`. File này **dẫn chiếu**, không phát minh. D46–D57, D50 hierarchy áp dụng.

---

## 1. Audit `src/app/globals.css` hiện tại (Foundation baseline)

Hiện có (95 dòng, Milestone 1.1): `@layer` order khóa · `@layer reset` · `@layer tokens` (chỉ `--font-sans`) · `@layer base` (body font/line-height + bg `#FBFBFB`/fg `#040404` hardcode) · `@layer accessibility` (skip-link, focus-visible `#FF4000` hardcode, reduced-motion).

| Phần | Xử lý ở 1.2B | Lý do |
|---|---|---|
| `@layer` declaration (order) | **GIỮ NGUYÊN** | khóa OD-CSS-4, khớp spec §3 |
| `@layer reset` (box-sizing, margin, media, inherit-font, min-height) | **GIỮ** | baseline đúng |
| `@layer tokens` — `--font-sans` | **GIỮ + BỔ SUNG** | thêm primitive + semantic (mục 2) |
| `@layer base` — body `background-color:#FBFBFB`, `color:#040404` | **THAY** | → `var(--color-surface)` / `var(--color-text-primary)` (White surface mặc định) |
| `@layer base` — font-family, line-height | **GIỮ** | dùng `--font-sans` |
| `@layer accessibility` — focus-visible `outline:#FF4000` | **THAY** | → `var(--color-focus-ring)` |
| skip-link, reduced-motion | **GIỮ** | baseline đúng |
| **CHƯA CÓ** → **BỔ SUNG** | primitive palette · orange scale · semantic per-surface (`@layer surfaces` + `[data-surface]`) · spacing/radius/motion/container/typography-role tokens | thuộc 1.2B |

Nguyên tắc: base **không** hardcode HEX — thay bằng semantic token (White là surface mặc định ở `:root`).

## 2. CSS Custom Property structure (8 nhóm)

| Nhóm | Layer | Vai trò | Nguồn value |
|---|---|---|---|
| **Primitive** | `tokens` (`:root`) | `--color-*` (white/black/grey/orange-N), `--space-N`, `--radius-*`, `--duration-*`, `--container-*`, `--bp-*`, `--font-*` | §B.1–B.9 / token-mapping §4–5 |
| **Semantic** | `tokens`/`surfaces` | `--color-surface`, `--color-text-primary/secondary/muted`, `--color-border/border-strong`, `--color-accent`, `--color-accent-text`, `--color-on-accent`, `--color-focus-ring` — re-resolve per surface | §B.8 / token-mapping §6 |
| **Typography** | `tokens` | `--font-sans`, `--measure-prose`; role qua scale token (§B.1) | §B.1 |
| **Spacing** | `tokens` | `--space-1..10` + rhythm alias (`--space-major/standard/compact`) | §B.2 |
| **Radius** | `tokens` | `--radius-control/card/panel/signature/pill` | §B.4/D49 |
| **Motion** | `tokens` | `--duration-fast/base/slow` (+ easing = **Deferred**) | §B.6 |
| **Surface** | `surfaces` | `[data-surface]` gán lại semantic | §B.8 |
| **Component alias** | `components` | `--<component>-<slot>` trỏ semantic (không HEX) | token-mapping §14 |

**Quy tắc tầng:** component **chỉ** dùng semantic/alias; primitive **không** dùng trực tiếp tràn lan; semantic re-resolve qua surface scope. **Không** parallel token, **không** token cho selector 1 lần.

## 3. Naming convention (framework-agnostic, khớp token-mapping §3)

| Loại | Cú pháp | Ví dụ (giá trị ở §B) |
|---|---|---|
| Primitive color | `--color-<name>[-<step>]` | `--color-white` `#FBFBFB` · `--color-black` `#040404` · `--color-grey` `#DEDEDE` · `--color-orange-500` `#FF4000` · `--color-orange-700` `#C42F00` |
| Semantic color | `--color-<slot>` (§B.8, giữ tên) | `--color-surface`, `--color-text-primary`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-text`, `--color-on-accent`, `--color-focus-ring` |
| Spacing | `--space-<n>` / rhythm alias | `--space-5` (24px) · `--space-major` |
| Radius | `--radius-<archetype>` | `--radius-card` (12–16) · `--radius-signature` (36–48) |
| Motion | `--duration-<speed>` | `--duration-slow` (200ms) |
| Font | `--font-<role>` / measure | `--font-sans` · `--measure-prose` (68ch) |
| Container | `--container-<name>` | `--container-content` (~1080) · `--container-wide` (~1280) |
| Breakpoint | `--bp-<name>` | `--bp-lg` (1024) |
| Component alias | `--<component>-<slot>` | `--button-bg`, `--card-border` |
| Data attr | `data-surface` / `data-state` | `data-surface="black"` |

**Cấm:** tên theo màu-bề-mặt/vị-trí/mockup · utility-class kiểu `mt-6`/`bg-black` · token gắn cứng một section nếu tái sử dụng được.

## 4. `data-surface` strategy (§B.8 / contract §6)

`[data-surface]` trên **surface root của section** → re-resolve semantic token (layer `surfaces`). Component đọc semantic, **không** đọc tên màu.

| `data-surface` | Áp dụng | fg | secondary | muted | border | accent-text | ghi chú |
|---|---|---|---|---|---|---|---|
| `white` (mặc định `:root`) | S0/S1/S2/S4/S6/S7 | `#040404` | `#3A3A3A` | `#6E6E6E` | `#DEDEDE` | `o-700 #C42F00` | nền đọc chính |
| `grey` | S5 | `#040404` | `#3A3A3A` | `#555555` | `#B0B0B0` | `o-800 #A62800` | supporting/transition |
| `black` | S3 | `#FBFBFB` | `#B0B0B0` | `#8A8A8A` | `#3A3A3A` | `o-500 #FF4000` | evidence peak (duy nhất) |
| `orange` | focal control (không mode nền lặp) | `#040404` | `#1A0A05` | `#2A1206` | `#040404` | `#040404` | on-accent `#FBFBFB` |

`--color-accent` = `#FF4000` (mọi surface); `--color-focus-ring` = `#FF4000` (Orange surface → `#040404`); `--color-selected`/`--color-disabled` = **Deferred slot** (chưa canonical). **Một surface root/section**; nested component không tạo surface mới; không selector suy surface từ ancestor xa.

## 5. Mapping: Section → Surface → Semantic → Primitive

| Section | `data-surface` | Semantic chính dùng | Primitive nền |
|---|---|---|---|
| S0 Header | white | text-primary, border, accent-text | white/black/grey/o-700 |
| S1 Hero | white | text-primary, accent (CTA), focus-ring, accent-text (marker) | white/black/orange-500/o-700 |
| S2 Writing | white | text-primary, muted, border | white/black/#6E6E6E/#DEDEDE |
| S3 Case | **black** | text-primary(#FBFBFB), muted(#8A8A8A), border(#3A3A3A), accent-text(o-500) | black/white/orange-500 |
| S4 Pillar | white | text-primary, accent-text, border | white/black/o-700 |
| S5 Work | **grey** | text-primary, muted(#555555), border(#B0B0B0) | grey/black |
| S6 CTA | white | accent(fill), on-accent, focus-ring | white/orange-500/black |
| S7 Footer | white | text-muted, border, accent-text | white/#6E6E6E/#DEDEDE |

Luồng: **section** gắn `data-surface` → **surface layer** gán **semantic** → semantic trỏ **primitive**. Component chỉ chạm semantic/alias.

## 6. CSS Architecture review

- ✅ **Không utility-first / không Tailwind style:** semantic-over-utility (spec §2); style bám vai trò, không rải utility trong markup.
- ✅ **Không duplicated token:** primitive khai báo 1 lần ở `:root`; semantic 1 bộ tên, đổi value theo surface scope.
- ✅ **Không parallel source:** giá trị số chỉ ở Component Inventory §B; CSS **tiêu thụ**, không đặt lại. CSS Modules (component) trỏ semantic, không token song song (OD-CSS-1/6).
- ✅ **Semantic over primitive:** component đọc semantic; primitive chỉ ở tầng định nghĩa.
- Layer order khóa (spec §3); override ladder (spec §16); low-specificity (`:where()`).

## 7. Component ownership (đọc token vs không giữ token)

| Component (Homepage subset) | **Đọc** token (semantic/alias) | **KHÔNG giữ** |
|---|---|---|
| Header, Footer | surface/text/border/accent-text | màu/radius/spacing cứng |
| ContentCard (article/caseStudy) | surface/text/muted/border, radius-card | HEX/radius cứng, primitive |
| ArticleMeta, Label | text-muted/secondary, border-strong | màu riêng |
| MetricGroup | text/accent-text, tabular-nums | số giả, HEX |
| PillarMap | text/accent-text/border | màu riêng |
| WorkWithMeBlock | surface(grey)/text/muted, control radius | primitive |
| StatusMessage | text-muted, functional (deferred) | HEX danger |
| Hero / CTA *(composition)* | surface/text/accent/focus-ring/on-accent | brand color, arbitrary radius/spacing, z-index/motion tùy ý |

**Global/native CSS giữ:** primitives · semantic aliases · typography roles · surface mapping · layout · global focus-visible · state semantics · responsive · accessibility. **CSS Modules giữ:** component anatomy · variant · local presentation (trong token đã có). **Không component mới**, Hero/CTA là composition (D33/D46).

## 8. Accessibility review

| Mục | Trạng thái/kế hoạch |
|---|---|
| **Focus** | `--color-focus-ring` (`#FF4000`; Orange surface → `#040404`); outline 2px (`border-width-thick`), rõ hơn hover; **không** xóa outline |
| **Reduced-motion** | baseline global đã có (foundation); giữ; motion ≤200ms (§B.6) |
| **Contrast** | đo per-surface (token-mapping §16): fg/black-white AA pass; accent-text o-700/o-800 pass; **cấm** cam làm body nhỏ trên White/Grey (FAIL). **Cần đo bổ sung**: muted trên Grey/Black, focus-ring per surface, disabled → 1.2B/contrast checkpoint |
| **Font fallback** | `--font-sans` = Geist Sans → `system-ui,...` (phủ tiếng Việt); không mono |
| **Selection** | `--color-selected` = **Deferred slot** (§B.8 chưa có); 1.2B để trống/placeholder, không bịa |
| **Scroll behavior** | **không** `scroll-behavior:smooth` global (giữ foundation); không scroll-snap trang trí |

State **không** phân biệt chỉ bằng màu (kèm border/icon/text); danger dùng icon+text, **không** Kinetic Orange.

## 9. Typography token review (mapping — KHÔNG pixel mới)

Geist Sans-only (D48). Scale canonical §B.1: `--text-h1` 45/34 · `--text-h2` 36/28 · `--text-h3` 28/24 · `--text-lg` 22/19 · `--text-body` 19/17 · `--text-sm` 16 · `--text-xs` 14; body lh 1.7, heading 1.15, UI 1.5; `--measure-prose` 68ch; weight heading 600 (không mặc định 700), body 400, nav/UI 500–600; ls body 0, h1/h2 −0.01em (kiểm dấu). Role (display/section-title/project-title/article-title/body/metadata/metric/eyebrow/nav/button) map từ token-mapping §7; **per-role pixel = Deferred implementation detail** (Contract §7) — 1.2B dùng `clamp()` trong biên §B.1, **không hardcode value mới**. `tabular-nums` cho metric/metadata; không slashed-zero/mono/italic-metric/uppercase-dài.

## 10. Spacing token review (KHÔNG spacing mới)

§B.2: `--space-1..10` = 4/8/12/16/24/32/48/64/96/128; rhythm alias Major `space-9..10` · Standard `space-7..8` · Compact `space-5..6`; gutter 24 (`space-5`); lề `space-5` mobile / `space-7` desktop. **Không tạo spacing mới**; mật độ biến thiên theo section (không equal-spacing).

## 11. Radius token review

§B.4/D49 (R3): `--radius-control` 8–10 · `--radius-card` 12–16 · `--radius-panel` 20–28 · `--radius-signature` 36–48 · `--radius-pill` 999. Signature ≤1 object, **chỉ** evidence frame S3 (optional). Full-width section không bo. **Không value mới.**

## 12. Motion token review

§B.6: `--duration-fast` 120 · `--duration-base` 160 · `--duration-slow` 200 (trần). Chỉ `opacity`/`transform`/`background-color`; reduced-motion. **Easing curve = Deferred** (chưa khóa). Không scroll-reveal/parallax/decorative. Audio out-of-scope (D36 future).

## 13. Container token review

§B.3: `--container-prose` ~68ch (S2) · `--container-content` ~1080 (S0/S4/S6/S7) · `--container-wide` ~1280 (S3/S5) · `--container-full` 100% (**chỉ surface/nền**). Full-width = surface; nội dung trong `wide`. **Không value mới.**

## 14. Responsive token review

§B.9: `--bp-md` 768 · `--bp-lg` 1024 · `--bp-xl` 1280 (+`--bp-sm` 640, `--bp-2xl` 1536 phụ). Mobile-first cascade (OD-CSS-2). Measure 68ch bất biến; body 19→17px qua `clamp()`. Mobile composition riêng. **Không breakpoint pixel mới** (nếu cần range → Deferred/Owner).

## 15. Deferred items (đánh dấu — KHÔNG implement)

| Mục | Trạng thái | Giải ở |
|---|---|---|
| Danger/functional HEX (success/warning/danger) | Deferred (D47 Pending) | Phase màu functional |
| `--color-selected` / `--color-disabled` slot | Deferred (§B.8 chưa có) | token phase (amend §B.8) |
| Easing curves | Deferred | 1.2B/token |
| Typography per-role pixel | Deferred implementation detail | 1.2B (clamp trong §B.1) |
| z-index scale | Deferred | khi có overlay/sticky |
| Pillar colors (1..5) | Deferred (MVP phân biệt bằng nhãn) | Phase sau |
| Container query | Owner/Deferred | media query đủ MVP |
| Focus-ring/disabled contrast trên một số surface | Deferred (cần đo) | contrast checkpoint |

**Deferred không tùy ý:** value khi khóa **phải quay về Component Inventory/Decision Log**; không hardcode sớm.

---

## Handoff → 1.2B

**1.2B được làm:** viết CSS thật vào `src/app/globals.css` (+ file token nếu tách) — khai báo primitive `:root`, semantic + `[data-surface]` re-resolve (layer `surfaces`), spacing/radius/motion/container/typography tokens; tokenize base (bỏ HEX hardcode). Có thể tách `src/styles/` theo cấu trúc SYSTEM_ARCH nếu cần.
**1.2B KHÔNG:** homepage S0–S7 · component · utility-class · Tailwind · value/token mới ngoài §B · danger/easing/selected HEX (deferred) · sửa Decision Log/Design Bible.
