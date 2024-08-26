import { createApp } from 'vue';
import { router } from "./router";
import './style/general.scss';
import App from './App.vue';
import axios from "axios";

if ('serviceWorker' in navigator) {
    // al caricamento della pagina HTML
    // registra il service worker
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('service-worker.js')
            .then(function () {
                console.log('Service worker registrato! 😎');
            });
    });
}

createApp(App).use(router).mount('#app');
