// 作品相关 API
import api, { ApiResponse, PageResponse } from './index'
import { Work, WorkListParams, RankingParams } from './types'

// 获取作品列表
export const getWorks = async (params: WorkListParams = {}): Promise<PageResponse<Work>> => {
  const response = await api.get<ApiResponse<PageResponse<Work>>>('/works', { params })
  return response.data
}

// 获取作品详情
export const getWorkDetail = async (workId: number): Promise<Work> => {
  const response = await api.get<ApiResponse<Work>>(`/works/${workId}`)
  return response.data
}

// 获取作品排行榜
export const getWorksRanking = async (params: RankingParams = {}): Promise<Work[]> => {
  const response = await api.get<ApiResponse<Work[]>>('/works/ranking', { params })
  return response.data
}

// 搜索作品
export const searchWorks = async (keyword: string, params: Omit<WorkListParams, 'keyword'> = {}): Promise<PageResponse<Work>> => {
  const response = await api.get<ApiResponse<PageResponse<Work>>>('/works', { 
    params: { ...params, keyword } 
  })
  return response.data
}

// 获取分类列表
export const getCategories = async (): Promise<string[]> => {
  const response = await api.get<ApiResponse<string[]>>('/works/categories')
  return response.data
}

// 获取热门标签
export const getPopularTags = async (): Promise<string[]> => {
  const response = await api.get<ApiResponse<string[]>>('/works/tags/popular')
  return response.data
}