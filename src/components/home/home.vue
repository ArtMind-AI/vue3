<template>
  <div>
    <Header />
    <div class="flex flex-col">
      <!-- begin 1 yes-->
      <div class="bg-btw mt-[60px] flex">
        <div class="mx-auto flex gap-48 py-48">
          <div class="flex max-w-128 flex-col justify-center gap-8">
            <div class="text-ptb text-center text-5xl font-bold">Art Mind</div>
            <div class="text-ptb text-center text-3xl">
              Interstellar Development Experience
            </div>
            <div class="text-ptb text-center text-xl">
              An IDE layer for Neovim with sane defaults. Completely free and
              community driven.
            </div>
            <div class="mt-4 flex justify-center gap-8">
              <router-link to="/ai">
                <button
                  class="text-ptw w-32 rounded-md bg-[#bb9af7] p-2 text-center"
                >
                  开始
                </button>
              </router-link>
              <router-link to="/documents">
                <button
                  class="w-32 rounded-md border-2 border-[#bb9af7] p-2 text-center text-[#bb9af7] transition-colors duration-300 hover:bg-[#bb9af7] hover:text-black"
                >
                  文档
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- begin effects yes-->
      <article class="bg-ptb ptb my-[125px]">
        <div
          class="mx-auto flex w-full max-w-3xl items-center py-12 max-lg:flex-col"
        >
          <!-- text -->
          <div class="px-4 lg:w-1/2">
            <div
              class="text-gtb pb-4 text-4xl font-bold tracking-wide max-lg:text-center"
            >
              数字人
            </div>
            <div class="text-gtb break-words text-lg max-lg:text-center">
              Effortlessly transform your sketches into polished designs with
              our innovative AI processing. No skills required, no reshaping
              needed.
            </div>
          </div>
          <!-- img -->
          <div class="relative max-lg:flex-1 lg:w-1/2">
            <div class="break-words text-lg text-gray-400">
              <img src="/src/assets/svg/1.svg" />
            </div>
            <img
              src="/src/assets/svg/ice-cream.svg"
              class="absolute left-12 top-32"
            />
          </div>
        </div>
      </article>
      <!-- begin function tes-->
      <article class="bg-btw flex flex-col py-12">
        <carousel />
      </article>
      <!-- begin team yes-->
      <team />
      <!-- begin stats yes-->
      <stats />
      <!-- begin footer yes-->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import team from "@/components/others/team.vue";
import stats from "@/components/others/stats.vue";
import Footer from "../others/footer.vue";
import carousel from "../others/carousel.vue"

const selectFunction = ref(0);

const changepage = (page) => {
  selectFunction.value = page;
};

const isRotatedSe = ref(false);

const handleScroll = () => {
  const bottomOffset =
    document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  isRotatedSe.value = bottomOffset < 2920;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Your scoped styles go here */
.ptb {
  position: relative;
}

.ptb:before {
  content: "";
  transform: translateY(calc(-100%));
  position: absolute;
  height: 125px;
  background-image: url("/src/assets/avif/cloud.avif");
  background-position: bottom;
  background-repeat: repeat-x;
  background-size: contain;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  z-index: 1;
  background-color: var(--bg-btw);
}

.ptb:after {
  content: "";
  transform: rotate(180deg) scaleX(-1);
  position: absolute;
  height: 125px;
  background-image: url("/src/assets/avif/cloud.avif");
  background-position: bottom;
  background-repeat: repeat-x;
  background-size: contain;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  z-index: 1;
  background-color: var(--bg-btw);
}
</style>
