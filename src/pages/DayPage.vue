<template>
    <div class="p-1">
        <div class="container py-4">
            <div class="row">
                <div class="ms_card">
                    <div class="d-flex justify-content-between flex-wrap">

                        <div>
                            <h3>{{ travel.title }}</h3>
                            <h6 class="mb-3">{{ travel.days[indexDay].day }}</h6>

                        </div>
                        <div>
                            <button class="btn btn-success fs-6"
                                @click="store.sidebarHidden = !store.sidebarHidden">Nuova
                                tappa <i class="fa-solid fa-plus fs-6"></i></button>
                        </div>
                    </div>

                    <div class="sub-card p-3" v-if="stageExsist()">

                        <div class="container">
                            <div class="row">
                                <h5 class="mb-3">Tappe da visitare:</h5>
                                <div class="col-12 col-md-6" v-for="stage in store.arrayTravel[this.indexTravel].days[this.indexDay].stages" :key="stage">
                                    <StageCard :title="stage.title" :indexTravel="indexTravel" :indexDay="indexDay"/>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    </div>

    <SidebarNewStage :indexTravel="indexTravel" :indexDay="indexDay" />
</template>

<script>
import SidebarNewStage from '../components/SidebarNewStage.vue';
import StageCard from '../components/StageCard.vue';

import { store } from '../store';

export default {
    components: { SidebarNewStage, StageCard },
    data() {
        return {
            store,
            travel: [],
            indexTravel: 0,
            indexDay: 0,
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
    },

    methods: {
        stageExsist() {
            if(store.arrayTravel[this.indexTravel].days[this.indexDay].stages && 
            store.arrayTravel[this.indexTravel].days[this.indexDay].stages.length > 0) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style lang="scss" scoped></style>