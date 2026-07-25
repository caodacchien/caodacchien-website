# Design System

## Trạng thái

**Design Direction đã khóa theo D29 (2026-07-24):** hướng **Tòa soạn (Editorial) làm nền · cấu trúc Thư viện (Library) · khối dữ liệu Hồ sơ Chiến lược**.

**Bảng màu cụ thể vẫn chưa chốt** — điền ở Milestone 0.4 (D10, D32). Kiến trúc token và danh sách component nằm ở `COMPONENT_INVENTORY.md`. Kiến trúc thông tin nằm ở `INFORMATION_ARCHITECTURE.md`.

Kết quả Milestone 0.3 lần một đã bị hủy theo D17 và không được tái sử dụng.

## Design Direction đã khóa — Strategic Editorial with Product-Level Precision

Chốt theo **D36** (2026-07-24), mở rộng D29. Tu chỉnh một phần token của D32 (xem §Typography và §Layout dưới đây).

**Câu định danh sản phẩm:** *A Strategic Editorial Platform for a Marketing Leader.*

- Website **không phải:** SaaS website · startup landing page · developer portfolio · agency landing page.
- Website **là:** một ấn phẩm biên tập cao cấp, nhưng có độ hoàn thiện interaction và chi tiết như một digital product hiện đại.

**Thứ tự ưu tiên — không phải visual-first:** Editorial-first · Case-study-first · Writing-first · Knowledge-first · Framework-first · **Interaction-first**.

### Tham khảo craft

**resend.com** — học: layout rhythm, grid system, whitespace, typography hierarchy, surface system, card system, responsive composition, motion philosophy, tổng thể refinement.

**recent.design** — học: interaction quality, craftsmanship, sound-as-feedback.

**Không copy** từ bất kỳ tham khảo nào: hero, 3D object, dashboard, code editor, developer visual, **SaaS information architecture**, **SaaS copywriting**.

Nguyên tắc tách bạch: mượn **độ chỉn chu và chất lượng interaction của một digital product** rồi đặt lên một **ấn phẩm biên tập**, không mượn ngôn ngữ, IA hay copywriting của SaaS.

### Layout — bốn container, mỗi loại một mục đích

Cấm dùng một container duy nhất cho toàn site. *(Tu chỉnh D32: khôi phục `--container-wide`, nay có 4 container.)*

| Container | Bề rộng chỉ định | Mục đích |
| --- | --- | --- |
| `container-prose` | ~68ch | Cột đọc bài viết và case study — trục quan trọng nhất |
| `container-content` | ~1080px | Danh sách, hub trụ, section chuẩn của trang |
| `container-wide` | ~1280px | Bản đồ trụ, gallery case study, section cần thở rộng hơn |
| `container-full` | 100% | Ảnh hoặc khối tràn viền có chủ đích |

### Section rhythm — spacing ngữ nghĩa

Không dùng cùng một khoảng cách cho toàn site. Ba cấp map vào thang spacing của `COMPONENT_INVENTORY.md` §B.2:

| Cấp | Khoảng cách dọc (desktop) | Khi nào dùng |
| --- | --- | --- |
| **Major Section** | `space-9..10` (96–128px) | Ranh giới giữa các khối lớn khác mục đích (vd hết "bài viết featured" sang "case study featured") |
| **Standard Section** | `space-7..8` (48–64px) | Giữa các khối cùng nhóm |
| **Compact Section** | `space-5..6` (24–32px) | Trong một khối, giữa tiêu đề và nội dung |

### Responsive là composition, không chỉ resize

Mỗi section được quyền, khi xuống breakpoint nhỏ hơn: đổi thứ tự khối · đổi alignment · đổi layout (cột → hàng) · đổi tỷ lệ ảnh · CTA full-width trên mobile. Wireframe ở Milestone 0.4 phải mô tả **composition cho từng breakpoint**, không chỉ ghi "desktop → mobile stack".

### Typography — Geist, sans-first, không serif ở MVP

*(Tu chỉnh D36/D32 theo **D43** — chủ dự án chọn hệ font **Geist** (Vercel, OFL 1.1). Bỏ serif ở MVP.)*

- **Geist Sans** — font chính: Hero · Heading · Body · Navigation · UI · Button · Form · Label.
- **Geist Mono** — chỉ metadata/technical: ngày, thời gian đọc, category/tag, số liệu case study, nội dung kỹ thuật/code. Không làm phong cách chính.
- **Không dùng serif** trong MVP.

Tinh thần editorial nay đến từ **khoảng trắng rộng · measure 68ch · line-height 1.7 · sự tiết chế** (Geist là grotesque kiểu Swiss-minimal), không còn từ serif. Font, weight, letter-spacing và **kiểm dấu tiếng Việt** chi tiết ở `COMPONENT_INVENTORY.md` §B.1; breakpoints ở §B.9.

