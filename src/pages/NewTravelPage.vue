<template>
    <div class="p-1 animation" :class="animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <main class="ms_border p-3">

                    <h3 class="mb-5">Aggiungi un nuovo viaggio:</h3>


                    <div class="sub-card p-3">

                        <div class="mb-3">
                            <label for="title" class="form-label">Titolo Viaggio</label>
                            <input type="text" class="form-control" id="title" placeholder="Titolo Viaggio"
                                v-model.trim="title" >
                        </div>

                        <div class="mb-3">
                            <label for="start-date" class="form-label">Data inizio</label>
                            <input type="date" class="form-control" id="start-date" placeholder="Data inizio viaggio"
                                v-model="startDate" >
                        </div>

                        <div class="mb-3">
                            <label for="finish-date" class="form-label">Data fine</label>
                            <input type="date" class="form-control" id="finish-date" placeholder="Data fine viaggio"
                                v-model="finishDate" >
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
            title: '',
            startDate: '',
            finishDate: '',
            store,
            animation: true
        }
    },
    beforeRouteLeave(to, from, next) {
        this.animation = true;
        setTimeout(() => {
            next();
        },500)
        
    },
    methods: {
        isExsist() {
            let exsist = false;
            const titleUpper = this.title.charAt(0).toUpperCase() + this.title.slice(1);
            const inputTitle = document.getElementById('title');
            const inputLabel = document.querySelector('[for="title"]');

            if(titleUpper.length > 2) {

                store.arrayTravel.forEach(travel => {
                    if (travel.title === titleUpper) {
                        exsist = true;
                    }
                });

            } else {
                inputTitle.classList.add('is-invalid');
                inputLabel.innerHTML = "Titolo Viaggio - <span class='text-danger'> Il Titolo deve avere almeno 3 caratteri </span>"
                return true;
            }


            if (exsist) {
                inputTitle.classList.add('is-invalid');
                inputLabel.innerHTML = "Titolo Viaggio - <span class='text-danger'> Viaggio già esistente </span>"
                return true;
            } else {

                inputTitle.classList.remove('is-invalid');
                inputTitle.classList.add('is-valid');
                inputLabel.innerHTML = "Titolo Viaggio"
                return false;
            }

        },
        dateCheck() {
            const start = new Date(this.startDate);
            const finish = new Date(this.finishDate);
            const isStartDate = start instanceof Date && !isNaN(start);
            const isFinishDate = finish instanceof Date && !isNaN(finish);
            let numDays = 0;

            let error = false;

            const inputStart = document.getElementById('start-date');
            const inputFinish = document.getElementById('finish-date');
            const labelStart = document.querySelector('[for="start-date"]');
            const labelFinish = document.querySelector('[for="finish-date"]');

            if (isStartDate && isFinishDate) {

                if (finish < start) {
                    error = true;
                    inputFinish.classList.add('is-invalid');
                    inputFinish.classList.remove('is-valid');
                    labelFinish.innerHTML = "Data fine - <span class='text-danger'> Il viaggio non può terminare prima della partenza </span>";
                } else {
                    inputFinish.classList.remove('is-invalid');
                    inputFinish.classList.add('is-valid');
                    labelFinish.innerHTML = "Data fine";

                    inputStart.classList.remove('is-invalid');
                    inputStart.classList.add('is-valid');
                    labelStart.innerHTML = "Data inizio"
                }

            } else {

                if (!isStartDate) {
                    error = true;
                    inputStart.classList.add('is-invalid');
                    inputStart.classList.remove('is-valid');
                    labelStart.innerHTML = "Data inizio - <span class='text-danger'> Inserisci una data corretta </span>"

                } else {
                    inputStart.classList.remove('is-invalid');
                    inputStart.classList.add('is-valid');
                    labelStart.innerHTML = "Data inizio"
                }

                if (!isFinishDate) {
                    error = true;
                    inputFinish.classList.add('is-invalid');
                    inputFinish.classList.remove('is-valid');
                    labelFinish.innerHTML = "Data fine - <span class='text-danger'> Inserisci una data corretta </span>"

                } else {
                    inputFinish.classList.remove('is-invalid');
                    inputFinish.classList.add('is-valid');
                    labelFinish.innerHTML = "Data fine - <span class='text-danger'> Inserisci una data corretta </span>"
                }
            }

            if(!error) {
                numDays =( finish.getTime() - start.getTime() ) / (1000 * 60 * 60 * 24) + 1; 
            }

            return {
                error,
                numDays
            };

        },
        saveData() {

            const exsist = this.isExsist();
            const errorDate = this.dateCheck();
            
            

            if (!exsist && !errorDate.error) {
                const days = [];
                for (let index = 1; index <= errorDate.numDays; index++) {
                    days.push({
                        day: "Giorno "+ index,
                    })
                    
                }
                const titleUpper = this.title.charAt(0).toUpperCase() + this.title.slice(1);
                store.arrayTravel.push({
                    title: titleUpper,
                    startDate: this.startDate,
                    finishDate: this.finishDate,
                    days: days
                });
                console.log(store.arrayTravel);

                const travelJSON = JSON.stringify(store.arrayTravel);
                localStorage.setItem('travel', travelJSON);
                this.$router.push({name: 'travel', query: { title: titleUpper }});

            }

        }
    },
    mounted() {
        setTimeout(() => {

            this.animation = false;
        },1)
    }
}
</script>

<style lang="scss" scoped>
.ms_border {
    background-color: white;
}

</style>