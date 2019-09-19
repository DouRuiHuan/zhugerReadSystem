import axios from 'axios'
import Vue from "vue"
import { Message } from 'element-ui'
// import { baseUrl } from '@/utils/env'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // 初始地址
  baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: baseUrl,
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改 
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.statusCode !== 200) {
      // 如果不成功，弹出的是后端传输进来的错误信息，返回错误之后执行的代码
      Message({
        message: res.err_msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log(error.response)
    Message({
      message: error.response ? error.response.data.err_msg : '请求失败',
      type: 'error',
      duration: 3 * 1000
    })
    // 401错误是输入的用户名和密码有一项无效
    if (error.response && error.response.status == 401) {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
    return Promise.reject(error)
  }
)

export default service
