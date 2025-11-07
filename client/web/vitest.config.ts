import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/__tests__/setup.ts",
      include: [
        "./src/__tests__/**/*.{test, spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      ],
      browser: {
        instances: [
          {
            browser: "chromium",
          },
        ],
      },
    },
  })
);
