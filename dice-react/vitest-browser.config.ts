import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    browserName: 'chromium', // or 'firefox', 'webkit'
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default defineConfig({
  test: {
	plugins: [react()],
    include: [
		'./src/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)'
    ],
    environment: 'playwright',
    setupFiles: ['./setup-playwright.ts'],
    coverage: {
      enabled: false,
      reporter: ['text', 'json', 'html'],
    },
  },
});



