import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {

  return {
    base: mode === "production" ? "/pulse-app-admin/" : "/",
    plugins: [react()],
    server: {
      open: 'index.html',
    },
  }
});
