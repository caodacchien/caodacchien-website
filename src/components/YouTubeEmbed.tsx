import styles from "./YouTubeEmbed.module.css";

type Props = {
  videoId: string;
  caption?: string | null;
  startAt?: number | null;
};

/**
 * Nhúng video YouTube.
 *
 * Dùng youtube-nocookie.com thay youtube.com: bản này không đặt cookie theo dõi cho tới
 * khi người xem thực sự bấm play. Người chỉ lướt qua bài mà không xem video thì không bị
 * YouTube ghi nhận — sạch hơn về quyền riêng tư, và bớt việc phải xin phép cookie.
 *
 * loading="lazy": video nằm giữa bài không tải cho tới khi người đọc cuộn tới. Một bài có
 * ba video mà tải hết ngay đầu thì trang nặng thêm vài megabyte trước khi đọc được chữ nào.
 */
export default function YouTubeEmbed({ videoId, caption, startAt }: Props) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (startAt && startAt > 0) params.set("start", String(startAt));

  return (
    <figure className={styles.wrap}>
      <div className={styles.frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          title={caption || "Video YouTube"}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
