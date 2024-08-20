<template>
    <main class="p-1">
        <div class="container py-4">
            <div class="row">
                <NoTravel />

                <div v-if="store.arrayTravel.length > 0">
                    <TravelCard v-for="travel in store.arrayTravel" :title="travel.title" :key="travel" />
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
            store
        }
    },



}
</script>

<style lang="scss" scoped></style>