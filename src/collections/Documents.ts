import type { CollectionConfig } from "payload";
import { PILLARS } from "@/lib/pillars";

// Thư viện tài liệu — thứ người ta tải về rồi dùng được ngay.
//
// Bản 1 chỉ phát miễn phí, đổi lấy email (quyết định C). Trường `price` cố ý CHƯA có:
// thêm một cột giá lúc này là mời gọi bật bán hàng trước khi có hạ tầng thanh toán,
// nghĩa vụ hoá đơn và gói Vercel Pro. Khi bật bán, thêm trường ở một milestone riêng.
export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Tài liệu", plural: "Tài liệu" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "pillar", "status", "downloadCount"],
    description:
      "Tài liệu cho người đọc tải về. Bản này chỉ phát miễn phí — người tải để lại email.",
  },
  access: {
    read: ({ req: { user } }) => (user ? true : { status: { equals: "published" } }),
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Tên tài liệu" },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Đường dẫn",
      admin: { description: "Viết thường không dấu, nối bằng dấu gạch ngang." },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      maxLength: 300,
      label: "Mô tả",
      admin: {
        description:
          "Nói rõ người tải sẽ dùng được nó vào việc gì. Cụ thể thắng hoa mỹ.",
      },
    },
    {
      name: "pillar",
      type: "select",
      required: true,
      label: "Trụ nội dung",
      options: PILLARS.map((p) => ({ label: p.title, value: p.slug })),
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Ảnh bìa",
    },
    {
      name: "file",
      type: "upload",
      relationTo: "document-files",
      required: true,
      label: "File tải về",
    },
    {
      name: "requireEmail",
      type: "checkbox",
      defaultValue: true,
      label: "Yêu cầu để lại email trước khi tải",
      admin: {
        description:
          "Bật: người tải phải nhập email, email vào mục Email thu được. Tắt: tải thẳng.",
      },
    },
    {
      name: "downloadCount",
      type: "number",
      defaultValue: 0,
      label: "Lượt tải",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Tự đếm. Không sửa tay.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Ngày đăng",
      defaultValue: () => new Date().toISOString(),
      admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" } },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      label: "Trạng thái",
      options: [
        { label: "Bản nháp", value: "draft" },
        { label: "Đã đăng", value: "published" },
      ],
    },
    {
      name: "isDemo",
      type: "checkbox",
      defaultValue: false,
      label: "Tài liệu mẫu (không cho Google lập chỉ mục)",
      admin: { position: "sidebar" },
    },
  ],
};

// File tải về tách riêng khỏi Ảnh: hai loại này có kiểu file, kích thước và
// cách phục vụ khác hẳn nhau. Gộp chung sẽ khiến bộ chọn ảnh trong bài viết
// hiện lẫn cả file PDF.
export const DocumentFiles: CollectionConfig = {
  slug: "document-files",
  labels: { singular: "File tài liệu", plural: "File tài liệu" },
  admin: {
    description: "File thật mà người đọc tải về. PDF, Word, Excel, PowerPoint.",
  },
  access: { read: () => true },
  upload: {
    mimeTypes: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  },
  fields: [
    {
      name: "sourceNote",
      type: "text",
      required: true,
      label: "Nguồn gốc tài liệu",
      admin: {
        description:
          "Bắt buộc ghi rõ ai là tác giả. Chỉ đăng tài liệu do anh viết hoặc anh có quyền phát hành — không đăng lại sách, giáo trình hay slide của người khác.",
      },
    },
  ],
};
