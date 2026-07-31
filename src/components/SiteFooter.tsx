import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import styles from "./SiteFooter.module.css";

// Chân trang: wordmark + email thật + dòng bản quyền. Không số điện thoại, không
// link mạng xã hội (chưa có URL nào được duyệt), không menu phụ dẫn tới route chưa tồn tại.

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.wordmark}>
          {SITE_NAME}
          <span aria-hidden="true" className={styles.dot}>
            .
          </span>
        </p>

        <div className={styles.right}>
          {/* address chỉ bao thông tin liên hệ của chủ website. */}
          <address className={styles.contact}>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </address>
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
