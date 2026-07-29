import type { NextConfig } from "next";

// Foundation only (Milestone 1.1). Static-first, server components default (SYSTEM_ARCHITECTURE §2).
// Deployment-agnostic: KHÔNG phụ thuộc nền tảng cụ thể, KHÔNG option Vercel-only.
// Hosting target = Cloudflare Pages, static-first (D56). Cơ chế build/deploy (output/adapter)
// và image config khóa ở deployment checkpoint sau — chưa khóa `output: "export"` ở đây.
const nextConfig: NextConfig = {};

export default nextConfig;
