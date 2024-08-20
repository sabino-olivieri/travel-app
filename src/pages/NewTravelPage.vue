<template>
    <div class="p-1">
        <div class="container py-4">
            <div class="row">
                <main class="ms_border">
    
                    <h3 class="mb-5">Aggiungi un nuovo viaggio:</h3>
    
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="Titolo Viaggio" v-model.trim="title">
                        <label for="title">Titolo Viaggio</label>
                    </div>
    
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="start-date" placeholder="Data inizio viaggio" v-model="startDate">
                        <label for="start-date">Data inizio</label>
                    </div>
    
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="finish-date" placeholder="Data fine viaggio" v-model="finishDate">
                        <label for="finish-date">Data fine</label>
                    </div>
    
                    <button class="btn btn-outline-success" @click="saveData()">Salva</button>
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
            title: '',
            startDate: '',
            finishDate: '',
            store,
        }
    },
    methods: {
        isExsist() {
            let exsist = false;
            const titleUpper = this.title.charAt(0).toUpperCase() + this.title.slice(1);
            store.arrayTravel.forEach(travel => {
                if(travel.title === titleUpper) {
                    exsist = true;
                }
            });

            const inputTitle = document.getElementById('title');
            const inputLabel = document.querySelector('[for="title"]');

            if(exsist) {
                inputTitle.classList.add('is-invalid');
                inputLabel.innerHTML = "Titolo Viaggio - Viaggio già esistente"
                return true;
            } else {
                
                inputTitle.classList.remove('is-invalid');
                inputTitle.classList.add('is-valid');
                inputLabel.innerHTML = "Titolo Viaggio"
                return false;
            }

        },
        saveData() {

            const exsist = this.isExsist();

            if(!exsist) {

                store.arrayTravel.push({
                    title: this.title.charAt(0).toUpperCase() + this.title.slice(1),
                    startDate: this.startDate,
                    finishDate: this.finishDate
                });
                console.log(store.arrayTravel);
    
                const travelJSON = JSON.stringify(store.arrayTravel);
                localStorage.setItem('travel', travelJSON);

            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.form-floating {
    .form-control {
        border-radius: 20px;
    }
}
</style>