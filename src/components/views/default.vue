<template>
  <div class="flex min-h-screen">
    <Header />
    <div class="flex min-h-screen flex-1 flex-col">
      <home />
    </div>
  </div>
</template>
<script setup>
import home from "../home/home.vue";
import Header from "../header/header.vue";
</script>
<style scoped></style>
