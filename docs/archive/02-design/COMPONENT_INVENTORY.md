# Component Inventory & Design Tokens

Phiên bản 1.0 — 2026-07-24. Chốt theo **D32** (token) và **D33** (component).

Đây là tài liệu tham chiếu triển khai. Design Principles và Design Constraints nằm ở `DESIGN_SYSTEM.md`.

---

## Phần A — Component Inventory

**18 component cho MVP** (từ 38 sau tối giản hóa; `NewsletterForm` lùi Phase 2 theo D27; `ThemeToggle` loại theo **D46** — section-based, không light/dark toggle). Mỗi component tái sử dụng nhiều nơi, trách nhiệm rõ.

`SearchDialog`, `Pagination`, `FilterBar`, `NewsletterForm` **hoãn Phase 2** (D33, D27). `ThemeToggle` **loại** (D46).

**Kiến trúc `ContentCard` chung — giữ nguyên (D33, chủ dự án chốt 2026-07-27):** không tách `SignatureCard` thành component riêng. Chỉ tách component mới khi **hành vi hoặc ngữ nghĩa** thực sự khác; **không tách vì styling**. Biến thể hình khối xử lý bằng `variant`/token, không bằng component mới.

### Nền tảng

| Component | Mục đích | Xuất hiện ở |
| --- | --- | --- |
| `Header` | Điều hướng chính, gồm skip-link | mọi trang |
| `Footer` | Điều hướng phụ, 2 cột | mọi trang |
| `Container` | Bọc bố cục theo token container | khắp nơi |
| `Breadcrumb` | Định vị + JSON-LD | bài, hub trụ, case study |

### Đọc — trục xuất bản

| Component | Mục đích | Xuất hiện ở |
| --- | --- | --- |
| `Prose` | Bọc nội dung MDX; style blockquote, table, figure, footnote, code | bài, case study, trang tĩnh |
| `ContentHeader` | Tiêu đề + metadata; `variant: article \| caseStudy` | bài, case study |
| `TableOfContents` | Mục lục dính, sinh từ heading | bài, case study |
| `ArticleMeta` | Ngày, reading time, trụ (gộp Metadata + ReadingTime) | thẻ, trang bài |
| `Label` | Nhãn; `variant: pillar \| tag` (MVP dùng pillar) | thẻ, bài, hub |
| `ContentCard` | Thẻ nội dung; `variant: article \| caseStudy`; **chạy không cần ảnh** (P3) | Home, danh sách, related |
| `Callout` | Khối lưu ý trong MDX | thân bài |

### Chiến lược — trục chứng minh năng lực

| Component | Mục đích | Xuất hiện ở |
| --- | --- | --- |
| `FrameworkBlock` | **Khung tư duy là vật thể** (P5); có tên, bước, anchor | bài, case study |
| `MetricGroup` | Nhóm số liệu kết quả từ `metrics` | Home, case study |
| `PillarMap` | Bản đồ 5 trụ + số bài, dẫn tới `/topics/[pillar]` | Home |

### Chuyển đổi & hồ sơ

| Component | Mục đích | Xuất hiện ở |
| --- | --- | --- |
| `WorkWithMeBlock` | Khối thông tin, **không phải phễu** (D18) | Home, About |
| `ContactForm` | Form + honeypot + rate limit | Contact |
| `AuthorBio` | Tiểu sử ngắn cuối bài, từ `profile.config.ts` | cuối bài |
| `StatusMessage` | Empty state + 404 + 500 (gộp) | mọi danh sách, trang lỗi |

### Đã gộp / bỏ / hoãn so với bản 38 component

| Xử lý | Chi tiết |
| --- | --- |
| Gộp | ArticleCard + CaseStudyCard → `ContentCard`; ArticleHeader + CaseStudyHeader → `ContentHeader`; Metadata + ReadingTime → `ArticleMeta`; PillarBadge + Tag → `Label`; EmptyState + ErrorState → `StatusMessage` |
| MDX/Prose | Footnote, Table, Quote, Figure, CodeBlock, ComparisonTable → style trong `Prose`, không component riêng |
| Inline (dùng 1 lần) | Timeline (trong About), SkipLink (trong Header), SocialLinks (map data), RelatedContent (ghép `ContentCard`) |
| Hoãn Phase 2 | `SearchDialog`, `Pagination`, `FilterBar`, **`NewsletterForm` (D27)** |
| Bỏ | **`ThemeToggle` (D46)** — section-based composition, không light/dark toggle |

**Ghi chú:** `/topics/[pillar]` được giữ (D31) nhưng **không thêm component mới** — trang hub ghép từ `ContentHeader` + danh sách `ContentCard` + `PillarMap`.

