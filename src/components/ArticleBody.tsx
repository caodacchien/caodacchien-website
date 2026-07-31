import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import YouTubeEmbed from "./YouTubeEmbed";
import { extractYouTubeId } from "@/blocks/YouTube";

type Props = { content: SerializedEditorState; className?: string };

type YouTubeFields = {
  url?: string;
  caption?: string | null;
  startAt?: number | null;
};

/**
 * Vẽ nội dung bài viết từ dữ liệu trình soạn thảo.
 *
 * Hai chỗ tự lo thay vì để mặc định:
 * - Khối Video YouTube: đổi link người viết dán thành khung nhúng thật.
 * - Ảnh chèn giữa bài: dùng next/image để đổi cỡ và đổi định dạng tại edge,
 *   thay vì thẻ <img> trần tải nguyên ảnh gốc vài megabyte.
 */
export default function ArticleBody({ content, className }: Props) {
  return (
    <div className={className}>
      <RichText
        data={content}
        converters={({ defaultConverters }) => ({
          ...defaultConverters,

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
