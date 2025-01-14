import axios from "axios";
import { ElMessage } from "element-plus";
//引入进度条
import Nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
//利用axios.create方法创建一个axios实例:可以设置基础路径、超时的时间的设置
const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 5000, //超时的时间的设置,超出五秒请求就是失败的
});
//请求拦截器
request.interceptors.request.use((config) => {
  Nprogress.start();
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    //响应拦截器成功的回调,一般会进行简化数据
    Nprogress.done();
    return response.data;
  },
  (error) => {
    //处理http网络错误
    let status = error.response.status;
    switch (status) {
      case 404:
        //错误提示信息
        ElMessage({
          type: "error",
          message: "请求失败路径出现问题",
        });
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: "error",
          message: "服务器挂了",
        });
        break;
      case 401:
        ElMessage({
          type: "error",
          message: "参数有误",
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);
//务必对外暴露axios
export default request;
