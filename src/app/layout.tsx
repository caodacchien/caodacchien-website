import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

// Geist Sans là typeface duy nhất của visible UI (D48). KHÔNG tải Geist Mono.
// Self-host qua gói `geist` (D43) — không fetch runtime, có subset Vietnamese.

export const metadata: Metadata = {
  title: "Cao Đắc Chiến",
  description:
    "Website cá nhân của Cao Đắc Chiến — Marketing Leader, Brand & Marketing Strategist. Đang được xây dựng theo hệ thống nội dung và thiết kế đã được phê duyệt.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={GeistSans.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Bỏ qua tới nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
