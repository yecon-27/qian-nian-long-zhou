// 投票相关 API
import api, { ApiResponse, PageResponse } from './index'
import { VoteRequest, VoteResponse, UserVoteStatus, VoteRecord, VoteRecordsParams } from './types'

// 用户投票
export const vote = async (request: VoteRequest): Promise<VoteResponse> => {
  const response = await api.post<ApiResponse<VoteResponse>>('/vote', request)
  return response.data
}

// 取消投票
export const cancelVote = async (userId: string, workId: number): Promise<VoteResponse> => {
  const response = await api.delete<ApiResponse<VoteResponse>>('/vote', {
    data: { userId, workId }
  })
  return response.data
}

// 检查用户投票状态
export const getUserVoteStatus = async (userId: string): Promise<UserVoteStatus> => {
  const response = await api.get<ApiResponse<UserVoteStatus>>(`/vote/status/${userId}`)
  return response.data
}

// 获取用户投票记录
export const getUserVoteRecords = async (userId: string, params: VoteRecordsParams = {}): Promise<PageResponse<VoteRecord>> => {
  const response = await api.get<ApiResponse<PageResponse<VoteRecord>>>(`/vote/records/${userId}`, { params })
  return response.data
}

// 批量检查作品投票状态
export const checkWorksVoteStatus = async (userId: string, workIds: number[]): Promise<Record<number, boolean>> => {
  const response = await api.post<ApiResponse<Record<number, boolean>>>('/vote/check-batch', {
    userId,
    workIds
  })
  return response.data
}