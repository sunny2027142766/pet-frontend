import axios from "axios";
import { getToken } from "src/utils/auth";

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 30000;

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    if (config.url !== "/login" || config.url !== "/register") {
      config.headers.Authorization = `Bearer ${getToken()}`; // 携带token
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    console.log("请求成功,请求结果为===>", data);
    if (data.code !== 200) {
      console.log("请求失败", data);

      const errorText = data.msg || "HTTP响应错误";
      // 401：token已失效
      if (data.code === 401) {
        window.alert("登录已过期,请重新登录");
        window.location.href = "/login";
      }
      return Promise.reject(errorText);
    }
    return Promise.resolve(data);
  },
  (err) => {
    console.log("请求失败,错误信息为===>", err);
    // 错误处理
    return Promise.reject(err);
  }
);

export const get = (url, params, config) =>
  axios.get(url, {
    params: {
      ...params,
      // t: Date.now()
    },
    ...config,
  });

export const post = (url, params, config) => {
  if (Array.isArray(params)) {
    return axios.post(url, [...params], config);
  }
  return axios.post(url, { ...params }, config);
};

export const put = (url, params, config) => {
  if (Array.isArray(params)) {
    return axios.put(url, [...params], config);
  }
  return axios.put(url, { ...params }, config);
};

export const del = (url, config) => axios.delete(url, config);

export default {
  get,
  post,
  put,
  del,
};
