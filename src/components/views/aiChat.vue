<template>
  <Header class="hidden" />
  <div class="back relative flex h-screen overflow-auto">
    <div class="mx-auto flex flex-col justify-center px-8">
      <div class="flex items-end gap-2">
        <div class="relative flex h-128 w-128 flex-col">
          <!-- 选项卡 -->
          <div role="tablist" class="tabs-boxed tabs absolute -top-12">
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active': currentNum === 0 }"
              @click="changenum(0)"
              >文字生成</a
            >
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active': currentNum === 1 }"
              @click="changenum(1)"
              >音频生成</a
            >
          </div>
          <!-- 文字生成 -->
          <div
            class="bg-grey border-ptb flex flex-1 flex-col gap-2 rounded-xl border-2 p-2"
            :class="{ hidden: currentNum != 0 }"
          >
            <!-- begin: voice -->
            <div class="flex gap-2">
              <select
                id="selectFruit"
                v-model="selectedFruit"
                class="bg-ptb text-grey h-10 w-1/2 rounded-lg text-center outline-none transition-colors duration-300 hover:border-blue-500"
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
                class="bg-ptb text-grey h-10 w-1/2 rounded-lg text-center"
                @click="$refs.fileInput.click()"
              >
                添加图片
              </button>
            </div>
            <!-- begin: text -->
            <textarea
              class="bg-ptb w-full resize-none rounded-lg p-2 text-black outline-none"
              placeholder="特征"
              v-model="chat"
              :rows="rows"
            ></textarea>
            <!-- begin：生成 -->
            <div>
              <button
                class="bg-ptb w-full rounded-lg p-2 text-center text-black hover:bg-opacity-80"
                @click="uploadbyWord()"
              >
                生成
              </button>
            </div>
            <!-- begin：img -->
            <div class="grid max-h-72 grid-cols-4 gap-4 overflow-auto">
              <div
                v-for="(image, index) in images"
                :key="index"
                class="aspect-square select-none rounded-lg border-2 transition-colors duration-300"
                :class="{ 'border-ptb': selectimg === index }"
                @click="selectImage(index)"
              >
                <img
                  :src="image"
                  alt="image"
                  class="aspect-square w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          <!-- 音频生成 -->
          <div
            class="bg-grey border-ptb flex flex-1 flex-col gap-2 rounded-xl border-2 p-2"
            :class="{ hidden: currentNum != 1 }"
          >
            <!-- begin: voice -->
            <div class="flex gap-4">
              <input
                ref="audioInput"
                type="file"
                @change="handleAudioChange"
                style="display: none"
              />
              <button
                class="h-10 w-1/2 rounded-lg bg-[#A979FF] text-center text-white"
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
                class="bg-ptb text-grey h-10 w-1/2 rounded-lg text-center"
                @click="$refs.fileInput.click()"
              >
                添加图片
              </button>
            </div>
            <!-- 音频文件详细 -->
            <div
              class="flex h-10 w-full items-center rounded-lg border-2 border-[#A979FF] px-2"
            >
              <input
                v-if="selectedaudio"
                v-model="selectedaudio.name"
                class="bg-[#414868] text-white outline-none"
              />
            </div>
            <!-- 生成按钮 -->
            <div>
              <button
                class="bg-ptb w-full rounded-lg p-2 text-center text-black hover:bg-opacity-80"
                @click="uploadbyaudio()"
              >
                生成
              </button>
            </div>
            <!-- img -->
            <div class="grid max-h-72 grid-cols-4 gap-4 overflow-auto">
              <div
                v-for="(image, index) in images"
                :key="index"
                class="aspect-square select-none rounded-lg border-2 transition-colors duration-300"
                :class="{ 'border-ptb': selectimg === index }"
                @click="selectImage(index)"
              >
                <img
                  :src="image"
                  alt="image"
                  class="aspect-square w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- video -->
        <div class="flex aspect-square w-168 gap-4">
          <video
            ref="videoPlayer"
            id="media"
            autoplay
            class="bg-grey border-ptb rounded-xl border-2"
            :src="videoUrl"
          ></video>
        </div>
      </div>
      <!-- select -->
      <Menu />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "../header/header.vue";
import Menu from "../others/menu.vue";
import axios from "axios";

const videoUrl = ref(null);
const videoPlayer = ref(null);
const chat = ref(""); //用户输入
const rows = ref(3); //输入栏列数
const selectedFruit = ref("普通话女声"); //默认音色
const selectedaudio = ref(null); //默认音色
const selectimg = ref(0); //选择图片
const images = ref([]); //图片墙
const currentNum = ref(0);

const changenum = (index) => {
  currentNum.value = index;
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
