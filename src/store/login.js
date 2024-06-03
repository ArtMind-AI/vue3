import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
  const islogin = ref(false);

  const loginSwitch = () => {
    islogin.value = !islogin.value;
  };

  return { islogin, loginSwitch };
});
