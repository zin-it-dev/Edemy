/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";
import { qrcode } from 'vite-plugin-qrcode';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), qrcode()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules/', 'dist/', 'e2e/'],
    setupFiles: './src/__tests__/setup.ts',
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        'dist/',
        'e2e/',
      ]
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
})
