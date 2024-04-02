<template>
  <div class="flex min-h-screen">
    <Header />
    <div
      class="flex flex-1 flex-col"
      :class="{
        'sm:ml-16': !store.sidebarCollapsed,
        'sm:ml-40': store.sidebarCollapsed,
      }"
    >
      <div class="mt-4"></div>
      <div class="mb-4 flex flex-1 rounded-3xl bg-white">
        <!-- begin:content -->
        <div class="flex flex-1 flex-col gap-8 p-4 sm:p-8">
          <div class="flex items-center gap-8">
            <div class="h-32 w-32 shrink-0">
              <img
                src="../../assets/img/0.jpg"
                class="h-full w-full rounded-full"
              />
            </div>
            <div class="flex flex-col gap-4">
              <div
                class="flex h-8 w-28 items-center justify-center bg-[#F2F2F2]"
              >
                Vertin
              </div>
              <div
                class="flex h-8 w-56 items-center justify-center bg-[#F2F2F2]"
              >
                may the peace with us
              </div>
            </div>
          </div>
          <div class="flex flex-1 gap-4 bg-[#F2F2F2]">
            <div
              class="mx-auto my-8 flex w-full max-w-[1200px] flex-col gap-8 px-4"
            >
              <!-- 1 -->
              <div class="flex flex-col shadow-sm">
                <div class="bg-[#F0F3F8] p-4 text-lg">{{ $t("setting") }}</div>
                <div class="bg-white pl-4 pt-4">
                  <!-- 1.1 -->
                  <div class="mb-4">
                    <label class="mb-2 block text-lg font-bold">{{
                      $t("language")
                    }}</label>
                    <div class="flex">
                      <div
                        class="cursor-pointer select-none text-lg"
                        :class="{ 'text-emerald-300': $i18n.locale === 'zh' }"
                        @click="changeLang('zh')"
                      >
                        中文
                      </div>
                      <div class="select-none text-lg">/</div>
                      <div
                        class="cursor-pointer select-none text-lg"
                        :class="{ 'text-emerald-300': $i18n.locale === 'en' }"
                        @click="changeLang('en')"
                      >
                        English
                      </div>
                    </div>
                  </div>
                  <!-- 1.2 -->
                  <div class="mb-4">
                    <label class="mb-2 block text-lg font-bold"></label>
                    <div class="flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../../../store.js";
import Header from "../header/header.vue";
</script>

<script>
export default {
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style></style>
