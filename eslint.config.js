// eslint.config.js
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest, // Add Jest globals
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    },
  },
  {
    ignores: ["node_modules/**", "swagger.json", "package-lock.json"],
  }
];
