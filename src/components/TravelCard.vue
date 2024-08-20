<template>
    <router-link :to="{name: 'travel', params: {title: title}}">
        <div class="ms_card text-center mb-2">
            <h3>{{ title }}</h3>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            title: String
        }
    }
</script>

<style lang="scss" scoped>

</style>