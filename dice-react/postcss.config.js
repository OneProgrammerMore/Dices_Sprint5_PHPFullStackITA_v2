import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgecss.default({
      content: [
        './index.html', // Vite's entry HTML file
        './src/**/*.{js,jsx,ts,tsx}', // React component files (JS/JSX/TS/TSX)
      ],
      safelist: ['safelist-class-name'], // Optionally, add any class names you want to keep
    }),
  ],
};
