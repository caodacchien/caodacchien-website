# Homepage Layout Implementation Preparation (1.4A)

> **Preparation only.** KHÔNG sửa source (page/layout/globals), KHÔNG component/CSS-Module/route/image/animation/content, KHÔNG commit. Chỉ đặc tả để 1.4B triển khai layout.
>
> Đây **không** phải source-of-truth mới — chỉ tổng hợp từ canonical docs. Con số sống ở `COMPONENT_INVENTORY §B` + `DECISION_LOG`. Khi cần giá trị, dẫn token/§B, **không** phát minh value.

## 1. Status and scope

- Checkpoint 1.4A: đặc tả **layout system** cho Homepage trước khi sửa CSS/cấu trúc production — page-level layout, container, grid/rail, section composition, whitespace rhythm, breakpoint, mobile composition, surface placement, conditional collapse, ownership, a11y, anti-pattern, boundary 1.4B.
- **Không** art-direction hoàn chỉnh/visual-polish/component/token mới/pixel mới/prototype/screenshot.
- Bám: spine S0–S7 (D25/D27); surface (D46/D47); R3 (D49); container/grid/spacing/breakpoint (§B.3/§B.2/§B.9); CSS layer + OD-CSS-1..8; 18 component (D33/D46); flat routing (D57).

## 2. Sources of truth

`DECISION_LOG` (D25/D27/D46–D57) · `homepage-layout-logic.md` (0.4F) · `homepage-visual-implementation-contract.md` (0.5C) · `homepage-css-architecture-spec.md` (0.6B/0.6C OD-CSS-1..8) · `homepage-visual-token-mapping.md` (0.6A) · `homepage-semantic-skeleton-preparation.md` (1.3A) · `homepage-semantic-html.html` · `COMPONENT_INVENTORY.md §B` · `DESIGN_SYSTEM.md` · `INFORMATION_ARCHITECTURE.md` · `BRAND_POSITIONING.md` · `CONTENT_INVENTORY.md` · Design Bible · AI_RULEBOOK. **Hierarchy D50.** **Path mapping:** IA = `docs/02-design/INFORMATION_ARCHITECTURE.md`; START_HERE = root. Giá trị §B được các artifact trên ánh xạ canonical vào section-application; file này tiêu thụ, không tạo mới.

## 3. Current Homepage render state

Verify từ source `src/app/page.tsx` (đã kiểm 1.3C) + runtime:

| Trạng thái | Section |
|---|---|
| **Rendered** | S0, S1, S4, S6, S7 |
| **Conditionally omitted** | S2 (`featuredWriting.length < 3`, D55) · S3 (`featuredCaseStudy === null`, D55/D6) · S5 (`servicesOffered === null`, D54) |

- Runtime hiện tại: 1 h1, 2 h2, 5 h3, 0 h4, 1 header/main/footer, 3 nav, 3 section, 1 address; DOM order S0→S1→S4→S6→S7.
- `globals.css`: `@layer layout {}` và `@layer responsive {}` **trống**; `@layer surfaces` đã có 4 block `[data-surface=white|grey|black|orange]`; token foundation đủ. `page.tsx` đã có className role-based (site-header/hero/pillar-map/contact-cta/site-footer…) nhưng **chưa** có container wrapper / data-surface / grid.
- Layout prep phải phục vụ **cả hai** trạng thái: **A** (hiện tại — S2/S3/S5 omit) và **B** (tương lai — đủ content, render). **Không** thiết kế chỉ một trạng thái; **không** tạo khoảng trống/gãy nhịp khi omit.

## 4. Page-level layout thesis

**Editorial-first Publishing layout** (D22/D29/D36) — không SaaS landing / portfolio gallery / magazine clone / dashboard / generic personal-brand template. Content-led, asymmetric có chủ đích (S1/S3, không 50/50), quiet authority, systems-thinking; bản thân trang là bằng chứng năng lực (BRAND §6).

Hành trình đọc đầy đủ (trạng thái B):
`Orientation(S0) → Positioning(S1) → Thinking(S2) → Evidence(S3) → Capability Map(S4) → Collaboration(S5) → Contact(S6) → Exit(S7)`

Hành trình ở trạng thái hiện tại (A):
`Orientation(S0) → Positioning(S1) → Capability Map(S4) → Contact(S6) → Exit(S7)`

Layout duy trì mạch đọc khi omit bằng **conditional join + semantic spacing** (§22): không khoảng trắng dư, không hai peak liền kề, không thay khối thiếu bằng testimonial/logo-wall/fake-metric/feature-grid; whitespace co theo section rhythm (layout-logic §14).

## 5. Container system

4 container canonical (`§B.3`, contract §4; **không** container thứ năm, **không** một-container-cho-tất-cả):

| Container | Purpose | Max role (ref §B.3) | Typical content | Allowed sections | Forbidden use | Mobile |
|---|---|---|---|---|---|---|
| `prose` | cột đọc, measure kiểm soát | ~68ch (bất biến) | long-form body | S2 | list/CTA/footer full width | padding co, 68ch giữ |
| `content` | section chuẩn | ~1080px | nav/list/CTA/footer | S0, S4, S6, S7 | evidence thở rộng | inset chuẩn |
| `wide` | evidence thở | ~1280px | case/work nội dung | S3, S5 (nội dung bên trong) | cột đọc long-form | co về `content` |
| `full` | **chỉ surface/nền** | 100% | background tràn viền | nền S3 (Black), S5 (Grey) | **bọc text/component sát cạnh viewport** | nền 100%, nội dung vẫn inset |

