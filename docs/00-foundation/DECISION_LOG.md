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

> **Đã tu chỉnh bởi D35 (2026-07-24):** case study và hồ sơ cũng chuyển sang MDX/config; Supabase chỉ còn `contacts`. Đường dẫn bài viết đổi thành `content/writing/`. Bảng dưới đây là trạng thái D2 gốc, giữ để tra cứu lịch sử.

| Loại nội dung | Nguồn (D2 gốc) |
| --- | --- |
| Bài viết blog | MDX (nay `content/writing/`) |
| Category, tag, reading time, TOC | Frontmatter và xử lý lúc build |
| Profile, Experience, Project, Project media | Supabase → **nay MDX/config theo D35** |
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
**Đã tu chỉnh bởi:** D35, D42 — mô hình Supabase chuyển sang server-only, MVP không dùng anon key phía client. Dòng "Anon key … đọc bản đã xuất bản" bên dưới là mô tả D3 gốc, giữ để tra cứu lịch sử.

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
**Đã tu chỉnh bởi:** D26 — nhãn/route đổi (Projects→Case study, Blog→Viết theo D35) và Experience thành section trong About; nav chính còn 5 mục. Số trang nội dung MVP không đổi về bản chất.

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
**Đã tu chỉnh bởi:** D13. Toàn bộ ranh giới bảo mật dưới đây vẫn giữ nguyên hiệu lực. D13 chỉ bổ sung quy định về **vai trò** của Roboworld trong định vị sản phẩm.

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

**Trạng thái:** ~~Approved — 2026-07-23~~ **Superseded by D46 (2026-07-27)**

**Superseded:** D46 chuyển MVP sang section-based color composition, bỏ light/dark toggle và ThemeToggle. Nội dung D10 dưới đây giữ để tra cứu lịch sử; ràng buộc "semantic token, không đặt tên theo giá trị màu" và "đo AA riêng từng bề mặt" vẫn còn hiệu lực dưới D46/D47.

**Quyết định (lịch sử):** MVP hỗ trợ cả light mode và dark mode.

**Yêu cầu bắt buộc:**

- Dùng semantic design token, ví dụ `--color-surface`, `--color-text-primary`, `--color-border`. **Cấm** đặt tên token theo giá trị màu như `--color-gray-900` ở tầng sử dụng.
- Mặc định theo `prefers-color-scheme` của hệ thống.
- Có nút chuyển theme và lưu lựa chọn của người dùng.
- Không nhấp nháy sai theme khi tải trang.
- Cả hai chế độ đều phải đạt tương phản WCAG AA. Kiểm tra riêng từng chế độ, không suy diễn từ chế độ kia.

**Chưa quyết định:** màu sắc cụ thể. Bảng màu chỉ được chốt sau khi chủ dự án duyệt Design Direction ở Milestone 0.3.

---

## D12 — Định vị sản phẩm

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** Tài liệu nền tảng không có bất kỳ phát biểu định vị nghề nghiệp nào. `PRODUCT_REQUIREMENTS.md` §1 chỉ mô tả website "phục vụ mục tiêu nghề nghiệp, học thuật và chia sẻ kiến thức", trung tính đến mức không định hướng được gì.

Khoảng trống này gây hậu quả thật: khi thực hiện Milestone 0.3, AI agent đã lấp nó bằng thông tin về công ty hiện tại của chủ dự án và đề xuất một hướng thiết kế lấy cảm hứng từ robot và công nghiệp. Đề xuất đó sai định vị. Nó chưa từng được đưa vào repository nhưng đã tiêu tốn một vòng làm việc.

**Quyết định:** Định vị sản phẩm là **nền tảng xuất bản cá nhân của một người làm chiến lược marketing và thương hiệu**.

Nguồn sự thật về định vị đặt tại `docs/01-product/BRAND_POSITIONING.md`. Tài liệu đó chi phối design direction, kiến trúc thông tin, copywriting, UX, chiến lược nội dung và triển khai kỹ thuật.

**Mười vùng năng lực website phải chứng minh:** Marketing Strategy, Brand Strategy, Communication, Digital Marketing, Content Marketing, Marketing Leadership, AI for Marketing, Marketing Automation, Business Growth, và quan điểm cá nhân về ngành.

**Hệ quả:**

- Mọi tài liệu mâu thuẫn với `BRAND_POSITIONING.md` phải được sửa cho khớp.
- Kết quả Milestone 0.3 bị hủy. Xem D17.
- Mô hình dữ liệu của `projects` phải đổi. Xem D14.

---

## D13 — Vai trò của Roboworld trong sản phẩm

**Trạng thái:** Approved — 2026-07-23
**Tu chỉnh:** D6

**Bối cảnh:** D5 và D6 nhắc tới Roboworld ở hai vai trò hợp lệ là quyền sở hữu hạ tầng và ranh giới bảo mật. Nhưng không tài liệu nào nói rõ Roboworld **không phải** khung định vị, nên khoảng trống đó bị AI agent hiểu sai thành trục nhận diện của sản phẩm.

**Quyết định:** Roboworld là **một case study trong nhiều case study**, và là **một mục trong Experience**. Không hơn.

**Cấm:**

- Dùng Roboworld làm khung định vị của website.
- Suy ra tệp khách hàng mục tiêu từ tệp khách hàng của Roboworld.
- Suy ra ngành dọc, chủ đề nội dung hoặc ngôn ngữ thẩm mỹ từ ngành nghề của Roboworld.
- Để website trông giống trang giới thiệu công ty.

**Không thay đổi:** Toàn bộ ranh giới bảo mật của D6 giữ nguyên hiệu lực. Vẫn cấm dữ liệu mật, tài liệu nội bộ, thông tin khách hàng chưa được phép, thông tin tài chính và tài sản kỹ thuật. Vẫn bắt buộc đánh dấu `REVIEW-REQUIRED` và chờ kiểm duyệt.

**Nguyên tắc tổng quát rút ra:** năng lực marketing là năng lực xuyên ngành. Website không được mặc định khách hàng thuộc bất kỳ ngành dọc nào.

---

## D14 — Mô hình dữ liệu của Projects

**Trạng thái:** Approved — 2026-07-23
**Đã tu chỉnh bởi:** D35 — mô hình chuyển từ bảng Supabase sang frontmatter MDX. Ranh giới nội dung dưới đây (case study marketing, có services/industry/metrics, không tech stack) giữ nguyên hiệu lực.
**Tu chỉnh:** thiết kế `projects` trong `DATABASE.md`

**Bối cảnh:** Thiết kế bảng `projects` mang archetype portfolio lập trình viên: `tech_stack`, `repository_url`, `demo_url`, và index GIN phục vụ "filter theo công nghệ". Với một chiến lược gia marketing, đây là mô hình sai. Case study marketing cần khách hàng, ngành, dịch vụ đã cung cấp, kênh triển khai và số liệu kết quả.

