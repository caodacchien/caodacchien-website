# ⚠️ Tài liệu đã hết hiệu lực — chỉ giữ để tra cứu lịch sử

**Không dùng bất kỳ tài liệu nào trong thư mục này làm căn cứ để viết code.**

Toàn bộ tài liệu ở đây được viết cho Phase 0 (23–30/07/2026), mô tả một hệ thiết kế và
một kiến trúc **đã bị thay thế** vào ngày 31/07/2026. Chúng vẫn còn ở đây vì Decision Log
D1–D57 ghi lại lý do của nhiều lựa chọn vẫn còn đúng — nhưng phần kết luận thì đã cũ.

## Bốn thứ đã đổi

| Tài liệu ở đây nói | Thực tế hiện nay |
|---|---|
| Hệ màu Kinetic: trắng `#FBFBFB`, đen `#040404`, xám `#DEDEDE`, **cam `#FF4000`**; hướng "Strategic Editorial", tham khảo resend.com (D29/D36/D46/D47) | Hệ **pop.site**: nền trắng tuyệt đối, chữ khổng lồ 93–120px, viền tóc thay bóng đổ, nút pill. Màu nhấn **giữ lại cam `#FF4000`** — đây là thứ duy nhất còn sống từ hệ cũ |
| Font **Geist** (D43/D48) | **Plus Jakarta Sans**. Satoshi mà DESIGN.md chỉ định bị loại vì thiếu 92/96 ký tự có dấu tiếng Việt |
| **Không CMS.** Nội dung là file MDX đẩy qua `git push` (D3/D35) | **Payload CMS** nhúng trong Next.js. Nội dung nằm trong Postgres. Toàn bộ tầng MDX đã bị xoá |
| Hosting **Cloudflare Pages**, tĩnh 100% (D56) | **Vercel**. Payload cần máy chủ Node chạy thường trực. Cloudflare chỉ còn giữ DNS và SSL |
| **Case study** là trang trung tâm (D12/D22) | **Đã bỏ**. Định vị đổi từ "nói về bản thân" sang "phục vụ cộng đồng" |

## Phần vẫn còn đúng

Ba thứ trong kho này vẫn là nguồn sự thật, và đã được chép sang code:

- **Năm trụ nội dung** và slug của chúng → nay ở `src/lib/pillars.ts`
- **Bảng tương phản màu cam** (`--color-orange-700: #c42f00`, chữ đen trên nền cam) →
  `COMPONENT_INVENTORY §B.8` đã giải xong bài này, code lấy lại nguyên giá trị
- **Ranh giới bảo mật với công ty hiện tại** (PROJECT_CONSTITUTION §2.6, D6)

## Muốn biết hiện trạng thì đọc đâu

Xem `CLAUDE.md` ở thư mục gốc. Đó là tài liệu duy nhất phản ánh đúng những gì đang chạy.
