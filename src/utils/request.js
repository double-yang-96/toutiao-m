/* 请求模块 */
import axios from "axios";

const request = axios.create({
  baseURL: "http://toutiao-app.itheima.net",
});
export default request;