Đây là chỗ neo sai nghiêm trọng nhất trong toàn bộ tài liệu, và nó nằm ở tầng schema nên nếu không sửa bây giờ thì sẽ phải migrate sau.

**Quyết định:** Đổi mô hình `projects` sang case study marketing.

| Bỏ | Thêm |
| --- | --- |
| `tech_stack` | `services` — dịch vụ đã cung cấp, dùng làm trục filter |
| `repository_url` | `client_name` — nullable, chịu ràng buộc kiểm duyệt của D6 |
| | `industry` — ngành của khách hàng, chỉ để phân loại |
| | `engagement_type` — in-house, consulting, advisory, personal |
| | `outcome_metrics` — số liệu kết quả có cấu trúc |

`demo_url` đổi tên thành `reference_url` vì nó trỏ tới chiến dịch hoặc sản phẩm thật, không phải bản demo.

**Hệ quả:** trang Projects filter theo **dịch vụ và ngành**, không theo công nghệ. `PRODUCT_REQUIREMENTS.md` §5 và `ROADMAP.md` 1.5 phải sửa theo.

---

## D15 — Tệp khán giả

**Trạng thái:** Approved — 2026-07-23
**Tu chỉnh:** `PRODUCT_REQUIREMENTS.md` §2

**Bối cảnh:** Danh sách khán giả cũ gồm sáu nhóm chung chung, không gắn với định vị nào và không xếp ưu tiên, nên không dùng được để ra quyết định thiết kế.

**Quyết định:** Định nghĩa lại sáu nhóm có xếp ưu tiên, chi tiết tại `BRAND_POSITIONING.md` §5.

Hai nhóm ưu tiên cao nhất là **doanh nghiệp cần tư vấn chiến lược marketing và thương hiệu**, và **nhà tuyển dụng tìm lãnh đạo marketing cấp cao**. Hai nhóm này quyết định thiết kế của Home và Case study.

---

## D16 — Trụ nội dung

**Trạng thái:** Approved — 2026-07-23

**Quyết định:** Toàn bộ nội dung được phân loại theo đúng năm trụ, không tạo danh mục ngoài năm trụ này khi chưa có quyết định mới.

1. Chiến lược
2. Tăng trưởng số
3. Nội dung và Truyền thông
4. AI cho Marketing
5. Lãnh đạo và Quan điểm

Ánh xạ từ mười vùng năng lực sang năm trụ nằm ở `BRAND_POSITIONING.md` §3.

**Hệ quả kỹ thuật:** trường `category` trong frontmatter MDX bị ràng buộc vào đúng năm giá trị này và được Zod kiểm tra lúc build. Danh mục sai làm build fail.

**Ghi chú chiến lược:** trụ **AI cho Marketing** là vùng khác biệt hóa mạnh nhất tại thị trường Việt Nam và nên được ưu tiên khi phân bổ nguồn lực nội dung.

---

## D17 — Hủy kết quả Milestone 0.3

**Trạng thái:** Approved — 2026-07-23

**Bối cảnh:** Năm hướng thiết kế đề xuất ở Milestone 0.3 được xây trên định vị sai. Cụ thể, hướng "Industrial Precision" lấy cảm hứng từ bản vẽ kỹ thuật và màn hình điều khiển robot, và phần khuyến nghị dùng tệp khách hàng của Roboworld làm căn cứ.

**Quyết định:** Hủy toàn bộ kết quả Milestone 0.3. Làm lại sau khi `BRAND_POSITIONING.md` được duyệt.

**Ràng buộc mới bắt buộc cho lần làm lại:**

- Mọi hướng phải phục vụ định vị ở `BRAND_POSITIONING.md` §1.
- Không hướng nào được lấy cảm hứng thẩm mỹ từ ngành nghề của công ty hiện tại.
- Bổ sung một tiêu chí đánh giá mới và có trọng số cao: **bản thân thiết kế là bằng chứng năng lực thương hiệu**. Xem `BRAND_POSITIONING.md` §6.
- Bổ sung một tiêu chí nữa: hướng đó phục vụ nội dung dài và mật độ chữ cao tốt tới đâu, vì đây là nền tảng xuất bản chứ không phải portfolio.

**Ghi chú:** kết quả cũ chỉ tồn tại trong hội thoại, chưa từng được commit vào repository. Không có gì phải gỡ khỏi lịch sử Git.

---

## D18 — Phạm vi MVP sau khi đổi định vị

**Trạng thái:** Approved — 2026-07-23. Trước đó là Open.

**Quyết định:** Phương án 2. **Giữ MVP ở đúng sáu trang.**

- Bổ sung khối **"Làm việc cùng tôi"** trên **Home**.
- Bổ sung khối **"Làm việc cùng tôi"** trên **About**.
- **Resources không nằm trong Phase 1.** Chuyển sang Phase 2.

**Ràng buộc kèm theo:** kiến trúc thông tin phải sẵn sàng cho việc mở rộng ở Phase 2 **mà không cần thiết kế lại**. Cụ thể, hệ thống điều hướng phải được chứng minh là chịu được 8 mục khi thêm Resources và Speaking, dù MVP chỉ hiển thị 6. Đây là tiêu chí đánh giá bắt buộc ở Milestone 0.3 và 0.4.

**Ranh giới của khối "Làm việc cùng tôi":** đây là một khối thông tin, không phải phễu bán hàng. Không bảng giá, không nút đặt lịch chớp nháy, không lời chứng thực dàn dựng, không đếm ngược. Xem `BRAND_POSITIONING.md` §8.

**Hệ quả kỹ thuật:** cần một trường dữ liệu cho nội dung khối này. Thêm `services_offered jsonb` vào bảng `profiles` thay vì tạo bảng mới, vì đây là dữ liệu chỉ đọc và chỉ thuộc một chủ thể duy nhất, cùng lý do đã áp dụng cho `skills` và `education`.

---

## D20 — Tinh chỉnh định vị

**Trạng thái:** Approved — 2026-07-23
**Tu chỉnh:** D12

**Bối cảnh:** D12 chốt định vị là "người làm chiến lược marketing và thương hiệu". Cách diễn đạt đó thiếu vế **người dẫn dắt**, nên chỉ nói được với người làm nghề mà chưa nói được với CEO và Founder, vốn là nhóm khán giả ưu tiên số một.

**Quyết định:** Định vị đầy đủ là **Marketing Leader / Brand & Marketing Strategist**.

Hai vế có vai trò khác nhau và không được rút gọn còn một:

| Vế | Nói với ai | Tạo ra điều gì |
| --- | --- | --- |
| Marketing Leader | CEO, Founder, hội đồng quản trị | Thẩm quyền |
| Brand & Marketing Strategist | CMO, Marketing Director, người làm nghề | Tính cụ thể và độ tin cậy kỹ thuật |

**Định vị này phải còn đúng trong ít nhất 5–10 năm.** Nó gắn với vai trò và tầng năng lực, không gắn với chức danh tại một công ty cụ thể, không gắn với một ngành dọc.

