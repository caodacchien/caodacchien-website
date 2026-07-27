# Homepage Wireframe Artifact (0.4E)

**Trạng thái:** Reviewable blueprint — bước cuối trước Semantic HTML. Markdown only.
**Không:** UI/HTML/React/CSS/Figma/pixel/grid/color/animation/component-mới.
**Nguồn khóa:** Design Bible v1.0 · `homepage-wireframe-spec.md` (0.4D) · IA (D25/D27) · Blueprint (0.4B) · Storyboard (0.4C).
**Copy/Image/CTA placeholder** đánh dấu `DRAFT:` / `PLACEHOLDER:` / `OWNER ASSET REQUIRED` theo D7/§9 — không phải nội dung cuối.

---

# SECTION ARTIFACTS (S0–S7)

## S0 — Header

- **Section ID:** S0
- **Viewport title:** Site Header
- **Purpose:** danh tính + điều hướng (5 mục, chịu 8 — D26/D18).
- **Reader Question:** "Đây là ai, đi đâu được?"
- **Primary Focus:** wordmark. · **Secondary Focus:** nav.
- **Content Blocks:** wordmark · nav (Viết · Case study · Chủ đề · Giới thiệu · Liên hệ).
- **Evidence Blocks:** — (tên thật).
- **Attention Anchor:** wordmark.
- **Reading Order:** wordmark → nav → rơi xuống Hero.
- **Transition In:** (điểm vào trang).
- **Transition Out:** header nhường sân khấu → Hero statement.
- **Whitespace Intent:** cao, thanh mảnh, không giữ mắt.
- **Image Placeholder:** không.
- **Copy Placeholder:** `DRAFT: Cao Đắc Chiến` · nav labels (thật).
- **CTA Placeholder:** không (CTA là khối, không lên nav — D18).
- **Component Mapping:** `Header`.
- **Owner Asset Required:** —.

**Visual Composition**
```
[S0 HEADER]
Left:  Wordmark  →  Right: Nav (5 mục)
(sticky mảnh, suốt trang)
```

## S1 — Hero  · *memorable editorial moment*

- **Section ID:** S1
- **Viewport title:** Hero — Positioning statement
- **Purpose:** định vị dạng phát biểu vấn đề (D25.1).
- **Reader Question:** "Người này nghĩ khác chỗ nào?"
- **Primary Focus:** statement định vị. · **Secondary Focus:** CTA.
- **Content Blocks:** eyebrow (vai trò) · statement · intro (ai/giá trị) · CTA + link phụ.
- **Evidence Blocks:** vùng ảnh chân dung/artifact (phụ, bất đối xứng).
- **Attention Anchor:** statement.
- **Reading Order:** eyebrow → statement → intro → CTA → (liếc ảnh).
- **Transition In:** từ Header.
- **Transition Out:** *"Bạn vừa nghe cách tôi nghĩ — đây là cách tôi nghĩ, viết ra."*
- **Whitespace Intent:** rất cao (silence làm nổi statement).
- **Image Placeholder:** `OWNER ASSET REQUIRED — ảnh chân dung / working photo thật` (slot phụ, nhỏ hơn text).
- **Copy Placeholder:** eyebrow `DRAFT: Marketing Leader · Brand & Marketing Strategist` · statement `DRAFT: Xây hệ thống marketing, không phải chiến dịch.` · intro `DRAFT: Cùng CEO, founder và đội marketing biến hoạt động rời rạc thành hệ thống vận hành được.` *(đối chiếu positioning statement thật — CONTENT_INVENTORY)*
- **CTA Placeholder:** `DRAFT: Làm việc cùng tôi` (secondary của trang) + link phụ `DRAFT: Đọc cách tôi nghĩ`.
- **Component Mapping:** composition — `Container` + `Label` + heading/`Prose` + inline CTA link (không tạo `EditorialHero`).
- **Owner Asset Required:** positioning statement thật · ảnh chân dung/artifact.

**Visual Composition**
```
[S1 HERO]
Top
  Eyebrow (vai trò)
    ↓
  Statement định vị        ← attention anchor
    ↓
  Supporting Intro (ai / giá trị)
    ↓
  Primary CTA  +  text link
  (bên cạnh/dưới: Image Placeholder — nhỏ hơn, lệch)
Bottom
```

## S2 — Featured Writing

