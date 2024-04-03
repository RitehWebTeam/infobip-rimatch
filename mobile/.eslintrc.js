// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-native/all",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    // eslint-disable-next-line no-undef
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-native", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react-native/no-inline-styles": "off",
    "react-native/no-color-literals": "off",
  },
};
