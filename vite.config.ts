import { defineConfig } from "vite";
// @ts-ignore
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  publicDir: "static",
  build: {
    assetsDir: "source",
    outDir: "dist",
    cssMinify: false,
    minify: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  //@ts-ignore
  plugins: [handlebars()],
});
