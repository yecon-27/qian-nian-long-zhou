import request from '@/utils/request'

// 图片资源接口类型定义
export interface ImageResource {
  resourceId: number
  resourceName: string
  resourceKey: string
  fileName: string
  filePath: string
  fileUrl: string
  fileSize?: number
  fileType?: string
  category?: string
  description?: string
  status: number
  sortOrder?: number
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
}

// 图片资源查询参数
export interface ImageResourceQuery {
  resourceName?: string
  resourceKey?: string
  category?: string
  status?: number
  fileType?: string
}

/**
 * 查询图片资源列表
 */
export function listImageResources(query?: ImageResourceQuery) {
  return request({
    url: '/longzhou/imageResources/list',
    method: 'get',
    params: query
  })
}

/**
 * 根据资源键值获取图片资源
 */
export function getImageResourceByKey(resourceKey: string) {
  return request({
    url: `/longzhou/imageResources/key/${resourceKey}`,
    method: 'get'
  })
}

/**
 * 根据分类获取图片资源列表
 */
export function getImageResourcesByCategory(category: string) {
  return request({
    url: '/longzhou/imageResources/category/' + category,
    method: 'get'
  })
}

/**
 * 获取图片资源详细信息
 */
export function getImageResource(resourceId: number) {
  return request({
    url: '/longzhou/imageResources/' + resourceId,
    method: 'get'
  })
}

/**
 * 新增图片资源
 */
export function addImageResource(data: Partial<ImageResource>) {
  return request({
    url: '/longzhou/imageResources',
    method: 'post',
    data: data
  })
}

/**
 * 修改图片资源
 */
export function updateImageResource(data: ImageResource) {
  return request({
    url: '/longzhou/imageResources',
    method: 'put',
    data: data
  })
}

/**
 * 删除图片资源
 */
export function delImageResource(resourceId: number | number[]) {
  return request({
    url: '/longzhou/imageResources/' + resourceId,
    method: 'delete'
  })
}