import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import router from "./router";
import i18n from './lang';
import "./assets/style.css";
import axios from "axios"

const app = createApp(App);
app.provide("$axios", axios);

app.use(i18n).use(router).mount("#app");
