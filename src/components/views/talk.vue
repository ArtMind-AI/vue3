<template>
  <div class="bg-btw h-screen">
    <div>
      <Header />
      <div class="mx-auto overflow-x-auto px-6 lg:max-w-[80rem]">
        <!-- side -->
        <sidebar />
        <!-- container -->
        <div class="flex h-[calc(100vh-64px)] gap-4 lg:justify-center xl:pl-48">
          <!-- container-left -->
          <div
            class="diyborder my-6 flex w-1/2 min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b]"
          >
            <!-- begin：声线 -->
            <div class="mt-6 flex gap-6 px-6">
              <select
                id="selectFruit"
                v-model="selectedFruit"
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
            <!-- begin name -->
            <div class="mt-6 px-6">
              <div class="relative w-full">
                <label
                  for="input"
                  class="bg-ptb absolute -top-3 left-2 z-20 rounded-md px-1 text-[#7480ff]"
                  >Name:</label
                >
                <input
                  type="text"
                  placeholder="Write here..."
                  name="input"
                  class="bg-ptb diyborder w-full rounded-md p-2 text-black outline-none"
                  v-model="img_name"
                />
              </div>
            </div>
            <!-- begin：生成 -->
            <div class="myborder mt-6 px-6">
              <button
                class="bg-ptb text-grey diyborder w-full rounded-lg p-2 text-center transition-transform active:scale-90"
                @click="upload()"
              >
                生成
              </button>
            </div>
            <!-- begin：img -->
            <div class="mt-6 flex-1 overflow-y-auto px-6">
              <div class="grid grid-cols-3 gap-4 lg:grid-cols-4">
                <div
                  v-for="(image, index) in images"
                  :key="index"
                  class="diyborder rounded-lg active:scale-95"
                  :class="{ ' opacity-50': selectimg === index }"
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
            class="diyborder my-6 flex w-1/2 min-w-96 max-w-128 flex-col rounded-xl bg-[#525e7b] p-6"
          >
            <!-- video -->
            <div class="relative">
              <img
                src="../../assets/img/0.jpg"
                class="diyborder mx-auto aspect-square w-48 rounded-lg"
              />
              <div
                class="absolute left-[calc(50%-6rem)] top-0 z-30 flex aspect-square h-48 w-48 items-center justify-center rounded-lg bg-white"
                :class="{ hidden: loading === false }"
              >
                <div class="loader aspect-square w-16"></div>
              </div>
            </div>
            <!-- chat -->
            <div class="mt-6 flex flex-1 flex-col overflow-y-auto">
              <div
                class="other-message diyborder w-fit max-w-80 rounded-lg p-2 text-black"
              >
                may the peace be with us!
              </div>
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="
                  message.sender === 'user' ? 'user-message' : 'other-message'
                "
                class="diyborder w-fit max-w-80 rounded-lg p-2 text-black"
              >
                {{ message.text }}
              </div>
            </div>
            <!-- word -->
            <div class="diyborder mt-6 rounded-lg bg-[#add8e6] p-4">
              <textarea
                class="diyborder w-full resize-none rounded-lg bg-[#f5f5dc] p-2 text-lg text-black outline-none"
                placeholder=""
                v-model="chat"
                rows="4"
              ></textarea>
              <div class="mt-2">
                <button
                  class="rounded-lg border-b-[4px] border-blue-600 bg-blue-500 px-6 py-2 text-white active:brightness-90"
                  @click="addBox"
                >
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Header from "../header/header.vue";
import sidebar from "../others/Sidebar.vue";

const messages = ref([]); //聊天板文字
const chat = ref(""); //用户输入
const send = ref(""); //axios上传用户输入
const selectedFruit = ref("普通话女声"); //默认音色
const selectimg = ref(0); //选择图片
const images = ref([]); //图片墙
const img_name = ref(); //图片名称
const loading = ref(false);

// 使用 fetch 获取本地图片文件内容
fetch("src/assets/img/0.jpg")
  .then((response) => response.blob())
  .then((blob) => {
    // 直接将 Blob 对象存储到 images 数组中
    images.value.push(blob);
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
    const blob = await getBlobFromUrl(URL.createObjectURL(file));
    images.value.push(blob);
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

const addBox = async () => {
  if (chat.value.length != 0) {
    try {
      console.log("chat.value = " + chat.value);
      messages.value.push({ text: chat.value, sender: "user" });
      send.value = chat.value;
      console.log("send.value = " + send.value);
      chat.value = "";
      console.log(img_name.value);
    } catch (error) {
      console.error(error);
    }
  }
};

const upload = async () => {
  if (img_name.value.length != 0) {
    loading.value = true;
    const formData = new FormData();
    formData.append("image", images.value[selectimg.value]);
    formData.append("name", img_name.value);
    formData.append("voice", selectedFruit.value);

    try {
      const response = await axios.post("http://localhost:3000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000, // 设置超时时间为10秒
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("上传失败，请重试");
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 2000); // 延迟2秒
    }
  } else {
    alert("名字不能为空");
  }
};
</script>

<style scoped>
@import "@/assets/components/aiChat.css";
@import "@/assets/components/shadow.css";
.loader {
  position: relative;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.loader:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  transform: rotate(45deg) translate(30%, 40%);
  background: #ff9371;
  box-shadow: 32px -34px 0 5px #ff3d00;
  animation: slide 2s infinite ease-in-out alternate;
}

.loader:after {
  content: "";
  position: absolute;
  left: 10px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ff3d00;
  transform: rotate(0deg);
  transform-origin: 35px 145px;
  animation: rotate 2s infinite ease-in-out;
}

@keyframes slide {
  0%,
  100% {
    bottom: -35px;
  }

  25%,
  75% {
    bottom: -2px;
  }

  20%,
  80% {
    bottom: 2px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(-15deg);
  }

  25%,
  75% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(25deg);
  }
}
</style>
