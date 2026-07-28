# Homepage CSS Architecture Specification

## 1. Status and Scope

- **Planning specification** (Checkpoint 0.6B; Owner Decisions **OD-CSS-1..8 khóa ở 0.6C**) — **không** production CSS, **không** file `.css`, **không** component. Chỉ Markdown.
- **Phạm vi:** Homepage MVP. Snippet chỉ **minh hoạ kiến trúc** (1–3 dòng), **không** là stylesheet dùng được.
- **Đã khóa ở 0.6C:** CSS approach (Native CSS + CSS Modules), mobile-first cascade, layer order, utilities-safe boundary, surface scoping, component ownership, specificity budget (xem §2/§3/§16/§18).
- **Còn Deferred (không tự khóa):** exact breakpoint/typography pixel, danger/functional HEX, easing, z-index, selected/disabled slot, container query, print/high-contrast, file-structure/naming/serialization production (OD-CSS-8).
- **Source of truth / hierarchy:** Decision Log → Design Bible → Design System → Component Inventory → Visual Implementation Contract → Visual Token Mapping → **CSS Architecture Spec (file này)** → Source. Con số sống ở Component Inventory §B + token-mapping; file này chỉ mô tả *cách CSS tổ chức*, không phát minh value. D46–D55 thẩm quyền cao nhất khi mâu thuẫn.

## 2. Architecture Thesis

CSS cho Homepage là **editorial-first, section-based, token-driven, low-specificity, component-light**:

- **Semantic over utility-first:** style bám vai trò (surface/role), không rải utility trong markup (chống utility soup → giữ semantic HTML sạch).
- **Token-driven:** mọi giá trị đến từ custom property (primitive → semantic → component alias); component **không** giữ HEX/px cứng.
- **Section-based surface:** màu đổi theo section qua **surface scope**, không phải global mode.
- **Layout ⟂ visual treatment:** container/grid/spacing tách khỏi màu/typography; một section đổi surface không cần đổi layout.
- **CSS phục vụ narrative** (tension/release, evidence peak, một memorable moment), **không** biến trang thành UI kit.

### 2.1 CSS Approach — LOCKED (OD-CSS-1)

**Architectural decision (chưa phải file production):** **Native CSS Architecture + CSS Modules ở cấp component khi cần cô lập style.**

| | Giữ |
|---|---|
| **Native CSS** | reset/foundation · custom properties · typography base · layout primitives · section surfaces · global state/accessibility · responsive architecture |
| **CSS Modules** (chỉ component scope) | component-specific styling · variant nội bộ · local state presentation · style cần tránh rò rỉ ra ngoài component |

**CSS Modules KHÔNG được:** giữ primitive color riêng · định nghĩa token song song · tạo spacing/radius riêng · override surface bằng màu hardcode · trở thành hệ design token thứ hai.

**Không dùng:** Tailwind làm ngôn ngữ bố cục chính · Sass (nếu native CSS đủ) · styled-components/CSS-in-JS · utility-first architecture.

**Trade-off:** native CSS + `@layer` cho low-specificity, token-driven, semantic-over-utility; CSS Modules cô lập anatomy component mà **không** tạo token/primitive song song. Tránh Tailwind vì rủi ro utility-soup, tránh CSS-in-JS vì runtime + rời token model. *(Exact file structure/naming production vẫn Deferred — OD-CSS-8.)*

## 3. CSS Layer Model

**Native CSS cascade layers** (`@layer`) cố định thứ tự cascade **độc lập với source order** — kỹ thuật CSS chuẩn, không phải framework.

**Layer order — LOCKED (OD-CSS-4):**
```
@layer reset, tokens, base, layout, surfaces, components, states, utilities, responsive, accessibility;
```

