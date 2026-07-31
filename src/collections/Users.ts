import type { CollectionConfig } from "payload";

// Tài khoản đăng nhập trang quản trị. MVP chỉ có một người: chủ dự án.
// Không mở đăng ký công khai — tài khoản đầu tiên tạo lúc chạy admin lần đầu.
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Tài khoản", plural: "Tài khoản" },
  auth: true,
  admin: {
    useAsTitle: "email",
    description: "Tài khoản đăng nhập trang quản trị này.",
    group: "Hệ thống",
  },
  access: {
    // Không ai ngoài người đã đăng nhập được đọc hoặc tạo tài khoản.
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [{ name: "name", type: "text", label: "Tên hiển thị" }],
};
