<template>
  <div class="bg-btw flex min-h-screen">
    <Header />
    <div class="mt-[64px] flex lg:mx-auto">
      <!-- side -->
      <div class="w-80 pl-24 pt-16 max-lg:hidden">
        <div class="mb-2 text-white">介绍</div>
        <div class="mb-4 cursor-pointer" @click="change(0)">简介</div>
        <div class="mb-2 text-white">上手</div>
        <ul class="space-y-2">
          <li class="cursor-pointer" @click="change(1)">AI对话</li>
          <li class="cursor-pointer" @click="change(2)">视频生成</li>
        </ul>
      </div>
      <!-- container -->
      <div class="container p-8 lg:w-168">
        <div class="divide-y" :class="{ hidden: currentnum != 0 }">
          <div class="py-8 text-5xl text-ptb">简介</div>
          <div class="space-y-2 py-8">
            <span class="text-3xl text-ptb">什么是数字人</span>
            <div class="text-wrap"></div>
          </div>
        </div>
        <div class="divide-y" :class="{ hidden: currentnum != 1 }">
          <div class="py-8 text-5xl text-ptb">Ai对话</div>
          <div class="space-y-4 py-8">
            <span class="text-3xl text-ptb">基础</span>
            <div class="text-wrap">
              和普通gpt一样,你可以通过对话获得回复,在此基础上我们提供数字人来加强交互
            </div>
          </div>
          <div class="space-y-4 py-8">
            <span class="text-3xl text-ptb">个性化</span>
            <div class="text-wrap"></div>
            <span class="text-2xl text-ptb">定制</span>
          </div>
        </div>
        <div class="divide-y" :class="{ hidden: currentnum != 2 }">
          <div class="py-8 text-5xl text-ptb">视频生成</div>
          <div class="space-y-4 py-8">
            <span class="text-3xl text-ptb">基础</span>
            <div class="text-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../header/header.vue";
import { ref } from "vue";

const currentnum = ref(0);

const change = (index) => {
  currentnum.value = index;
};
</script>

<style>
@import "../../assets/components/aiChat.css";
</style>
