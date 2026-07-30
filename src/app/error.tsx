"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StatusMessage from "@/components/StatusMessage";
import { CONTACT_EMAIL } from "@/lib/site";

// 500 — trang lỗi runtime theo IA §1 (`/500`), hoàn tất phạm vi Milestone 1.2.
//
// BẮT BUỘC là Client Component: Next App Router yêu cầu `error.tsx` là error boundary
// có `reset()`. Đây là ràng buộc framework, KHÔNG phải lựa chọn kiến trúc — mọi trang
// khác trong site vẫn là Server Component.
//
// Bảo mật: KHÔNG render `error.message`/`error.digest` ra public. Thông báo lỗi kỹ thuật
// có thể lộ đường dẫn nội bộ, tên biến, chi tiết hạ tầng. Người dùng chỉ cần biết lỗi
// thuộc phía hệ thống và có hai cách đi tiếp thật.
//
// Error tracking (log/report tới dịch vụ ngoài) thuộc Milestone 1.8 — chưa dựng ở đây,
// nên component cũng không giả vờ đã báo lỗi đi đâu.
//
// Không nhận prop `error`: không dùng thì không nhận, tránh biến chết.

export default function GlobalRouteError({ reset }: { reset: () => void }) {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <section className="status-page container-content">
          <p className="eyebrow">Lỗi hệ thống</p>
          <StatusMessage
            variant="page"
            title="Đã xảy ra lỗi khi tải trang này."
            description="Đây là lỗi phía hệ thống, không phải do bạn. Bạn có thể thử tải lại trang; nếu vẫn lỗi, hãy cho tôi biết qua email."
            action={
              <>
                <button type="button" onClick={reset} className="status-page-retry">
                  Thử lại
                </button>
                <Link href="/">Về trang chủ</Link>
                <a href={`mailto:${CONTACT_EMAIL}`}>Báo lỗi qua email</a>
              </>
            }
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
