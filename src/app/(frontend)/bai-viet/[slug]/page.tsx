import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { payloadClient, isAuthenticated } from "@/lib/payload";
import { getPillar } from "@/lib/pillars";
import { extractToc } from "@/lib/toc";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ArticleBody from "@/components/ArticleBody";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import styles from "./post.module.css";

// Nội dung đến từ Payload và đổi mỗi khi chủ website bấm đăng, nên trang phải
// render theo từng lượt truy cập. Dựng sẵn lúc build sẽ đóng băng nội dung ở thời
// điểm deploy, và bản thân việc dựng cũng vỡ vì lúc đó chưa chắc có kết nối CSDL.
export const dynamic = "force-dynamic";


type Params = { params: Promise<{ slug: string }> };

const ARTICLE_ID = "noi-dung-bai-viet";

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

  const seo = post.meta as { title?: string; description?: string } | undefined;

  return {
    title: seo?.title || post.title,
    description: seo?.description || post.excerpt,
    // Bài mẫu và bản nháp không bao giờ được Google lập chỉ mục dưới tên chủ website.
    robots:
      post.isDemo || post.status !== "published"
        ? { index: false, follow: false }
        : undefined,
  };
}

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(value));
}

/** Ước lượng thời gian đọc. 200 từ/phút là mức đọc tiếng Việt thông thường. */
function readingMinutes(state: unknown): number {
  const words = (JSON.stringify(state ?? "").match(/"text":"(.*?)"/g) ?? [])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({ params }: Params) {
  const post = await findPost((await params).slug);
  if (!post) notFound();

  const content = post.content as SerializedEditorState;
  const pillar = getPillar(post.pillar);
  const cover = typeof post.coverImage === "object" ? post.coverImage : null;
  const published = formatDate(post.publishedAt);
  const minutes = readingMinutes(content);
  const toc = extractToc(content);
  const isDraft = post.status !== "published";

  return (
    <>
      <ReadingProgress targetId={ARTICLE_ID} />
      <SiteHeader currentPath="/bai-viet" />

      <main id="main-content">
        {/* Dải cảnh báo chỉ chủ website nhìn thấy — người ngoài không vào được bản nháp. */}
        {isDraft && (
          <div className={styles.draftBanner} role="status">
            Bản nháp — chỉ anh nhìn thấy. Đổi trạng thái sang <strong>Đã đăng</strong> để
            mọi người đọc được.
          </div>
        )}

        <article>
          {/* Phần đầu bài chạy hết bề rộng — tiêu đề lớn cần chỗ thở. */}
          <header className={`container ${styles.head}`}>
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
            <figure className={`container ${styles.cover}`}>
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

          {/* Từ đây xuống chia hai cột: mục lục bám bên trái, bài đọc ở giữa. */}
          <div className={`container ${styles.layout}`}>
            <aside className={styles.rail}>
              <TableOfContents items={toc} />
            </aside>

            <ArticleBody
              content={content}
              className={styles.body}
              id={ARTICLE_ID}
            />
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