- **Section ID:** S2
- **Viewport title:** Featured Writing — "Cách tôi nghĩ"
- **Purpose:** bài `featured:true` — tư duy trước kết quả (D25.2).
- **Reader Question:** "Có gì đủ sâu để đọc?"
- **Primary Focus:** tiêu đề bài. · **Secondary Focus:** trụ + reading time.
- **Content Blocks:** section label · tiêu đề · excerpt · metadata.
- **Evidence Blocks:** bài viết thật (T1).
- **Attention Anchor:** tiêu đề bài.
- **Reading Order:** label → tiêu đề → excerpt → meta.
- **Transition In:** từ Hero.
- **Transition Out:** *"Cách nghĩ này đã tạo ra kết quả — đây là một lần."*
- **Whitespace Intent:** trung; tách rõ khỏi Hero.
- **Image Placeholder:** tùy chọn (P3/C11) — mặc định không ảnh.
- **Copy Placeholder:** label `DRAFT: Viết` · tiêu đề `PLACEHOLDER: Tiêu đề bài viết chủ lực (trụ AI cho Marketing)` · excerpt `PLACEHOLDER: mô tả từ excerpt bài thật` · meta `— · — phút`.
- **CTA Placeholder:** link điều hướng `DRAFT: Đọc bài` (không phải CTA chuyển đổi).
- **Component Mapping:** `ContentCard` (variant=article) + `ArticleMeta` + `Label`; `StatusMessage` (empty-state).
- **Owner Asset Required:** 3–5 bài thật (MDX `content/writing/`) + cờ `featured`.

**Visual Composition**
```
[S2 FEATURED WRITING]
Section Label
  ↓
Article Title            ← attention anchor
  ↓
Excerpt (ngắn)
  ↓
Metadata (trụ · reading time)
(thiếu bài thật → empty-state narrative)
```

## S3 — Featured Case Study  · *evidence peak*

- **Section ID:** S3
- **Viewport title:** Featured Case Study — "Cách nghĩ tạo kết quả"
- **Purpose:** case `featured:true` có số liệu (D25.3).
- **Reader Question:** "Kết quả gì, đo bằng gì?"
- **Primary Focus:** artifact/metric. · **Secondary Focus:** project title.
- **Content Blocks:** section label · project title · tóm tắt câu chuyện (Bối cảnh/Vấn đề/Cách tiếp cận/Kết quả) · vai trò/hình thức · metric group.
- **Evidence Blocks:** case thật (T2) · artifact (T3) · metrics (T4).
- **Attention Anchor:** artifact/metric.
- **Reading Order:** artifact → project title → câu chuyện/kết quả → vai trò → metric.
- **Transition In:** từ Writing (khối tối ló ra).
- **Transition Out:** *"Một dự án chỉ là một điểm — đây là toàn bộ bản đồ tư duy."*
- **Whitespace Intent:** thấp (mật độ cao — vùng căng); ứng viên khối tối duy nhất của trang.
- **Image Placeholder:** `OWNER ASSET REQUIRED — dashboard / diagram quy trình / before-after / ảnh dự án thật` (lớn, lệch, khác kiểu khung Hero).
- **Copy Placeholder:** label `DRAFT: Case study tiêu biểu` · title `PLACEHOLDER: Tên dự án` · story `DRAFT: đội ngừng chạy hàng loạt chiến dịch rời rạc, dựng lại một xương sống nội dung vận hành được.` · vai trò `PLACEHOLDER: Strategy & Team Lead · in-house/consulting` · metric `OWNER ASSET REQUIRED — số liệu được phép công khai (D6)`.
- **CTA Placeholder:** link `DRAFT: Đọc case study đầy đủ` (điều hướng).
- **Component Mapping:** `ContentCard` (variant=caseStudy) + `MetricGroup`. (ContentCard chung — không tách.)
- **Owner Asset Required:** case thật + artifact + metrics; Roboworld REVIEW-REQUIRED (D6/D13). **Cấm số/artifact giả (D7).**

**Visual Composition**
```
[S3 FEATURED CASE]  — evidence-heavy, bất đối xứng (evidence trội hơn copy)
Left/Large: Artifact/Metric Placeholder   ← attention anchor
Right/Smaller:
  Section Label
    ↓
  Project Title
    ↓
  Story (Bối cảnh/Vấn đề/Cách tiếp cận/Kết quả)
    ↓
  Vai trò · Hình thức
    ↓
  Metric Group (tabular-nums; chỉ khi có số thật)
```

