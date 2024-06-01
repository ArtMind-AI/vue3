<template>
  <div class="mx-auto min-h-[calc(100vh-68px)] max-w-7xl px-6 pt-6">
    <div class="flex h-full flex-1 flex-col gap-4">
      <div class="flex h-72 flex-row gap-4">
        <div class="bg-grey h-72 w-3/5 rounded-md diyborder"></div>
        <div class="bg-grey h-72 w-2/5 rounded-md diyborder"></div>
      </div>
      <ul class="grid grid-cols-6 gap-4">
        <li v-for="(item, index) in images" :key="index">
          <div class="h-60">
            <img :src="item.url" alt="Image description"
              class="object-fit aspect-square w-full cursor-pointer rounded-lg object-center" />
            <div class="text-ptb mt-1 h-9 cursor-pointer">
              {{ item.text }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

// 假设 images 数据是一个包含图片 URL 的数组
const images = [
  { url: "/assets/img/0.jpg", text: "1" },
  { url: "/assets/img/7.png", text: "2" },
  { url: "/assets/img/6.png", text: "3" },
  { url: "/assets/img/8.jpg", text: "4" },
  { url: "/assets/img/0797.png", text: "5" },
  { url: "/assets/img/4.jpg", text: "6" },
  { url: "/assets/img/3.png", text: "7" },
];
</script>

<style scoped></style>
