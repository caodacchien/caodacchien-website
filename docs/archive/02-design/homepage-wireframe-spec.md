# Homepage — Low-fidelity Wireframe Specification (0.4D)

**Trạng thái:** Planning artifact (structure only). Không UI/pixel/color/typography-cụ-thể/animation/spacing-cụ-thể.
**Nguồn khóa:** Design Bible v1.0 · IA (D25/D27) · Editorial Blueprint (0.4B) · Viewport Storyboard (0.4C).
**Governance:** tuân hierarchy D50; component chỉ trong 18 đã khóa; không override.

Tài liệu này mô tả **bố cục · hierarchy · reading order · attention flow · viewport composition · evidence placement** cho từng section. Không vẽ hình, không ASCII, không wireframe box — chỉ mô tả.

---

## S0 — Header

- **Purpose:** danh tính + điều hướng (5 mục, chịu 8 — D26/D18).
- **Reader question:** "Đây là ai, đi đâu được?"
- **Primary focus:** wordmark tên. · **Secondary focus:** nav.
- **Viewport occupancy:** dải mảnh trên cùng, chiếm phần rất nhỏ khung nhìn; sticky nhẹ suốt trang.
- **Content hierarchy:** tên (trái) → nav (phải) → không có phần tử thứ ba.
- **Image/Text relationship:** toàn text, không ảnh.
- **Reading order:** tên → nav → mắt rơi xuống Hero.
- **Evidence slot:** không.
- **CTA position:** không CTA ở header (CTA "Làm việc cùng tôi" là khối, không lên nav — D18).
- **Whitespace intent:** thoáng hai bên; header không giữ mắt.
- **Attention anchor:** wordmark.
- **Expected exit transition:** header nhường sân khấu — mắt rơi vào Hero statement.

## S1 — Hero *(memorable editorial moment của trang)*

- **Purpose:** phát biểu định vị dạng vấn đề (D25.1).
- **Reader question:** "Người này nghĩ khác chỗ nào?"
- **Primary focus:** dòng statement định vị. · **Secondary focus:** CTA "Làm việc cùng tôi".
- **Viewport occupancy:** chiếm phần lớn khung nhìn đầu; statement là khối chi phối, vùng evidence phụ nằm lệch, nhỏ hơn.
- **Content hierarchy:** eyebrow (vai trò) → statement → intro (ai/giá trị) → CTA chính + link phụ.
- **Image/Text relationship:** text chủ đạo; vùng ảnh phụ (chân dung/artifact) là bổ trợ, không cạnh tranh statement — bất đối xứng, ảnh nhỏ hơn text.
- **Reading order:** eyebrow → statement → intro → CTA → (liếc vùng ảnh).
- **Evidence slot:** vùng ảnh chân dung/working photo (T3/T5 — `OWNER ASSET REQUIRED`); statement dựa định vị thật (không số).
- **CTA position:** một CTA nhẹ trong Hero (secondary của trang), cho người đã sẵn sàng; CTA chính đặt ở S6.
- **Whitespace intent:** rất cao — khoảng trắng làm nổi statement (visual silence là công cụ nhấn).
- **Attention anchor:** statement.
- **Expected exit transition:** *"Bạn vừa nghe cách tôi nghĩ — đây là cách tôi nghĩ, viết ra."* → mở vào Writing.

## S2 — Featured Writing

- **Purpose:** bài viết `featured:true` — chứng minh tư duy trước kết quả (D25.2).
- **Reader question:** "Có gì đủ sâu để đọc?"
- **Primary focus:** tiêu đề bài. · **Secondary focus:** trụ + reading time.
- **Viewport occupancy:** khối gọn, mật độ trung; không chiếm trọn khung nhìn.
- **Content hierarchy:** section label → tiêu đề bài → excerpt → metadata (trụ, reading time).
- **Image/Text relationship:** text-first (P3); ảnh bìa tùy chọn, không bắt buộc (C11).
- **Reading order:** label → tiêu đề → excerpt → meta.
- **Evidence slot:** bài viết thật (T1 — `OWNER ASSET REQUIRED`); thiếu → empty-state narrative (StatusMessage/P3).
- **CTA position:** không CTA hành động; chỉ liên kết đọc bài (điều hướng, không tính CTA chuyển đổi).
- **Whitespace intent:** trung; tách rõ khỏi Hero phía trên.
- **Attention anchor:** tiêu đề bài.
- **Expected exit transition:** *"Cách nghĩ này đã tạo ra kết quả — đây là một lần."* → mở vào Case.

## S3 — Featured Case Study *(evidence peak — điểm nặng thị giác của trang)*

