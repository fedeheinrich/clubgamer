import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Esto le dice a Vite que trate los archivos .js como .jsx si tienen código de React
      include: /\.(mdx|js|jsx|ts|tsx)$/,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});