- **Edge/gutter:** lề `space-5` mobile / `space-7` desktop; gutter `space-5` (24px) (§B.3/token-mapping §13).
- **Nesting rule (LOCKED):** `full` chỉ là nền; text/component/metric nằm trong `wide`/`content`/`prose`. **Chỉ** case artifact ở S3 (nếu chỉ định) được phá container (§11). Không lồng rounded card trong card.
- **Full-width clarification (S3/S5) — bắt buộc:** full-width **chỉ** cho surface/background; **không** biến S3/S5 thành full-screen landing band; measure 68ch bất biến xuyên breakpoint (chỉ padding co).
- Pixel cuối ở §B.3 — **không** khóa lại/invent ở đây.

## 6. Grid strategy

Grid 12-col, gutter 24px (`§B.3`) là **công cụ**, không template áp cho mọi section (contract §5, css-arch §9). Rail theo section:

| Section | Rail model | Main axis | Alignment | Breakout |
|---|---|---|---|---|
| S0 | two-column split | ngang | tên trái / nav phải | không |
| S1 | asymmetric **~7/5** (text/evidence) | ngang | text bám left-rail; evidence lệch phải | không (evidence-slot trong container) |
| S2 | single-column trong `prose` | dọc | left | không |
| S3 | asymmetric **~7/5** (artifact/copy) | ngang | artifact bám left-rail lớn; copy phải | **chỉ** case artifact (§11) |
| S4 | full-width horizontal (5 mục) | ngang | baseline chung | không |
| S5 | balanced two-region (phù/chưa-phù) | ngang | balanced split | không |
| S6 | centered trong `content` | dọc | center, cô lập | không |
| S7 | two-column (nav / connect) | ngang | trái nav / phải connect | không |

- **Không:** áp 12-col cho mọi section · dashboard/bento grid · equal-column mặc định · 50/50 hàng loạt (chống AP-10) · chia cột chỉ để "trông design" · grid tạo feature cards.
- **Baseline:** heading↔metadata cùng baseline trong cùng khối; trong S1/S3 mép trên evidence căn baseline heading (không thả trôi).
- **Intentional misalignment:** cho phép ở S1 (evidence lệch phải) — có chủ đích, không ngẫu nhiên.
- Mobile: mọi rail → single-column stack (§21/§22); **không** shrink desktop cơ học.

## 7. Page gutter and edge behavior

| Tier | Gutter/inset (ref §B.2/§B.9) |
|---|---|
| mobile (base) / <390 | lề `space-5` (24) |
| tablet (≥768) | chuyển dần `space-6..7` |
| desktop (≥1024) | lề `space-7` (48) |
| wide (≥1280) | `content`/`wide` cap max-width + căn giữa, gutter giữ |
| very wide (≥1536 `bp-2xl`) | container cap giữ; nền `full` chạm viewport, nội dung không |

- No horizontal overflow ở mọi tier (320px an toàn).
- Surface `full` (S3/S5) chạm viewport nhưng **content bám container** (§5).
- **Không:** negative-margin hack · `width:100vw` gây scrollbar · arbitrary edge-bleed · mobile padding mỗi section một kiểu (dùng lề chuẩn thống nhất).

## 8. Section width matrix

| S | Surface | Container | Column model | Primary align | Secondary align | Measure | Visual weight (0.4F §5) | Density | Breakout | Mobile | Conditional |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S0 | White | content | two-col split | tên trái | nav phải | — | 2 | thấp | không | tên + nav wrap/compact | required |
| S1 | White | asymmetric (content-rail) | 7/5 | statement left | evidence lệch phải | ≤17ch (h1) | 8 (★memorable) | thấp/thoáng | không | stacked, line-break riêng | required |
| S2 | White | prose | single-col | left | — | 68ch | 5 | trung | không | stacked | omit-when-empty (D55) |
| S3 | **Black** | wide (nền `full`) | 7/5 | artifact left | copy phải | copy hẹp | 9 (★peak) | cao (ws thấp) | case artifact | artifact-trên-copy | omit-when-empty (D55) |
| S4 | White | content | horizontal 5 | baseline chung | — | — | 5 (◦rest) | thấp (ws cao) | không | dọc | required |
| S5 | **Grey** | content/wide (nền `full`) | balanced 2-region | balanced | — | — | 6 | trung | không | stacked | hidden-until-ready (D54) |
| S6 | White | content | centered | center | — | — | 8 (★action-attn) | thấp (silence cao) | không | full-width CTA | required |
| S7 | White | content | two-col | trái nav | phải connect | — | 2 | thấp | không | collapse → stack | required |

Surface đúng four-surface (D46/D47): **S3 = Black evidence peak duy nhất**; **S5 = Grey supporting**; Orange **không** phải surface — chỉ **1 CTA (S6) + 1 marker (S1)** theo budget D47. **Không** global dark/light, **không** xen màu máy móc.

## 9. Header layout (S0)

