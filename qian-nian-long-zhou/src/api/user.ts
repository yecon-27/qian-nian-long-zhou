// 用户相关 API
import request from '@/utils/request'

// 生成用户ID
export function generateUserId(data?: any) {
  return request({
    url: '/api/user/generate',
    method: 'post',
    data: {
      deviceInfo: navigator.userAgent,
      userAgent: navigator.userAgent,
      userIp: 'frontend-request',
      ...data
    }
  })
}

// 验证用户ID
export function validateUserId(userId: string) {
  return request({
    url: `/api/user/validate/${userId}`,
    method: 'get'
  })
}

// 获取或创建用户ID
export const getOrCreateUserId = async (): Promise<string> => {
  const STORAGE_KEY = 'dragon-boat-user-id'
  
  // 尝试从本地存储获取
  let userId = localStorage.getItem(STORAGE_KEY)
  
  if (userId) {
    try {
      // 验证用户ID是否有效
      const validation = await validateUserId(userId)
      if (validation.valid) {
        return userId
      }
    } catch (error) {
      console.warn('用户ID验证失败，将重新生成:', error)
    }
  }
  
  // 生成新的用户ID
  try {
    const user = await generateUserId()
    userId = user.userId
    localStorage.setItem(STORAGE_KEY, userId)
    return userId
  } catch (error) {
    console.error('生成用户ID失败:', error)
    // 降级方案：生成本地用户ID
    userId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(STORAGE_KEY, userId)
    return userId
  }
}