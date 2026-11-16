import graphql from '@rollup/plugin-graphql'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [graphql(), react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  define: {
    global: 'globalThis',
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    environmentOptions: {
      jsdom: { url: 'http://localhost:3000' },
    },
  },
})
