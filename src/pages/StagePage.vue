<template>
    <div class="px-1 animation" :class="store.animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <main class="ms_border p-3">

                    <h3 class="">{{ title }}</h3>
                    <div class="mb-5">
                        <svg class="gold" v-for="n in travelStage.rating" :key="n" xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20" viewBox="0 0 26 26">
                            <path fill="currentColor"
                                d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                        </svg>



                        <svg class="grey" v-for="n in 5 - travelStage.rating" :key="n"
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

</template>

<script>
import ImageCarousel from '../components/ImageCarousel.vue';



import { store } from '../store';

export default {
    components: { ImageCarousel },


    data() {
        return {
            title: '',
            indexTravel: 0,
            indexDay: 0,
            photos: [],
            gallery: [],
            travelStage: {},
            store,
            
        }
    },
    beforeRouteLeave(to, from, next) {
        store.animation = true;
        setTimeout(() => {
            next();
        }, 500)

    },

    created() {
        this.title = this.$route.query.title;
        this.indexTravel = this.$route.query.travel;
        this.indexDay = this.$route.query.day;
        


        store.arrayTravel[this.indexTravel].days[this.indexDay].stages.forEach(stage => {
            if (stage.title == this.title) {
                this.travelStage = stage;
                console.log('Stage', this.travelStage);

                this.photos = stage.gallery;
                console.log('Photos', this.photos);
            }
        });
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


                                this.gallery.push(result.img);


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