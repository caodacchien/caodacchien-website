import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

// Footer dùng chung cho toàn site (Home · About · Writing). Server component.
// Giữ nguyên hợp đồng S7: wordmark + email thật + copyright. Không số điện thoại,
// không social link (chưa có URL đã duyệt), không footer nav phụ / RSS / Privacy
// vì route chưa tồn tại (link honesty).
//
// `className` chỉ dùng cho modifier nhịp trang dài (`site-footer-long`), không cho
// biến thể footer mới.

export default function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={`site-footer container-content${className ? ` ${className}` : ""}`}>
      <p className="wordmark">{SITE_NAME}</p>

      {/* address chỉ bao thông tin liên hệ của chủ website (CONTENT §9 READY). */}
      <address className="footer-contact">
        Liên hệ: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </address>

      <p className="copyright">© {new Date().getFullYear()} {SITE_NAME}</p>
    </footer>
  );
}
