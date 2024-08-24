<template>
    <main class="ms_overlay d-flex justify-content-center align-items-center" :class="store.overlayHidden
        ? 'ms_overlay-hidden' : '' " @click="store.overlayHidden = true">
        <div class="ms_modal fs-3 text-center" @click.stop="">
            <p>
                Eliminare definitivamente "<strong>{{ title }}</strong>" ?
            </p>

            <button class="btn btn-outline-dark mx-2" @click="store.overlayHidden = true">Annulla</button>
            <button class="btn btn-danger mx-2" @click="$emit('clickedDelete')">Elimina</button>

        </div>
    </main>
</template>

<script>
import { store } from '../store';

export default {
    data() {
        return {
            store
        }
    },
    props: {
        title: String
    }
}
</script>

<style lang="scss" scoped>
.ms_overlay {
    background-color: rgba(78, 78, 78, 0.604);
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    opacity: 1;
    transition: all 0.3s ease-in-out;

    .ms_modal {
        margin: 5px;
        border-radius: 20px;
        height: auto;
        padding: 40px;
        background-color: white;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.489);

    }


}

.ms_overlay-hidden {
    height: 0px;
    overflow: hidden;
    opacity: 0;
}
</style>