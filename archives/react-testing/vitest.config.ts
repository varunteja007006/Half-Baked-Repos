import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      // reporters: ["default", "html"],
      setupFiles: ["./setup.ts"],
      coverage: {
        reporter: ["html"],
        provider: "v8", // or 'istanbul'
      },
    },
  })
);
