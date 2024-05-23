<template>
  <transition name="slide-left">
    <div
      class="bg-btw fixed inset-0 bottom-0 left-[max(0px,calc(50%-40rem))] right-auto top-16 z-30 w-48 space-y-4 pl-8 pt-6 overflow-y-scroll"
      v-if="!isHidden"
    >
      <div class="space-y-1">
        <div class="font-bold text-white">介绍</div>
        <div
          class="sidecursor font-bold transition-colors"
          :class="{ active: currentnum === 0 }"
          @click="change(0)"
        >
          简介
        </div>
      </div>
      <div class="space-y-1">
        <div class="font-bold text-white">上手</div>
        <ul class="space-y-1">
          <li
            class="sidecursor font-bold transition-colors"
            :class="{ active: currentnum === 1 }"
            @click="change(1)"
          >
            AI对话
          </li>
          <li
            class="sidecursor font-bold transition-colors"
            :class="{ active: currentnum === 2 }"
            @click="change(2)"
          >
            视频生成
          </li>
        </ul>
      </div>
      <div class="font-bold text-white">费用</div>
      <div class="font-bold text-white">社区</div>
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
@import "@/assets/components/shadow.css";
</style>
