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
| 1 | Positioning statement | `TODO` |
| 2 | Bio ngắn | `TODO` |
| 3 | Ảnh chân dung | `TODO` |
| 4 | Kinh nghiệm chính (tối thiểu 1) | `TODO` |
| 5 | Project thật (tối thiểu 1) | `TODO` |

---

## 2. Định vị và tiểu sử

### 2.1 Positioning statement

Một câu trả lời cho "Cao Đắc Chiến là ai và tạo ra giá trị gì cho ai". Dùng ở hero của Home và thẻ meta description.

- Độ dài mục tiêu: 15–25 từ.
- Tránh từ sáo rỗng như "đam mê", "nhiệt huyết", "năng động".

```text
Trạng thái: TODO
Nội dung:
```

### 2.2 Headline nghề nghiệp

Một dòng ngắn hiển thị dưới tên. Ví dụ cấu trúc: `<Vai trò> tại <Tổ chức>` hoặc `<Vai trò> · <Lĩnh vực>`.

```text
Trạng thái: TODO
Nội dung:
```

### 2.3 Bio ngắn

Dùng ở Home, footer, thẻ Open Graph, và phần author của bài blog.

- Độ dài mục tiêu: 40–60 từ.

```text
Trạng thái: TODO
Nội dung:
```

### 2.4 Bio dài

Dùng ở trang About.

- Độ dài mục tiêu: 250–400 từ.
- Nên trả lời: xuất phát điểm, bước ngoặt, việc đang làm, hướng đi tiếp theo.

```text
Trạng thái: TODO
Nội dung:
```

### 2.5 Giá trị cốt lõi

3–5 giá trị, mỗi giá trị một tiêu đề ngắn và một câu giải thích.

| # | Giá trị | Giải thích | Trạng thái |
| --- | --- | --- | --- |
| 1 |  |  | `TODO` |
| 2 |  |  | `TODO` |
| 3 |  |  | `TODO` |

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

### Kinh nghiệm 1

```yaml
trang_thai: TODO
cong_ty:
chuc_danh:
```

### Kinh nghiệm 2

```yaml
trang_thai: TODO
cong_ty:
chuc_danh:
```

---

## 5. Dự án và Case study

Mục tiêu theo `PRODUCT_REQUIREMENTS.md` §8: tối thiểu **3 case study chất lượng**.

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

### Cách bắt đầu trao đổi

```text
Trạng thái: TODO
Nội dung:
```

---

## 9. Liên hệ và mạng xã hội

| Kênh | Giá trị | Hiển thị công khai | Trạng thái |
| --- | --- | --- | --- |
| Email liên hệ | `forwork.chiencd@gmail.com` | Có | `READY` |
| LinkedIn |  |  | `TODO` |
| GitHub | `https://github.com/caodacchien` |  | `DRAFT` |
| Facebook |  |  | `TODO` |
| X / Twitter |  |  | `TODO` |
| YouTube |  |  | `TODO` |
| Số điện thoại |  | Cân nhắc kỹ trước khi công khai | `TODO` |

---

## 10. Blog

Với định vị nền tảng xuất bản theo D12, Blog không còn là phần phụ. **Blog rỗng khi ra mắt là một thất bại về định vị, không chỉ là thiếu nội dung.**

- Số bài mục tiêu khi ra mắt: 3, mỗi bài thuộc một trụ khác nhau.

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
| Site name |  | `TODO` |
| Title template | `%s · Cao Đắc Chiến` | `DRAFT` |
| Default meta description | lấy từ mục 2.3 | `TODO` |
| Từ khóa chính muốn xếp hạng |  | `TODO` |

---

## 12. Pháp lý

| Trang | Cần cho MVP | Ghi chú | Trạng thái |
| --- | --- | --- | --- |
| Privacy Policy | Có | Bắt buộc vì có GA4 và contact form thu thập dữ liệu cá nhân | `TODO` |
| Terms of Use | Không | Cân nhắc ở Phase 2 | `TODO` |
