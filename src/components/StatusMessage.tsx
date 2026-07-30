import type { ReactNode } from "react";

// StatusMessage — gộp Empty state + 404 + 500 (COMPONENT_INVENTORY §Chuyển đổi & hồ sơ:
// "EmptyState + ErrorState → StatusMessage"). Server component.
// Không "No results found", không skeleton giả, không card ma, không CTA giả.
//
// `variant` theo đúng idiom của COMPONENT_INVENTORY (ContentCard/ContentHeader/Label
// cũng phân biệt bằng variant):
//   inline — khối trạng thái trong một danh sách; title là <p> vì heading của section đã có.
//   page   — trang trạng thái độc lập (404/500); title là <h1> duy nhất của trang.
//
// DOM của variant `inline` giữ nguyên hợp đồng empty state đã duyệt ở /writing (D55):
// đổi tên component KHÔNG được đổi kết quả render của trang đã duyệt.

type Props = {
  title: string;
  description?: string;
  variant?: "inline" | "page";
  /**
   * Hành động thật, chỉ dùng cho variant `page` (link tới route đã tồn tại hoặc nút retry).
   * Danh sách rỗng KHÔNG có action: không dựng CTA giả trong khoảng lặng biên tập (D55).
   */
  action?: ReactNode;
};

export default function StatusMessage({
  title,
  description,
  variant = "inline",
  action,
}: Props) {
  if (variant === "page") {
    // Fragment: section của trang đã là wrapper — không thêm div thừa.
    return (
      <>
        <h1>{title}</h1>
        {description && <p className="status-page-lead">{description}</p>}
        {action && <p className="status-page-actions">{action}</p>}
      </>
    );
  }

  return (
    <div className="empty-state">
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-description">{description}</p>}
    </div>
  );
}