- Container `content`; two-column split: wordmark trái-rail / primary-nav phải-rail; full-width thin band.
- Desktop: nav 5 mục ngang. Tablet: nav có thể rút gọn/wrap. Mobile: semantic wrap hoặc compact arrangement (**không** hamburger-JS ở 1.4B — chưa khóa interaction; §33).
- Border/separator: **optional** 1px `--color-border` hairline dưới header (contract §6 "phân tầng bằng viền light"); whitespace có thể thay divider. Không bắt buộc.
- Sticky: layout-logic §2 cho phép "sticky nhẹ" — **non-blocking deferred** (cần z-index scale, hiện Deferred css-arch §18); **không** bắt buộc ở 1.4B "layout complete".
- **Cấm:** hamburger JS interaction (chưa khóa) · icon · theme toggle (D46) · floating CTA · oversized/app-shell/dashboard-nav · nav pill hàng loạt. Skip-link giữ, focus không bị header che (§29).

## 10. Hero layout (S1)

- Container asymmetric ~7/5 trong content-rail; statement (trội) bám left-rail; eyebrow trên statement; supporting/CTA dưới; evidence-slot (portrait) lệch phải.
- Measure h1 ≤17ch (contract §7); visual silence cao quanh statement (Major rhythm, §17).
- Asymmetric balance, **không** 50/50. Transition sang section kế bằng Major spacing.
- **Asset-omit behavior (bắt buộc):** portrait chưa có → layout **vẫn hoàn chỉnh**, **không** empty media column, **không** placeholder frame công khai, **không** reserve fixed blank area. Statement/CTA tự chiếm bố cục; khi có asset thật mới mở evidence-slot (§25).
- Mobile: statement line-break art-direct riêng; CTA full-width; (nếu có) portrait xuống dưới statement.
- **Cấm:** giant centered headline · full-screen hero mặc định · generic hero split · orb/gradient/glow · fake screenshot · stock portrait · floating badge · testimonial/KPI/metric trong Hero · CTA cluster · "hero card".

## 11. Featured Writing layout (S2)

Hai trạng thái:
- **A omit (hiện tại):** section không render. Join: S1 → S4 (hoặc S1 → cognitive-rest → S3 nếu S3 render mà S2 omit, §22). Không heading/khoảng-trắng placeholder.
- **B render:** container `prose` single-column; text-first editorial; featured hierarchy (1 bài chính + list phụ); title = link route thật; excerpt/meta quan hệ dọc; `<time>` chỉ khi ngày thật; ảnh **optional** (P3), không bắt buộc; responsive stack; transition sang S3/S4.
- **Cấm:** equal three-card grid · generic blog cards · card explosion · fake image slot · masonry · carousel · logo-thumbnail · dashboard list · same-size blocks.

## 12. Featured Case Study layout (S3)

S3 = **evidence peak duy nhất** + **black surface duy nhất**.
- Nền `full` Black (surface-only); nội dung trong `wide`; rail asymmetric ~7/5 (artifact trội / copy phải); evidence-first hierarchy: project title → context/problem → approach → result → metric → artifact + caption.
- Density cao, whitespace **thấp** có chủ đích; contrast Black. **Signature radius ≤1 object**, **chỉ** evidence frame S3 (optional maximum allowance, D49/contract §9). **Chỉ** case artifact được phá `wide` (§5/§6); headline/copy/metric **không**.
- Mobile: artifact **trên** copy (stacked), tôn trọng lề, không full-bleed vô nghĩa.
- **A omit (hiện tại):** không render; join S2→S4 (hoặc S1→S4). **Không** black spacer, **không** empty evidence frame, **không** giữ nền tối rỗng.
- **Cấm:** dashboard mockup · KPI tile grid · bento · fake metric · browser-frame vô nghĩa · code-editor aesthetic · nhiều black section · neon/gradient/glow · card wall.

## 13. Pillar Map layout (S4)

S4 = capability/thinking map, **không** feature grid; là **điểm nghỉ nhận thức** (rest).
- Container `content`; horizontal list 5 trụ desktop; baseline chung; whitespace cao (cognitive rest); mỗi trụ có label (h3 link) + supporting text; hierarchy label ≠ supporting.
- **Hướng chính đề xuất: editorial horizontal index/rows** (list semantic, hàng ngang thoáng) — lý do: bám "bản đồ tư duy" (đọc/quét), tránh 5-equal-card SaaS; giữ scanability; hợp four-surface (White, không tô nền từng ô).
- Desktop hàng ngang → tablet có thể wrap 2 hàng → mobile dọc. Hover/focus intent chỉ ở mức **requirement** (feedback nhẹ, không layout shift; §29) — không đặc tả curve.
- **Cấm:** five equal cards · icon per pillar · feature-grid · pill-only nav · dashboard tiles · bento · carousel · horizontal overflow · center-aligned marketing block · same visual weight nếu hierarchy cần khác. Slug/thứ tự **không** đổi (D51/D16).

## 14. Work With Me layout (S5)

Hai trạng thái:
- **A omit (hiện tại, D54):** không render; **S4 nối trực tiếp S6**; **không** grey strip trống, không heading rỗng.
- **B render:** nền `full` Grey (supporting, surface-only); nội dung trong `content`/`wide`; balanced two-region ("Phù hợp khi" / "Có thể chưa phù hợp khi"); engagement description; 1 CTA link → `/contact/`; density trung; mobile stacked; transition sang S6.
- **Cấm:** pricing table · service cards · booking widget · calendly embed · package tiers · fake process timeline · icon list · giant CTA · sales landing block.

## 15. Contact CTA layout (S6)

