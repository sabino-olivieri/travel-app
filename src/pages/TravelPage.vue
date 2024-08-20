<template>
    <div class="p-1">
        <div class="container py-4">
            <div class="row">
                <div class="ms_card">
                    <h3>{{ travel.title }}</h3>

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
                travel: []
            }
        },
        created() {
            const title = this.$route.params.title;
            store.arrayTravel.forEach(element => {
                if(element.title === title) {
                    this.travel = element
                }
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>