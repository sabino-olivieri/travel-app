import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      registerType: 'autoUpdate',
      injectManifest: {
        injectionPoint: 'self.__WB_MANIFEST', // Assicurati che questo sia il punto di iniezione corretto
      },
      manifest: {
        // Aggiungi qui le configurazioni del tuo manifest
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}'],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
});