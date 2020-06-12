module.exports = {
  plugins: {
    "postcss-nesting": {},
    "postcss-custom-properties": {
      importFrom: "node_modules/@handball-referee/widgets/module/colors.css",
    },
    "postcss-preset-env": {},
  },
};
