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

---

### D19 — Rủi ro giấy phép Vercel Hobby

**Trạng thái:** Open
**Liên quan:** D5, D12

**Vấn đề:** Gói Vercel Hobby cấm sử dụng cho mục đích thương mại. Khi định vị còn là "website thương hiệu cá nhân" chung chung, rủi ro này ở mức lý thuyết. D12 đã đổi tình thế: consulting và sản phẩm số giờ là **mục đích được tuyên bố công khai** của sản phẩm.

Một trang mời gọi tư vấn trả phí, hoặc về sau bán sản phẩm số, rất khó lập luận là phi thương mại.

**Ba phương án:**

| # | Phương án | Chi phí |
| --- | --- | --- |
| 1 | Giữ Hobby, MVP không có lời mời chào dịch vụ trả phí | 0 đồng, nhưng mâu thuẫn với D18 phương án 2 và 3 |
| 2 | Nâng Vercel Pro khi bật nội dung consulting | khoảng 20 USD mỗi tháng |
| 3 | Chuyển hosting sang nền tảng khác không giới hạn thương mại ở gói miễn phí | 0 đồng nhưng tốn công di chuyển và lệch với kiến trúc đã chốt |

**Khuyến nghị:** phương án 1 cho tới hết Phase 1, rồi phương án 2 ngay khi bật nội dung consulting. Hai mươi USD mỗi tháng là chi phí nhỏ so với rủi ro bị gỡ site đúng lúc đang có khách hàng xem.

**Cần chốt trước:** Milestone 1.8, hoặc sớm hơn nếu D18 chọn phương án 2 hoặc 3.
