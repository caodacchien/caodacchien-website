// Empty state biên tập — dùng khi chưa có nội dung thật.
// Không "No articles found.", không skeleton giả, không card ma.
// Nội dung do trang gọi truyền vào để mỗi ngữ cảnh có giọng riêng.

type Props = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="empty-state">
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-description">{description}</p>}
    </div>
  );
}
