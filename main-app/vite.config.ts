import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main-app',
      remotes: {
        'remote-angular-app': 'http://localhost:4200/remoteEntry.js',
        'remote-react-app': 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000,
    cors: true,
    hmr: {
      clientPort: 5000,
      host: 'localhost',
    },
  },
})