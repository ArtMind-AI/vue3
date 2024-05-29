<template>
  <div>
    <carousel v-model="currentSlide" :items="carouselItems" :transition="600">
      <slide v-for="item in carouselItems" :key="item.id">
        <img :src="item.src" class="aspect-video w-full rounded-xl" />
      </slide>

      <template #addons>
        <Navigation />
      </template>
    </carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const carouselItems = [
  {
    id: 1,
    src: "/assets/img/backimg.jpg",
  },
  {
    id: 2,
    src: "/assets/img/girl.png",
  },
  {
    id: 3,
    src: "/assets/img/2.jpg",
  },
  {
    id: 4,
    src: "/assets/img/sea.jpg",
  },
];
const currentSlide = ref(0);
</script>