### Surface — ba lớp, không hơn

`Surface Page` · `Surface Raised` · `Surface Sunken`, map vào `--color-surface` / `--color-surface-raised` / `--color-surface-sunken`. Không tạo thêm lớp bề mặt.

### Card — giống ấn phẩm, không giống dashboard

Không gradient · không glassmorphism · không heavy shadow. Ưu tiên: **subtle border · subtle contrast · content-first**. Phân tầng bằng viền (light) và độ sáng bề mặt (dark).

### Visual — nguồn hình ảnh hợp lệ

- **Được:** framework · sơ đồ · diagram · illustration biên tập · editorial composition · real project asset.
- **Cấm:** dashboard screenshot · fake analytics · fake terminal · fake code editor · 3D object vô nghĩa. Đồng bộ C7/C8 trong Design Constraints.

### CTA

Không quá 2 CTA cạnh tranh trong cùng một viewport (P8, D23). CTA chính: **Đọc bài · Xem Case study · Đăng ký nhận bài**. CTA phụ: Chủ đề · Framework · Liên hệ.

### Motion

Subtle · purposeful · product-quality · **không decorative**. Thời lượng 120–200ms (D32). **Animation chỉ tồn tại khi phục vụ usability hoặc feedback** — không có animation thuần trang trí cạnh tranh với nội dung. Tôn trọng `prefers-reduced-motion`.

### Color mode — hai chế độ đều first-class

Light **không phải** bản đảo màu của dark. Hai chế độ dùng cùng hierarchy, cùng semantic token, đo tương phản AA **riêng từng chế độ** (D10).

## Ràng buộc đã chốt trước khi thiết kế

Các quyết định sau đã được duyệt và mọi Design Direction đề xuất đều phải thỏa mãn. Xem `docs/00-foundation/DECISION_LOG.md`.

| ID | Ràng buộc |
| --- | --- |
| **D22** | **Thứ tự ưu tiên bắt buộc khi xung đột: khả năng đọc → năng lực xuất bản → khả năng mở rộng → thẩm mỹ. Cái đẹp đứng thứ tư, không đứng đầu.** |
| **D22** | **Cấm tối ưu cho xu hướng thị giác. Tối ưu cho thẩm quyền, độ tin cậy, sự tin tưởng, tính vượt thời gian và khả năng đọc.** |
| **D22** | **Kiểm chứng mở rộng: hệ thống phải chịu được 200 bài viết, 30 case study và 3 loại nội dung chưa tồn tại mà không cần thiết kế lại.** |
| **D22** | **Cảm giác đích: tổng hành dinh số của một Marketing Leader. Không phải portfolio, không phải màn trình diễn thiết kế.** |
| **D20** | **Thiết kế phải nói được với cả hai vế của định vị: Marketing Leader dành cho CEO và Founder, Brand & Marketing Strategist dành cho CMO và người làm nghề.** |
| **D12** | **Cấm lấy cảm hứng thẩm mỹ từ ngành nghề của công ty hiện tại hoặc từ bất kỳ ngành dọc nào.** |
| **D12** | **Bản thân thiết kế là bằng chứng năng lực thương hiệu, không phải lớp trang trí. Xem `BRAND_POSITIONING.md` §6.** |
| **D21** | **Thứ tự ưu tiên khán giả quyết định UX. Nhóm 1 là CEO và Founder, nhóm 6 là nhà tuyển dụng. Khi xung đột, nhóm số nhỏ hơn thắng.** |
| D16, D31 | Năm trụ là trục điều hướng có ý nghĩa, có hub `/topics/[pillar]`, không phải danh sách tag phẳng |
| **D26** | **Nav 5 mục: Viết · Case study · Chủ đề · Giới thiệu · Liên hệ. Experience là section trong About. Chịu được 8 mục Phase 2 (D18)** |
| D33 | Search, Pagination, Filter hoãn Phase 2 — thiết kế MVP không phụ thuộc chúng |
| D18 | Phải có mẫu cho khối "Làm việc cùng tôi" trên Home và About. Khối thông tin, không phải phễu bán hàng |
| D10 | Bắt buộc có cả light mode và dark mode ngay ở MVP |
| D1 | Bố cục phải chịu được text tiếng Việt có dấu, và sau này chịu được text tiếng Anh dài hơn khoảng 20–30% khi bật locale `en` |
| D7 | Mọi thành phần hiển thị số liệu phải có trạng thái "chưa có dữ liệu" tử tế, vì nội dung thật chưa sẵn sàng |
| D14 | Trang Projects filter theo dịch vụ và ngành. Thiết kế không được giả định trục filter là công nghệ |

