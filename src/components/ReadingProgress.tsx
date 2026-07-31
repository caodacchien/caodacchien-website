"use client";

import { useEffect, useRef } from "react";
import styles from "./ReadingProgress.module.css";

/**
 * Thanh tiến trình đọc chạy ngang trên đỉnh trang.
 *
 * Đo theo phần thân bài, không theo cả trang: nếu tính cả chân trang thì thanh chạy
 * chưa hết khi người đọc đã đọc xong chữ cuối cùng.
 *
 * Ghi thẳng vào biến CSS bằng ref thay vì setState — thao tác này chạy mỗi khung hình
 * khi cuộn, để React vẽ lại là phí và giật.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = barRef.current;
    if (!target || !bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        bar.style.setProperty("--progress", "1");
        return;
      }
      const passed = -rect.top;
      const ratio = Math.min(1, Math.max(0, passed / total));
      bar.style.setProperty("--progress", String(ratio));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