S6 = action peak cuối, **không** giant CTA island.
- Container `content`; centered, cô lập; heading + **1 CTA chính** (`/contact/`); optional 1 text-link phụ nếu source cho phép (hiện skeleton chỉ 1 CTA — giữ tối giản); whitespace/silence cao.
- Orange budget: **1 CTA cam** (control accent), **không** biến section thành nền cam, không marker thứ hai. Mobile: CTA full-width (nếu contract cho phép).
- **Cấm:** floating CTA · huge centered banner · modal trigger · booking calendar · contact form (thuộc `/contact`) · multiple equal CTA · orange full-screen surface · lặp lại layout Hero · card container chỉ để chứa CTA · duplicate wording vô nghĩa với Header.

## 16. Footer layout (S7)

- Container `content`; two-column desktop (nav phụ trái / connect phải) + wordmark + address (email) + copyright/privacy; quiet, editorial, nhẹ.
- Reading order: wordmark → nav phụ → connect (RSS + LinkedIn-khi-có) → address(email) → copyright/privacy. Tablet: giữ 2 cột hoặc bắt đầu collapse. Mobile: stack dọc.
- Tách khỏi S6 bằng Standard spacing (tiết chế). `address` **chỉ** bao contact info chủ website (email).
- **Cấm:** mega footer · newsletter block (D27) · social icon wall · nhiều cột · legal-giả · app-store badge · logo wall · theme controls · full-sitemap dump. LinkedIn chỉ render khi URL thật (D53); GitHub không render (D52).

## 17. Vertical rhythm and density

Rhythm ngữ nghĩa (§B.2, contract §8): **Major** `space-9..10` (96–128) · **Standard** `space-7..8` (48–64) · **Compact** `space-5..6` (24–32). **Không** hardcode pixel nếu chưa khóa; **không** cùng padding mọi section (chống equal-spacing AP-6).

| S | Top | Bottom | Internal | Density | Cognitive rest | Transition |
|---|---|---|---|---|---|---|
| S0 | — | Compact | Compact | thấp | — | → Hero |
| S1 | Standard | Major | Compact (title↔body); Standard (text↔evidence) | thấp/thoáng | silence quanh statement | Major → kế |
| S2 | Major (ranh giới) | Standard | Compact | trung | — | → S3/S4 |
| S3 | Major (White→Black) | Major (Black→White) | Compact (ws thấp) | **cao** | — | tension→thở |
| S4 | Standard | Standard | Standard (ws cao) | thấp | **vùng nghỉ chính** | → S5/S6 |
| S5 | Standard | Standard | Compact | trung | — | → S6 |
| S6 | Standard | Standard | Compact (silence cao) | thấp/gọn | — | → Footer |
| S7 | Standard | Compact | Compact | thấp | — | kết |

Density curve: `Header nhẹ → Hero thoáng → Writing trung → Case nặng → Pillar nghỉ → Work trung → CTA gọn → Footer nhẹ`. **Khi S2/S3/S5 omit:** rhythm **tái nối** (không cộng dồn spacing cũ) — dùng padding của section kề, không margin chồng (§22, css-arch §10).

## 18. Alignment system

Vocabulary (layout-logic §6): **left · centered · asymmetric · balanced**. Không centered mặc định; không mỗi section tùy ý; có logic xuyên trang.

| Anchor | Alignment | Section |
|---|---|---|
| wordmark/nav | balanced (two-biên) | S0, S7 |
| Hero statement | left + asymmetric | S1 |
| article title/body | left | S2 |
| evidence/case narrative | left + asymmetric | S3 |
| pillar rows | left, baseline chung | S4 |
| collaboration two-region | balanced | S5 |
| CTA | centered (cô lập) | S6 |

Rail xuyên trang: left-rail thống nhất cho content-align (S1/S2/S3/S4 bám cùng left-rail của container) → tạo trục đọc nhất quán; chỉ S6 centered có chủ đích. Không căn giữa đoạn dài.

## 19. Visual weight map

Attention map (layout-logic §5 + Blueprint):

| S | Primary focus | Secondary | Visual weight 1–10 | Density | Time-on-section | Exit cue |
|---|---|---|---|---|---|---|
| S0 | wordmark | nav | 2 | thấp | 2s | scroll xuống Hero |
| S1 | statement | CTA | 8 (★memorable) | thấp | 5s | "đọc tiếp" |
| S2 | article title | trụ/meta | 5 | trung | 30s–2ph | → evidence |
| S3 | artifact/metric | project title | **9 (★peak)** | cao | 1–2ph | thở ra → map |
| S4 | trụ "AI cho Marketing" | 5 trụ | 5 (◦rest) | thấp | 20s | chọn hướng |
| S5 | headline | phù/chưa-phù | 6 | trung | 30s | → hành động |
| S6 | CTA | link | 8 (★action-attn) | thấp | 5s | click/exit |
| S7 | wordmark | nav/connect | 2 | thấp | 5s | rời trang |

Ràng buộc: **1 memorable moment = Hero**; **1 evidence peak = S3**; **không hai peak liền kề** (S1↔S3 cách bởi S2; S3↔S6 cách bởi S4/S5); S4 = rest; CTA rõ nhưng không lấn bằng chứng. **Nếu S3 omit: KHÔNG nâng S4 thành evidence peak giả** (S4 giữ vai rest; join theo §22).

## 20. Responsive breakpoint strategy

Breakpoint canonical (`§B.9`, token-mapping §13) — **không** invent pixel mới; mobile-first cascade (OD-CSS-2, mobile là composition riêng, **không** shrink desktop):

