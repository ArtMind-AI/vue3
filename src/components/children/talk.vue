<template>
  <div class="flex flex-1 items-center max-sm:flex-col-reverse gap-4 lg:justify-center xl:pl-48">
    <!-- container-left -->
    <div
      class="diyborder flex h-[calc(100vh-130px)] w-1/2 max-sm:w-full  min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b]">
      <!-- begin：声线 -->
      <div class="mt-6 flex gap-6 px-6">
        <select id="selectFruit" v-model="selectedFruit"
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
      <!-- begin：生成 -->
      <div class="myborder mt-6 px-6">
        <button
          class="bg-ptb text-grey diyborder w-full rounded-lg p-2 text-center transition-transform active:scale-90"
          @click="upload()">
          生成
        </button>
      </div>
      <!-- begin：img -->
      <div class="mt-6 flex-1 overflow-y-auto px-6">
        <div class="grid grid-cols-3 gap-4 lg:grid-cols-4">
          <div v-for="(image, index) in imagesStore.images" :key="index" class="diyborder rounded-lg active:scale-95"
            :class="{ ' opacity-50': selectimg === index }" @click="selectImage(index)">
            <img :src="getImageUrl(image)" alt="image" class="aspect-square w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    <!-- container-right -->
    <div
      class="diyborder flex h-[calc(100vh-130px)] w-1/2 max-sm:w-full  min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b] p-6">
      <!-- video -->
      <div class="relative">
        <!-- 视频 -->
        <video playsinline autoplay :controls="isShowOperate" @mouseover="handleMouseOver()"
          @mouseout="handleMouseOut()" :src="videoUrl" ref="videoplay"
          class="diyborder mx-auto aspect-square w-48 rounded-lg"></video>
        <!-- 骨架屏 -->
        <div
          class="absolute left-[calc(50%-6rem)] top-0 z-30 flex aspect-square h-48 w-48 items-center justify-center rounded-lg bg-white"
          :class="{ hidden: loading === false }">
          <div class="loader aspect-square w-16"></div>
        </div>
      </div>
      <!-- chat -->
      <div class="mt-6 flex flex-1 flex-col overflow-y-auto">
        <div class="other-message diyborder w-fit max-w-80 rounded-lg p-2 text-black">
          may the peace be with us!
        </div>
        <div v-for="(message, index) in messages" :key="index"
          :class="message.sender === 'user' ? 'user-message' : 'other-message'"
          class="diyborder w-fit max-w-80 rounded-lg p-2 text-black">
          {{ message.text }}
        </div>
      </div>
      <!-- word -->
      <div class="diyborder mt-6 rounded-lg bg-[#add8e6] p-4">
        <textarea class="diyborder w-full resize-none rounded-lg bg-[#f5f5dc] p-2 text-lg text-black outline-none"
          placeholder="" v-model="chat" rows="4"></textarea>
        <div class="mt-2">
          <button
            class="rounded-lg border-b-[4px] border-blue-600 bg-blue-500 px-6 py-2 text-white active:brightness-90"
            @click="addBox">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useImagesStore } from "@/store/image.js";
import { getImageUrl, getBlobFromUrl, useFetchImage } from "@/utils/utils.js"
import axios from "axios";

const imagesStore = useImagesStore();
const selectimg = ref(0); //选择图片
const messages = ref([]); //聊天板文字
const chat = ref(""); //用户输入
const selectedFruit = ref("普通话女声"); //默认音色
const loading = ref(false);
const videoUrl = ref(null); // 视频url
const defaultUrl = ref(null); // 视频默认url
const videoplay = ref(null); // 视频ref
const isShowOperate = ref(false); // 视频控制台

// 使用 fetch 获取本地图片文件内容
useFetchImage()

// 页面加载好组件后为视频组件添加事件
onMounted(() => {
  videoUrl.value = "/assets/mp4/star.mp4";
  defaultUrl.value = "/assets/mp4/city.mp4";
  videoplay.value.addEventListener("ended", handleVideoEnded);
  videoplay.value.addEventListener("loadedmetadata", function () {
    this.playbackRate = 10; // 设置播放速度为 0.7x
  });
});

// 视频结束后切换会默认视频
const handleVideoEnded = () => {
  if (videoUrl.value != defaultUrl.value) {
    videoUrl.value = defaultUrl.value;
  }
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

// generate-content
const addBox = async () => {
  if (chat.value.length != 0) {
    try {
      messages.value.push({ text: chat.value, sender: "user" });
      const send = chat.value;
      chat.value = "";

      // 发送文字请求
      const response = await axios.post(
        "http://localhost:3000/generate-content",
        {
          title: send,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      console.log(response.data);

      // 获取文字回复
      const wordres = await axios.get("/后端传回文字URL");
      messages.value.push({ text: wordres.data, sender: "other" });

      // 获取视频文件
      const videores = await axios.get("/后端传回视频文件URL", { responseType: "blob" });
      videoUrl.value = getImageUrl(videores.data);
      await videoplay.value.play();
    } catch (error) {
      console.error(error);
    }
  }
};

// 生成数字人
const upload = async () => {
  loading.value = true;

  try {
    const formData = new FormData();
    formData.append("image", imagesStore.images[selectimg.value]);
    formData.append("voice", selectedFruit.value);

    // 发送数字人生成请求
    const response = await axios.post("http://localhost:3000/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000, // 设置超时时间为10秒
    })
    console.log(response.data);

    // 获取静态视频
    const videores = await axios.get("/后端传回视频文件URL", {
      responseType: "blob",
    });
    defaultUrl.value = getImageUrl(videores.data); // 生成默认bloburl
    videoUrl.value = defaultUrl.value; // 视频url切换
    await videoplay.value.play(); // 视频播放
  } catch (error) {
    console.error(error);
    alert("上传失败，请重试");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import "/src/assets/components/aiChat.css";
</style>