| Layer (thứ tự) | Trách nhiệm | Được chứa | Không được chứa | Nguồn |
|---|---|---|---|---|
| `reset` | normalize tối thiểu, box-sizing, focus-visible base | reset thuần | màu/token | — |
| `tokens` | custom property (primitive/semantic/alias) | `:root` + surface scope | selector component | token-mapping · §B |
| `base` | element mặc định qua `:where()` | type role, body | layout | §B.1 |
| `layout` | container, grid, rail, spacing primitives | cấu trúc | màu surface | contract §4/§5 |
| `surfaces` | section-based surface scope (`[data-surface]`) | re-map semantic token | layout | §6/token-mapping §6 |
| `components` | 18 component styles nhận token | component alias | primitive trực tiếp | Component Inventory A |
| `states` | hover/focus/active/disabled/status | state | layout mới | token-mapping §11 |
| **`utilities`** (utilities-safe) | helper phạm vi rõ, ít rủi ro | xem boundary dưới | xem boundary dưới | — |
| `responsive` | media-query overrides theo breakpoint | reflow/stack | token mới | §B.9 |
| `accessibility` | override tăng khả năng truy cập (cuối) | a11y-only | generic override | — |

**Utilities-safe boundary (OD-CSS-3):**
- **Được chứa:** `visually-hidden` · `flow-root` · text-wrap helper (khi thật cần) · content-visibility helper (có lý do) · no-scroll/overflow helper có kiểm soát · accessibility helper · layout primitive đã được governance cho phép.
- **KHÔNG được chứa:** margin/padding/width tùy ý · color · background · radius · shadow · arbitrary grid/flex · breakpoint override · one-off fix · class kiểu `mt-6`/`w-2/3`/`rounded-xl` · utility thêm chỉ để sửa riêng một section.
- **Responsive đứng SAU utilities** → responsive được quyền override utilities-safe. **Utilities KHÔNG dùng để sửa lỗi component/surface.**

**Accessibility layer (cuối, OD-CSS-4):** chỉ để tăng truy cập; **không** dùng như generic override layer. Print rules: media-specific block riêng, **chưa** cần layer production riêng ở MVP.

**Không tầng thừa "cho enterprise".**

## 4. Source-of-Truth Mapping

| Tầng | Giữ nguyên tắc | Giữ giá trị | Giữ implementation | Không override |
|---|---|---|---|---|
| Decision Log | ✅ (quyết định) | — | — | tất cả tầng dưới |
| Design Bible | ✅ (craft/anti-pattern) | — | — | không override Decision Log |
| Design System | ✅ (direction) | — | — | — |
| Component Inventory | — | ✅ (**số canonical**) | — | — |
| Visual Implementation Contract | ✅ (art-direction) | — | — | — |
| Visual Token Mapping | — | ✅ (tên token + phân loại) | — | — |
| **CSS Architecture Spec** | ✅ (cách tổ chức CSS) | — | — | không tạo value mới |
| Source (tương lai) | — | — | ✅ (CSS thật) | không là nguồn quyết định |

**Nguyên tắc:** tầng dưới **không** override tầng trên; CSS **không** đặt lại giá trị đã khóa — chỉ tiêu thụ token.

## 5. CSS Custom Property Strategy

Ba tầng property (khớp token-mapping §3):

- **Primitive** (`--color-*`, `--space-*`, `--radius-*`, `--duration-*`, `--container-*`, `--bp-*`): khai báo ở `:root`, **không dùng trực tiếp tràn lan** trong component.
- **Semantic** (`--color-surface`, `--color-text-primary/secondary/muted`, `--color-border`, `--color-accent`, `--color-accent-text`, `--color-on-accent`, `--color-focus-ring`): component **chỉ** dùng tầng này.
- **Component alias** (`--button-bg`, `--card-border`…): trỏ semantic, không HEX.

**Section scope override semantic** (minh hoạ, không production):
```
:where([data-surface="black"]) { --color-surface: var(--color-black); --color-text-primary: var(--color-white); /* … */ }
```
- **Không** biến theo `light`/`dark` (D46).
- **Không** tạo token cho selector dùng một lần; không hàng trăm biến thừa.
- **Không** tự khóa HEX deferred (danger/functional/selected/disabled) — để trống hoặc `/* Deferred */`.

**Global vs CSS Modules (OD-CSS-1/6):** token (primitive/semantic/alias) sống ở **native CSS toàn cục — một nguồn duy nhất**. CSS Modules **không** khai báo primitive/token song song, **không** hệ token thứ hai; component alias trong module (nếu có) **phải trỏ về semantic token toàn cục**. Surface remapping **chỉ** ở surface root (`[data-surface]`), không ở component con. Functional color (danger/success/warning) vẫn **Deferred**.

