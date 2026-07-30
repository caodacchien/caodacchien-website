import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

// Header dùng chung cho toàn site (Home · About · Writing). Server component — không state,
// không JS phía client, không hamburger/drawer: nav 3 mục xuống hàng bằng flex-wrap là đủ.
//
// Link honesty (Owner 1.5D-F): CHỈ liệt kê route đã thật sự tồn tại.
// Nav 5 mục của D26 (Viết · Case study · Chủ đề · Giới thiệu · Liên hệ) sẽ đủ dần
// khi /case-studies/ và /topics/ được dựng — không render trước link 404.

type NavItem = { href: string; label: string; external?: boolean };

// Dạng URL theo IA/D31/D57 (route MVP có trailing slash). Chiến lược trailing-slash
// ở tầng next.config vẫn hoãn tới deployment checkpoint — không đổi ở đây.
const NAV: NavItem[] = [
  { href: "/writing/", label: "Viết" },
  { href: "/about/", label: "Giới thiệu" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Liên hệ", external: true },
];

export default function SiteHeader({ currentPath }: { currentPath?: string }) {
  return (
    <header className="site-header container-content">
      <p className="wordmark">
        <Link href="/">{SITE_NAME}</Link>
      </p>
      <nav className="primary-nav" aria-label="Điều hướng chính">
        <ul>
          {NAV.map((item) =>
            // mailto không phải route nội bộ → không bao giờ nhận aria-current.
            item.external ? (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === currentPath ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
}