**Future (không tính vào 18 component MVP):** một `SoundToggle` / nút Mute luôn hiển thị sẽ cần khi triển khai Sound & Interaction (D36, mặc định ON). Xem `DESIGN_SYSTEM.md` §Future Enhancement — Sound & Interaction. Không implement ở milestone hiện tại.

---

## Phần B — Design Tokens

Chốt **kiến trúc** token; **giá trị màu để trống** tới Milestone 0.4 (tôn trọng D10). D32.

### B.1 Typography — Geist Sans-only (chốt theo D43, amend **D48**)

**Font family (D43 → D48):**

- **Geist Sans** — **typeface duy nhất** của visible UI (Vercel, OFL 1.1): Hero · Heading · Body · Navigation · UI · Button · Form · Label · metadata · ngày/reading time · metric/số/tag/badge/status.
- **Không Geist Mono trong visible UI** (D48 — superseded mệnh đề mono của D43). **Không serif ở MVP** (D43).
- **Số:** `font-variant-numeric: tabular-nums` khi cần căn hàng; **không** đổi font-family sang monospace, **không** slashed zero, **không** italic cho metric. Metric chính weight 600–700.

Tiếng Việt: Geist Sans đã xác nhận vùng phủ `vietnamese` + `vi_Latn` qua Google Fonts metadata (gồm dải 7840–7929 và combining diacritics). *(Geist Mono cũng phủ tiếng Việt — ghi nhận lịch sử D43; Mono đã loại khỏi visible UI theo D48.)* **Chất lượng dựng dấu thị giác** ở 14/15/16px là **validation bắt buộc bằng render thật** (specimen, xem cuối §B.1) — chưa được coi là đạt cho tới khi chủ dự án xem specimen.

**Thang chữ 8 bậc — GIỮ NGUYÊN theo D32** (không đổi con số; chỉ đổi họ font sang Geist Sans). Tỷ lệ 1.250 desktop / 1.200 mobile qua `clamp()`:

| Token | Desktop | Mobile (≈) | Vai trò | Weight |
| --- | --- | --- | --- | --- |
| `--text-h1` | 45px | 34px | tiêu đề trang/bài (hero dùng bậc này) | 600 |
| `--text-h2` | 36px | 28px | mục lớn | 600 |
| `--text-h3` | 28px | 24px | mục nhỏ | 600 |
| `--text-lg` | 22px | 19px | sapo, dẫn nhập | 400–500 |
| `--text-body` | 19px | 17px | thân bài | 400 |
| `--text-sm` | 16px | 16px | giao diện, chú thích | 400–500 |
| `--text-xs` | 14px | 14px | metadata, nhãn (Sans) | 400–500 |

- **Dòng cao:** thân bài `1.7` (rộng hơn chuẩn tiếng Anh vì dấu chồng), tiêu đề `1.15`, giao diện `1.5`.
- **Độ dài dòng:** `--measure-prose: 68ch`.
- **Weight:** heading 600 · body 400 · nav/UI 500–600 · **hạn chế 300** (không dùng cho body/nav).
- **Letter-spacing:** body & mọi text tiếng Việt = **0** (cấm tracking âm — dấu cần khoảng thở). Heading lớn (h1/h2) có thể `-0.01em` rất nhẹ, **nhưng phải kiểm dấu trên chữ hoa** (Ế/Ữ) trước khi áp.
- **Text-transform:** không uppercase dài. Eyebrow/nhãn ưu tiên **sentence case**, Geist Sans weight 450–500, `letter-spacing` 0–0.02em (D48). Không dùng uppercase-mono kiểu terminal.
- **Responsive:** body 19px→17px, heading co qua `clamp()`; measure 68ch bất biến (chỉ padding co).
- **Fallback stack (dùng khi Geist chưa tải):** Geist Sans → `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`. `system-ui` phủ tiếng Việt trên đa số OS. *(Bỏ nhánh mono theo D48.)*
- **Font loading (dự kiến Milestone 1.1, KHÔNG làm ở 0.4):** self-host qua gói `geist` chính thức của Vercel (`geist/font/sans`, `geist/font/mono`) với `next/font`; `display: swap`; subset `latin` + `vietnamese`; preload font above-the-fold. **Không cài package ở 0.4.**