## 6. Naming Convention

| Loại | Quy ước | Ví dụ |
|---|---|---|
| custom property | `--<domain>-<slot>` theo **vai trò** | `--color-text-muted`, `--space-major` |
| data attribute | `data-surface`, `data-state` | `data-surface="grey"` |
| layout class | `.<archetype>` | `.container-content`, `.rail-split` |
| component class | `.<component>` (+ `__part` nếu cần, tiết chế) | `.pillar-map`, `.content-card` |
| utility class | rất ít, có chủ đích | `.visually-hidden` |
| state | attr/pseudo, không class màu | `:focus-visible`, `[data-state="disabled"]` |
| JS hook (tương lai) | `data-js-*` tách khỏi style | `data-js-nav-toggle` |

**Yêu cầu:** tên theo **vai trò**, không theo màu-bề-mặt/vị-trí/mockup (không `left-card-2`); không class auto-sinh khó đọc; không BEM dài vô ích; **không utility soup trong markup**.

## 7. Surface Scoping Model

Section-based (D46). Mỗi section mang `data-surface` → re-map semantic token trong layer `surfaces`.

| Surface | data-surface | Re-map (từ token-mapping §6) |
|---|---|---|
| White | `white` (mặc định `:root`) | fg #040404 · muted #6E6E6E · border #DEDEDE · accent-text o-700 |
| Grey (S5) | `grey` | fg #040404 · muted #555555 · border #B0B0B0 · accent-text o-800 |
| Black (S3) | `black` | fg #FBFBFB · muted #8A8A8A · border #3A3A3A · accent-text o-500 |
| Orange (focal control) | `orange` | fg #040404 · on-accent #FBFBFB |

Scope phủ: foreground · muted · border · accent · control · focus (`--color-focus-ring`) · selection (**deferred slot**) · functional status (**deferred HEX**) · nested object.

- **Không** global mode (không toggle).
- **Component không tự suy màu nền** bằng selector phức tạp — nó đọc semantic token do surface scope cấp. Đây là chống-parallel-source ở tầng CSS.

**Nguyên tắc scope — LOCKED (OD-CSS-5):**
- `orange` **không** phải một mode nền dùng lặp lại; chỉ cho **focal composition** theo orange budget (1 CTA + 1 marker).
- Component **chỉ nhận semantic aliases**; **không** đọc tên màu để đổi logic.
- **Một section chỉ có một surface root chính**; nested component **không** tự tạo surface mới.
- Evidence frame trong S3 có thể là object riêng nhưng **không** tạo nested theme system.
- **Không** selector sâu để suy đoán surface từ ancestor xa.

## 8. Container Architecture

4 container đã khóa (§B.3, contract §4):

| Container | Use case | Content type | Section | Nesting | Overflow | Max-width | Padding | Mobile |
|---|---|---|---|---|---|---|---|---|
| `prose` | cột đọc | long-form | S2 | trong content | không | ~68ch (measure bất biến) | edge inset | full-bleed padding |
| `content` | section chuẩn | list/CTA/footer | S0/S4/S6/S7 | top-level | không | ~1080px | inset chuẩn | inset chuẩn |
| `wide` | evidence thở | case/work | S3/S5 | trong full | không | ~1280px | inset | co về content |
| `full` | **chỉ surface/nền** | background | nền S3/S5 | bọc content/wide | không | 100% | 0 (nền) | 0 (nền); nội dung vẫn inset |

**Nesting rule:** `full` là nền; content/component nằm trong `wide`/`content`; **chỉ** case artifact S3 (nếu chỉ định) phá container. **Overflow:** không horizontal overflow ở mọi tầng. Pixel cuối cùng ở §B.3 (không khóa lại ở đây).

## 9. Grid and Alignment System

- **Desktop 12-column**, gutter 24px (`space-5`); **grid là công cụ bố cục**, không phải template áp cho mọi section.
- **Content span / rail:** S1/S3 asymmetric ~7/5 (bám left rail); S2 single-column prose; S4 horizontal; S5 balanced split; S6 centered; S0/S7 two-column.
- **Asymmetric / 60/40 evidence:** S3 artifact bám left rail lớn, copy phải; **không** 50/50 mặc định (chống AP-10).
- **Full-bleed:** chỉ nền surface; nội dung trong container.
- **Horizontal pillar map (S4):** hàng ngang desktop → dọc mobile.
- **Mobile stacking order:** = source order (S0→S7); Case artifact **trên** copy; không reorder phá narrative.

