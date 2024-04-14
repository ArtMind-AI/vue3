<template>
  <div class="bg-btw relative flex min-h-screen">
    <Header />
    <div class="mx-auto mt-[60px] flex max-w-7xl flex-col justify-center px-16">
      <div class="flex pt-8 text-2xl font-bold">
        <router-link
          to="/startFun"
          class="text-ptb decoration-white hover:underline"
        >
          components
        </router-link>
        <span class="text-ptb">/ai Chat</span>
      </div>
      <div class="flex flex-1 gap-8 pt-8 max-lg:flex-col">
        <!-- chat -->
        <div class="flex flex-col gap-8">
          <div
            class="bg-grey flexbox flex flex-1 flex-col gap-8 rounded-t-xl p-4 max-lg:rounded-b-xl"
          >
            <div class="scrollable-div flex flex-1 flex-col overflow-y-auto">
              <div class="other-message text-ptb text-lg">
                AI Chat is an innovative platform that leverages artificial
                intelligence to facilitate seamless and intelligent
                conversations.
              </div>
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="
                  message.sender === 'user' ? 'user-message' : 'other-message'
                "
                class="text-ptb py-1 text-lg"
              >
                {{ message.text }}
              </div>
            </div>
            <div class="flex-0 flex items-center">
              <div class="bg-ptb flex h-12 w-full items-center rounded-lg">
                <textarea
                  class="bg-ptb mx-4 w-full resize-none text-lg text-black outline-none"
                  placeholder="输入信息"
                  v-model="chat"
                  :rows="rows"
                  @keydown.enter.prevent="addBox"
                ></textarea>
              </div>
              <button
                @click="addBox1"
                class="bg-btw text-ptg btn btn-md ml-2 rounded-md border-0"
              >
                发送
              </button>
            </div>
          </div>
        </div>
        <!-- video -->
        <div class="flex min-w-128 flex-col gap-4 max-lg:mb-8">
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
      <!-- 1个性化 -->
      <div
        class="bg-ptg fixed left-0 flex h-128 transform flex-col justify-center rounded-r-xl border-y-2 border-r-2 border-black px-2 text-black duration-300 hover:px-4 max-lg:top-1/3"
        @click="store.toggleShow()"
        v-if="!store.show"
      >
        <!-- 按钮文字在 y 轴上排列 -->
        <div>
          <div class="whitespace-nowrap">个</div>
          <div class="whitespace-nowrap">性</div>
          <div class="whitespace-nowrap">化</div>
        </div>
      </div>
      <!-- 2个性化展开 -->
      <div
        class="bg-ptg fixed left-0 flex h-128 w-128 flex-col gap-4 rounded-r-xl border-y-2 border-r-2 border-black p-8 max-lg:top-1/3"
        v-if="store.show"
      >
        <button
          class="absolute right-2 top-60 select-none text-3xl text-[#bb9af7]"
          @click="store.toggleShow()"
        >
          <
        </button>
        <!-- begin：声线 -->
        <div class="flex gap-8">
          <select
            id="selectFruit"
            v-model="selectedFruit"
            class="text-[#414868] h-10 w-1/2 rounded-sm border-2 border-gray-300 bg-white text-center outline-none transition-colors duration-300 hover:border-blue-500"
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
            class="h-10 w-1/2 rounded-sm bg-[#A979FF] text-center text-white"
            @click="$refs.fileInput.click()"
          >
            添加图片
          </button>
        </div>
        <!-- begin：生成 -->
        <div>
          <button
            class="w-full rounded-sm bg-black p-2 text-center text-white hover:bg-opacity-80"
            @click="uploadImg()"
          >
            生成
          </button>
        </div>
        <!-- begin：img -->
        <div class="grid grid-cols-4 gap-4 overflow-y-auto">
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
              class="aspect-square w-full rounded-lg object-cover"
            />
          </div>
        </div>
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
