import { PILLARS } from "@/lib/writing";

// Danh mục = đúng 5 trụ đóng (D16), slug D51. Không thêm danh mục ngoài 5 trụ.
// Dùng lại class `.pillars` của Pillar Map (S4) — cùng một treatment index biên tập,
// không tạo phương ngữ thị giác thứ hai.
//
// Link honesty: route /topics/[pillar]/ CHƯA được dựng (404) → row non-interactive
// (cùng cách xử lý Pillar Map trên Home). href vẫn ở data (lib/writing.ts) để bật <Link>
// khi route thật tồn tại. Không anchor giả, không hover/focus giả, không nhãn "sắp ra mắt".

export default function PillarStrip() {
  return (
    <ul className="pillars">
      {PILLARS.map((pillar) => (
        <li key={pillar.href}>
          <h3>{pillar.title}</h3>
          <p>{pillar.scope}</p>
        </li>
      ))}
    </ul>
  );
}
