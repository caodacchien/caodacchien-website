# Decision Log

Nhật ký các quyết định lớn của dự án. Mỗi quyết định có ID cố định và được tham chiếu từ các tài liệu khác.

Quy tắc:

- Chỉ chủ dự án được phê duyệt một quyết định.
- Quyết định đã duyệt không được thay đổi âm thầm. Muốn đổi phải tạo ID mới và đánh dấu ID cũ là `Superseded by Dxx`.
- Mọi tài liệu mâu thuẫn với Decision Log phải được sửa cho khớp, không phải ngược lại.

Trạng thái: `Approved` | `Open` | `Superseded`

---

## D1 — Ngôn ngữ website

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** `PRODUCT_REQUIREMENTS.md` §7 để ngỏ lựa chọn Việt / Anh / song ngữ. Đây là quyết định chặn nặng nhất vì ảnh hưởng routing, mô hình dữ liệu, sitemap và hreflang.

**Quyết định:** MVP chỉ xuất bản tiếng Việt. Kiến trúc phải sẵn sàng cho song ngữ để bật tiếng Anh ở Phase 2 mà không phải migrate lại.

**Hệ quả kỹ thuật:**

- Route group `src/app/[locale]/`, `defaultLocale = 'vi'`, `locales = ['vi']` ở MVP.
- Middleware rewrite `/` sang `/vi` nội bộ. URL hiển thị công khai ở MVP **không** có tiền tố locale, tránh làm loãng tín hiệu SEO khi chỉ có một ngôn ngữ.
- File nội dung MDX đặt tên theo dạng `slug.vi.mdx`.
- Mọi bảng nội dung trong database có cột `locale` và `translation_key`.
- Chuỗi giao diện tách vào `src/config/i18n/vi.ts`, không hard-code trong JSX.
- Khi bật `en` ở Phase 2: thêm locale vào cấu hình, bật tiền tố URL cho cả hai, thêm `hreflang`. Không cần đổi schema.

---

## D2 — Nguồn dữ liệu nội dung

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** `SYSTEM_ARCHITECTURE.md` §6 để ngỏ MDX / database / hybrid, trong khi `DATABASE.md` đã thiết kế sẵn bảng `posts`, `categories`, `tags`. Đây là mâu thuẫn C3.

**Quyết định:** Hybrid. Blog dùng MDX trong repository. Dữ liệu có cấu trúc dùng Supabase.

| Loại nội dung | Nguồn |
| --- | --- |
| Bài viết blog | MDX trong `content/blog/` |
| Category, tag, reading time, TOC | Frontmatter và xử lý lúc build |
| Profile, Experience, Project, Project media | Supabase |
| Contact submissions | Supabase |

**Lý do:** Blog là tài sản SEO quan trọng nhất, để trong Git thì build tĩnh hoàn toàn, không phụ thuộc uptime của Supabase Free (project bị pause sau 7 ngày không hoạt động). Dữ liệu có cấu trúc để trong database thì sẵn sàng cho CMS ở Phase 2.

**Hệ quả kỹ thuật:**

- Bỏ bảng `posts`, `categories`, `tags` khỏi thiết kế database.
- Bắt buộc có một content service layer hợp nhất tại `src/services/content/` để trang Home lấy được cả bài viết mới nhất (MDX) lẫn dự án nổi bật (database) qua cùng một giao diện.
- Frontmatter phải được validate bằng Zod lúc build. Frontmatter sai thì build fail, không được im lặng bỏ qua.

**Rủi ro đã ghi nhận:** hai nguồn sự thật. Giảm thiểu bằng content service layer bắt buộc ở trên.

---

## D3 — CMS và Authentication ở MVP

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** `PROJECT_CONSTITUTION.md` §3 xếp "CMS tối thiểu" vào MVP nhưng `ROADMAP.md` xếp CMS ở Phase 2. Đây là mâu thuẫn C2.

**Quyết định:** MVP **không** có CMS và **không** có Supabase Auth. CMS lùi sang Phase 2.

**Hệ quả kỹ thuật:**

- Không có route `/admin` ở Phase 1.
- Không dùng `@supabase/auth-helpers` ở Phase 1.
- Nội dung được sửa qua Git (MDX) hoặc Supabase Studio (dữ liệu có cấu trúc).
- Anon key chỉ có quyền đọc bản đã xuất bản. Mọi thao tác ghi đi qua service role phía server.
- Bề mặt tấn công của MVP nhỏ hơn đáng kể vì không có luồng đăng nhập.

