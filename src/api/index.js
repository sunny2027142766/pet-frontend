import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 30000

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (config.url !== '/login') {
      // config.headers['Authorization'] = `Bearer ${getToken()}` // 携带token
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    console.log('请求成功,请求结果为===>',response);
    const { data } = response
    return Promise.resolve(data)
  },
  err => {
    console.log('请求失败,错误信息为===>', err);
    if (err.response.status === 401) {
      // 显示提示信息
      // 清除token
      // 跳转到登录页面
      // window.location.href = '/login'
    }
    // 错误处理
    return Promise.reject(err)
  }
)


export const get =(url, params, config) =>
  axios.get(url, {
    params: {
      ...params,
      // t: Date.now()
    },
    ...config
  })


export const post = (url, params, config) => {
  if (Array.isArray(params)) {
    return axios.post(url, [...params], config)
  }
  return axios.post(url, { ...params }, config)
}


export const del = (url, config) => axios.delete(url, config)

export default {
  get,
  post,
  del
}