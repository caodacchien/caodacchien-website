# Homepage Visual Implementation Contract

> **Planning/specification only (Checkpoint 0.5C).** Không CSS/Tailwind/React/component production/animation. Hợp đồng này đủ để một developer khác triển khai giao diện Homepage mà không phải tự suy đoán art direction.
>
> **Giá trị số là canonical từ `COMPONENT_INVENTORY.md` (§B) + `DECISION_LOG` (D46–D55).** Tài liệu này **không tạo value mới** — chỉ ánh xạ giá trị đã khóa vào từng section + logic "vì sao". Khi cần một con số, trỏ về Component Inventory.

---

## 1. Contract Status

- **Checkpoint:** 0.5C — Homepage Visual Implementation Preparation.
- **Nguồn đầu vào:** IA (D25/D27/D51), Editorial Blueprint (0.4B), Viewport Storyboard (0.4C), Wireframe Spec/Artifact (0.4D/0.4E), Layout Logic (0.4F), Semantic HTML (0.5A), Review/Audit (0.5B).
- **Tài liệu thẩm quyền (thứ tự):** DECISION_LOG → Design Bible → DESIGN_SYSTEM → COMPONENT_INVENTORY → homepage planning artifacts → (source không phải nguồn quyết định).
- **Phạm vi:** chỉ Homepage; chỉ tài liệu Markdown.
- **Chưa được phép triển khai:** CSS/Tailwind/React/Next.js/component production/animation/screenshot/prototype.
- **Owner decisions đã khóa:** Geist Sans-only (D48) · section-based 4-color, không light/dark toggle (D46/D47) · radius R3 (D49) · 18 component (D33/D46) · `/topics/` hub (D51) · GitHub deferred (D52) · kênh Email/LinkedIn/RSS (D53) · S5 conditional (D54) · featured threshold (D55) · spine S0–S7.
- **Owner assets còn thiếu:** positioning statement, bio, ảnh chân dung, ≥1 kinh nghiệm, ≥1 project, 3–5 bài, case + metrics công khai, servicesOffered, LinkedIn URL (xem §17).

## 2. Design Thesis

Homepage là **cửa vào tổng hành dinh số của một Marketing Leader xây hệ thống** — nơi CEO/founder *đánh giá cách nghĩ* trước khi nhìn việc đã làm (D21/§6b). Trang chứng minh **chiều sâu chiến lược, trí tuệ vận hành, thẩm quyền biên tập, sự tự tin điềm tĩnh** bằng **cấu trúc, tiết chế và bằng chứng** — không bằng trang trí. Nguyên tắc vận hành: *ít chiến dịch hơn, nhiều hệ thống hơn.*

Không agency template (không case-parade/testimonials), không SaaS (không feature-grid/KPI-tile/CTA-obsession), không "AI-generated website" (không bento/equal-spacing/gradient/giant-ghost). Human specificity đến từ quan điểm, cách sắp bằng chứng và câu chữ của Cao Đắc Chiến — mỗi trang phải **fail Replace-name test** nếu đổi tên.

## 3. Page-Level Visual Grammar

| Thuộc tính | Khóa | Vì sao |
|---|---|---|
| Visual weight | S3 Case = 9 (đỉnh duy nhất); S1 Hero = 8; còn lại 2–6 | evidence là bằng chứng cần níu; Hero là định vị |
| Density curve | thoáng(S1)→trung(S2)→nặng(S3)→nghỉ(S4)→trung(S5)→gọn(S6) | biến thiên chống AP-6/AP-7; hai đỉnh không liền kề |
| Tension/release | căng ở S1/S3/S5, thả ở S2/S4/S6 | không hai vùng căng liên tiếp |
| Asymmetry | S1 & S3 bất đối xứng (60/40), không 50/50 | tạo trọng lượng, chống AP-10 |
| Reading momentum | mở nhanh → chậm ở evidence → tăng ở CTA | dẫn mắt xuống |
| Evidence hierarchy | T1 Writing < T2 Case < T3 artifact < T4 metric, hội tụ ở S3 | evidence-first (P1) |
| Text/image ratio | Hero ~30/70 (text trội), Case ~ evidence trội, còn lại text-first | ảnh là bằng chứng, không trang trí (P3/Bible 08) |
| Attention anchors | **đúng 1 primary/section** (+1 secondary) | không cạnh tranh |
| Signature gestures | **1 memorable moment toàn trang = Hero** | Editorial Intelligence Rule 2 |
| Black surface | **1 khối tối duy nhất = S3** | giữ tỷ lệ ~18–25% |
| White | surface đọc chính (S0–S2, S4, S6, S7) | điềm tĩnh, sáng |
| Grey | chuyển nhịp/supporting = S5 | tách lời mời, không long-form |
| Black | statement/evidence peak = S3 | tension đúng nơi cần níu |
| Orange | focal accent: 1 CTA (S6) + 1 marker (S1) | budget D47 |

