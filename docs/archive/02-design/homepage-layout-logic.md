# Homepage Layout Logic (0.4F)

**Trạng thái:** Planning artifact — khóa layout logic trước Semantic HTML. Không UI/HTML/React/CSS/Tailwind/Figma/grid-implementation/color/pixel.
**Nguồn khóa:** Design Bible v1.0 · `homepage-wireframe-spec.md` · `homepage-wireframe-artifact.md` · IA (D25/D27).
**Mục tiêu:** đủ rõ để Semantic HTML **không còn phải quyết định layout nào**.

> Checkpoint này **khóa** một quyết định còn mở từ 0.4D/0.4E: khối tối duy nhất của trang = **S3 (Case)**; **S5 (Work)** dùng surface Grey supporting. (Xem §7.)

---

## SECTION 1 — Layout Philosophy

**Loại layout: Editorial-first Publishing (không magazine, không dashboard, không product-storytelling).**

Chốt theo D22/D29/D36 ("Strategic Editorial with Product-Level Precision"). Homepage là **publishing platform**, không phải portfolio/SaaS. Vì vậy layout phục vụ **đọc và bằng chứng trước, thị giác sau**:

- **Không magazine** — magazine ưu tiên ảnh/grid trang trí; ở đây text-first (P3), ảnh là bằng chứng (Bible 08).
- **Không documentation** — documentation phẳng/đều mật độ; ở đây nhịp biến thiên có chủ đích (Editorial Rhythm).
- **Không product-storytelling / SaaS** — sẽ rơi vào Hero→Features→Testimonials (AP-2); ở đây flow là nghĩ→bằng chứng→bản đồ→mời.
- **Editorial + publishing** — cấu trúc như tòa soạn: một statement mở, chuỗi bằng chứng, bản đồ chủ đề, lời mời; product-level precision ở chi tiết/trạng thái, không ở trang trí.

Lý do (không bàn đẹp/xấu): nhóm khán giả 1 (CEO/Founder) đọc để **đánh giá cách nghĩ** trước khi nhìn việc đã làm (D21/§6b); bản thân trang là bằng chứng năng lực (P1/§6). Layout editorial phục vụ đúng hành vi đó.

## SECTION 2 — Layout Decision Matrix

| § | Purpose | Visual w. | Content w. | Evidence w. | Reading w. | **Layout decision** |
|---|---|---|---|---|---|---|
| S0 Header | danh tính + nav | thấp | thấp | — | thấp | Full-width mảnh, split trái(tên)/phải(nav), sticky nhẹ |
| S1 Hero | định vị statement | cao | trung | thấp | cao | **Asymmetric split**: statement (trội) trái, evidence-slot nhỏ lệch phải; stacked trên mobile |
| S2 Writing | cách nghĩ | trung | trung | trung | cao | **Centered/left editorial single-column**, text-first, không card grid |
| S3 Case | bằng chứng | **cao nhất** | cao | **cao nhất** | cao | **Evidence-heavy asymmetric ~60/40**: artifact trội, narrative phụ; **visual peak duy nhất** |
| S4 Pillar | bản đồ tư duy | trung | trung | thấp | trung | **Full-width horizontal list** (5 trụ), thoáng; điểm nghỉ |
| S5 Work | lời mời | trung | trung | thấp | trung | **Split hai vùng thưa** (phù-hợp / chưa-phù-hợp); surface Grey supporting |
| S6 CTA | hành động | thấp | thấp | — | thấp | **Centered, cô lập** một CTA; action peak |
| S7 Footer | điều hướng phụ | thấp | thấp | — | thấp | Full-width, split 2 cột (nav / social) |

## SECTION 3 — Column Logic

- **Full-width** (S0, S4, S7): điều hướng/bản đồ/footer là hạ tầng — trải ngang, không cột đọc.
- **Centered single-column** (S2, S6): đọc dài (Writing) và hành động (CTA) cần trục trung tâm, ít nhiễu, measure kiểm soát (68ch — giá trị ở Component Inventory).
- **Asymmetric split** (S1, S3): tạo trọng lượng và tension bằng bất đối xứng (Human Composition); Hero để statement trội, Case để evidence trội — **không** 50/50 (chống AP-10).
- **Split cân bằng hơn** (S5): hai nhóm phù-hợp/không-phù-hợp cần đối sánh song song (contrast of information).
- **Stacked** (mọi section trên mobile): 1 cột, art-direct lại thứ tự (P12) — xem §10.

