<template>
  <div class="flex min-h-screen">
    <!-- Container -->
    <div class="flex w-full flex-row">
      <!-- Sidebar -->
      <div
        class="hidden flex-col justify-between bg-emerald-500 lg:flex lg:max-w-sm lg:p-8 xl:max-w-lg xl:p-12"
      >
        <div class="flex items-center justify-start space-x-3">
          <span class="h-8 w-8 rounded-full bg-black"></span>
          <a href="#" class="text-xl font-medium">Brand</a>
        </div>
        <div class="space-y-5">
          <h1 class="font-extrabold lg:text-3xl xl:text-5xl xl:leading-snug">
            Enter your account and discover new experiences
          </h1>
          <p class="text-lg">You do not have an account?</p>
          <button
            class="inline-block flex-none rounded-lg border-2 border-black bg-black px-4 py-3 font-medium text-white"
            @click="toregister"
          >
            Create account here
          </button>
        </div>
        <p class="font-medium">© 2022 Company</p>
      </div>

      <!-- Login -->
      <div
        class="relative flex flex-1 flex-col items-center justify-center px-10"
      >
        <div class="flex w-full items-center justify-between py-4 lg:hidden">
          <div class="flex items-center justify-start space-x-3">
            <span class="h-6 w-6 rounded-full bg-black"></span>
            <a href="#" class="text-lg font-medium">Brand</a>
          </div>
          <div class="flex items-center space-x-2">
            <span v-if="currentpage === 1">Not a member? </span>
            <span v-if="currentpage === 2">has account aleardy?</span>
            <a
              href="#"
              class="font-medium text-[#070eff] underline"
              @click="toregister"
              v-if="currentpage === 1"
            >
              Sign up now
            </a>
            <a
              href="#"
              class="font-medium text-[#070eff] underline"
              @click="tologin"
              v-if="currentpage === 2"
            >
              Sign in now
            </a>
          </div>
        </div>
        <!-- Sign up box -->
        <div
          class="flex max-w-md flex-1 flex-col justify-center space-y-5"
          v-if="currentpage === 2"
        >
          <div class="flex flex-col space-y-2 text-center">
            <h2 class="text-3xl font-bold md:text-4xl">Sign up to account</h2>
            <p class="text-md md:text-xl">
              Sign up or log in to place the order,no password require!
            </p>
          </div>
          <div class="flex max-w-md flex-col space-y-5">
            <form @submit.prevent="register" class="flex flex-col space-y-5">
              <input
                type="text"
                placeholder="Username"
                class="flex rounded-lg border-2 border-black px-3 py-2 font-medium placeholder:font-normal md:px-4 md:py-3"
                v-model="username"
              />
              <input
                type="text"
                placeholder="Password"
                class="flex rounded-lg border-2 border-black px-3 py-2 font-medium placeholder:font-normal md:px-4 md:py-3"
                v-model="password"
              />
              <div class="grid grid-cols-2 gap-5">
                <button
                  type="submit"
                  class="flex flex-none items-center justify-center rounded-lg border-2 border-black bg-black px-3 py-2 font-medium text-white md:px-4 md:py-3"
                >
                  Sign up
                </button>
                <button
                  @click="tologin"
                  class="flex flex-none items-center justify-center rounded-lg border-2 border-black bg-black px-3 py-2 font-medium text-white md:px-4 md:py-3"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div class="flex items-center justify-center">
              <span class="w-full border border-black"></span>
              <span class="px-4">Or</span>
              <span class="w-full border border-black"></span>
            </div>
            <button
              class="relative flex flex-none items-center justify-center rounded-lg border-2 border-black px-3 py-2 font-medium md:px-4 md:py-3"
            >
              <span class="absolute left-4">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    fill="#EA4335 "
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
              </span>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
        <!-- Sign in box -->
        <div
          class="flex max-w-md flex-1 flex-col justify-center space-y-5"
          v-if="currentpage === 1"
        >
          <div class="flex flex-col space-y-2 text-center">
            <h2 class="text-3xl font-bold md:text-4xl">Sign in to account</h2>
            <p class="text-md md:text-xl">
              Sign in or log in to place the order,no password require!
            </p>
          </div>
          <div class="flex max-w-md flex-col space-y-5">
            <form @submit.prevent="login" class="flex flex-col space-y-5">
              <input
                type="text"
                placeholder="Username"
                class="flex rounded-lg border-2 border-neutral px-3 py-2 font-medium outline-none placeholder:font-normal md:px-4 md:py-3"
                v-model="username"
              />
              <input
                type="text"
                placeholder="Password"
                class="flex rounded-lg border-2 border-neutral px-3 py-2 font-medium outline-none placeholder:font-normal md:px-4 md:py-3"
                v-model="password"
              />
              <button
                type="submit"
                class="btn btn-neutral flex border-2 border-neutral px-3 py-2 font-medium text-white md:px-4 md:py-3"
              >
                Sign in
              </button>
            </form>
            <div class="flex items-center justify-center">
              <span class="w-full border border-black"></span>
              <span class="px-4">Or</span>
              <span class="w-full border border-black"></span>
            </div>
            <button
              class="relative flex flex-none items-center justify-center rounded-lg border-2 border-black px-3 py-2 font-medium md:px-4 md:py-3"
            >
              <span class="absolute left-4">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    fill="#EA4335 "
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
              </span>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const username = ref("");
const password = ref("");
const currentpage = ref(1);
const router = useRouter();

const toregister = () => {
  currentpage.value = 2;
};

const tologin = () => {
  currentpage.value = 1;
};

const register = async () => {
  if (username.value != "" && password.value != "") {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username: username.value,
        password: password.value,
      });
      console.log(response.data.message);
      console.log(response);
      // 注册成功，跳转到登录页面
      if (response.status === 200) {
        // 跳转到登录页面的代码，例如使用 Vue Router 的方式跳转
        currentpage.value = 1;
        username.value = "";
        password.value = "";
        alert("sign up successfully");
      }
    } catch (error) {
      console.error(error.response.data.error);
    }
  } else {
    alert("账号或密码不可为空");
  }
};

// 在 Vue 组件中使用 Axios 发送登录请求
const login = async () => {
  if (username.value != "" && password.value != "") {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: username.value,
        password: password.value,
      });
      console.log(response.data.message);
      // 在这里处理登录成功的逻辑，例如保存用户信息到本地存储
      if (response.status === 200) router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
      // 在这里处理登录失败的逻辑
    }
  } else {
    alert("账号或密码不可为空");
  }
};
</script>
<style scoped></style>