- **Purpose:** case `featured:true` có số liệu (D25.3).
- **Reader question:** "Cách nghĩ đó tạo kết quả gì, đo bằng gì?"
- **Primary focus:** artifact/metric thật. · **Secondary focus:** project title.
- **Viewport occupancy:** khối lớn nhất trang; evidence chiếm phần trội hơn copy (bất đối xứng ~60/40).
- **Content hierarchy:** section label → project title → tóm tắt câu chuyện (Bối cảnh/Vấn đề/Cách tiếp cận/Kết quả) → vai trò/hình thức → metric group.
- **Image/Text relationship:** evidence-heavy; artifact lớn hơn copy, đặt lệch khác kiểu khung của Hero.
- **Reading order:** artifact → project title → câu chuyện/kết quả → vai trò → metric.
- **Evidence slot:** case thật + artifact (T2/T3) + metrics (T4) — tất cả `OWNER ASSET REQUIRED`; Roboworld REVIEW-REQUIRED (D6/D13); **cấm số/artifact giả** (D7).
- **CTA position:** liên kết "đọc case đầy đủ" (điều hướng, không phải CTA chuyển đổi).
- **Whitespace intent:** thấp (mật độ cao có chủ đích); đây là vùng căng.
- **Attention anchor:** artifact/metric.
- **Expected exit transition:** *"Một dự án chỉ là một điểm — đây là toàn bộ bản đồ tư duy."* → mở vào Pillar.

## S4 — Pillar Map

- **Purpose:** bản đồ 5 trụ → `/topics/[pillar]` (D25.4/D16/D31).
- **Reader question:** "Người này mạnh nhất vùng nào?"
- **Primary focus:** trụ "AI cho Marketing". · **Secondary focus:** bộ 5 trụ như một tổng thể.
- **Viewport occupancy:** dải ngang thoáng; mật độ thấp–trung; điểm nghỉ nhận thức của trang.
- **Content hierarchy:** section label → 5 nhãn trụ (ngang) → mô tả ngắn mỗi trụ.
- **Image/Text relationship:** toàn text; không ảnh.
- **Reading order:** quét ngang 5 trụ, dừng ở "AI cho Marketing".
- **Evidence slot:** taxonomy thật (không cần asset); số bài/trụ hiển thị khi có nội dung.
- **CTA position:** không CTA hành động; mỗi trụ là link điều hướng (text, không pill nếu chưa phải filter thật).
- **Whitespace intent:** cao — thả sau vùng căng Case.
- **Attention anchor:** trụ "AI cho Marketing".
- **Expected exit transition:** *"Nếu bạn cần hệ thống này cho đội mình — đây là cách bắt đầu."* → mở vào Work.

## S5 — Work With Me

- **Purpose:** khối thông tin hợp tác, đứng sau bằng chứng (D18/P2).
- **Reader question:** "Tôi hợp tác được không, và như thế nào?"
- **Primary focus:** headline hợp tác. · **Secondary focus:** "phù hợp khi".
- **Viewport occupancy:** khối trung; hai vùng thưa (phù-hợp / không-phù-hợp) không dày bullet.
- **Content hierarchy:** section label → headline → "phù hợp khi" → "chưa phù hợp khi" → hành động.
- **Image/Text relationship:** toàn text; không ảnh.
- **Reading order:** headline → phù-hợp → không-phù-hợp → CTA.
- **Evidence slot:** `servicesOffered` từ `profile.config.ts` (T5 — `OWNER ASSET REQUIRED`). Không bảng giá/đặt-lịch-chớp-nháy (D18/C3/C4).
- **CTA position:** dẫn tới CTA chính (S6); có thể chứa nút "Bắt đầu trao đổi" nếu wireframe gộp — nhưng vẫn tính là **một** CTA chính của trang.
- **Whitespace intent:** trung; tách rõ hai nhóm phù-hợp/không.
- **Attention anchor:** headline "hệ thống, không phải chiến dịch".
- **Expected exit transition:** *"Nếu thấy đúng — mở một cuộc trao đổi."* → mở vào CTA.

## S6 — Contact CTA

