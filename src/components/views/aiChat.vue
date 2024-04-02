<template>
  <div class="relative flex min-h-screen bg-[#1a1b26]">
    <Header />
    <div
      class="mx-auto flex max-w-7xl items-center gap-24 px-8 max-lg:flex-col mt-[60px]"
    >
      <!-- chat -->
      <div class="flex h-full flex-col gap-8">
        <div class="mt-8 flex text-2xl font-bold">
          <router-link
            to="/startFun"
            class="text-[#c1caf4] decoration-white hover:underline"
          >
            components
          </router-link>
          <span class="text-[#c1caf4]">/Video Generation</span>
        </div>
        <!-- begin: chatcontent -->
        <div class="mt-8 flex h-168 flex-col gap-4 rounded-xl bg-[#414868] p-8">
          <button
            class="h-10 w-16 rounded-md bg-[#c1caf4] hover:bg-opacity-80"
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
              class="h-10 w-1/2 rounded-sm border-2 border-gray-300 text-center outline-none transition-colors duration-300 hover:border-blue-500"
            >
              <option value="普通话女声">普通话女声</option>
              <option value="粤语男声">粤语男声</option>
            </select>
            <input
              v-if="funpage === 1"
              ref="fileInput"
              type="file"
              @change="handleFileChange"
              style="display: none"
            />
            <button
              class="h-10 w-1/2 rounded-md bg-[#A979FF] text-center text-white"
              v-if="funpage === 1"
              @click="$refs.fileInput.click()"
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
          <!-- begin：生成 -->
          <div>
            <button
              class="w-full rounded-md bg-[#c1caf4] p-2 text-center text-black hover:bg-opacity-80"
              @click="uploadImg()"
            >
              生成
            </button>
          </div>
          <!-- begin: text -->
          <div v-if="funpage === 0">
            <textarea
              class="w-full resize-none rounded-lg border-4 border-white bg-[#c1caf4] p-4 text-white outline-none"
              placeholder="输入信息"
              v-model="chat"
              :rows="rows"
              @keydown.enter.prevent="addBox"
            ></textarea>
          </div>
          <!-- begin：img -->
          <div class="grid grid-cols-4 gap-4 overflow-y-auto pb-4">
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
      </div>
      <!-- video -->
      <div class="flex min-w-128 flex-col gap-8">
        <video
          ref="videoPlayer"
          id="media"
          autoplay
          class="h-128 w-128 rounded-lg border-4 border-white bg-[#414868]"
          :src="videoUrl"
        ></video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { store } from "../../../store";
import Header from "../header/header.vue";
import axios from "axios";

const messages = ref([]); //聊天板文字
const defaultVideoUrl = ref(""); // 你需要提前定义 defaultVideoUrl 的值
const videoUrl = ref("src/assets/img/welcome.mp4");
const videoPlayer = ref(null);
const chat = ref(""); //用户输入
const send = ref(""); //axios上传用户输入
const reply = ref(""); //后端传回文字
const rows = ref(4); //输入栏列数
const selectedFruit = ref("普通话女声"); //默认音色
const selectimg = ref(0); //选择图片
const images = ref([]); //图片墙
const funpage = ref(0);

const changefunction = () => {
  if (funpage.value === 0) {
    funpage.value = 1;
  } else {
    funpage.value = 0;
  }
};

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