**Vietnamese specimen — validation bắt buộc (D43; theo D48 nay chỉ kiểm Geist Sans):** render ở **14px, 15px, 16px và body 19px** với các chuỗi: `Cao Đắc Chiến` · `Chiến lược thương hiệu bền vững` · `Marketing và truyền thông trong kỷ nguyên số` · `Nguyễn, Truyền thông, Thương hiệu, Đổi mới` · `Hiệu quả, Dữ liệu, Quỹ đạo, Tăng trưởng` · `Ă Â Đ Ê Ô Ơ Ư` / `ă â đ ê ô ơ ư` · `Ắ Ằ Ẳ Ẵ Ặ` · `Ế Ề Ể Ễ Ệ` · `Ố Ồ Ổ Ỗ Ộ` · `Ớ Ờ Ở Ỡ Ợ` · `Ứ Ừ Ử Ữ Ự`. Kiểm: lỗi dấu, dấu chồng, khoảng cách, khả năng đọc. Vehicle: HTML specimen artifact (OD-3). Chủ dự án duyệt trước khi coi typography là đạt.

**Kết quả validation — ĐẠT (chủ dự án duyệt trực quan 2026-07-25):** render specimen thật; Geist Sans và Geist Mono **loaded: true** (không fallback); dấu tiếng Việt ở 14/15/16/17/19/28/36/45px hiển thị đúng, **không** cắt/chồng/lệch dấu; light mode đọc tốt, dark mode giữ hierarchy. Body 19px/1.7/68ch được duyệt. (Chuỗi 45px xuống dòng là hành vi mong đợi, không phải defect.)

> **Cập nhật D48 (2026-07-27):** Geist Mono **loại khỏi visible UI**; phần validation Mono ở trên chỉ còn giá trị lịch sử. Visible UI dùng Geist Sans duy nhất; số căn hàng bằng `tabular-nums`. Kiểm dấu tiếng Việt Geist Sans đã đạt ở specimen 0.4C.

**Lưu ý non-blocking (chủ dự án):**
- `14px/400` chỉ dùng cho **metadata ngắn**, không dùng cho body dài.
- **0.4C:** phải kiểm AA contrast cho **muted text** ở cả light và dark. **Không** làm chữ dark-mode metadata nhạt hơn mức trong specimen hiện tại.
- **0.4D:** kiểm wrapping thực tế của heading ở mobile 390px, tablet 768px, desktop.

### B.2 Spacing

Cơ sở 4px: `--space-1..10` = 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Khoảng cách giữa khối rộng (space-8..9), trong khối chữ chặt (space-4..5). Lề section 96–128px (P10).

### B.3 Container & Grid

Bốn container, chốt theo D36 (khôi phục `--container-wide` mà D32 gốc đã bỏ):

- `--container-prose: 68ch` — cột đọc bài viết/case study
- `--container-content: 1080px` — danh sách, hub trụ, section chuẩn
- `--container-wide: 1280px` — bản đồ trụ, gallery case study, section thở rộng
- `--container-full: 100%` — ảnh/khối tràn viền

Mục đích từng loại mô tả ở `DESIGN_SYSTEM.md` §Layout. Grid 12 cột, gutter 24px. Hai chế độ bố cục: **đọc** (một cột lệch trái + cột lề phải cho TOC) và **tra cứu** (lưới nhiều cột).

**Section rhythm** (ngữ nghĩa, xem `DESIGN_SYSTEM.md` §Section rhythm): Major Section `space-9..10` · Standard Section `space-7..8` · Compact Section `space-5..6`.

### B.4 Radius — contract R3 (chốt theo **D49**)

Radius gắn **archetype**, không gắn tùy ý theo section (D49 — supersede trần 8px của D32/C13/D24):

| Token | Giá trị | Archetype |
| --- | --- | --- |
| `--radius-control` | 8–10px | button, input, control nhỏ |
| `--radius-card` | 12–16px | card, tile nội dung |
| `--radius-panel` | 20–28px | panel, khối lớn |
| `--radius-signature` | 36–48px | signature object (tối đa 1–2/trang) |
| `--radius-pill` | 999px | chỉ tag/chip/control có ngữ nghĩa; avatar dùng pill/full |

**Ràng buộc:** không bo toàn bộ section; full-width section mặc định **không** radius; không nested rounded card; không capsule mọi button; tối đa 1–2 signature-radius object mỗi trang.

### B.5 Elevation

2 mức (đã bỏ `--elevation-2`). Light: phân tầng bằng **viền 1px**, không đổ bóng. Dark: phân tầng bằng **độ sáng bề mặt**, không sao chép bóng từ light.

### B.6 Motion

`--duration-fast: 120ms` · `--duration-base: 160ms` · `--duration-slow: 200ms` (**trần**). Chỉ chuyển động `opacity`, `transform`, `background-color`. Bọc trong `@media (prefers-reduced-motion: reduce)`. Không reveal khi cuộn (P9/C12).

