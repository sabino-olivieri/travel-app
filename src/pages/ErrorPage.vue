<template>
    <div class="px-1 animation mt-5" :class="store.animation ? 'hidden' : ''">
        <div class="container py-4">
            <div class="row">
                <div class="ms_border text-center d-flex flex-column justify-content-center align-items-center">
                    <h3 class="mb-4">Pagina non trovata!</h3>
                    <router-link class="btn btn-success" :to="{name: 'home'}">Homepage</router-link>
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
        }
    },
    beforeRouteLeave(to, from, next) {
        store.animation = true;
        setTimeout(() => {
            next();
            store.animation = false;
        }, 500)

    },
    mounted() {
        store.animation = true;
        setTimeout(() => {

            store.animation = false;
        }, 1)
    },
}
</script>

<style lang="scss" scoped></style>