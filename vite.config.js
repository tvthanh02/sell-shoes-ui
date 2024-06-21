import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_BASE_URL_API}`;
  const PORT = `${env.VITE_BASE_URL_API_PORT}`;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
        // Thêm các alias path khác nếu cần
      },
    },
    define: {
      "process.env": {
        BASE_URL_API: API_URL,
        BASE_URL_API_PORT: PORT,
      },
    },
  };
});