> **Nguồn canonical cho motion timing.** `docs/design-bible/09-motion-interaction.md` dẫn chiếu mục này; **trần 200ms và "không reveal khi cuộn" (P9)** thắng — không dùng section-reveal 300–400ms.

### B.7 Icon & Border

`--icon-sm/md/lg: 16/20/24px`, nét `--icon-stroke: 1.5px`. **Trần dưới 12 icon toàn site** (C11). `--border-width: 1px`, `--border-width-thick: 2px` (focus ring).

### B.8 Color — Kinetic 4-color, section-based (chốt theo **D46/D47**)

**Nguồn canonical của mọi giá trị màu.** Component chỉ dùng token semantic; không hard-code HEX. Không token 2-mode (D46 — section-based, không light/dark).

**Primitive (khóa, D47):** `#FBFBFB` White · `#040404` Black · `#DEDEDE` Grey · `#FF4000` Orange.

**Orange scale (derived):** `o-100 #FFE0D4` · `o-300 #FF8A63` · `o-400 #FF6A3C` · `o-500 #FF4000` · `o-600 #E03600` · `o-700 #C42F00` · `o-800 #A62800`.

**Semantic mapping per surface** (fg · secondary · muted · border · accent-text). Mỗi cặp chữ-trên-nền đo AA **theo từng surface**:

| Surface | fg | secondary | muted | border | accent-text |
| --- | --- | --- | --- | --- | --- |
| White `#FBFBFB` | `#040404` | `#3A3A3A` | `#6E6E6E` | `#DEDEDE` | `o-700 #C42F00` |
| Grey `#DEDEDE` | `#040404` | `#3A3A3A` | `#555555` | `#B0B0B0` | `o-800 #A62800` |
| Black `#040404` | `#FBFBFB` | `#B0B0B0` | `#8A8A8A` | `#3A3A3A` | `o-500 #FF4000` |
| Orange `#FF4000` | `#040404` | `#1A0A05` | `#2A1206` | `#040404` | `#040404` |

**Accent fill:** `#FF4000`, on-accent text `#040404`. **Focus ring:** `#FF4000`. **Orange budget:** ≤1 CTA + ≤1 marker/keyword mỗi viewport; cấm cam làm body/link nhỏ không đạt AA.

**Functional & pillar — chưa khóa:**
- `--color-danger` = **`Pending — Phase Color System` (D47)**. KHÔNG HEX, KHÔNG palette danger ở milestone này. Functional danger state phân biệt bằng icon + text, không dựa hue.
- `--color-success`, `--color-warning`, `--color-pillar-1..5` — kiến trúc token giữ nguyên, **giá trị hoãn** (không khóa ngoài phạm vi D47).

### B.9 Breakpoints (chốt theo D44)

**Mobile-first** (min-width). Bốn ngưỡng chính khớp 4 container (§B.3) và hai grid theo hành vi:

| Tên | Token | Min-width | Thiết bị | Container | Nav | Grid |
| --- | --- | --- | --- | --- | --- | --- |
| Mobile | *(base)* | 0 | điện thoại | `prose` full-bleed padding | menu trượt (hamburger) | 1 cột |
| Tablet | `--bp-md` | 768px | máy tính bảng | `content` (≤1080) | menu trượt hoặc rút gọn | 2 cột |
| Desktop | `--bp-lg` | 1024px | laptop | `content`/`wide` | nav ngang 5 mục | 12 cột |
| Wide | `--bp-xl` | 1280px | desktop rộng | `wide` (≤1280) | nav ngang | 12 cột |

- Ngưỡng phụ (tùy chọn triển khai 1.1): `--bp-sm: 640px` (large mobile), `--bp-2xl: 1536px` (chỉ tăng lề, không giãn measure).
- **Gutter:** 24px (`--space-5`) mọi breakpoint; lề ngoài `--space-5` mobile / `--space-7` desktop.
- **Typography response:** body 19→17px, heading co qua `clamp()`; `--measure-prose: 68ch` **bất biến** xuyên breakpoint.
- **Wireframe mapping:** wireframe 0.4D mô tả composition ở **Mobile · Tablet · Desktop** (Wide dùng chung layout Desktop, chỉ đổi lề).
- **Lý do chọn ngưỡng:** 768/1024/1280 là ranh giới nội dung tự nhiên — 768 nơi 2 cột đọc được, 1024 nơi nav ngang + cột-lề-phải TOC vừa, 1280 nơi `wide` thở đủ. Chọn theo nội dung, không theo model thiết bị cứng. **Không tạo Tailwind config ở 0.4** (thuộc 1.1).