**Điều chỉnh danh sách mười vùng năng lực:**

- `Communication` đổi thành **`Communication Strategy`**. Truyền thông ở đây là công việc chiến lược, không phải kỹ năng giao tiếp cá nhân.
- `Personal thinking and industry opinions` đổi thành **`Personal opinions on Marketing & Communications`**, thu hẹp phạm vi về đúng chuyên môn thay vì quan điểm cá nhân nói chung.

**Hệ quả:** ánh xạ trụ nội dung ở D16 giữ nguyên năm trụ, chỉ cập nhật tên năng lực bên trong.

---

## D21 — Thứ tự ưu tiên khán giả

**Trạng thái:** Approved — 2026-07-23
**Tu chỉnh:** D15

**Bối cảnh:** Thứ tự ở D15 đặt nhà tuyển dụng ở vị trí số 2. Thứ tự đó phản ánh một website tìm việc, không phản ánh nền tảng xuất bản của một Marketing Leader.

**Quyết định:** Thứ tự ưu tiên mới, bắt buộc áp dụng cho mọi quyết định UX:

| # | Nhóm |
| --- | --- |
| 1 | CEO và Founder cần chiến lược marketing và thương hiệu |
| 2 | CMO, Marketing Director, Marketing Manager |
| 3 | Người làm marketing chuyên nghiệp |
| 4 | Chủ doanh nghiệp vừa và nhỏ |
| 5 | Sinh viên marketing |
| 6 | Nhà tuyển dụng |

**Thay đổi đáng kể nhất:** nhà tuyển dụng rời từ vị trí 2 xuống vị trí 6. **Website này không phải công cụ tìm việc.** Trang Experience vẫn phải đầy đủ và chính xác, nhưng không được chiếm vị trí ưu tiên trong kiến trúc thông tin hay trong thiết kế Home.

**Quy tắc giải xung đột:** khi hai nhóm mâu thuẫn về một quyết định UX, nhóm có số nhỏ hơn thắng.

**Hệ quả đã thấy trước:** nhóm 1 phần lớn không phải người làm marketing. Họ đọc để đánh giá tư duy, không đọc để học kỹ thuật. Home phải trả lời "người này nghĩ thế nào về tăng trưởng" trước khi trả lời "người này biết dùng công cụ gì".

**Ghi chú:** hội đồng tuyển sinh không còn trong danh sách sáu nhóm. Nhu cầu hồ sơ du học vẫn được phục vụ qua About và Experience, nhưng không còn là nhóm định hướng thiết kế.

---

## D22 — Triết lý thiết kế

**Trạng thái:** Approved — 2026-07-23

**Quyết định:** Sản phẩm là **Publishing Platform trước tiên**. Thẩm mỹ quan trọng, nhưng năng lực xuất bản, khả năng đọc và khả năng mở rộng dài hạn quan trọng hơn.

**Thứ tự ưu tiên bắt buộc khi có xung đột thiết kế:**

1. Khả năng đọc
2. Năng lực xuất bản
3. Khả năng mở rộng
4. Thẩm mỹ và sự khác biệt

**Mọi hướng thiết kế phải phục vụ:** viết, đọc, xuất bản kiến thức, case study, bài viết dài, và sản xuất nội dung có AI hỗ trợ.

**Cấm tối ưu cho xu hướng thị giác.** Tối ưu cho thẩm quyền, độ tin cậy, năng lực xuất bản, sự tin tưởng, tính vượt thời gian, khả năng đọc và xây dựng thương hiệu dài hạn.

**Cảm giác đích:** tổng hành dinh số của một Marketing Leader. Không phải portfolio, không phải màn trình diễn thiết kế.

**Kiểm chứng khả năng mở rộng:** hệ thống thiết kế phải chịu được 200 bài viết, 30 case study và 3 loại nội dung chưa tồn tại mà không cần thiết kế lại. Đây là tiêu chí đánh giá bắt buộc ở Milestone 0.3.

---

## Quyết định media & hạ tầng (đã đóng ở Milestone 0.5D)

### D11 — Media storage

**Trạng thái:** Approved — 2026-07-25 (chủ dự án chọn phương án A)

**Quyết định:** Ảnh để trong **`public/`**, tối ưu bằng `next/image`.

**Lý do:** Sau D35, project_media bị loại; chỉ còn vài ảnh case study. `public/` chi phí 0, tĩnh, đơn giản nhất, đúng nguyên tắc không over-engineering. Không kéo Supabase/Cloudinary vào đường đọc.

**Xem lại (Future):** nếu số ảnh phình lớn làm nặng repo, cân nhắc Supabase Storage/Cloudinary ở Phase sau.

**Ba phương án đã cân nhắc (lịch sử):**

1. `public/` — chọn.
2. Supabase Storage — cùng nhà cung cấp, free 1 GB, không CDN transform mạnh.
3. Cloudinary free tier — transform tốt nhất, thêm nhà cung cấp ngoài.

---

### D19 — Rủi ro giấy phép Vercel Hobby

**Trạng thái:** Approved — 2026-07-25 (chủ dự án chọn phương án A: Hobby → Pro theo điều kiện)
**Liên quan:** D5, D12

**Vấn đề:** Gói Vercel Hobby cấm sử dụng cho mục đích thương mại. Khi định vị còn là "website thương hiệu cá nhân" chung chung, rủi ro này ở mức lý thuyết. D12 đã đổi tình thế: consulting và sản phẩm số giờ là **mục đích được tuyên bố công khai** của sản phẩm.

Một trang mời gọi tư vấn trả phí, hoặc về sau bán sản phẩm số, rất khó lập luận là phi thương mại.

**Ba phương án:**

| # | Phương án | Chi phí |
| --- | --- | --- |
| 1 | Giữ Hobby, MVP không có lời mời chào dịch vụ trả phí | 0 đồng, nhưng mâu thuẫn với D18 phương án 2 và 3 |
| 2 | Nâng Vercel Pro khi bật nội dung consulting | khoảng 20 USD mỗi tháng |
| 3 | Chuyển hosting sang nền tảng khác không giới hạn thương mại ở gói miễn phí | 0 đồng nhưng tốn công di chuyển và lệch với kiến trúc đã chốt |

**Quyết định:** Giữ **Vercel Hobby** tới hết Phase 1; **nâng Vercel Pro** ngay khi bật nội dung consulting/thương mại (gate Milestone 1.8). ~20 USD/tháng là chi phí nhỏ so với rủi ro bị gỡ site khi có khách hàng xem.

**Ràng buộc thực thi:** trước khi xuất bản bất kỳ nội dung consulting/bán hàng nào, phải nâng gói trước. Đây là mục kiểm ở checklist Milestone 1.8.

---

# Nhóm quyết định vòng UX/IA/Kiến trúc — khóa ngày 2026-07-24

