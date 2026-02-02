import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url"; // 1. 引入必要工具

// 2. 手動定義 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: "/mofudays-react/",
  css: {
    preprocessorOptions: {
      scss: {
        // 使用我們定義好的 __dirname
        additionalData: `
          @import "bootstrap/scss/functions";
          @import "${path.resolve(__dirname, "src/styles/_variables.scss").replace(/\\/g, "/")}";
        `,
        quietDeps: true,
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
