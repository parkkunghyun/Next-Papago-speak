import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,   // afterEach, describe, it, expect 등 전역으로 사용가능
    setupFiles: './vitest.setup.ts',
  },
})
