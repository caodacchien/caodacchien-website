# Homepage Semantic Skeleton Preparation (1.3A)

> **Preparation only.** KHÔNG sửa source (page/layout/globals), KHÔNG component, KHÔNG CSS/layout/grid/image/animation, KHÔNG copy giả, KHÔNG commit. Chỉ đặc tả để 1.3B triển khai semantic skeleton.
>
> Đây **không** phải source-of-truth mới — chỉ tổng hợp từ canonical docs.

## 1. Status and scope

- Checkpoint 1.3A: đặc tả semantic skeleton (landmark, heading, section order, component mapping, content status, conditional rendering, route, a11y, reading order, boundary cho 1.3B).
- **Không** art-direction/grid/spacing/responsive-composition/card/image/animation (thuộc 1.3B/section-visual sau).
- Bám: spine D25/D27 + D51–D55; semantic đã dựng ở `homepage-semantic-html.html` (0.5A/0.5B); component 18 (D33/D46); routing flat (D57); hosting Cloudflare (D56).

## 2. Sources of truth

Decision Log (D25/D51–D57, D33/D46) · `homepage-visual-implementation-contract.md` · `homepage-wireframe-spec/artifact.md` · `homepage-layout-logic.md` · `homepage-semantic-html.html` · `homepage-visual-token-*` · `INFORMATION_ARCHITECTURE.md` · `PRODUCT_REQUIREMENTS.md` · `CONTENT_INVENTORY.md` · `COMPONENT_INVENTORY.md` · Design Bible · AI_RULEBOOK. **Hierarchy D50** áp dụng. **Path mapping:** IA thật = `docs/02-design/INFORMATION_ARCHITECTURE.md` (prompt ghi `01-product`); START_HERE = root.

## 3. Homepage spine S0–S7

| S | Section | Khóa bởi |
|---|---|---|
| S0 | Site Header | IA §2, D26 |
| S1 | Hero / Positioning Statement | D25.1 |
| S2 | Featured Writing | D25.2, D55 |
| S3 | Featured Case Study | D25.3, D55 |
| S4 | Pillar Map | D25.4, D16/D51 |
| S5 | Work With Me | D25.5, D18/D54 |
| S6 | Contact CTA | D25.6→D27 |
| S7 | Site Footer | IA §9 |

**Không conflict.** Spine immutable (D25/D27). Không thêm/xóa/đổi thứ tự/gộp/tách; không testimonials/logo-wall/feature-grid/metrics-section/newsletter/dashboard/gallery/About-section.

## 4. Semantic landmark matrix

| Section | Element gốc | Landmark | Accessible name | Heading | Lý do |
|---|---|---|---|---|---|
| S0 | `<header>` | banner | (implicit) | — | site header cấp trang |
| S0 nav | `<nav aria-label="Điều hướng chính">` | navigation | "Điều hướng chính" | — | phân biệt với footer nav |
| main | `<main id="main-content">` | main | — | — | **một** main, target skip-link |
| S1 | `<section aria-labelledby="hero-heading">` | region | qua h1 | h1 | memorable moment |
| S2 | `<section aria-labelledby="writing-heading">` | region | "Viết" | h2 | — |
| S3 | `<section aria-labelledby="case-heading">` | region | "Case study tiêu biểu" | h2 | evidence peak |
| S4 | `<section aria-labelledby="pillar-heading">` | region | "Chủ đề — 5 trụ" | h2 | — |
| S5 | `<section aria-labelledby="work-heading">` | region | "Làm việc cùng tôi" | h2 | — |
| S6 | `<section aria-labelledby="contact-heading">` | region | "Bắt đầu trao đổi" | h2 | — |
| S7 | `<footer>` | contentinfo | (implicit) | — | site footer |
| S7 nav | `<nav aria-label="Điều hướng phụ">` + `<nav aria-label="Kết nối">` | navigation | phân biệt | — | 3 nav toàn trang tên khác nhau |

**Một** main, **một** h1; nav labels phân biệt; section dùng `aria-labelledby` trỏ heading; **không** landmark thừa; **không** ARIA khi native đủ; email footer có thể dùng `<address>` cho contact semantics.

## 5. Heading hierarchy

