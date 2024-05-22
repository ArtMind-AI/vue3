<template>
  <div class="bg-btw h-16">
    <div
      class="mx-auto flex h-full max-w-7xl items-center justify-between px-6"
    >
      <div class="text-ptg z-20 flex gap-6 text-lg">
        <!-- begin default -->
        <div class="flex items-center gap-2">
          <v-icon name="fc-linux" class="h-7 w-7" />
          <router-link to="/" class="text-ptg font-bold tracking-widest">
            <span :class="{ 'text-sky-500': $route.path === '/' }">Art</span>
            Mind</router-link
          >
        </div>
        <!-- begin chat -->
        <router-link
          to="/documents"
          class="hover:text-[#7480ff]"
          :class="{ 'text-[#7480ff]': $route.path === '/documents' }"
        >
          <span class="font-bold tracking-widest">{{ $t("docs") }}</span>
        </router-link>
        <!-- begin function -->
        <router-link
          to="talk"
          class="hover:text-[#7480ff]"
          :class="{ 'text-[#7480ff]': $route.path === '/talk' }"
        >
          <span class="font-bold tracking-widest">{{ $t("function") }}</span>
        </router-link>
        <!-- begin community -->
        <router-link
          to="/community"
          class="hover:text-[#7480ff]"
          :class="{ 'text-[#7480ff]': $route.path === '/community' }"
        >
          <span class="font-bold tracking-widest">{{ $t("community") }}</span>
        </router-link>
        <!-- begin center -->
        <router-link
          to="/center"
          class="hover:text-[#7480ff]"
          :class="{ 'text-[#7480ff]': $route.path === '/center' }"
        >
          <span class="font-bold tracking-widest">个人中心</span>
        </router-link>
      </div>
      <!-- begin header-right -->
      <div class="flex items-center gap-6 max-md:hidden">
        <!-- begin theme -->
        <!-- begin: language -->
        <!-- <div class="dropdown">
          <div tabindex="0" role="button" class="text-ptg">
            <v-icon name="co-language" class="h-9 w-9" />
          </div>
          <ul
            tabindex="0"
            class="bg-grey menu dropdown-content z-[1] mt-5 w-32 rounded-box p-2 shadow"
          >
            <li>
              <a class="text-ptg" @click="switchLanguage('zh')">中文简体</a>
            </li>
            <li>
              <a class="text-ptg" @click="switchLanguage('en')">English</a>
            </li>
          </ul>
        </div> -->
        <!-- begin login -->
        <router-link
          to="/login"
          class="text-ptg h-9 rounded-md bg-gradient-to-l from-blue-500 to-purple-600 px-4 text-center leading-9 transition-transform hover:brightness-90 active:scale-95"
        >
          <span class="font-bold tracking-widest">{{ $t("login in") }}</span>
        </router-link>
        <!-- begin avator -->
        <img src="../../assets/img/0.jpg" class="h-9 w-9 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { themeChange } from "theme-change";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

//切换语言
const switchLanguage = (lang) => {
  locale.value = lang;
};

//theme记忆棒
const theme = localStorage.getItem("theme");
const themeref = ref(false);

if (theme === "light") {
  themeref.value = true;
} else if (theme === "dark") {
  themeref.value = false;
}

onMounted(() => {
  themeChange(false);
});
</script>

<style scoped></style>
