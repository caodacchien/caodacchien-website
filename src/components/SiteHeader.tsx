import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

// Header dùng chung. Server component — không state, không JS phía client.
// Markup/class giữ nguyên hợp đồng S0 đang dùng ở Home/About (không đổi design language).
//
// Link honesty (Owner 1.5D-F): CHỈ liệt kê route đã thật sự tồn tại.
// Nav 5 mục của D26 (Viết · Case study · Chủ đề · Giới thiệu · Liên hệ) sẽ đủ dần
// khi /case-studies/ và /topics/ được dựng — không render trước link 404.

type NavItem = { href: string; label: string; external?: boolean };

const NAV: NavItem[] = [
  { href: "/writing/", label: "Viết" },
  { href: "/about", label: "Giới thiệu" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Liên hệ", external: true },
];

export default function SiteHeader({ currentPath }: { currentPath?: string }) {
  return (
    // `site-header-shared` = modifier cho phép xuống hàng khi nav có ≥3 mục.
    // Không sửa `.site-header` gốc để Home/About giữ nguyên render.
    <header className="site-header site-header-shared container-content">
      <p className="wordmark">
        <Link href="/">{SITE_NAME}</Link>
      </p>
      <nav className="primary-nav" aria-label="Điều hướng chính">
        <ul>
          {NAV.map((item) =>
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