Không ép mọi section vào cùng một grid template.

## 10. Spacing and Density Strategy

Rhythm ngữ nghĩa (§B.2): Major `space-9..10` / Standard `space-7..8` / Compact `space-5..6`.

- **Spacing theo semantic rhythm**, không hardcode margin tùy tiện.
- **Density curve S0–S7:** thưa S1/S4/S6 · chặt S3 · pause S4 · tension S1/S3/S5 (không section kề nhau cùng spacing).
- **Chống equal-spacing** (không cùng padding toàn trang).
- **Margin vs padding vs gap:** dùng `gap` cho grid/flow trong khối; `padding` cho inset section/surface; `margin` giữa block trong flow. **Ưu tiên gap/padding** để tránh margin-collapse ngoài ý muốn; kiểm soát khoảng cách giữa section bằng padding của section (không margin chồng).
- **Không khóa toàn bộ pixel** — dùng thang §B.2.

## 11. Typography CSS Strategy

- **Geist Sans only** (D48); role-based (display/page-title/section-title/article-title/metadata/body/metric/eyebrow/nav/button/form) — map từ token-mapping §7.
- **Font loading (kiến trúc, không cài package):** self-host qua gói `geist` + `next/font` ở implementation (D43); `font-display: swap`; subset `latin` + `vietnamese`; preload above-the-fold.
- **Fallback stack:** `Geist, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif` (bỏ nhánh mono).
- **Vietnamese:** line-height rộng cho dấu (body 1.7); kiểm dấu chữ hoa (Ế/Ữ) trước khi áp letter-spacing âm.
- **tabular-nums** cho metric/metadata; **không** slashed zero, **không** mono, **không** all-caps dài, **không** italic metric, **không** mặc định weight 700.
- **Line-break Hero** art-direct riêng theo viewport (desktop vs mobile).
- **Responsive scale** (per-role pixel) = **Deferred implementation detail** (Contract §7) — khóa ở checkpoint token sau; dùng `clamp()` trong biên §B.1.

## 12. Radius, Border and Elevation Strategy

