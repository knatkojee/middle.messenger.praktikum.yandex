import prettier from 'vite-plugin-prettier';
import { defineConfig } from "vite";
// @ts-ignore
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  preview: {
    port: 3000,
  },
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
  plugins: [
    handlebars(),
    prettier({
      semi: false,
      singleQuote: false,
      jsxSingleQuote: false,
      trailingComma: 'none',
      bracketSpacing: false,
      objectWrap: 'preserve',
      bracketSameLine: false,
      rangeStart: 0,
      rangeEnd: 0,
      parser: 'css',
      filepath: '',
      requirePragma: false,
      insertPragma: false,
      checkIgnorePragma: false,
      proseWrap: 'preserve',
      arrowParens: 'always',
      plugins: [],
      htmlWhitespaceSensitivity: 'css',
      endOfLine: 'auto',
      quoteProps: 'preserve',
      vueIndentScriptAndStyle: false,
      embeddedLanguageFormatting: 'off',
      singleAttributePerLine: false,
      experimentalOperatorPosition: 'start',
      experimentalTernaries: false,
      printWidth: 0,
      tabWidth: 0
    })
  ],
});