- **Purpose:** CTA chính = Liên hệ (D25.6→D27; trần 2 CTA/trang — D23/P8).
- **Reader question:** "Bước tiếp theo là gì?"
- **Primary focus:** nút "Bắt đầu trao đổi". · **Secondary focus:** 1 text link phụ.
- **Viewport occupancy:** khối gọn, thoáng; mật độ thấp.
- **Content hierarchy:** dòng dẫn ngắn → CTA chính → 1 link phụ.
- **Image/Text relationship:** toàn text.
- **Reading order:** dòng dẫn → nút → link phụ.
- **Evidence slot:** không.
- **CTA position:** đây là vị trí CTA chuyển đổi duy nhất của trang; là 1 điểm cam duy nhất (orange budget — D47).
- **Whitespace intent:** cao; cô lập hành động để dứt khoát.
- **Attention anchor:** nút "Bắt đầu trao đổi".
- **Expected exit transition:** *"Hết trang — phần còn lại là điều hướng."* → hạ nhịp về Footer.

## S7 — Footer

- **Purpose:** điều hướng phụ tiết chế (IA §9).
- **Reader question:** "Còn gì để đi tiếp?"
- **Primary focus:** wordmark. · **Secondary focus:** nav + Kinh nghiệm anchor (About).
- **Viewport occupancy:** dải cuối gọn; mật độ thấp.
- **Content hierarchy:** wordmark + một dòng định vị ngắn → nav (cột 1) + Social/RSS (cột 2) → dòng bản quyền.
- **Image/Text relationship:** toàn text.
- **Reading order:** wordmark → nav → social/RSS → bản quyền.
- **Evidence slot:** không.
- **CTA position:** không CTA; **không** nút theme (D46).
- **Whitespace intent:** trung; đóng kiểu ấn phẩm.
- **Attention anchor:** wordmark.
- **Expected exit transition:** kết trang — không transition ra ngoài.

---

## Conditional rendering (D54/D55 — spine governance không đổi)

Spine S0–S7 giữ nguyên; chỉ thêm **điều kiện render production**:

- **S2 Featured Writing** — `production_omit_when_empty`: render khi ≥3 bài thật hợp lệ + Owner xác nhận featured (D55). Chưa đủ → omit (không placeholder card).
- **S3 Featured Case Study** — `production_omit_when_empty`: render khi ≥1 case thật hợp lệ, metric được phép công khai (D55/D6). Chưa đủ → omit.
- **S5 Work With Me** — `conditional_hidden_until_content_ready`: ẩn khi `servicesOffered` chưa duyệt (D54).
- **Narrative reflow khi omit:** nếu S5 ẩn → **S6 nối trực tiếp sau S4**; nếu S2/S3 ẩn → các khối còn lại dồn liền. Không hai peak liền kề, không khoảng trống vô nghĩa (logic ở `homepage-layout-logic.md`). Không thay bằng testimonial/logo wall/fake metric/feature grid.

## Wireframe Summary

| Section | Primary Focus | Secondary Focus | Viewport Weight | Narrative Weight | Evidence Weight | Transition |
|---|---|---|---|---|---|---|
| S0 Header | Wordmark | Nav | Thấp | Thấp | — | mở khung → Hero |
| S1 Hero | Statement định vị | CTA | Cao | Cao | Thấp (định vị) | *cách nghĩ viết ra* → Writing |
| S2 Writing | Tiêu đề bài | Trụ + reading time | Trung | Trung | Trung (T1) | *đã tạo kết quả* → Case |
| S3 Case | Artifact/metric | Project title | **Cao nhất** | Cao | **Cao nhất (T2–T4)** | *một điểm → bản đồ* → Pillar |
| S4 Pillar | Trụ "AI cho Marketing" | Bộ 5 trụ | Trung | Trung | Thấp (taxonomy) | *cần cho đội bạn* → Work |
| S5 Work | Headline hợp tác | "Phù hợp khi" | Trung | Trung | Thấp (T5) | *mở trao đổi* → CTA |
| S6 CTA | Nút "Bắt đầu trao đổi" | Text link | Thấp | Thấp | — | *hết trang* → Footer |
| S7 Footer | Wordmark | Nav + Kinh nghiệm | Thấp | Thấp | — | kết |

## Homepage Reading Path

Reader enters → Header (danh tính) → **Hero statement** (dừng, định vị) → Featured Writing (cách nghĩ) → **Case Study** (dừng, đỉnh bằng chứng) → Pillar Map (điểm nghỉ, bản đồ tư duy) → Work With Me (lời mời) → **Contact CTA** (hành động) → Footer → Exit.

Ba điểm dừng chủ đích: Hero (statement), Case (evidence), CTA (action) — không liền kề nhau.

## Viewport Balance Audit

