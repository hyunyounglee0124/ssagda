import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // GitHub 저장소 이름이 ssagda일 때 필요
  base: '/ssagda/',

  server: {
    port: 5173,
    open: '/ssagda/',
  },
});