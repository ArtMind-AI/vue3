<template>
  <div>
    <div class="mx-auto min-h-[calc(100vh-64px)] flex flex-col overflow-x-auto lg:max-w-[80rem] px-6">
      <!-- side -->
      <sidebar />
      <!-- container -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import sidebar from "../others/Sidebar.vue";
</script>

<style>
@import "/src/assets/components/shadow.css";
</style>
