import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import router from "./router";
import i18n from './lang';
import "./assets/style.css";
import "../global.css"; // 引入全局 CSS 文件
import axios from "axios"
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoLanguage } from "oh-vue-icons/icons";
addIcons(CoLanguage);

const app = createApp(App);
app.provide("$axios", axios);

app.use(i18n).use(router).component("v-icon", OhVueIcon).mount("#app");
