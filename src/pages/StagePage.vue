<template>
    <div class="p-2">
        <div class="container py-4">
            <div class="row">
                <main class="ms_border p-3">

                    <h3 class="">{{ title }}</h3>
                    <div class="mb-5">

                        <i class="fa-solid fa-star gold" v-for="n in travelStage.rating" :key="n"></i>
                        <i class="fa-regular fa-star gold" v-for="n in 5 - travelStage.rating" :key="n"></i>
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
    created() {
        this.title = this.$route.query.title;
        this.indexTravel = this.$route.query.travel;
        this.indexDay = this.$route.query.day;



        store.arrayTravel[this.indexTravel].days[this.indexDay].stages.forEach(stage => {
            if (stage.title == this.title) {
                this.travelStage = stage;
                console.log(this.travelStage);
                
                this.photos = stage.gallery;
            }
        });


    },
    mounted() {
        this.loadImages();
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
                console.log('Immagini recuperate:', this.images);
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
}
</style>