Không bàn grid columns cụ thể; chỉ khóa *kiểu quan hệ cột*.

## SECTION 4 — Hierarchy Logic

Thứ tự **Header → Hero → Writing → Case → Pillar → Work → CTA → Footer** là **immutable (D25/D27)**. Vì sao không đổi, và hỏng gì nếu đổi:

- **Hero phải mở** — nếu không, người đọc không có định vị để diễn giải mọi thứ sau (mất 5s test).
- **Writing trước Case** — chứng minh *cách nghĩ* trước *kết quả*; đảo lại → thành khoe kết quả kiểu agency, phản P1/§6b.
- **Case trước Pillar** — một bằng chứng cụ thể tạo tin cậy trước khi mở ra chiều rộng; đảo → bản đồ trừu tượng không có neo.
- **Evidence (Writing+Case) trước Work/CTA** — P2 Reading before Selling; nếu CTA/Work lên trước → thành consulting landing page, vi phạm D18.
- **CTA sau Work** — lời mời chỉ đến sau khi nêu rõ phù-hợp/không; đảo → ép chuyển đổi.
- **Footer cuối** — hạ tầng, không cạnh tranh nội dung.

Đổi bất kỳ mắt xích nào → **đứt narrative arc** (nghĩ→kết quả→bản đồ→mời→hành động) và/hoặc **vi phạm decision khóa** (D25/D21/P2/D18).

## SECTION 5 — Visual Weight Logic

| § | Visual | Narrative | Evidence | Attention |
|---|---|---|---|---|
| S0 | 2 | 2 | 0 | 2 |
| S1 | 8 | 8 | 2 | 9 (★ memorable) |
| S2 | 5 | 6 | 6 | 5 |
| S3 | 9 (★ peak) | 8 | 9 (★ peak) | 8 |
| S4 | 5 | 5 | 3 | 5 (◦ rest) |
| S5 | 6 | 6 | 3 | 6 |
| S6 | 4 | 4 | 0 | 8 (★ action) |
| S7 | 2 | 2 | 0 | 2 |

**Audit:**
- **Hai peak liên tiếp?** Không — Visual peak (S3=9) cách S1(8) bởi S2(5); cách S6-attention(8) bởi S4(5)+S5(6).
- **Vùng nghỉ?** Có — S4 (attention 5, visual 5) là điểm nghỉ nhận thức giữa S3 và S6; S0/S7 nhẹ.
- **Overload?** Không — chỉ S3 chạm 9; không section nào gánh nhiều loại weight cùng cực đại ngoài S3 (đúng vai trò evidence peak).

## SECTION 6 — Alignment Logic

- **Left** (S1 statement, S2, S3 narrative): editorial reading tự nhiên; dấu tiếng Việt và measure ổn định khi căn trái; tạo asymmetry.
- **Centered** (S6 CTA): cô lập hành động, một tiêu điểm, không nhiễu.
- **Asymmetric** (S1, S3): đặt trọng lượng lệch để dẫn mắt tới anchor (statement / artifact).
- **Balanced** (S5 hai nhóm, S0/S7 hai cột): khi cần đối sánh song song hoặc phân bố hạ tầng đều.

Không căn giữa đoạn dài (chống AP: "mọi nội dung đặt giữa"). Không nói CSS/flex — chỉ khóa *ý định căn*.

## SECTION 7 — Surface Logic (narrative, không bàn màu)

Chuỗi surface theo mạch kể (D46 section-based; giá trị màu ở Component Inventory §B.8):

```
S0 White → S1 White → S2 White → S3 BLACK → S4 White → S5 GREY → S6 White → S7 White
```

- **White (S0–S2, S4, S6–S7):** nền đọc mặc định, điềm tĩnh, sáng.
- **Black (S3, duy nhất):** đánh dấu **điểm nặng bằng chứng** — sự chuyển tối tạo tension đúng nơi cần níu; **chỉ một khối tối/trang** để giữ tỷ lệ Black ~18–25%.
- **Grey (S5):** supporting/transition cho lời mời — tách "Làm việc cùng tôi" khỏi vùng đọc mà không dùng thêm khối tối; **không** cho long-form (D46).
- **Orange:** không phải surface — chỉ 1 CTA (S6) + 1 marker (S1) theo budget D47; **không** section cam.

