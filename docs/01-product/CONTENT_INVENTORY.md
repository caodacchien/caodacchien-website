# Content Inventory

Danh mục toàn bộ nội dung thật mà chủ dự án cần cung cấp, kèm template để điền.

## Cách dùng

1. Điền trực tiếp vào file này, hoặc trả lời trong phiên làm việc với Claude Code để tôi điền hộ.
2. Cập nhật cột **Trạng thái** khi hoàn thành.
3. Nội dung có nhắc tới Roboworld hoặc khách hàng của Roboworld phải đánh dấu `REVIEW-REQUIRED` và chỉ xuất bản sau khi chủ dự án kiểm duyệt. Xem D6 trong `docs/00-foundation/DECISION_LOG.md`.

## Định vị chi phối toàn bộ nội dung ở đây

Nội dung điền vào tài liệu này phải phục vụ định vị tại `docs/01-product/BRAND_POSITIONING.md`: **Marketing Leader / Brand & Marketing Strategist**, không phải kỹ sư và không phải người điều hành một ngành dọc cụ thể. Xem D12 và D20.

Ưu tiên khán giả khi viết nội dung, theo D21: CEO và Founder trước, rồi CMO và Marketing Director, rồi người làm nghề. Nhà tuyển dụng đứng cuối.

Roboworld là **một case study trong nhiều case study**. Khi điền mục 5, đừng để nó chiếm chỗ của các dự án khác. Xem D13.

## Nguyên tắc bắt buộc

- Claude Code **không được tự bịa** thành tích, số liệu, chức danh, dự án, khách hàng, học vấn hoặc chứng chỉ. Xem D7.
- Khi chưa có nội dung thật, dùng placeholder có tiền tố `PLACEHOLDER:` hoặc `DRAFT:` để có thể tìm bằng grep.
- Không deploy production khi còn placeholder trong nội dung công khai.

## Ký hiệu trạng thái

| Ký hiệu | Nghĩa |
| --- | --- |
| `TODO` | Chưa có |
| `DRAFT` | Đã có bản nháp, chưa duyệt |
| `REVIEW-REQUIRED` | Đã có nội dung nhưng cần chủ dự án kiểm duyệt vì liên quan Roboworld hoặc bên thứ ba |
| `READY` | Đã duyệt, dùng được cho production |

---

## 1. Cổng mở khóa Milestone 1.4

Milestone 1.4 (Home + About) **chỉ bắt đầu** khi 5 mục sau đạt `READY`:

| # | Mục | Trạng thái |
| --- | --- | --- |
| 1 | Positioning statement | `READY` (Owner 1.5 About input, A-ID01) |
| 2 | Bio ngắn | `READY` (A-ID02) |
| 3 | Ảnh chân dung | `TODO` (chưa cung cấp — About MVP omit được) |
| 4 | Kinh nghiệm chính (tối thiểu 1) | `READY` (A-ID04 — Roboworld hiện tại) |
| 5 | Project thật (tối thiểu 1) | `TODO` (Home featured case — chưa cung cấp; **không** chặn About) |

> Ghi chú: **About content READY** (mục 1/2/4 đủ). Mục 3 (ảnh) và 5 (project) là nội dung cho **Home** — About MVP không phụ thuộc. Nội dung About do Owner cung cấp ở gate content 1.5 (About) và đã duyệt công khai (C-ID15: mọi mục công khai trừ số điện thoại).

---

## 2. Định vị và tiểu sử

### 2.1 Positioning statement

Một câu trả lời cho "Cao Đắc Chiến là ai và tạo ra giá trị gì cho ai". Dùng ở hero của Home và thẻ meta description.

- Độ dài mục tiêu: 15–25 từ.
- Tránh từ sáo rỗng như "đam mê", "nhiệt huyết", "năng động".

```text
Trạng thái: READY
Nội dung: Tôi là Cao Đắc Chiến, Marketing Leader chuyên xây dựng hệ thống marketing tạo ra tăng trưởng bền vững cho doanh nghiệp.
```

### 2.2 Headline nghề nghiệp

Một dòng ngắn hiển thị dưới tên. Ví dụ cấu trúc: `<Vai trò> tại <Tổ chức>` hoặc `<Vai trò> · <Lĩnh vực>`.

