import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app.js";
import user from "./modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // 储存初始化数据this.store.state.XX
  state: {},
  // state里面数据二次处理
  getters: {},
  // 对数据进行计算方法全部写在里面(类似computed)在页面中触发使用
  // this.$store.commit('FU')
  mutations: {},
  // 异步
  actions: {},
  // 模块化vuex
  modules: {
    app,
    user
  }
});
