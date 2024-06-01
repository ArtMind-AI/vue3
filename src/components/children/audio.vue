<template>
  <div class="flex flex-1 gap-4 lg:justify-center xl:pl-48">
    <!-- container-left -->
    <div class="diyborder my-6 flex w-1/2 min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b]">
      <!-- begin：声线 -->
      <div class="mt-6 flex gap-6 px-6">
        <select id="selectFruit" v-model="selectedvoice"
          class="bg-ptb text-grey diyborder h-10 w-1/2 rounded-lg text-center outline-none">
          <option value="普通话女声">普通话女声</option>
          <option value="粤语男声">粤语男声</option>
        </select>
        <!-- begin：添加图片 -->
        <input ref="fileInput" type="file" @change="handleFileChange" style="display: none" />
        <button
          class="bg-ptb text-grey diyborder h-10 w-1/2 rounded-lg text-center transition-transform active:scale-90"
          @click="$refs.fileInput.click()">
          添加图片
        </button>
      </div>
      <!-- begin: text -->
      <div class="mt-6 px-6">
        <div class="relative w-full">
          <label for="input" class="bg-ptb absolute -top-3 left-2 z-20 rounded-md px-1 text-[#7480ff]">特征:</label>
          <textarea class="bg-ptb diyborder w-full resize-none rounded-lg p-2 text-black outline-none"
            placeholder="write here..." v-model="feature" :rows="rows"></textarea>
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
import { useImagesStore } from "/src/store/image.js";

const imagesStore = useImagesStore();
const selectimg = ref(0); //选择图片
const feature = ref(null);
const rows = ref(4);

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

//图片高亮 yes
const selectImage = (index) => {
  selectimg.value = index;
};
</script>

<style></style>