## 4. Container System

Bốn container canonical (`COMPONENT_INVENTORY §B.3`), **không** một container cho mọi section (D36):

| Container | Bề rộng (canonical) | Dùng ở section |
|---|---|---|
| `container-prose` | ~68ch | S2 (đọc), body long-form |
| `container-content` | ~1080px | S0 header, S4 pillar, S6 CTA, S7 footer |
| `container-wide` | ~1280px | S3 case (evidence thở rộng), S5 |
| `container-full` | 100% | **chỉ nền/surface** tràn viền (S3 Black, S5 Grey) — **nội dung bên trong vẫn bám `wide` container**, không sát hai cạnh viewport |

- **Viewport ranges:** mobile base · tablet 768 · desktop 1024 · wide 1280 (+640/1536 phụ) — `§B.9`.
- **Edge padding:** lề ngoài `space-5` mobile / `space-7` desktop; gutter 24px (`§B.3`).
- **Editorial reading measure:** 68ch **bất biến** xuyên breakpoint (chỉ padding co).
- **Wide evidence measure:** S3 dùng `wide` để artifact thở; copy trong S3 vẫn giữ measure hẹp.
- **Split composition:** S1, S3 (asymmetric); S5 (hai vùng), S0/S7 (hai cột).
- **Alignment rails / inset:** xem §5.
- **Nested container rule:** full-width surface (S3/S5) là **nền**; nội dung bên trong đặt trong `wide` container — **không** lồng rounded card trong card.
- **Full-width clarification (S3/S5) — bắt buộc:** full-width **chỉ** áp dụng cho **surface/background**. Text, component và evidence **vẫn nằm trong `wide` container**; **không** mặc định kéo sát hai cạnh viewport. **Chỉ evidence artifact được chỉ định rõ** (case artifact ở S3, xem §11) mới có thể phá container. **Không** biến S3 hoặc S5 thành generic full-screen landing-page band.
- **Được phá container:** duy nhất evidence artifact được chỉ định rõ ở S3; nền tối/grey tràn viền nhưng nội dung không tràn.
- **Không được phá container:** cột đọc (S2), pillar list (S4), CTA (S6), text/headline của S3/S5, mọi component — luôn trong content/prose/wide.

## 5. Grid and Alignment System

Grid 12 cột, gutter 24px (`§B.3`). Mô tả rail theo section (không chỉ "12-column"):

| Section | Grid/rail | Alignment | Vì sao |
|---|---|---|---|
| S0 Header | full-width content, split | tên trái-rail / nav phải-rail | hạ tầng, cân hai biên |
| S1 Hero | asymmetric ~7/5 (text/evidence) | text bám **left rail**; evidence lệch phải | statement trội, tạo asymmetry |
| S2 Writing | single column trong prose | left, không center đoạn dài | đọc tự nhiên |
| S3 Case | asymmetric ~7/5 (artifact/copy) | artifact bám left-rail lớn; copy phải | evidence trội, khác kiểu khung Hero |
| S4 Pillar | full-width content, hàng ngang | 5 mục theo baseline chung | bản đồ, quét ngang |
| S5 Work | hai vùng cân (phù-hợp/chưa) | balanced split | đối sánh song song |
| S6 CTA | centered trong content | center, cô lập | một tiêu điểm hành động |
| S7 Footer | two-column | trái nav / phải connect | hạ tầng |

- **Baseline relationships:** heading và metadata căn cùng baseline trong cùng khối.
- **Text-to-image alignment:** trong S1/S3, mép trên của evidence căn với baseline của heading (không thả trôi).
- **Intentional misalignment:** cho phép ở Hero (evidence lệch phải khỏi lưới đều) để tạo tension — có chủ đích, không ngẫu nhiên.
- **Evidence frame alignment:** S3 artifact bám left rail của `wide`, không center. **S3/S5 full-width là nền**; text/component/metric của S3 và S5 **nằm trong `wide`**, không sát cạnh viewport. Chỉ case artifact ở S3 (nếu được chỉ định) mới có thể vượt `wide` — không áp dụng cho headline, copy hay component khác.
- **Footer alignment:** hai cột bám hai biên content.

