<template>
  <div>
    <Header />
    <div class="bg-btw">
      <div class="mx-auto max-w-[88rem] px-6">
        <!-- top -->
        <div class="flex">
          <div class="mx-auto mt-6 flex">
            <div class="flex flex-col justify-center gap-4">
              <div class="text-center text-5xl font-bold text-white">
                <span class="text-sky-500">Art</span> Mind
              </div>
              <div class="text-center text-3xl font-bold text-white">
                Interstellar Development Experience
              </div>
              <div class="mt-4 flex justify-center gap-4">
                <router-link to="/ai">
                  <button
                    class="group relative flex h-14 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-md border bg-sky-800 p-2 font-extrabold text-sky-50 duration-500 hover:border-sky-600"
                  >
                    <div
                      class="absolute z-10 h-48 w-48 rounded-full bg-sky-900 transition-all delay-150 duration-500 ease-in-out group-hover:scale-150 group-hover:delay-75"
                    ></div>
                    <div
                      class="absolute z-10 h-40 w-40 rounded-full bg-sky-800 transition-all delay-150 duration-500 ease-in-out group-hover:scale-150 group-hover:delay-100"
                    ></div>
                    <div
                      class="absolute z-10 h-32 w-32 rounded-full bg-sky-700 transition-all delay-150 duration-500 ease-in-out group-hover:scale-150 group-hover:delay-150"
                    ></div>
                    <div
                      class="absolute z-10 h-24 w-24 rounded-full bg-sky-600 transition-all delay-150 duration-500 ease-in-out group-hover:scale-150 group-hover:delay-200"
                    ></div>
                    <div
                      class="absolute z-10 h-16 w-16 rounded-full bg-sky-500 transition-all delay-150 duration-500 ease-in-out group-hover:scale-150 group-hover:delay-300"
                    ></div>
                    <p class="z-10">Get started</p>
                  </button>
                </router-link>
                <router-link to="/documents">
                  <button
                    class="before:content[''] after:content[''] group relative h-14 w-52 origin-left overflow-hidden rounded-lg border bg-sky-800 p-3 text-left text-base font-bold text-gray-50 underline underline-offset-2 duration-500 before:absolute before:right-1 before:top-1 before:z-10 before:h-12 before:w-12 before:rounded-full before:bg-sky-400 before:blur-lg before:duration-500 after:absolute after:right-8 after:top-3 after:z-10 after:h-20 after:w-20 after:rounded-full after:bg-cyan-600 after:blur after:duration-500 hover:border-sky-300 hover:bg-sky-300 hover:text-sky-900 hover:underline hover:decoration-2 hover:underline-offset-4 hover:duration-500 hover:before:-bottom-8 hover:before:right-16 hover:before:top-8 hover:before:blur-none hover:after:-right-2 hover:after:scale-150 hover:after:blur-none group-hover:before:duration-500 group-hover:after:duration-1000"
                  >
                    Docs
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- carousel -->
        <article class="mt-6">
          <carousel />
        </article>
        <div
          class="mt-4 flex w-full rounded-xl bg-[#1d232a] shadow max-lg:flex-col max-lg:divide-y-2 lg:divide-x"
        >
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-8 w-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Total Likes</div>
            <div class="stat-value text-primary">25.6K</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-8 w-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Page Views</div>
            <div class="stat-value text-secondary">2.6M</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <div class="avatar online">
                <div class="w-16 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
            </div>
            <div class="stat-value">86%</div>
            <div class="stat-title">Tasks done</div>
            <div class="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Footer from "../others/footer.vue";
import carousel from "../others/carousel.vue";
</script>

<style scoped>
/* Your scoped styles go here */
</style>
