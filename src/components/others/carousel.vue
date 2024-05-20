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
    src: "/src/assets/img/ai1.png",
    iconName: "ai-academia",
    // routepath: "/ai",
  },
  {
    id: 2,
    src: "/src/assets/img/2.jpg",
    iconName: "ai-academia",
    // routepath: "/ai",
  },
  {
    id: 3,
    src: "/src/assets/img/3.png",
    iconName: "ai-academia",
    // routepath: "/ai",
  },
  {
    id: 4,
    src: "/src/assets/img/4.jpg",
    iconName: "ai-academia",
    // routepath: "/ai",
  },
];
const currentSlide = ref(0);
</script>
