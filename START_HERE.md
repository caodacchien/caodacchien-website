# Bắt đầu dự án

## 1. Giải nén và đặt dự án vào thư mục Projects

```bash
cd ~/Projects
unzip personal-brand-os-starter.zip
mv personal-brand-os-starter caodacchien-website
cd caodacchien-website
```

## 2. Mở bằng VS Code

```bash
code .
```

## 3. Khởi tạo Git

```bash
git init
git branch -M main
git add .
git commit -m "chore: initialize personal brand os foundation"
```

## 4. Mở Claude Code trong đúng thư mục dự án

```bash
claude
```

## 5. Prompt đầu tiên gửi cho Claude Code

```text
Read README.md, CLAUDE.md and all markdown files under docs/.

Do not write application code yet.

First:
1. Summarize your understanding of the project.
2. Identify missing or conflicting requirements.
3. Propose a concise plan for completing Phase 0 and Phase 1.
4. Ask me the most important clarification questions.
5. Do not modify any file until I approve the plan.
```

## 6. Thứ tự làm việc

1. Duyệt `PROJECT_CONSTITUTION.md`
2. Hoàn thiện `PRODUCT_REQUIREMENTS.md`
3. Chọn Design Direction
4. Hoàn thiện `DESIGN_SYSTEM.md`
5. Duyệt `SYSTEM_ARCHITECTURE.md`
6. Duyệt `DATABASE.md`
7. Tạo GitHub repository
8. Khởi tạo Next.js
9. Phát triển theo milestone

## 7. Quy tắc quan trọng

- Không cho Claude Code xây cả website trong một lần.
- Mỗi lần chỉ xử lý một milestone.
- Luôn xem `git diff` trước khi commit.
- Không commit `.env`, API key hoặc secret.
- Không bật deploy production trước khi kiểm thử.
