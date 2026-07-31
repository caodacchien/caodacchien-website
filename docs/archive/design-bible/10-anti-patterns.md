# 10 — Anti-patterns

> Catalog rào chắn nhận diện và chặn "AI-generated feel". **Một file duy nhất** (Owner Decision 4) — mở rộng, không tách.
>
> Mỗi anti-pattern có năm trường: **why** (vì sao xảy ra) · **why artificial** (vì sao thấy giả) · **detection** (heuristic phát hiện) · **prevention** (nguyên tắc chặn) · **severity**.

**Severity:** `Critical` phá định vị hoặc vi phạm Decision đã khóa · `High` làm trang lộ rõ AI/agency · `Medium` làm yếu tính biên tập · `Low` lỗi tinh chỉnh.

Chạy toàn bộ **detection** ở đây như self-audit trước review (`editorial-intelligence.md`, Mandatory Rule 3).

---

## AP-1 · Component-first composition — `Critical`
- **Why:** dựng từ thư viện component rồi nhồi nội dung vào.
- **Why artificial:** nội dung uốn theo component → mất tính biên tập; đây là gốc rễ của phần lớn AP dưới.
- **Detection:** section sinh ra trước khi có nội dung/bằng chứng thật cho nó.
- **Prevention:** content-first (`07-components.md`); editorial brief trước composition (`editorial-intelligence.md`).

## AP-2 · SaaS template (Hero → Features → Testimonials) / generic startup layout — `Critical`
- **Why:** đây là phân phối phổ biến nhất trong training data.
- **Why artificial:** IA của SaaS, không phải publishing platform; chuyển nguyên sang site khác chỉ cần đổi tên.
- **Detection:** trình tự section khớp khuôn SaaS; Replace-name test thất bại.
- **Prevention:** dùng nhịp homepage biên tập (`04-layout-composition.md`) + 5 vai trò nội dung; cấm mượn SaaS IA (D36).

## AP-3 · Fake metrics / fake dashboard — `Critical`
- **Why:** điền số "đẹp" để trang trông thuyết phục.
- **Why artificial:** vi phạm D7/P1; người đọc nhóm 1 nhận ra ngay số vô căn cứ.
- **Detection:** grep số phần trăm/tiền không kèm nguồn/nhãn; xuất hiện ô số kiểu analytics.
- **Prevention:** Evidence gate (`08-imagery-evidence.md`); số chưa xác minh → narrative, không con số; `OWNER ASSET REQUIRED`.

## AP-4 · Card explosion / feature-grid / identical card sizes — `High`
- **Why:** card-hóa là cách nhanh nhất để "lấp" nội dung không đồng nhất.
- **Why artificial:** biến nội dung biên tập thành catalog; mọi thứ cùng cỡ = không có hierarchy.
- **Detection:** >50% nội dung nằm trong card, hoặc ≥3 card cùng kích thước.
- **Prevention:** card phải justify sự tồn tại; ưu tiên index-list / divider / typography; cấm ContentCard chung cho mọi loại.

## AP-5 · Dashboard syndrome / KPI tiles — `High`
- **Why:** "system/data" bị dịch nhầm thành ô số liệu.
- **Why artificial:** gợi SaaS/analytics, phản định vị editorial operator; thường kéo theo AP-3.
- **Detection:** lưới ô số + nhãn ngắn; số không nguồn.
- **Prevention:** số chỉ khi có bằng chứng thật; metric kể trong ngữ cảnh, không thành tile (C7).

## AP-6 · Equal spacing everywhere — `High`
- **Why:** tối ưu "consistency" bằng một spacing token cho mọi section.
- **Why artificial:** biên tập thật đổi spacing theo ý nghĩa; đều tăm tắp = không ai quyết định gì.
- **Detection:** ≥4 section trùng padding dọc.
- **Prevention:** section-rhythm ngữ nghĩa Major/Standard/Compact; ≥3 mức xuất hiện trên một trang dài (`human-composition.md §2`).

## AP-7 · Repetitive section rhythm — `High`
- **Why:** lặp một khuôn "label → heading → 3 items" cho mọi section.
- **Why artificial:** nhịp lặp máy móc là chữ ký rõ nhất của AI layout.
- **Detection:** pattern-hash mỗi section; ≥3 hash giống nhau.
- **Prevention:** không lặp cùng nhịp quá 2 lần liên tiếp (Editorial Rhythm).

