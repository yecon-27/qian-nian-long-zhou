import request from '@/utils/request'

// 查询龙舟活动图片资源列表
export function listImageResources(query) {
  return request({
    url: '/longzhou/imageResources/list',
    method: 'get',
    params: query
  })
}

// 查询龙舟活动图片资源详细
export function getImageResources(resourceId) {
  return request({
    url: '/longzhou/imageResources/' + resourceId,
    method: 'get'
  })
}

// 新增龙舟活动图片资源
export function addImageResources(data) {
  return request({
    url: '/longzhou/imageResources',
    method: 'post',
    data: data
  })
}

// 修改龙舟活动图片资源
export function updateImageResources(data) {
  return request({
    url: '/longzhou/imageResources',
    method: 'put',
    data: data
  })
}

// 删除龙舟活动图片资源
export function delImageResources(resourceId) {
  return request({
    url: '/longzhou/imageResources/' + resourceId,
    method: 'delete'
  })
}
