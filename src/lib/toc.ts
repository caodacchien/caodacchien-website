import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Đổi tiêu đề tiếng Việt thành mã neo dùng được trong URL.
 *
 * NFD tách chữ và dấu thành hai ký tự rời, rồi xoá riêng phần dấu — nhờ vậy "Chiến"
 * ra "chien" chứ không phải "chin". Riêng đ/Đ không phải chữ có dấu mà là một chữ
 * cái riêng, NFD không tách được, nên phải thay tay.
 */
export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
};

/** Gom toàn bộ chữ trong một nhánh, bỏ qua đậm/nghiêng/liên kết. */
function collectText(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  if (!node.children) return "";
  return node.children.map(collectText).join("");
}

/**
 * Rút mục lục từ nội dung bài.
 *
 * Chỉ lấy H2 và H3. H1 là tiêu đề bài, không nằm trong thân. H4 trở xuống thì mục lục
 * sẽ sâu tới mức khó nhìn hơn là hữu ích.
 *
 * Mã neo trùng nhau được thêm hậu tố -2, -3… vì hai mục cùng tên trong một bài là
 * chuyện có thật, mà hai thẻ cùng id thì nút nhảy sẽ luôn nhảy về cái đầu tiên.
 */
export function extractToc(content: SerializedEditorState | null | undefined): TocItem[] {
  const root = (content as unknown as { root?: LexicalNode })?.root;
  if (!root?.children) return [];

  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  for (const node of root.children) {
    if (node.type !== "heading") continue;
    if (node.tag !== "h2" && node.tag !== "h3") continue;

    const text = collectText(node).trim();
    if (!text) continue;

    const base = slugifyHeading(text) || "muc";
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);

    items.push({
      id: count === 1 ? base : `${base}-${count}`,
      text,
      level: node.tag === "h2" ? 2 : 3,
    });
  }

  return items;
}
