// 配置相关 API
import api, { type ApiResponse } from './index'
import type { ActivityConfig, ActivityRules } from './types'

// 获取活动配置
export const getActivityConfig = async (): Promise<ActivityConfig> => {
  const response = await api.get<ApiResponse<ActivityConfig>>('/config/activity')
  return response as unknown as ActivityConfig
}

// 获取活动规则
export const getActivityRules = async (): Promise<ActivityRules> => {
  const response = await api.get<ApiResponse<ActivityRules>>('/config/rules')
  return response as unknown as ActivityRules
}

// 检查活动状态
export const checkActivityStatus = async (): Promise<{
  isActive: boolean
  isVotingTime: boolean
  message: string
}> => {
  const response = await api.get<ApiResponse<{
    isActive: boolean
    isVotingTime: boolean
    message: string
  }>>('/config/status')
  return response as unknown as {
    isActive: boolean
    isVotingTime: boolean
    message: string
  }
}