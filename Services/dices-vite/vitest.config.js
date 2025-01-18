export default {
  test: {
    environment: 'jsdom',
    globals: true, // Enable global hooks
  },
}
/*
export default {
  test: {
    environment: 'jsdom',
  },
}*/
/*
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
    },
    dir: 'src/__tests__',
    globals: true, // Enable global hooks
  },
  exclude: ['src/__tests__'],
} as VitestConfigExport);
*/
