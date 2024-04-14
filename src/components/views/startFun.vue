<template>
  <div class="flex min-h-screen bg-btw">
    <Header />
    <div
      class="mx-auto mt-[60px] flex min-h-screen max-w-7xl flex-1 flex-col gap-8 p-8"
    >
      <div class="text-4xl font-bold text-ptb">components</div>
      <!-- begin:title -->
      <div class="lg:flex gap-4 max-lg:grid max-lg:grid-cols-2 max-lg:mx-auto">
        <!-- 1 -->
        <div
          class="w-48 cursor-pointer rounded-md p-4 shadow transition-colors duration-500"
          :class="title === 0 ? 'bg-ptb' : 'bg-grey'"
          @click="changepage(0)"
        >
          <div
            class="py-2 text-xl font-bold"
            :class="title === 0 ? 'text-grey' : 'text-ptb'"
          >
            aiChat
          </div>
          <p
            class="max-w-48 break-words"
            :class="title === 0 ? 'text-grey' : 'text-ptb'"
          >
            11111111111111111111111
          </p>
        </div>
        <!-- 2 -->
        <div
          class="w-48 cursor-pointer rounded-md p-4 shadow transition-colors duration-500"
          :class="title === 1 ? 'bg-ptb' : 'bg-grey'"
          @click="changepage(1)"
        >
          <div
            class="py-2 text-xl font-bold"
            :class="title === 1 ? 'text-grey' : 'text-ptb'"
          >
            Video Generation
          </div>
          <p
            class="max-w-48 break-words"
            :class="title === 1 ? 'text-grey' : 'text-ptb'"
          >
            11111111111111111111111
          </p>
        </div>
        <!-- 3 -->
        <div
          class="w-48 cursor-pointer rounded-md p-4 shadow transition-colors duration-500"
          :class="title === 2 ? 'bg-ptb' : 'bg-grey'"
          @click="changepage(2)"
        >
          <div
            class="py-2 text-xl font-bold"
            :class="title === 2 ? 'text-grey' : 'text-ptb'"
          >
            aiChat
          </div>
          <p
            class="max-w-48 break-words"
            :class="title === 2 ? 'text-grey' : 'text-ptb'"
          >
            11111111111111111111111
          </p>
        </div>
        <!-- 4 -->
        <div
          class="w-48 cursor-pointer rounded-md p-4 shadow transition-colors duration-500"
          :class="title === 3 ? 'bg-ptb' : 'bg-grey'"
          @click="changepage(3)"
        >
          <div
            class="py-2 text-xl font-bold"
            :class="title === 3 ? 'text-grey' : 'text-ptb'"
          >
            aiChat
          </div>
          <p
            class="max-w-48 break-words"
            :class="title === 3 ? 'text-grey' : 'text-ptb'"
          >
            11111111111111111111111
          </p>
        </div>
      </div>
      <!-- begin text&img -->
      <div class="flex gap-32 max-md:flex-col max-md:items-center">
        <div class="flex h-96 max-w-96 flex-col justify-center gap-4">
          <div>
            <div class="pb-2 text-4xl font-bold text-ptb">
              {{ currentData.title }}
            </div>
            <div class="text-lg tracking-wide text-ptb">
              {{ currentData.text }}
            </div>
          </div>
          <router-link
            :to="currentData.url"
            class="w-40 rounded-md bg-[#bb9af7] py-2 text-center text-lg font-bold text-black"
          >
            start
          </router-link>
        </div>
        <div
          class="flex min-w-96 select-none justify-end max-md:hidden md:flex-1"
        >
          <img :src="currentImage" class="h-96" />
        </div>
      </div>
      <!-- begin step -->
      <div class="flex flex-col gap-8">
        <div class="text-4xl font-bold text-ptb">step</div>
        <!-- begin:step0-->
        <div
          class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3"
          v-if="title === 0"
        >
          <div
            v-for="(item, index) in itemsTitle0"
            :key="index"
            class="flex flex-col items-center gap-4"
          >
            <img :src="item.image" class="h-60" />
            <span class="text-xl text-ptb">{{ item.text }}</span>
          </div>
        </div>
        <!-- begin:step1-->
        <div
          class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3"
          v-else-if="title === 1"
        >
          <div
            v-for="(item, index) in itemsTitle1"
            :key="index"
            class="flex flex-col items-center"
          >
            <img :src="item.image" class="h-60" />
            <span class="text-xl text-ptb">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "../header/header.vue";

const title = ref(0);

const changepage = (index) => {
  title.value = index;
  currentData.value = data[index];
  currentImage.value = images[index];
};

const data = [
  {
    title: "ai Chat",
    text: "AI Chat is an innovative platform that leverages artificial intelligence to facilitate seamless and intelligent conversations.",
    url: "/ai",
  },
  {
    title: "Video Generation",
    text: "Someting about 1 someting about 1 someting about 1 someting about 1 someting about 1 someting about 1 someting about 1",
    url: "/aiChat",
  },
  {
    title: "Title 2",
    text: "Someting about 2 someting about 2 someting about 2 someting about 2 someting about 2 someting about 2 someting about 2",
  },
  {
    title: "Title 3",
    text: "Someting about 3 someting about 3 someting about 3 someting about 3 someting about 3 someting about 3 someting about 3",
  },
];

const images = [
  "/src/assets/svg/roller-skating.svg",
  "/src/assets/svg/reading-side.svg",
  "/src/assets/svg/zombieing.svg",
  "/src/assets/svg/float.svg",
];

const itemsTitle0 = [
  { image: "/src/assets/svg/float.svg", text: "选择你的形象" },
  { image: "/src/assets/svg/float.svg", text: "为你的形象定制数字人" },
  { image: "/src/assets/svg/float.svg", text: "和个性化数字人交流" },
];

const itemsTitle1 = [
  { image: "/src/assets/svg/ice-cream.svg", text: "4" },
  { image: "/src/assets/svg/ice-cream.svg", text: "5" },
  { image: "/src/assets/svg/ice-cream.svg", text: "6" },
];

const currentData = ref(data[title.value]);

const currentImage = ref(images[title.value]);
</script>

<style></style>