## 6. Section Surface Contract

Section-based (D46/D47); giá trị màu canonical `§B.8`. Không gradient/glass/glow/heavy shadow (C6).

| S | Surface | fg | muted | border | accent permitted | accent prohibited | visual role | narrative role |
|---|---|---|---|---|---|---|---|---|
| S0 | White `#FBFBFB` | `#040404` | `#6E6E6E` | `#DEDEDE` | link hairline đen | cam nav | khung | mở |
| S1 | White | `#040404` | `#6E6E6E` | `#DEDEDE` | **1 CTA cam** + focus | cam body/underline dày | memorable moment | định vị |
| S2 | White | `#040404` | `#6E6E6E` | `#DEDEDE` | link hairline đen | cam trang trí | đọc | cách nghĩ |
| S3 | **Black `#040404`** | `#FBFBFB` | `#8A8A8A` | `#3A3A3A` | accent-text o-500 `#FF4000` (1 marker) | cam body nhỏ | **evidence peak** | kết quả |
| S4 | White | `#040404` | `#6E6E6E` | `#DEDEDE` | link hairline | cam mọi trụ | bản đồ | năng lực |
| S5 | **Grey `#DEDEDE`** | `#040404` | `#555555` | `#B0B0B0` | link hairline; accent-text o-800 `#A62800` nếu cần | cam nền | supporting | mời |
| S6 | White | `#040404` | `#6E6E6E` | `#DEDEDE` | **1 CTA cam** (chuyển đổi) + focus | CTA thứ hai cạnh tranh | action | hành động |
| S7 | White | `#040404` | `#6E6E6E` | `#DEDEDE` | link hairline | cam | hạ tầng | kết |

- **Border behavior:** phân tầng bằng viền 1px (light); trên Black (S3) phân tầng bằng độ sáng bề mặt, không đổ bóng (`§B.5`).
- **Transition behavior:** ranh giới đổi mục đích dùng Major rhythm; White→Black (S2→S3) là chuyển tối tạo tension; Black→White (S3→S4) là "thở ra".
- **Elevation:** 2 mức (`§B.5`), không shadow trang trí.
- **Full-width (S3/S5):** chỉ **surface/background** tràn viền. **S3 là black evidence peak**, **S5 là Grey supporting transition** — không phải full-screen landing band. Nội dung (text/component/metric) nằm trong `wide` container; chỉ evidence artifact được chỉ định ở S3 có thể phá container (§4/§5/§11).

## 7. Typography Implementation Contract

Geist Sans **duy nhất** (D48). Scale/measure/line-height canonical `§B.1`. Role phân biệt thật:

| Role | Mục đích | Scale (ref §B.1) | Weight | Line-height | Measure | Letter-spacing | Casing | Line-break | VN |
|---|---|---|---|---|---|---|---|---|---|
| Wordmark | danh tính | ~sm/lg | 600 | 1.2 | — | 0 | sentence | — | — |
| Display statement (Hero h1) | định vị | h1 (45/34) | 600 (không 700) | 1.15 | ≤17ch | ≤−0.01em (kiểm dấu hoa Ế/Ữ) | sentence | **art-direct riêng desktop/mobile** | dấu cần thở |
| Page title | tiêu đề trang | h1/h2 | 600 | 1.15 | — | ≤−0.01em | sentence | — | — |
| Section title (h2) | mục cấp trang | h2 (36/28) | 600 | 1.15 | — | 0 | sentence | — | — |
| Project title (h3, S3) | case | h3 (28/24) | 600 | 1.2 | — | 0 | sentence | — | — |
| Article title (h3, S2) | bài | lg/h3 | 600 | 1.2 | — | 0 | sentence | — | — |
| Body long-form | đọc | body (19/17) | 400 | 1.7 | 68ch | 0 | sentence | — | dấu chồng cần lh rộng |
| Metadata | ngày/reading-time | xs/sm (14–16) | 450–500 | 1.5 | — | 0–0.02em | sentence | — | tabular-nums |
| Label/eyebrow | nhãn ngắn | xs (14) | 450–500 | 1.5 | — | 0–0.02em | **sentence, không uppercase dài** | — | — |
| Navigation | nav | sm (16) | 500 | 1.5 | — | 0 | sentence | — | — |
| Button | CTA | sm (16) | 600 | 1.2 | — | 0 | sentence | — | — |
| Metric (S3) | số kết quả | h3/h2 | 600–700 | 1.1 | — | 0 | — | — | **tabular-nums** |

