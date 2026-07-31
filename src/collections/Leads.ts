import type { CollectionConfig } from "payload";

// Email thu được khi ai đó tải tài liệu.
// Chỉ ghi vào, không ai đọc được từ ngoài — kể cả khi biết đường dẫn API.
export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Email thu được", plural: "Email thu được" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "document", "createdAt"],
    description:
      "Danh sách email của người đã tải tài liệu. Xuất ra file được để dùng cho email marketing.",
    group: "Dữ liệu thu về",
  },
  access: {
    // Người ngoài được TẠO (tải tài liệu) nhưng không được ĐỌC danh sách.
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "email", type: "email", required: true, index: true, label: "Email" },
    {
      name: "document",
      type: "relationship",
      relationTo: "documents",
      label: "Tải tài liệu nào",
    },
    {
      name: "consentedAt",
      type: "date",
      label: "Thời điểm đồng ý nhận tin",
      admin: {
        readOnly: true,
        description:
          "Mốc thời gian người dùng tick đồng ý. Giữ lại để chứng minh có sự đồng ý nếu về sau gửi email marketing.",
      },
    },
  ],
  timestamps: true,
};

export const Contacts: CollectionConfig = {
  slug: "contacts",
  labels: { singular: "Liên hệ", plural: "Liên hệ" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt"],
    description: "Tin nhắn gửi từ form Liên hệ.",
    group: "Dữ liệu thu về",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Họ tên" },
    { name: "email", type: "email", required: true, label: "Email" },
    { name: "message", type: "textarea", required: true, label: "Nội dung" },
    {
      name: "handled",
      type: "checkbox",
      defaultValue: false,
      label: "Đã xử lý",
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
