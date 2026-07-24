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

### B.1 Typography

**Vai trò theo họ chữ, chốt theo D36 (tu chỉnh D32):**

- **Serif** — Hero, Display, Major Heading.
- **Sans-serif** — Body, Navigation, UI, Metadata.
- **Mono** — chỉ metadata/technical khi cần; không làm phong cách chính.

Đây là thay đổi so với bản D32 gốc (body serif). Editorial thể hiện ở heading serif; body dùng sans cho khả năng đọc dài và cảm giác product-level (xem `DESIGN_SYSTEM.md` §Typography).

Phương án font khuyến nghị: **serif heading** Newsreader (hoặc Source Serif 4) · **sans body/UI** Inter (hoặc Be Vietnam Pro) · **mono metadata** IBM Plex Mono. Cả các font ứng viên đã xác nhận vùng phủ tiếng Việt qua Google Fonts metadata; **chất lượng dựng dấu ở 15px kiểm bằng mắt ở 0.4** (giả định A2).

Thang chữ 8 bậc (đã bỏ `--text-display`), tỷ lệ 1.250 desktop / 1.200 mobile qua `clamp()`:

| Token | Desktop | Vai trò |
| --- | --- | --- |
| `--text-h1` | 45px | tiêu đề trang/bài (hero dùng bậc này) |
| `--text-h2` | 36px | mục lớn |
| `--text-h3` | 28px | mục nhỏ |
| `--text-lg` | 22px | sapo, dẫn nhập |
| `--text-body` | 19px | thân bài |
| `--text-sm` | 16px | giao diện, chú thích |
| `--text-xs` | 14px | metadata, nhãn mono |

Dòng cao: thân bài `1.7` (rộng hơn chuẩn tiếng Anh vì dấu chồng), tiêu đề `1.15`, giao diện `1.5`. Độ dài dòng: `--measure-prose: 68ch`.

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
