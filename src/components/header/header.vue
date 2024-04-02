<template>
  <div class="fixed left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-[#1a1b26]"
    :class="{ ' shadow-md': isShadow }">
    <div class="p-1 text-xl tracking-widest flex gap-8 text-[#c1caf4]"> 
      <!-- begin default -->
      <router-link to="/" class="">Art Mind</router-link>
      <!-- begin chat -->
      <router-link to="/startFun" class="text-[#c1caf4]">
        <span>{{ $t("docs") }}</span>
      </router-link>
      <!-- begin function -->
      <router-link to="/startFun" class="text-[#c1caf4]">
        <span>{{ $t("function") }}</span>
      </router-link>
    </div>
    <!-- begin login -->
    <div class="flex items-center gap-4 max-sm:hidden">
      <router-link to="/login" class="rounded-3xl bg-[#414868] px-8 py-1 text-[#c1caf4]">
        <span>{{ $t("login in") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isShadow = ref(false);

const handleScroll = () => {
  const bottomOffset =
    document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  isShadow.value =
    bottomOffset < document.documentElement.scrollHeight - window.innerHeight;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@import "../../assets/components/modal.css";
</style>
