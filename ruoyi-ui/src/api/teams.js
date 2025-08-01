import request from '@/utils/request'

// 获取队伍列表 - 用于投票页面（临时使用 works 接口）
export function getTeamsList() {
  return request({
    url: '/api/works',
    method: 'get'
  })
}

// 获取队伍排行榜 - 用于排行榜页面
export function getTeamsRanking() {
  return request({
    url: '/api/works/ranking',
    method: 'get'
  })
}

// 获取队伍详情 - 用于详情页面（临时使用 works 接口）
export function getTeamDetail(teamId) {
  return request({
    url: '/api/works/' + teamId,
    method: 'get'
  })
}

// 为队伍投票（使用现有的投票接口）
export function voteForTeam(teamId, userId, userIp = '', userAgent = '') {
  return request({
    url: '/api/vote',
    method: 'post',
    data: {
      userId: userId.toString(),
      workId: teamId,
      userIp: userIp,
      userAgent: userAgent
    }
  })
}

// 取消投票
export function cancelVoteForTeam(teamId, userId) {
  return request({
    url: '/api/vote',
    method: 'delete',
    data: {
      userId: userId.toString(),
      workId: teamId
    }
  })
}

// 获取用户投票状态
export function getUserVoteStatus(userId) {
  return request({
    url: '/api/vote/status/' + userId,
    method: 'get'
  })
}

// 增加浏览量（使用现有的作品详情接口，会自动记录浏览量）
export function increaseTeamView(teamId, userId, userIp) {
  return getTeamDetail(teamId)
}

// 兼容旧的 API 调用 - 重定向到新接口
export function getWorksRanking() {
  return getTeamsRanking()
}

export function getWorksList() {
  return getTeamsList()
}