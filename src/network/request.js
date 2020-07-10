import axios from "axios";

export function request(config) {
  //1、创建势力
  const instance = axios.create({
    baseURL: `http://123.207.32.32:8000`
  });
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      //   console.log(err);
    }
  );
  //响应拦截
  instance.interceptors.response.use(
    res => {
      //   console.log(res);
      return res.data;
    },
    err => {
      console.log(err);
    }
  );
  //3、发送真正的请求
  return instance(config);
}