**Tài liệu phải sửa:** `PROJECT_CONSTITUTION.md` §3 bỏ dòng CMS khỏi MVP.

---

## D4 — Phạm vi trang của MVP

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** `PROJECT_CONSTITUTION.md` §3 liệt kê 6 trang, `PRODUCT_REQUIREMENTS.md` §4 liệt kê 8 trang. Đây là mâu thuẫn C1.

**Quyết định:** MVP gồm đúng 6 trang: Home, About, Experience, Projects, Blog, Contact.

**Hệ quả kỹ thuật:**

- Resources và Speaking / Teaching lùi sang Phase 2.
- Bảng `resources` và `newsletter_subscribers` giữ trong tài liệu thiết kế nhưng đánh dấu Phase 2 và **không** tạo migration ở Phase 1.
- Navigation toàn cục chỉ có 6 mục.

**Lý do lùi:** chưa có nội dung thật cho hai trang này. Xuất bản trang rỗng vi phạm yêu cầu empty state có ý nghĩa trong `PRODUCT_REQUIREMENTS.md` §6.

**Tài liệu phải sửa:** `PRODUCT_REQUIREMENTS.md` §4.

---

## D5 — Quyền sở hữu hạ tầng

**Trạng thái:** Approved — 2026-07-23

**Quyết định:** Toàn bộ mã nguồn, database, deployment và domain thuộc tài khoản cá nhân của chủ dự án, **không** thuộc Roboworld.

| Hạng mục | Tài khoản |
| --- | --- |
| Domain | `caodacchien.io.vn`, đã mua, sở hữu cá nhân |
| Email hạ tầng | `forwork.chiencd@gmail.com` |
| GitHub | `caodacchien` |
| Cloudflare | tài khoản cá nhân, tạo bằng email hạ tầng ở trên |
| Vercel | tài khoản cá nhân, tạo bằng email hạ tầng ở trên |
| Supabase | tài khoản cá nhân, tạo bằng email hạ tầng ở trên |

**Ràng buộc:**

- Không dùng email công ty, không dùng tổ chức GitHub của Roboworld, không dùng team Vercel của Roboworld.
- Repository ở dạng private cho tới khi chủ dự án quyết định công khai.
- Vercel Hobby cấm sử dụng thương mại. Website phải giữ đúng tính chất portfolio cá nhân. Nếu về sau có nội dung bán hàng hoặc dịch vụ thì phải nâng cấp gói trước, xem D6.

---

## D6 — Ranh giới thông tin với Roboworld

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** Chủ dự án là CEO Công ty Cổ phần Tập đoàn Roboworld. Website có nhắc tới công ty trong phần kinh nghiệm nghề nghiệp.

**Quyết định:** Được phép nhắc Roboworld trong Experience và Projects dưới góc độ portfolio cá nhân.

**Được phép:**

- Chức danh, giai đoạn công tác, phạm vi trách nhiệm.
- Case study đã được phép công khai.
- Thông tin đã công bố rộng rãi trên kênh chính thức của công ty.

**Cấm tuyệt đối:**

- Dữ liệu mật và tài liệu nội bộ.
- Thông tin khách hàng, kể cả tên khách hàng chưa được phép nêu.
- Thông tin tài chính, doanh thu, biên lợi nhuận, giá bán.
- Mã nguồn hoặc tài sản kỹ thuật thuộc sở hữu công ty.

**Quy trình bắt buộc:** Mọi nội dung có nhắc tới Roboworld hoặc khách hàng của Roboworld phải được đánh dấu `REVIEW-REQUIRED` trong `CONTENT_INVENTORY.md` và **chỉ được xuất bản sau khi chủ dự án kiểm duyệt**. AI agent không được tự quyết định một thông tin là công khai hay không.

---

## D7 — Tính trung thực của nội dung

**Trạng thái:** Approved — 2026-07-23

**Quyết định:** Cấm bịa nội dung. Không được tự tạo ra thành tích, số liệu, chức danh, tên dự án, khách hàng, học vấn hoặc chứng chỉ.

**Quy ước placeholder:** Trong lúc dựng giao diện khi chưa có nội dung thật, được dùng placeholder nhưng phải đánh dấu rõ ràng và có thể tìm được bằng grep:

- Văn bản: bắt đầu bằng `PLACEHOLDER:` hoặc `DRAFT:`.
- Số liệu: dùng `--` hoặc `PLACEHOLDER`, tuyệt đối không dùng con số trông như thật.
- Ảnh: dùng ô xám có nhãn `PLACEHOLDER`, không dùng ảnh người thật lấy từ nguồn khác.