```
h1  (S1 Hero — positioning statement)
├─ h2  Viết (S2)
│   └─ h3  [featured article title] · h3 · h3   (article title, đơn vị độc lập)
├─ h2  Case study tiêu biểu (S3)
│   └─ h3  [project title]
│       └─ h4  Bối cảnh · h4 Vấn đề · h4 Cách tiếp cận · h4 Kết quả
├─ h2  Chủ đề — 5 trụ (S4)
│   └─ h3 ×5  (pillar titles)
├─ h2  Làm việc cùng tôi (S5)
│   └─ h3  Phù hợp khi · h3 Có thể chưa phù hợp khi
└─ h2  Bắt đầu trao đổi (S6)
```
**1 h1** (S1) · S2–S6 = h2 · article/case/pillar item = h3 · case sub = h4 · **không nhảy cấp/heading rỗng/hidden-heading/heading-styling**. S0/S7 dùng landmark, không heading (wordmark = `<p>`/text). *(Khớp outline đã verify ở 0.5B.)*

## 6. Section purpose matrix

| S | Purpose | Reader question | Primary info | Secondary | Evidence req | CTA | Owner asset | Production condition | Graceful omission | Transition |
|---|---|---|---|---|---|---|---|---|---|---|
| S0 | danh tính + nav | "ai, đi đâu?" | wordmark | nav 5 mục | — | — | — | required | — | → Hero |
| S1 | định vị (memorable) | "nghĩ khác chỗ nào?" | statement | intro (ai/giá trị) | định vị thật + portrait slot | 1 CTA nhẹ | statement, ảnh | required | — | → Writing |
| S2 | cách nghĩ | "có gì đáng đọc?" | article title | trụ/meta | bài thật (T1) | link đọc | 3–5 bài | **omit-when-empty** (D55) | S1→S3 (chèn rest) | → Case |
| S3 | kết quả | "đo bằng gì?" | artifact/metric | project title | case+metric (T2–4) | link case | case/metric | **omit-when-empty** (D55) | S2→S4 | → Pillar |
| S4 | bản đồ tư duy | "mạnh vùng nào?" | trụ "AI cho Marketing" | 5 trụ | taxonomy thật | — | — | required | — | → Work |
| S5 | lời mời | "hợp tác được không?" | headline | phù/chưa-phù | servicesOffered (T5) | 1 link | servicesOffered | **conditional-hidden** (D54) | S4→S6 nối trực tiếp | → CTA |
| S6 | hành động | "bước tiếp?" | CTA button | 1 link | — | **1 CTA chính** | — | required | — | → Footer |
| S7 | hạ tầng | "đi tiếp đâu?" | wordmark | nav/connect | — | — | LinkedIn URL | required | — | kết |

## 7. Component mapping (18 đã khóa — không tạo mới)

| S | Semantic element | Existing component | Variant | Composition responsibility | New component? | Verdict |
|---|---|---|---|---|---|---|
| S0 | header/nav/ul/a | `Header` | — | — | **No** | ✅ |
| S1 | section+h1+p+a | *composition* (`Container`+`Label`+heading+CTA link) | — | Hero = composition | **No** (không tạo EditorialHero) | ✅ |
| S2 | article+h3+meta + ul>li>article | `ContentCard` (article) · `ArticleMeta` · `Label` · `StatusMessage` (empty) | article | — | **No** | ✅ |
| S3 | article+h3+h4+dl | `ContentCard` (caseStudy) · `MetricGroup` | caseStudy | ContentCard chung (D33/Owner) | **No** (không tách SignatureCard) | ✅ |
| S4 | ul>li+h3+a | `PillarMap` | — | — | **No** | ✅ |
| S5 | section+h3+ul | `WorkWithMeBlock` | — | — | **No** | ✅ |
| S6 | section+h2+a | *composition* (CTA link → `/contact/`) | — | CTA = composition | **No** | ✅ |
| S7 | footer+nav×2 | `Footer` | — | — | **No** | ✅ |

**Cột "New component required" = No toàn bộ.** `ContactForm` ở `/contact` (không Home). Không component alias đầu cơ; không signature component chưa khóa.

## 8. Content status matrix

