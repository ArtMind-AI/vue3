<template>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box flex h-128 w-96 flex-col sm:w-128">
      <div class="modal-action mt-0">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            class="btn btn-neutral btn-sm mr-4 text-base-100"
            @click="empty"
            ref="closeButton"
          >
            Close
          </button>
        </form>
      </div>
      <div class="flex-1">
        <div class="flex justify-center" v-if="currentStep === 1">
          <div class="space-y-2 dark:text-gray-600">
            <h3 class="text-base font-semibold">
              Step 1: choose a img for you avator
            </h3>
            <div class="flex max-w-xs space-x-3">
              <span class="h-2 w-12 rounded-sm dark:bg-violet-400"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-gray-400"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-gray-600"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-gray-600"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-gray-600"></span>
            </div>
          </div>
        </div>
        <div class="flex justify-center" v-if="currentStep === 2">
          <div class="space-y-2 dark:text-gray-600">
            <h3 class="text-base font-semibold">
              Step 2: Fill in order details
            </h3>
            <div class="flex max-w-xs space-x-3">
              <span class="h-2 w-12 rounded-sm dark:bg-violet-400"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-violet-400"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-gray-400"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-gray-600"></span>
              <span class="h-2 w-12 rounded-sm dark:bg-gray-600"></span>
            </div>
          </div>
        </div>
        <div class="h-80 sm:flex-1">
          <div class="flex h-80" v-if="currentStep === 1">
            <div class="m-4 w-full rounded-xl bg-gray-200 p-4">
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="handleFileChange"
              />
              <button
                class="btn btn-accent btn-active mb-4 w-full rounded-md"
                @click="openFileInput"
              >
                上传图片
              </button>
              <div class="flex h-48 justify-center rounded-md bg-gray-400">
                <img :src="image" v-if="image" alt="" class="h-48" />
              </div>
            </div>
          </div>
          <div class="flex h-80" v-else-if="currentStep === 2">
            <form
              @submit.prevent="submitForm"
              class="m-4 flex w-full flex-col rounded-lg bg-gray-200 p-4"
            >
              <!-- 名字输入框 -->
              <label for="name" class="mb-4">名字:</label>
              <input
                type="text"
                class="input input-bordered input-sm mb-4"
                v-model="formData.name"
                required
              />
              <label for="voice" class="mb-4">音色:</label>
              <select
                class="select select-sm mb-8"
                v-model="formData.voice"
                required
              >
                <option value="soprano">Soprano</option>
                <option value="alto">Alto</option>
                <option value="tenor">Tenor</option>
                <option value="bass">Bass</option>
              </select>
              <div class="flex">
                <div class="flex-1">是否放入仓库:</div>
                <div class="flex items-center">
                  <p class="mr-2">
                    {{ switchValue ? "是" : "否" }}
                  </p>
                  <input
                    type="checkbox"
                    class="toggle"
                    v-model="switchValue"
                    checked
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="mt-5 flex sm:mt-5">
            <button
              v-if="currentStep === 1"
              class="btn btn-neutral btn-sm ml-4 text-base-100"
              @click="nextStep"
            >
              下一步
            </button>
            <button
              v-if="currentStep === 2"
              class="btn btn-neutral btn-sm ml-4 text-base-100"
              @click="backStep"
            >
              上一步
            </button>
            <div class="flex-1" v-if="currentStep === 2"></div>
            <span v-if="loading" class="loading loading-spinner"></span>
            <button
              v-if="currentStep === 2"
              class="btn btn-neutral btn-sm mr-4 text-base-100"
              @click="submitForm"
              :disabled="loading"
            >
              {{ loading ? "loading..." : "create" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const image = ref("");
const currentStep = ref(1);
const switchValue = ref(true);
const formData = ref({
  name: "",
  voice: "soprano",
});
const loading = ref(false);
const fileInput = ref(null);

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = URL.createObjectURL(file);
    console.log(image.value);
    fileInput.value.value = "";
  }
};

const empty = () => {
  image.value = "";
  currentStep.value = 1;
};

const nextStep = () => {
  if (currentStep.value === 1 && image.value) {
    currentStep.value++;
  } else {
    alert("请选择图片");
  }
};

const backStep = () => {
  if (currentStep.value === 2) {
    currentStep.value--;
  }
};

// 将 Blob URL 转换为 File 对象
async function convertBlobUrlToFile(blobUrl) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], "image.png", { type: "image/png" });
}

const submitForm = async () => {
  if (formData.value.name && formData.value.voice) {
    loading.value = true;
    console.log("表单提交:", formData.value);
    try {
      const imgfile = await convertBlobUrlToFile(image.value);
      const formdata = new FormData();
      formdata.append("file", imgfile);
      formdata.append("name", formData.value.name);
      formdata.append("voice", formData.value.voice);
      const response = await axios.post(
        "http://localhost:3000/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
    loading.value = false;
  } else {
    alert("请输入姓名或选择音色");
  }
};
</script>
