import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 获取本地存储
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  },
  getters: { //computed
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // h5本地存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
  },
  actions: {},
  modules: {}
});
