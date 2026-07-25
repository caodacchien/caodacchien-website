# Component Inventory & Design Tokens

Phiên bản 1.0 — 2026-07-24. Chốt theo **D32** (token) và **D33** (component).

Đây là tài liệu tham chiếu triển khai. Design Principles và Design Constraints nằm ở `DESIGN_SYSTEM.md`.

---

## Phần A — Component Inventory

**19 component cho MVP** (từ 38 sau tối giản hóa; `NewsletterForm` lùi Phase 2 theo D27). Mỗi component tái sử dụng nhiều nơi, trách nhiệm rõ.

`SearchDialog`, `Pagination`, `FilterBar`, `NewsletterForm` **hoãn Phase 2** (D33, D27).

### Nền tảng

| Component | Mục đích | Xuất hiện ở |
| --- | --- | --- |
| `Header` | Điều hướng chính, gồm skip-link + trigger theme | mọi trang |
| `Footer` | Điều hướng phụ, 2 cột | mọi trang |
| `ThemeToggle` | 3 trạng thái system/light/dark (D10) | header |
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

**Ghi chú:** `/topics/[pillar]` được giữ (D31) nhưng **không thêm component mới** — trang hub ghép từ `ContentHeader` + danh sách `ContentCard` + `PillarMap`.

**Future (không tính vào 19 component MVP):** một `SoundToggle` / nút Mute luôn hiển thị sẽ cần khi triển khai Sound & Interaction (D36, mặc định ON). Xem `DESIGN_SYSTEM.md` §Future Enhancement — Sound & Interaction. Không implement ở milestone hiện tại.

---

## Phần B — Design Tokens

Chốt **kiến trúc** token; **giá trị màu để trống** tới Milestone 0.4 (tôn trọng D10). D32.

### B.1 Typography — Geist (chốt theo D43)

**Font family (D43):**

- **Geist Sans** — font chính (Vercel, OFL 1.1): Hero · Heading · Body · Navigation · UI · Button · Form · Label.
- **Geist Mono** — chỉ metadata/technical: ngày · thời gian đọc · category/tag · số liệu case study · code/kỹ thuật.
- **Không serif ở MVP.** Đây là tu chỉnh so với D36/D32 (vốn dùng serif cho heading) — xem D43.

Tiếng Việt: cả Geist Sans và Geist Mono đã xác nhận vùng phủ `vietnamese` + `vi_Latn` qua Google Fonts metadata (gồm dải 7840–7929 và combining diacritics). **Chất lượng dựng dấu thị giác** ở 14/15/16px là **validation bắt buộc bằng render thật** (specimen, xem cuối §B.1) — chưa được coi là đạt cho tới khi chủ dự án xem specimen.

**Thang chữ 8 bậc — GIỮ NGUYÊN theo D32** (không đổi con số; chỉ đổi họ font sang Geist Sans). Tỷ lệ 1.250 desktop / 1.200 mobile qua `clamp()`:

| Token | Desktop | Mobile (≈) | Vai trò | Weight |
| --- | --- | --- | --- | --- |
| `--text-h1` | 45px | 34px | tiêu đề trang/bài (hero dùng bậc này) | 600 |
| `--text-h2` | 36px | 28px | mục lớn | 600 |
| `--text-h3` | 28px | 24px | mục nhỏ | 600 |
| `--text-lg` | 22px | 19px | sapo, dẫn nhập | 400–500 |
| `--text-body` | 19px | 17px | thân bài | 400 |
| `--text-sm` | 16px | 16px | giao diện, chú thích | 400–500 |
| `--text-xs` | 14px | 14px | metadata, nhãn mono | 400–500 |