| Section | Slot | Status | Nguồn |
|---|---|---|---|
| S0/S1 | role "Marketing Leader / Brand & Marketing Strategist" | **VERIFIED** | D20/BRAND §1 |
| S1 | positioning statement | **TODO** (dùng DRAFT nội bộ) | CONTENT §2.1 |
| S1 | supporting intro | **DRAFT** | dẫn từ BRAND/PRD |
| S1 | portrait/artifact | **OWNER ASSET REQUIRED** | CONTENT §3 |
| S2 | featured writing (title/excerpt/date/reading-time/URL) | **TODO / OMIT IN PRODUCTION** | CONTENT §10 |
| S3 | case title/client/problem/approach/result | **TODO** | CONTENT §5 |
| S3 | metrics | **OWNER ASSET REQUIRED** (được phép công khai, D6) | CONTENT §5 |
| S3 | artifact | **OWNER ASSET REQUIRED** | CONTENT §5 |
| S3 | Roboworld-related | **REVIEW REQUIRED** | D6/D13 |
| S4 | 5 pillars + routes + mô tả ngắn | **VERIFIED/READY** (taxonomy + slug D51) | D16/D51 |
| S5 | suitable/unsuitable/servicesOffered | **OWNER ASSET REQUIRED** | CONTENT §8b/D54 |
| S5 | CTA route `/contact/` | **READY** | IA |
| S6 | primary CTA + 1 link | **DRAFT** (wording) → `/contact/` READY | D25/D27 |
| S7 | email | **READY** | CONTENT §9 |
| S7 | RSS `/rss.xml` | **READY** (route contract) | D53/D27 |
| S7 | LinkedIn | **OWNER ASSET REQUIRED** | CONTENT §9/D53 |
| S7 | GitHub | **DEFERRED** (evidence_asset, không social MVP) | D52 |
| S7 | privacy `/privacy/`, experience anchor | **READY** (route) | IA |

**Không nâng status khi thiếu bằng chứng.**

## 9. Owner Asset Gate

| Asset | Section | Type | Status | Required before render? | Fallback | Production omission | Source file |
|---|---|---|---|---|---|---|---|
| Positioning statement | S1 | copy | TODO | **Có** (H1 thật) | DRAFT internal (review) | — | CONTENT §2.1 |
| Portrait/artifact | S1 | image | TODO | Không | neutral frame + nhãn | omit slot | CONTENT §3 |
| Featured writing (≥3) | S2 | content | TODO | S2 gated | S2 ẩn | omit S2 | CONTENT §10 |
| Case study + copy | S3 | content | TODO | S3 gated | S3 ẩn | omit S3 | CONTENT §5 |
| Metrics (public) | S3 | data | TODO | S3 metric gated | narrative | ẩn metric | CONTENT §5 (D6) |
| Case artifact | S3 | image | TODO | Không | neutral frame nhãn | ẩn artifact | CONTENT §5 |
| servicesOffered | S5 | content | TODO | **S5 gated** | S5 ẩn (D54) | omit S5 → S6 sau S4 | CONTENT §8b |
| LinkedIn URL | S7 | url | TODO | Không | Email+RSS | không render link | CONTENT §9 |
| Social khác (FB/X/YT/IG) | S7 | url | TODO/deferred | Không | — | không render | CONTENT §9/D53 |
| GitHub | S7 | url | DEFERRED | Không | — | không render (D52) | CONTENT §9 |
| Project/experience evidence | S3/About | content | TODO | — | — | — | CONTENT §4/§5 |

**Placeholder không được trình bày thành evidence thật.**

## 10. Conditional rendering matrix

| S | Required/Conditional | Render condition | Omit condition | Fallback | Adjacent transition after omission |
|---|---|---|---|---|---|
| S0 | Required | luôn | — | — | — |
| S1 | Required (+owner asset) | luôn | — | portrait slot label nếu chưa có ảnh | — |
| S2 | **Conditional** | ≥3 bài thật hợp lệ + Owner confirm featured (D55) | chưa đủ | **omit** (không card giả) | S1→(cognitive rest)→S3 nếu S3 hiển thị (layout-logic §14) |
| S3 | **Conditional** | ≥1 case thật + metric được phép (D55/D6) | chưa đủ | omit | S2→S4 |
| S4 | Required | luôn (taxonomy) | — | — | — |
| S5 | **Conditional-hidden** | servicesOffered duyệt (D54) | chưa duyệt | omit | **S6 nối trực tiếp sau S4** |
| S6 | Required | luôn | — | — | — |
| S7 | Required | luôn (social chỉ khi URL thật, D53) | — | Email+RSS tối thiểu | — |

**Cấm:** empty section · "Coming soon" public · fake sample card · skeleton cho static · Lorem Ipsum · khoảng trắng vô nghĩa khi omit · thay bằng testimonial/logo-wall/fake-metric.

## 11. Route and anchor matrix

