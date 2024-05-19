<template>
  <div
    class="bg-grey border-ptb mt-12 flex w-128 items-center justify-center gap-6 rounded-xl border-2 p-2"
  >
    <router-link to="/" class="flex w-16 items-center justify-center"
      ><span class="text-ptb">主页</span></router-link
    >
    <router-link to="/ai" class="flex items-center"
      ><v-icon name="hi-solid-arrow-left" class="text-ptb h-7 w-7"
    /></router-link>
    <div class="relative w-24">
      <router-link
        to="/documents"
        class="bg-grey border-ptb absolute -top-[48px] flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2"
      >
        <v-icon
          name="ai-academia"
          class="text-ptb z-20 h-12 w-12"
          v-if="$route.path === '/ai'"
        />
        <v-icon
          name="ai-cv"
          class="text-ptb z-20 h-12 w-12"
          v-if="$route.path === '/aiChat'"
        />
        <span class="text-ptb text-lg">文档</span>
      </router-link>
    </div>
    <router-link to="/aiChat" class="flex items-center"
      ><v-icon name="hi-solid-arrow-right" class="text-ptb h-7 w-7"
    /></router-link>
    <div class="dropdown dropdown-top w-16 text-center">
      <div tabindex="0" role="button" class="text-ptb">Video</div>
      <ul
        tabindex="0"
        class="bg-grey border-ptb menu dropdown-content z-30 w-52 rounded-box border-4 shadow"
      >
        <li>
          <router-link to="/ai" class="flex items-center">Ai Chat</router-link>
        </li>
        <li>
          <router-link to="/aiChat" class="flex items-center"
            >Video</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>
