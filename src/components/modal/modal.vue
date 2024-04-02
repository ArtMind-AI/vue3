<template>
  <transition :duration="550" name="nested">
    <div
      v-if="store.show"
      class="fixed left-0 h-128 w-128 flex z-20 overflow-y-auto bg-white"
    >
    1
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../../../store.js";
</script>

<style scoped>
/* Your scoped styles go here */
@import "../../assets/components/modal.css";
</style>
