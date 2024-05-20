<template>
  <div class="bg-btw h-screen overflow-y-scroll">
    <Header />
    <div class="mx-auto max-w-[88rem] px-6">
      <div class="mt-6">
        <div class="flex gap-4 max-md:flex-col md:items-end">
          <div>
            <img src="../../assets/img/0.jpg" class="h-64 w-64 rounded-xl" />
          </div>
          <div class="flex flex-col gap-4 p-4 bg-[#454857] rounded-xl">
            <div class="h-8 w-40 flex items-center justify-center rounded-xl bg-[#1d232a]">
              <span>tillicofess</span>
            </div>
            <div class="h-8 w-64 rounded-xl bg-[#1d232a]"></div>
          </div>
        </div>
        <div role="tablist" class="tabs-boxed tabs mt-6 w-96 myshadow">
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
        <div class="mb-6 mt-3 h-128 w-full rounded-xl border-[#54555e] border-2"></div>
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
@import url('../../assets/components/shadow.css');
</style>
