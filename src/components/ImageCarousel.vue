<template>
    <div class="carousel-container m-auto">
        <swiper :modules="modules" :slides-per-view="1" :space-between="0" navigation pagination>
            <swiper-slide v-for="(image, index) in photos" :key="index">
                <div class="image-container">
                    <img :src="image" :alt="`Slide ${index + 1}`" />
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        photos: Array,
    },
    data() {
        return {
            modules: [Navigation, Pagination],
        };
    },
};
</script>

<style lang="scss" scoped>
.carousel-container {
    width: 100%;
    max-width: 600px;
    // max-height: 450px;
    aspect-ratio: 4/3;
}

.image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 600px;
    aspect-ratio: 4/3;
    border-radius: 10px;
}
</style>