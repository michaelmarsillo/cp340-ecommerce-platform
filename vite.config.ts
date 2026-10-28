import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleCheckout } from './server/checkout.ts';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'local-stripe-checkout',
      configureServer(server) {
        const environment = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
        environment.APP_URL ||= 'http://127.0.0.1:5173';
        server.middlewares.use((request, response, next) => {
          if (request.url?.split('?')[0] !== '/api/checkout') return next();
          void handleCheckout(request, response, environment);
        });
      },
    },
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
}));
