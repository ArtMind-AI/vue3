import { createRouter, createWebHistory } from "vue-router";
import test from "@/components/others/test.vue";
import deFault from "@/components/views/default.vue";
import login from "@/components/views/login.vue";
import documents from "@/components/views/documents.vue";
import community from "@/components/views/community.vue";
import center from "@/components/views/center.vue";
import model from "@/components/views/model.vue";
import talk from "@/components/children/talk.vue";
import audioG from "@/components/children/audio.vue";
import wordG from "@/components/children/word.vue";
// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: deFault },
    { path: "/test", component: test },
    { path: "/login", component: login },
    { path: "/documents", component: documents },
    { path: "/community", component: community },
    { path: "/center", component: center },
    {
      path: "/model",
      component: model,
      children: [
        {
          path: "talk",
          component: talk,
        },
        {
          path: "audio",
          component: audioG,
        },
        {
          path: "word",
          component: wordG,
        },
      ],
    },
  ],
});

export default router;
