import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mofudays-react/",
  css: {
    preprocessorOptions: {
      scss: {
        // 1. 壓制來自 node_modules (Bootstrap) 的警告
        quietDeps: true,
        // 2. 指定忽略這些特定的棄用警告
        silenceDeprecations: [
          "import",
          "global-builtin",
          "color-functions",
          "if-function",
        ],
      },
    },
  },
});
