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
  try {
    const payload = await payloadClient();
    const { user } = await payload.auth({ headers: await nextHeaders() });
    return Boolean(user);
  } catch {
    return false;
  }
}
