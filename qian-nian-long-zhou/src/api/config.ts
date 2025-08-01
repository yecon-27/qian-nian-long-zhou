// 配置相关 API
import request from '@/utils/request'

// 获取活动配置
export function getActivityConfig() {
  return request({
    url: '/api/config/activity',
    method: 'get'
  })
}

// 获取活动规则
export function getActivityRules() {
  return request({
    url: '/api/config/rules',
    method: 'get'
  })
}

// 检查活动状态
export function checkActivityStatus() {
  return request({
    url: '/api/config/status',
    method: 'get'
  })
}