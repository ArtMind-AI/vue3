<template>
  <div class="bg-btw h-screen">
    <div>
      <Header />
      <div class="mx-auto overflow-x-auto px-6 lg:max-w-[80rem]">
        <!-- side -->
        <sidebar />
        <!-- container -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../header/header.vue";
import sidebar from "../others/Sidebar.vue";
</script>

<style>
@import "/src/assets/components/shadow.css";
</style>
