// Hằng số site dùng cho metadata/SEO. Không secret, không giá trị bịa.
// Domain lấy từ DEPLOYMENT.md (caodacchien.io.vn — đã sở hữu, D5).

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://caodacchien.io.vn";

export const SITE_NAME = "Cao Đắc Chiến";

// Email liên hệ công khai (CONTENT_INVENTORY §9 = READY).
export const CONTACT_EMAIL = "forwork.chiencd@gmail.com";