| Tier | Ref token | Container | Gutter | Column collapse | Alignment | Order | Measure | Nav | Artifact | CTA |
|---|---|---|---|---|---|---|---|---|---|---|
| narrow mobile (<390) | base / `bp-sm` 640 | prose/content, lề co | `space-5` | tất cả 1-col | left/centered giữ | S0→S7 | 68ch giữ | wrap/compact | trên copy | full-width |
| mobile (390) | base | prose/content | `space-5` | 1-col stack | giữ | S0→S7 | 68ch | wrap (hamburger deferred) | trên copy | full-width |
| tablet (≥768) | `bp-md` | content | `space-6..7` | 2-region wrap; pillar wrap 2 hàng | giữ | S0→S7 | 68ch | rút gọn | gần-dọc | inline |
| standard desktop (≥1024) | `bp-lg` | content/wide | `space-7` | rail đầy đủ | full | S0→S7 | 68ch | ngang 5 | cạnh copy (7/5) | inline |
| wide desktop (≥1280) | `bp-xl` (+`bp-2xl` 1536) | wide cap + căn giữa | `space-7` | như trên | full | S0→S7 | 68ch | ngang | 7/5 | inline |

- **Cấm:** desktop shrink/`transform`-scale · arbitrary media-query per section · local breakpoint drift (css-arch §15/§22) · horizontal scroll · duplicate DOM · CSS `order` đảo logic · hide essential content theo viewport · separate mobile copy.
- Exact breakpoint pixel = **Deferred → §B.9** (giá trị đã có: 768/1024/1280 +640/1536); dùng đúng, không tự chọn khác.

## 21. Mobile composition

Composition riêng, **cùng semantic DOM** (không duplicate). Order = DOM = S0→S7.

| S | Mobile composition |
|---|---|
| S0 | wordmark + nav wrap/compact (hamburger deferred); touch target ≥44px |
| S1 | statement (line-break riêng) → CTA full-width → (portrait dưới nếu có asset) |
| S2 (nếu render) | stack 1-col; title→excerpt→meta |
| S3 (nếu render) | **artifact trên copy**; nền Black; nội dung tôn trọng lề |
| S4 | 5 trụ dọc; dễ quét |
| S5 (nếu render) | fit → not-fit stacked → CTA |
| S6 | heading → CTA full-width |
| S7 | collapse 2 cột → stack dọc |

Nguyên tắc: statement trước supporting; context trước evidence; CTA sau reasoning; artifact không chen sai nghĩa; list dễ đọc; focus order = DOM; no horizontal overflow; không visual-compression quá mức; không giant heading gây viewport lock.

## 22. Conditional-section collapse matrix

Spine S0–S7 immutable; khi S2/S3/S5 omit, layout nối lại giữ nhịp (layout-logic §14). Giải bằng **semantic spacing + selector đơn giản**, **không** class per-combination.

| # | Tổ hợp render | Adjacency | Surface transition | Spacing/narrative | Two-peak risk | Modifier cần? |
|---|---|---|---|---|---|---|
| 1 | S2✗ S3✗ S5✗ **(hiện tại)** | S1→S4→S6 | White→White→White | Major S1→S4; arc "định vị→bản đồ→hành động" | Không | Không (spacing tự nhiên) |
| 2 | chỉ S2 | S1→S2→S4→S6 | toàn White | Standard; nghĩ→bản đồ | Không | Không |
| 3 | chỉ S3 | S1→[rest]→S3→S4→S6 | White→**Black**→White | **chèn cognitive rest** giữa Hero&Case (khoảng thở/divider có nghĩa, KHÔNG section mới) | **Có** (S1 8 & S3 9 liền) → xử lý bằng rest | rest-spacing (không class combo) |
| 4 | S2+S3 | S1→S2→S3→S4→S6 | White→White→Black→White | S2 tách hai peak | Không | Không |
| 5 | chỉ S5 | S1→S4→S5→S6 | White→White→**Grey**→White | Standard | Không | Không |
| 6 | S2+S5 | S1→S2→S4→S5→S6 | White…Grey→White | Standard | Không | Không |
| 7 | S3+S5 | S1→[rest]→S3→S4→S5→S6 | White→Black→White→Grey→White | rest trước S3 | Có (Hero&Case) → rest | rest-spacing |
| 8 | S2+S3+S5 (đầy đủ) | S1→S2→S3→S4→S5→S6 | White→White→Black→White→Grey→White | full density curve | Không | Không |

Nguyên tắc: không khoảng trắng dư; không hai peak liền kề (chỉ tổ hợp có S3-mà-không-S2 cần cognitive rest); không thay khối thiếu bằng testimonial/logo-wall/fake-metric/feature-grid; whitespace co theo section rhythm. **Không viết CSS thật ở đây.**

## 23. Surface transition logic

Chuỗi đầy đủ (D46/D47): `S0 W → S1 W → S2 W → S3 BLACK → S4 W → S5 GREY → S6 W → S7 W`.

| Transition | Ý nghĩa | Divider? |
|---|---|---|
| White→White (S0/S1/S2, S4, S6/S7) | mạch đọc điềm tĩnh | whitespace/hairline optional |
| White→Black (S2→S3) | chuyển tối tạo tension đúng evidence peak | không (surface contrast đủ) |
| Black→White (S3→S4) | "thở ra" sau bằng chứng | không |
| White→Grey (S4→S5) | tách lời mời, supporting | không (Grey đủ tách) |
| Grey→White (S5→S6) | về nền hành động | không |
| Orange (focal) | **chỉ** control CTA S6 + marker S1 — không owning surface | — |

