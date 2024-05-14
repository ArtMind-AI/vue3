<template>
  <div class="bg-btw flex">
    <div class="mx-auto flex flex-col items-center justify-center px-8">
      <span class="text-ptb pb-8 text-4xl font-bold">模块</span>
      <carousel
        v-model="currentSlide"
        :items="carouselItems"
        :transition="600"
        class="mx-auto max-w-256 max-lg:min-w-128 max-lg:max-w-168"
      >
        <slide v-for="item in carouselItems" :key="item.id">
          <img
            :src="item.src"
            class="border-ptb aspect-video w-full rounded-xl border-4"
          />
        </slide>
      </carousel>
      <div class="mt-4 flex w-2/3 gap-4">
        <button
          v-for="n in 4"
          :key="n"
          class="bg-grey w-1/4 rounded-lg py-1 transition-transform hover:scale-105"
          :class="{ 'scale-105': currentSlide === n - 1 }"
          @click="currentSlide = n - 1"
        >
          <v-icon
            :name="carouselItems[n - 1].iconName"
            class="text-ptb z-20 h-12 w-12"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
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
