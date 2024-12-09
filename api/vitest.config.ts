import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    setupFiles: './tests/setup.ts',
    fileParallelism: false,
    maxConcurrency: 1,
    isolate: false,
    coverage: {
      reporter: ['text-summary'] // Compact summary output
    },
    server: {
      deps: {
        inline: [/.*/] // This lets us run the database migrations in the setup file
      }
    }
  },
  resolve: {
    alias: {
      '@lumber/common': path.resolve(__dirname, '../common/src')
    },
    extensions: ['.ts', '.js']
  }
})
