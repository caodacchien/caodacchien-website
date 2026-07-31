import { getPayload } from "payload";
import config from "@payload-config";
import { headers as nextHeaders } from "next/headers";

export async function payloadClient() {
  return getPayload({ config });
}

/**
 * Kiểm tra người đang xem trang có phải chủ website đã đăng nhập trang quản trị không.
 *
 * Dùng cho nút "Xem trước": chủ website xem được cả bài chưa đăng, người ngoài thì không.
 * Cách này an toàn hơn kiểu gắn `?draft=true` vào URL — ai đoán ra tham số đó cũng đọc
 * được bản nháp. Ở đây phải có phiên đăng nhập thật của Payload trong trình duyệt.
 */
export async function isAuthenticated(): Promise<boolean> {
  // headers() phải nằm NGOÀI try/catch.
  // Next.js báo hiệu "trang này phải render động" bằng cách ném một lỗi đặc biệt từ
  // headers(). Bọc nó trong catch là nuốt mất tín hiệu đó — Next tưởng trang tĩnh
  // được, đem đi dựng sẵn lúc build, rồi vỡ vì lúc đó không có kết nối cơ sở dữ liệu.
  // Lỗi này KHÔNG hiện ở chế độ dev, chỉ nổ lúc build production.
  const headers = await nextHeaders();

  try {
    const payload = await payloadClient();
    const { user } = await payload.auth({ headers });
    return Boolean(user);
  } catch {
    // Chỉ nuốt lỗi xác thực thật (cookie hỏng, phiên hết hạn) — không nuốt lỗi của Next.
    return false;
  }
}
