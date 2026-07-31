import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostCard from "@/components/PostCard";
import { findPosts } from "@/lib/posts";
import { PILLARS } from "@/lib/pillars";
import styles from "./home.module.css";

// Nội dung đến từ Payload và đổi mỗi khi chủ website bấm đăng, nên trang phải
// render theo từng lượt truy cập. Dựng sẵn lúc build sẽ đóng băng nội dung ở thời
// điểm deploy, và bản thân việc dựng cũng vỡ vì lúc đó chưa chắc có kết nối CSDL.
export const dynamic = "force-dynamic";


export default async function HomePage() {
  const posts = await findPosts({ limit: 6 });

  return (
    <>
      <SiteHeader currentPath="/" />

      <main id="main-content">
        {/* Định vị đứng đầu, ở cỡ chữ lớn nhất hệ thiết kế cho phép.
            Đây là câu duy nhất người lạ đọc trong năm giây đầu. */}
        <section className={`container ${styles.hero}`}>
          <h1 className={styles.heroTitle}>
            Marketing không phải nói to hơn. Là hiểu rõ hơn.
          </h1>
          <p className={styles.heroLede}>
            Tôi là Cao Đắc Chiến. Tôi viết về chiến lược marketing, thương hiệu và
            truyền thông — và phát hành những khung tư duy dùng được ngay trong tuần
            này, không phải để đọc cho biết.
          </p>
        </section>

        {/* Năm trụ nội dung: bản đồ tư duy của website. Đặt trước danh sách bài để
            người đọc biết mình đang đứng ở đâu trước khi chọn đọc gì. */}
        <section className={`container ${styles.section}`}>
          <h2 className={styles.sectionTitle}>Năm trụ nội dung</h2>
          <ul className={styles.pillars}>
            {PILLARS.map((p) => (
              <li key={p.slug}>
                <Link href={`/chu-de/${p.slug}`} className={styles.pillarRow}>
                  <span className={styles.pillarName}>{p.title}</span>
                  <span className={styles.pillarScope}>{p.scope}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Chưa có bài thì KHÔNG dựng khối rỗng kèm chữ "Chưa có dữ liệu".
            Trang chủ thiếu một mục vẫn tử tế hơn một mục rỗng. */}
        {posts.length > 0 && (
          <section className={`container ${styles.section}`}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Bài viết gần đây</h2>
              <Link href="/bai-viet" className={styles.seeAll}>
                Xem tất cả
              </Link>
            </div>
            <div className={styles.grid}>
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
