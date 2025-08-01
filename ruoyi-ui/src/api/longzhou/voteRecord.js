import request from '@/utils/request'

// 查询投票记录-每日每用户每队伍限投1次列表
export function listVoteRecord(query) {
  return request({
    url: '/longzhou/voteRecord/list',
    method: 'get',
    params: query
  })
}

// 查询投票记录-每日每用户每队伍限投1次详细
export function getVoteRecord(voteId) {
  return request({
    url: '/longzhou/voteRecord/' + voteId,
    method: 'get'
  })
}

// 新增投票记录-每日每用户每队伍限投1次
export function addVoteRecord(data) {
  return request({
    url: '/longzhou/voteRecord',
    method: 'post',
    data: data
  })
}

// 修改投票记录-每日每用户每队伍限投1次
export function updateVoteRecord(data) {
  return request({
    url: '/longzhou/voteRecord',
    method: 'put',
    data: data
  })
}

// 删除投票记录-每日每用户每队伍限投1次
export function delVoteRecord(voteId) {
  return request({
    url: '/longzhou/voteRecord/' + voteId,
    method: 'delete'
  })
}