- **R3** (§B.4): control 8–10 · card 12–16 · panel 20–28 · signature 36–48 · pill 999 — theo archetype.
- **Signature-radius ≤1 object, chỉ evidence frame S3** (optional); không bo mọi section/card.
- **Border trước shadow:** phân tầng bằng viền (light) / độ sáng bề mặt (Black); **không** glass/glow/heavy shadow; không dùng shadow thay hierarchy.
- **Divider/hairline:** 1px `--color-border`.
- **Focus ring:** 2px (`--border-width-thick`) `--color-focus-ring` (#FF4000; trên Orange surface dùng đen — deferred verify).
- **Evidence frame S3:** border 1px + radius signature.
- **Khi nào KHÔNG radius:** full-width section, nền surface, divider, khối tràn viền.

## 13. Component Styling Contract

18 component (D33/D46) → CSS responsibility (không viết selector đầy đủ; Hero/CTA = composition, không component 19).

| Component | Nhận token | Không tự giữ | Variant | State | Surface | Radius | Responsive | Loại |
|---|---|---|---|---|---|---|---|---|
| Header | surface, text, border, accent-text | màu cứng | — | hover/focus | White | control | → hamburger ≤768 | base |
| Footer | text-muted, border, accent-text | màu | — | hover/focus | White | — | collapse | base |
| Container | `--container-*` | width cứng | prose/content/wide/full | — | — | — | mọi bp | base primitive |
| ContentCard | surface, text, muted, border | HEX/radius cứng | article \| caseStudy | hover/focus | White/Black | card (+frame S3) | stacked | content-specific |
| ArticleMeta | text-muted | — | — | — | — | — | wrap | content-specific |
| Label | text-secondary, border-strong | — | pillar | — | White | pill (filter thật) | — | base |
| MetricGroup | text, accent-text | số giả | — | — | Black | — | stack | content-specific |
| PillarMap | text, accent-text, border | — | — | hover/focus | White | — | dọc | content-specific |
| WorkWithMeBlock | surface(Grey), text, muted | — | — | hover/focus | Grey | control | stacked | content-specific |
| StatusMessage | text-muted, functional (deferred) | HEX danger | success/warning/danger/empty | — | White | control | — | base |
| Hero *(composition)* | surface, text, accent, focus-ring | — | — | — | White | control | line-break riêng | **composition** |
| CTA *(composition)* | accent, on-accent, focus-ring | — | — | hover/active/focus | White | control | full-width mobile | **composition** |

`ContactForm` thuộc `/contact` (không Home). `Breadcrumb/Prose/ContentHeader/TOC/Callout/FrameworkBlock/AuthorBio` không dùng ở Home. **Không component mới.** Component **không** tự giữ màu/radius/spacing cứng — đọc token.

### 13.1 Ownership Matrix — LOCKED (OD-CSS-6)

| Domain | Global/native CSS | CSS Modules (component scope) | Component **forbidden** |
|---|---|---|---|
| tokens (primitive/semantic/alias) | ✅ nguồn duy nhất | trỏ về semantic, không khai báo mới | primitive/brand color riêng |
| typography roles | ✅ | dùng role đã có | independent type scale |
| layout / container | ✅ primitives | dùng | independent breakpoint system |
| surface mapping | ✅ (surface root) | đọc semantic | surface color hardcode |
| state semantics | ✅ (global focus-visible, state) | local interaction presentation | motion curve tự chọn |
| responsive composition | ✅ (rules) | local alignment behavior | independent breakpoint |
| local anatomy / variants | — | ✅ (approved variants, spacing trong token đã có) | arbitrary radius/spacing |
| radius / spacing | ✅ (thang) | dùng token | arbitrary radius/spacing |
| z-index / shadow | ✅ (khi khóa) | — | z-index tùy ý · shadow tùy ý |

**Global giữ:** primitives · semantic aliases · typography roles · surface mapping · layout primitives · container · global focus-visible · state semantics · responsive composition · accessibility.
**CSS Modules giữ:** component anatomy · component-specific spacing trong token đã có · approved variants · local interaction presentation · local alignment.

## 14. State and Interaction Styling

| State | Cách biểu diễn | Ràng buộc |
|---|---|---|
| hover | brightness/border, không layout shift | ≤160ms |
| focus-visible | outline 2px `--color-focus-ring` | rõ hơn hover; **không chỉ màu** |
| active | pressed (o-600) | ≤120ms |
| disabled | surface sunken + muted + `aria-disabled` | **không** chỉ giảm opacity đến mức khó đọc |
| selected | bg tint + marker/check | **deferred slot HEX** |
| loading | skeleton/spinner + `aria-busy` | không giả success |
| success/warning | functional hue + icon + text | **HEX deferred** |
| danger/error | functional hue + **icon + text** | **không dùng Kinetic Orange**; HEX **Pending (D47)** |
| empty | StatusMessage narrative | không fake fill |

Focus **không** chỉ dựa màu; hover không layout shift; motion ≤200ms; `prefers-reduced-motion` tôn trọng; **touch target ≥44px** mobile. HEX functional còn **deferred**.

## 15. Responsive and Media Query Strategy

- **Mobile-first cascade với min-width enhancement — LOCKED (OD-CSS-2):** mobile-first là **chiến lược cascade**, **không** phải lấy desktop rồi thu nhỏ. Mobile vẫn là **composition riêng**. Source order hỗ trợ **progressive enhancement**; breakpoint chỉ mở rộng composition khi **content stress** yêu cầu. **Không** dùng `transform`/scale để thu desktop; **không** đảo thứ tự nội dung chỉ để khớp mockup. **Thứ tự semantic HTML là nguồn chính**; CSS chỉ điều chỉnh presentation hợp lệ. *(Exact breakpoint pixel vẫn Deferred.)*
- **Breakpoint theo content stress** (§B.9): `--bp-md` 768 · `--bp-lg` 1024 · `--bp-xl` 1280 (+640/1536 phụ). **Không** tự tạo pixel tùy tiện; nếu cần range mới → **Deferred/Owner**.
- **5 composition riêng:** mobile 390 · tablet · narrow desktop · standard · wide.
- **Mobile:** Hero line-break riêng · CTA full-width · Case evidence stack **trên** copy · nav collapse (hamburger) · pillar dọc.
- **Container query:** *option* cho component tái sử dụng (vd card theo bề rộng cha) — **Owner/Deferred**, không bắt buộc; media query đủ cho Homepage MVP.
- **Cấm:** horizontal overflow · **không** scale toàn desktop bằng `transform`/shrink (mobile là composition riêng, không thu nhỏ).

## 16. Cascade, Specificity and Override Rules

**Specificity budget — LOCKED (OD-CSS-7):**
- Foundation/base ưu tiên `:where()` để **specificity = 0** khi phù hợp.
- Component selector mặc định **tối đa 1 class**.
- State dùng **data attribute / pseudo-class / ARIA state**.
- Surface override qua **semantic token remapping**, không selector sâu.
- **Không** ID selector cho styling.
- **Không** `!important` — trừ helper accessibility cực đặc biệt, **phải có comment giải thích**.
- **Không** selector sâu hơn **2 cấp** class/attribute kết hợp.
- **Không** style theo DOM ngẫu nhiên (`section > div:nth-child(2)`) hay theo nội dung/vị trí (`.left-card`, `.third-block`).
- `:has()` **chỉ** khi progressive enhancement hợp lý (có fallback hoặc không ảnh hưởng chức năng); `:is()/:where()` để **giảm lặp**, không che giấu selector phức tạp.

**Override ladder — LOCKED (thứ tự thắng, OD-CSS-4):**
```
reset < tokens < base < layout < surfaces < components < states < utilities < responsive < accessibility
```
- **utilities-safe** đứng trước **responsive** → responsive override được utilities; **accessibility** cuối (chỉ a11y).
- **State/breakpoint:** state trong layer `states`; breakpoint trong `responsive` → override đúng chỗ, không specificity war.
- **File/import order:** khai báo `@layer` order **một lần** ở đầu → source order không ảnh hưởng cascade (trong cùng layer vẫn cần kiểm soát import order).

## 17. Anti-Pattern and QA Gates

| # | Anti-pattern | Detection heuristic | Severity | Prevention | Evidence (implementation phase) |
|---|---|---|---|---|---|
| 1 | Utility soup | nhiều class utility/markup | High | semantic-over-utility (§2/§6) | markup review |
| 2 | Equal spacing | ≥4 section trùng padding | High | rhythm ngữ nghĩa (§10) | full-page + đo |
| 3 | Same section rhythm | ≥3 nhịp giống | High | Editorial Rhythm | full-page |
| 4 | Giant card / nested cards | card chứa card | High | không global card (§13) | components |
| 5 | Excessive radius | radius ngoài R3 | Medium | R3 (§12) | close-up |
| 6 | Fake dashboard | ô số/analytics | Critical | evidence gate | S3 |
| 7 | Icon-in-every-card | icon mọi mục / >12 | Medium | icon chức năng | full-page |
| 8 | Global theme mode | toggle/`prefers-color-scheme` switch | Critical | section-based (§7) | code review |
| 9 | Hardcoded primitive everywhere | HEX trong component | High | component→semantic (§5) | code review |
| 10 | Specificity war / `!important` | grep `!important`, ID selector | High | budget thấp (§16) | code review |
| 11 | Magic number proliferation | px rời rạc ngoài thang | Medium | §B.2 scale | code review |
| 12 | Duplicate tokens | token trùng nghĩa | Medium | token-mapping §19 | code review |
| 13 | Visual leaking vào content structure | style ép cấu trúc HTML | High | layout⟂treatment (§2) | markup review |
| 14 | Desktop shrink-to-mobile | transform/scale toàn trang | High | composition riêng (§15) | mobile shots |
| 15 | Horizontal overflow | scroll ngang | High | overflow rule (§8) | mobile shots |
| 16 | Focus loss | thiếu focus-visible | Critical | §14 | keyboard shots |
| 17 | Inaccessible contrast | cặp FAIL AA | Critical | contrast matrix (token §16) | contrast test |
| 18 | Animation without purpose | motion trang trí | Medium | ≤200ms feedback-only | reduced-motion |
| 19 | CSS bundle bloat | kích thước lớn/dư | Medium | layer-light, ít utility | bundle size |
| 20 | Utility override abuse | utility sửa lỗi component/surface | High | utilities-safe boundary (§3); responsive sau utilities | code review |
| 21 | CSS Module token duplication | primitive/token khai báo trong module | Critical | ownership matrix (§13.1); token global duy nhất | code review |
| 22 | Local breakpoint drift | breakpoint riêng trong module | High | breakpoint global (§15/OD-CSS-6) | code review |
| 23 | Surface leakage | component đọc tên màu / suy surface từ ancestor xa | High | semantic aliases + surface root (§7) | code review |
| 24 | Accessibility layer misuse | a11y layer làm generic override | High | a11y layer chỉ a11y (§3) | code review |
| 25 | Responsive patch accumulation | nhiều media-query vá rời rạc | Medium | composition riêng, không patch (§15) | code review |
| 26 | Selector depth creep | selector >2 cấp | Medium | budget ≤2 cấp (§16) | code review |
| 27 | Generic `div` selector | style theo DOM ngẫu nhiên | High | 1 class, không nth-child (§16) | code review |
| 28 | Arbitrary custom property creation | token cho selector 1 lần | Medium | không token thừa (§5) | code review |
| 29 | One-off "temporary" class → permanent | class fix riêng còn lại | Medium | không one-off utility (§3) | code review |

## 18. Deferred Decisions, Risks and Handoff

**Đã khóa (LOCKED, kế thừa + OD-CSS-1..7):**
- Kế thừa: section-based (không toggle) · 4 primitive · Geist Sans-only/no-mono/tabular-nums · R3 (signature ≤1@S3) · S3 Black peak / S5 Grey · orange budget · 18 component (Hero/CTA composition) · motion ≤200ms/no-scroll-reveal · mobile composition riêng · content/evidence-first.
- **0.6C:** **Native CSS architecture + CSS Modules local scope** (OD-CSS-1) · **mobile-first cascade** (OD-CSS-2) · **layer order** `reset…accessibility` (OD-CSS-4) · **utilities-safe boundary** (OD-CSS-3) · **surface scoping** (OD-CSS-5) · **component ownership boundary** (OD-CSS-6) · **specificity budget** ≤1 class/≤2 cấp (OD-CSS-7).

**Deferred (OD-CSS-8) — vẫn KHÔNG khóa trong 0.6C:**
| Mục | Loại |
|---|---|
| Exact breakpoint pixel | Deferred → §B.9 |
| Exact typography pixel per-role | Deferred → §B.1 / token phase |
| Danger/functional HEX | Deferred (D47 Pending) |
| Easing curves | Deferred |
| z-index scale | Deferred |
| selected/disabled token cuối | Deferred → amend §B.8 |
| Container query dùng hay không | Owner/Deferred |
| Print/high-contrast production detail | Deferred |
| Exact file structure production | Deferred |
| Exact CSS Module naming convention (implementation) | Deferred |
| Exact token serialization syntax | Deferred |

> **Deferred không có nghĩa tùy ý:** mọi giá trị khi được khóa **phải quay về Component Inventory hoặc Decision Log**; **không** hardcode sớm trong source.

**Blocker:** không có blocker cứng cho *đặc tả* CSS. **Blocker cho CSS thật:** (a) cổng nội dung (CONTENT_INVENTORY §1) cho render thật; (b) Milestone 1.1 setup; (c) Phase 1 được mở. *(CSS approach đã khóa — không còn là blocker.)*

**File dự kiến ở bước triển khai (không tạo ở đây):** `src/styles/` (native: tokens/base/layout/surfaces/states/responsive/accessibility) + `*.module.css` cấp component — chỉ sau khi mở Phase 1.

**Điều kiện bắt đầu CSS thật:** Owner duyệt spec này (0.6D commit) + Milestone 1.1 (project setup) + Phase 1 được mở.

**Readiness: READY WITH NON-BLOCKING DEFERRED DETAILS** — CSS approach + kiến trúc đã khóa; developer triển khai được mà không phải suy đoán art direction hay framework; deferred đều non-blocker và phải quay về source of truth khi khóa; không conflict cứng với D46–D55.
