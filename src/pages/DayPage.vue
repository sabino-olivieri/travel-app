<template>
    <div class="px-1 animation mt-5" :class="store.animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <div class="ms_border">
                    <div class="d-flex justify-content-between flex-wrap">

                        <div>
                            <div >

                                <a class="d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <h3 >{{ travel.title }}</h3>
    
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                        <path fill="currentColor" fill-rule="evenodd"
                                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <ul class="dropdown-menu border-light" >
                                    <li v-for="travel in store.arrayTravel" :key="travel" >
                                        
                                        <router-link class="dropdown-item" :to="{name: 'travel', query: {title: travel.title}}">
                                            <span >{{ travel.title }}</span>
                                        </router-link>
    
                                    </li>
                                </ul>
                            </div>

                            <div class="mb-3">

                                <a class="d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    
                                <h6 class="m-0 d-inline-block">{{ travel.days && travel.days[indexDay] ? travel.days[indexDay].day : '' }}</h6>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                        <path fill="currentColor" fill-rule="evenodd"
                                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <ul class="dropdown-menu border-light" >
                                    <li v-for="day, index in travel.days" :key="day" >
                                        
                                        <router-link class="dropdown-item" :to="{name: 'travelDay', query: {title: travel.title , day: index+1}}">
                                            <span >{{ day.day }}</span>
                                        </router-link>
    
                                    </li>
                                </ul>
                            </div>
                            

                        </div>
                        <div class="d-flex gap-2 align-items-start mb-2 flex-wrap">
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
                                <h5 class="mb-3" v-if="stageToVisit.length > 0">Tappe da visitare:</h5>
                                <div class="col-12 col-md-6 mb-3"
                                    v-for="stage in stageToVisit"
                                    :key="stage">
                                    <StageCard :title="stage.title" :indexTravel="indexTravel" :indexDay="indexDay" :checked="stage.visit" @changeCheck="changeCheck(stage.indexStage)"/>
                                </div>

                                <h5 class="mb-3" v-if="stageVisited.length > 0">Tappe visitate:</h5>
                                <div class="col-12 col-md-6"
                                    v-for="stage in stageVisited"
                                    :key="stage">
                                    <StageCard :title="stage.title" :indexTravel="indexTravel" :indexDay="indexDay" :checked="stage.visit" @changeCheck="changeCheck(stage.indexStage)"/>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="sub-card p-3" v-else>

                        <h5 class="m-0">Nessuna tappa da visitare</h5>


                    </div>


                </div>
            </div>
        </div>
    </div>

    <SidebarNewStage :indexTravel="indexTravel" :indexDay="indexDay" @newStage="checkStage()"/>
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
            stageToVisit: [],
            stageVisited: [],
        }
    },


    watch: {
        '$route.query.day'(newDay, oldDay) {
            if (newDay !== oldDay) {
                this.endAnimation();

                setTimeout(() => {
                    this.checkRoute();
                    this.startAnimation();
                }, 500);

            }
        }
    },

    created() {
        this.checkRoute();
        this.checkStage();
    },

    mounted() {
        this.startAnimation();
    },

    beforeRouteLeave(to, from, next) {
        this.endAnimation();
        setTimeout(() => {
            store.animation = false;
            next();
        },500);
    },

    methods: {
        checkRoute() {
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

        startAnimation() {
            store.animation = true;
            setTimeout(() => {

                store.animation = false;

            }, 1);
        },

        endAnimation() {
            store.animation = true;
            setTimeout(() => {
                store.animation = false;
            }, 500);
        },

        stageExsist() {
            if (store.arrayTravel[this.indexTravel] &&
                store.arrayTravel[this.indexTravel].days[this.indexDay] &&
                store.arrayTravel[this.indexTravel].days[this.indexDay].stages &&
                store.arrayTravel[this.indexTravel].days[this.indexDay].stages.length > 0) {
                return true;
            }
            return false;
        },

        checkStage() {
            this.stageToVisit = [];
            this.stageVisited = [];

            store.arrayTravel[this.indexTravel].days[this.indexDay].stages.forEach((stage, index) => {
                if(stage.visit) {
                    this.stageVisited.push({
                        title: stage.title,
                        indexStage: index,
                        visit: true
                    })
                    
                    
                } else {
                    this.stageToVisit.push({
                        title: stage.title,
                        indexStage: index,
                        visit: false
                    })
                }
            });
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

        changeCheck(index) {
            
            store.arrayTravel[this.indexTravel].days[this.indexDay].stages[index].visit = !store.arrayTravel[this.indexTravel].days[this.indexDay].stages[index].visit;
            const travelJSON = JSON.stringify(store.arrayTravel);
                localStorage.setItem('travel', travelJSON);
                setTimeout(() => {
                    
                    this.checkStage();
                }, 500);
        }

    }
}
</script>

<style lang="scss" scoped>

.dropdown-menu {
    background-color: #264653;
    border: 0px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.327),
    -5px -5px 5px rgba(0, 0, 0, 0.327);
    border-radius: 10px;
    * {
        color: white;
    }

    .dropdown-item:hover {
        background-color: #F4A261;
    }

}
</style>