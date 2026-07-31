"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";
import styles from "./TableOfContents.module.css";

type Props = { items: TocItem[] };

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    // rootMargin cắt vùng quan sát còn một dải hẹp gần đỉnh màn hình. Không có nó thì
    // nhiều tiêu đề cùng "đang hiện" một lúc và mục đang đọc nhảy loạn khi cuộn.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null; // Một mục thì không phải mục lục.

  return (
    <nav className={styles.toc} aria-label="Nội dung bài viết">
      <p className={styles.label}>Nội dung chính</p>
      <ol className={styles.list}>
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? styles.sub : undefined}
          >
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? styles.active : undefined}
              aria-current={activeId === item.id ? "location" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