| Link label | Destination | Source | Status | Render condition |
|---|---|---|---|---|
| Home (wordmark) | `/` | IA/D57 | Valid | always |
| Viết | `/writing/` | IA | Valid | always |
| Case study | `/case-studies/` | IA | Valid | always |
| Chủ đề | `/topics/` | D51 | Valid (hub) | always |
| 5 trụ | `/topics/{chien-luoc,tang-truong-so,noi-dung-truyen-thong,ai-cho-marketing,lanh-dao-quan-diem}/` | D51 | Valid | S4 |
| Giới thiệu | `/about/` | IA | Valid | always |
| Kinh nghiệm | `/about/#experience` | IA §9 (anchor id "experience") | Valid | S7 |
| Liên hệ / CTA | `/contact/` | IA/D27 | Valid | S6/S5/nav |
| Chính sách riêng tư | `/privacy/` | IA sitemap | Valid | S7 |
| RSS | `/rss.xml` | D53/IA | Valid | S7 |
| Email | `mailto:forwork.chiencd@gmail.com` | CONTENT §9 READY | Valid | S7 |
| LinkedIn | (URL thật) | CONTENT §9 | **OWNER ASSET** | chỉ khi có URL |
| GitHub | — | D52 | **không render** (deferred) | — |
| in-page | `#main-content` (skip), `#work-with-me`? | id thật | Valid | — |

**Không** route mới/sitemap-sửa/href-giả/`#`/`javascript:void(0)`/`"Xem thêm"` mơ hồ.

## 12. Responsive reading order

| S | DOM order | Desktop visual | Mobile visual | SR order | Khác nhau? | Lý do |
|---|---|---|---|---|---|---|
| S0 | 1 | header ngang | header + hamburger | = DOM | Không | — |
| S1 | 2 | statement trái + evidence phải | statement → CTA → (ảnh dưới) | = DOM | Không (CSS chỉ reflow) | line-break riêng mobile |
| S2 | 3 | single column | stacked | = DOM | Không | — |
| S3 | 4 | artifact 60 / copy 40 | **artifact trên copy** | = DOM | Không (DOM đã artifact-trước-copy hợp lý) | evidence-first |
| S4 | 5 | 5 trụ ngang | dọc | = DOM | Không | — |
| S5 | 6 | 2 vùng | stacked | = DOM | Không | — |
| S6 | 7 | centered | full-width button | = DOM | Không | — |
| S7 | 8 | 2 cột | collapse | = DOM | Không | — |

**DOM order = reading order = SR order = S0→S7** ở mọi breakpoint. **Không** dùng CSS `order` đảo logic; evidence không trước context; CTA không nhảy trước reasoning; mobile art-direct (line-break/spacing) không đổi DOM.

## 13. Accessibility acceptance criteria (contract cho 1.3B)

☐ `lang="vi"` giữ · ☐ skip-link → `#main-content` · ☐ **một** `main#main-content` · ☐ **một** h1 · ☐ heading không nhảy cấp · ☐ 3 nav accessible-name phân biệt · ☐ link text có nghĩa (không "Xem thêm" trơ) · ☐ không nested interactive · ☐ không click-handler trên div · ☐ không empty button/link · ☐ img alt strategy (decorative `alt=""`; evidence có caption/label; **chưa có ảnh → không `<img>` rỗng**) · ☐ artifact có `<figure>/<figcaption>` khi có asset · ☐ article metadata semantic · ☐ `<time datetime>` **chỉ khi có ngày thật** (không bịa) · ☐ `<address>` cho email nếu phù hợp · ☐ focus order = DOM · ☐ không tabindex dương · ☐ không ARIA dư · ☐ reduced-motion giữ · ☐ no horizontal overflow · ☐ zoom 200% · ☐ landmark count hợp lý (1 banner/main/contentinfo + nav).

## 14. Copy honesty rules

**Được dùng ở 1.3B:** copy VERIFIED/READY (role, 5 trụ, email, routes) · DRAFT có **nhãn nội bộ rõ** (`DRAFT:`/`PLACEHOLDER:` — không giả READY) · neutral owner placeholder (`OWNER ASSET REQUIRED`) khi buộc giữ slot · graceful omission.
**Tuyệt đối không:** tự viết thành tích/số liệu/case/tên khách hàng/project title/ngày/reading-time/social-link/kinh nghiệm; agency jargon không nguồn; SaaS copy; "trusted by"/"results"/"impact" không evidence; Lorem Ipsum; "Coming soon" public.

| Slot | Temporary internal copy? |
|---|---|
| role/eyebrow, 5 trụ, email, routes, nav labels | **Dùng thật (VERIFIED)** |
| S1 statement/intro, S3 story, S5 criteria, S6 CTA wording | **DRAFT nội bộ có nhãn** (thay bằng thật trước production) |
| S2 titles, S3 project/metrics, servicesOffered, ảnh, social URL | **TUYỆT ĐỐI KHÔNG bịa** — OWNER ASSET / omit |

## 15. 1.3B implementation boundary

