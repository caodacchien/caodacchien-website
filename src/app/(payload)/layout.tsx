/* Khung giao diện trang quản trị Payload. File khuôn mẫu — không sửa tay.
   Đây là lý do toàn bộ trang website đã chuyển vào nhóm (frontend): Next.js chỉ cho
   phép một root layout, mà admin của Payload cần root layout riêng của nó. */
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
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
