import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
        "custom-properties": true,
        "color-functional-notation": true,
      },
    }),
  ],
};
