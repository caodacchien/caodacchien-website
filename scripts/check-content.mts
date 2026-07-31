// `pnpm content:check` — validate toàn bộ file bài viết mà KHÔNG cần dựng site.
//
// Script này cố ý KHÔNG chứa quy tắc validate nào của riêng nó: nó gọi đúng
// `validateAllContent()` mà `next build` dùng. Một nguồn quy tắc, không có bản sao
// lệch nhau giữa lệnh kiểm và lúc build.

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