**Khóa quyết định:** khối tối = S3; S5 = Grey. Điều này đóng lựa chọn "S3 hoặc S5" còn mở ở 0.4D. Màu không luân phiên máy móc — đi theo narrative (D47).

## SECTION 8 — Whitespace Logic

Khoảng trắng là công cụ, không phải đệm (không nói padding):

- **Pause:** whitespace cao ở S1 (sau statement) và S4 (điểm nghỉ) — cho não thở giữa hai vùng căng.
- **Transition:** khoảng trắng giữa các section đánh dấu chuyển mạch; lớn hơn ở ranh giới đổi mục đích (Major rhythm), nhỏ hơn trong khối (Compact).
- **Emphasis:** whitespace lớn quanh Hero statement và CTA để cô lập tiêu điểm (visual silence cạnh weight).
- **Evidence:** S3 whitespace **thấp** có chủ đích — mật độ cao báo hiệu "đây là bằng chứng, đọc kỹ".
- **Rhythm:** whitespace biến thiên theo section (chống equal-spacing AP-6); không đều toàn trang.

## SECTION 9 — Layout Anti-pattern Check

- **Dashboard feeling?** Không — không lưới ô số; metric kể trong ngữ cảnh (S3), không tile.
- **SaaS feeling?** Không — flow editorial (nghĩ→bằng chứng→mời), không Hero→Features→Testimonials (AP-2).
- **Landing page feeling?** Không — không bảng giá/đặt-lịch/pop-up (D18/C1–C4); CTA sau bằng chứng.
- **Fake feature grid?** Không — không grid tính năng; Writing là 1 bài featured, không lưới card.
- **Fake KPI tiles?** Không — metric evidence-gated, không tile (AP-5).
- **Centered CTA obsession?** Không — chỉ 1 CTA centered (S6), có chủ đích; không rải CTA (AP-8).
- **Repeated layouts?** Không — mỗi section một kiểu quan hệ cột (split/single/full-width/asymmetric).
- **Identical rhythm?** Không — nhịp biến thiên, không lặp >2 lần (AP-7).
- **Equal spacing syndrome?** Không — whitespace theo semantic rhythm (§8, AP-6).
- **Component explosion?** Không — 18 component, dùng subset; Hero/CTA composition (AP-4).
- **No silence?** Không — visual silence chủ đích ở S1/S4/S6.

## SECTION 10 — Breakpoint Logic (narrative, không media query)

- **Desktop — đọc gì trước:** Hero statement + evidence-slot trong một khung nhìn; Case artifact và narrative cạnh nhau (asymmetric 60/40); 5 trụ trải ngang.
- **Tablet — bỏ gì trước:** giảm/dời evidence-slot phụ của Hero xuống dưới; Case chuyển từ cạnh-nhau sang gần-dọc; nav có thể rút gọn; 5 trụ có thể wrap.
- **Mobile — giữ tuyệt đối:** (1) Hero **statement** với line-break riêng cho mobile; (2) **một** CTA chính (full-width); (3) **thứ tự narrative** S0→S7 không đổi; (4) Case vẫn là điểm nặng nhưng artifact xếp **trên** copy (stacked), không cạnh nhau; (5) 5 trụ xếp dọc. Bỏ rail/evidence phụ trước khi bỏ nội dung chính. **Không thu nhỏ desktop** (P12).

## SECTION 11 — Layout Consistency Audit

- ✓ **Human Composition** — content-first; asymmetry (S1, S3); một điểm nặng (S3); silence cạnh weight.
- ✓ **Editorial Intelligence** — một memorable moment (S1); một anchor/section; editorial brief phản ánh trong layout decision.
- ✓ **Reading Momentum** — column/alignment/surface dẫn mắt xuống liên tục; ba đỉnh không liền kề.
- ✓ **Progressive Disclosure** — Hero (5s) → Writing/Case (30s–2ph) → đủ tin (5ph).
- ✓ **Visual Rhythm** — surface White→Black→White→Grey theo narrative; nhịp biến thiên.
- ✓ **Attention Flow** — mỗi section 1 primary + 1 secondary; noise đã loại (§9).
- ✓ **Layout Philosophy** — mọi quyết định phục vụ editorial-publishing, không SaaS/magazine.
- ✓ **Evidence Placement** — evidence weight cao nhất hội tụ S3; slot có nhãn Owner Asset.

