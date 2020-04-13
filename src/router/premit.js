import router from "./index"

import { getToKen } from "@/utils/app"

const whiteBrouter = ['/login']
// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (getToKen()) {
    // console.log("存在");
    next();
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