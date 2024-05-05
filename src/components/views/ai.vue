<template>
  <Header class="hidden" />
  <div class="back relative flex h-screen overflow-auto">
    <!-- header -->
    <ul class="absolute left-12 top-12 w-28">
      <router-link to="/ai">
        <li class="text-xl border-b-4 border-ptb py-2 pl-4 cursor-pointer hover:text-blue-300"
          :class="{ 'text-blue-300': $route.path === '/ai' }">ai Chat</li>
      </router-link>
      <router-link to="/makeVideo">
        <li class="text-xl border-b-4 border-ptb py-2 pl-4 cursor-pointer hover:text-yellow-300"
          :class="{ 'text-yellow-300': $route.path === '/makeVideo' }">make Video</li>
      </router-link>
      <li class="text-xl border-b-4 border-ptb py-2 pl-4 cursor-pointer hover:text-green-300"
        :class="{ 'text-green-300': $route.path === '/' }"><a>Item 3</a></li>
    </ul>
    <div class="mx-auto flex flex-col justify-center px-8">
      <div class="flex items-end">
        <!-- chat -->
        <div class="border-ptb flex h-128 w-128 flex-col gap-8 border-l-4 border-t-4 border-b-4">
          <div class="bg-grey flex flex-1 flex-col gap-8 p-6">
            <div class="scrollable-div flex max-h-[370px] flex-1 flex-col overflow-y-auto">
              <div class="other-message text-ptb text-lg">
                AI C
              </div>
              <div v-for="(message, index) in messages" :key="index" :class="message.sender === 'user' ? 'user-message' : 'other-message'
            " class="text-ptb py-1 text-lg">
                {{ message.text }}
              </div>
            </div>
            <div class="flex-0 flex items-center">
              <div class="bg-ptb flex h-12 w-full items-center rounded-lg">
                <textarea class="bg-ptb mx-4 w-full resize-none text-lg text-black outline-none" placeholder="输入信息"
                  v-model="chat" :rows="rows" @keydown.enter.prevent="addBox"></textarea>
              </div>
              <button @click="addBox1" class="bg-btw text-ptg btn btn-md ml-2 rounded-md border-0">
                发送
              </button>
            </div>
          </div>
        </div>
        <!-- video -->
        <div class="border-ptb flex aspect-square w-168 gap-4 border-4">
          <video ref="videoPlayer" id="media" autoplay class="bg-grey" :src="videoUrl"></video>
        </div>
      </div>
      <!-- select -->
      <div
        class="bg-grey border-ptb mx-auto mt-8 flex items-center justify-center gap-4 rounded-3xl border-4 p-4 lg:w-3/5">
        <router-link to="/"><v-icon name="hi-solid-home" class="h-7 w-7 text-white" /></router-link>
        <span class="text-xl font-bold text-white">Art Mind</span>
        <v-icon name="hi-solid-arrow-left" class="h-7 w-7 text-white" />
        <div class="relative w-28">
          <router-link to="/documents"
            class="bg-grey border-ptb absolute -top-[56px] flex h-28 w-28 flex-col items-center justify-center border-4">
            <v-icon name="ai-academia" class="text-ptb z-20 h-16 w-16" />
            <span class="text-ptb text-lg">docs</span>
          </router-link>
        </div>
        <router-link to="/aiChat"><v-icon name="hi-solid-arrow-right" class="h-7 w-7 text-white" /></router-link>
        <router-link to="/startFun">
          <span class="text-xl font-bold text-white">tools</span>
        </router-link>
        <router-link to="/carousel"><v-icon name="ri-apps-fill" class="h-7 w-7 text-white" /></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Header from "../header/header.vue";

const messages = ref([]); //聊天板文字
const defaultVideoUrl = ref(""); // 你需要提前定义 defaultVideoUrl 的值
const videoUrl = ref("src/assets/img/welcome.mp4");
const videoPlayer = ref(null);
const chat = ref(""); //用户输入
const send = ref(""); //axios上传用户输入
const reply = ref(""); //后端传回文字
const rows = ref(1); //输入栏列数
const selectedFruit = ref("普通话女声"); //默认音色
const selectimg = ref(0); //选择图片
const images = ref([]); //图片墙

