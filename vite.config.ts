import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { templateCompilerOptions } from '@tresjs/core'
import glsl from 'vite-plugin-glsl'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
    glsl(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
