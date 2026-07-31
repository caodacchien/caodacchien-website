// `pnpm content:check` — validate toàn bộ file bài viết mà KHÔNG cần dựng site.
//
// Script này cố ý KHÔNG chứa quy tắc validate nào của riêng nó: nó gọi đúng
// `validateAllContent()` mà `next build` dùng. Một nguồn quy tắc, không có bản sao
// lệch nhau giữa lệnh kiểm và lúc build.
//
// Đuôi `.mts` = ESM tường minh, nên KHÔNG cần `"type": "module"` cho cả repository.
// npm script chạy kèm `--no-warnings=MODULE_TYPELESS_PACKAGE_JSON`: Node cảnh báo khi
// phải reparse các file `.ts` trong `src/lib` thành ESM. Cảnh báo đó vô hại (chỉ là
// chi phí parse) nhưng lại khuyên thêm `"type": "module"` — đúng thứ đã bị loại bỏ
// có chủ đích. Tắt đúng MỘT cảnh báo đã hiểu rõ, trong đúng MỘT lệnh, thay vì đổi
// ngữ nghĩa module của toàn repository.

import { validateAllContent, ContentError } from "../src/lib/mdx.ts";

function main(): void {
  try {
    const { fileCount } = validateAllContent();
    if (fileCount === 0) {
      console.log("✓ content:check — đã kiểm 0 file bài viết (chưa có bài nào). Hợp lệ.");
    } else {
      console.log(`✓ content:check — đã kiểm ${fileCount} file bài viết. Tất cả hợp lệ.`);
    }
  } catch (error) {
    if (error instanceof ContentError) {
      console.error("✗ content:check — nội dung không hợp lệ:\n");
      for (const issue of error.issues) {
        console.error(`  ${issue.file}`);
        for (const problem of issue.problems) {
          console.error(`    - ${problem}`);
        }
        console.error("");
      }
      console.error(
        `Tổng: ${error.issues.length} file có lỗi. Xem content/writing/README.md để biết cách sửa.`,
      );
      process.exit(1);
    }
    throw error;
  }
}

main();
