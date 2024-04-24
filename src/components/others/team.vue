<template>
  <section class="bg-ptb h-screen flex items-center">
    <div
      class="container mx-auto flex flex-col items-center justify-center space-y-4 px-4"
    >
      <h1 class="text-center text-4xl font-bold leading-none tracking-wide text-gtb mb-16">
        {{ $t("tuanDui") }}
      </h1>
      <div class="grid lg:grid-cols-4 grid-cols-2 gap-4 justify-center">
        <!-- 1 -->
        <div class="flex flex-col justify-center text-center">
          <img
            alt=""
            class="mb-4 flex-shrink-0 self-center rounded-full bg-cover bg-center"
            src="../../assets/svg/op/op1.svg"
          />
          <p class="text-xl font-semibold leading-tight text-gtb">tillicofess</p>
          <p class="text-lg text-gtb">{{ $t("wangYeSheJiShi") }}</p>
        </div>
        <!-- 2 -->
        <div class="flex flex-col justify-center text-center">
          <img
            alt=""
            class="mb-4 flex-shrink-0 self-center rounded-full bg-cover bg-center"
            src="../../assets/svg/op/op2.svg"
          />
          <p class="text-xl font-semibold leading-tight text-gtb">tillicofess</p>
          <p class="text-lg text-gtb">{{ $t("wangYeSheJiShi") }}</p>
        </div>
        <!-- 3 -->
        <div class="flex flex-col justify-center text-center">
          <img
            alt=""
            class="mb-4 flex-shrink-0 self-center rounded-full bg-cover bg-center"
            src="../../assets/svg/op/op3.svg"
          />
          <p class="text-xl font-semibold leading-tight text-gtb">tillicofess</p>
          <p class="text-lg text-gtb">{{ $t("wangYeSheJiShi") }}</p>
        </div>
        <!-- 4 -->
        <div class="flex flex-col justify-center text-center">
          <img
            alt=""
            class="mb-4 flex-shrink-0 self-center rounded-full bg-cover bg-center"
            src="../../assets/svg/op/op4.svg"
          />
          <p class="text-xl font-semibold leading-tight text-gtb">tillicofess</p>
          <p class="text-lg text-gtb">{{ $t("wangYeSheJiShi") }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
