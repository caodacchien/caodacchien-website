import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import YouTubeEmbed from "./YouTubeEmbed";
import { extractYouTubeId } from "@/blocks/YouTube";
import { slugifyHeading } from "@/lib/toc";

type Props = { content: SerializedEditorState; className?: string; id?: string };

type YouTubeFields = {
  url?: string;
  caption?: string | null;
  startAt?: number | null;
};

/**
 * Gom chữ trong một nhánh, bỏ qua đậm/nghiêng/liên kết. Giống collectText của lib/toc.
 * Nhận `unknown` vì kiểu node của Lexical khai báo children là SerializedLexicalNode[],
 * không khớp cấu trúc rút gọn ở đây — thu hẹp kiểu ngay trong hàm là gọn hơn ép kiểu ngoài.
 */
function plainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: unknown; children?: unknown };
  if (typeof n.text === "string") return n.text;
  if (!Array.isArray(n.children)) return "";
  return n.children.map(plainText).join("");
}

/**
 * Vẽ nội dung bài viết từ dữ liệu trình soạn thảo.
 *
 * Hai chỗ tự lo thay vì để mặc định:
 * - Khối Video YouTube: đổi link người viết dán thành khung nhúng thật.
 * - Ảnh chèn giữa bài: dùng next/image để đổi cỡ và đổi định dạng tại edge,
 *   thay vì thẻ <img> trần tải nguyên ảnh gốc vài megabyte.
 */
export default function ArticleBody({ content, className, id }: Props) {
  // Đếm riêng cho lần vẽ này, để tiêu đề trùng tên nhận đúng hậu tố -2, -3…
  // Phải khớp từng bước với extractToc trong lib/toc.ts, nếu không thì bấm vào mục lục
  // sẽ nhảy sai chỗ. Cả hai dùng chung slugifyHeading và cùng thứ tự duyệt.
  const headingSeen = new Map<string, number>();

  const headingId = (text: string) => {
    const base = slugifyHeading(text) || "muc";
    const count = (headingSeen.get(base) ?? 0) + 1;
    headingSeen.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };

  return (
    <div className={className} id={id}>
      <RichText
        data={content}
        converters={({ defaultConverters }) => ({
          ...defaultConverters,

          // Gắn mã neo vào H2/H3 để mục lục nhảy tới được.
          heading: ({ node, nodesToJSX }) => {
            const children = nodesToJSX({ nodes: node.children });
            const Tag = node.tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

            if (Tag !== "h2" && Tag !== "h3") {
              return <Tag>{children}</Tag>;
            }

            const text = plainText(node);
            return (
              <Tag id={headingId(text)} className="anchored">
                {children}
              </Tag>
            );
          },

          blocks: {
            youtube: ({ node }: { node: { fields: YouTubeFields } }) => {
              const fields = node.fields;
              const id = fields.url ? extractYouTubeId(fields.url) : null;
              // Link hỏng thì bỏ qua, không dựng khung trống giữa bài.
              if (!id) return null;
              return (
                <YouTubeEmbed
                  videoId={id}
                  caption={fields.caption}
                  startAt={fields.startAt}
                />
              );
            },
          },

          upload: ({ node }) => {
            const doc = node.value as {
              url?: string;
              alt?: string;
              width?: number;
              height?: number;
              credit?: string;
            } | null;
            if (!doc?.url) return null;

            return (
              <figure>
                <Image
                  src={doc.url}
                  alt={doc.alt ?? ""}
                  width={doc.width ?? 1600}
                  height={doc.height ?? 900}
                  sizes="(max-width: 900px) 100vw, 900px"
                />
                {doc.credit && <figcaption>{doc.credit}</figcaption>}
              </figure>
            );
          },
        })}
      />
    </div>
  );
}
