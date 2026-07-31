import type { CollectionConfig } from "payload";

// Ảnh dùng trong bài viết và ảnh bìa.
// LƯU Ý TRIỂN KHAI: hiện lưu vào đĩa cục bộ — chỉ chạy được lúc phát triển.
// Vercel có hệ thống file chỉ đọc, nên trước khi lên sóng phải gắn adapter lưu trữ
// (@payloadcms/storage-vercel-blob). Việc này nằm ở mốc 04/08 cùng thư viện tài liệu.
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Ảnh", plural: "Ảnh" },
  admin: {
    description: "Ảnh dùng trong bài viết, ảnh bìa và ảnh minh hoạ tài liệu.",
  },
  access: { read: () => true },
  upload: {
    mimeTypes: ["image/*"],
    // Không khai báo imageSizes: next/image đổi cỡ và đổi định dạng ngay tại edge theo
    // bề rộng màn hình thật. Sinh sẵn nhiều cỡ lúc tải lên chỉ tốn dung lượng.
    // Lý do đầy đủ ở payload.config.ts.
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Mô tả ảnh",
      admin: {
        description:
          "Mô tả ngắn nội dung ảnh. Bắt buộc — người dùng trình đọc màn hình cần nó, và Google cũng đọc.",
      },
    },
    {
      name: "credit",
      type: "text",
      label: "Nguồn ảnh",
      admin: {
        description:
          "Ghi nguồn nếu ảnh không phải của anh. Để trống nếu anh tự chụp hoặc tự thiết kế.",
      },
    },
  ],
};
