import { onBeforeMount } from "vue";
import { useImagesStore } from "@/store/image.js";

// 使用 fetch 获取本地图片文件内容
export const useFetchImage = () => {
  const imagesStore = useImagesStore();

  onBeforeMount(() => {
    if (imagesStore.images.length === 0) {
      // 使用 fetch 获取本地图片文件内容
      fetch("/assets/img/0.jpg")
        .then((response) => response.blob())
        .then((blob) => {
          // 直接将 Blob 对象存储到 images 数组中
          imagesStore.addImage(blob);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  });
};

// 得到blob对象的url数据
export const getImageUrl = (blob) => {
  return URL.createObjectURL(blob);
};

// 获取 Blob URL 对应的 Blob 对象
export const getBlobFromUrl = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching blob:", error);
    return null;
  }
};
