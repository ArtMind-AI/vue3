<template>
  <div class="bg-btw flex h-screen overflow-auto">
    <Header class="hidden" />
    <div class="mx-auto flex flex-col items-center justify-center">
      <carousel v-model="currentSlide" :items="carouselItems" :transition="600">
        <slide v-for="item in carouselItems" :key="item.id">
          <!-- <router-link :to="{ path: item.routepath }">
            <img :src="item.src" class="h-168 w-288 rounded-lg" />
          </router-link> -->
          <img :src="item.src" class="h-168 w-288 rounded-lg" />
        </slide>
      </carousel>
      <div class="mt-4 flex w-288 gap-6 px-4">
        <button
          v-for="n in 4"
          :key="n"
          class="bg-grey w-1/4 rounded-lg py-8 transition-transform hover:scale-105"
          :class="{ 'scale-105': currentSlide === n - 1 }"
          @click="currentSlide = n - 1"
        >
          <v-icon
            :name="carouselItems[n - 1].iconName"
            class="text-ptb z-20 h-16 w-16"
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
import Header from "../header/header.vue";

const carouselItems = [
  {
    id: 1,
    src: "/src/assets/img/1.png",
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
