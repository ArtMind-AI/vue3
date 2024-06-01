<template>
  <div class="flex flex-1 gap-4 lg:justify-center xl:pl-48">
    <!-- container-left -->
    <div class="diyborder my-6 flex w-1/2 min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b]">
      <!-- begin：声线 -->
      <div class="mt-6 flex gap-6 px-6">
        <!-- begin: 添加音频 -->
        <input ref="audioInput" type="file" @change="handleAudioChange" style="display: none" />
        <button
          class="text-grey diyborder h-10 w-1/2 rounded-lg bg-[#f5f5dc] text-center transition-transform active:scale-90"
          @click="$refs.audioInput.click()">
          添加音频
        </button>
        <!-- begin：添加图片 -->
        <input ref="fileInput" type="file" @change="handleFileChange" style="display: none" />
        <button
          class="bg-ptb text-grey diyborder h-10 w-1/2 rounded-lg text-center transition-transform active:scale-90"
          @click="$refs.fileInput.click()">
          添加图片
        </button>
      </div>
      <!-- 音频文件详细 -->
      <div class="mt-6 px-6">
        <div class="bg-ptb diyborder flex h-10 w-full items-center rounded-lg">
          <input v-if="selectedaudio" v-model="selectedaudio.name"
            class="bg-ptb overflow-x-auto px-2 text-black outline-none" />
        </div>
      </div>
      <!-- begin：img -->
      <div class="mt-6 flex-1 overflow-y-auto px-6">
        <div class="grid grid-cols-3 gap-4 lg:grid-cols-4">
          <div v-for="(image, index) in imagesStore.images" :key="index" class="diyborder rounded-lg active:scale-95"
            :class="{ 'opacity-50': selectimg === index }" @click="selectImage(index)">
            <img :src="getImageUrl(image)" alt="image" class="aspect-square w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    <!-- container-right -->
    <div class="diyborder my-6 flex w-1/2 min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b] p-6">
      <!-- video -->
      <div class="relative mt-6">
        <img src="/assets/img/0.jpg" class="diyborder mx-auto aspect-square w-72 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
const selectedvoice = ref("普通话女声"); //默认音色
const selectedaudio = ref(null);
import { useImagesStore } from "/src/store/image.js";

const imagesStore = useImagesStore();
const selectimg = ref(0); //选择图片

// 使用 fetch 获取本地图片文件内容
onBeforeMount(() => {
  if (imagesStore.images.length === 0) {
    // 使用 fetch 获取本地图片文件内容
    fetch("/assets/img/0.jpg")
      .then((response) => response.blob())
      .then((blob) => {
        // 直接将 Blob 对象存储到 images 数组中
        imagesStore.addImage(blob);
      });
  }
});

//得到blob对象的url数据
const getImageUrl = (blob) => {
  return URL.createObjectURL(blob);
};

// 获取 Blob URL 对应的 Blob 对象
async function getBlobFromUrl(blobUrl) {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching blob:", error);
    return null;
  }
}

//用户上传音频文件
const handleAudioChange = (event) => {
  const file = event.target.files[0];
  if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
    selectedaudio.value = file;
    console.log(selectedaudio.value);
    // 处理文件逻辑，例如上传文件等
  } else {
    console.error("请选择MP3或WAV格式的音频文件.");
  }
};

// 用户上传图片到图片墙
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    const blob = await getBlobFromUrl(getImageUrl(file));
    imagesStore.addImage(blob);
    console.log("images.value = " + images.value);
    // 处理文件逻辑，例如上传文件等
  } else {
    console.error("请选择JPEG或PNG格式的图片文件.");
  }
};

//图片高亮
const selectImage = (index) => {
  selectimg.value = index;
};
</script>

<style></style>
