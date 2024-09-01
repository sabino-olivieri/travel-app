<template>
    <router-link :to="{name: 'travel', query: {title: title}}">
        <div class="sub-card-mini text-center mb-2">
            <h3 class="m-0">{{ title }}</h3>
            
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            title: String
        },

    }

    
</script>

<style lang="scss" scoped>

</style>