**Bắt buộc:** không Geist Mono · không slashed zero · metric tabular-nums · không uppercase dài · không italic cho metric · **không mặc định 700 cho mọi heading** (ưu tiên 600) · tránh heading kiểu SaaS landing · **Hero line-break art-direct riêng mobile**.

**Typography implementation status — Deferred implementation detail (KHÔNG phải Owner Decision):** giá trị typography cuối theo từng role sẽ được **ánh xạ thành responsive typography token tại checkpoint triển khai tiếp theo**, nhưng **bắt buộc nằm trong hierarchy, role, weight range, line-height intent, measure và Vietnamese constraints đã khóa** trong contract này (+ `§B.1`). **Owner không cần duyệt từng pixel font-size ở checkpoint này.** Các ràng buộc đã khóa (Geist Sans-only · không Geist Mono · metric tabular-nums · không slashed zero · không mặc định weight 700 · Hero mobile line-break riêng) **giữ nguyên**.

## 8. Spacing and Whitespace Contract

Thang canonical `§B.2` (base 4px). **Không** một spacing lặp cơ học (D36/AP-6). Section rhythm ngữ nghĩa: Major `space-9..10` (96–128) · Standard `space-7..8` (48–64) · Compact `space-5..6` (24–32).

| Yếu tố | Quy tắc |
|---|---|
| Page padding | lề `space-5` mobile / `space-7` desktop |
| Section boundary | Major giữa khối đổi mục đích (S2↔S3, S3↔S4); Standard trong nhóm |
| Section internal | Compact giữa title↔nội dung |
| Title→body | Compact (`space-5`) |
| Text→evidence (S1/S3) | Standard |
| Quiet whitespace | cao ở S1, S4, S6 (silence cạnh weight) |
| Cognitive rest | S4 là vùng nghỉ chính; whitespace lớn |
| Transition spacing | Major ở ranh giới tension (White→Black) |
| Evidence peak (S3) | whitespace **thấp** có chủ đích (mật độ cao) |
| Footer | Standard, tiết chế |
| Mobile compression | co theo rhythm; giữ 68ch measure; không dồn phẳng |

**Mật độ theo section:** thưa = S1/S4/S6; chặt = S3; pause = S4; tension = S1/S3/S5. **Không** section nào dùng spacing giống hệt section kề.

**Detection rule (chạy khi có UI):** equal-spacing-everywhere (≥4 section trùng padding) · centered-block-repetition · repeated-section-rhythm (≥3 nhịp giống) · excessive-empty-space (whitespace không cạnh weight) · decorative-whitespace-không-phục-vụ-đọc → cờ đỏ.

## 9. Radius and Shape Contract

Contract R3 (D49, `§B.4`) — **không value mới**:

| Archetype | Radius | Dùng ở Homepage |
|---|---|---|
| control | 8–10px | button, input |
| card | 12–16px | ContentCard (S2/S3) |
| panel | 20–28px | khối lớn nếu cần |
| signature | 36–48px | tối đa **1–2 object/viewport**, có chủ đích |
| pill | 999px | chỉ tag/chip có ngữ nghĩa |

**Bắt buộc:** full-width section (S3 Black, S5 Grey) **không** bo · không nested rounded card · không card explosion · không capsule mọi button · **không radius lớn kiểu "AI website signature"**.

**Signature-radius decision (LOCKED):**
- Homepage được phép **tối đa 1 signature-radius object**.
- **Vị trí duy nhất:** evidence frame bên trong **S3 — Featured Case Study**.
- **Không** áp dụng signature radius cho toàn bộ section.
- **Không** dùng signature radius ở **S5, S6, Footer hoặc CTA**.
- **Optional:** có thể **không** dùng nếu asset thật không phù hợp — đây là *maximum allowance*, không phải yêu cầu bắt buộc.
- ContentCard = card radius; Hero/CTA composition dùng control radius cho button.

