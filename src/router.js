import { createRouter, createWebHistory } from "vue-router";
import test from "@/components/others/test.vue";
import deFault from "@/components/views/default.vue";
import aiChat from "@/components/views/aiChat.vue";
import login from "@/components/views/login.vue";
import documents from "@/components/views/documents.vue";
import ai from "@/components/views/ai.vue";
import community from "@/components/views/community.vue";
import center from "@/components/views/center.vue";
// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: deFault },
    { path: "/test", component: test },
    { path: "/aiChat", component: aiChat },
    { path: "/login", component: login },
    { path: "/documents", component: documents },
    { path: "/ai", component: ai },
    { path: "/community", component: community },
    { path: "/center", component: center },
  ],
});

export default router;
