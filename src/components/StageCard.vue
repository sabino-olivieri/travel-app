<template>
    <div class="ms_card p-2 text-black d-flex justify-content-between align-items-center flex-wrap justify-content-center mb-2 position-relative">
        <router-link :to="{ name: 'stagePage', query: { title: title, travel: indexTravel, day: indexDay + 1 } }" class="w-75">
            <h5 class="mb-0 mx-2 d-inline-block "> {{ title }} </h5>
        </router-link>
        <input type="checkbox" name="check-visit" :id="'check-visit-'+title" @change="$emit('changeCheck')" :checked="checked">
        <label :for="'check-visit-'+title" class="mx-1 p-1"></label>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        indexTravel: Number,
        indexDay: Number,
        checked: Boolean,
    }
}
</script>

<style lang="scss" scoped>
label::before {
    content: 'da visitare';
    padding: 5px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    position: absolute;
    transform: translate(0%, -50%);
    right: 0.5rem;
    top: 50%;
    background-color: white;
    border: 2px solid #264653;
    color: #264653;
    border-radius: 20px;
    user-select: none;
    cursor: pointer;
    transition: all 0.5s;
}
[id^="check-visit-"] {
    display: none;

    &:checked + label::before {
        content: 'visitata';
        
        background-color: #264653;
        color: white;
        // border: 2px solid #264653;    
        
    }

}


.ms_card:has([id^="check-visit-"]:checked) {
    background-color: #F4A261;
}
</style>