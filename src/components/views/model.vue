<template>
  <div>
    <div
      class="mx-auto flex min-h-[calc(100vh-68px)] flex-col overflow-x-auto px-6 lg:max-w-[80rem]"
    >
      <!-- side -->
      <sidebar />
      <!-- container -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import sidebar from "@/components/others/Sidebar.vue";
</script>

<style>
@import "/src/assets/components/shadow.css";
</style>
