import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ignore generated and third-party folders using the flat config "ignores" property
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "convex/**",
      "tsconfig*.json",
      "dist/**",
      "build/**",
      "package.json",
      "package-lock.json",
      "yarn.lock",
      "enforce-feature-structure.mjs",
      "components.json",
      "**/*.md",

      // File Upload component
      "components/ui/file-upload.tsx",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
    "prettier",
  ),
  // enable prettier as an ESLint rule
  {
    files: ["**/*.{js,jsx,ts,tsx,json,md}"],
    rules: {
      // Disable reporting prettier issues as ESLint errors to avoid failing CI/lint runs.
      // If you prefer warnings instead, set to ["warn"].
      "prettier/prettier": "warn",
    },
  },
];

export default eslintConfig;
