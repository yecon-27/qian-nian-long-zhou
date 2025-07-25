// API 基础配置
import axios, { type AxiosResponse, type AxiosError } from 'axios'

// 定义响应数据类型
interface ApiResponse<T = any> {
  code: number
  data: T
  msg: string
}

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || (import.meta.env.DEV ? 'http://localhost:8080' : ''),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data
    
    // 若依框架标准响应格式
    if (res.code === 200) {
      return res.data
    } else {
      console.error('接口错误:', res.msg)
      // 可以在这里添加全局错误提示
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
  },
  (error: AxiosError) => {
    console.error('响应错误:', error)
    
    // 处理 401 未授权
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // 跳转到登录页
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    
    // 处理网络错误
    if (!error.response) {
      return Promise.reject(new Error('网络连接失败，请检查网络设置'))
    }
    
    return Promise.reject(error)
  }
)

export default request
