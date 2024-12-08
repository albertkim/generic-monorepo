import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.test.ts'],
    coverage: {
      reporter: ['text-summary'] // Compact summary output
    }
  },
  resolve: {
    alias: {
      '@lumber/common': path.resolve(__dirname, '../common/src')
    },
    extensions: ['.ts', '.js']
  }
})