## 10. Component Presentation Rules

Chỉ **18 component** (D33/D46). Homepage dùng subset:

| Component | Section | Visual role | Content req | Layout | Variants | Surface | Radius | Hierarchy | Mobile | Prohibited |
|---|---|---|---|---|---|---|---|---|---|---|
| `Header` | S0 | nav + danh tính | nav 5 mục | full-width split | — | White | control (nếu control) | top | → MobileNavigation (hamburger) sau | theme toggle, CTA nổi |
| Hero *(composition)* | S1 | memorable moment | statement + CTA | asymmetric split | — | White | control (button) | h1 | stacked, line-break riêng | dashboard, ghost text, gradient |
| `ContentCard` (article) | S2 | bài featured | title/excerpt/meta | prose column + list | article | White | card | h3 | stacked | card explosion |
| `ArticleMeta` | S2 | metadata | ngày/reading-time | inline | — | White | — | meta | wrap | mono |
| `Label` | S2/S4 | trụ/nhãn | text | inline | pillar | White | pill (chỉ khi filter thật) | eyebrow | — | uppercase dài |
| `ContentCard` (caseStudy) | S3 | case featured | context/…/result | asymmetric evidence/copy | caseStudy | Black | card | h3 | artifact-trên-copy | fake KPI |
| `MetricGroup` | S3 | số kết quả | metric được phép | inline group | — | Black | — | metric | stack | số giả |
| `PillarMap` | S4 | 5 trụ | 5 nhãn + link | horizontal list | — | White | — | h3/list | vertical | card grid |
| `WorkWithMeBlock` | S5 | khối hợp tác | servicesOffered | two-region | — | Grey | control (button) | h2 | stacked | pricing/scarcity |
| `Footer` | S7 | hạ tầng | nav + connect | two-column | — | White | — | — | collapse | theme toggle, logo wall |
| `StatusMessage` | S2/S3 | empty-state | narrative | inline | empty | White | — | — | — | fake fill |
| CTA *(composition)* | S6 | action | 1 CTA + 1 link | centered | — | White | control | h2 | full-width button | CTA thứ hai |

`ContactForm` **không** ở Home (thuộc `/contact/`). **Không sinh component mới.**

## 11. Evidence and Imagery Treatment

Bible 08 + D55. Không ảnh trang trí, không stock/AI làm bằng chứng.

| Loại | Vai trò | Aspect intent | Caption | Label | Placeholder behavior | Mobile | Khi nào ẩn |
|---|---|---|---|---|---|---|---|
| Portrait | danh tính (S1) | dọc ~4/5 | ai/khi | `OWNER ASSET REQUIRED` | neutral frame + nhãn, **không** img rỗng | xuống dưới statement | luôn cần asset |
| Editorial image | minh hoạ biên tập | theo nội dung | có | — | neutral | theo section | tùy chọn |
| Article artifact | bài | tùy chọn (P3) | — | — | không bắt buộc | — | mặc định ẩn |
| Case artifact (dashboard/report/before-after/diagram) | evidence (S3) | ngang ~16/10 | là gì/vai trò/chú ý gì | `OWNER ASSET REQUIRED` | neutral frame + nhãn | artifact-trên-copy | S3 omit nếu chưa đủ (D55) |
| Public metrics | kết quả (S3) | — | nguồn/ghi chú | `OWNER ASSET REQUIRED` | narrative, **không số giả** | stack | ẩn khi chưa được phép (D6) |
| Owner-only placeholder | chỗ dành sẵn | — | mô tả asset cần | nhãn rõ | không ngụy trang thành thật | — | production omit |

**Bắt buộc:** ảnh chân dung là Owner asset; case artifact là bằng chứng dự án; số liệu phải có nguồn/được phép công khai; không kiến trúc/bánh răng/dashboard nếu không liên quan nội dung thật; không biến placeholder thành UI thật.

## 12. Responsive Composition Contract

Không thu nhỏ desktop (P12/D44). Breakpoint `§B.9`.

