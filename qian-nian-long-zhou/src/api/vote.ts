// 投票相关 API
import request from '@/utils/request'

// 用户投票
export function vote(data: { userId: string; workId: number }) {
  return request({
    url: '/api/vote',
    method: 'post',
    data: { 
      userId: data.userId,    // ✅ 添加userId
      workId: data.workId     // ✅ 使用workId而不是teamId
    }
  })
}

// 取消投票
export function cancelVote(data: { userId: string; workId: number }) {
  return request({
    url: '/api/vote',
    method: 'delete',
    data: { 
      userId: data.userId,    // ✅ 添加userId
      workId: data.workId     // ✅ 使用workId而不是teamId
    }
  })
}

// 检查用户投票状态
export function getUserVoteStatus(userId: string) {
  return request({
    url: `/api/vote/status/${userId}`,
    method: 'get'
  })
}

// 获取用户投票记录
export function getUserVoteRecords(userId: string, params?: any) {
  return request({
    url: `/api/vote/records/${userId}`,
    method: 'get',
    params
  })
}

// 批量检查作品投票状态
export function checkWorksVoteStatus(data: any) {
  return request({
    url: '/api/vote/check-batch',
    method: 'post',
    data
  })
}