## S4 — Pillar Map

- **Section ID:** S4
- **Viewport title:** Pillar Map — "Bản đồ tư duy"
- **Purpose:** 5 trụ → `/topics/[pillar]` (D25.4/D16/D31).
- **Reader Question:** "Mạnh nhất vùng nào?"
- **Primary Focus:** trụ "AI cho Marketing". · **Secondary Focus:** bộ 5 trụ.
- **Content Blocks:** section label · 5 nhãn trụ (ngang) · mô tả ngắn/trụ.
- **Evidence Blocks:** taxonomy thật (5 trụ).
- **Attention Anchor:** trụ "AI cho Marketing".
- **Reading Order:** quét ngang 5 trụ → dừng ở "AI cho Marketing".
- **Transition In:** từ Case (dải sáng — thở ra).
- **Transition Out:** *"Nếu bạn cần hệ thống này cho đội mình — đây là cách bắt đầu."*
- **Whitespace Intent:** cao — điểm nghỉ nhận thức giữa hai vùng căng.
- **Image Placeholder:** không.
- **Copy Placeholder:** label `DRAFT: Chủ đề · 5 trụ nội dung` · trụ (thật): Chiến lược · Tăng trưởng số · Nội dung và Truyền thông · AI cho Marketing · Lãnh đạo và Quan điểm.
- **CTA Placeholder:** mỗi trụ = link text điều hướng (không pill nếu chưa phải filter thật).
- **Component Mapping:** `PillarMap`.
- **Owner Asset Required:** — (số bài/trụ khi có nội dung).

**Visual Composition**
```
[S4 PILLAR MAP]
Section Label
  ↓
Chiến lược · Tăng trưởng số · Nội dung & Truyền thông · [AI cho Marketing] · Lãnh đạo & Quan điểm
                                              ↑ attention anchor
```

## S5 — Work With Me

- **Section ID:** S5
- **Viewport title:** Work With Me — "Làm việc cùng tôi"
- **Purpose:** khối thông tin hợp tác sau bằng chứng (D18/P2).
- **Reader Question:** "Tôi hợp tác được không, và như thế nào?"
- **Primary Focus:** headline hợp tác. · **Secondary Focus:** "phù hợp khi".
- **Content Blocks:** section label · headline · phù-hợp-khi · chưa-phù-hợp-khi · hành động.
- **Evidence Blocks:** `servicesOffered` (T5).
- **Attention Anchor:** headline.
- **Reading Order:** headline → phù-hợp → không-phù-hợp → CTA.
- **Transition In:** từ Pillar.
- **Transition Out:** *"Nếu thấy đúng — mở một cuộc trao đổi."*
- **Whitespace Intent:** trung; tách rõ hai nhóm; không bullet dày.
- **Image Placeholder:** không.
- **Copy Placeholder:** headline `DRAFT: Nếu bạn cần một hệ thống marketing — không phải thêm một chiến dịch.` · phù-hợp `DRAFT: dựng lại nền tảng chiến lược & thương hiệu; đội cần cấu trúc vận hành` · không-phù-hợp `DRAFT: chạy quảng cáo ngắn hạn; thuê viết nội dung từng bài; kỳ vọng tăng trưởng thần tốc` .
- **CTA Placeholder:** `DRAFT: Bắt đầu trao đổi` (dẫn tới CTA chính S6) + `DRAFT: Cách một cuộc trao đổi bắt đầu`.
- **Component Mapping:** `WorkWithMeBlock`.
- **Owner Asset Required:** nội dung "Làm việc cùng tôi" thật (`profile.config.ts`).

**Visual Composition**
```
[S5 WORK WITH ME]  — có thể là khối tối (nếu Case không nhận) — chỉ một khối tối/trang
Section Label
  ↓
Headline (hệ thống, không chiến dịch)     ← attention anchor
  ↓
Phù hợp khi        |     Chưa phù hợp khi
  ↓
Primary CTA  +  text link
```

## S6 — Contact CTA  · *action peak*