**1.3B sửa:** `src/app/page.tsx` (chính) · `src/app/layout.tsx` (chỉ nếu metadata/semantic root cần) · `src/app/globals.css` (chỉ tối thiểu cho semantic visibility, **không layout**).
**1.3B tạo:** semantic landmark · S0–S7 skeleton · content slots · conditional-render structure · truthful labels · anchor IDs · component mapping tối thiểu.
**1.3B KHÔNG:** component/route/data-layer/CMS/image-asset/CSS-Module mới; art-direction/grid/spacing-production/responsive-composition-hoàn-chỉnh/card-hoàn-chỉnh/image-treatment/animation/visual-polish.

## 16. Recommended source structure

- **`page.tsx` = single server component.** Local static data (mảng 5 trụ, nav items) inline hoặc const ngay trong file — **đủ đơn giản, không tách**.
- **Không** premature abstraction/component-explosion/data-layer-giả/config-driven-page-builder/schema-thừa/array-map-mọi-section-để-trông-clean.
- Cho phép **section như JSX inline** trong `<main>` (S1–S6) — dễ đọc, semantic rõ. Component thật (Header/Footer/PillarMap/…) là của checkpoint dựng component sau; 1.3B chỉ skeleton semantic (có thể inline `<header>/<footer>/<section>` trong page/layout, chưa cần tách file component).
- **Helper đề xuất:** không cần ở 1.3B (không đủ consumer). Nếu 5 trụ lặp → có thể `.map` mảng 5 phần tử (taxonomy thật) — 1 consumer, chấp nhận; không tách file.

## 17. Anti-pattern gate (chặn ở 1.3B)

Chặn: generic SaaS hero · Hero+Features+Testimonials · logo wall · fake metric/project · card explosion/equal cards/bento/dashboard · centered/floating CTA island · giant headline vô cớ · section repetition · **component-first composition** · content-generated-to-fill · div soup/aria soup · generic placeholder · "coming soon" public · icon-everywhere · heading-for-styling · duplicate CTA · nav item không route thật · **button cho navigation / anchor cho action** · duplicated content giữa sections.

## 18. Open decision audit

| Mục | Phân loại |
|---|---|
| S1 positioning copy | **can implement with internal DRAFT label** (thật trước production) |
| S1 portrait/artifact | graceful omission (slot label) |
| S2 featured writing threshold | **graceful omission** (omit S2 nếu <3 bài) |
| S3 case study threshold | graceful omission (omit S3) |
| S3 Roboworld review | REVIEW REQUIRED (chỉ khi dùng case Roboworld — chưa có) |
| S5 servicesOffered / visibility | conditional-hidden (omit S5 → S6 sau S4) |
| LinkedIn URL | non-blocking (Email+RSS đủ) |
| GitHub render strategy | **đã khóa** (D52: không render social MVP) |
| exact CTA wording | DRAFT nội bộ (non-blocking) |
| social footer visibility | **đã khóa** (D53) |

**Không blocker cứng; không cần hỏi Owner** — omission/DRAFT-label rules đã đủ cho 1.3B.

## 19. Risks

1. **Content gate (đường găng):** CONTENT_INVENTORY §1 = 5×TODO → S1 statement/ảnh, S2/S3/S5 phụ thuộc asset. 1.3B dựng skeleton với DRAFT-label + omission; **production thật** chặn tới khi asset READY (D7).
2. Nếu cả S2+S3 omit → Home rút gọn (S1→S4→S6→S7); layout-logic §14 xử lý transition — non-blocking.
3. DRAFT copy phải có nhãn để không lẫn READY (D7) — quản lý ở 1.3B.
4. `<time>`/reading-time chỉ khi có ngày thật — 1.3B không bịa.

## 20. Readiness verdict

**READY WITH NON-BLOCKING CONTENT GAPS** — spine/landmark/heading/component-mapping/route/a11y/reading-order đã khóa và không conflict; content gaps (asset TODO) xử lý bằng DRAFT-label + graceful omission (D54/D55/D7); không blocker cứng, không cần Owner decision mới, không governance conflict.

## 21. Handoff to 1.3B

1.3B dựng **semantic skeleton** trong `src/app/page.tsx` (+ layout metadata nếu cần): landmark (header/main/section×6/footer/nav×3), 1 h1 + h2/h3/h4 outline, S0–S7 với content slots (VERIFIED thật · DRAFT-label · OWNER-ASSET-omit), conditional-render structure (S2/S3 omit-when-empty, S5 conditional-hidden), anchor IDs (`#main-content`, experience), routes canonical (D51/D57), a11y acceptance §13. **Không** component/CSS-layout/image/animation/copy-giả. Verify: lint/typecheck/build/runtime + a11y checklist. Rồi review → commit checkpoint.
