<template>
    <div class="ms_sidebar px-1 mt-5" :class="store.sidebarHidden ? 'ms_hidden' : ''">
        <div class="container py-4 h-100">
            <div class="row h-100">
                <main class="ms_border p-3">

                    <div class="d-flex justify-content-between">
                        <h3 class="mb-3">Aggiungi una nuova tappa:</h3>

                        <div>
                            <button class="btn btn-danger d-flex align-items-center"
                                @click="store.sidebarHidden = !store.sidebarHidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10L4.293 5.707a1 1 0 0 1 0-1.414Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>

                    </div>


                    <div class="sub-card p-3">

                        <div class="mb-3">
                            <label for="stage" class="form-label">Titolo Tappa</label>
                            <input type="text" class="form-control" id="stage" placeholder="Titolo tappa"
                                v-model.trim="newStage.title">
                        </div>

                        <div class="mb-3">
                            <label class="form-label d-block">Valutazione</label>
                            <div class="rating">
                                <input type="radio" id="star5" name="rating" value="5">
                                <label for="star5" title="5 stelle"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20" viewBox="0 0 26 26">
                                        <path fill="currentColor"
                                            d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                                    </svg></label>

                                <input type="radio" id="star4" name="rating" value="4">
                                <label for="star4" title="4 stelle"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20" viewBox="0 0 26 26">
                                        <path fill="currentColor"
                                            d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                                    </svg></label>

                                <input type="radio" id="star3" name="rating" value="3">
                                <label for="star3" title="3 stelle"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20" viewBox="0 0 26 26">
                                        <path fill="currentColor"
                                            d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                                    </svg></label>

                                <input type="radio" id="star2" name="rating" value="2">
                                <label for="star2" title="2 stelle"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20" viewBox="0 0 26 26">
                                        <path fill="currentColor"
                                            d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                                    </svg></label>

                                <input type="radio" id="star1" name="rating" value="1">
                                <label for="star1" title="1 stella"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20" viewBox="0 0 26 26">
                                        <path fill="currentColor"
                                            d="M25.326 10.137a1.001 1.001 0 0 0-.807-.68l-7.34-1.066l-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391L1.48 9.457a1 1 0 0 0-.554 1.705l5.312 5.178l-1.254 7.31a1.001 1.001 0 0 0 1.451 1.054L13 21.252l6.564 3.451a1 1 0 0 0 1.451-1.054l-1.254-7.31l5.312-5.178a.998.998 0 0 0 .253-1.024z" />
                                    </svg></label>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Descrizione</label>
                            <textarea class="form-control" id="description" rows="3" placeholder="Descrizione"
                                v-model.trim="newStage.description"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="photos" class="form-label">Allega foto</label>
                            <input class="form-control" type="file" id="photos" multiple
                                accept="image/jpeg, image/png, image/gif" @change="galleryAnteprima($event)">
                        </div>

                        <div id="gallery-preview" class="mb-3">
                            <div class="preview-image position-relative d-inline-block" v-for="(image, index) in photos"
                                :key="index">
                                <img class="gallery-image m-2 image-preview rounded" :src="image" alt="">
                                <span class="x-image" @click="deleteImage(index)"></span>
                            </div>
                        </div>


                        <button class="btn btn-outline-light" @click="saveData()">Salva</button>
                    </div>
                </main>
            </div>
        </div>

    </div>



</template>

<script>
import { store } from '../store';


