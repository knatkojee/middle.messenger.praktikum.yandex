import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  publicDir: "static",
  build: {
    assetsDir: "source",
    outDir: "build",
    cssMinify: false,
    minify: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [handlebars()],
});
