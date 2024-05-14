<template>
  <div class="bg-btw relative flex min-h-screen">
    <Header />
    <div class="mx-auto mt-[60px] flex max-w-7xl flex-col px-16">
      <div class="mt-12 flex text-3xl font-bold">
        <router-link
          to="/startFun"
          class="text-ptb decoration-white hover:underline"
        >
          components
        </router-link>
        <span class="text-ptb">/Video Generation</span>
      </div>
      <div class="mt-8 flex flex-1 gap-8 max-lg:flex-col">
        <!-- chat -->
        <div
          class="flexbox bg-grey flex flex-1 flex-col gap-4 rounded-t-xl p-6 max-lg:rounded-b-xl"
        >
          <button
            class="bg-ptb text-grey h-10 w-16 rounded-md hover:bg-opacity-80"
            @click="changefunction"
          >
            切换
          </button>
          <!-- begin: voice -->
          <div class="flex gap-8">
            <select
              v-if="funpage === 0"
              id="selectFruit"
              v-model="selectedFruit"
              class="h-10 w-1/2 rounded-sm border-2 border-gray-300 bg-white text-center text-[#414868] outline-none transition-colors duration-300 hover:border-blue-500"
            >
              <option value="普通话女声">普通话女声</option>
              <option value="粤语男声">粤语男声</option>
            </select>
            <input
              v-if="funpage === 1"
              ref="audioInput"
              type="file"
              @change="handleAudioChange"
              style="display: none"
            />
            <button
              class="h-10 w-1/2 rounded-md bg-[#A979FF] text-center text-white"
              v-if="funpage === 1"
              @click="$refs.audioInput.click()"
            >
              选择音频素材
            </button>
            <!-- begin：添加图片 -->
            <input
              ref="fileInput"
              type="file"
              @change="handleFileChange"
              style="display: none"
            />
            <button
              class="h-10 w-1/2 rounded-md border-2 border-[#A979FF] text-center text-[#A979FF] transition-colors duration-300 hover:bg-[#A979FF] hover:text-black"
              @click="$refs.fileInput.click()"
            >
              添加图片
            </button>
          </div>
          <div
            class="flex h-10 w-full items-center rounded-md border-2 border-[#A979FF] px-2"
            v-if="funpage === 1"
          >
            <input
              v-if="selectedaudio"
              v-model="selectedaudio.name"
              class="bg-[#414868] text-white outline-none"
            />
          </div>
          <!-- begin：生成 -->
          <div>
            <button
              class="bg-ptb w-full rounded-md p-2 text-center text-black hover:bg-opacity-80"
              @click="uploadbyWord()"
              v-if="funpage === 0"
            >
              生成
            </button>
            <button
              class="bg-ptb w-full rounded-md p-2 text-center text-black hover:bg-opacity-80"
              @click="uploadbyaudio()"
              v-if="funpage === 1"
            >
              生成
            </button>
          </div>
          <!-- begin: text -->
          <div v-if="funpage === 0">
            <textarea
              class="bg-ptb w-full resize-none rounded-lg border-4 border-white p-4 text-black outline-none"
              placeholder="输入信息"
              v-model="chat"
              :rows="rows"
              @keydown.enter.prevent="addBox"
            ></textarea>
          </div>
          <!-- begin：img -->
          <div class="scrollable-div grid grid-cols-4 gap-2 overflow-y-auto">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="aspect-square select-none rounded-md border-2 border-[#bb9af7] p-1 transition-colors duration-300"
              :class="{ 'bg-[#bb9af7]': selectimg === index }"
              @click="selectImage(index)"
            >
              <img
                :src="image"
                alt="image"
                class="aspect-square w-full rounded-md object-cover"
              />
            </div>
          </div>
        </div>
        <!-- video -->
        <div class="flex min-w-128 flex-col gap-4 max-lg:pb-8">
          <div class="text-ptb">video</div>
          <video
            ref="videoPlayer"
            id="media"
            autoplay
            class="bg-grey h-128 w-128 rounded-lg"
            :src="videoUrl"
          ></video>
          <div class="text-ptb">choice</div>
          <button class="bg-ptb text-grey rounded-md p-2">save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "../header/header.vue";
import axios from "axios";

const videoUrl = ref(null);
const videoPlayer = ref(null);
const chat = ref(""); //用户输入
const rows = ref(4); //输入栏列数
const selectedFruit = ref("普通话女声"); //默认音色
const selectedaudio = ref(null); //默认音色
const selectimg = ref(0); //选择图片
const images = ref([]); //图片墙
const funpage = ref(0);

//切换功能 yes
const changefunction = () => {
  if (funpage.value === 0) {
    funpage.value = 1;
  } else {
    funpage.value = 0;
  }
};

// 使用 fetch 获取本地图片文件内容 yes
fetch("src/assets/img/0.jpg")
  .then((response) => response.blob())
  .then((blob) => {
    // 创建 File 对象
    const localImageFile = new File([blob], "0.jpg", { type: "image/jpeg" });
    // 将 File 对象添加到 images 数组中
    images.value.push(URL.createObjectURL(localImageFile));
  });

//用户上传图片到图片墙 yes
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    images.value.push(URL.createObjectURL(file));
    console.log(images.value);
    // 处理文件逻辑，例如上传文件等
  } else {
    console.error("请选择JPEG或PNG格式的图片文件.");
  }
};

//图片高亮 yes
const selectImage = (index) => {
  selectimg.value = index;
  console.log("selectimg = " + selectimg.value);
  console.log("index = " + index);
  if (selectimg.value === index) {
    console.log(true);
  }
};

//上传图片模块 yes
const uploadImg = async () => {
  try {
    const imgUrl = images.value[selectimg.value];
    console.log("imgUrl = " + imgUrl);

    // 使用 fetch 获取图片
    const response = await fetch(imgUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    // 获取图片 Blob 数据并添加到 FormData
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("file", blob, "image.png");

    // 上传图片
    await axios.post("http://localhost:3000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("添加图片成功");
  } catch (error) {
    console.error(error);
  }
};

//上传音色得到视频 yes
const uploadbyWord = async () => {
  try {
    // 等待图片上传
    await uploadImg();

    // 上传文字和音色选项
    await axios.post(
      "/后端接受文字音色URL",
      {
        title: chat.value,
        voice: selectedFruit.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data", // 修改请求头
        },
      },
    );

    // 得到后端视频
    const videoResponse = await axios.get("/后端传回视频文件URL", {
      responseType: "blob",
    });

    // 播放视频
    const videoBlob = videoResponse.data;
    videoUrl.value = URL.createObjectURL(videoBlob);
    await videoPlayer.value.play();
  } catch (error) {
    console.error(error);
  }
};

//用户上传音频文件 yes
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

//上传音频文件得到视频 yes
const uploadbyaudio = async () => {
  try {
    // 等待图片上传
    await uploadImg();

    const formData = new FormData();
    formData.append("audioFile", selectedaudio.value);

    // 上传音频文件
    await axios.post("/后端接受音色文件URL", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // 得到后端视频
    const response = await axios.get("/后端传回视频文件URL", {
      responseType: "blob",
    });

    // 播放视频
    const videoBlob = response.data;
    videoUrl.value = URL.createObjectURL(videoBlob);
    await videoPlayer.value.play();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
@import "../../assets/components/aiChat.css";
</style>
