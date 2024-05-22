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
            class="diyborder my-6 flex w-1/2 min-w-96 flex-col rounded-xl bg-[#525e7b] max-w-128"
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
            <!-- begin：生成 -->
            <div class="myborder mt-6 px-6">
              <button
                class="bg-ptb text-grey diyborder w-full rounded-lg p-2 text-center transition-transform active:scale-90"
                @click="uploadImg()"
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
                    :src="image"
                    alt="image"
                    class="aspect-square w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- container-right -->
          <div
            class="diyborder my-6 flex w-1/2 min-w-96 flex-col rounded-xl bg-[#525e7b] p-6 max-w-128"
          >
            <!-- video -->
            <div>
              <img
                src="../../assets/img/0.jpg"
                class="diyborder mx-auto aspect-square w-48 rounded-lg"
              />
            </div>
            <!-- chat -->
            <div class="mt-6 flex flex-1 flex-col overflow-y-auto">
              <div
                class="other-message diyborder max-w-72 rounded-lg p-2 text-black"
              >
                may the peace be with us!
              </div>
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="
                  message.sender === 'user' ? 'user-message' : 'other-message'
                "
                class="diyborder max-w-72 rounded-lg p-2 text-black"
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
import Header from "../header/header.vue";
import sidebar from "../others/Sidebar.vue";

const messages = ref([]); //聊天板文字
const chat = ref(""); //用户输入
const send = ref(""); //axios上传用户输入
const selectedFruit = ref("普通话女声"); //默认音色
const selectimg = ref(0); //选择图片
const images = ref([]); //图片墙

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

const addBox = async () => {
  try {
    console.log("chat.value = " + chat.value);
    messages.value.push({ text: chat.value, sender: "user" });
    send.value = chat.value;
    console.log("send.value = " + send.value);
    chat.value = "";
  } catch (error) {
    console.error(error);
  }
};

//回车上传文字
</script>

<style scoped></style>
