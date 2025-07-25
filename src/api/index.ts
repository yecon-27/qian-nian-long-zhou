// API 基础配置
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// 基础配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 通用响应接口
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: string
}

// 分页响应接口
export interface PageResponse<T> {
  total: number
  page: number
  size: number
  list: T[]
}

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加用户ID到请求头
    const userId = localStorage.getItem('dragon-boat-user-id')
    if (userId) {
      config.headers['User-ID'] = userId
    }

    // 添加用户IP（前端无法获取真实IP，使用占位符）
    config.headers['User-IP'] = 'frontend-request'

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }

    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data || config.params)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    console.log('API Response:', response.config.url, response.data)
    
    // 检查业务状态码
    if (response.data.code !== 200) {
      const error = new Error(response.data.message || '请求失败')
      ;(error as any).code = response.data.code
      throw error
    }
    
    return response.data
  },
  (error) => {
    console.error('Response Error:', error)
    
    // 处理网络错误
    if (!error.response) {
      throw new Error('网络连接失败，请检查网络设置')
    }
    
    // 处理HTTP状态码错误
    const { status, data } = error.response
    let message = '请求失败'
    
    switch (status) {
      case 400:
        message = data?.message || '请求参数错误'
        break
      case 401:
        message = '未授权访问'
        break
      case 403:
        message = '禁止访问'
        break
      case 404:
        message = '资源不存在'
        break
      case 429:
        message = '请求过于频繁，请稍后再试'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = data?.message || `请求失败 (${status})`
    }
    
    const apiError = new Error(message)
    ;(apiError as any).code = status
    throw apiError
  }
)

export default api