- **Dòng cao:** thân bài `1.7` (rộng hơn chuẩn tiếng Anh vì dấu chồng), tiêu đề `1.15`, giao diện `1.5`.
- **Độ dài dòng:** `--measure-prose: 68ch`.
- **Weight:** heading 600 · body 400 · nav/UI 500–600 · **hạn chế 300** (không dùng cho body/nav).
- **Letter-spacing:** body & mọi text tiếng Việt = **0** (cấm tracking âm — dấu cần khoảng thở). Heading lớn (h1/h2) có thể `-0.01em` rất nhẹ, **nhưng phải kiểm dấu trên chữ hoa** (Ế/Ữ) trước khi áp.
- **Text-transform:** không uppercase dài. Uppercase chỉ cho eyebrow/nhãn **ngắn** (mono), kèm `letter-spacing` dương nhẹ; phải kiểm dấu trên chữ hoa.
- **Responsive:** body 19px→17px, heading co qua `clamp()`; measure 68ch bất biến (chỉ padding co).
- **Fallback stack (dùng khi Geist chưa tải):** Geist Sans → `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`; Geist Mono → `ui-monospace, "SF Mono", "Cascadia Code", monospace`. `system-ui` phủ tiếng Việt trên đa số OS.
- **Font loading (dự kiến Milestone 1.1, KHÔNG làm ở 0.4):** self-host qua gói `geist` chính thức của Vercel (`geist/font/sans`, `geist/font/mono`) với `next/font`; `display: swap`; subset `latin` + `vietnamese`; preload font above-the-fold. **Không cài package ở 0.4.**

**Vietnamese specimen — validation bắt buộc (D43):** phải render Geist Sans + Geist Mono ở **14px, 15px, 16px và body 19px** với các chuỗi: `Cao Đắc Chiến` · `Chiến lược thương hiệu bền vững` · `Marketing và truyền thông trong kỷ nguyên số` · `Nguyễn, Truyền thông, Thương hiệu, Đổi mới` · `Hiệu quả, Dữ liệu, Quỹ đạo, Tăng trưởng` · `Ă Â Đ Ê Ô Ơ Ư` / `ă â đ ê ô ơ ư` · `Ắ Ằ Ẳ Ẵ Ặ` · `Ế Ề Ể Ễ Ệ` · `Ố Ồ Ổ Ỗ Ộ` · `Ớ Ờ Ở Ỡ Ợ` · `Ứ Ừ Ử Ữ Ự`. Kiểm: lỗi dấu, dấu chồng, khoảng cách, khả năng đọc. Vehicle: HTML specimen artifact (OD-3). Chủ dự án duyệt trước khi coi typography là đạt.

**Kết quả validation — ĐẠT (chủ dự án duyệt trực quan 2026-07-25):** render specimen thật; Geist Sans và Geist Mono **loaded: true** (không fallback); dấu tiếng Việt ở 14/15/16/17/19/28/36/45px hiển thị đúng, **không** cắt/chồng/lệch dấu; light mode đọc tốt, dark mode giữ hierarchy. Body 19px/1.7/68ch được duyệt; Geist Mono được duyệt cho metadata/ngày/thời gian đọc/tag/số liệu/technical. (Chuỗi 45px xuống dòng là hành vi mong đợi, không phải defect.)

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

### B.4 Radius

`--radius-none: 0` · `--radius-md: 4px` · `--radius-lg: 8px` (đã bỏ `--radius-sm`). **Trần 8px** (C13/D24). Avatar là ngoại lệ dùng `--radius-full`.

### B.5 Elevation

2 mức (đã bỏ `--elevation-2`). Light: phân tầng bằng **viền 1px**, không đổ bóng. Dark: phân tầng bằng **độ sáng bề mặt**, không sao chép bóng từ light.

### B.6 Motion

`--duration-fast: 120ms` · `--duration-base: 160ms` · `--duration-slow: 200ms` (**trần**). Chỉ chuyển động `opacity`, `transform`, `background-color`. Bọc trong `@media (prefers-reduced-motion: reduce)`. Không reveal khi cuộn (P9/C12).

### B.7 Icon & Border

`--icon-sm/md/lg: 16/20/24px`, nét `--icon-stroke: 1.5px`. **Trần dưới 12 icon toàn site** (C11). `--border-width: 1px`, `--border-width-thick: 2px` (focus ring).

### B.8 Color semantic — kiến trúc, giá trị để trống

Hai tầng. **Component chỉ dùng tầng semantic.** Giá trị điền ở 0.4.

Tầng nguyên thủy (chỉ ở nơi định nghĩa): `--ink-*`, `--paper-*`, `--accent-*`.

Tầng semantic: `--color-surface`, `--color-surface-raised`, `--color-surface-sunken`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-on-accent`, `--color-border`, `--color-border-strong`, `--color-accent`, `--color-accent-hover`, `--color-focus-ring`, `--color-success`, `--color-warning`, `--color-danger`, `--color-pillar-1..5`.

Mỗi token semantic có giá trị cho **cả hai chế độ**; mỗi cặp chữ-trên-nền đo tương phản AA **riêng từng chế độ**.

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