export default {
    data() {
        return {
            stage: '',
            startDate: '',
            finishDate: '',
            store,
            photos: [],
            photosID: [],
            newStage: {
                title: '',
                description: '',
                gallery: [],
                rating: 0,
            },
        }

    },

    props: {
        indexTravel: Number,
        indexDay: Number,
    },

    methods: {
        isExsist() {
            let exsist = false;
            const stageUpper = this.newStage.title.charAt(0).toUpperCase() + this.newStage.title.slice(1);
            const inputStage = document.getElementById('stage');
            const inputLabel = document.querySelector('[for="stage"]');

            if (stageUpper.length > 2) {


                store.arrayTravel[this.indexTravel].days.forEach(day => {
                    console.log('giorno', day);

                    if (day.stages) {

                        day.stages.forEach(stage => {

                            if (stage.title === stageUpper) {
                                exsist = true;

                            }
                        });
                    }

                });

            } else {
                inputStage.classList.add('is-invalid');
                inputLabel.innerHTML = "Titolo Tappa - <span class='text-danger'> Il Titolo deve avere almeno 3 caratteri </span>"
                return true;
            }


            if (exsist) {
                inputStage.classList.add('is-invalid');
                inputLabel.innerHTML = "Titolo Tappa - <span class='text-danger'> Tappa già esistente </span>"
                return true;
            } else {

                inputStage.classList.remove('is-invalid');
                inputStage.classList.add('is-valid');
                inputLabel.innerHTML = "Titolo Tappa"
                return false;
            }

        },

        saveData() {

            const exsist = this.isExsist();

            if (!exsist) {

                this.newStage.title = this.newStage.title.charAt(0).toUpperCase() + this.newStage.title.slice(1);


                if (!store.arrayTravel[this.indexTravel].days[this.indexDay].stages) {
                    store.arrayTravel[this.indexTravel].days[this.indexDay].stages = [];

                }
                const starElem = document.querySelector('.rating>input:checked');
                this.newStage.rating = starElem ? parseInt(starElem.value) : 0;
                starElem ? starElem.checked = false : '';
                this.processImagesAndStage();

                console.log(store.arrayTravel);

                const travelJSON = JSON.stringify(store.arrayTravel);
                localStorage.setItem('travel', travelJSON);

                store.sidebarHidden = true;
                this.resetInputFile();

            }

        },

        galleryAnteprima(event) {
            const filePhoto = [...event.target.files];

            const promises = filePhoto.map(image => {
                return new Promise((resolve, reject) => {
                    if (image && image.type.includes('image')) {
                        const reader = new FileReader();

                        reader.onload = (e) => {
                            const immagine = e.target.result;
                            this.photos.push(immagine);
                            resolve();
                        };

                        reader.onerror = reject;

                        reader.readAsDataURL(image);
                    } else {
                        resolve(); // risolvi subito se non è un'immagine
                    }
                });
            });

            Promise.all(promises).then(() => {
                this.updateInputFile();
            }).catch(error => {
                console.error("Error processing files: ", error);
                this.updateInputFile(); // Anche in caso di errore, resetta l'input
            });
        },


        deleteImage(index) {

            const input = document.getElementById('photos');

            // Creare un nuovo oggetto DataTransfer
            const dt = new DataTransfer();

            // Aggiungere i file tranne quello all'indice specificato
            Array.from(input.files).forEach((file, i) => {
                if (i !== index) {
                    dt.items.add(file);
                }
            });

            // Aggiornare i file nell'input con il nuovo DataTransfer
            input.files = dt.files;
            this.photos.splice(index, 1);
        },

        updateInputFile() {
            const dataTransfer = new DataTransfer();
            const inputElem = document.getElementById('photos');

            this.photos.forEach((image, index) => {
                const byteString = atob(image.split(',')[1]);
                const mimeType = image.split(',')[0].split(':')[1].split(';')[0];

                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uint8Array = new Uint8Array(arrayBuffer);

                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([uint8Array], { type: mimeType });
                const file = new File([blob], `image_${index}`, { type: mimeType });

                dataTransfer.items.add(file);
            });

            inputElem.files = dataTransfer.files;
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

        saveImage(img) {
            return new Promise((resolve, reject) => {
                if (!this.db) {
                    this.openOrCreateDatabase().then(() => {
                        this.saveImage(img).then(resolve).catch(reject);
                    }).catch(reject);
                    return;
                }

                const transaction = this.db.transaction(['images'], 'readwrite');
                const objectStore = transaction.objectStore('images');
                const image = {
                    img: img,
                    travelID: this.indexTravel
                };
                const request = objectStore.add(image);

                request.onsuccess = (event) => {
                    const id = event.target.result;
                    this.photosID.push(id);
                    console.log('Immagine aggiunta con successo');
                    resolve();
                };

                request.onerror = (event) => {
                    console.error('Errore nell\'aggiunta dell\'immagine:', event.target.error);
                    reject(event.target.error);
                };
            });
        },
        async processImagesAndStage() {
            try {
                // Apri o crea il database
                await this.openOrCreateDatabase();

                // Usa map per creare un array di promesse
                const savePromises = this.photos.map(img => this.saveImage(img));

                // Aspetta che tutte le promesse siano completate
                await Promise.all(savePromises);

                // Dopo che tutte le immagini sono state salvate, esegui il codice successivo
                this.newStage.gallery = this.photosID;
                store.arrayTravel[this.indexTravel].days[this.indexDay].stages.push(this.newStage);
                console.log('Tutte le immagini sono state salvate e la nuova tappa è stata aggiunta.');

                const travelJSON = JSON.stringify(store.arrayTravel);
                localStorage.setItem('travel', travelJSON);

                this.newStage = {
                    title: '',
                    description: '',
                    gallery: [],
                    rating: 0,
                }
                this.photos = [];
                this.photosID = [];

            } catch (error) {
                console.error('Errore durante il salvataggio delle immagini:', error);
            }
        },

        resetInputFile() {

            const inputElem = document.getElementById('photos');

            inputElem.value = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.ms_border {
    background-color: white;
}
</style>