- **Section owning surface:** chỉ S3 (Black), S5 (Grey) mang `data-surface`; White = `:root` default (không attribute). S1 marker + S6 CTA dùng orange **accent**, không `data-surface="orange"` cho section.
- **Khi conditional omit:** adjacency đổi (§22) → Black/Grey có thể biến mất khỏi chuỗi; **không** ép giữ khối màu rỗng; whitespace đủ thay divider. **Không** invent surface thứ năm, **không** xen màu máy móc.

## 24. Typography-layout relationship

Không quyết định lại typography token (D48; per-role pixel Deferred, contract §7). Chỉ ánh xạ layout requirement:

- Heading measure: h1 (statement) ≤17ch; body 68ch; section title tự do trong container.
- Long Vietnamese heading: line-height rộng cho dấu (body 1.7); kiểm dấu hoa (Ế/Ữ) trước letter-spacing âm; Hero line-break **art-direct riêng desktop/mobile**.
- Pillar label width / CTA label width: đủ chứa nhãn thật, không cắt; no text overflow ở 320px.
- Metadata: tabular-nums **chỉ** khi metric/ngày thật; placement inline dưới title (S2).
- Giữ: Geist Sans only · no visible Geist Mono · không mặc định weight 700 (ưu tiên 600) · không italic metric · không uppercase dài. **Không** khóa pixel mới (deferred → §B.1).

## 25. Image and artifact slot behavior

**Không thêm image.** Chỉ chuẩn bị behavior khi asset thật xuất hiện (contract §11, Bible 08):

| Slot | Section | Aspect intent | Caption/label | No-asset behavior | Mobile | Breakout |
|---|---|---|---|---|---|---|
| Portrait | S1 | dọc ~4/5 | ai/khi | **omit slot** (không frame rỗng, không reserve blank) | dưới statement | không |
| Article cover (optional) | S2 | theo nội dung | — | mặc định ẩn (text-first) | theo section | không |
| Case artifact | S3 | ngang ~16/10 | là-gì/vai-trò | **S3 omit nếu thiếu** (D55); không frame rỗng | trên copy | **được phá `wide`** (chỉ artifact) |
| Public metrics | S3 | — | nguồn/ghi chú | narrative định tính, **không số giả** | stack | không |

- **Cấm:** reserve blank fixed frame · force image lên text-first section · stock/AI evidence · generic browser mockup · decorative illustration lấp chỗ trống · biến placeholder thành UI thật. Aspect/caption/crop **không** hardcode ở 1.4B khi chưa có asset.

## 26. Layout ownership matrix

| Concern | page.tsx | globals.css | Component | Forbidden ownership |
|---|---|---|---|---|
| semantic DOM | ✅ | — | — | style ép cấu trúc |
| section order | ✅ | — | — | reorder bằng CSS `order` |
| conditional rendering | ✅ (boolean thật) | — | — | hidden-CSS thay omit |
| `data-surface` attr | ✅ (S3=black, S5=grey khi render) | đọc (layer surfaces) | — | surface color hardcode |
| container class hook | ✅ (`.container-*` wrapper) | ✅ định nghĩa (layer layout) | — | width cứng trong component |
| grid/composition class | ✅ (hook role-based) | ✅ định nghĩa (layer layout) | — | inline grid |
| spacing/rhythm | — | ✅ (layer layout, §B.2) | — | margin tùy tiện |
| alignment | — | ✅ (layer layout) | — | per-section tùy ý |
| responsive behavior | — | ✅ (layer responsive, §B.9) | — | local breakpoint drift |
| accessibility | ✅ (skip-link/landmark/lang — đã có) | ✅ (layer accessibility) | — | a11y layer làm generic override |
| content state | ✅ (data thật) | — | — | fixture/mock |

Nguyên tắc (OD-CSS-1/6): **page.tsx giữ semantics + content + composition hooks**; **globals.css giữ layout/system CSS trong đúng @layer**; **không component mới** (Home skeleton inline); **không** inline style / CSS-in-JS; **không** CSS Module cho page-level layout (architecture khóa global-layered — CSS Modules chỉ cho component scope, Home chưa introduce); **không** utility soup.

## 27. Class naming preparation

Convention role-based (css-arch §6): `--<domain>-<slot>` (property) · `.container-<name>` / `.rail-<name>` (layout) · `.<component>` (role). **Không** class thật ở checkpoint này — chỉ đề xuất, mỗi class có consumer rõ.

| Nhóm | Class đề xuất | Consumer |
|---|---|---|
| page shell | *(dùng `<>` fragment, không wrapper thừa)* | — |
| container | `.container-content` `.container-prose` `.container-wide` (`full` = surface wrapper) | S0/S4/S6/S7 · S2 · S3/S5 |
| composition/rail | `.rail-split` (S0/S7) · `.rail-asymmetric` (S1/S3) · `.rail-balanced` (S5) · `.stack-centered` (S6) | section root |
| section (đã có ở page.tsx) | `.site-header .hero .featured-writing .featured-case-study .pillar-map .work-with-me .contact-cta .site-footer` | từng section |
| content block (đã có) | `.wordmark .eyebrow .hero-actions .article-list .pillars .contact-actions` | trong section |
| evidence frame | `.evidence-frame` (S3, signature radius ≤1) | S3 artifact |
| navigation | `.primary-nav .footer-nav .footer-connect` (đã có) | nav |
| CTA | *(composition — dùng accent token, không class `.card`)* | S6/S1 |

