import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import styles from "./status.module.css";

// Trang 404. Copywriting phải đạt chuẩn xuất bản như mọi trang khác — một website
// dùng làm bằng chứng năng lực thương hiệu không được để chuỗi mặc định của khung.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className={`container ${styles.wrap}`}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Trang này không tồn tại.</h1>
          <p className={styles.lede}>
            Có thể đường dẫn đã đổi, hoặc bài viết đã được gỡ. Thử quay lại danh sách
            bài viết xem có thứ anh chị đang tìm không.
          </p>
          <Link href="/bai-viet" className={styles.action}>
            Xem tất cả bài viết
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
