import { defineStore } from "pinia";
import { ref } from "vue";

export const useImagesStore = defineStore("images", () => {
  const images = ref([]);

  const addImage = (image) => {
    images.value.push(image);
  };

  return { images, addImage};
});