const handleVideoEnded = () => {
  // 当视频播放结束时，将视频设置为默认视频
  videoUrl.value = defaultVideoUrl.value;
  videoPlayer.value.load(); // 重新加载视频
  videoPlayer.value.addEventListener("loadedmetadata", function () {
    videoPlayer.value.playbackRate = 0.65; // 设置播放速度为 1.5x
  });
};

//默认视频
onMounted(async () => {
  try {
    const response = await axios.get("/video", { responseType: "blob" });
    const videoBlob = response.data;
    const url = URL.createObjectURL(videoBlob);
    videoUrl.value = url;

    // 在此处继续处理 URL
    videoPlayer.value.play();
  } catch (error) {
    console.error("Error fetching video:", error);
  }
});

// 添加事件监听器
onMounted(() => {
  videoPlayer.value.addEventListener("ended", handleVideoEnded);
  videoPlayer.value.addEventListener("loadedmetadata", function () {
    videoPlayer.value.playbackRate = 0.65; // 设置播放速度为 1.5x
  });
});

//上传音色 yes
const uploadVoice = async () => {
  try {
    const response = await axios.post("http://localhost:3000/upload-voice", {
      voice: selectedFruit.value,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
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

//个性化数字人 ok
const uploadImg = async () => {
  try {
    await uploadVoice();
    const imgUrl = images.value[selectimg.value];
    console.log("imgUrl = " + imgUrl);
    // 使用 fetch 获取图片
    const response = await fetch(imgUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const blob = await response.blob(); // 获取图片 Blob 数据
    const file = new File([blob], "image.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    await axios.post("http://localhost:3000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("添加图片成功");
    const videoResponse = await axios.get(
      "http://localhost:3000/api/get-video",
      {
        responseType: "blob",
      },
    );
    const videoBlob = await videoResponse.data;
    defaultVideoUrl.value = URL.createObjectURL(videoBlob);
  } catch (error) {
    console.error(error);
  }
};

//上传文字 ok
const addBox = async (event) => {
  event.preventDefault(); // 阻止回车键的默认行为
  // 处理回车键的换行问题
  if (event.key === "Enter" && !event.shiftKey) {
    try {
      console.log("chat.value = " + chat.value);
      messages.value.push({ text: chat.value, sender: "user" });
      send.value = chat.value;
      console.log("send.value = " + send.value);
      chat.value = "";

      // 发送 POST 请求
      await axios
        .post(
          "http://localhost:3000/text",
          { title: send.value },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then(async (response) => {
          console.log(response.data.message);
          send.value = ""; // 清空 send.value
          // 发送 GET 请求
          return axios.get("http://localhost:3000/text");
        })
        .then(async (response) => {
          reply.value = response.data;
          messages.value.push({ text: reply.value, sender: "other" });
          return axios.get("/后端传回视频文件URL", { responseType: "blob" });
        })
        .then(async (response) => {
          const videoBlob = await response.data;
          videoUrl.value = URL.createObjectURL(videoBlob);
          videoPlayer.value.play();
        });
    } catch (error) {
      console.error(error);
    }
  }
};

//回车上传文字
const addBox1 = async () => {
  try {
    console.log("chat.value = " + chat.value);
    messages.value.push({ text: chat.value, sender: "user" });
    send.value = chat.value;
    console.log("send.value = " + send.value);
    chat.value = "";
    // 发送 POST 请求
    await axios
      .post(
        "http://localhost:3000/text",
        { title: send.value },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(async (response) => {
        console.log(response.data.message);
        send.value = ""; // 清空 send.value
        // 发送 GET 请求
        return axios.get("http://localhost:3000/text");
      })
      .then(async (response) => {
        reply.value = response.data;
        messages.value.push({ text: reply.value, sender: "other" });
        return axios.get("/后端传回视频文件URL", { responseType: "blob" });
      })
      .then(async (response) => {
        const videoBlob = await response.data;
        videoUrl.value = URL.createObjectURL(videoBlob);
        videoPlayer.value.play();
      });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
@import "../../assets/components/aiChat.css";
</style>
