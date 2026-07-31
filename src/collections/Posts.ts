import type { CollectionConfig } from "payload";
import { PILLARS } from "@/lib/pillars";

// Bài viết — trục chính của website.
// Nhãn tiếng Việt vì chủ dự án là người dùng admin duy nhất và không làm kỹ thuật.
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Bài viết", plural: "Bài viết" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "pillar", "status", "publishedAt"],
    description:
      "Bài viết dài về chiến lược, marketing và truyền thông. Đặt trạng thái Đã đăng thì bài mới hiện trên website.",
    // Nút "Xem trước" — tương đương nút cùng tên trong WordPress.
    // Mở đúng trang bài viết thật trên website, kể cả khi còn là bản nháp.
    preview: (doc) => (doc?.slug ? `/bai-viet/${doc.slug}?draft=true` : null),
  },
  access: {
    // Chỉ bài đã đăng mới ra ngoài. Người chưa đăng nhập không thấy bản nháp.
    read: ({ req: { user } }) => (user ? true : { status: { equals: "published" } }),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Tiêu đề",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Đường dẫn",
      admin: {
        description:
          "Phần đuôi URL, viết thường không dấu, nối bằng dấu gạch ngang. Ví dụ: khung-lap-ke-hoach-truyen-thong",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 200,
      label: "Tóm tắt",
      admin: {
        description:
          "1–2 câu. Dùng cho thẻ bài ở trang danh sách VÀ cho mô tả khi chia sẻ lên Google/Facebook. Tối đa 200 ký tự.",
      },
    },
    {
      name: "pillar",
      type: "select",
      required: true,
      label: "Trụ nội dung",
      options: PILLARS.map((p) => ({ label: p.title, value: p.slug })),
      admin: { description: "Mỗi bài thuộc đúng một trụ. Không tạo trụ mới." },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Ảnh bìa",
      admin: { description: "Hiện ở đầu bài và trên thẻ bài. Nên dùng ảnh ngang." },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Nội dung",
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
      // Cờ nội dung mẫu — xem BRIEF §5.
      // Bài bật cờ này bị loại khỏi sitemap và gắn noindex, để nội dung minh hoạ
      // không bao giờ bị Google lập chỉ mục dưới tên chủ dự án.
      name: "isDemo",
      type: "checkbox",
      defaultValue: false,
      label: "Bài mẫu (không cho Google lập chỉ mục)",
      admin: {
        position: "sidebar",
        description:
          "Bật cho nội dung minh hoạ giao diện. Bài vẫn hiện trên website nhưng không lên Google và không vào sitemap. Tắt khi đây là bài thật của anh.",
      },
    },
  ],
};