**Cổng kiểm soát:** Không milestone nào được deploy production khi còn chuỗi `PLACEHOLDER:` hoặc `DRAFT:` trong nội dung công khai. Đây là một mục bắt buộc trong checklist trước production.

**Điều kiện mở khóa Milestone 1.4 (Home + About):** chủ dự án cung cấp tối thiểu positioning statement, bio, ảnh chân dung, kinh nghiệm chính và ít nhất 1 project thật. Xem `docs/01-product/CONTENT_INVENTORY.md`.

---

## D8 — Email cho Contact Form

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** `DEPLOYMENT.md` ghi "lựa chọn sau", `SYSTEM_ARCHITECTURE.md` §6 để ngỏ Resend hay Gmail, nhưng `.env.example` đã có sẵn `RESEND_API_KEY`. Đây là mâu thuẫn C4.

**Quyết định:** MVP dùng Resend. Chưa tích hợp và chưa tạo API key ở Phase 0.

**Phạm vi Phase 0:** chỉ cập nhật tài liệu kiến trúc và `.env.example` với biến rỗng.

**Phạm vi Phase 1.7:** tích hợp thực tế, gửi thông báo về `forwork.chiencd@gmail.com`.

**Ràng buộc:** Không commit API key hoặc bất kỳ secret nào. `.env.example` chỉ chứa tên biến và giá trị rỗng.

---

## D9 — Analytics

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** `DEPLOYMENT.md` chốt GA và Microsoft Clarity, nhưng `PRODUCT_REQUIREMENTS.md` §6 yêu cầu Lighthouse Performance từ 90 trở lên. Hai yêu cầu kéo ngược nhau. Đây là mâu thuẫn C5.

**Quyết định:** MVP chỉ dùng Google Analytics 4. Microsoft Clarity **không** bật ở MVP.

**Lý do:** giảm script bên thứ ba, giữ ngân sách hiệu năng, đơn giản hóa privacy và cookie consent.

**Phase 2:** cân nhắc lại Clarity khi đã có traffic thật và đã đo được ngân sách hiệu năng còn dư.

**Hệ quả kỹ thuật:** GA4 nạp qua `next/script` với `strategy="afterInteractive"`, chỉ nạp ở môi trường production, chỉ nạp sau khi người dùng đồng ý nếu trang có cookie consent.

---

## D10 — Dark mode

**Trạng thái:** Approved — 2026-07-23

**Quyết định:** MVP hỗ trợ cả light mode và dark mode.

**Yêu cầu bắt buộc:**

- Dùng semantic design token, ví dụ `--color-surface`, `--color-text-primary`, `--color-border`. **Cấm** đặt tên token theo giá trị màu như `--color-gray-900` ở tầng sử dụng.
- Mặc định theo `prefers-color-scheme` của hệ thống.
- Có nút chuyển theme và lưu lựa chọn của người dùng.
- Không nhấp nháy sai theme khi tải trang.
- Cả hai chế độ đều phải đạt tương phản WCAG AA. Kiểm tra riêng từng chế độ, không suy diễn từ chế độ kia.

**Chưa quyết định:** màu sắc cụ thể. Bảng màu chỉ được chốt sau khi chủ dự án duyệt Design Direction ở Milestone 0.3.

---

## Quyết định còn mở

### D11 — Media storage

**Trạng thái:** Open

**Vấn đề:** `SYSTEM_ARCHITECTURE.md` §6 để ngỏ Supabase Storage hay Cloudinary. Quyết định này chưa được đưa ra vì D2 làm thay đổi bài toán: ảnh trong bài blog giờ có thể để thẳng trong repository, chỉ còn ảnh gallery của Projects là thực sự cần storage động.

**Cần chốt trước:** Milestone 1.3 (Data layer).

**Ba phương án sẽ trình bày ở Milestone 0.5:**

1. Toàn bộ ảnh để trong `public/`, tối ưu bằng `next/image`. Chi phí bằng 0, nhưng ảnh nặng làm phình repository.
2. Supabase Storage. Cùng một nhà cung cấp, free tier 1 GB, nhưng không có CDN transform mạnh.
3. Cloudinary free tier. Transform và tối ưu tốt nhất, nhưng thêm một nhà cung cấp bên ngoài.

**Khuyến nghị sơ bộ:** phương án 1 cho MVP vì số lượng ảnh còn nhỏ, đúng nguyên tắc không over-engineering. Chờ chủ dự án quyết ở Milestone 0.5.
