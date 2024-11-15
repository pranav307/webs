import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
   // Adjust the path if necessary
    root: path.resolve(__dirname),
   plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
});
