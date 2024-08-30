<template>
  <Navbar />
  <router-view></router-view>

</template>

<script>
import Navbar from './components/Navbar.vue';
import { store } from './store';

export default {
  components: { Navbar },
  data() {
    return {
      store
    }
  },
  created() {
    const arrayJSON = JSON.parse(localStorage.getItem('travel'));

    store.arrayTravel = arrayJSON ? arrayJSON : [];

    console.log(store.arrayTravel);
    this.getAllImages();

  },

  methods: {
    openOrCreateDatabase() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('ImageDB', 1);

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;

                    if (!db.objectStoreNames.contains('images')) {
                        const objectStore = db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
                        objectStore.createIndex('travelID', 'travelID', { unique: false });
                    }
                };

                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    resolve();
                };

                request.onerror = (event) => {
                    reject('Errore nell\'apertura o creazione del database:', event.target.error);
                };
            });
        },

getAllImages() {
    this.openOrCreateDatabase().then(db => {
        const transaction = this.db.transaction(['images'], 'readonly');
        const objectStore = transaction.objectStore('images');
        const request = objectStore.getAll(); // Ottieni tutti i record

        request.onsuccess = (event) => {
            const images = event.target.result;
            console.log('Contenuto del database:', images);

        };

        request.onerror = (event) => {
            console.error('Errore nel recupero delle immagini:', event.target.error);
        };
    }).catch(error => {
        console.error(error);
    });
}
  }
}
</script>

<style lang="scss" scoped></style>