## SECTION 12 — Design Bible Compliance

- ✓ **Typography** — layout chừa chỗ cho role hierarchy (statement/title/metric/meta); không đặc tả cỡ/màu; Sans-only (D48).
- ✓ **Motion** — layout không phụ thuộc animation; intent ≤200ms, no scroll-reveal (P9).
- ✓ **Surface** — section-based, một khối tối (S3), Grey supporting (S5) — D46.
- ✓ **Component** — 18 component; 0 mới; Hero/CTA composition.
- ✓ **Evidence** — slot Owner Asset ở S1/S2/S3/S5; không giả (D7/D6).
- ✓ **Anti-pattern** — §9 pass toàn bộ.
- ✓ **Human Composition** / ✓ **Editorial Intelligence** — như §11.

## SECTION 13 — Semantic HTML Readiness

Sau checkpoint này, **layout logic đã khóa hoàn toàn** — Semantic HTML không cần quyết định layout. Còn thiếu (blocker) trước khi có homepage thật:

**Không phải blocker cho Semantic HTML structure (có thể dựng landmark/heading order/reading order ngay từ artifact + logic này):**
- Landmark map (`header`/`main`/`section`/`article`/`nav`/`footer`) suy ra trực tiếp từ S0–S7.
- Heading order (h1 Hero → h2 mỗi section) suy ra từ hierarchy.

**Blocker nội dung/asset (chặn homepage *hoàn chỉnh*, không chặn structure trống có nhãn):**
1. `OWNER ASSET REQUIRED` — positioning statement thật, ảnh chân dung (S1); 3–5 bài thật + `featured` (S2); case thật + metrics được phép + artifact (S3); `servicesOffered` thật (S5). Gate: CONTENT_INVENTORY `READY` (D7) trước Milestone 1.4.
2. Roboworld REVIEW-REQUIRED nếu case dùng dữ liệu Roboworld (D6/D13).

**Blocker quy trình:**
3. Semantic HTML thuộc bước triển khai — theo ROADMAP là Milestone 1.x (1.1 setup → 1.2 layout → 1.4 Home); token/Tailwind ở 1.1. Cần Owner xác nhận chuyển từ Phase 0 (docs) sang triển khai.

**Kết luận:** không còn quyết định *layout* nào để lấy; blocker còn lại là **nội dung thật** và **cổng chuyển sang Phase triển khai**.

## SECTION 14 — Conditional Section Join Logic (D54/D55)

Spine S0–S7 không đổi; khi khối phụ thuộc nội dung bị omit trên production, layout nối lại giữ nhịp:

- **S5 ẩn (D54):** S6 nối trực tiếp sau S4 (Pillar nghỉ → CTA action, hợp lý); không giữ khoảng trắng dư của khối vắng.
- **S3 ẩn (D55):** S2 → S4; nhịp "peak(Hero) → … → nghỉ(Pillar)" vẫn an toàn.
- **S2 ẩn (D55) mà S3 hiển thị:** Hero(peak 8) và Case(peak 9) sẽ **liền kề** — vi phạm "không hai peak liên tiếp". Xử lý: chèn **cognitive rest** ngắn (khoảng thở/divider có nghĩa, **không** section mới) giữa Hero và Case.
- **Cả S2+S3 ẩn:** S1 → S4 → S6; arc rút gọn "định vị → bản đồ → hành động" vẫn liền mạch.
- **Nguyên tắc:** không khoảng trắng dư; không hai peak liền kề; không thay khối thiếu bằng testimonial/logo wall/fake metric/feature grid; whitespace co theo section rhythm ngữ nghĩa.

---

**Kế tiếp (Semantic HTML) — allowed:** dựng semantic structure/landmark/heading/reading-order từ layout logic + artifact.
**Forbidden:** đổi narrative/thứ tự/layout decision đã khóa ở đây; thêm component (ngoài 18); thêm CTA; số/case/ảnh giả; sửa Design Bible.
