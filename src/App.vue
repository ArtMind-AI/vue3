<script setup>
import Header from './components/header/header.vue';
</script>

<template>
  <Header v-if="$route.path != '/login'" />
  <div class="bg-btw" :class="{ 'mt-16': $route.path != '/login' }">
    <router-view />
  </div>
</template>

<style scoped></style>
