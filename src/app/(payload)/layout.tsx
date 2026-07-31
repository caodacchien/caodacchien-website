/* Khung giao diện trang quản trị Payload. File khuôn mẫu — không sửa tay.
   Đây là lý do toàn bộ trang website đã chuyển vào nhóm (frontend): Next.js chỉ cho
   phép một root layout, mà admin của Payload cần root layout riêng của nó. */
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
// Toàn bộ giao diện trang quản trị nằm trong file css này. Thiếu nó thì trình duyệt
// vẽ ra HTML thô: chữ chồng chữ, logo phình kín màn hình, form mất hết bố cục.
// Đây là dòng bị bỏ sót khi viết tay bộ file khung thay vì để Payload tự sinh.
import "@payloadcms/next/css";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap.js";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function PayloadAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
