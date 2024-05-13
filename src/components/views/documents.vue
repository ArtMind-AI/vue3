<template>
  <div class="bg-btw flex min-h-screen">
    <Header />
    <div class="mt-[64px] flex lg:mx-auto">
      <!-- side -->
      <Transition :duration="350" name="nested">
        <div class="w-32 space-y-2 pt-16 max-lg:fixed left-0 top-16 bottom-0 border-r-2 border-white" v-if="show">
          <div class="text-white">介绍</div>
          <div class="cursor-pointer" @click="change(0)">简介</div>
          <div class="text-white">上手</div>
          <ul class="space-y-2">
            <li class="cursor-pointer" @click="change(1)">AI对话</li>
            <li class="cursor-pointer" @click="change(2)">视频生成</li>
          </ul>
          <div class="text-white">费用</div>
          <div class="text-white">社区</div>
        </div>
      </Transition>
      <!-- container -->
      <div class=" p-8">
        <div class="divide-y" v-if="currentnum === 0">
          <div class="text-ptb py-8 text-5xl">简介</div>
          <div class="space-y-4 py-8">
            <div class="text-ptb text-3xl">什么是数字人</div>
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
        <div class="divide-y" v-if="currentnum === 1">
          <div class="text-ptb py-8 text-5xl">Ai对话</div>
          <div class="space-y-4 py-8">
            <div class="text-ptb text-3xl">基础</div>
            <div class="text-wrap">
              和普通gpt一样,你可以通过对话获得回复,在此基础上我们提供数字人来加强交互.
            </div>
          </div>
          <div class="space-y-4 py-8">
            <div class="text-ptb text-3xl">个性化</div>
            <div class="text-wrap"></div>
            <div class="text-ptb text-2xl">定制</div>
            <div class="text-wrap">
              在选项卡中选择个性化模块,在该选项下,通过下拉菜单自选音色,添加本地图片自定义数字人形象,
              然后点击生成即可得到自定义数字人.
            </div>
            <div class="text-ptb text-2xl">仓库(待开发)</div>
            <div class="text-wrap">
              将自定义数字人添加到仓库中,即可通过在选项卡中选择仓库模块,快速选择自定义数字人进行交互.
            </div>
          </div>
        </div>
        <div class="divide-y" v-if="currentnum === 2">
          <div class="text-ptb py-8 text-5xl">视频生成</div>
          <div class="space-y-4 py-8">
            <div class="text-ptb text-3xl">基础</div>
            <div class="text-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../header/header.vue";
import { ref, onMounted, onUnmounted } from "vue";

const currentnum = ref(0);
const show = ref(true);

const change = (index) => {
  currentnum.value = index;
};
const updateShow = () => {
  show.value = window.innerWidth >= 1024;
};

onMounted(() => {
  updateShow();
  window.addEventListener("resize", updateShow);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateShow);
});
</script>

<style>
@import "../../assets/components/aiChat.css";
</style>
