import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import { hookImports } from '@unhead/react';
import AutoImport from 'unplugin-auto-import/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    AutoImport({
      imports: [hookImports],
    }),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
});