```text
Trạng thái: READY
Nội dung: Marketing Leader · Brand & Marketing Strategist
Ghi chú: đây là headline định vị (D20). Chức danh công việc hiện tại (Marketing Manager tại Roboworld) ở mục 4 — Kinh nghiệm.
```

### 2.3 Bio ngắn

Dùng ở Home, footer, thẻ Open Graph, và phần author của bài blog.

- Độ dài mục tiêu: 40–60 từ.

```text
Trạng thái: READY
Nội dung: Tôi là Marketing Leader với kinh nghiệm xây dựng phòng Marketing từ con số 0, tái cấu trúc hệ thống marketing và trực tiếp vận hành Performance Marketing cho các doanh nghiệp B2B và B2C. Tôi quan tâm đến việc kết hợp chiến lược thương hiệu, dữ liệu và AI để tạo ra tăng trưởng bền vững.
```

### 2.4 Bio dài

Dùng ở trang About.

- Độ dài mục tiêu: 250–400 từ.
- Nên trả lời: xuất phát điểm, bước ngoặt, việc đang làm, hướng đi tiếp theo.

```text
Trạng thái: READY
Nội dung:
Tôi bắt đầu sự nghiệp với Performance Marketing, nhưng càng làm tôi càng nhận ra rằng quảng cáo chỉ là một phần rất nhỏ của Marketing.

Một doanh nghiệp có thể tạo ra doanh thu trong ngắn hạn bằng quảng cáo, nhưng sẽ rất khó tăng trưởng lâu dài nếu không có chiến lược thương hiệu, hệ thống nội dung, quy trình vận hành và đội ngũ phù hợp.

Trong nhiều năm làm việc ở các lĩnh vực như giáo dục, thương mại điện tử, bán lẻ và robot dịch vụ, tôi nhiều lần tham gia xây dựng hoặc tái cấu trúc phòng Marketing từ đầu. Công việc của tôi không chỉ là triển khai chiến dịch, mà còn là thiết kế cách một tổ chức vận hành Marketing như một hệ thống hoàn chỉnh.

Hiện nay tôi dành nhiều thời gian nghiên cứu cách AI có thể hỗ trợ Marketing ở cấp độ chiến lược và vận hành. Tôi tin rằng AI không thay thế marketer, mà giúp marketer tập trung nhiều hơn vào tư duy, ra quyết định và xây dựng hệ thống.

Thông qua website này, tôi chia sẻ góc nhìn, kinh nghiệm thực tế và những bài học về Marketing Strategy, Brand Strategy, Content, AI và Leadership để giúp doanh nghiệp xây dựng tăng trưởng bền vững.
```

### 2.5 Giá trị cốt lõi

3–5 giá trị, mỗi giá trị một tiêu đề ngắn và một câu giải thích.

| # | Giá trị | Giải thích | Trạng thái |
| --- | --- | --- | --- |
| 1 | Tư duy dài hạn (long-term thinking) | *(câu giải thích chưa cung cấp)* | `READY` (tiêu đề) / giải thích `TODO` |
| 2 | Hệ thống hơn chiến dịch (systems over campaigns) | *(chưa cung cấp)* | `READY` / `TODO` |
| 3 | Bằng chứng trước quan điểm (evidence before opinion) | *(chưa cung cấp)* | `READY` / `TODO` |
| 4 | Học hỏi liên tục (continuous learning) | *(chưa cung cấp)* | `READY` / `TODO` |
| 5 | Công nghệ khuếch đại con người (technology amplifies people) | *(chưa cung cấp)* | `READY` / `TODO` |

> Nguồn: B-ID06 (Owner 1.5 About). Tiêu đề đã có (dùng được cho About A3); câu giải thích 1 dòng mỗi giá trị **chưa cung cấp** — Optional, có thể bổ sung sau, **không** tự bịa.

### 2.6 Nội dung tường thuật About (Philosophy · Leadership · AI · Working Principles · Evidence)

Nội dung Owner cung cấp cho phần narrative/approach trên About (map A3/A5). VERIFIED (Owner 1.5 About).

**Marketing Philosophy (B-ID07):**
> Marketing không phải là quảng cáo. Marketing là hệ thống kết nối chiến lược, thương hiệu, nội dung, vận hành và con người thành tăng trưởng kinh doanh bền vững.

