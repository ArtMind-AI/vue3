<template>
  <div class="bg-btw flex min-h-screen">
    <!-- hidden:slide -->
    <div class="fixed inset-0 z-30" :class="{ hidden: show === false }">
      <div
        class="fixed inset-0 z-40 bg-black opacity-30"
        @click="show = false"
      ></div>
      <!-- 侧边栏 -->
      <Transition :duration="350" name="nested">
        <div
          class="bg-btw fixed inset-0 bottom-0 left-0 z-50 w-48 space-y-4 overflow-y-scroll pl-8 pt-8"
        >
          <div class="space-y-1">
            <div class="text-white">介绍</div>
            <div
              class="sidecursor transition-colors"
              :class="{ active: currentnum === 0 }"
              @click="change(0)"
            >
              简介
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-white">上手</div>
            <ul class="space-y-1">
              <li
                class="sidecursor transition-colors"
                :class="{ active: currentnum === 1 }"
                @click="change(1)"
              >
                AI对话
              </li>
              <li
                class="sidecursor transition-colors"
                :class="{ active: currentnum === 2 }"
                @click="change(2)"
              >
                视频生成
              </li>
            </ul>
          </div>
          <div class="text-white">费用</div>
          <div class="text-white">社区</div>
        </div>
      </Transition>
    </div>
    <Header />
    <div class="mt-[64px] w-full">
      <div class="border-b border-gray-500 px-4 py-2 lg:hidden">
        <v-icon name="bi-justify-left" class="h-8 w-8 cursor-pointer" @click="show = !show" />
      </div>
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <!-- side -->
        <div
          class="bg-btw fixed inset-0 bottom-0 left-[max(0px,calc(50%-40rem))] right-auto top-[64px] w-48 space-y-4 border-r border-gray-500 pl-8 pt-8 max-lg:hidden"
        >
          <div class="space-y-1">
            <div class="text-white">介绍</div>
            <div
              class="sidecursor transition-colors"
              :class="{ active: currentnum === 0 }"
              @click="change(0)"
            >
              简介
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-white">上手</div>
            <ul class="space-y-1">
              <li
                class="sidecursor transition-colors"
                :class="{ active: currentnum === 1 }"
                @click="change(1)"
              >
                AI对话
              </li>
              <li
                class="sidecursor transition-colors"
                :class="{ active: currentnum === 2 }"
                @click="change(2)"
              >
                视频生成
              </li>
            </ul>
          </div>
          <div class="text-white">费用</div>
          <div class="text-white">社区</div>
        </div>
        <!-- container -->
        <div class="lg:pl-48">
          <div class="mx-auto max-w-4xl lg:ml-0">
            <div class="divide-y divide-gray-500" v-if="currentnum === 0">
              <div class="text-ptb py-6 text-4xl font-bold">简介</div>
              <div class="space-y-2 py-6">
                <div class="text-ptb text-3xl font-bold">什么是数字人</div>
                <p>
                  数字人是指存在于非物理世界中，由计算机手段创造及使用，并具有多重人类特征（外貌特征、人类表演能力、交互能力等）的综合产物。
                  数字人可以分为以下几类：
                </p>
                <p>
                  虚拟偶像：由计算机生成的虚拟人物形象，通常用于娱乐、营销等领域。例如，洛天依、柳夜姬等。
                </p>
                <p>
                  仿真数字人：高度拟真的人类形象，可以用于影视、游戏等领域。例如，电影《终结者2》中的液态金属人
                  T-1000。
                </p>
                <p>
                  服务型数字人：应用于客服、教育等领域的数字人，可以提供智能化服务。例如，银行的智能客服机器人、虚拟导游等。
                </p>
              </div>
            </div>
            <div class="divide-y divide-gray-500" v-if="currentnum === 1">
              <div class="text-ptb py-6 text-4xl font-bold">Ai对话</div>
              <div class="space-y-2 py-6">
                <div class="text-ptb text-3xl font-bold">基础</div>
                <div class="text-wrap">
                  和普通gpt一样,你可以通过对话获得回复,在此基础上我们提供数字人来加强交互.
                </div>
              </div>
              <div class="space-y-4 py-6">
                <div class="text-ptb text-3xl font-bold">个性化</div>
                <div class="space-y-2">
                  <div class="text-ptb text-2xl font-bold">定制</div>
                  <div class="text-wrap">
                    在选项卡中选择个性化模块,在该选项下,通过下拉菜单自选音色,添加本地图片自定义数字人形象,
                    然后点击生成即可得到自定义数字人.
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="text-ptb text-2xl font-bold">仓库(待开发)</div>
                  <div class="text-wrap">
                    将自定义数字人添加到仓库中,即可通过在选项卡中选择仓库模块,快速选择自定义数字人进行交互.
                  </div>
                </div>
              </div>
            </div>
            <div class="divide-y" v-if="currentnum === 2">
              <div class="text-ptb py-6 text-4xl font-bold">视频生成</div>
              <div class="space-y-2 py-6">
                <div class="text-ptb text-3xl font-bold">基础</div>
                <div class="text-wrap"></div>
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
import { ref } from "vue";

const currentnum = ref(0);
const show = ref(false);

const change = (index) => {
  currentnum.value = index;
  show.value = false;
};
</script>

<style>
@import "../../assets/components/aiChat.css";
</style>
