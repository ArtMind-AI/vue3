<template>
  <div>
    <div class="flex flex-col">
      <!-- begin 1 yes-->
      <div class="bg-btw flex h-screen items-center">
        <div class="mx-auto flex max-w-5xl gap-48">
          <div class="flex max-w-128 flex-col justify-center gap-8">
            <div class="text-ptb text-center text-5xl font-bold">Art Mind</div>
            <div class="text-ptb text-center text-3xl">
              Interstellar Development Experience
            </div>
            <div class="text-ptb text-center text-xl">
              An IDE layer for Neovim with sane defaults. Completely free and
              community driven.
            </div>
            <div class="mt-8 flex justify-center gap-8">
              <router-link to="/startFun">
                <button
                  class="text-ptw w-32 rounded-md bg-[#bb9af7] p-2 text-center"
                >
                  开始
                </button>
              </router-link>
              <router-link to="/startFun">
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
      <article class="bg-ptb flex h-screen items-center">
        <div
          class="mx-auto flex w-full items-center max-lg:flex-col max-lg:px-4 max-lg:py-28 lg:max-w-3xl"
        >
          <div class="px-4 lg:w-2/5">
            <div
              class="text-gtb pb-4 text-4xl font-bold tracking-wide max-lg:text-center"
            >
              数字人
            </div>
            <div
              class="text-gtb break-words text-lg tracking-wider max-lg:text-center"
            >
              Effortlessly transform your sketches into polished designs with
              our innovative AI processing. No skills required, no reshaping
              needed.
            </div>
          </div>
          <div class="relative max-lg:flex-1 lg:w-3/5">
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
      <article
        class="bg-btw flex h-screen flex-col items-center justify-center px-4"
      >
        <div
          class="text-ptb mx-auto mb-16 text-center text-4xl font-bold tracking-wider"
        >
          功能
        </div>
        <div class="mx-auto mt-8 flex items-center gap-32">
          <div class="grid grid-rows-4 gap-8">
            <!-- 1 -->
            <div
              class="w-48 cursor-pointer rounded-md p-2 shadow transition-colors duration-500"
              :class="selectFunction === 0 ? 'bg-ptb' : 'bg-grey'"
              @click="changepage(0)"
            >
              <div
                class="py-2 text-xl font-bold"
                :class="selectFunction === 0 ? 'text-grey' : 'text-ptb'"
              >
                aiChat
              </div>
              <p
                class="max-w-48 break-words"
                :class="selectFunction === 0 ? 'text-grey' : 'text-ptb'"
              >
                11111111111111111111111
              </p>
            </div>
            <!-- 2 -->
            <div
              class="w-48 cursor-pointer rounded-md p-2 shadow transition-colors duration-500"
              :class="selectFunction === 1 ? 'bg-ptb' : 'bg-grey'"
              @click="changepage(1)"
            >
              <div
                class="py-2 text-xl font-bold"
                :class="selectFunction === 1 ? 'text-grey' : 'text-ptb'"
              >
                aiChat
              </div>
              <p
                class="max-w-48 break-words"
                :class="selectFunction === 1 ? 'text-grey' : 'text-ptb'"
              >
                11111111111111111111111
              </p>
            </div>
            <!-- 3 -->
            <div
              class="w-48 cursor-pointer rounded-md p-2 shadow transition-colors duration-500"
              :class="selectFunction === 2 ? 'bg-ptb' : 'bg-grey'"
              @click="changepage(2)"
            >
              <div
                class="py-2 text-xl font-bold"
                :class="selectFunction === 2 ? 'text-grey' : 'text-ptb'"
              >
                aiChat
              </div>
              <p
                class="max-w-48 break-words"
                :class="selectFunction === 2 ? 'text-grey' : 'text-ptb'"
              >
                11111111111111111111111
              </p>
            </div>
            <!-- 4 -->
            <div
              class="w-48 cursor-pointer rounded-md p-2 shadow transition-colors duration-500"
              :class="selectFunction === 3 ? 'bg-ptb' : 'bg-grey'"
              @click="changepage(3)"
            >
              <div
                class="py-2 text-xl font-bold"
                :class="selectFunction === 3 ? 'text-grey' : 'text-ptb'"
              >
                aiChat
              </div>
              <p
                class="max-w-48 break-words"
                :class="selectFunction === 3 ? 'text-grey' : 'text-ptb'"
              >
                11111111111111111111111
              </p>
            </div>
          </div>
          <div class="mx-auto mt-4 max-w-120">
            <img
              src="/src/assets/svg/op/peep-91.svg"
              class="h-96"
              v-if="selectFunction === 0"
            />
            <img
              src="/src/assets/svg/op/peep-92.svg"
              class="h-96"
              v-if="selectFunction === 1"
            />
            <img
              src="/src/assets/svg/op/peep-93.svg"
              class="h-96"
              v-if="selectFunction === 2"
            />
            <img
              src="/src/assets/svg/op/peep-94.svg"
              class="h-96"
              v-if="selectFunction === 3"
            />
          </div>
        </div>
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
</style>