- **Section quá nặng?** Không. Case là đỉnh duy nhất tuyệt đối; các section khác giữ trung/thấp. Không section nào gánh nhiều tiêu điểm.
- **Hai peak liên tiếp?** Không. Hero (cao) và Case (cao nhất) cách nhau bởi Writing (trung); Case và CTA cách nhau bởi Pillar (nghỉ) + Work (trung).
- **Hero đúng memorable moment?** Đúng — memorable editorial moment duy nhất của trang là statement Hero; các section khác yên tĩnh hơn.
- **Case đúng evidence peak?** Đúng — evidence weight cao nhất (T2–T4) hội tụ ở S3.
- **CTA đúng action peak?** Đúng — CTA chuyển đổi duy nhất ở S6, sau toàn bộ bằng chứng (P2), là điểm cam duy nhất (D47).

## Component Usage Audit (đối chiếu 18 component — D33/D46/D50)

| Section | Component family dùng | Mới? |
|---|---|---|
| S0 | `Header` | Không |
| S1 | composition: `Container` + `Label` + heading/`Prose` + inline CTA link | Không (không tạo `EditorialHero`) |
| S2 | `ContentCard` (variant=article) + `ArticleMeta` + `Label`; `StatusMessage` (empty-state) | Không |
| S3 | `ContentCard` (variant=caseStudy) + `MetricGroup` | Không (ContentCard chung — Owner Decision) |
| S4 | `PillarMap` | Không |
| S5 | `WorkWithMeBlock` | Không |
| S6 | CTA link tới `/contact` (composition; `ContactForm` ở trang Contact) | Không |
| S7 | `Footer` | Không |

- **Vượt 18 component?** Không.
- **Sinh component mới?** Không.
- **Section nào cố tạo component mới?** Không — Hero/CTA/statement là composition từ component/primitive sẵn có; không tách `SignatureCard` (Owner Decision).

## Narrative Audit

- **Reading Journey:** liền mạch danh-tính → định-vị → cách-nghĩ → bằng-chứng → bản-đồ → mời → hành-động → kết. Mỗi transition có câu nối kiểm chứng được (không đứt).
- **Editorial Rhythm:** mật độ biến thiên (thoáng→trung→nặng→nghỉ→trung→gọn); không lặp nhịp >2 lần liên tiếp; không hai vùng căng liền kề.
- **Progressive Disclosure:** 5s (định vị) → 30s (ba vùng năng lực) → 2ph (bài/case) → 5ph (đủ tin) — khớp design test.
- **Human Composition:** content-first; structured asymmetry (Case 60/40); một điểm nặng (Case); visual silence cạnh weight (Hero, CTA).
- **Editorial Intelligence:** một memorable moment (Hero); một primary + một secondary attention/section; editorial brief đầy đủ (density/nhịp/anchor/arc/transition).

## Design Bible Compliance

- ✓ **Typography** — chỉ mô tả role/hierarchy; Geist Sans-only, metric tabular-nums, không mono (D48). Không đặc tả cỡ/màu chữ ở đây.
- ✓ **Motion** — chỉ intent; trần 200ms, không scroll-reveal (D32/P9). Không mô tả animation.
- ✓ **Color** — không đặc tả màu; ghi rõ section-based (D46), một khối tối (Case *hoặc* Work), orange budget 1 CTA + 1 marker (D47), danger không dùng.
- ✓ **Component** — chỉ 18 component; không tạo mới; Hero/CTA là composition.
- ✓ **Evidence** — mọi asset thiếu gắn `OWNER ASSET REQUIRED`; không số/case/ảnh giả (D7/D6); Roboworld REVIEW-REQUIRED.
- ✓ **Anti-pattern** — né AP-2 (publishing flow, không SaaS), AP-3/5/6 (evidence-gate, không tile/fake), AP-4 (ContentCard có justify), AP-8 (1 CTA), AP-11 (ratio đa dạng), AP-15 (không toggle).
- ✓ **Human Composition** — asymmetry, một điểm nặng, silence-cạnh-weight, image-to-text theo vai trò.
- ✓ **Editorial Intelligence** — một memorable moment, một attention anchor/section, thinking gate qua Grayscale + Replace-name + 5-second (kiểm ở wireframe).

---

**Wireframe Phase (0.4D) — allowed:** chia grid, chọn layout, crop/tỷ lệ ảnh, spacing, alignment, hierarchy thị giác, empty-state, composition từng breakpoint (390/768/1024/1280), quyết định khối Black là S3 *hay* S5.

**Forbidden:** đổi narrative/thứ tự section (D25), thêm component (ngoài 18), bỏ/đổi evidence hoặc attention anchor, thêm CTA (>trần D23/P8), thêm animation/scroll-reveal/visual motif ngoài Bible, đổi radius ngoài R3 (D49), phá section-based/orange budget (D46/D47), dùng Geist Mono (D48), sửa Design Bible.
