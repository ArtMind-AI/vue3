<template>
  <div class="flex min-h-screen">
    <Header />
    <div class="flex min-h-screen flex-1 flex-col">
      <content />
    </div>
  </div>
</template>
<script setup>
import content from "../children/homeP.vue";
import Header from "../header/header.vue";
</script>
<style scoped></style>
