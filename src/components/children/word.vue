<template>
  <div class="flex flex-1 items-center gap-4 lg:justify-center xl:pl-48">
    <!-- container-left -->
    <div
      class="diyborder flex h-[calc(100vh-120px)] w-1/2 min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b]"
    >
      <!-- begin：声线 -->
      <div class="mt-6 flex gap-6 px-6">
        <select
          id="selectFruit"
          v-model="selectedvoice"
          class="bg-ptb text-grey diyborder h-10 w-1/2 rounded-lg text-center outline-none"
        >
          <option value="普通话女声">普通话女声</option>
          <option value="粤语男声">粤语男声</option>
        </select>
        <!-- begin：添加图片 -->
        <input
          ref="fileInput"
          type="file"
          @change="handleFileChange"
          style="display: none"
        />
        <button
          class="bg-ptb text-grey diyborder h-10 w-1/2 rounded-lg text-center transition-transform active:scale-90"
          @click="$refs.fileInput.click()"
        >
          添加图片
        </button>
      </div>
      <!-- begin: text -->
      <div class="mt-6 px-6">
        <div class="relative w-full">
          <label
            for="input"
            class="bg-ptb absolute -top-3 left-2 z-20 rounded-md px-1 text-[#7480ff]"
            >特征:</label
          >
          <textarea
            class="bg-ptb diyborder w-full resize-none rounded-lg p-2 text-black outline-none"
            placeholder="write here..."
            v-model="feature"
            :rows="rows"
          ></textarea>
        </div>
      </div>
      <!-- begin：生成 -->
      <div class="myborder mt-6 px-6">
        <button
          class="bg-ptb text-grey diyborder w-full rounded-lg p-2 text-center transition-transform active:scale-90"
          @click="uploadbyword()"
        >
          生成
        </button>
      </div>
      <!-- begin：img -->
      <div class="mt-6 flex-1 overflow-y-auto px-6">
        <div class="grid grid-cols-3 gap-4 lg:grid-cols-4">
          <div
            v-for="(image, index) in imagesStore.images"
            :key="index"
            class="diyborder rounded-lg active:scale-95"
            :class="{ 'opacity-50': selectimg === index }"
            @click="selectImage(index)"
          >
            <img
              :src="getImageUrl(image)"
              alt="image"
              class="aspect-square w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- container-right -->
    <div
      class="diyborder flex h-[calc(100vh-120px)] w-1/2 min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b] p-6"
    >
      <!-- video -->
      <div class="relative mt-6">
        <video
          autoplay
          :controls="isShowOperate"
          @mouseover="handleMouseOver()"
          @mouseout="handleMouseOut()"
          :src="videoUrl"
          ref="videoplay"
          class="diyborder mx-auto aspect-square w-72 rounded-lg"
        ></video>
        <div
          class="absolute left-[calc(50%-9rem)] top-0 z-30 flex aspect-square h-72 w-72 items-center justify-center rounded-lg bg-white"
          :class="{ hidden: loading === false }"
        >
          <div class="loader aspect-square w-16"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useImagesStore } from "/src/store/image.js";
import axios from "axios";

const imagesStore = useImagesStore(); // pinia中图片全局变量
const selectimg = ref(0); // 选择图片
const selectedvoice = ref("普通话女声"); // 默认音色
const feature = ref(null); // 特征文字
const rows = ref(4); // 特征输入行数
const loading = ref(false); // 视频加载
const videoUrl = ref(null); // 视频url
const defaultUrl = "/assets/mp4/city.mp4"; // 视频默认url
const videoplay = ref(null); // 视频ref
const isShowOperate = ref(false); // 视频控制台

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

// 页面加载好组件后为视频组件添加事件
onMounted(() => {
  videoUrl.value = "/assets/mp4/star.mp4";
  videoplay.value.addEventListener("ended", handleVideoEnded);
  videoplay.value.addEventListener("loadedmetadata", function () {
    this.playbackRate = 1; // 设置播放速度为 0.7x
  });
});

// 视频结束后切换会默认视频
const handleVideoEnded = () => {
  videoUrl.value = defaultUrl;
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

// 得到blob对象的url数据
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
    alert("请选择JPEG或PNG格式的图片文件.");
  }
};

//图片高亮 yes
const selectImage = (index) => {
  selectimg.value = index;
};

//生成数字人
const uploadbyword = async () => {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("image", imagesStore.images[selectimg.value]);
    formData.append("voice", selectedvoice.value);
    formData.append("feature", feature.value);

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
    setTimeout(() => {
      loading.value = false;
    }, 2000); // 延迟2秒
  }
};
</script>

<style></style>
