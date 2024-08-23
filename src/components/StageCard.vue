<template>
    <router-link :to="{name: 'stagePage', query: {title: title, travel: indexTravel, day: indexDay}}">
        <div class="ms_card p-2 text-black text-center mb-2">
            <h5 class="m-0"> {{ title }} </h5>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            title: String,
            indexTravel: Number,
            indexDay: Number,
        }
    }
</script>

<style lang="scss" scoped>

</style>