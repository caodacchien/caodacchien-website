import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { payloadClient, isAuthenticated } from "@/lib/payload";
import { getPillar } from "@/lib/pillars";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import styles from "./post.module.css";

type Params = { params: Promise<{ slug: string }> };

async function findPost(slug: string) {
  const payload = await payloadClient();
  // Chủ website đã đăng nhập thì xem được cả bản nháp — đó là cơ chế của nút Xem trước.
  const canSeeDrafts = await isAuthenticated();

  const { docs } = await payload.find({
    collection: "posts",
    where: canSeeDrafts
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { status: { equals: "published" } }] },
    limit: 1,
    depth: 2,
    overrideAccess: canSeeDrafts,
  });

  return docs[0] ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await findPost((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    // Bài mẫu không bao giờ được Google lập chỉ mục dưới tên chủ website.
    // Bản nháp cũng vậy. Xem cờ isDemo trong BRIEF §5.
    robots: post.isDemo || post.status !== "published" ? { index: false, follow: false } : undefined,
  };
}

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(value));
}

/** Ước lượng thời gian đọc từ số từ. 200 từ/phút là mức đọc tiếng Việt thông thường. */
function readingMinutes(state: unknown): number {
  const text = JSON.stringify(state ?? "");
  const words = (text.match(/"text":"(.*?)"/g) ?? [])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({ params }: Params) {
  const post = await findPost((await params).slug);
  if (!post) notFound();

  const pillar = getPillar(post.pillar);
  const cover = typeof post.coverImage === "object" ? post.coverImage : null;
  const published = formatDate(post.publishedAt);
  const minutes = readingMinutes(post.content);
  const isDraft = post.status !== "published";

  return (
    <>
      <SiteHeader currentPath="/bai-viet" />

      <main id="main-content">
        {/* Dải cảnh báo chỉ chủ website nhìn thấy — người ngoài không vào được bản nháp. */}
        {isDraft && (
          <div className={styles.draftBanner} role="status">
            Bản nháp — chỉ anh nhìn thấy. Đổi trạng thái sang <strong>Đã đăng</strong> để
            mọi người đọc được.
          </div>
        )}

        <article className="container">
          <header className={styles.head}>
            <div className={styles.meta}>
              {pillar && (
                <Link href={`/chu-de/${pillar.slug}`} className={styles.pillarLink}>
                  {pillar.title}
                </Link>
              )}
              {published && <time dateTime={post.publishedAt ?? undefined}>{published}</time>}
              <span>{minutes} phút đọc</span>
            </div>

            <h1>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>
          </header>

          {cover?.url && (
            <figure className={styles.cover}>
              <Image
                src={cover.url}
                alt={cover.alt ?? ""}
                width={cover.width ?? 1600}
                height={cover.height ?? 900}
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              {cover.credit && <figcaption>{cover.credit}</figcaption>}
            </figure>
          )}

          <div className={`${styles.body} prose`}>
            <RichText data={post.content as SerializedEditorState} />
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
