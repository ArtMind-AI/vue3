<template>
  <div class="bg-btw h-screen overflow-y-scroll">
    <Header />
    <div class="mx-auto max-w-7xl px-6">
      <div class="mt-6">
        <div class="flex gap-4 max-md:flex-col md:items-end">
          <div>
            <img
              src="../../assets/img/0.jpg"
              class="diyborder h-64 w-64 rounded-xl"
            />
          </div>
          <div
            class="diyborder flex flex-col gap-4 rounded-xl bg-[#525e7b] p-4"
          >
            <div
              class="diyborder flex h-8 w-40 items-center justify-center rounded-xl bg-[#f5f5dc]"
            >
              <span class="text-black">tillicofess</span>
            </div>
            <div class="diyborder h-8 w-64 rounded-xl bg-[#f5f5dc]"></div>
          </div>
        </div>
        <div role="tablist" class="myshadow tabs-boxed tabs mt-6 w-96">
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active': Num === 0 }"
            @click="changenum(0)"
            >喜爱</a
          >
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active': Num === 1 }"
            @click="changenum(1)"
            >仓库</a
          >
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active': Num === 2 }"
            @click="changenum(2)"
            >上传</a
          >
        </div>
        <div
          class="mb-6 mt-3 h-128 w-full rounded-xl border-2 border-[#54555e]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../header/header.vue";
import { ref } from "vue";

const Num = ref(0);

const changenum = (index) => {
  Num.value = index;
};
</script>

<style scoped>
@import url("../../assets/components/shadow.css");
</style>
