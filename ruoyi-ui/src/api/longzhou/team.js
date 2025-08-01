import request from '@/utils/request'

// 查询龙舟队伍信息列表
export function listTeam(query) {
  return request({
    url: '/longzhou/team/list',
    method: 'get',
    params: query
  })
}

// 查询龙舟队伍信息详细
export function getTeam(teamId) {
  return request({
    url: '/longzhou/team/' + teamId,
    method: 'get'
  })
}

// 新增龙舟队伍信息
export function addTeam(data) {
  return request({
    url: '/longzhou/team',
    method: 'post',
    data: data
  })
}

// 修改龙舟队伍信息
export function updateTeam(data) {
  return request({
    url: '/longzhou/team',
    method: 'put',
    data: data
  })
}

// 删除龙舟队伍信息
export function delTeam(teamId) {
  return request({
    url: '/longzhou/team/' + teamId,
    method: 'delete'
  })
}
