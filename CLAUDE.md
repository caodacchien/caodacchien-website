# CLAUDE.md

Tài liệu này là **nguồn sự thật duy nhất** về những gì đang chạy. Đọc file này trước khi
viết bất kỳ dòng code nào.

> ⚠️ `docs/archive/` chứa 45 file của Phase 0 mô tả một hệ thiết kế và kiến trúc **đã bị
> thay thế**. Đừng dùng chúng làm căn cứ. Lý do đầy đủ ở `docs/archive/README.md`.

---

## Sản phẩm là gì

Nền tảng xuất bản cá nhân của **Cao Đắc Chiến** tại `caodacchien.io.vn` — website cá nhân
nhưng **hướng ra cộng đồng**, không phải trang nói về bản thân.

Ba việc website làm: đăng bài viết về chiến lược marketing / thương hiệu / truyền thông,
phát hành tài liệu tải về, và cho chủ website tự quản trị mọi thứ mà không cần lập trình viên.

**Thước đo thành công số một:** chủ website đăng được một bài từ đầu đến cuối mà không cần
mở VS Code, không cần gọi ai.

## Ngăn xếp

| Lớp | Công nghệ |
|---|---|
| Khung | Next.js 15 App Router · React 19 · TypeScript strict |
| CMS | Payload 3 nhúng cùng repo, trang quản trị ở `/admin` |
| Cơ sở dữ liệu | Supabase Postgres (Singapore), nối qua **Session pooler** |
| Kiểu dáng | CSS thuần + CSS Modules. **Không Tailwind, không thư viện UI** |
| Chữ | Plus Jakarta Sans qua `next/font` |
| Hosting | Vercel · Cloudflare giữ DNS và SSL |

## Cấu trúc thư mục

```
src/
  app/
    (frontend)/       # website người đọc thấy
    (payload)/        # trang quản trị — file khuôn mẫu, KHÔNG sửa tay
  collections/        # định nghĩa dữ liệu Payload
  blocks/             # khối nhúng trong bài (hiện có: YouTube)
  components/         # component dùng chung + CSS Module đi kèm
  lib/                # pillars, posts, toc, payload, site
  payload.config.ts   # cấu hình Payload
docs/archive/         # lịch sử Phase 0 — KHÔNG dùng làm căn cứ
```

**Hai nhóm route bắt buộc phải tách.** Next.js chỉ cho một root layout, mà Payload cần
root layout riêng cho `/admin`. Đừng gộp lại.

---

## Hệ thiết kế

Nguồn: `DESIGN.md` của pop.site (không nằm trong repo). Toàn bộ token đã chép vào
`src/app/(frontend)/globals.css` kèm chú thích lý do.

**Bốn luật không được phá:**

1. **Đúng một màu nhấn: cam `#FF4000`.** Dùng thật tiết kiệm — nút chính, link đang hoạt
   động, vạch chỉ vị trí. Một điểm cam mỗi khung hình.
2. **Không bóng đổ.** Chiều sâu đến từ viền tóc 1px và bo góc.
3. **Nút bấm chỉ có hai bán kính: pill `9999px` hoặc lớn `22–26px`.** Không bao giờ 4–8px.
4. **Một bộ chữ duy nhất.** Cỡ chữ chỉ lấy trong sáu bậc đã khai báo.

**Ba chỗ cố ý chệch DESIGN.md**, đánh dấu `[CHỆCH]` trong `globals.css` — đều vì tiếng
Việt hoặc khả năng tiếp cận, đọc chú thích tại chỗ trước khi sửa.

**Tương phản màu cam** (đã tính, đừng tính lại):

| Dùng ở đâu | Giá trị | Tỉ lệ |
|---|---|---|
| Nền nút | `#ff4000` + chữ **đen** | 5,99:1 ✅ |
| Chữ cam trên nền trắng | `#c42f00` | 5,59:1 ✅ |
| ~~`#ff4000` làm chữ~~ | | 3,51:1 ❌ trượt AA |

---

## Bốn cái bẫy đã sập, đừng sập lại

Bốn lỗi dưới đây đều **không làm build đỏ, không làm typecheck đỏ, không làm HTTP khác 200**.
Chúng chỉ lộ ra khi mở mắt nhìn hoặc khi build production.

