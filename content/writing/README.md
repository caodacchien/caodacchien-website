# Hướng dẫn viết và xuất bản bài

Thư mục này chứa toàn bộ bài viết của website. Mỗi bài là **một file**.

Không cần biết lập trình để dùng thư mục này.

---

## 1. Tạo bài mới

Nhân bản file `_TEMPLATE.vi.mdx` rồi đổi tên bản sao.

Đừng sửa trực tiếp `_TEMPLATE.vi.mdx` — nó là bản mẫu dùng lại nhiều lần.

## 2. Đặt tên file

Dạng tên file:

```
ten-bai-khong-dau.vi.mdx
```

Ví dụ: `khung-dinh-vi-thuong-hieu.vi.mdx`

Quy tắc:

- chữ thường không dấu và số
- nối các từ bằng **một** dấu gạch ngang
- không khoảng trắng, không gạch dưới, không chữ hoa, không dấu tiếng Việt
- không bắt đầu hay kết thúc bằng dấu gạch ngang
- luôn kết thúc bằng `.vi.mdx`

**Tên file chính là đường dẫn bài trên website.** Bài trên sẽ có địa chỉ:

```
/writing/khung-dinh-vi-thuong-hieu/
```

Đặt tên xong thì **đừng đổi nữa** — đổi tên file là đổi địa chỉ, làm hỏng link cũ và mất thứ hạng Google.

Có một vài tên bị cấm vì trùng với đường dẫn hệ thống: `page`, `feed`, `rss`, `index`, `new`, `edit`, `draft`, `admin`, `api`.

## 3. Điền phần frontmatter

Phần giữa hai dòng `---` ở đầu file. **Năm dòng bắt buộc:**

| Dòng | Ý nghĩa |
| --- | --- |
| `title` | Tiêu đề bài, có dấu tiếng Việt bình thường |
| `summary` | Tóm tắt 1–2 câu, hiện ở trang Viết và trên Google |
| `publishedAt` | Ngày xuất bản thật, dạng `YYYY-MM-DD` (ví dụ `2026-08-15`) |
| `status` | `draft` hoặc `published` |
| `pillar` | Một trong năm trụ, gõ y hệt bên dưới |

Năm trụ hợp lệ (gõ đúng cả dấu):

```
Chiến lược
Tăng trưởng số
Nội dung và Truyền thông
AI cho Marketing
Lãnh đạo và Quan điểm
```

**Bốn dòng tùy chọn** — không dùng thì xoá hẳn dòng đó:

| Dòng | Ý nghĩa |
| --- | --- |
| `featured` | `true` nếu muốn đánh dấu bài nổi bật. Mặc định `false` |
| `updatedAt` | Ngày sửa lại bài. Không được sớm hơn `publishedAt` |
| `coverImage` | Đường dẫn ảnh bìa |
| `coverImageAlt` | Mô tả ảnh cho người khiếm thị |

Không thêm dòng nào khác. Gõ sai tên dòng sẽ báo lỗi chứ không âm thầm bỏ qua.

Không cần ghi slug, thời gian đọc, tác giả hay thẻ tag — hệ thống tự tính.

## 4. Viết thân bài

Viết Markdown bình thường, bên dưới phần frontmatter:

```markdown
Đoạn mở đầu.

## Tiêu đề mục

Nội dung. Có thể **in đậm**, *in nghiêng*, [chèn link](https://example.com).

- gạch đầu dòng
- gạch đầu dòng

> câu trích dẫn
```

Trong thân bài hãy bắt đầu tiêu đề từ `##`, không dùng `#` một mình — vì tiêu đề lớn nhất của trang đã là `title`.

## 5. Giữ bài ở dạng nháp

Để `status: draft`.

Bài nháp **không hiện trên website** ở bất kỳ đâu, kể cả khi xem thử ở máy. Cứ để nháp bao lâu tuỳ ý.

## 6. Xuất bản bài

Đổi thành `status: published` và kiểm tra `publishedAt` là ngày thật.

## 7. Thêm ảnh bìa (không bắt buộc)

Bài chỉ có chữ vẫn hiển thị đẹp — ảnh luôn là tùy chọn.

Nếu có ảnh: đặt ảnh vào `public/writing/<ten-file-bai>/` rồi khai:

```yaml
coverImage: /writing/khung-dinh-vi-thuong-hieu/cover.jpg
coverImageAlt: Mô tả ngắn nội dung ảnh
```

Có `coverImage` thì bắt buộc có `coverImageAlt`, và ngược lại.

> Hiện tại ảnh bìa **chưa được hiển thị** trên website. Phần hiển thị ảnh sẽ được bật ở bước làm trang chi tiết bài viết. Khai sẵn bây giờ vẫn đúng và không gây lỗi.

## 8. Kiểm tra bài trước khi gửi đi

Chạy một lệnh:

```
pnpm content:check
```

Đúng thì hiện `✓`. Sai thì nó in ra **tên file** và **lỗi cụ thể ở dòng nào**.

## 9. Xem thử ở máy

```
pnpm dev
```

Rồi mở `http://localhost:3000/writing`.

## 10. Đưa bài lên website

Theo quy trình Git của dự án: tạo nhánh mới, commit file bài, đẩy lên, mở Pull Request, chờ duyệt rồi merge.

Nếu không dùng Git ở máy, có thể tạo và sửa file trực tiếp trên github.com — hệ thống kiểm tra tự động vẫn chạy khi mở Pull Request.

## 11. Các lỗi hay gặp

| Thông báo | Nguyên nhân | Cách sửa |
| --- | --- | --- |
| `title không được để trống` | Thiếu tiêu đề hoặc để trống | Điền `title` |
| `publishedAt: phải là ngày có thật theo định dạng YYYY-MM-DD` | Sai định dạng, hoặc ngày không tồn tại như `2026-02-31` | Sửa thành ngày thật |
| `Invalid option: expected one of "draft"\|"published"` | Gõ sai `status` | Chỉ dùng `draft` hoặc `published` |
| Lỗi ở `pillar` | Gõ sai tên trụ, thiếu dấu, hoặc trụ không nằm trong năm trụ | Chép lại đúng từ danh sách mục 3 |
| `Unrecognized key` | Thêm dòng lạ hoặc gõ sai tên dòng | Xoá dòng đó hoặc sửa đúng tên |
| `có coverImage thì bắt buộc phải có coverImageAlt` | Khai ảnh mà thiếu mô tả | Thêm `coverImageAlt` |
| `updatedAt không được sớm hơn publishedAt` | Ngày sửa sớm hơn ngày đăng | Sửa lại một trong hai ngày |
| `slug "..." không hợp lệ` | Tên file có dấu, chữ hoa, khoảng trắng hoặc gạch dưới | Đổi tên file theo mục 2 |
| `slug "..." nằm trong danh sách dành riêng` | Tên file trùng đường dẫn hệ thống | Đổi tên khác |
| `bài đã published nhưng thân bài trống` | Đặt `published` nhưng chưa viết nội dung | Viết thân bài, hoặc chuyển về `draft` |

## 12. Những thứ không nên sửa

- `_TEMPLATE.vi.mdx` — bản mẫu dùng lại
- Chính file `README.md` này
- Tên file của những bài **đã xuất bản** — đổi tên là làm hỏng link cũ
- Bất kỳ file nào ngoài thư mục `content/` và `public/`
