import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import router from "./router";
import i18n from "./lang";
// import "./assets/style.css";
import "../global.css"; // 引入全局 CSS 文件
import axios from "axios";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoLanguage, FcLinux, HiSolidHome, HiSolidArrowLeft, HiSolidArrowRight, AiAcademia, RiAppsFill } from "oh-vue-icons/icons";
import VueKinesis from "vue-kinesis";

addIcons(CoLanguage, FcLinux, HiSolidHome, HiSolidArrowLeft, HiSolidArrowRight, AiAcademia, RiAppsFill);

const app = createApp(App);
app.provide("$axios", axios);

app
  .use(i18n)
  .use(router)
  .component("v-icon", OhVueIcon)
  .use(VueKinesis)
  .mount("#app");
