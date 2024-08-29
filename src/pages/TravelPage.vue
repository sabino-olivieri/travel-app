<template>
    <div class="px-1 animation" :class="store.animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <div class="ms_border">
                    <div class="d-flex flex-wrap justify-content-between mb-2">
                        <div>

                            <h3>{{ travel.title }}</h3>
                            <h6 class="mb-3">dal {{ getFormattedDate(travel.startDate) }} al {{
                                getFormattedDate(travel.finishDate) }}</h6>
                        </div>
                        <div class="d-flex gap-2 align-items-start">

                            <router-link :to="{ name: 'editTravel', params: { id: indexTravel } }">
                                <button class="btn btn-warning d-flex align-items-center"> <svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1023">
                                        <path fill="currentColor"
                                            d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" />
                                    </svg> </button>
                            </router-link>

                            <button class="btn btn-danger d-flex align-items-center"
                                @click="store.overlayHidden = false"> <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512">
                                    <path fill="currentColor"
                                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg> </button>
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
    beforeRouteLeave(to, from, next) {
        store.animation = true;
        setTimeout(() => {
            next();
            store.animation = false;
        },500)
        
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

    mounted() {
        store.animation = true;
        setTimeout(() => {

            store.animation = false;
        }, 1)
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

<style lang="scss" scoped>

</style>