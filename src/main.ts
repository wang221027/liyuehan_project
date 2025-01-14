import "@/assets/style/mixin.scss";
import "@/assets/style/base.scss";
// 底部组件
// @ts-ignore
import Footer from "@/components/Footer/index.vue";
// 返回上一级
// @ts-ignore
import GoBack from "@/components/GoBack/index.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
  zIndex: 99999999,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("Footer", Footer);
app.component("GoBack", GoBack);
app.use(createPinia());
app.use(router);
app.mount("#app");
