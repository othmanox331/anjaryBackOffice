import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@screens": path.resolve(__dirname, "./src/screens"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
});
