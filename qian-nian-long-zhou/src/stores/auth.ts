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
      
      let response
      try {
        response = await authApi.login(username, password)
      } catch (apiError: any) {
        // 如果是网络错误或401错误，给出更友好的提示
        if (apiError.message?.includes('网络连接失败')) {
          throw new Error('无法连接到服务器，请检查网络连接或确认后端服务是否启动')
        } else if (apiError.response?.status === 401) {
          throw new Error('用户名或密码错误')
        } else if (apiError.response?.status === 404) {
          throw new Error('登录接口不存在，请检查后端配置')
        } else {
          throw new Error(apiError.message || '登录请求失败')
        }
      }
      
      // 根据若依框架的响应格式处理token
      let tokenValue: string
      let userInfo: any
      
      console.log('Login API Response:', response); // <-- 在这里添加 console.log

      if (response === null || response === undefined) {
        throw new Error('登录响应为空，这可能是因为后端返回了错误状态码')
      }
      
      if (typeof response === 'string') {
        // 如果响应直接是token字符串
        tokenValue = response
      } else if (typeof response === 'object') {
        // 如果response直接包含token
        if ((response as any).token) {
          tokenValue = (response as any).token
          userInfo = (response as any).user
        }
        // 如果response是嵌套结构
        else if ((response as any).data && (response as any).data.token) {
          tokenValue = (response as any).data.token
          userInfo = (response as any).data.user
        }
        else {
          throw new Error('登录响应格式错误：未找到token字段')
        }
      } else {
        throw new Error(`登录响应格式错误：期望对象或字符串，实际收到 ${typeof response}`)
      }
      
      if (!tokenValue) {
        throw new Error('token值为空')
      }
      
      // 保存 token
      token.value = tokenValue
      localStorage.setItem('token', tokenValue)
      
      console.log('Extracted User Info:', userInfo); // <-- 在这里添加 console.log

      // 如果响应中包含用户信息，直接使用；否则调用getUserInfo
      if (userInfo) {
        user.value = userInfo
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      } else {
        await getUserInfo()
      }
      
      return true
    } catch (error: any) {
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
      throw new Error(error.message || '注册失败')
    } finally {
      loading.value = false
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await authApi.getUserInfo() as any
      // 若依后端返回的数据结构是 { ..., user: { ... } }
      // 我们的 request 拦截器会返回 data 部分，所以 response 就是那个 data 对象
      if (response && response.user) {
        // 后端返回的 user 对象字段可能与前端不完全匹配，需要适配
        const backendUser = response.user;
        user.value = {
          userId: backendUser.userId,
          username: backendUser.userName, // 后端是 userName
          nickname: backendUser.nickName, // 后端是 nickName
          avatar: backendUser.avatar,
          email: backendUser.email,
          phone: backendUser.phonenumber,
          roles: response.roles || [],
          permissions: response.permissions || []
        };
        localStorage.setItem('userInfo', JSON.stringify(user.value));
      } else {
        console.warn('Get User Info response does not contain a valid user object.', response);
      }
      return response
    } catch (error) {
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