- **Section ID:** S6
- **Viewport title:** Contact CTA
- **Purpose:** CTA chính = Liên hệ (D25.6→D27; trần 2 CTA/trang — D23/P8).
- **Reader Question:** "Bước tiếp theo là gì?"
- **Primary Focus:** nút "Bắt đầu trao đổi". · **Secondary Focus:** text link phụ.
- **Content Blocks:** dòng dẫn · CTA chính · 1 link phụ.
- **Evidence Blocks:** —.
- **Attention Anchor:** nút CTA.
- **Reading Order:** dòng dẫn → nút → link phụ.
- **Transition In:** từ Work.
- **Transition Out:** *"Hết trang — phần còn lại là điều hướng."*
- **Whitespace Intent:** cao; cô lập hành động.
- **Image Placeholder:** không.
- **Copy Placeholder:** dẫn `DRAFT: Sẵn sàng xây một hệ thống marketing thật sự?` .
- **CTA Placeholder:** `DRAFT: Bắt đầu trao đổi` (CTA chuyển đổi duy nhất; điểm cam duy nhất — D47) + `DRAFT: Xem cách tôi làm việc`.
- **Component Mapping:** CTA link tới `/contact` (composition; `ContactForm` ở trang Contact).
- **Owner Asset Required:** —.

**Visual Composition**
```
[S6 CONTACT CTA]
Lead line (ngắn)
  ↓
[ Primary CTA: Bắt đầu trao đổi ]     ← attention anchor (1 điểm cam duy nhất)
  ↓
text link phụ
```

## S7 — Footer

- **Section ID:** S7
- **Viewport title:** Footer
- **Purpose:** điều hướng phụ tiết chế (IA §9).
- **Reader Question:** "Còn gì để đi tiếp?"
- **Primary Focus:** wordmark. · **Secondary Focus:** nav + Kinh nghiệm anchor.
- **Content Blocks:** wordmark + dòng định vị · nav (cột 1) · Social/RSS (cột 2) · bản quyền.
- **Evidence Blocks:** —.
- **Attention Anchor:** wordmark.
- **Reading Order:** wordmark → nav → social/RSS → bản quyền.
- **Transition In:** từ CTA.
- **Transition Out:** kết trang.
- **Whitespace Intent:** trung; đóng kiểu ấn phẩm.
- **Image Placeholder:** không.
- **Copy Placeholder:** `DRAFT: Cao Đắc Chiến — Nền tảng xuất bản của một Marketing Leader.` · nav thật + Kinh nghiệm (anchor About).
- **CTA Placeholder:** không; **không** nút theme (D46).
- **Component Mapping:** `Footer`.
- **Owner Asset Required:** —.

**Visual Composition**
```
[S7 FOOTER]
Wordmark + dòng định vị
  ↓
Cột 1: Nav (+ Kinh nghiệm anchor)   |   Cột 2: Social · RSS
  ↓
Bản quyền · Chính sách riêng tư   (không nút theme)
```

---

# Section Render Status (D54/D55)

| Section | Status | Điều kiện bật |
|---|---|---|
| S0 Header | `required` | luôn render |
| S1 Hero | `required` (+ `owner_asset_required`: ảnh, statement thật) | luôn render; asset chờ Owner |
| S2 Featured Writing | `production_omit_when_empty` | ≥3 bài thật hợp lệ + Owner xác nhận featured (D55) |
| S3 Featured Case Study | `production_omit_when_empty` (+ `owner_asset_required`, có thể `REVIEW REQUIRED`) | ≥1 case thật, metric được phép công khai (D55/D6) |
| S4 Pillar Map | `required` | luôn render (taxonomy thật) |
| S5 Work With Me | `conditional_hidden_until_content_ready` | `servicesOffered` được Owner duyệt (D54) |
| S6 Contact CTA | `required` | luôn render; nối sau S4 nếu S5 ẩn |
| S7 Footer | `required` | luôn render; social chỉ khi URL thật (D53) |

# Viewport Relationship Map

```
S0 Header
   ↓  (nhường sân khấu)
S1 Hero  ★ memorable moment
   ↓  (cách nghĩ viết ra)
S2 Featured Writing
   ↓  (đã tạo kết quả)
S3 Featured Case Study  ★ evidence peak
   ↓  (một điểm → bản đồ)
S4 Pillar Map  ◦ điểm nghỉ
   ↓  (cần cho đội bạn)
S5 Work With Me
   ↓  (mở trao đổi)
S6 Contact CTA  ★ action peak
   ↓  (hết trang)
S7 Footer
```
Ba đỉnh (Hero · Case · CTA) không liền kề; Pillar là điểm nghỉ giữa hai vùng căng.