Các quyết định D23–D35 được chủ dự án khóa chính thức ngày 2026-07-24 sau ba vòng: Research, Architecture Simplification Review, Decision Review. Trạng thái ghi dưới đây phản ánh bản khóa của chủ dự án, kể cả những chỗ chủ dự án **override** khuyến nghị của agent.

## D23 — Mô hình chuyển đổi

**Trạng thái:** Approved — 2026-07-24

**Quyết định:** Chuyển đổi hai tầng. Tầng 1: người đăng ký nhận bài (tài sản cộng dồn). Tầng 2: cuộc trao đổi tư vấn đã được lọc. **Cơ hội nghề nghiệp không phải mục tiêu chuyển đổi** — không có CTA hướng tuyển dụng.

CTA được phép: đăng ký nhận bài, "Làm việc cùng tôi", đọc tiếp theo trụ, liên hệ. CTA bị cấm: pop-up chặn màn hình, thanh dính "đặt lịch", bảng giá, đếm ngược, chat widget, CTA tuyển dụng, chứng thực dàn dựng.

**Trần mật độ:** tối đa 2 CTA mỗi trang, không bao giờ 2 CTA khác loại trong cùng một khung nhìn.

## D24 — Thứ tự cảm giác thương hiệu

**Trạng thái:** Approved — 2026-07-24

**Quyết định:** Xếp hạng: 1 Editorial · 2 Strategic · 3 Authority · 4 Executive · 5 Thoughtful · 6 Premium · 7 Minimal. **Loại *Academic*.** **Hạ *Friendly*** xuống tầng giọng viết, không thể hiện ở hình thức. Sự ấm áp đến từ chữ, sự tiết chế đến từ hình.

## D25 — Homepage information flow

**Trạng thái:** Approved — 2026-07-24

**Quyết định:** Thứ tự khối Home: (1) định vị dạng phát biểu vấn đề → (2) **bài viết featured** → (3) case study featured có số liệu → (4) bản đồ 5 trụ → (5) khối "Làm việc cùng tôi" → (6) đăng ký nhận bài → footer.

**Chốt theo bản khóa:** Home lấy bài viết và case study nổi bật bằng cờ **`featured: true`** trong frontmatter, không phải "bài mới nhất". Experience không xuất hiện ở phần thân Home; nó nằm ở footer/About theo D21.

## D26 — Nhãn điều hướng và gộp Experience vào About

**Trạng thái:** Approved — 2026-07-25 (chủ dự án chọn phương án A)
**Tu chỉnh:** D4

**Quyết định:** Điều hướng theo **loại nội dung**, và **gộp Experience thành một section trong About**.

- Navigation MVP (5 mục): **Viết · Case study · Chủ đề · Giới thiệu · Liên hệ**. Home là logo. "Làm việc cùng tôi" là khối trên Home/About, không lên nav (D18).
- `Chủ đề` = hub `/topics/[pillar]` (D31).
- **Experience không còn là trang riêng** — trở thành section trong `/about/` (timeline), có anchor ở footer.

**Tu chỉnh D4:** D4 liệt kê 6 trang gồm Experience/Projects/Blog riêng. D26 chuyển: Projects→Case study, Blog→Viết (theo D35), Experience→section trong About. Số trang điều hướng chính còn 5; vẫn chịu được 8 mục khi Phase 2 thêm Resources/Speaking (D18).

**Lý do chọn A:** chỉ A nhất quán với D35 (content type), D31 (route), D25 và D21; loại bỏ mâu thuẫn thuật ngữ "Blog/Projects" và tránh đọc như portfolio.

## D27 — Newsletter trong MVP

**Trạng thái:** Approved — 2026-07-25 (chủ dự án chọn phương án B)

**Quyết định:** **Hoãn newsletter sang Phase 2.** MVP **không** có `NewsletterForm`.

- Home CTA chính = **"Làm việc cùng tôi" / Liên hệ** (không phải đăng ký nhận bài).
- `NewsletterForm` chuyển khỏi 20 component MVP → MVP còn **19 component**.
- Footer MVP: bỏ khối đăng ký; giữ Social + RSS.

**Lý do chọn B:** giữ MVP gọn, sạch script bên thứ ba, đơn giản privacy/consent (nhất quán D9 "chỉ GA4"). Đánh đổi đã ghi nhận: MVP thiếu cơ chế giữ chân người đọc — rủi ro A1 (D28) chưa được giảm bằng newsletter; RSS là kênh thay thế duy nhất ở MVP.

**Ảnh hưởng D28:** giả định A1 nay **không** được giảm bằng newsletter ở MVP; cần theo dõi tỷ lệ quay lại sau ra mắt và cân nhắc bật newsletter sớm ở Phase 2 nếu cần.

## D28 — Giả định chưa kiểm chứng

**Trạng thái:** Ghi nhận — 2026-07-24

Ghi lại để đo về sau, không phải quyết định:

- **A1/A5 (rủi ro cao):** chưa có tiền lệ một website cá nhân của marketing leader thành công tại Việt Nam. Toàn bộ dự án đặt cược vào giả định này. Giảm rủi ro bằng cách đặt newsletter làm CTA số một (phụ thuộc D27).
- **A2:** dấu tiếng Việt của font thân bài ở 15px cần kiểm bằng mắt ở Milestone 0.4. Vùng phủ ký tự đã xác nhận qua Google Fonts metadata; chất lượng dựng dấu thì chưa.
- **A3:** năm trụ là cách chia đúng — kiểm sau 20 bài.
- **A4:** tỷ lệ thiết bị của nhóm khán giả 1 chưa có dữ liệu.

## D29 — Chốt Design Direction

**Trạng thái:** Approved — 2026-07-24 (bản khóa: "Design Direction: giữ nguyên")

**Quyết định:** Khóa hướng **Tòa soạn (Editorial) làm nền · cấu trúc Thư viện (Library) · khối dữ liệu Hồ sơ Chiến lược**. Đóng D17 (kết quả 0.3 cũ đã hủy, không tái sử dụng).

## D30 — Design Principles

**Trạng thái:** Approved — 2026-07-24

**Quyết định:** 8 Design Principle là tầng quyết định cao nhất cho UI/UX/nội dung/kiến trúc: P1 Evidence over Claims · P2 Reading before Selling · P3 Text First · P4 Structure over Stream · P5 Framework as First-Class Object · P8 One Door per Screen · P9 Minimal Motion · P10 Warmth in Words, Restraint in Form.

**Từ 10 rút còn 8:** P6 (Publish Cheap) chuyển thành nguyên tắc **kiến trúc** trong `SYSTEM_ARCHITECTURE.md`; P7 (Design for Article 200) giải thể — phần bền vững giữ ở constraint URL bất biến và taxonomy-là-dữ-liệu, bỏ phần mời gọi over-engineering.

## D31 — Information Architecture

**Trạng thái:** Approved — 2026-07-24, với một override của chủ dự án

