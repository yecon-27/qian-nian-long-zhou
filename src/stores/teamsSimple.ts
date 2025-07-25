// 简化版本的 Teams Store (用于测试)
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { mockTeamApi, mockVoteApi, type TeamCard } from '@/api/mockApi'

export const useTeamsStore = defineStore('teams', () => {
  // 状态
  const teams = ref<TeamCard[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasVotedToday = ref(false)

  // 计算属性
  const rankedCards = computed(() => {
    return [...teams.value].sort((a, b) => b.voteCount - a.voteCount)
  })

  const totalVotes = computed(() => {
    return teams.value.reduce((sum, team) => sum + team.voteCount, 0)
  })

  // 加载队伍列表
  const loadTeams = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await mockTeamApi.getTeamList()
      teams.value = response || []
    } catch (err: any) {
      error.value = err.message || '加载队伍列表失败'
      console.error('加载队伍列表失败:', err)
    } finally {
      loading.value = false
    }
  }

  // 检查今日投票状态
  const checkTodayVoteStatus = async () => {
    try {
      const response = await mockVoteApi.checkTodayVote()
      hasVotedToday.value = response.hasVoted || false
    } catch (err) {
      console.error('检查投票状态失败:', err)
    }
  }

  // 为队伍投票
  const voteForTeam = async (teamId: number) => {
    if (hasVotedToday.value) {
      throw new Error('今日已投票，请明天再来！')
    }

    try {
      loading.value = true
      await mockTeamApi.voteForTeam(teamId)
      
      // 更新本地状态
      const team = teams.value.find(t => t.id === teamId)
      if (team) {
        team.voteCount += 1
      }
      
      hasVotedToday.value = true
      localStorage.setItem('last_vote_date', new Date().toDateString())
      
      return true
    } catch (err: any) {
      error.value = err.message || '投票失败'
      console.error('投票失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 为队伍点赞
  const likeTeam = async (teamId: number) => {
    try {
      await mockTeamApi.likeTeam(teamId)
      
      // 更新本地状态
      const team = teams.value.find(t => t.id === teamId)
      if (team) {
        team.likeCount += 1
      }
      
      return true
    } catch (err: any) {
      console.error('点赞失败:', err)
      throw err
    }
  }

  // 增加阅读量
  const increaseReadCount = async (teamId: number) => {
    try {
      await mockTeamApi.increaseReadCount(teamId)
      
      // 更新本地状态
      const team = teams.value.find(t => t.id === teamId)
      if (team) {
        team.readCount += 1
      }
    } catch (err) {
      console.error('增加阅读量失败:', err)
    }
  }

  // 获取队伍详情
  const getTeamDetail = async (teamId: number) => {
    try {
      const response = await mockTeamApi.getTeamDetail(teamId)
      return response
    } catch (err) {
      console.error('获取队伍详情失败:', err)
      return teams.value.find(t => t.id === teamId)
    }
  }

  // 初始化数据
  const initialize = async () => {
    await loadTeams()
    await checkTodayVoteStatus()
  }

  // 重置错误状态
  const clearError = () => {
    error.value = null
  }

  return {
    // 状态
    teams,
    loading,
    error,
    hasVotedToday,
    
    // 计算属性
    rankedCards,
    totalVotes,
    
    // 方法
    loadTeams,
    checkTodayVoteStatus,
    voteForTeam,
    likeTeam,
    increaseReadCount,
    getTeamDetail,
    initialize,
    clearError
  }
})