**1. Cấu hình hợp lệ về kiểu ≠ cấu hình có hiệu lực.**
`admin.livePreview` thiếu khoá `collections` → Payload bỏ qua trong im lặng, không báo gì.
Kiểm bằng cách hỏi hệ thống đang chạy, không đọc file nguồn:
- Trường trong CSDL → truy vấn `information_schema.columns`
- Thành phần giao diện → `grep` chuỗi nhãn trong `.next` đã biên dịch

**2. HTTP 200 không có nghĩa là trông đúng.**
Trang quản trị từng chạy hoàn toàn không có CSS vì thiếu `import "@payloadcms/next/css"`.
Vẫn trả 200. Với mọi thay đổi giao diện: đếm số thẻ `stylesheet` trong HTML, hoặc nhìn tận mắt.

**3. Đừng bọc `headers()` trong try/catch.**
Next.js báo hiệu "trang phải render động" bằng cách **ném lỗi** từ `headers()`. Nuốt lỗi đó
là để Next đem trang đi dựng sẵn lúc build rồi vỡ vì chưa có kết nối CSDL. Chỉ nổ lúc build
production, `pnpm dev` im lặng hoàn toàn.

**4. Đừng chạy `pnpm build` khi `pnpm dev` đang chạy.**
Hai lệnh dùng chung thư mục `.next`; build ghi đè và giết máy chủ dev đang phục vụ
(`Cannot find module './4331.js'`). Trình tự đúng: dừng dev → build → chạy lại dev.

---

## Quy tắc viết code

- **Trang đọc dữ liệu Payload phải có `export const dynamic = "force-dynamic"`.** Dựng sẵn
  lúc build sẽ đóng băng nội dung ở thời điểm deploy — chủ website bấm đăng mà bài không hiện.
- **Trạng thái rỗng phải viết như câu tiếng Việt thật.** Không bao giờ để "Không có dữ liệu".
  Website này là bằng chứng năng lực thương hiệu; một chuỗi mặc định làm hỏng chính lập luận đó.
- **Nội dung minh hoạ phải bật cờ `isDemo`** → tự động loại khỏi sitemap và gắn `noindex`.
- **File tải lên bắt buộc điền `sourceNote`.** Chỉ đăng tài liệu do chủ website viết hoặc có
  quyền phát hành — không đăng lại sách, giáo trình, slide của người khác.
- **Nhãn trường trong Payload viết tiếng Việt.** Người dùng admin duy nhất không làm kỹ thuật.
- **Không dùng `sharp`.** `next/image` đã đổi cỡ và định dạng tại edge; sinh sẵn nhiều cỡ chỉ
  tốn dung lượng. Lý do đầy đủ trong `payload.config.ts`.

## Lệnh

```bash
pnpm dev                  # phát triển
pnpm check                # lint + typecheck
pnpm build                # PHẢI dừng dev trước
pnpm generate:types       # sau khi đổi collection
pnpm generate:importmap   # sau khi thêm plugin hoặc feature có giao diện
```

## Biến môi trường

`.env.local` trên máy, **Environment Variables** trên Vercel. Không bao giờ commit.

| Biến | Dùng làm gì |
|---|---|
| `DATABASE_URI` | Supabase **Session pooler**. KHÔNG dùng Direct connection — nó chỉ có IPv6, Vercel không gọi được |
| `PAYLOAD_SECRET` | Ký phiên đăng nhập quản trị |
| `NEXT_PUBLIC_SITE_URL` | Dùng cho SEO và link xem trước |
| `BLOB_READ_WRITE_TOKEN` | Kho ảnh và file. **Bắt buộc trên Vercel** — hệ thống file ở đó chỉ đọc |
| `RESEND_API_KEY` | Email khôi phục mật khẩu và thông báo liên hệ |

Thiếu ba biến cuối thì code vẫn chạy được ở máy, chỉ tắt tính năng tương ứng.

---

## Còn phải làm

**Chặng 1 — trước khi lên sóng**
Cỡ chữ và màu chữ trong trình soạn thảo (khóa bộ chữ) · URL có danh mục `/chien-luoc/ten-bai` ·
Trang chủ đề · Thư viện tài liệu + đổi email lấy file · Giới thiệu · Liên hệ ·
sitemap, ảnh OG, GA4

**Chặng 2 — sau khi lên sóng**
Chấm điểm SEO kiểu Yoast · Đánh giá độ dễ đọc tiếng Việt · Bình luận có đăng nhập ·
Bán tài liệu (cần nâng Vercel Pro — gói Hobby cấm dùng cho mục đích thương mại)