**Quyết định:** Sitemap, taxonomy 2 tầng (trụ đóng + tag), URL đoạn tiếng Anh / slug tiếng Việt không dấu, URL bất biến (đổi thì 301), chiến lược liên kết nội bộ topic-cluster, breadcrumb cho bài và case study. Chi tiết ở `INFORMATION_ARCHITECTURE.md`.

**Override của chủ dự án:** agent đề xuất **defer** `/topics/[pillar]`; chủ dự án **giữ** `/topics/[pillar]` trong MVP với đúng 5 pillar. Bản khóa thắng. Tag page vẫn hoãn Phase 2.

## D32 — Design Tokens

**Trạng thái:** Approved — 2026-07-24
**Đã tu chỉnh bởi:** D36 — body chuyển sang sans (serif dồn lên tiêu đề); khôi phục `--container-wide` (nay 4 container). **D43** — bỏ serif hoàn toàn ở MVP, dùng hệ font Geist. **D47** — điền giá trị màu (4-color Kinetic, section-based). **D48** — bỏ Geist Mono khỏi visible UI. **D49** — thay **trần radius 8px** bằng radius contract R3 (control 8–10 · card 12–16 · panel 20–28 · signature 36–48). Thang chữ 8 bậc và các token khác giữ nguyên.

**Quyết định:** Khóa **kiến trúc** token, **để trống giá trị màu** tới Milestone 0.4 (tôn trọng D10). Thang chữ 8 bậc (đã bỏ `--text-display`), spacing cơ sở 4px, container 3 mức (đã bỏ `--container-wide`), ~~trần radius 8px~~ *(superseded by D49)*, elevation 2 mức (đã bỏ `--elevation-2`), trần motion 200ms, màu semantic 2 tầng. Chi tiết ở `COMPONENT_INVENTORY.md`.

## D33 — Component Inventory

**Trạng thái:** Approved — 2026-07-24
**Đã tu chỉnh bởi:** D46 — loại `ThemeToggle` (bỏ light/dark toggle) → **18 component**. Kiến trúc `ContentCard` chung **giữ nguyên** (chủ dự án chốt không tách SignatureCard; chỉ tách component khi hành vi/ngữ nghĩa thực sự khác, không tách vì styling).

**Quyết định:** ~~**19 component**~~ **18 component** cho MVP (từ 38 sau tối giản hóa; `NewsletterForm` lùi Phase 2 theo D27; `ThemeToggle` loại theo D46). `SearchDialog`, `Pagination`, `FilterBar` hoãn **Phase 2**. Chi tiết và danh sách gộp/bỏ ở `COMPONENT_INVENTORY.md`.

## D34 — Design Constraints

**Trạng thái:** Approved — 2026-07-24

**Quyết định:** 12 constraint bảo vệ chất lượng (từ 16, đã bỏ những cái enforce ở nơi khác). Danh sách ở `COMPONENT_INVENTORY.md`.

## D35 — Option B: MDX-first

**Trạng thái:** Approved — 2026-07-24 (bản khóa)
**Tu chỉnh:** D2, D14

**Quyết định:** Kiến trúc nội dung MDX-first.

- Bài viết và case study lưu bằng **MDX**.
- Hồ sơ và kinh nghiệm lưu ở **`src/config/profile.config.ts`**.
- Supabase **chỉ giữ bảng `contacts`**.

**Tu chỉnh D2:** D2 định nghĩa hybrid với dữ liệu có cấu trúc nằm ở Supabase. D35 chuyển dữ liệu đó sang MDX + config; Supabase còn đúng một bảng ghi-một-chiều.

**Tu chỉnh D14:** ranh giới nội dung của D14 (case study là marketing, có services/industry/metrics, không có tech stack) **giữ nguyên hiệu lực**, chỉ chuyển từ cột database sang frontmatter MDX.

**Lợi ích:** ít code, ít schema, nội dung build tĩnh 100%, không phụ thuộc Supabase uptime, bề mặt tấn công database gần bằng không. Chi tiết ở `DATABASE.md` v2.0.

---

## D36 — Design Direction: Strategic Editorial with Product-Level Precision

**Trạng thái:** Approved — 2026-07-24 (chủ dự án khóa)
**Mở rộng:** D29 · **Tu chỉnh:** D32 (typography, container)
**Đã tu chỉnh bởi:** D43 — typography chuyển sang hệ font **Geist (sans-first, bỏ serif ở MVP)**. **D46** — §Color mode ("light và dark đều first-class") **superseded**: MVP dùng section-based composition, không light/dark toggle. **D48** — bỏ Geist Mono khỏi visible UI. Phần "serif cho Hero/Display/Major Heading" và "Color mode" bên dưới là mô tả D36 gốc, giữ để tra cứu lịch sử.

**Quyết định:** Khóa câu định danh sản phẩm là **"A Strategic Editorial Platform for a Marketing Leader"**, hướng thiết kế **Strategic Editorial with Product-Level Precision** — ấn phẩm biên tập cao cấp với độ hoàn thiện interaction như một digital product hiện đại. Editorial-first, không phải visual-first.

**Triết lý:** editorial-first và **interaction-first**, không phải visual-first.

**Tham khảo craft:** `resend.com` (layout, grid, whitespace, typography, surface, card, responsive, motion, refinement) và `recent.design` (interaction quality, craftsmanship, sound-as-feedback). **Không copy** hero, 3D, dashboard, code editor, developer visual, **SaaS information architecture**, **SaaS copywriting**.

**Nội dung khóa** (chi tiết ở `DESIGN_SYSTEM.md`):

- **Layout:** 4 container (`prose`, `content`, `wide`, `full`), mỗi loại một mục đích. Không dùng một container duy nhất.
- **Section rhythm:** spacing ngữ nghĩa Major / Standard / Compact.
- **Responsive là composition:** section được đổi thứ tự/alignment/layout/tỷ lệ ảnh theo breakpoint; CTA full-width trên mobile.
- **Typography:** serif cho Hero/Display/Major Heading; sans cho Body/Nav/UI/Metadata; mono chỉ cho metadata.
- **Surface:** 3 lớp (Page/Raised/Sunken), không hơn.
- **Card:** giống ấn phẩm — subtle border, subtle contrast, content-first; không gradient/glassmorphism/heavy shadow.
- **Visual:** framework/sơ đồ/diagram/illustration/editorial/real asset; cấm dashboard/analytics/terminal/code editor/3D giả.
- **CTA:** tối đa 2 cạnh tranh/viewport (P8).
- **Motion:** subtle, purposeful, 120–200ms, không decorative.
- **Color mode:** light và dark đều first-class, cùng hierarchy; light không phải bản đảo màu.

**Bổ sung Design Principle:** P11 Product-Level Precision · P12 Responsive as Composition · **P13 Interaction Before Decoration** (mọi effect/animation/motion/sound/hover/micro-interaction phải phục vụ usability/feedback/hiểu nội dung; trang trí chỉ được phép khi không cạnh tranh nội dung; "Sound is feedback, not decoration").

