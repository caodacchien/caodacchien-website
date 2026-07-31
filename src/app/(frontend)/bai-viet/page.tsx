import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostCard from "@/components/PostCard";
import { findPosts } from "@/lib/posts";
import styles from "./list.module.css";

// Nội dung đến từ Payload và đổi mỗi khi chủ website bấm đăng, nên trang phải
// render theo từng lượt truy cập. Dựng sẵn lúc build sẽ đóng băng nội dung ở thời
// điểm deploy, và bản thân việc dựng cũng vỡ vì lúc đó chưa chắc có kết nối CSDL.
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Bài viết",
  description:
    "Bài viết về chiến lược marketing, thương hiệu, truyền thông và tăng trưởng kinh doanh.",
};

export default async function PostListPage() {
  const posts = await findPosts({ limit: 50 });

  return (
    <>
      <SiteHeader currentPath="/bai-viet" />

      <main id="main-content">
        <div className={`container ${styles.head}`}>
          <h1 className={styles.title}>Bài viết</h1>
          <p className={styles.lede}>
            Chiến lược, thương hiệu, truyền thông và tăng trưởng — viết từ chỗ đã làm,
            không phải chỗ đã đọc.
          </p>
        </div>

        <div className={`container ${styles.body}`}>
          {posts.length > 0 ? (
            <div className={styles.grid}>
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            // Trạng thái rỗng phải viết như một câu thật, không phải "Không có dữ liệu".
            <p className={styles.empty}>
              Chưa có bài nào được đăng. Bài đầu tiên đang trên bàn viết.
            </p>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
