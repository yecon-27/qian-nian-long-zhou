// 用户认证 Store (配合若依后端)
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/team'

export interface User {
  userId: number
  username: string
  nickname: string
  avatar?: string
  email?: string
  phone?: string
  roles: string[]
  permissions: string[]
}

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)
  const loading = ref(false)
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // 登录
  const login = async (username: string, password: string) => {
    try {
      loading.value = true
      const response = await authApi.login(username, password)
      
      // 保存 token
      token.value = (response as any).token
      localStorage.setItem('token', (response as any).token)
      
      // 获取用户信息
      await getUserInfo()
      
      return true
    } catch (error: any) {
      console.error('登录失败:', error)
      throw new Error(error.message || '登录失败')
    } finally {
      loading.value = false
    }
  }

  // 注册
  const register = async (userData: any) => {
    try {
      loading.value = true
      await authApi.register(userData)
      return true
    } catch (error: any) {
      console.error('注册失败:', error)
      throw new Error(error.message || '注册失败')
    } finally {
      loading.value = false
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await authApi.getUserInfo()
      user.value = (response as any).user
      return (response as any).user
    } catch (error) {
      console.error('获取用户信息失败:', error)
      // 如果获取用户信息失败，清除登录状态
      logout()
      throw error
    }
  }

  // 登出
  const logout = async () => {
    try {
      if (token.value) {
        await authApi.logout()
      }
    } catch (error) {
      console.error('登出请求失败:', error)
    } finally {
      // 清除本地状态
      token.value = null
      user.value = null
      localStorage.removeItem('token')
    }
  }

  // 检查权限
  const hasPermission = (permission: string) => {
    return user.value?.permissions?.includes(permission) || false
  }

  // 检查角色
  const hasRole = (role: string) => {
    return user.value?.roles?.includes(role) || false
  }

  // 初始化认证状态
  const initAuth = async () => {
    if (token.value) {
      try {
        await getUserInfo()
      } catch (error) {
        // 如果 token 无效，清除登录状态
        logout()
      }
    }
  }

  return {
    // 状态
    token,
    user,
    loading,
    isAuthenticated,
    
    // 方法
    login,
    register,
    getUserInfo,
    logout,
    hasPermission,
    hasRole,
    initAuth
  }
})