**Leadership (B-ID08):**
> Vai trò của một marketing leader không phải tự làm mọi thứ một mình, mà là thiết kế những hệ thống giúp đội ngũ liên tục tạo ra công việc xuất sắc.

**AI (B-ID09):**
> AI nên nâng chất lượng tư duy, thay vì chỉ tăng số lượng nội dung.

**Working Principles (B-ID10):** Nghiên cứu → Ra quyết định → Triển khai → Đo lường → Lặp lại cải tiến → Ghi chép tài liệu → Tự động hóa.

**Evidence (B-ID11)** — định tính, không số liệu (đúng D7, không metric wall):
- Xây dựng phòng Marketing từ đầu.
- Tái cấu trúc hệ thống marketing.
- Chiến lược website.
- Hệ thống tài liệu sản phẩm.
- Triển khai quy trình AI (AI workflow).

```text
Trạng thái: READY (Philosophy/Leadership/AI/Principles/Evidence — tiêu đề + nội dung ngắn)
Ghi chú: labels gốc tiếng Anh đã normalize sang tiếng Việt (D1 VN-first); giữ thuật ngữ chuẩn (Performance Marketing, AI). Không thêm số liệu/claim ngoài Owner cung cấp.
```

---

## 3. Ảnh và tài sản hình ảnh

| Tài sản | Yêu cầu kỹ thuật | Dùng ở đâu | Trạng thái |
| --- | --- | --- | --- |
| Ảnh chân dung chính | Tối thiểu 1200×1200, tỷ lệ vuông, nền gọn, định dạng gốc chất lượng cao | Home hero, About | `TODO` |
| Ảnh chân dung phụ | Tối thiểu 1200×1600, tỷ lệ dọc | About | `TODO` |
| Ảnh Open Graph | 1200×630 | Chia sẻ mạng xã hội | `TODO` |
| Favicon / logo cá nhân | SVG hoặc PNG 512×512 | Toàn site | `TODO` |

Ghi chú: cần bản quyền hoặc quyền sử dụng rõ ràng cho mọi ảnh. Không dùng ảnh chưa có quyền.

---

## 4. Kinh nghiệm làm việc

Điền mỗi vị trí một khối. Nhân bản khối theo số lượng thực tế.

> Nhắc lại D6: mô tả liên quan Roboworld chỉ được nêu ở mức đã công khai. Không nêu doanh thu, khách hàng chưa được phép, hay tài liệu nội bộ.

### Khối kinh nghiệm — template

```yaml
trang_thai: TODO          # TODO | DRAFT | REVIEW-REQUIRED | READY
cong_ty:
chuc_danh:
dia_diem:
bat_dau:                  # YYYY-MM
ket_thuc:                 # YYYY-MM, để trống nếu đang làm
mo_ta:                    # 2-3 câu về phạm vi trách nhiệm
trach_nhiem:              # 3-5 gạch đầu dòng
  -
  -
  -
ket_qua_dinh_luong:       # Chỉ ghi số liệu đã được phép công khai. Không có thì để trống.
  -
du_an_lien_quan:          # slug của project trong mục 5
  -
```

### Kinh nghiệm 1 — hiện tại

```yaml
trang_thai: READY   # Roboworld = REVIEW-REQUIRED theo D6 → Owner đã duyệt công khai (C-ID15); chỉ thông tin công khai (vai trò/trách nhiệm), KHÔNG doanh thu/khách hàng/nội bộ
cong_ty: Roboworld
chuc_danh: Marketing Manager
nganh: B2B Robotics (robot dịch vụ)   # chỉ phân loại; website không neo vào ngành dọc (BRAND §8) — đây là một mục Experience (D13)
dia_diem:                 # chưa cung cấp
bat_dau:                  # chưa cung cấp
ket_thuc:                 # trống — đang làm (hiện tại)
mo_ta: Dẫn dắt marketing cho doanh nghiệp B2B lĩnh vực robot dịch vụ; xây dựng chiến lược, thương hiệu, performance và quy trình vận hành có AI hỗ trợ.
trach_nhiem:
  - Chiến lược marketing
  - Chiến lược thương hiệu
  - Performance Marketing
  - Website
  - Quy trình AI (AI Workflow)
  - Dẫn dắt đội ngũ
ket_qua_dinh_luong:       # không cung cấp — để trống (tuyệt đối không ước lượng, D7)
du_an_lien_quan:
```

