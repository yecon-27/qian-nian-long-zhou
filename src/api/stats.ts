// 统计相关 API
import api, { type ApiResponse } from './index'
import type { VoteStats, ViewStats, StatsParams } from './types'

// 获取投票统计
export const getVoteStats = async (params: StatsParams = {}): Promise<VoteStats> => {
  const response = await api.get<ApiResponse<VoteStats>>('/stats/votes', { params })
  return response as unknown as VoteStats
}

// 获取浏览统计
export const getViewStats = async (params: StatsParams = {}): Promise<ViewStats> => {
  const response = await api.get<ApiResponse<ViewStats>>('/stats/views', { params })
  return response as unknown as ViewStats
}

// 记录浏览行为
export const recordView = async (workId: number, userId: string, pageType: string = 'detail'): Promise<void> => {
  try {
    await api.post('/stats/view', {
      workId,
      userId,
      pageType,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    })
  } catch (error) {
    // 浏览记录失败不影响主要功能
    console.warn('记录浏览失败:', error)
  }
}