**Future Enhancement (không MVP) — Sound & Interaction:**

- **Sound mặc định ON** *(sửa từ bản nháp D36 đầu ghi OFF)*; user chủ động Mute; trạng thái Mute được lưu.
- Luôn có nút Sound/Mute, icon rõ, không ẩn trong menu, không cần mở Settings.
- Chỉ phát khi user chủ đích click (navigation, header/mobile menu, CTA, theme toggle, pillar filter). **Cấm** phát khi hover/scroll/page-load/animation/card-appear/carousel/background.
- Chất lượng: nhỏ, rất ngắn, sạch, tối giản, không chói/mechanical/sci-fi/game.
- Spam protection: debounce/throttle, không phát chồng.
- **Motion và Sound là hai hệ thống độc lập:** `prefers-reduced-motion` chỉ áp dụng cho Motion; Sound có preference riêng (Mute). Sound không phải kênh trạng thái duy nhất — site vẫn dùng được khi mute/không loa.
- Cần một component điều khiển âm thanh ở Phase triển khai, **không** nằm trong 19 component MVP.

---

# Nhóm quyết định hạ tầng Milestone 0.6 — khóa ngày 2026-07-25

Các quyết định D37–D42 do chủ dự án chốt cho Milestone 0.6 (O-1..O-6 + ràng buộc Supabase server-only). Không sửa hay đánh số lại D1–D36.

## D37 — Phạm vi Milestone 0.6

**Trạng thái:** Approved — 2026-07-25 (O-1, phương án A)

**Quyết định:** Giữ đúng ranh giới ROADMAP. Milestone 0.6 **chỉ** gồm: infrastructure accounts, runtime/repository contract, environment contract, DNS/deployment readiness, và infrastructure freeze.

**Không thuộc 0.6:** application scaffold, application code, Tailwind, shadcn/ui, full CI pipeline, MDX tooling, test framework. Những mục này **vẫn thuộc Milestone 1.1** và vẫn phụ thuộc Milestone 0.4 nơi tài liệu đã ghi.

**Phân rã:** 0.6A Research & Readiness · 0.6B Runtime & Repository Baseline · 0.6C Owner Infrastructure Setup · 0.6D Infrastructure Audit & Freeze.

## D38 — Runtime Version Contract

**Trạng thái:** Approved — 2026-07-25 (O-2)

**Quyết định:**

- **Node.js `24.18.0`** — pin exact ở `.nvmrc`; `package.json.engines.node = ">=24.18.0 <25"`.
- **pnpm `10.15.1`** — pin qua `package.json.packageManager` (Corepack). Không thêm `engines.pnpm` (packageManager đã pin chính xác).
- Không upgrade/downgrade Node ngoài một quyết định mới. Tương thích Next.js major được xác minh lại ở Milestone 1.1 (Next.js version chưa được khóa ở 0.6).

## D39 — Test Framework Direction

**Trạng thái:** Approved — 2026-07-25 (O-3)

**Quyết định:** **Vitest** là định hướng unit-test tương lai. Playwright/E2E chỉ thêm khi tồn tại luồng end-to-end thực tế. **Không cài** test framework nào trong Milestone 0.6.

## D40 — Repository Visibility

**Trạng thái:** Approved — 2026-07-25 (O-4)
**Tu chỉnh:** ghi chú "repository private" ở D5 và `DEPLOYMENT.md`

**Quyết định:** Repository là **Public**. Không thay đổi visibility. Secret và `.env` tuyệt đối không được commit; `.env*` (trừ `.env.example`) nằm trong `.gitignore`.

## D41 — MDX Pipeline Deferral

**Trạng thái:** Approved — 2026-07-25 (O-5)

**Quyết định:** Hoãn việc chọn MDX pipeline tool (Velite / next-mdx-remote / @next/mdx) đến **Milestone 1.1**. Không chọn hoặc cài MDX tool trong Milestone 0.6.

## D42 — Supabase Infrastructure Contract

**Trạng thái:** Approved — 2026-07-25 (O-6 + ràng buộc bổ sung)
**Tu chỉnh:** contract env Supabase trong D35, `.env.example`, `DEPLOYMENT.md`

**Quyết định:**

- Supabase project chọn **region Singapore** (khi tạo ở 0.6C).
- MVP dùng Supabase theo hướng **server-only**: `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` phía server, ghi `contacts` qua Server Action.
- **Loại** `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` khỏi contract. Không đưa bất kỳ credential Supabase nào xuống client, trừ khi một feature được phê duyệt sau thực sự cần client-side Supabase.

**Lý do:** đúng D35 (client không đọc DB; contact ghi qua Server Action bằng service role) và giảm bề mặt tấn công (không ship credential Supabase trong bundle client).

**Ghi chú đồng bộ (ngoài phạm vi 0.6B, để vòng docs sau):** `DATABASE.md` §RLS còn giải thích bằng "anon key nằm công khai trong bundle client" — dưới D42 không ship anon key nào; RLS deny-all vẫn đúng. Cần chỉnh diễn giải ở vòng có thẩm quyền sửa `DATABASE.md`.

**Tu chỉnh D32 — hai điểm:**

1. **Typography:** D32 gốc để body là serif (PA-A). D36 đổi body sang **sans**, serif dồn lên tiêu đề. Editorial thể hiện ở heading, body tối ưu đọc dài.
2. **Container:** D32 gốc bỏ `--container-wide` (gộp vào content). D36 **khôi phục** `--container-wide`, nay có đủ 4 container.

Các phần khác của D32 (thang chữ 8 bậc, spacing 4px, radius ≤8px, motion ≤200ms, màu để trống tới 0.4) **giữ nguyên**.

