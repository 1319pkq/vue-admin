import { MessageBox } from 'element-ui';

export default {
  install(Vue, options) {
    Vue.prototype.confirm = (params) => {
      MessageBox.confirm(params.content || "永久删除该文件,是否继续?", params.title || "提示!", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          console.log("删除成功");
          // params.fn && params.fn(params.id || '')
        })
        .catch(() => {    
          console.log("已取消删除");
        });
    }
  }
}