### Kinh nghiệm 2

```yaml
trang_thai: READY   # cơ bản (công ty + chức danh); chi tiết/thời gian chưa cung cấp
cong_ty: Hato
chuc_danh: Marketing Manager
dia_diem:                 # chưa cung cấp
bat_dau:                  # chưa cung cấp
ket_thuc:                 # chưa cung cấp
mo_ta:                    # chưa cung cấp chi tiết
trach_nhiem:
ket_qua_dinh_luong:
```

### Kinh nghiệm 3

```yaml
trang_thai: READY   # cơ bản
cong_ty: Crown UK
chuc_danh: Ecommerce Marketing Manager
dia_diem:                 # chưa cung cấp
bat_dau:                  # chưa cung cấp
ket_thuc:                 # chưa cung cấp
mo_ta:                    # chưa cung cấp chi tiết
trach_nhiem:
ket_qua_dinh_luong:
```

### Kinh nghiệm 4

```yaml
trang_thai: READY   # cơ bản
cong_ty: CDC Agency
chuc_danh: Founder
dia_diem:                 # chưa cung cấp
bat_dau:                  # chưa cung cấp
ket_thuc:                 # chưa cung cấp
mo_ta:                    # chưa cung cấp chi tiết
trach_nhiem:
ket_qua_dinh_luong:
```

---

## 5. Dự án và Case study

Mục tiêu theo `PRODUCT_REQUIREMENTS.md` §8: tối thiểu **3 case study chất lượng**.

> **Ngưỡng bật Featured Case Study trên Home (D55):** ≥1 case **thật** có `context` · `problem` · `approach` · `result`; mọi metric **được phép công khai** (D6); case liên quan Roboworld giữ `REVIEW-REQUIRED` trước publish (D13). Chưa đủ → S3 **graceful omission** (không case/metric/artifact giả).

### Khối project — template

```yaml
trang_thai: TODO
tieu_de:
slug:                     # kebab-case, dùng làm URL
tom_tat:                  # 1-2 câu, hiển thị ở thẻ danh sách

# Bối cảnh
khach_hang:               # tên khách hàng hoặc tổ chức
khach_hang_duoc_cong_khai: false   # true chỉ khi đã có phép nêu tên
nganh:                    # ngành của khách hàng, chỉ để phân loại
hinh_thuc:                # in_house | consulting | advisory | personal
thoi_gian:                # ví dụ: 2024-03 đến 2024-11

# Nội dung case study
boi_canh:                 # tình hình trước khi bắt đầu
van_de:                   # bài toán marketing hoặc thương hiệu cần giải
cach_tiep_can:            # chiến lược và lý do chọn chiến lược đó
trien_khai:               # đã làm gì, qua kênh nào
ket_qua:                  # diễn giải kết quả bằng lời

# Dịch vụ đã cung cấp — rút từ 10 vùng năng lực trong BRAND_POSITIONING.md §2
dich_vu:
  -
  -

# Số liệu kết quả. Chỉ ghi số đã được phép công khai.
# Không có số liệu thì để trống, tuyệt đối không ước lượng.
so_lieu:
  - nhan:                 # ví dụ: Tăng trưởng lead
    gia_tri:              # ví dụ: +180%
    ghi_chu:              # ví dụ: 6 tháng, so với cùng kỳ

vai_tro_cua_ban:          # Nêu rõ phần bạn trực tiếp làm, tránh gây hiểu nhầm về công sức tập thể
anh_bia:                  # đường dẫn hoặc mô tả
thu_vien_anh:             # danh sách ảnh
  -
lien_ket_tham_khao:       # link tới chiến dịch hoặc sản phẩm thật, để trống nếu không có
noi_bat: false            # true nếu muốn hiện ở Home
```

Ghi chú theo D14: template này dành cho **case study marketing**. Không có trường tech stack và không có link repository. Nếu một dự án chỉ mô tả được bằng công nghệ đã dùng thì nó chưa phải case study, mới chỉ là ghi chép công việc.

Ghi chú theo D6: điền `khach_hang` vào đây không đồng nghĩa với việc được công khai. Chỉ đặt `khach_hang_duoc_cong_khai: true` khi đã thực sự có phép.

### Project 1

