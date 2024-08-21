<template>
    <div class="p-1">
        <div class="container py-4">
            <div class="row">
                <div class="ms_card">
                    <h3>{{ travel.title }}</h3>
                    <h6 class="mb-3">{{ travel.days[indexDay].day }}</h6>
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { store } from '../store';

export default {
    data() {
        return {
            store,
            travel: [],
            indexDay: 0,
        }
    },
    created() {
        const title = this.$route.query.title;
        this.indexDay = this.$route.query.day - 1;
        console.log('Giorno ', this.indexDay);
        
        store.arrayTravel.forEach(element => {
            if (element.title === title) {
                this.travel = element
            }
        });
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped></style>