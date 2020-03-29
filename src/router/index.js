import Vue from "vue";
import VueRouter from "vue-router";
// 登陆
import Login from "../views/login/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = new VueRouter({
  routes
});

export default router;