```yaml
trang_thai: TODO
tieu_de:
slug:
```

### Project 2

```yaml
trang_thai: TODO
tieu_de:
slug:
```

### Project 3

```yaml
trang_thai: TODO
tieu_de:
slug:
```

---

## 6. Học vấn

| Trường | Ngành | Bằng cấp | Từ | Đến | Trạng thái |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  | `TODO` |

---

## 7. Chứng chỉ

| Tên chứng chỉ | Tổ chức cấp | Ngày cấp | Ngày hết hạn | Link xác minh | Trạng thái |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  | `TODO` |

Ghi chú: chỉ liệt kê chứng chỉ đã thực sự đạt được. Không liệt kê khóa học đang theo dưới dạng chứng chỉ.

---

## 8. Kỹ năng

Nhóm theo chủ đề, mỗi nhóm 4–8 kỹ năng. Tránh danh sách dài dàn trải.

| Nhóm | Kỹ năng | Trạng thái |
| --- | --- | --- |
|  |  | `TODO` |

---

## 8b. Làm việc cùng tôi

Nội dung cho khối "Làm việc cùng tôi" xuất hiện trên Home và About. Chốt theo D18.

Đây là **khối thông tin**, không phải phễu bán hàng. Không điền bảng giá vào đây.

> **`servicesOffered` = `OWNER ASSET REQUIRED` (D54).** Section S5 trên Home là `conditional_hidden_until_content_ready`: **không render công khai** khi mục này chưa được Owner cung cấp + duyệt. Claude **không** tự viết dịch vụ chung chung (tư vấn chiến lược / quản lý thương hiệu / performance marketing / xây dựng hệ thống…). Khi ẩn, Home nối S6 trực tiếp sau S4 (graceful omission).

### Template — mỗi hình thức hợp tác một khối

```yaml
trang_thai: TODO
hinh_thuc:                # ví dụ: Tư vấn chiến lược thương hiệu
mo_ta:                    # 2-3 câu về hình thức này
phu_hop_voi:              # loại bài toán và loại doanh nghiệp phù hợp
  -
khong_phu_hop_voi:        # loại bài toán bạn không nhận. Mục này quan trọng ngang mục trên.
  -
```

Ghi chú: mục `khong_phu_hop_voi` không phải để khiêm tốn. Nói rõ mình không nhận việc gì là tín hiệu thẩm quyền mạnh, và lọc trước những cuộc trao đổi không dẫn tới đâu.

### Hình thức hợp tác (B-ID12, Owner 1.5 About)

```text
Trạng thái: PARTIALLY READY
hinh_thuc (đã có):
  - Chiến lược marketing (Marketing Strategy)
  - Chiến lược thương hiệu (Brand Strategy)
  - Quy trình AI (AI Workflow)
  - Website
  - Tư vấn (Consulting)
  - Đào tạo (Training)
Còn thiếu: mô tả 2–3 câu/hình thức; `phu_hop_voi`; `khong_phu_hop_voi` (mục quan trọng, chưa cung cấp).
```

> **Ràng buộc (D54):** danh sách trên đủ để **nhắc tới hợp tác trên About** (A6/narrative), **NHƯNG chưa đủ để bật S5 "Làm việc cùng tôi" trên Home** — S5 cần `phu_hop_voi`/`khong_phu_hop_voi`. S5 Home **giữ omit**. Checkpoint này **không** sửa Homepage.

### Cách bắt đầu trao đổi

```text
Trạng thái: READY (dùng Contact CTA mailto)
Nội dung: liên hệ qua email forwork.chiencd@gmail.com (CONTENT §9 READY). Không form/booking/pricing (D18).
```

---

## 9. Liên hệ và mạng xã hội

Kênh xuất bản MVP chốt theo **D53**. Phân loại GitHub theo **D52**.

| Kênh | Giá trị | Phân loại (D52/D53) | Hiển thị công khai | Trạng thái |
| --- | --- | --- | --- | --- |
| Email liên hệ | `forwork.chiencd@gmail.com` | `social_primary` | Có | `READY` |
| LinkedIn |  | `social_primary` | Có (khi có URL) | `OWNER ASSET REQUIRED` |
| RSS | `/rss.xml` | `social_primary` (route contract) | Có | `READY` |
| GitHub | `https://github.com/caodacchien` | **`evidence_asset` (deferred, D52)** — KHÔNG social MVP | Không (MVP) | `DRAFT` (giữ, không xóa) |
| Facebook |  | `deferred` | — | `TODO` |
| X / Twitter |  | `deferred` | — | `TODO` |
| YouTube |  | `deferred` | — | `TODO` |
| Instagram |  | `deferred` | — | `TODO` |
| Behance |  | `deferred` | — | `TODO` |
| Số điện thoại |  | cân nhắc kỹ | — | `TODO` |

