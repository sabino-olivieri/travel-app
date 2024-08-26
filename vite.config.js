import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      src: 'src/service-worker.js', // Percorso al tuo service worker personalizzato
      registerType: 'autoUpdate', // Assicura che gli aggiornamenti siano automatici e non immediati
      workbox: {
        clientsClaim: true, // Prende il controllo immediatamente
        skipWaiting: true, // Salta il processo di attesa
      },
      devOptions: {
        enabled: true, // Questo dovrebbe essere disattivato in produzione
      },
    }),
  ],
});
