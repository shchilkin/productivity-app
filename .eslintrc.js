module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "node_modules",
    ".eslintrc.js",
    "dist",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "prefer-const": "error",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
  },
};
