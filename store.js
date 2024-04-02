// store.js
import { reactive } from 'vue';

export const store = reactive({
  show: false,
  sidebarCollapsed: false,
  toggleShow() {
    this.show = !this.show;
  },
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  },
});
