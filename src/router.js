import { createRouter, createWebHistory } from "vue-router";
import test from "@/components/test.vue";
import deFault from "@/components/views/default.vue";
import aiChat from "@/components/views/aiChat.vue";
import login from "@/components/views/login.vue";
import setting from "@/components/views/setting.vue";
import startFun from "@/components/views/startFun.vue";
import ai from "@/components/views/ai.vue"
// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: deFault },
    { path: "/test", component: test },
    { path: "/aiChat", component: aiChat },
    { path: "/login", component: login },
    { path: "/setting", component: setting },
    { path: "/startFun", component: startFun },
    { path: "/ai", component: ai },
  ],
});

export default router;
