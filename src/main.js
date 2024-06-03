import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import i18n from "./lang";
import axios from "axios";
import "./main.css";
import "./sytle.css";
import "./assets/css/global.css";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  CoLanguage,
  FcLinux,
  BiJustifyLeft,
  MdListRound,
  HiX,
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