| Breakpoint | Reading order & composition |
|---|---|
| **Standard desktop (≥1280)** | Hero statement + evidence cạnh nhau; Case artifact/copy 60/40; 5 trụ ngang; nav 5 mục ngang |
| **Narrow desktop (1024–1280)** | như trên, `content` thay `wide`; evidence Hero nhỏ lại |
| **Tablet (768–1024)** | evidence Hero dời xuống; Case chuyển gần-dọc; nav rút gọn; trụ wrap 2 hàng |
| **Mobile 390** | (1) Hero **statement line-break riêng**; (2) CTA full-width; (3) thứ tự S0→S7 giữ; (4) Case artifact **trên** copy; (5) trụ dọc; nav → hamburger (MobileNavigation) |
| **Small mobile (<390)** | như 390, co scale theo clamp; giữ 68ch → padding co; không giant heading |

Mỗi breakpoint: reading-order giữ narrative; stacking dọc trên mobile; hero line-break art-direct; CTA full-width mobile; case evidence trước copy; pillar dọc; footer collapse hai cột → xếp; touch target ≥44px; focus order = source order.

**S3/S5 mọi breakpoint:** surface tràn viền là **nền**; text/component/metric của S3 và S5 luôn trong `wide` (mobile trong content/prose với lề chuẩn), **không** kéo sát cạnh viewport ở bất kỳ breakpoint nào. Chỉ case artifact ở S3 giữ quyền phá container; trên mobile artifact xếp **trên** copy nhưng vẫn tôn trọng lề, không full-bleed vô nghĩa.

**Không cho phép:** horizontal overflow · desktop crop bị bóp · giant heading không kiểm soát · card stack dài · repeated CTA island · evidence sau copy quá xa · footer thu nhỏ khó đọc.

## 13. Interaction and Motion Boundaries (planning only)

`§B.6` + Bible 09. Trần 200ms; chỉ `opacity`/`transform`/`background-color`; `prefers-reduced-motion`.

| Yếu tố | Khóa |
|---|---|
| Hover intent | feedback nhẹ trên link/CTA; không layout shift |
| Focus | focus ring rõ hơn hover (`--color-focus-ring` = `#FF4000`); keyboard visible |
| Active/selected | state bằng border/scale nhỏ, không màu-only |
| Keyboard order | = source order (S0→S7) |
| Reduced motion | tôn trọng; tắt mọi transition không thiết yếu |
| Transition duration | 120–200ms (trần) |

**Giữ nguyên (cấm):** scroll reveal · parallax · auto-animation · decorative motion · cursor follower · magnetic button · animation che nội dung. Motion chỉ phục vụ feedback/orientation/continuity.

**Audio MVP boundary (rõ ràng):**
- Audio micro-interaction **nằm ngoài phạm vi Homepage MVP**.
- **Không phải blocker** cho visual implementation.
- **Không** triển khai audio file, sound state, audio package hoặc playback logic trong phase MVP.
- Chỉ xem xét lại **sau khi** website ổn định về content, accessibility, performance và interaction.
- Giữ tham chiếu lịch sử **D36** (Future Enhancement "Sound is feedback, not decoration") nhưng **không** đưa audio vào implementation handoff hiện tại (§20).

## 14. Section-by-Section Implementation Matrix

| S | Purpose | Primary | Secondary | Surface | Container | Alignment | Type roles | Evidence | Components | Vis weight | Density | Whitespace | Radius | CTA | Orange | Mobile | Conditional | Owner asset | Prohibited |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S0 | header/nav | wordmark | nav | White | content | split | wordmark/nav | — | Header | 2 | thấp | cao | control | 0 | 0 | hamburger | required | — | theme toggle |
| S1 | định vị | statement | CTA | White | asymmetric | left+lệch | display/eyebrow/body | portrait slot | Hero comp | 8 | thấp | rất cao | control | 1 (secondary) | 1 CTA + marker | stacked, line-break riêng | required (+asset) | statement, ảnh | dashboard/ghost |
| S2 | cách nghĩ | article title | trụ/meta | White | prose | left | article/meta/label | bài (T1) | ContentCard(article), ArticleMeta, Label, StatusMessage | 5 | trung | trung | card | 0 | 0 | stacked | omit_when_empty (D55) | 3–5 bài | card explosion |
| S3 | kết quả | artifact/metric | project title | **Black** | wide | asymmetric | project/metric/body | case+artifact+metric (T2–4) | ContentCard(caseStudy), MetricGroup | 9 | cao | thấp | card | 0 | 1 marker | artifact-trên-copy | omit_when_empty (D55) | case+metric | fake KPI |
| S4 | năng lực | AI cho Marketing | 5 trụ | White | content | ngang | section/label | taxonomy | PillarMap | 5 | thấp | cao | — | 0 | 0 | dọc | required | — | card grid |
| S5 | mời | headline | phù-hợp | **Grey** | content/wide | balanced | editorial/body | servicesOffered (T5) | WorkWithMeBlock | 6 | trung | trung | control | 0 (link) | 0 | stacked | hidden_until_ready (D54) | servicesOffered | pricing |
| S6 | hành động | CTA button | link | White | content | centered | button/body | — | CTA comp | 4 | thấp | cao | control | **1 CTA chính** | 1 CTA cam | full-width | required | — | CTA thứ hai |
| S7 | hạ tầng | wordmark | nav/connect | White | content | two-col | metadata/nav | — | Footer | 2 | thấp | trung | — | 0 | 0 | collapse | required | LinkedIn URL | logo wall |

