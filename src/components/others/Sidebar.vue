<template>
  <transition name="slide-left">
    <div
      class="bg-btw fixed inset-0 bottom-0 left-[max(0px,calc(50%-40rem))] right-auto top-16 z-30 w-48 space-y-4 pl-8 pt-12"
      v-if="!isHidden"
    >
      <router-link
        to="/model/talk"
        class="block w-full cursor-pointer rounded-md p-2 text-center text-lg font-bold text-white transition-colors hover:bg-slate-700"
        :class="{ 'bg-slate-700': $route.path === '/model/talk' }"
      >
        个性化对话
      </router-link>
      <router-link
        to="/model/audio"
        class="block w-full cursor-pointer rounded-md p-2 text-center text-lg font-bold text-white transition-colors hover:bg-slate-700"
        :class="{ 'bg-slate-700': $route.path === '/model/audio' }"
      >
        音频生成
      </router-link>
      <router-link
        to="/model/word"
        class="block w-full rounded-md p-2 text-center text-lg font-bold text-white transition-colors first-line:cursor-pointer hover:bg-slate-700"
        :class="{ 'bg-slate-700': $route.path === '/model/word' }"
      >
        文字生成
      </router-link>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const screenWidth = ref(window.innerWidth);
const isHidden = ref(window.innerWidth < 1280);

const onResize = () => {
  screenWidth.value = window.innerWidth;
  isHidden.value = screenWidth.value < 1280;
};

onMounted(() => {
  window.addEventListener("resize", onResize);
  onResize(); // 初次加载时执行
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style>
@import "/src/assets/components/shadow.css";
</style>