## Quy trình thiết kế bắt buộc

### Phase 1 — Design Direction
Claude Code phải đề xuất 3–5 hướng thiết kế. Mỗi hướng gồm:
- Triết lý
- Mood
- Màu sắc, mô tả cho **cả light mode và dark mode**
- Typography
- Layout
- Motion
- Component style
- Ưu / nhược điểm
- Website tham khảo

### Phase 2 — Design Tokens
Sau khi chọn hướng:
- Color tokens
- Typography scale
- Spacing
- Grid
- Radius
- Shadow
- Motion duration
- Breakpoints
- Container width

Quy tắc đặt tên token, bắt buộc theo D10:

- Tầng sử dụng chỉ được dùng token **semantic**: `--color-surface`, `--color-surface-raised`, `--color-text-primary`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-danger`.
- Token nguyên thủy theo giá trị màu như `--gray-900` chỉ tồn tại ở tầng định nghĩa, **cấm** dùng trực tiếp trong component.
- Mỗi token semantic phải có giá trị cho cả hai chế độ.
- Shadow trong dark mode không được sao chép từ light mode. Dark mode dùng phân tầng bằng độ sáng bề mặt thay vì đổ bóng.

### Phase 3 — Wireframe
Wireframe cho:
- Desktop
- Tablet
- Mobile

### Phase 4 — UI Specification
Mô tả:
- Hover
- Focus
- Loading
- Error
- Empty
- Success
- Dark mode

Yêu cầu riêng cho theme, theo D10:

- Mặc định theo `prefers-color-scheme` của hệ thống.
- Có nút chuyển theme với ba trạng thái: system, light, dark.
- Lưu lựa chọn của người dùng và khôi phục ở lần truy cập sau.
- Không được nhấp nháy sai theme khi tải trang.
- Nút chuyển theme phải truy cập được bằng bàn phím và có nhãn cho screen reader.

## Nguồn tham khảo định hướng

- Apple: bố cục và khoảng trắng
- Vercel: typography và tính kỹ thuật
- Linear: motion và dashboard
- Notion: content readability
- Framer: landing page presentation
- shadcn/ui: component foundation
- Lucide: iconography

## Nguyên tắc không được vi phạm

- Không copy nguyên bản website tham khảo.
- Không dùng quá nhiều gradient hoặc glassmorphism.
- Không hy sinh readability cho hiệu ứng.
- Không dùng animation dài hoặc gây cản trở.
- Mọi màu phải đạt độ tương phản hợp lý. Kiểm tra tương phản **riêng cho từng chế độ sáng và tối**, không suy diễn kết quả từ chế độ này sang chế độ kia.
- Component phải nhất quán toàn site.
- Tôn trọng `prefers-reduced-motion`.

## Design Principles

Tám nguyên tắc thiết kế là **tầng quyết định cao nhất** cho UI/UX/nội dung. Chốt theo D30. Khi một quyết định mâu thuẫn với chúng, quyết định đó sai.

| # | Nguyên tắc | Ý nghĩa |
| --- | --- | --- |
| P1 | **Evidence over Claims** | Mọi khẳng định năng lực đi kèm số liệu/ví dụ/cơ chế. Không bằng chứng thì không viết. |
| P2 | **Reading before Selling** | Người đọc nhận giá trị trước khi gặp lời mời. "Làm việc cùng tôi" luôn đứng sau bằng chứng. |
| P3 | **Text First** | Một bài chỉ có chữ phải đẹp và hoàn chỉnh. Ảnh bìa là tùy chọn, không bao giờ bắt buộc. |
| P4 | **Structure over Stream** | Tìm theo chủ đề trước, theo thời gian sau. Năm trụ là trục điều hướng thật, có hub. |
| P5 | **Framework as First-Class Object** | Khung tư duy có component, anchor và cách trích dẫn riêng. |
| P8 | **One Door per Screen** | Tối đa 2 CTA mỗi trang; không 2 CTA khác loại trong cùng khung nhìn. |
| P9 | **Minimal Motion** | Chuyển động chỉ để làm rõ quan hệ. Trần 200ms. Không reveal khi cuộn. |
| P10 | **Warmth in Words, Restraint in Form** | Sự ấm áp đến từ giọng viết; hình thức giữ tiết chế. |
| P11 | **Product-Level Precision** | Nội dung là biên tập, nhưng interaction và chi tiết phải hoàn thiện như một digital product hiện đại — nhịp layout, khoảng trắng, viền, trạng thái, focus đều chỉn chu. Bài học craft từ resend.com. |
| P12 | **Responsive as Composition** | Responsive là bố cục lại, không chỉ resize. Section được đổi thứ tự/alignment/layout/tỷ lệ ảnh theo breakpoint; CTA full-width trên mobile. |
| P13 | **Interaction Before Decoration** | Mọi visual effect, animation, motion, sound, hover state và micro-interaction phải phục vụ usability, feedback hoặc khả năng hiểu nội dung. Hiệu ứng trang trí chỉ được phép khi không cạnh tranh với nội dung và không làm giảm sự rõ ràng. Website phải cho cảm giác precise, calm, intentional — không flashy. |

Ghi chú: P6 (Publish Cheap) và P7 (Design for Article 200) từ bản 10 nguyên tắc đã chuyển: P6 thành nguyên tắc kiến trúc ở `SYSTEM_ARCHITECTURE.md`; P7 giải thể, phần bền vững giữ ở constraint URL bất biến. P11–P12 bổ sung theo D36; **P13 bổ sung theo D36 (Interaction Before Decoration)**.

## Design Constraints

Mười hai điều cấm bảo vệ chất lượng. Chốt theo D34. Những cái enforce bằng token hoặc Zod (radius, category enum) không lặp ở đây.

| # | Cấm | Lý do / bằng chứng |
| --- | --- | --- |
| C1 | Carousel hoặc autoplay cho nội dung chính | Ẩn nội dung, hại đọc và index. 17 site khảo sát không dùng |
| C2 | Pop-up chặn màn hình | Lenny đạt 1,2 triệu người đăng ký không dùng |
| C3 | Thanh CTA dính "đặt lịch tư vấn" | Dấu hiệu consulting landing page (D18) |
| C4 | Bảng giá dịch vụ | D18 |
| C5 | Dark pattern trong CTA/form | Phá cảm giác Authority/Thoughtful (D24) |
| C6 | Hiệu ứng bề mặt trang trí: glassmorphism, gradient vô cớ | Hại tương phản hai chế độ |
| C7 | Dashboard / SaaS UI | Đã loại ở vòng Design Direction |
| C8 | Ảnh stock doanh nhân | Tín hiệu ngược với nhóm khán giả 1 |
| C9 | Icon minh họa cho mọi mục (trần <12 icon) | Icon cho chức năng, không trang trí (P10) |
| C10 | Animation reveal khi cuộn | Cản trở khả năng đọc (P9, D22 #1) |
| C11 | Bắt buộc ảnh bìa cho mỗi bài | Thuế xuất bản — nguyên nhân số một khiến nhịp viết chết (P3) |
| C12 | Đổi URL đã xuất bản mà không redirect 301 | Phá tài sản SEO nhiều năm |

## Future Enhancement — Sound & Interaction

**Không thuộc MVP. Không implement ở milestone hiện tại.** Ghi vào Design Direction để thiết kế và kiến trúc sau này chừa chỗ. Chốt theo D36 và P13.

Sound là một phần của **Brand Experience**, không phải hiệu ứng thêm thắt. Nguyên tắc cốt lõi:

> **Sound is feedback, not decoration.**

Mục tiêu: subtle · premium · intentional · precision · craft · editorial. Website phải cho cảm giác một digital product cao cấp, không phải một website trình diễn hiệu ứng. Tham khảo chất lượng: `recent.design`.

### Default và điều khiển

- **Sound mặc định ON.**
- Người dùng có thể chủ động **Mute**; trạng thái Mute được lưu lại.
- **Luôn có nút Sound / Mute** với icon rõ ràng, dễ tìm, **không ẩn trong menu**, không cần mở Settings để tắt.
- Cần một component điều khiển âm thanh riêng ở Phase triển khai — chưa nằm trong 19 component MVP.

### Interaction được phép phát Sound — chỉ khi user chủ đích

Được: click Navigation · click Header Menu · click Mobile Menu · click CTA Button · click Theme Toggle · click Pillar Filter (nếu sau này có).

**Cấm phát** khi: hover · scroll · page load · animation · card xuất hiện · auto carousel · background effect.

### Chất lượng âm

Âm lượng nhỏ · rất ngắn · sạch · tối giản · không chói tai · không mechanical · không sci-fi quá mức · không mang cảm giác game.

### Spam protection

Không phát chồng. Khi user click liên tục: debounce hoặc throttle, chỉ phát một âm trong một khoảng rất ngắn, không tạo hiệu ứng machine-gun.

### Accessibility — Motion và Sound là hai hệ thống độc lập

- Sound **không** phải phương thức duy nhất truyền đạt trạng thái. Website vẫn phải dùng được khi mute, không có loa, hoặc user tắt sound.
- `prefers-reduced-motion` **chỉ** áp dụng cho Motion.
- Sound có preference **riêng** (Mute), tách khỏi Motion.
- Không tự động phát bất kỳ âm nào khi tải trang.
