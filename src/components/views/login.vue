<template>
  <div class="fixed inset-0 z-30 bg-black bg-opacity-30 flex flex-col justify-center items-center">
    <Transition name="slide-up" mode="out-in">
      <!-- 登录 -->
      <div class="w-80 relative flex flex-col bg-[#d3d3d3] diyborder rounded-md px-6" v-if="loginSwitch === 0">
        <span class="block text-center text-2xl font-bold text-[#323232] py-12">登录</span>
        <!-- email -->
        <div>
          <input
            class="w-full diyborder bg-white rounded-md leading-9 px-2 outline-none active:scale-105 transition-transform"
            type="email" placeholder="email" v-model="usr_email">
        </div>
        <!-- password -->
        <div class="mt-6">
          <input
            class="w-full diyborder bg-white rounded-md leading-9 px-2 outline-none active:scale-105 transition-transform"
            type="password" placeholder="password" v-model="usr_password">
        </div>
        <!-- login-button -->
        <div class="flex justify-center my-12">
          <button
            class="bg-[#323232] w-24 h-9 diyborder text-white rounded-md active:scale-105 transition-transform">登录</button>
        </div>
        <!-- exit -->
        <div class="absolute top-2 right-3">
          <span class="cursor-pointer text-[#323232] text-xl font-bold" @click="loginStore.loginSwitch">x</span>
        </div>
        <!-- loginSwitch -->
        <div class="absolute bottom-2 right-2">
          <span class="cursor-pointer text-[#323232] font-bold" @click="logintoggle(1)">注册...</span>
        </div>
      </div>
      <!-- 注册 -->
      <div class="w-80 relative flex flex-col bg-[#d3d3d3] diyborder rounded-md px-6" v-else-if="loginSwitch === 1">
        <span class="block text-center text-2xl font-bold text-[#323232] py-12">注册</span>
        <!-- email -->
        <div>
          <input
            class="w-full diyborder bg-white rounded-md leading-9 px-2 outline-none active:scale-105 transition-transform"
            type="email" placeholder="email" v-model="sign_email">
        </div>
        <!-- password -->
        <div class="mt-6">
          <input
            class="w-full diyborder bg-white rounded-md leading-9 px-2 outline-none active:scale-105 transition-transform"
            type="password" placeholder="password" v-model="sign_password">
        </div>
        <!-- login-button -->
        <div class="flex justify-center my-12">
          <button
            class="bg-[#323232] w-24 h-9 diyborder text-white rounded-md active:scale-105 transition-transform">注册</button>
        </div>
        <!-- exit -->
        <div class="absolute top-2 right-3">
          <span class="cursor-pointer text-[#323232] text-xl font-bold" @click="loginStore.loginSwitch">x</span>
        </div>
        <!-- loginSwitch -->
        <div class="absolute bottom-2 right-2">
          <span class="cursor-pointer text-[#323232] font-bold" @click="logintoggle(0)">登录...</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLoginStore } from "@/store/login.js";

const usr_email = ref('');
const usr_password = ref('');
const sign_email = ref('');
const sign_password = ref('');
const loginSwitch = ref(0);
const loginStore = useLoginStore(); // pinia中图片全局变量

const logintoggle = (index) => {
  loginSwitch.value = index;
}
</script>

<style scoped>
@import "/src/assets/components/shadow.css";
</style>
