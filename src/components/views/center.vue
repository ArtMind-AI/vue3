<template>
  <div class="bg-btw h-screen">
    <Header />
    <div class="mx-auto max-w-7xl px-6">
      <div class="mt-6">
        <div class="flex gap-4 max-md:flex-col md:items-end">
          <div>
            <img
              src="/assets/img/0.jpg"
              class="diyborder h-64 w-64 rounded-xl"
            />
          </div>
          <div class="diyborder max-w-fit gap-4 rounded-xl bg-[#525e7b] p-4">
            <div
              class="diyborder flex h-8 w-40 items-center justify-center rounded-xl bg-[#f5f5dc]"
            >
              <span class="text-black">tillicofess</span>
            </div>
            <div class="diyborder mt-4 h-8 w-64 rounded-xl bg-[#f5f5dc]"></div>
          </div>
        </div>
        <div role="tablist" class="myshadow tabs-boxed tabs ml-1 mt-6 w-96">
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active': Num === 0 }"
            @click="changenum(0)"
            >喜爱</a
          >
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active': Num === 1 }"
            @click="changenum(1)"
            >仓库</a
          >
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active': Num === 2 }"
            @click="changenum(2)"
            >上传</a
          >
        </div>
        <div
          class="mb-6 mt-3 h-128 w-full rounded-xl border-2 border-[#54555e]"
        >
          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../header/header.vue";
import { ref } from "vue";

const Num = ref(0);

const changenum = (index) => {
  Num.value = index;
};
</script>

<style scoped>
@import "/src/assets/components/shadow.css";
</style>