**Cấm:** BEM enterprise quá mức · utility-first · tên màu trong class (`.orange-*`) · tên vị trí brittle (`.left-column-2`) · generic `.card` · hàng chục class/section · component alias mới.

## 28. CSS layer ownership

@layer order hiện có (globals.css, LOCKED OD-CSS-4): `reset, tokens, base, layout, surfaces, components, states, utilities, responsive, accessibility`. Nơi đặt rule ở 1.4B:

| Rule loại | Layer | Ghi chú |
|---|---|---|
| container (`.container-*`) | `layout` | max-width/inset/measure từ token |
| page/section layout (rail/grid/stack) | `layout` | composition, không màu |
| section spacing/rhythm | `layout` | §B.2 thang |
| surface placement (`[data-surface]` re-map) | `surfaces` | đã có 4 block; không thêm layout |
| nav/CTA presentation | `components` (nếu cần) hoặc để composition | không primitive trực tiếp |
| responsive stack/reflow | `responsive` | media-query §B.9; sau utilities |
| a11y (focus/skip/reduced-motion) | `accessibility` | đã có; chỉ a11y |

**Cấm:** layout vào `tokens` · responsive patch vào `utilities` · component styling vào `base` · duplicate selector xuyên layer · `!important` (trừ a11y đã khóa, có comment) · **tạo layer mới** · **đổi layer order**.

## 29. Accessibility layout contract (checklist cho 1.4B)

☐ DOM order không đổi (S0→S7) · ☐ focus order = DOM · ☐ **no CSS `order`** đảo logic · ☐ reflow 320px không overflow · ☐ zoom 200% đọc được · ☐ readable **không CSS** (skeleton giữ nghĩa) · ☐ visible focus không bị clip/che (đặc biệt Header vs skip-link) · ☐ skip-link tới `#main-content` không bị Header che · ☐ touch target ≥44px (nav/CTA mobile) · ☐ text spacing đủ (VN dấu) · ☐ no fixed-height cắt nội dung · ☐ **no viewport-locked Hero** · ☐ no content overlap · ☐ heading không bị decoration làm mất nghĩa · ☐ link nhận biết được ngoài màu (nếu cần underline/hairline) · ☐ surface contrast giữ đúng token (§B.8; muted-on-Grey/Black đo ở contrast checkpoint) · ☐ reduced-motion giữ · ☐ no hidden essential content theo viewport · ☐ no duplicate mobile DOM.

## 30. Performance constraints

Layout 1.4B phải CSS-first, Server-Component-friendly. **Tránh:** JS đo viewport · client component chỉ để layout · ResizeObserver không cần · hydration-dependent layout · layout shift do font (dùng `font-display: swap` + self-host, đã có geist) · fixed image dimension giả · huge CSS bundle · duplicated media-query · deep selector (>2 cấp) · container query tùy tiện (Deferred) · scroll listener · animation library · runtime class generation. Giữ `page.tsx` là **Server Component** (không `"use client"`).

## 31. Anti-pattern gate

Chặn ở 1.4B: one-container-for-all · equal spacing · equal section rhythm · 50/50 symmetry hàng loạt · feature grid · card explosion · bento · dashboard · hero-split template · giant centered heading · giant/floating CTA · fake full-screen band · repeated image ratio · same treatment mỗi section · dark/light alternation · gradient/glass/glow · rounded-everything/excessive-radius · generic startup layout · magazine clone · portfolio gallery · page-builder · CSS utility soup · layout hidden in component · viewport-duplicated markup · desktop shrink · horizontal overflow · arbitrary breakpoint · nth-child layout phụ thuộc vị trí content · negative-margin hack · transform-based layout · absolute positioning cho content chính · empty media column · placeholder-driven composition. *(Detection heuristic đầy đủ ở contract §15 + css-arch §17 — chạy khi có UI.)*

## 32. Open decision audit

| Mục | Phân loại |
|---|---|
| Full-width = surface-only (S3/S5) | **governed (LOCKED)** — contract §4/§19 |
| Signature radius ≤1, chỉ evidence frame S3 (optional) | **governed (LOCKED)** — D49/contract §9 |
| S6 orange = CTA control only (không surface) | **governed (LOCKED)** — D47/contract §14 |
| S5 composition khi render = balanced two-region | **governed** — contract §5 |
| S3 artifact breakout | **governed (LOCKED)** — chỉ case artifact (§11) |
| Exact breakpoint pixel | **non-blocking deferred** → §B.9 (768/1024/1280 đã có) |
| Exact type size per-role | **non-blocking deferred** → §B.1 (clamp trong biên) |
| Divider vs whitespace | **implementation detail** — hairline optional, whitespace ưu tiên |
| Wide-viewport max behavior | **governed** — container cap + căn giữa |
| Header sticky | **non-blocking deferred** — layout-logic §2 cho phép; z-index Deferred; không bắt buộc 1.4B |
| Header mobile nav (hamburger interaction) | **non-blocking deferred** — 1.4B dùng semantic wrap/compact (no JS); hamburger cần MobileNavigation + JS + Owner xác nhận |
| Container query | **Owner/Deferred** — media query đủ MVP |
| Layout class naming (production) | **implementation detail** — đề xuất §27; exact naming Deferred (OD-CSS-8) |
| CSS ở globals.css (không CSS Module cho page) | **governed** — OD-CSS-1 |

