import { createApp } from "vue";
import "./sytle.css";
import { createPinia } from "pinia";
import "./main.css";
import App from "./App.vue";
import router from "./router";
import i18n from "./lang";
import "/global.css"; // 引入全局 CSS 文件
import axios from "axios";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  CoLanguage,
  FcLinux,
  BiJustifyLeft,
  MdListRound,
  HiX
} from "oh-vue-icons/icons";

addIcons(CoLanguage, FcLinux, BiJustifyLeft, MdListRound, HiX);

const pinia = createPinia();
const app = createApp(App);
app.provide("$axios", axios);

app
  .use(i18n)
  .use(router)
  .use(pinia)
  .component("v-icon", OhVueIcon)
  .mount("#app");
