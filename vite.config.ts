import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const hash = Math.floor(Math.random() * 900000) + 100000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()/*, vueDevTools()*/],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server:{
    port: 8081,
    host: true,
    strictPort: true
  },
  build: {
    sourcemap: true,
    rollupOptions: {
        output: {
            entryFileNames: `[name].${hash}.js`,
            chunkFileNames: `[name].${hash}.js`,
            assetFileNames: `[name].${hash}.[ext]`
        }
    }
  },
  define: {
    VITE_INTEGRATOR_API_URL: process.env.VITE_INTEGRATOR_API_URL,
  }
});
