// 统计相关 API
import request from '@/utils/request'

// 获取投票统计
export function getVoteStats(params?: any) {
  return request({
    url: '/api/stats/votes',
    method: 'get',
    params
  })
}

// 获取浏览统计
export function getViewStats(params?: any) {
  return request({
    url: '/api/stats/views',
    method: 'get',
    params
  })
}

// 记录浏览行为
export const recordView = async (workId: number, userId: string, pageType: string = 'detail'): Promise<void> => {
  try {
    await request({
      url: '/api/stats/view',
      method: 'post',
      data: {
        workId,
        userId,
        pageType,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }
    })
  } catch (error) {
    // 浏览记录失败不影响主要功能
    console.warn('记录浏览失败:', error)
  }
}