## AP-8 · Centered CTA obsession / giant centered CTA / floating CTA islands — `High`
- **Why:** center + to = "an toàn để nổi bật".
- **Why artificial:** phá đà đọc, mang cảm giác landing page bán hàng (D18/P2/P8).
- **Detection:** CTA căn giữa cô lập, hoặc CTA nổi/dính; >2 CTA/viewport.
- **Prevention:** CTA trong mạch narrative, tối đa 2/trang, không 2 khác loại/viewport; "Làm việc cùng tôi" luôn sau bằng chứng.

## AP-9 · Decoration replacing hierarchy — `High`
- **Why:** dùng gradient/glow/shadow/màu để "tạo nổi bật" thay vì scale/spacing/vị trí.
- **Why artificial:** hierarchy giả rơi ngay khi bỏ màu → thất bại Grayscale test.
- **Detection:** Grayscale test — bỏ màu mà mất hierarchy = trang trí đang gánh việc cấu trúc.
- **Prevention:** hierarchy bằng typography/scale/spacing/position trước; màu là lớp cuối; cấm glass/gradient/glow (C6).

## AP-10 · Perfectly symmetrical sections — `Medium`
- **Why:** grid 50/50 là mặc định an toàn của generator.
- **Why artificial:** editorial dùng structured asymmetry để tạo trọng lượng; đối xứng tuyệt đối = vô hướng.
- **Detection:** >1 section 50/50 hoặc center-balanced trên một trang.
- **Prevention:** mặc định asymmetry; đối xứng chỉ khi có lý do (statement offset).

## AP-11 · Repeated image ratios — `Medium`
- **Why:** dùng một aspect-ratio cho mọi ảnh cho "gọn".
- **Why artificial:** ảnh thật có tỷ lệ khác nhau theo vai trò (chân dung ≠ dashboard ≠ before/after).
- **Detection:** mọi vùng ảnh cùng ratio.
- **Prevention:** ratio do loại bằng chứng quyết định (`human-composition.md §1`).

## AP-12 · Predictable storytelling / visual over-explanation / icon-in-every-card — `Medium`
- **Why:** giải thích mọi thứ bằng icon + nhãn + mô tả cho "rõ".
- **Why artificial:** thiếu tiết chế biên tập; nói thừa.
- **Detection:** mỗi mục có icon minh hoạ; >12 icon/site (C9).
- **Prevention:** icon cho chức năng không trang trí; để người đọc suy luận; trần <12 icon.

## AP-13 · Giant ghost / outlined text as decoration — `Medium`
- **Why:** chữ khổng lồ mờ để "tạo năng lượng".
- **Why artificial:** cử chỉ trang trí rỗng, gợi template creative agency.
- **Detection:** outlined/ghost word cỡ lớn không mang nội dung.
- **Prevention:** năng lượng đến từ nội dung + một signature moment có nghĩa (`editorial-intelligence.md`).

## AP-14 · Stock businessman / architecture-gears-robot imagery — `Medium`
- **Why:** lấp "system/growth" bằng ảnh stock gợi ý.
- **Why artificial:** tín hiệu ngược với nhóm khán giả 1; không phải bằng chứng (C8).
- **Detection:** ảnh stock doanh nhân/kỹ thuật thay cho asset thật.
- **Prevention:** chỉ ảnh thật/bằng chứng thật; thiếu thì placeholder có nhãn (`08-imagery-evidence.md`).

## AP-15 · Dark/light toggle for show — `Medium`
- **Why:** thêm toggle như một màn trình diễn năng lực.
- **Why artificial:** toggle không phục vụ nội dung; hướng hiện tại là **section-based composition, không global toggle**.
- **Detection:** nút chuyển theme không gắn nhu cầu đọc thật.
- **Prevention:** section-based contrast (`03`, `06`); không global light/dark toggle ở MVP.

## AP-16 · Capsule for every button — `Low`
- **Why:** pill radius cho mọi control cho "thân thiện".
- **Why artificial:** đồng hoá mọi control, mất phân tầng radius.
- **Detection:** mọi button dùng pill/999px.
- **Prevention:** pill chỉ cho tag/chip/control có ngữ nghĩa; radius theo archetype (`07-components.md`).

---

## Replace-name test

Thay "Cao Đắc Chiến" bằng tên bất kỳ. Nếu trang vẫn hoàn toàn hợp lý mà không cần đổi cấu trúc hoặc nội dung, thiết kế đang quá chung — thất bại. Mỗi trang phải có **authorial fingerprint** (`human-composition.md §5`).
