<template>
  <div
    class="bg-btw fixed left-0 right-0 z-20 flex items-center justify-between px-4 py-3"
    :class="{ ' shadow-md': isShadow }"
  >
    <div class="text-ptg flex gap-8 p-1 text-xl">
      <!-- begin default -->
      <router-link to="/" class="">Art Mind</router-link>
      <!-- begin chat -->
      <router-link to="/startFun" class="text-ptg">
        <span>{{ $t("docs") }}</span>
      </router-link>
      <!-- begin function -->
      <router-link to="/startFun" class="text-ptg">
        <span>{{ $t("function") }}</span>
      </router-link>
      <!-- begin function -->
      <router-link to="/community" class="text-ptg">
        <span>{{ $t("community") }}</span>
      </router-link>
    </div>
    <!-- begin header-right -->
    <div class="flex items-center gap-8 max-sm:hidden">
      <!-- begin theme -->
      <label class="swap swap-rotate">
        <!-- this hidden checkbox controls the state -->
        <input
          type="checkbox"
          data-toggle-theme="dark,light"
          data-act-class="ACTIVECLASS"
          :checked="themeref"
        />
        <!-- sun icon -->
        <svg
          class="text-ptg swap-on h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>
        <!-- moon icon -->
        <svg
          class="text-ptg swap-off h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          />
        </svg>
      </label>
      <!-- begin: language -->
      <div class="dropdown">
        <div tabindex="0" role="button" class="text-ptg">
          <v-icon name="co-language" class="h-8 w-8" />
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content z-[1] mt-5 w-32 rounded-box bg-[#414868] p-2 shadow"
        >
          <li><a class="text-ptg">中文简体</a></li>
          <li><a class="text-ptg">English</a></li>
        </ul>
      </div>
      <!-- begin avator -->
      <img src="../../assets/img/0.jpg" class="h-10 w-10 rounded-full" />
      <!-- begin login -->
      <router-link
        to="/login"
        class="bg-dg rounded-3xl px-8 py-1 text-ptw"
      >
        <span>{{ $t("login in") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { themeChange } from "theme-change";

const isShadow = ref(false);

const handleScroll = () => {
  const bottomOffset =
    document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  isShadow.value =
    bottomOffset < document.documentElement.scrollHeight - window.innerHeight;
};

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

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped></style>