> **S3/S5 container note:** cột "Container" ghi `wide` (S3) / `content/wide` (S5) là **container của nội dung**. Surface tràn viền (full-width) chỉ là **nền màu** (Black/Grey); text/component/metric bám `wide`, không sát cạnh. Chỉ evidence artifact ở S3 có thể phá container (§4/§5/§6/§11). Không biến S3/S5 thành full-screen landing band.

## 15. Anti-AI Visual Review Gate (chạy sau khi có UI)

| # | Câu hỏi | Detection heuristic | Severity | Prevention | Evidence cần chụp |
|---|---|---|---|---|---|
| 1 | Equal spacing everywhere? | ≥4 section trùng padding dọc | High | section rhythm ngữ nghĩa | full-page + đo spacing |
| 2 | Section 50/50 lặp? | >1 section center-balanced | Medium | asymmetry mặc định | full-page |
| 3 | Card explosion? | >50% nội dung trong card / ≥3 card cùng cỡ | High | list/divider/typography | full-page |
| 4 | Bo góc lạm dụng? | radius ngoài R3 / mọi button pill | Medium | R3 archetype | close-up components |
| 5 | Giant heading gây ấn tượng? | heading vượt scale §B.1 | Medium | dùng h1 45/34 | Hero |
| 6 | Fake metric? | số không nguồn | Critical | evidence gate D55/D6 | S3 |
| 7 | Generic agency copy? | sáo ngữ (unlock/transform/elevate…) | High | voice §7 BRAND | copy review |
| 8 | Testimonial/logo wall? | có block đó | Critical | cấm (D18) | full-page |
| 9 | CTA quá nhiều? | >2 CTA/trang | High | trần D23/P8 | full-page |
| 10 | Giống SaaS landing? | Hero→Features→Testimonials | Critical | publishing flow D25 | full-page |
| 11 | Ảnh stock/AI trang trí? | ảnh không phải evidence thật | Critical | Bible 08 | evidence slots |
| 12 | Icon-in-every-card? | icon mọi mục / >12 icon | Medium | icon chức năng (C9) | full-page |
| 13 | Gradient/glow/glass? | có hiệu ứng đó | High | cấm C6 | grayscale |
| 14 | Bento/grid showcase? | lưới bento | High | editorial layout | full-page |
| 15 | Nhịp section lặp máy móc? | ≥3 nhịp giống | High | Editorial Rhythm | full-page |
| 16 | Có 1 memorable moment rõ? | đếm signature gesture | High (thiếu) | 1 = Hero | Hero |
| 17 | Có evidence peak rõ? | S3 nổi nhất? | High (thiếu) | Case = peak | S3 |
| 18 | Có tension/release? | density biến thiên? | Medium | curve §3 | full-page |
| 19 | Dấu vết cá nhân CĐC? | quan điểm/câu chữ riêng? | High (thiếu) | authorial fingerprint | copy |
| 20 | Đổi tên vẫn giữ nghĩa? | Replace-name test | Critical (fail) | fail bắt buộc | full-page |

## 16. Visual QA Evidence Plan (chụp ở phase triển khai — không phải bây giờ)

Screenshot bắt buộc: Desktop full-page · Desktop Hero · Desktop Case · **Desktop grayscale** · Tablet · Mobile full-page · Mobile Hero · Mobile navigation · Mobile Case · keyboard focus · reduced motion · **conditional S2 ẩn** · **conditional S3 ẩn** · **conditional S5 ẩn** · no-content fallback · typography Vietnamese test · long-heading test · long-metadata test. *(Không tạo screenshot ở checkpoint này.)*

