<template>
    <router-link :to="{name: 'travelDay', query: {title: travelTitle, day: indexDay}}">
        <div class="sub-card text-center mb-2">
            <h3 class="m-0">{{ day.day }}</h3>
            <span>{{ date }}</span>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            travelTitle: String,
            day: Object,
            indexDay: Number,
            date: String,
        }
    }
</script>

<style lang="scss" scoped>

</style>