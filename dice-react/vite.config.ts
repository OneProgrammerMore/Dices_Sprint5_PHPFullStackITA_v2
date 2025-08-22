import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginCss from 'vite-plugin-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
	react()
  ],
  assetsInclude: ['**/*.gltf'],
  server: {
    host: true,
  },
  css: {
    // Optional: Configure CSS processing if needed
    modules: {
      // Enable CSS Modules only if you use *.module.css files
      localsConvention: 'camelCase', // Example: Convert kebab-case to camelCase
    },
    // PostCSS configuration (if you use PostCSS)
    postcss: './postcss.config.js', // Optional, only if you have a PostCSS config
  },
})

