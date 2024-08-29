<template>
    <div class="px-1 animation" :class="store.animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <div class="ms_border">
                    <div class="d-flex justify-content-between flex-wrap">

                        <div>
                            <h3>{{ travel.title }}</h3>
                            <h6 class="mb-3">{{ travel.days && travel.days[indexDay] ? travel.days[indexDay].day : '' }}</h6>

                        </div>
                        <div class="d-flex gap-2 align-items-center mb-2 flex-wrap">
                            <button class="btn btn-success d-felx align-items-center"
                                @click="store.sidebarHidden = !store.sidebarHidden">Nuova
                                tappa <svg class="ms-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="M8 1a1 1 0 0 0-2 0v5H1a1 1 0 0 0 0 2h5v5a1 1 0 1 0 2 0V8h5a1 1 0 1 0 0-2H8z"
                                        clip-rule="evenodd" />
                                </svg></button>



                            <button class="btn btn-danger d-flex align-items-center"
                                @click="store.overlayHidden = false"> Elimina tappe <svg class="ms-1"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor"
                                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg> </button>
                        </div>
                    </div>

                    <div class="sub-card p-3" v-if="stageExsist()">

                        <div class="container">
                            <div class="row">
                                <h5 class="mb-3">Tappe da visitare:</h5>
                                <div class="col-12 col-md-6"
                                    v-for="stage in store.arrayTravel[this.indexTravel].days[this.indexDay].stages"
                                    :key="stage">
                                    <StageCard :title="stage.title" :indexTravel="indexTravel" :indexDay="indexDay" />
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="sub-card p-3" v-else>

                        <h5 class="">Nessuna tappa da visitare</h5>


                    </div>


                </div>
            </div>
        </div>
    </div>

    <SidebarNewStage :indexTravel="indexTravel" :indexDay="indexDay" />
    <ModalDay @clickedDelete="deleteAllStage()" />
</template>

<script>
import ModalDay from '../components/ModalDay.vue';
import SidebarNewStage from '../components/SidebarNewStage.vue';
import StageCard from '../components/StageCard.vue';

import { store } from '../store';

export default {
    components: { SidebarNewStage, StageCard, ModalDay },
    data() {
        return {
            store,
            travel: [],
            indexTravel: null,
            indexDay: null,
        }
    },

    created() {
        const title = this.$route.query.title;
        this.indexDay = this.$route.query.day - 1;

        store.arrayTravel.forEach((element, index) => {
            if (element.title === title) {
                this.travel = element;
                this.indexTravel = index;
            }
        });


        if (!store.arrayTravel[this.indexTravel] || !store.arrayTravel[this.indexTravel].days[this.indexDay]) {

            this.$router.push({ name: 'errorPage' })
        }

    },

    mounted() {
        store.animation = true;
        setTimeout(() => {

            store.animation = false;

        }, 1)
    },

    beforeRouteLeave(to, from, next) {
        store.animation = true;
        setTimeout(() => {
            next();
        }, 500)

    },

    methods: {
        stageExsist() {
            if (store.arrayTravel[this.indexTravel] &&
                store.arrayTravel[this.indexTravel].days[this.indexDay] &&
                store.arrayTravel[this.indexTravel].days[this.indexDay].stages &&
                store.arrayTravel[this.indexTravel].days[this.indexDay].stages.length > 0) {
                return true;
            }
            return false;
        },

        deleteAllStage() {

            if (store.arrayTravel[this.indexTravel].days[this.indexDay].stages &&
                store.arrayTravel[this.indexTravel].days[this.indexDay].stages.length > 0) {


                store.arrayTravel[this.indexTravel].days[this.indexDay].stages.forEach((stage, index) => {
                    if (stage.gallery && stage.gallery.length > 0) {
                        stage.gallery.forEach(idImg => {
                            this.deleteImagesByID(idImg);
                        });
                    }
                });

                store.arrayTravel[this.indexTravel].days[this.indexDay].stages = [];

            }
            console.log('delete');
            store.overlayHidden = true;

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

        deleteImagesByID(id) {
            return new Promise((resolve, reject) => {
                if (!this.db) {
                    this.openOrCreateDatabase()
                        .then(() => this.deleteImagesByID(id))
                        .then(resolve)
                        .catch(reject);
                    return;
                }

                const transaction = this.db.transaction(['images'], 'readwrite');
                const objectStore = transaction.objectStore('images');

                const request = objectStore.delete(id);  // Elimina direttamente l'elemento con l'ID

                request.onsuccess = () => {
                    console.log('Immagine con ID', id, 'è stata eliminata.');
                    resolve();
                };

                request.onerror = (event) => {
                    console.error('Errore durante l\'eliminazione dell\'immagine:', event.target.error);
                    reject(event.target.error);
                };
            });
        },

    }
}
</script>

<style lang="scss" scoped></style>