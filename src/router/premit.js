import router from "./index";

import { getToKen, removeToKen, removeUserName } from "@/utils/app";
import store from '../store/index'

const whiteBrouter = ['/login']
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToKen()) {
    // console.log("存在");
    if (to.path === "/login") {
      removeToKen();
      removeUserName();
      store.commit("SET_TOKEN", "");
      store.commit("SET_USERNAME", "");
      next();
    } else {
      next();
    }
  } else {
    // console.log("不存在");
    if (whiteBrouter.indexOf(to.path) !== -1) {
      // console.log("ok");
      next();
    } else {
      // console.log("not");
      next('/login')
    }
  }
  // console.log(to);
  // console.log(from);
  // console.log(next);
  // next()
})