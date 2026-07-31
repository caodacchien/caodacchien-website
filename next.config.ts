import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Hosting target đổi từ Cloudflare Pages static-first (D56) sang Vercel.
// Lý do: Payload CMS cần máy chủ Node chạy thường trực cho trang quản trị và REST API —
// trang tĩnh thuần không phục vụ được. Cloudflare vẫn giữ DNS và SSL.
// Xem "Hệ quả kỹ thuật kéo theo" trong BRIEF.
const nextConfig: NextConfig = {
  images: {
    // Ảnh do Payload phục vụ qua chính domain này. Bổ sung remotePatterns khi gắn
    // adapter lưu trữ ngoài (Vercel Blob) ở mốc 04/08.
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(nextConfig);
