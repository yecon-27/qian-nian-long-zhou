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
  // 修正：确保开发环境下使用代理，生产环境下使用根路径
  baseURL: import.meta.env.DEV ? '/api' : '/',
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

    // 添加 User-ID
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      if (user && user.userId) {
        config.headers['User-ID'] = user.userId
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data

    // 若依框架标准响应格式
    if (res && res.code === 200) {
      // 对于图片资源API，返回完整响应对象以保持兼容性
      if (response.config.url?.includes('/longzhou/imageResources/')) {
        return res
      }
      // 如果有data字段，返回data字段（标准格式）
      else if (res.data !== undefined) {
        return res.data
      }
      // 如果没有data字段，返回整个响应对象（适配后端实际格式）
      else {
        return res
      }
    } else if (res && res.code !== 200) {
      return Promise.reject(new Error(res.msg || '请求失败'))
    } else {
      return Promise.reject(new Error('响应格式异常'))
    }
  },
  (error: AxiosError) => {
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
