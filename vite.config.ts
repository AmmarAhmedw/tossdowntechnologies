import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

import vitePluginInjectDataLocator from "./plugins/vite-plugin-inject-data-locator";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginInjectDataLocator()],
  server: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@heroui/react'],
          'animation-vendor': ['framer-motion'],
          'icon-vendor': ['@iconify/react'],
          'dnd-vendor': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit temporarily
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@heroui/react'],
  },
});
