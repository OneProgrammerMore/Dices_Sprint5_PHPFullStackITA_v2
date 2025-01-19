import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
	include: [
		'./src/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)'
	],
    environment: 'jsdom',
    globals: true,
	css: true,
    coverage: {
	  enabled: false,
      reporter: ['text', 'json', 'html'],
    },
  },
});
