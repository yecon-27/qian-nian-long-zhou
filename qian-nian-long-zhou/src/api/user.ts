// 用户相关 API
import request from '@/utils/request'

export const STORAGE_KEY = 'dragon-boat-user-id'

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

// 获取或创建用户ID - 修复为异步函数
export async function getOrCreateUserId(): Promise<string> {
  const existingUserId = localStorage.getItem(STORAGE_KEY);
  
  if (existingUserId) {
    try {
      // 验证用户ID是否有效
      const validation = await validateUserId(existingUserId) as any;
      if (validation.data?.valid) {
        return existingUserId;
      }
    } catch (error) {
      console.warn('用户ID验证失败，将重新生成:', error);
    }
  }
  
  // 生成新的用户ID
  try {
    const response = await generateUserId() as any;
    const newUserId = response.data?.userId;
    if (newUserId) {
      localStorage.setItem(STORAGE_KEY, newUserId);
      return newUserId;
    }
  } catch (error) {
    console.error('生成用户ID失败:', error);
  }
  
  // 降级方案：生成本地用户ID
  const fallbackUserId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem(STORAGE_KEY, fallbackUserId);
  return fallbackUserId;
}

// 保存用户ID
export function saveUserId(userId: string | null) {
  if (userId) {
    localStorage.setItem(STORAGE_KEY, userId);
  }
}