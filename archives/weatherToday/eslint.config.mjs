import nextConfig from "eslint-config-next";
import nextPlugin from "@next/eslint-plugin-next";

const coreWebVitals = nextPlugin.configs["core-web-vitals"];

const config = [
  ...nextConfig,
  {
    rules: {
      ...coreWebVitals.rules,
    },
  },
];

export default config;