**Không xung đột với:** D22 (Editorial là cảm giác #1), D24 (thứ tự cảm giác), D10 (hai chế độ), D23/P8 (CTA), C7/C8 (cấm dashboard/visual giả). D36 làm rõ và cụ thể hóa chúng, không đảo ngược.

---

# Nhóm quyết định Milestone 0.4 — Design Tokens & Wireframe (2026-07-25)

Chủ dự án chốt OD-1..OD-5 cho Milestone 0.4. D43–D45 tiếp nối số, không sửa D1–D42.

## D43 — Typography system: Geist (OD-1)

**Trạng thái:** Approved — 2026-07-25 (chủ dự án chọn hệ font Geist)
**Tu chỉnh:** D36, D32 (typography — bỏ serif)
**Đã tu chỉnh bởi:** **D48** — **loại Geist Mono khỏi visible UI**. Mệnh đề "Geist Mono chỉ dùng có chọn lọc cho metadata/technical" dưới đây **superseded**; Geist Sans nay là typeface duy nhất, số dùng `tabular-nums`. Giữ để tra cứu lịch sử.

**Quyết định:** Dùng hệ font **Geist** (Vercel, SIL Open Font License 1.1).

- **Geist Sans** là font chính: Hero · Heading · Body · Navigation · Button · Form · UI label.
- **Geist Mono** chỉ dùng có chọn lọc cho metadata/technical: ngày, thời gian đọc, category/tag, số liệu case study, code/kỹ thuật.
- **Không bổ sung serif ở MVP** — đây là tu chỉnh D36/D32 (vốn dùng serif cho heading). Tinh thần editorial nay đến từ khoảng trắng, measure 68ch, line-height, sự tiết chế (Geist là grotesque Swiss-minimal).

**Đã xác minh (OD-1):**
- Nguồn chính thức: `github.com/vercel/geist-font` (Vercel), gói npm `geist`; không lấy/sao chép từ aside.com.
- License OFL 1.1 — cho phép dùng thương mại (website cá nhân có consulting).
- Tiếng Việt: Geist Sans và Geist Mono đều có subset `vietnamese` + `vi_Latn` (Google Fonts metadata) — **coverage đầy đủ**.

**Ràng buộc validation:** **Vietnamese typography specimen là bắt buộc** — render Geist ở 14/15/16px và body 19px với bộ chuỗi tiếng Việt (ghi ở `COMPONENT_INVENTORY.md` §B.1) để kiểm chất lượng dựng dấu thị giác.

**Validation — ĐẠT (chủ dự án duyệt trực quan 2026-07-25):** specimen render thật, Geist Sans/Mono loaded, dấu tiếng Việt ở mọi cỡ (14→45px) không cắt/chồng/lệch, light & dark đọc tốt. Typography 0.4B được phê duyệt. Lưu ý non-blocking (14px chỉ metadata ngắn · AA muted-text kiểm ở 0.4C · heading wrapping kiểm ở 0.4D · không làm dark metadata nhạt hơn) ghi ở `COMPONENT_INVENTORY.md` §B.1.

**Không cài package/font ở 0.4.** Tích hợp `geist` + `next/font` thuộc Milestone 1.1.

**Thang chữ và token khác giữ nguyên** (D32): 8 bậc, spacing, container, radius, motion.

## D44 — Breakpoints (OD-1 / Phase 2)

**Trạng thái:** Approved — 2026-07-25

**Quyết định:** Breakpoint **mobile-first** (min-width), bốn ngưỡng chính:

- Mobile (base, 0) · Tablet `--bp-md` 768px · Desktop `--bp-lg` 1024px · Wide `--bp-xl` 1280px.
- Phụ (triển khai 1.1): `--bp-sm` 640px, `--bp-2xl` 1536px.

Chi tiết container/nav/grid/typography-response ở `COMPONENT_INVENTORY.md` §B.9. Không tạo Tailwind config ở 0.4.

## D45 — Hướng màu, dark mode & quy trình wireframe (OD-2/3/4/5)

**Trạng thái:** Approved — 2026-07-25 (hướng và quy trình; giá trị HEX chưa khóa)
**Đã tu chỉnh bởi:** **D47** — OD-2 (accent đơn, off-white/near-black) **superseded** bởi hệ 4-color Kinetic section-based; HEX nay đã khóa. **D46** — OD-5 (dark mode hand-tuned) **superseded**: MVP không có dark mode/toggle. OD-3 (wireframe SSoT) và OD-4 (quy trình chủ dự án duyệt màu) **vẫn hiệu lực**.

**Quyết định:**

- **OD-2 Hướng màu:** Editorial light-mode tối giản, ưu tiên nội dung. Nền paper/off-white (không trắng tuyệt đối), chữ ink/near-black (không đen tuyệt đối cho body), hệ neutral gray đầy đủ, **một accent chính dùng tiết chế**. **Light mode là mặc định, thiết kế trước.** `aside.com` **chỉ là tài liệu tham khảo thị giác** (cảm giác, tương phản, khoảng trắng, hierarchy) — **cấm** sao chép mã màu, bố cục, component, animation, asset, source code, nhận diện Aside.
- **OD-5 Dark mode:** phải **hand-tuned riêng** — cấm đảo màu/invert tự động/sao chép máy móc token light. Giữ cùng hierarchy nhưng surface/border/text/accent/elevation/contrast/interaction-state **riêng**, có validation contrast riêng.
- **OD-3 Wireframe fidelity:** **Markdown wireframe là SSoT** (version bằng Git) **+ HTML artifact** để chủ dự án xem trực quan. HTML artifact chỉ là prototype review, **không phải application scaffold/production code**.
- **OD-4 Quy trình chọn màu:** Claude đề xuất hệ màu + HEX; **chủ dự án duyệt trước khi khóa**. **Không tuyên bố "màu đã khóa" khi chưa có phê duyệt rõ ràng.**

**Thực thi:** 0.4C đề xuất 2–3 phương án accent (tên hướng · ý nghĩa thương hiệu · primitive scale · semantic tokens · ví dụ · contrast light + dark · khuyến nghị), chủ dự án duyệt trước khi khóa HEX.

---

# Nhóm quyết định Milestone 0.4C — Kinetic Orange & Design Governance (2026-07-27)

Chủ dự án chốt D46–D50 sau vòng 0.4C (Kinetic Orange pivot + tích hợp CDC Design Bible). D46–D50 tiếp nối số, không sửa hay đánh số lại D1–D45. Ba quyết định mở (Radius · Component Scope · Danger) đã được chủ dự án chốt trong lô này.

## D46 — Section-based color composition (supersede D10)

**Trạng thái:** Approved — 2026-07-27
**Supersede:** D10 (light/dark mode + ThemeToggle)
**Amend:** D36 (§color-mode), D45 (OD-5 dark hand-tuned), `DESIGN_SYSTEM.md` (§Color mode, §Phase 4 theme), `COMPONENT_INVENTORY.md` (bỏ ThemeToggle, §B.8), `INFORMATION_ARCHITECTURE.md` (§2/§9), `AI_RULEBOOK.md` (§5/§9), `PRODUCT_REQUIREMENTS.md` (§6)

**Bối cảnh:** D10 khóa "MVP có cả light + dark mode + ThemeToggle theo `prefers-color-scheme`". Pivot Kinetic Orange ở 0.4C chuyển sang bố cục màu theo section; Design Bible `03-visual-language.md` và `06-color-surfaces.md` đã mã hóa. Hai nguồn mâu thuẫn trực tiếp.

**Quyết định:** MVP dùng **section-based color composition** — surface đổi theo mạch narrative:

- **White** — long-form, Writing, About, giải thích.
- **Grey** — chuyển nhịp / supporting; không dùng cho long-form chính.
- **Black** — statement, featured evidence, Work With Me, footer.
- **Orange** — focal point, marker, CTA chính, focus có kiểm soát.

**Bỏ global light/dark toggle. Loại ThemeToggle** khỏi component MVP (19 → **18**). Không `prefers-color-scheme` switching ở MVP.

**Không đổi:** mọi cặp chữ-trên-nền vẫn đo tương phản WCAG AA **theo từng surface** (không suy diễn giữa các surface).

**Lý do:** một hệ màu đơn giản, editorial, có chủ đích hơn theo mạch nội dung; giảm bề mặt phức tạp (không token 2-mode, không lo nhấp nháy theme).

## D47 — Color primitives & semantic surface mapping (Danger = Pending)

**Trạng thái:** Approved — 2026-07-27
**Supersede/Amend:** D45 (OD-2 accent đơn → hệ 4-color section-based); điền giá trị màu để trống của D32/D10 vào `COMPONENT_INVENTORY.md §B.8`

**Bối cảnh:** D45/OD-2 mới chốt *hướng* (một accent, off-white/near-black) và để **giá trị màu trống**. Pivot đã chốt 4 màu Kinetic; cần khóa primitive + mapping semantic per surface.

**Quyết định:**

- **Khóa 4 primitive:** Pure White `#FBFBFB` · Deep Black `#040404` · Neutral Grey `#DEDEDE` · Kinetic Orange `#FF4000`.
- **Orange derived scale** (tint/shade) được phép cho text/hover/focus/selection; giá trị ở `COMPONENT_INVENTORY.md §B.8`.
- **Semantic mapping per surface** (fg · secondary · muted · border · accent-text · on-accent) — chi tiết ở `COMPONENT_INVENTORY.md §B.8`.
- **Orange budget:** ≤1 CTA + ≤1 marker/keyword mỗi viewport; cấm cam làm body/link nhỏ không đạt AA; **cam không dùng cho danger**.
- **Danger Color = `Pending — Phase Color System`.** KHÔNG khóa HEX, KHÔNG palette danger ở milestone này. Functional danger state có thể tồn tại nhưng governance màu chưa mở khóa.

**Ràng buộc:** accent-text cam phải dùng shade đủ tối theo surface để đạt AA (o-700 trên White, o-800 trên Grey, o-500 trên Black; chữ đen trên Orange).

## D48 — Typography: Geist Sans-only (amend D43)

**Trạng thái:** Approved — 2026-07-27
**Amend:** D43 (mệnh đề Geist Mono — superseded, giữ lịch sử), `DESIGN_SYSTEM.md` (§Typography), `COMPONENT_INVENTORY.md §B.1`

**Bối cảnh:** D43 chốt Geist Sans chính + Geist Mono cho metadata. Chủ dự án sau đó yêu cầu loại Mono khỏi visible UI vì cảm giác developer-tool và slashed-zero khiến metric trông máy móc, lệch art direction editorial.

**Quyết định:**

- **Geist Sans là typeface duy nhất** trong visible UI của MVP: heading, body, navigation, button, form, label, eyebrow, metadata, ngày/reading time, metric/phần trăm/số case study, tag, badge, status.
- **Loại Geist Mono** khỏi visible UI và khỏi typography mapping mặc định.
- **Số:** dùng `font-variant-numeric: tabular-nums` khi cần căn hàng; **không đổi font-family sang monospace, không slashed zero, không italic cho metric**.
- **Metric chính:** Geist Sans weight 600–700.
- **Metadata:** Geist Sans 450–500, letter-spacing 0–0.02em, ưu tiên sentence case, hạn chế uppercase dài.

**Không đổi:** thang chữ 8 bậc, measure 68ch, line-height (D32/D43 giữ nguyên); fallback stack bỏ nhánh mono.

## D49 — Radius Contract (R3 — Hybrid/Bridge)

**Trạng thái:** Approved — 2026-07-27 (chủ dự án chọn **R3**)
**Supersede:** D32 (trần radius 8px) + mệnh đề radius của C13/D24

**Bối cảnh:** Ba nguồn radius mâu thuẫn: `COMPONENT_INVENTORY §B.4` trần 8px · Direction C.1 (≤48) · Design Bible `07` (≤64). Chủ dự án được trình 3 phương án R1/R2/R3.

**Quyết định:** Chọn **R3 — Hybrid / Bridge**:

| Archetype | Radius |
| --- | --- |
| control | 8–10px |
| card | 12–16px |
| panel | 20–28px |
| signature | 36–48px |
| pill | 999px — chỉ cho tag/chip/control có ngữ nghĩa |

**Lý do chủ dự án chọn R3:** khả năng mở rộng dài hạn tốt hơn; cân bằng giữa cảm giác editorial và component tái sử dụng; ít mâu thuẫn tương lai giữa Design Bible và Component Inventory; ưu tiên hơn việc bám sát tuyệt đối prototype.

**Ràng buộc:** không bo toàn bộ section; full-width section mặc định không radius; không nested rounded card; tối đa 1–2 signature-radius object mỗi trang; radius gắn archetype, không gắn tùy ý theo section. Giá trị canonical ở `COMPONENT_INVENTORY.md §B.4`.

## D50 — Design Governance Hierarchy (ratify Design Bible)

**Trạng thái:** Approved — 2026-07-27
**Amend:** `AI_RULEBOOK.md` (§2 đọc bắt buộc), `CLAUDE.md` (nguồn sự thật), `README.md`

**Bối cảnh:** `docs/design-bible/` được bổ sung làm governance layer nhưng chưa được Decision Log phê chuẩn. Cần khóa thứ tự thẩm quyền để tránh hai chỉ dẫn trái nhau cho AI agent.

**Quyết định:** Chính thức nạp **CDC Design Bible** làm governance layer. Thứ tự thẩm quyền bắt buộc; tầng dưới không được mâu thuẫn tầng trên:

```
Decision Log → Design Bible → Design System → Component Inventory → AI Rulebook → CLAUDE.md → Source
```

**Trách nhiệm từng tầng:**

| Tầng | Giữ | Không giữ |
| --- | --- | --- |
| **Decision Log** | Thẩm quyền tối cao; mọi quyết định (append-only); phân xử mâu thuẫn | Nguyên tắc/giá trị/triển khai chi tiết |
| **Design Bible** | Governance reference: thesis, brand, thinking model (Human Composition, Editorial Intelligence, Reference Philosophy), anti-patterns, evidence, review gate. **Không override Decision Log** | Giá trị triển khai (số) |
| **Design System** | Direction narrative + principles/constraints; trỏ tới decisions & Bible | Giá trị token cụ thể |
| **Component Inventory** | **Nguồn duy nhất của "số"**: token values, radius, màu, breakpoint, danh sách component | Nguyên tắc/triết lý |
| **AI Rulebook** | Quy tắc vận hành AI (workflow, an toàn, DoD) | Quyết định thiết kế |
| **CLAUDE.md** | Con trỏ nguồn sự thật + quy tắc giao tiếp/kỹ thuật | Nội dung chi tiết |
| **Source Code** | Thi hành. **Không bao giờ là nguồn sự thật** | Quyết định/nguyên tắc |

**Ràng buộc chống trùng lặp:** giá trị (số) chỉ sống ở Component Inventory; Design Bible và Design System **trỏ tới**, không lặp lại. Khi Design Bible cần một con số, nó dẫn chiếu Component Inventory.
