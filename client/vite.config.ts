/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setupTests.ts",
    include: ["./src/**/*.{test, spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    browser: {
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
  },
});
