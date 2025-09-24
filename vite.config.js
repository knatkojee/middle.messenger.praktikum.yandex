import { defineConfig } from "vite";

export default defineConfig({
  publicDir: 'static',
  css: {
    postcss: "./postcss.config.js",
  },
});