**Quy tắc render (D53):** chỉ render một social link khi **URL thật đã có ở bảng này**; không icon/link placeholder; không `#`; không suy đoán username/URL. Nếu LinkedIn chưa có URL lúc production → footer chỉ **Email + RSS**. GitHub **không** hiển thị như social ở MVP (D52); chỉ cân nhắc như evidence khi repo củng cố định vị Marketing Leader.

---

## 10. Blog

Với định vị nền tảng xuất bản theo D12, Blog không còn là phần phụ. **Blog rỗng khi ra mắt là một thất bại về định vị, không chỉ là thiếu nội dung.**

- Số bài mục tiêu khi ra mắt: 3, mỗi bài thuộc một trụ khác nhau.

> **Ngưỡng bật Featured Writing trên Home (D55):** ≥3 bài **thật** với `title` · `slug` · `published date` · `excerpt` · `reading time` hợp lệ, và Owner **xác nhận bài featured**. Chưa đủ → S2 **graceful omission** trên production (không placeholder card, không title/excerpt/date/reading-time giả).

### Năm trụ nội dung

Danh mục đã cố định theo D16. Không tạo danh mục ngoài năm trụ này.

| # | Trụ | Bao gồm | Số bài dự kiến khi ra mắt |
| --- | --- | --- | --- |
| 1 | Chiến lược | Marketing Strategy, Brand Strategy, Business Growth | |
| 2 | Tăng trưởng số | Digital Marketing, Marketing Automation | |
| 3 | Nội dung và Truyền thông | Content Marketing, Communication | |
| 4 | AI cho Marketing | AI for Marketing | |
| 5 | Lãnh đạo và Quan điểm | Marketing Leadership, quan điểm cá nhân | |

Khuyến nghị: ưu tiên trụ **AI cho Marketing**. Đây là vùng ít người Việt viết sâu và có thẩm quyền, nên cơ hội chiếm lĩnh vị trí đang mở.

### Ý tưởng bài viết

| # | Tiêu đề dự kiến | Trụ | Trạng thái |
| --- | --- | --- | --- |
| 1 |  |  | `TODO` |
| 2 |  |  | `TODO` |
| 3 |  |  | `TODO` |

---

## 11. SEO và metadata mặc định

| Mục | Giá trị | Trạng thái |
| --- | --- | --- |
| Site name | Cao Đắc Chiến | `READY` |
| Title template | `%s · Cao Đắc Chiến` | `DRAFT` |
| Default meta description | lấy từ mục 2.3 | `READY` (nguồn 2.3) |
| Từ khóa chính muốn xếp hạng | Marketing Strategy · Brand Strategy · Performance Marketing · AI for Marketing | `READY` (D-ID17) |

### About page metadata (D-ID17, Owner 1.5 About)

| Mục | Giá trị | Trạng thái |
| --- | --- | --- |
| About page title | `About \| Cao Đắc Chiến` | `READY` |
| About meta description | "Marketing Leader focusing on Marketing Strategy, Brand Strategy, Performance Marketing and AI for Marketing." | `PARTIALLY READY` — **ngôn ngữ**: Owner cung cấp bản tiếng Anh; site là **VN-first (D1)**. Đề xuất bản VN: "Marketing Leader tập trung vào Chiến lược Marketing, Chiến lược Thương hiệu, Performance Marketing và AI cho Marketing." → **cần Owner xác nhận dùng bản EN hay VN** trước khi vào production. |

---

## 12. Pháp lý

| Trang | Cần cho MVP | Ghi chú | Trạng thái |
| --- | --- | --- | --- |
| Privacy Policy | Có | Bắt buộc vì có GA4 và contact form thu thập dữ liệu cá nhân | `TODO` |
| Terms of Use | Không | Cân nhắc ở Phase 2 | `TODO` |
