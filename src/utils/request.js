import axios from "axios"
import { Message } from 'element-ui';

// 判断是开发环境还是生产环境
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

// 创建axios,赋值给变量service
const service = axios.create({
  baseURL: BASEURL,  // http://192.168.0.160:8080/devApi/ == http://www.web-jshtml.cn/productapi/token
  timeout: 10000,
});

/**
 * 添加请求拦截器
 * 请求接口前,做一些数据处理
 */
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 可以传参数Tokey userId sui业务需求

  config.headers.Tokey = "tokey111" 
  config.headers.userId = "userId222" 
  config.headers.sui = "sui333" 

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

/**
 * 添加响应拦截器
 * 请求接口后,返回数据进行拦截
 */
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response);
  let data = response.data;
  // 业务需求
  if (data.resCode !== 0) {
    Message.error(data.message);
    return Promise.reject(data);
  } else {
    return response;
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

/**
 * 使用export default导出时,但不能同时存在多个default 
 * 文件import不需要使用花括号导入
 */
export default service

