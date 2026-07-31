import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import styles from "./SiteHeader.module.css";

// Thanh điều hướng theo DESIGN.md §Navigation Bar: nền trắng, không viền, không bóng đổ.
// Trái là wordmark đậm, phải là các link chỉ có chữ — không nút có nền.
//
// Chỉ liệt kê route đã thật sự tồn tại, không render link dẫn tới 404.
// Danh sách nở dần khi dựng thêm: Tài liệu, Chủ đề, Giới thiệu, Liên hệ.

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [{ href: "/bai-viet", label: "Bài viết" }];

export default function SiteHeader({ currentPath }: { currentPath?: string }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Dấu chấm cam thay cho dấu sao của pop.site — cùng vai trò: một điểm màu
            duy nhất trong thanh điều hướng, đủ để wordmark có nhịp riêng. */}
        <Link href="/" className={styles.wordmark}>
          {SITE_NAME}
          <span aria-hidden="true" className={styles.dot}>
            .
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={currentPath?.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
