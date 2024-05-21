<template>
  <div class="bg-btw h-screen">
    <div>
      <Header />
      <div class="mx-auto h-[calc(100vh-56px)] lg:max-w-[80rem] px-6 overflow-x-auto">
        <!-- side -->
        <sidebar />
        <!-- container -->
        <div class="flex gap-4 lg:justify-center xl:pl-48">
          <div
            class="diyborder mt-6 w-1/2 min-w-96 rounded-lg bg-[#525e7b]"
          ></div>
          <div
            class="diyborder mt-6 w-1/2 min-w-96 rounded-lg bg-[#525e7b] p-6"
          >
            <!-- video -->
            <div>
              <img
                src="../../assets/img/0.jpg"
                class="diyborder mx-auto aspect-square w-48 rounded-lg"
              />
            </div>
            <!-- chat -->
            <div class="mt-6 h-80 overflow-y-auto">
              <div
                class="other-message diyborder max-w-72 rounded-lg bg-[#f5f5dc] p-2 text-black"
              >
                may the peace be with us!
              </div>
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="
                  message.sender === 'user' ? 'user-message' : 'other-message'
                "
                class="text-ptb diyborder rounded-lg bg-[#454857] p-2 text-lg"
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
                @keydown.enter.prevent="addBox"
              ></textarea>
              <div class="mt-2">
                <button
                  class="rounded-lg border-b-[4px] border-blue-600 bg-blue-500 px-6 py-2 text-white active:brightness-90"
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
import Header from "../header/header.vue";
import sidebar from "../others/Sidebar.vue";
</script>

<style scoped></style>