## 17. Owner Asset Gate

| Asset | Section phụ thuộc | Production blocking? | Fallback hợp lệ | Fallback bị cấm | Deadline khuyến nghị | Người duyệt |
|---|---|---|---|---|---|---|
| Positioning statement | S1 | **Có** | — (H1 bắt buộc thật) | DRAFT public | trước 1.4 | Owner |
| Bio ngắn | S7/meta | Một phần | rút gọn | bịa | trước 1.4 | Owner |
| Portrait | S1 | Không (omit slot) | neutral frame nhãn | stock/AI | trước 1.4 | Owner |
| Project image / case artifact | S3 | S3 omit nếu thiếu | S3 ẩn | fake artifact | trước 1.4/1.5 | Owner (D6) |
| Public metrics | S3 | S3 metric ẩn | narrative định tính | số giả | trước 1.5 | Owner (D6) |
| 3–5 bài viết | S2 | S2 omit nếu <3 | S2 ẩn | placeholder card | trước 1.4/1.6 | Owner |
| Case-study copy | S3 | S3 omit | S3 ẩn | bịa | trước 1.5 | Owner |
| servicesOffered | S5 | S5 ẩn (D54) | S6 nối sau S4 | dịch vụ chung chung | trước 1.4 | Owner |
| LinkedIn URL | S7 | Không | Email + RSS | URL giả | tùy | Owner |
| RSS | S7 | Không | route contract | — | 1.6/1.8 | — |
| Contact content | S6/`/contact` | CTA trỏ `/contact` | — | fake form success | 1.7 | Owner |

## 18. Implementation Readiness Matrix

| Trục | Điểm | Ghi chú |
|---|---|---|
| Design governance | 10/10 | D1–D55, Bible v1.0 locked |
| IA readiness | 10/10 | spine + /topics/ locked |
| Content readiness | 3/10 | asset gate mở (§17) |
| Visual specification | 9/10 | contract này; vài value cuối chờ khóa ở §B.1 khi cần |
| Responsive readiness | 8/10 | composition từng breakpoint đã mô tả; cần verify khi dựng |
| Evidence readiness | 3/10 | phụ thuộc Owner asset |
| Component readiness | 10/10 | 18 component, mapping rõ |
| Accessibility readiness | 8/10 | semantic + focus/reduced-motion/touch/VN đã khóa; kiểm thật khi có UI |
| Anti-template protection | 9/10 | gate §15 chạy được |
| Production implementation readiness | 6/10 | governance/spec sẵn; chặn bởi content + cổng Phase triển khai |

## 19. Open Decisions

**Đã khóa — không mở lại:** Geist Sans-only · section-based surfaces · 4 màu Kinetic · không light/dark toggle · R3 · 18 component · D51–D55 · spine S0–S7 · **full-width = surface-only (S3/S5)** · **signature-radius ≤1, chỉ ở evidence frame S3**.

**Không còn Open Decision cần Owner quyết định ở checkpoint này.** Ba mục trước đây đã được xử lý:
1. **Typography values → Deferred implementation detail** (§7): không cần Owner duyệt pixel; ánh xạ thành responsive token ở checkpoint triển khai, trong hierarchy/role/weight/line-height/measure/VN đã khóa.
2. **Signature-radius → LOCKED** (§9): tối đa 1, **chỉ** evidence frame S3, optional (maximum allowance).
3. **Audio → ngoài phạm vi Homepage MVP** (§13): không blocker, không implement; chỉ xem xét lại sau khi content/a11y/performance/interaction ổn định (D36 historical).

## 20. Handoff to Visual Implementation

**Phase sau ĐƯỢC:** map semantic HTML → CSS architecture · tạo section layout · triển khai responsive · dùng 18 component đã khóa · thêm conditional rendering (D54/D55) · thêm asset thật khi Owner cung cấp · chạy QA (§15/§16).

**Phase sau KHÔNG ĐƯỢC:** đổi IA/narrative/thứ tự section · thêm component ngoài 18 · đổi palette/font · thêm global theme/toggle · tạo fake metric · thêm stock/AI evidence · tự sửa narrative · copy layout từ reference (Reference Philosophy: extract principles, never layouts) · tạo visual direction mới · commit/deploy production khi content chưa `READY` (D7) và chưa được Owner yêu cầu.