**Không blocker cứng; không cần Owner decision mới** để bắt đầu 1.4B. Header sticky + hamburger interaction là hai mục lớn nhất còn mở nhưng **non-blocking** — 1.4B đạt "layout complete" bằng compact/wrap + no-JS; hai mục này thuộc checkpoint interaction/component sau (Owner quyết khi tới).

## 33. Implementation boundary for 1.4B

**Được sửa:** `src/app/page.tsx` (thêm container wrapper / composition className / `data-surface` cho S3-black, S5-grey khi render) · `src/app/globals.css` (điền `@layer layout` + `@layer responsive`, tinh chỉnh `@layer surfaces` nếu cần placement — **không** đổi token/order). `layout.tsx` **chỉ** nếu có layout-root requirement có nguồn.

**1.4B được:** thêm semantic layout hook/className · thêm `data-surface` (S3/S5) · thêm container wrapper (không phá semantics) · CSS layout trong đúng @layer · responsive CSS (§B.9) · section spacing (§B.2) · alignment · surface placement · mobile composition · giữ conditional rendering.

**1.4B chưa được:** final visual polish · image asset · animation/sound/signature interaction · decorative graphic · component mới · content mới · làm S2/S3/S5 public khi content chưa đủ · production route · sửa governance · commit/push/PR/tag (đến review gate).

**"Layout complete" ≠ "visual composition complete":**
- **Layout complete (mục tiêu 1.4B):** container/rail/grid hoạt động; surface placement đúng (S3 Black, S5 Grey khi render); spacing rhythm biến thiên đúng density curve; responsive stack mọi tier không overflow; DOM order giữ; conditional collapse nối nhịp; alignment nhất quán; a11y §29 pass; đọc được, không gãy.
- **Chưa (visual composition — checkpoint sau):** typographic scale polish cuối · evidence-frame treatment + signature radius application · Hero line-break art-direct hoàn chỉnh · micro-interaction/hover-active tinh · image/artifact treatment · orange marker tinh chỉnh · component anatomy hoàn thiện.

## 34. Review and acceptance test plan (cho 1.4B)

**Widths:** desktop 1280 / 1440 / 1920 · tablet 768 / 1024 · mobile 320 / 375 / 390 / 430.

**Kiểm:** current rendered state (S0/S1/S4/S6/S7); section adjacency; surface (S3 Black / S5 Grey khi render); container; text measure (68ch); nav wrapping; **no horizontal overflow** (320/375/390/430); DOM order; focus order/visible; zoom 200%; reduced-motion; no layout shift; **no two-peak conflict**; no equal-spacing (≥4 section trùng padding = cờ đỏ); no empty section; conditional join (hiện tại S1→S4→S6).

**Synthetic local review cho S2/S3/S5** (không ship fake content): **temporary local-only** flip biến `featuredWriting`/`featuredCaseStudy`/`servicesOffered` sang dữ liệu review trong phiên dev **rồi revert trước commit** — hoặc preview cục bộ. Bắt buộc: **không** commit fake data · **không** ship · **không** đổi content status (CONTENT_INVENTORY) · **không** tạo fixture file lâu dài. Ghi rõ đã revert trong report 1.4B.

## 35. Risks

1. **Content gate (đường găng):** S2/S3/S5 omit ở trạng thái A → layout phải verify **cả** trạng thái B bằng synthetic local review (§34), nếu không risk "layout chỉ đúng khi rỗng". Non-blocking nếu theo §35.
2. **Two-peak khi chỉ S3 render (tổ hợp #3/#7):** cần cognitive rest giữa Hero&Case — nếu quên → hai peak liền kề. Xử lý §22.
3. **Surface omit adjacency:** Black/Grey biến mất khỏi chuỗi khi omit → không ép giữ khối màu rỗng (§23).
4. **Header sticky + hamburger:** non-blocking deferred; nếu 1.4B cố dựng interaction → vượt scope. Giữ no-JS compact/wrap.
5. **Deferred pixel (breakpoint/type):** dùng §B.9/§B.1, không tự chọn giá trị khác → tránh drift.
6. **Equal-spacing/AI-look:** rhythm phải biến thiên (§17); risk nếu áp cùng padding — chống bằng density curve.

## 36. Readiness verdict

**READY WITH NON-BLOCKING DEFERRED DETAILS** — page-level thesis, container, grid/rail, section width, surface placement, rhythm/density, alignment, visual weight, breakpoint, mobile composition, conditional-collapse, surface transition, ownership, layer, a11y, anti-pattern đều khóa/governed từ canonical; deferred (exact breakpoint/type pixel, header sticky, hamburger interaction, container query, divider) đều **non-blocking**, quay về §B/Owner khi tới; không governance conflict, không cần Owner decision mới để bắt đầu 1.4B.

## 37. Handoff to 1.4B

1.4B triển khai layout trong `src/app/page.tsx` (container/rail/`data-surface`/composition hooks) + `src/app/globals.css` (`@layer layout` + `@layer responsive`, tinh chỉnh `surfaces` placement): container 4-tier (§5), rail per section (§6), surface S3-Black/S5-Grey (§23), rhythm density curve (§17), alignment (§18), responsive §B.9 (§20), mobile composition (§21), conditional collapse (§22) — **không** image/animation/component/content-giả/route/governance. Verify: lint/typecheck/build/runtime + a11y §29 + acceptance test §34 (gồm synthetic local review đã revert). Rồi review → commit checkpoint. **Đạt "layout complete", chưa "visual composition complete" (§34).**
