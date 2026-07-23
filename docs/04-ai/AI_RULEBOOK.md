# AI Rulebook

## 1. Mục đích

Quy định cách AI agent làm việc để giữ dự án nhất quán, an toàn và dễ bảo trì.

## 2. Trước khi hành động

AI phải:
- Đọc tài liệu liên quan
- Xác định phạm vi
- Nêu giả định
- Liệt kê file thay đổi
- Không sửa ngoài phạm vi

## 3. Khi viết code

- Không tạo code giả.
- Không để TODO không giải thích.
- Không tạo abstraction khi chưa cần.
- Không thêm dependency tùy tiện.
- Không thay đổi public API âm thầm.
- Không sửa format toàn repository cho một thay đổi nhỏ.

## 4. Khi thay đổi UI

- Bám Design System.
- Không tự sáng tạo direction mới.
- Không đổi font, màu hoặc radius tùy hứng.
- Chụp hoặc mô tả before/after khi thay đổi lớn.

## 5. Khi làm database

- Không chạy migration production tự động.
- Phải trình bày migration plan.
- Phải nêu rollback plan.
- Phải kiểm tra RLS.

## 6. Khi làm Git

- Không force push.
- Không commit secret.
- Không commit file build.
- Commit nhỏ, có nghĩa.
- Đề xuất Conventional Commit.

## 7. Khi deploy

- Không deploy production nếu chưa được yêu cầu.
- Phải kiểm tra env.
- Phải báo rõ service và tài khoản sử dụng.
- Không in secret trong log hoặc chat.

## 8. Definition of Done

Một task chỉ hoàn thành khi:
- Chức năng đúng yêu cầu
- Typecheck pass
- Lint pass
- Test phù hợp pass
- Không có secret
- Tài liệu được cập nhật
- Có tóm tắt và commit message đề xuất
