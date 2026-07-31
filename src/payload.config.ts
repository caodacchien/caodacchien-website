import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor, FixedToolbarFeature } from "@payloadcms/richtext-lexical";

import { Posts } from "./collections/Posts";
import { Media } from "./collections/Media";
import { Documents, DocumentFiles } from "./collections/Documents";
import { Leads, Contacts } from "./collections/Leads";
import { Users } from "./collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Quản trị caodacchien.io.vn",
    },
  },

  collections: [Posts, Documents, DocumentFiles, Media, Leads, Contacts, Users],

  // Trình soạn thảo.
  //
  // Bộ tính năng mặc định của Payload đã có đủ: đậm, nghiêng, gạch chân, gạch ngang,
  // tiêu đề H1–H6, danh sách, trích dẫn, liên kết, chèn ảnh, canh lề, thụt lề, đường kẻ.
  //
  // Thứ THIẾU không phải tính năng mà là cách bày: Payload để thanh công cụ ẨN, chỉ hiện
  // khi bôi đen chữ. WordPress để thanh công cụ HIỆN THƯỜNG TRỰC ngay trên khung soạn.
  // Với người quen WordPress, thanh ẩn = "không có chức năng bôi đậm".
  // FixedToolbarFeature bật lại kiểu WordPress.
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),

  // Bí mật ký phiên đăng nhập. Không có giá trị mặc định — thiếu thì phải dừng,
  // chứ không được âm thầm chạy bằng một khoá đoán được.
  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),

  // Ghi chú: khung giao diện admin của Payload chưa có tiếng Việt dựng sẵn, nên các nút
  // hệ thống (Save, Create New…) vẫn tiếng Anh. Nhưng mọi nhãn trường và mô tả đều đã
  // viết tiếng Việt trong từng collection — đó mới là phần chủ dự án đọc hằng ngày.

  // KHÔNG dùng sharp — có chủ đích, không phải bỏ sót.
  //
  // Payload dùng sharp để sinh sẵn nhiều cỡ ảnh lúc tải lên. Trên Vercel việc đó thừa:
  // next/image đã tự đổi cỡ và đổi định dạng (AVIF/WebP) ngay tại edge, theo đúng bề
  // rộng màn hình thật của người xem. Sinh sẵn 3 cỡ chỉ làm tốn gấp ba dung lượng lưu
  // trữ — mà Supabase Storage free chỉ có 1GB.
  //
  // Bỏ sharp cũng gỡ luôn một xung đột kiểu dữ liệu: trong cây phụ thuộc có ba bản sharp
  // (0.33.5 / 0.34.5 / 0.35.3), Payload và code ứng dụng nhìn hai bản khác nhau nên
  // `typeof sharp` không khớp `SharpDependency`. Ép kiểu thì che được lỗi nhưng vẫn còn
  // hai bản sharp thật trong bundle.
});
