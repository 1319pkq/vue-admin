import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./router/premit.js"
// 自定义全局方法
import global from "@/utils/global.js"

// 自定义全局组件
Vue.use(ElementUI);
Vue.use(global)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