# Attention Flow

| Section | Primary | Secondary | Noise (phải loại) | Peak |
|---|---|---|---|---|
| S0 | Wordmark | Nav | logo phụ/nút thừa | — |
| S1 | Statement | CTA | nhiều accent cam/underline | ★ memorable |
| S2 | Article title | Trụ + reading time | card grid nhiều bài | — |
| S3 | Artifact/metric | Project title | KPI tile / số giả | ★ evidence |
| S4 | "AI cho Marketing" | Bộ 5 trụ | pill filter giả | ◦ rest |
| S5 | Headline | "Phù hợp khi" | bullet dày / 2 cột quá dày | — |
| S6 | CTA button | Text link | CTA thứ hai cạnh tranh | ★ action |
| S7 | Wordmark | Nav + Kinh nghiệm | sitemap đầy đủ | — |

Mỗi section: **đúng 1 primary + 1 secondary**; "noise" là thứ phải loại để không cạnh tranh.

# Evidence Placement

| Loại | Section | Tier | Trạng thái |
|---|---|---|---|
| **Writing** | S2 (+ S4 dẫn) | T1 | `OWNER ASSET REQUIRED` — bài thật MDX; thiếu → empty-state |
| **Case** | S3 | T2 | `OWNER ASSET REQUIRED` — case thật; Roboworld REVIEW-REQUIRED |
| **Metrics** | S3 | T4 | `OWNER ASSET REQUIRED` — số được phép công khai (D6); cấm giả (D7) |
| **Artifact** | S1 (phụ), S3 | T3 | `OWNER ASSET REQUIRED` — ảnh/dashboard/diagram thật; cấm stock/AI |
| **Placeholder** | S1 (chân dung), S5 (services) | T5 | neutral frame có nhãn; không ngụy trang thành thật |

Bằng chứng thật **không cần asset:** định vị (S1 text) · taxonomy 5 trụ (S4).

# Narrative Consistency Audit

- ✓ **Reading Journey** — danh-tính → định-vị → cách-nghĩ → bằng-chứng → bản-đồ → mời → hành-động → kết; mọi transition có câu nối kiểm chứng được.
- ✓ **Editorial Rhythm** — mật độ biến thiên; không lặp nhịp >2 lần; không hai vùng căng liền kề (Hero↔Case cách bởi Writing).
- ✓ **Human Composition** — content-first; asymmetry (Case 60/40); một điểm nặng (Case); silence cạnh weight (Hero, CTA).
- ✓ **Progressive Disclosure** — 5s→30s→2ph→5ph khớp design test.
- ✓ **Editorial Intelligence** — một memorable moment (Hero); một primary + một secondary/section; editorial brief đầy đủ.

# Design Bible Compliance

- ✓ **Component** — chỉ 18 component; 0 component mới; Hero/CTA là composition; ContentCard chung.
- ✓ **Typography** — chỉ role/hierarchy; Geist Sans-only, metric tabular-nums, không mono (D48). Không đặc tả cỡ/màu.
- ✓ **Color** — không đặc tả màu; section-based (D46); một khối tối (S3 *hoặc* S5); orange budget 1 CTA + 1 marker (D47); danger không dùng.
- ✓ **Motion** — chỉ intent; trần 200ms; không scroll-reveal (P9/C10).
- ✓ **Anti-pattern** — né AP-2/3/4/5/6/8/11/15 (đã map "noise" ở Attention Flow).
- ✓ **Evidence** — mọi asset thiếu gắn `OWNER ASSET REQUIRED`; không số/case/ảnh giả (D7/D6).
- ✓ **Attention** — đúng 1 primary + 1 secondary/section; ba đỉnh không liền kề.

---

**Kế tiếp (Semantic HTML) — allowed:** dựng semantic structure/landmark/heading order/reading order từ artifact này.
**Forbidden:** đổi narrative/thứ tự (D25); thêm component (ngoài 18); bỏ/đổi evidence hoặc attention anchor; thêm CTA (>D23/P8); thêm animation/motif ngoài Bible; số/case/ảnh giả; sửa Design Bible.
