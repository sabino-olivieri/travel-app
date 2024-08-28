<template>
    <main class="p-1 animation" :class="store.animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <NoTravel />

            </div>
        </div>

        <div v-if="store.arrayTravel.length > 0">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-4 col-lg-3" v-for="travel in store.arrayTravel" :key="travel">
                        <TravelCard :title="travel.title" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import NoTravel from '../components/NoTravel.vue'
import TravelCard from '../components/TravelCard.vue';
import { store } from '../store';

export default {
    components: { NoTravel, TravelCard },

    data() {
        return {
            store,
            
        }
    },
    mounted() {
        
        store.animation = true;
        setTimeout(() => {

            store.animation = false;
        }, 1)
    },
    beforeRouteLeave(to, from, next) {
        store.animation = true;
        setTimeout(() => {
            next();
        },500)
        
    }
}





</script>

<style lang="scss" scoped>

</style>