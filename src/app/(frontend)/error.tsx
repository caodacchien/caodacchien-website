"use client";

import { useEffect } from "react";
import styles from "./status.module.css";

// Trang lỗi phải là client component — đó là yêu cầu của Next.js, vì nó cần nút thử lại.
// Không dựng SiteHeader ở đây: nếu lỗi phát sinh từ chính tầng dữ liệu thì header cũng
// có thể ném lỗi theo, và người dùng nhận màn hình trắng thay vì thông báo.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content">
      <section className={`container ${styles.wrap}`}>
        <p className={styles.code}>Lỗi</p>
        <h1 className={styles.title}>Có gì đó vừa hỏng.</h1>
        <p className={styles.lede}>
          Đây là lỗi phía website, không phải do anh chị thao tác sai. Thử tải lại xem
          có qua không — nếu vẫn vậy thì lát nữa quay lại giúp tôi.
        </p>
        <button type="button" onClick={reset} className={styles.action}>
          Thử lại
        </button>
      </section>
    </main>
  );
}
