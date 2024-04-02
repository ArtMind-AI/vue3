<template>
  <div
    class="fixed z-10 flex sm:top-0  sm:py-8 sm:max-lg:top-0"
    :class="{
      'sm:w-16': !store.sidebarCollapsed,
      'sm:w-40': store.sidebarCollapsed,
      'bg-gray-200': store.sidebarCollapsed,
    }"
  >
    <div class="mb-4 flex w-16 justify-center text-blue-800">
      <a class="cursor-pointer select-none" @click="store.toggleSidebar"
        ><v-icon
          name="bi-grid-fill"
          class="h-10 w-10 rounded-full p-2 hover:bg-emerald-50"
      /></a>
    </div>
    <!-- begin default -->
    <router-link
      to="/"
      class="text-md mx-2 flex h-12 cursor-pointer select-none items-center gap-4 whitespace-nowrap rounded-3xl max-sm:hidden bg-opacity-50"
      :class="{
        'bg-[#0092FF]': $route.path === '/',
        'text-white': $route.path === '/',
        'text-black': $route.path !== '/',
        hidden: !store.sidebarCollapsed,
      }"
      ><v-icon name="hi-home" class="w-16" />
      <span
        :class="{
          hidden: !store.sidebarCollapsed,
        }"
        >{{ $t('home') }}</span
      >
    </router-link>
    <!-- begin chat -->
    <router-link
      to="/tutorialChat"
      class="text-md mx-2 flex h-12 cursor-pointer select-none items-center gap-4 whitespace-nowrap rounded-3xl bg-opacity-50"
      :class="{
        'bg-[#0092FF]': $route.path === '/tutorialChat',
        'text-white': $route.path === '/tutorialChat',
        'text-black': $route.path !== '/tutorialChat',
        hidden: !store.sidebarCollapsed,
      }"
      ><v-icon name="hi-book-open" class="w-16" />
      <span
        :class="{
          hidden: !store.sidebarCollapsed,
        }"
        >{{ $t('docs') }}</span
      >
    </router-link>
    <!-- begin function -->
    <router-link
      to="/aiChat"
      class="text-md mx-2 flex h-12 cursor-pointer select-none items-center gap-4 whitespace-nowrap rounded-3xl max-sm:hidden bg-opacity-50"
      :class="{
        'bg-[#0092FF]': $route.path === '/aiChat',
        'text-white': $route.path === '/aiChat',
        'text-black': $route.path !== '/aiChat',
        hidden: !store.sidebarCollapsed,
      }"
      ><v-icon name="hi-cog" class="w-16" />
      <span
        :class="{
          hidden: !store.sidebarCollapsed,
        }"
        >{{ $t('function') }}</span
      >
    </router-link>
    <!-- begin setting -->
    <router-link
      to="/setting"
      class="text-md mx-2 flex h-12 cursor-pointer select-none items-center gap-4 whitespace-nowrap rounded-3xl bg-opacity-50"
      :class="{
        'bg-[#0092FF]': $route.path === '/setting',
        'text-white': $route.path === '/setting',
        'text-black': $route.path !== '/setting',
        hidden: !store.sidebarCollapsed,
      }"
      ><v-icon name="hi-cog" class="w-16" />
      <span
        :class="{
          hidden: !store.sidebarCollapsed,
        }"
        >{{ $t('setting') }}</span
      >
    </router-link>
    <!-- begin data -->
    <router-link
      to="/data"
      class="text-md mx-2 flex h-12 cursor-pointer select-none items-center gap-4 whitespace-nowrap rounded-3xl bg-opacity-50"
      :class="{
        'bg-[#0092FF]': $route.path === '/data',
        'text-white': $route.path === '/data',
        'text-black': $route.path !== '/data',
        hidden: !store.sidebarCollapsed,
      }"
      ><v-icon name="hi-desktop-computer" class="w-16" />
      <span
        :class="{
          hidden: !store.sidebarCollapsed,
        }"
        >{{ $t('data') }}</span
      >
    </router-link>
    <div class="flex flex-1 justify-end"></div>
    <modal />
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
