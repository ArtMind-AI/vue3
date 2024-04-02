<template>
  <div
    class="fixed z-10 flex sm:bottom-0 sm:top-0 flex-col sm:max-lg:top-0 sm:w-16 pt-4"
  >
    <!-- begin default -->
    <router-link
      to="/aiChat"
      class="text-md mx-2 flex h-12 cursor-pointer select-none items-center gap-4 whitespace-nowrap rounded-3xl max-sm:hidden flex-col"
      :class="{
        'text-white': $route.path === '/aiChat',
      }"
      ><v-icon name="hi-home" class="w-16" />
      <span
        >数字人</span
      >
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../../../store.js";
import modal from "../modal/modal.vue";
</script>

<style scoped>
@import "../../assets/components/modal.css";
</style>