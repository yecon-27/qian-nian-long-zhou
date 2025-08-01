// 作品相关 API
import request from '@/utils/request'

// 获取作品列表
export function getWorks(params?: any) {
  return request({
    url: '/api/works',
    method: 'get',
    params
  })
}

// 获取作品详情
export function getWorkDetail(workId: number) {
  return request({
    url: `/api/works/${workId}`,
    method: 'get'
  })
}

// 获取作品排行榜
export function getWorksRanking(params?: any) {
  return request({
    url: '/api/works/ranking',
    method: 'get',
    params
  })
}

// 搜索作品
export function searchWorks(keyword: string, params?: any) {
  return request({
    url: '/api/works',
    method: 'get',
    params: { ...params, keyword }
  })
}

// 获取分类列表
export function getCategories() {
  return request({
    url: '/api/works/categories',
    method: 'get'
  })
}

// 获取热门标签
export function getPopularTags() {
  return request({
    url: '/api/works/tags/popular',
    method: 'get'
  })
}

// 记录作品浏览
export function recordWorkView(workId: number) {
  return request({
    url: `/api/works/${workId}/view`,
    method: 'post'
  })
}