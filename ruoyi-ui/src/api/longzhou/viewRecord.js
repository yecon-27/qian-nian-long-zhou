import request from '@/utils/request'

// 查询浏览记录列表
export function listViewRecord(query) {
  return request({
    url: '/longzhou/viewRecord/list',
    method: 'get',
    params: query
  })
}

// 查询浏览记录详细
export function getViewRecord(viewId) {
  return request({
    url: '/longzhou/viewRecord/' + viewId,
    method: 'get'
  })
}

// 新增浏览记录
export function addViewRecord(data) {
  return request({
    url: '/longzhou/viewRecord',
    method: 'post',
    data: data
  })
}

// 修改浏览记录
export function updateViewRecord(data) {
  return request({
    url: '/longzhou/viewRecord',
    method: 'put',
    data: data
  })
}

// 删除浏览记录
export function delViewRecord(viewId) {
  return request({
    url: '/longzhou/viewRecord/' + viewId,
    method: 'delete'
  })
}
