import type { Block } from "payload";

/**
 * Khối nhúng video YouTube.
 *
 * Chỉ lưu ID video, không lưu cả đường dẫn — vì YouTube có bốn dạng link
 * (youtube.com/watch, youtu.be, /embed, /shorts) và người viết dán dạng nào cũng đúng.
 * Việc bóc ID làm ở hook beforeChange, không bắt chủ website phải biết ID nằm ở đâu.
 */
export const YouTubeBlock: Block = {
  slug: "youtube",
  labels: { singular: "Video YouTube", plural: "Video YouTube" },
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
      label: "Đường dẫn YouTube",
      admin: {
        description:
          "Dán nguyên đường dẫn từ thanh địa chỉ. Nhận cả youtube.com/watch, youtu.be, và Shorts.",
      },
      validate: (value: string | null | undefined) => {
        if (!value) return "Cần dán đường dẫn video.";
        return extractYouTubeId(value)
          ? true
          : "Không đọc được mã video từ đường dẫn này. Anh kiểm tra lại giúp em.";
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Chú thích dưới video",
      admin: { description: "Không bắt buộc. Hiện nhỏ bên dưới khung video." },
    },
    {
      name: "startAt",
      type: "number",
      label: "Bắt đầu từ giây thứ",
      min: 0,
      admin: {
        description: "Để trống thì phát từ đầu. Dùng khi muốn trỏ thẳng vào một đoạn.",
      },
    },
  ],
};

/** Bóc mã video từ mọi dạng đường dẫn YouTube. Trả null nếu không phải link YouTube. */
export function extractYouTubeId(input: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
    /youtube\.com\/live\/([\w-]{11})/,
  ];

  for (const re of patterns) {
    const m = input.match(re);
    if (m) return m[1];
  }

  // Người dùng dán thẳng mã video
  if (/^[\w-]{11}$/.test(input.trim())) return input.trim();

  return null;
}
