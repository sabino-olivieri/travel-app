<template>
    <div class="p-1">
        <div class="container py-4">
            <div class="row">
                <div class="ms_card">
                    <div class="d-flex flex-wrap justify-content-between mb-2">
                        <div>

                            <h3>{{ travel.title }}</h3>
                            <h6 class="mb-3">dal {{ getFormattedDate(travel.startDate) }} al {{
                                getFormattedDate(travel.finishDate) }}</h6>
                        </div>
                        <div class="d-flex gap-2 align-items-start">

                            <button class="btn btn-warning" @click="store.overlayHidden = false"> <i class="fa-solid fa-pen-to-square"></i> </button>
                            
                            <button class="btn btn-danger" @click="store.overlayHidden = false"> <i
                                    class="fa-solid fa-trash text-white"></i> </button>
                        </div>

                    </div>

                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-6" v-for=" (day, index) in travel.days" :key="index">
                                <DayCard :travelTitle="travel.title" :day="day" :indexDay="index + 1"
                                    :date="dayForDay(index)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <modal :title="travel.title" @clickedDelete="deleteTravel()" />
</template>

<script>
import DayCard from '../components/DayCard.vue';
import Modal from '../components/modal.vue';
import { store } from '../store';

export default {
    components: { DayCard, Modal },
    data() {
        return {
            store,
            travel: [],
            indexTravel: 0,
        }
    },
    created() {
        const title = this.$route.query.title;
        store.arrayTravel.forEach((element, index) => {
            if (element.title === title) {
                this.travel = element
                this.indexTravel = index
            }
        });
    },

    methods: {
        getFormattedDate(stringDate) {
            let dateObj = new Date(stringDate);

            let day = String(dateObj.getDate()).padStart(2, '0');
            let month = String(dateObj.getMonth() + 1).padStart(2, '0');
            let year = String(dateObj.getFullYear()).slice(-2);

            return `${day}/${month}/${year}`;
        },

        dayForDay(index) {
            let dateObj = new Date(this.travel.startDate);

            dateObj.setDate(dateObj.getDate() + index);
            let newDate = dateObj.toISOString().split('T')[0];
            const formattedDate = this.getFormattedDate(newDate);
            return formattedDate;
        },

        deleteTravel() {
            store.arrayTravel.splice(this.indexTravel, 1);
            const travelJSON = JSON.stringify(store.arrayTravel);
            localStorage.setItem('travel', travelJSON);
            console.log(store.arrayTravel);
            this.deleteImagesByTravelID(this.indexTravel);
            store.overlayHidden = true;
            this.$router.push({ name: 'home' });

        },

        openOrCreateDatabase() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('myDatabase', 1);

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

        deleteImagesByTravelID(travelID) {
            return new Promise((resolve, reject) => {
                if (!this.db) {
                    this.openOrCreateDatabase().then(() => {
                        this.deleteImagesByTravelID(travelID).then(resolve).catch(reject);
                    }).catch(reject);
                    return;
                }

                const transaction = this.db.transaction(['images'], 'readwrite');
                const objectStore = transaction.objectStore('images');

                const index = objectStore.index('travelID');
                const request = index.openCursor(IDBKeyRange.only(travelID));

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        cursor.delete(); // Elimina l'immagine corrente
                        cursor.continue(); // Continua alla prossima immagine
                    } else {
                        console.log('Tutte le immagini con travelID', travelID, 'sono state eliminate.');
                        resolve();
                    }
                };

                request.onerror = (event) => {
                    console.error('Errore durante l\'eliminazione delle immagini:', event.target.error);
                    reject(event.target.error);
                };
            });
        },


    }
}
</script>

<style lang="scss" scoped></style>