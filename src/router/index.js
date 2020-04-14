import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "../views/layout/Layout"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    component: () => import("../views/login/Login"),
    meta: {
      title: "主页"
    },
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login"),
    meta: {
      title: "登录"
    },
    hidden: true
  },
  // ************************************************************控制台******************************
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
    redirect: "console",
    meta: {
      title: "控制台",
      icon: "el-icon-odometer"
    },
    children: [
      {
        path: "/console",
        name: "Console",
        component: () => import("../views/console/Console"),
        meta: {
          title: "控制台首页"
        }
      }
    ]
  },
  // ************************************************************信息******************************
  {
    path: "/info",
    name: "Info",
    component: Layout,
    meta: {
      title: "信息管理",
      icon: "el-icon-copy-document"
    },
    children: [
      {
        path: "/infoList",
        name: "InfoList",
        component: () => import("../views/info/InfoList"),
        meta: {
          title: "信息列表"
        }
      },
      {
        path: "/infoSort",
        name: "InfoSort",
        component: () => import("../views/info/InfoSort"),
        meta: {
          title: "信息分类"
        }
      }
    ]
  },
  // ************************************************************用户******************************
  {
    path: "/user",
    name: "User",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "el-icon-user"
    },
    children: [
      {
        path: "/userList",
        name: "UserList",
        component: () => import("../views/user/User"),
        meta: {
          title: "用户列表"
        }
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
