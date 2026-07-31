import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  lexicalEditor,
  FixedToolbarFeature,
  BlocksFeature,
} from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { resendAdapter } from "@payloadcms/email-resend";

import { Posts } from "./collections/Posts";
import { Media } from "./collections/Media";
import { Documents, DocumentFiles } from "./collections/Documents";
import { Leads, Contacts } from "./collections/Leads";
import { Users } from "./collections/Users";
import { YouTubeBlock } from "./blocks/YouTube";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Kho lưu file. Chỉ bật khi có token — nếu chưa, Payload dùng đĩa cục bộ để chạy dev. */
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " — Quản trị caodacchien.io.vn" },

    // Xem trước ngay trong màn hình soạn bài, đổi được kích thước màn hình.
    // Khác với nút "Xem trước" mở tab mới: cái này nhúng thẳng website vào bên phải
    // khung soạn, gõ tới đâu thấy tới đó.
    livePreview: {
      // BẮT BUỘC. Thiếu dòng này thì cấu hình phía dưới vẫn hợp lệ về kiểu dữ liệu,
      // build vẫn xanh, nhưng Payload không bật xem trước cho collection nào cả —
      // nên trong màn hình soạn bài không hiện gì.
      collections: ["posts", "documents"],
      breakpoints: [
        { label: "Điện thoại", name: "mobile", width: 390, height: 844 },
        { label: "Máy tính bảng", name: "tablet", width: 834, height: 1112 },
        { label: "Màn hình lớn", name: "desktop", width: 1440, height: 900 },
      ],
      url: ({ data, collectionConfig }) => {
        if (collectionConfig?.slug === "posts" && data?.slug) {
          return `${SITE_URL}/bai-viet/${data.slug}`;
        }
        if (collectionConfig?.slug === "documents" && data?.slug) {
          return `${SITE_URL}/tai-lieu/${data.slug}`;
        }
        return SITE_URL;
      },
    },
  },

  collections: [Posts, Documents, DocumentFiles, Media, Leads, Contacts, Users],

  // Trình soạn thảo.
  //
  // Bộ tính năng mặc định đã có: đậm, nghiêng, gạch chân, gạch ngang, tiêu đề H1–H6,
  // danh sách, trích dẫn, liên kết, chèn ảnh, canh lề, thụt lề, đường kẻ.
  //
  // FixedToolbarFeature: Payload để thanh công cụ ẨN, chỉ hiện khi bôi đen chữ.
  // WordPress để HIỆN THƯỜNG TRỰC. Với người quen WordPress, thanh ẩn đọc ra là
  // "không có chức năng". Đây là vấn đề cách bày, không phải thiếu tính năng.
  //
  // BlocksFeature: khối nhúng. Hiện có Video YouTube — dán link vào là xong.
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      BlocksFeature({ blocks: [YouTubeBlock] }),
    ],
  }),

  plugins: [
    // Ô tiêu đề SEO, thẻ mô tả, và khung xem trước kết quả Google —
    // phần tương đương Yoast mà làm được ngay.
    // CHƯA có: chấm điểm từ khóa và đánh giá độ dễ đọc. Hai thứ đó Payload không
    // có sẵn, phải tự viết — nằm ở chặng 2 theo BRIEF.
    seoPlugin({
      collections: ["posts", "documents"],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }) => `${doc?.title ?? ""} — Cao Đắc Chiến`,
      generateDescription: ({ doc }) => doc?.excerpt ?? doc?.description ?? "",
      generateURL: ({ doc, collectionSlug }) => {
        const seg = collectionSlug === "documents" ? "tai-lieu" : "bai-viet";
        return `${SITE_URL}/${seg}/${doc?.slug ?? ""}`;
      },
    }),

    // Kho lưu ảnh và file tải về. Vercel có hệ thống file chỉ đọc nên bắt buộc
    // phải đẩy ra kho ngoài trước khi lên sóng.
    ...(blobToken
      ? [
          vercelBlobStorage({
            collections: { media: true, "document-files": true },
            token: blobToken,
          }),
        ]
      : []),
  ],

  // Gửi email: khôi phục mật khẩu quản trị, và thông báo khi có người liên hệ.
  // Chưa có khoá thì Payload in email ra màn hình — đủ dùng lúc phát triển,
  // nhưng phải có khoá thật trước khi lên sóng.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: "no-reply@caodacchien.io.vn",
        defaultFromName: "Cao Đắc Chiến",
        apiKey: process.env.RESEND_API_KEY,
      })
    : undefined,

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },

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
  // trữ — mà hạn mức kho lưu miễn phí rất nhỏ.
  //
  // Bỏ sharp cũng gỡ luôn một xung đột kiểu dữ liệu: trong cây phụ thuộc có ba bản sharp
  // (0.33.5 / 0.34.5 / 0.35.3), Payload và code ứng dụng nhìn hai bản khác nhau nên
  // `typeof sharp` không khớp `SharpDependency`.
});
