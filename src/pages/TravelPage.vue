<template>
    <div class="p-1">
        <div class="container py-4">
            <div class="row">
                <div class="ms_card">
                    <h3>{{ travel.title }}</h3>
                    <h6 class="mb-3">dal {{ getFormattedDate(travel.startDate) }} al {{ getFormattedDate(travel.finishDate) }}</h6>
                    
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-6" v-for=" (day, index) in travel.days" :key="index">
                                <DayCard :travelTitle="travel.title" :day="day" :indexDay="index+1" :date="dayForDay(index)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DayCard from '../components/DayCard.vue';
import { store } from '../store';

export default {
  components: { DayCard },
    data() {
        return {
            store,
            travel: []
        }
    },
    created() {
        const title = this.$route.query.title;
        store.arrayTravel.forEach(element => {
            if (element.title === title) {
                this.travel = element
            }
        });
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
        }
    }
}
</script>

<style lang="scss" scoped></style>