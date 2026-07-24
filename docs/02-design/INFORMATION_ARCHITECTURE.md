# Information Architecture

Phiên bản 1.0 — 2026-07-24. Chốt theo **D31**, đồng bộ bản khóa D23–D35.

Nguồn sự thật về định vị: `BRAND_POSITIONING.md`. Khi mâu thuẫn, định vị và Decision Log thắng.

## 1. Sitemap

```
/                              Home
│
├── /writing/                  Danh sách bài viết (hiển thị hết — pagination Phase 2)
│   └── /writing/[slug]/        Bài viết
│
├── /topics/[pillar]/          Hub của một trụ (đúng 5 trụ, D31)
│
├── /case-studies/             Danh sách case study (hiển thị hết — filter Phase 2)
│   └── /case-studies/[slug]/   Một case study
│
├── /about/                    Giới thiệu + section Experience (timeline) + khối "Làm việc cùng tôi"  (D26)
├── /contact/                  Liên hệ
│
├── /privacy/                  Chính sách riêng tư
├── /404, /500                 Trang lỗi
└── /sitemap.xml, /robots.txt, /rss.xml
```

**Hoãn Phase 2:** `/resources/`, `/speaking/`, `/tags/[tag]/`, `/writing/page/[n]/` (pagination), search. Kiến trúc phải chừa chỗ cho hai mục đầu mà không thiết kế lại (D18).

## 2. Navigation

Điều hướng theo **loại nội dung**, không theo cấu trúc portfolio.

| Vị trí | Nội dung |
| --- | --- |
| Header chính | **Viết · Case study · Chủ đề · Giới thiệu · Liên hệ** (5 mục, D26). Experience là section trong About, không lên nav |
| Header phụ | Nút chuyển theme (D10) |
| Không lên header | "Làm việc cùng tôi" — là **khối** trên Home và About, không phải mục nav (D18, P2) |
| Trong bài | Mục lục dính ở cột lề phải (desktop), thu gọn trên mobile |
| Cuối bài | 3 bài liên quan cùng trụ + tối đa 1 CTA (P8) |

**Search KHÔNG có ở MVP** (D33) — không đặt ô tìm kiếm trên header.

## 3. Taxonomy

| Tầng | Tên | Số lượng | Đóng/Mở | Vai trò |
| --- | --- | --- | --- | --- |
| 1 | **Trụ** (pillar) | Đúng 5, cố định (D16) | Đóng — Zod enum, sai thì build fail | Trục điều hướng chính; mỗi trụ là hub `/topics/[pillar]` |
| 2 | Tag | — | **Hoãn Phase 2** | Không có ở MVP |

Case study phân loại bằng `services` và `industry` trong frontmatter (D14). Bộ lọc theo hai trục này **hoãn Phase 2** (D33); MVP chỉ hiển thị.

Năm trụ: `Chiến lược` · `Tăng trưởng số` · `Nội dung và Truyền thông` · `AI cho Marketing` · `Lãnh đạo và Quan điểm`.

## 4. URL hierarchy

| Loại | Mẫu | Ví dụ |
| --- | --- | --- |
| Bài viết | `/writing/[slug]/` | `/writing/khung-dinh-vi-thuong-hieu/` |
| Hub trụ | `/topics/[pillar]/` | `/topics/ai-cho-marketing/` |
| Case study | `/case-studies/[slug]/` | `/case-studies/tai-dinh-vi-x/` |

**Quy tắc:**

- Đoạn đường dẫn tiếng Anh (`writing`, `topics`, `case-studies`), slug tiếng Việt không dấu. Đoạn tiếng Anh giữ chi phí bật song ngữ (D1) ở mức thấp; slug tiếng Việt giữ SEO cho thị trường chính.
- Slug derive từ tên file MDX.
- **URL đã xuất bản là bất biến.** Nếu buộc phải đổi thì redirect 301 vĩnh viễn. Đây là tài sản SEO tích lũy nhiều năm.

## 5. Content relationship

```
profile.config.ts ──┬── experiences[]
                     ├── servicesOffered[]   (khối "Làm việc cùng tôi")
                     └── socialLinks[]

MDX bài viết  ── category ─→ 1 trong 5 trụ (bắt buộc)
              ── link inline ─→ case study liên quan (không qua schema)

MDX case study ── services[] ─→ trục phân loại
               ── metrics[]  ─→ số liệu kết quả
```

Liên kết bài viết ↔ case study là **link thường trong thân MDX**, không phải trường frontmatter. Đây là cầu nối biến người đọc nhóm 2–3 thành khách hàng nhóm 1, làm thủ công có kiểm soát.

## 6. Internal linking strategy

Mô hình topic cluster:

| Quy tắc | Chi tiết |
| --- | --- |
| Hub → Spoke | Trang trụ liệt kê toàn bộ bài thuộc trụ |
| Spoke → Hub | Mỗi bài dẫn ngược về trang trụ qua breadcrumb và nhãn trụ |
| Spoke ↔ Spoke | Tối thiểu 2 liên kết nội bộ trong thân bài (quy tắc biên tập) |
| Bài ↔ Case study | Link inline hai chiều khi liên quan |
| Bài liên quan | Lấy theo **cùng trụ, gần ngày nhất** — không sinh tự động bằng độ trùng từ khóa |

## 7. Breadcrumb strategy

| Trang | Breadcrumb | + JSON-LD |
| --- | --- | --- |
| Bài viết | `Trang chủ › Viết › [Trụ] › [Tiêu đề]` | `BreadcrumbList` |
| Hub trụ | `Trang chủ › Chủ đề › [Trụ]` | có |
| Case study | `Trang chủ › Case study › [Tiêu đề]` | có |
| Trang tĩnh | — | không |

Mục cuối không phải liên kết. Trên mobile rút còn hai cấp cuối.

## 8. Homepage information flow

Chốt theo **D25**. Chi tiết ở `PRODUCT_REQUIREMENTS.md` §5.

1. Hero — định vị dạng phát biểu vấn đề
2. Bài viết `featured: true`
3. Case study `featured: true` có số liệu
4. Bản đồ 5 trụ → `/topics/[pillar]`
5. Khối "Làm việc cùng tôi" (D18)
6. CTA chính = "Làm việc cùng tôi" / Liên hệ (newsletter hoãn Phase 2, D27)
7. Footer

Trần 2 CTA mỗi trang (D23/P8).

## 9. Footer structure

Footer nhỏ, **không phải sitemap**. Hai cột + dòng cuối:

| Cột 1 — Nội dung | Cột 2 — Kết nối |
| --- | --- |
| Viết · Case study · Chủ đề · Giới thiệu · Liên hệ · Kinh nghiệm (anchor About) | Social · RSS |

Dòng cuối: bản quyền · Chính sách riêng tư · nút chuyển theme. Experience nằm ở footer/About (D21).

## 10. Trạng thái quyết định (đã đóng ở 0.5D)

- **D26 Approved (A):** nav 5 mục theo loại nội dung; Experience là section trong About + anchor footer. Không còn route `/experience/` riêng.
- **D27 Approved (B):** newsletter hoãn Phase 2; Home CTA chính = "Làm việc cùng tôi"/Liên hệ; footer không có khối đăng ký (giữ Social + RSS).
