<template>
    <div class="px-1 animation mt-5" :class="store.animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <main class="ms_border p-3">
                    <div class="d-flex justify-content-between">
                        <h3 class="">{{ title }}</h3>

                        <div class="d-flex gap-2 align-items-start">

                            <router-link :to="{ name: 'editStage', query: {travel: indexTravel, day: indexDay, stage: indexStage}}">
                                <button class="btn btn-warning d-flex align-items-center text-white"> <svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1023">
                                        <path fill="currentColor"
                                            d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z" />
                                    </svg> </button>
                            </router-link>

                            <button class="btn btn-danger d-flex align-items-center"
                                @click="store.overlayHidden = false">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor"
                                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg> </button>
                        </div>
                    </div>



                    <div class="mb-3">
                        <svg class="gold" v-for="n in isNaN(travelStage.rating) ? 0 : travelStage.rating" :key="n" xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20" viewBox="0 0 26 26">
                            <path fill="currentColor"
                                d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                        </svg>



                        <svg class="grey" v-for="n in isNaN(travelStage.rating) ? 5 : 5 - travelStage.rating" :key="n"
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26">
                            <path fill="currentColor"
                                d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                        </svg>

                    </div>

                    <div class="sub-card p-3">

                        <div class="description" v-if="travelStage.description !== ''">
                            <h5>Descrizione:</h5>
                            <p>{{ travelStage.description }}</p>
                        </div>

                        <div v-if="gallery.length > 0">

                            <ImageCarousel :photos="gallery" />
                        </div>


                    </div>
                </main>
            </div>
        </div>
    </div>

    <modal :title="title" @clickedDelete="deleteStage()" />

</template>

<script>
import ImageCarousel from '../components/ImageCarousel.vue';
import Modal from '../components/modal.vue';



import { store } from '../store';

export default {
    components: { ImageCarousel, Modal },


    data() {
        return {
            title: '',
            indexTravel: null,
            indexDay: null,
            indexStage: null,
            photos: [],
            gallery: [],
            travelStage: {},
            travelTitle: '',
            store,

        }
    },
    beforeRouteLeave(to, from, next) {
        store.animation = true;
        setTimeout(() => {
            store.animation = false;
            next();
        }, 500)

    },

    created() {
        this.indexTravel = this.$route.query.travel;
        this.indexDay = this.$route.query.day - 1;
        this.title = this.$route.query.title;
        
        // console.log(store.arrayTravel[this.indexTravel].days[this.indexDay]);


        if (store.arrayTravel[this.indexTravel] && 
        store.arrayTravel[this.indexTravel].days[this.indexDay] &&
        store.arrayTravel[this.indexTravel].days[this.indexDay].stages &&
        store.arrayTravel[this.indexTravel].days[this.indexDay].stages.length > 0) {

            this.travelTitle = store.arrayTravel[this.indexTravel].title;

            store.arrayTravel[this.indexTravel].days[this.indexDay].stages.forEach((stage, index) => {
                if (stage.title == this.title) {
                    this.travelStage = stage;
                    this.indexStage = index;

                    this.travelStage.rating = this.travelStage.rating || 0;

                    this.photos = stage.gallery;
                    console.log('Photos', this.photos);
                }
            });
        } 
        if (this.indexStage === null) {
            console.log('ok');

            this.$router.push({ name: 'errorPage' })
        }
        this.loadImages();


    },
    mounted() {
        store.animation = true;
        setTimeout(() => {
            store.animation = false;
        }, 1)
    },

    methods: {
        openOrCreateDatabase() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('ImageDB', 1);

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    db.createObjectStore('images', { autoIncrement: true, keyPath: 'id' });
                };

                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    resolve(this.db);
                };

                request.onerror = (event) => {
                    console.error('Errore nell\'apertura del database:', event.target.error);
                    reject(event.target.error);
                };
            });
        },

        getImagesById(idArray) {
            return new Promise((resolve, reject) => {
                if (!this.db) {
                    this.openOrCreateDatabase().then(() => {
                        this.getImagesById(idArray).then(resolve).catch(reject);
                    }).catch(reject);
                    return;
                }

                const transaction = this.db.transaction(['images'], 'readonly');
                const objectStore = transaction.objectStore('images');
                this.gallery = [],

                    idArray.forEach(id => {
                        const request = objectStore.get(id);

                        request.onsuccess = (event) => {
                            const result = event.target.result;

                            if (result) {
                                this.gallery.push(result.img)
                            }
                            if (this.gallery.length === idArray.length) {
                                resolve(this.gallery);
                            }
                        };

                        request.onerror = (event) => {
                            console.error('Errore nel recupero dell\'immagine:', event.target.error);
                            reject(event.target.error);
                        };
                    });
            });
        },

        async loadImages() {
            try {
                this.images = await this.getImagesById(this.photos);

            } catch (error) {
                console.error('Errore durante il recupero delle immagini:', error);
            }
        },

        deleteStage() {

            if (this.photos.length > 0) {
                this.photos.forEach(photo => {
                    this.deleteImagesByID(photo);
                });
            }

            store.arrayTravel[this.indexTravel].days[this.indexDay].stages.splice(this.indexStage, 1)
            store.overlayHidden = true;
            const travelJSON = JSON.stringify(store.arrayTravel);
            localStorage.setItem('travel', travelJSON);
            this.$router.push({ name: 'travelDay', query: { title: this.travelTitle, day: this.indexDay + 1 } });

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

<style lang="scss" scoped>
.ms_border {
    background-color: white;
}

.gold {
    color: gold;
    margin: 0px 2px;
}

.grey {
    color: grey;
    margin: 0px 2px;
}
</style>