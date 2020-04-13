import { Login } from "@/api/login";
import { setToKen } from "@/utils/app"
import { setUserName, getUserName } from "@/utils/app"

const app = {
  // 储存初始化数据this.store.state.XX
  state: {
    // 获取本地存储
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    username: getUserName() || ""
  },
  // state里面数据二次处理
  getters: {
    // username: state.username    
  },
  // 对数据进行计算方法全部写在里面(类似computed)在页面中触发使用
  // this.$store.commit('FU')
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // h5本地存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value) {
      state.to_ken = value
    },
    SET_USERNAME(state, value) {
      state.username = value
    }
  },
  // 异步,可以有回调
  actions: {
    loginX(content, repuestData) {
      return new Promise((resolve, reject) => {
        // 接口
        Login(repuestData).then((response) => {
          // console.log(content);
          // console.log(response);
          let data = response.data.data;
          // 存储token username
          content.commit('SET_TOKEN', data.token)
          content.commit('SET_USERNAME', data.username)
          setToKen(data.token)
          setUserName(data.username)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  },
}

export default app;