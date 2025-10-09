// vitest.config.ts
import { mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, {
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-utils/setup.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 80,
      },
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
