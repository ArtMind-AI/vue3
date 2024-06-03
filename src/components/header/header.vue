<template>
  <div class="bg-btw fixed top-0 z-30 w-full">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <!-- begin left -->
      <div class="text-ptg flex items-center gap-6">
        <!-- begin default -->
        <div class="flex items-center text-2xl">
          <router-link to="/" class="text-ptg font-bold tracking-wide">
            <span :class="{ 'text-sky-500': $route.path === '/' }">Art</span>
            Mind</router-link>
        </div>
        <div class="flex gap-3 max-md:hidden">
          <!-- begin docs -->
          <router-link to="/documents" class="hover:text-[#7480ff]"
            :class="{ 'text-[#7480ff]': $route.path === '/documents' }">
            <span class="font-bold tracking-widest">{{ $t("docs") }}</span>
          </router-link>
          <!-- begin function -->
          <router-link to="/model/talk" class="hover:text-[#7480ff]"
            :class="{ 'text-[#7480ff]': $route.path.match(/^\/model/) }">
            <span class="font-bold tracking-widest">{{ $t("function") }}</span>
          </router-link>
          <!-- begin community -->
          <router-link to="/community" class="hover:text-[#7480ff]"
            :class="{ 'text-[#7480ff]': $route.path === '/community' }">
            <span class="font-bold tracking-widest">{{ $t("community") }}</span>
          </router-link>
          <!-- begin center -->
          <router-link to="/center" class="hover:text-[#7480ff]"
            :class="{ 'text-[#7480ff]': $route.path === '/center' }">
            <span class="font-bold tracking-widest">个人中心</span>
          </router-link>
        </div>
      </div>
      <!-- begin head-right -->
      <div class="flex items-center gap-4">
        <!-- begin: language -->
        <div class="dropdown">
          <div tabindex="0" role="button">
            <button class="text-ptw h-9 rounded-md border-2 border-[#607bff] px-4 transition-transform active:scale-90">
              <span class="font-bold">语言</span>
            </button>
          </div>
          <ul tabindex="0" class="bg-grey menu dropdown-content z-[1] mt-5 w-32 rounded-box p-2 shadow">
            <li>
              <a class="text-ptg" @click="switchLanguage('zh')">中文简体</a>
            </li>
            <li>
              <a class="text-ptg" @click="switchLanguage('en')">English</a>
            </li>
          </ul>
        </div>
        <!-- begin login -->
        <div
          class="text-ptg h-9 rounded-md bg-gradient-to-l from-blue-500 to-purple-600 px-4 text-center leading-9 transition-transform hover:brightness-90 active:scale-95 cursor-pointer"
          @click="loginStore.loginSwitch">
          <span class="font-bold tracking-widest">{{ $t("login in") }}</span>
        </div>
        <!-- 头像 -->
        <div>
          <img src="/assets/img/0.jpg" class="h-9 aspect-square rounded-md">
        </div>
        <!-- list-button -->
        <div class="relative md:hidden">
          <Transition name="slide-up" mode="out-in">
            <button @click="showHead = !showHead" v-if="showHead === false">
              <v-icon name="md-list-round" class="h-6 w-6 cursor-pointer" />
            </button>
            <button @click="showHead = !showHead" v-else-if="showHead === true">
              <v-icon name="hi-x" class="h-6 w-6 cursor-pointer" />
            </button>
          </Transition>
        </div>
      </div>
    </div>
    <!-- list -->
    <transition name="slide-head">
      <div class="bg-btw w-full border-b-2 border-gray-400 py-12 md:hidden" v-if="showHead">
        <div class="mx-auto w-64">
          <div class="divide-y-2 divide-gray-400">
            <!-- begin docs -->
            <router-link to="/documents" class="block h-10 text-center leading-10">
              <span class="font-bold tracking-widest">{{ $t("docs") }}</span>
            </router-link>
            <!-- begin community -->
            <router-link to="/community" class="block h-10 text-center leading-10">
              <span class="font-bold tracking-widest">{{
                $t("community")
                }}</span>
            </router-link>
            <!-- begin center -->
            <router-link to="/center" class="block h-10 text-center leading-10">
              <span class="font-bold tracking-widest">个人中心</span>
            </router-link>
          </div>
          <div class="my-12">
            <p class="mb-2 text-center font-bold text-white">功能</p>
            <div class="divide-y-2 divide-gray-400">
              <router-link to="/model/talk" class="block h-10 text-center leading-10">
                <span class="font-bold tracking-widest">个性化对话</span>
              </router-link>
              <router-link to="/model/audio" class="block h-10 text-center leading-10">
                <span class="font-bold tracking-widest">音频生成</span>
              </router-link>
              <router-link to="/model/word" class="block h-10 text-center leading-10">
                <span class="font-bold tracking-widest">文字生成</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <login v-if="loginStore.islogin" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLoginStore } from "@/store/login.js";
import login from "@/components/views/login.vue";
// import { themeChange } from "theme-change";

const { locale } = useI18n();
const loginStore = useLoginStore(); // pinia中图片全局变量
const showHead = ref(false);
const route = useRoute(); // 获取当前路由信息
const currentLanguage = ref(locale.value);

// 组件更新时将 showHead 设置为 false
watch(route, () => {
  showHead.value = false;
});

// 语言记忆棒
onMounted(() => {
  // 在组件挂载时，从 localStorage 获取已保存的语言并设置
  if (localStorage.getItem("language")) {
    switchLanguage(localStorage.getItem("language"));
  }
});

// 定义切换语言函数
const switchLanguage = (language) => {
  locale.value = language;
  currentLanguage.value = language;
  localStorage.setItem("language", language);
};


//theme记忆棒
// const theme = localStorage.getItem("theme");
// const themeref = ref(false);

// if (theme === "light") {
//   themeref.value = true;
// } else if (theme === "dark") {
//   themeref.value = false;
// }

// onMounted(() => {
//   themeChange(false);
// });
</script>

<style scoped>
@import "/src/assets/components/shadow.css";
</style>
