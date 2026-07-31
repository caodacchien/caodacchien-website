import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StatusMessage from "@/components/StatusMessage";

// 404 — trang lỗi theo IA §1 (`/404`), hoàn tất phạm vi Milestone 1.2 (Global layout).
// Server component: không cần state, không cần JS phía client.
//
// Trung thực: nhiều route trong IA (/topics/, /case-studies/, /contact/…) CHƯA được dựng.
// Copy nói đúng hai khả năng thật (đường dẫn sai HOẶC trang chưa xuất bản), không hứa
// "sắp ra mắt", không gợi ý route không tồn tại, không search giả, không sitemap giả.

export const metadata: Metadata = {
  title: "Không tìm thấy trang | Cao Đắc Chiến",
};

export default function NotFound() {
  return (
    <>
      {/* Không truyền currentPath: 404 không thuộc route nào trong nav → không aria-current. */}
      <SiteHeader />

      <main id="main-content">
        {/* Một section duy nhất → h1 + landmark main đã đủ tên; không cần aria-labelledby. */}
        <section className="status-page container-content">
          <p className="eyebrow">404</p>
          {/* h1 do StatusMessage render (đúng một h1 trên trang). */}
          <StatusMessage
            variant="page"
            title="Không tìm thấy trang này."
            description="Đường dẫn có thể đã thay đổi, hoặc trang chưa được xuất bản. Bạn có thể quay về trang chủ, hoặc dùng điều hướng ở đầu trang."
            action={<Link href="/">Về trang chủ</Link>}
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
