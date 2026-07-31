import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Plus Jakarta Sans là typeface duy nhất của visible UI.
// Thay cho Satoshi mà DESIGN.md chỉ định: file Satoshi phát từ CDN Fontshare chỉ có 431 ký tự
// và thiếu 92/96 ký tự có dấu riêng của tiếng Việt (mất trọn dải U+1EA0–U+1EF9), nên mọi tiêu
// đề 93–120px sẽ bị trình duyệt vá bằng font hệ điều hành. Plus Jakarta Sans giữ được hình thái
// hình học hơi nhân văn của Satoshi và có bộ dấu tiếng Việt đầy đủ.
// next/font self-host lúc build — không gọi ra Google lúc chạy.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Marketing Leader`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Nơi Cao Đắc Chiến viết và xuất bản về chiến lược marketing, thương hiệu và truyền thông — cùng những tài liệu dùng được ngay.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={jakarta.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Bỏ qua tới nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
