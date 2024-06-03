<template>
  <div class="flex flex-1 items-center max-sm:flex-col-reverse gap-4 lg:justify-center xl:pl-48">
    <!-- container-left -->
    <div
      class="diyborder flex h-[calc(100vh-130px)] w-1/2 max-sm:w-full  min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b]">
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
        <div class="bg-ptb diyborder flex h-10 w-full items-center rounded-lg select-text">
          <input v-if="selectedaudio" v-model="selectedaudio.name"
            class="bg-ptb overflow-x-auto px-2 text-black outline-none" readonly />
        </div>
      </div>
      <!-- begin：生成 -->
      <div class="myborder mt-6 px-6">
        <button
          class="bg-ptb text-grey diyborder w-full rounded-lg p-2 text-center transition-transform active:scale-90"
          @click="uploadbyaudio()">
          生成
        </button>
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
    <div
      class="diyborder flex h-[calc(100vh-130px)] w-1/2 max-sm:w-full  min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b] p-6">
      <!-- video -->
      <div class="relative mt-6">
        <video playsinline autoplay :controls="isShowOperate" @mouseover="handleMouseOver()"
          @mouseout="handleMouseOut()" :src="videoUrl" ref="videoplay"
          class="diyborder mx-auto aspect-square w-72 rounded-lg"></video>
        <div
          class="absolute left-[calc(50%-9rem)] top-0 z-30 flex aspect-square h-72 w-72 items-center justify-center rounded-lg bg-white"
          :class="{ hidden: loading === false }">
          <div class="loader aspect-square w-16"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useImagesStore } from "@/store/image.js";
const imagesStore = useImagesStore();
import { getImageUrl, getBlobFromUrl, useFetchImage } from "@/utils/utils.js"
import axios from "axios";

const selectimg = ref(0); //选择图片
const selectedaudio = ref(null);
const loading = ref(false); // 视频加载
const videoUrl = ref(null); // 视频url
const videoplay = ref(null); // 视频ref
const isShowOperate = ref(false); // 视频控制台

// 使用 fetch 获取本地图片文件内容
useFetchImage();

// 页面加载好组件后为视频组件添加事件
onMounted(() => {
  videoUrl.value = "/assets/mp4/star.mp4";
  videoplay.value.addEventListener("ended", handleVideoEnded);
  videoplay.value.addEventListener("loadedmetadata", function () {
    this.playbackRate = 10; // 设置播放速度为 0.7x
  });
});

// 视频结束后切换会默认视频
const handleVideoEnded = () => {
  videoplay.value.load();
};

// 移入视频出现控制台
const handleMouseOver = () => {
  isShowOperate.value = true;
};

// 移出视频隐藏控制台
const handleMouseOut = () => {
  isShowOperate.value = false;
};

//图片高亮 yes
const selectImage = (index) => {
  selectimg.value = index;
};

//用户上传音频文件
const handleAudioChange = (event) => {
  const file = event.target.files[0];
  if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
    selectedaudio.value = file;
    console.log(selectedaudio.value);
    // 处理文件逻辑，例如上传文件等
  } else {
    console.error("请选择MP3或WAV格式的音频文件.");
    alert("请选择MP3或WAV格式的音频文件.");
  }
};

// 用户上传图片到图片墙
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    const blob = await getBlobFromUrl(getImageUrl(file));
    imagesStore.addImage(blob);
    // 处理文件逻辑，例如上传文件等
  } else {
    console.error("请选择JPEG或PNG格式的图片文件.");
  }
};

//生成数字人
const uploadbyaudio = async () => {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("image", imagesStore.images[selectimg.value]);
    formData.append("audioFile", selectedaudio.value);

    // 使用 for...of 循环遍历 formData
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await axios
      .post("http://localhost:3000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000, // 设置超时时间为10秒
      })
      .then(() => {
        return axios.get("/后端传回视频文件URL", { responseType: "blob" });
      })
      .then((response) => {
        videoUrl.value = getBlobFromUrl(response);
        videoplay.value.play();
      });
    console.log(response.data);
  } catch (error) {
    console.log(error);
    alert("上传失败，请重试");
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
