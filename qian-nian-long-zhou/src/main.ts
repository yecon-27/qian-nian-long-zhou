import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";
import { useAuthStore } from "@/stores/auth";
import { imagePreloader } from "@/utils/imagePreloader";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vant);

// 初始化认证状态
const authStore = useAuthStore();
authStore.initAuth();

// 预加载关键图片资源
imagePreloader.preloadCriticalImages().catch((error) => {
  console.warn("图片预加载失败:", error);
});

// 挂载应用
app.mount("#app");

// 开发环境下加载测试工具
if (import.meta.env.DEV) {
  import("./utils/testDailyReset.ts");
  import("./utils/testConnection.ts"); // 加载后端连接测试工具
  import("./utils/beginnerTest.ts"); // 加载初学者测试工具
  import("./utils/testImageResources.ts"); // 加载图片资源测试工具
}
