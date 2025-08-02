// 与若依后端集成的 Teams Store - 支持Mock模式
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { teamApi, voteApi, type TeamCard } from '@/api/team'
import { voteApi } from '@/api/team'
import { useAuthStore } from '@/stores/auth'

// 检查是否使用Mock数据
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const useTeamsStore = defineStore('teams', () => {
  // 状态
  const teams = ref<TeamCard[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasVotedToday = ref(false)
  const currentUser = ref<any>(null)

  // 计算属性
  const rankedCards = computed(() => {
    return [...teams.value].sort((a, b) => b.voteCount - a.voteCount)
  })

  const totalVotes = computed(() => {
    return teams.value.reduce((sum, team) => sum + team.voteCount, 0)
  })

  // 操作方法

  // 加载队伍列表
  const loadTeams = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await teamApi.getTeamList()
      teams.value = (response as any) || []
    } catch (err: any) {
      error.value = err.message || '加载队伍列表失败'
      console.error('加载队伍列表失败:', err)
      
      // 如果后端不可用，回退到本地数据
      loadLocalFallbackData()
    } finally {
      loading.value = false
    }
  }

  // 检查今日投票状态
  const checkTodayVoteStatus = async () => {
    try {
      const response = await voteApi.checkTodayVote()
      hasVotedToday.value = (response as any).hasVoted || false
    } catch (err) {
      console.error('检查投票状态失败:', err)
      // 回退到本地存储检查
      checkLocalVoteStatus()
    }
  }

  // 为队伍投票
  const voteForTeam = async (teamId: number) => {
    const authStore = useAuthStore()
    
    // 检查登录状态
    if (!authStore.isAuthenticated || !authStore.user?.userId) {
      throw new Error('请先登录后再投票')
    }

    try {
      loading.value = true
      
      // 调用后端API进行投票
      const response = await teamApi.voteForTeam(teamId, authStore.user.userId.toString())
      
      if (response.code === 200) {
        // 投票成功，更新本地状态
        const team = teams.value.find(t => t.id === teamId)
        if (team) {
          team.voteCount += 1
        }
        
        // 更新投票状态
        hasVotedToday.value = true
        
        // 重新加载数据确保同步
        await loadTeams()
        
        return true
      } else {
        throw new Error(response.msg || '投票失败')
      }
    } catch (err: any) {
      error.value = err.message || '投票失败'
      console.error('投票失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 检查用户投票状态
  const checkUserVoteStatus = async () => {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated || !authStore.user?.userId) {
      hasVotedToday.value = false
      return
    }

    try {
      const response = await voteApi.getUserVoteStatus(authStore.user.userId.toString())
      
      if (response.code === 200) {
        const status = response.data
        hasVotedToday.value = status.todayVoteCount >= status.dailyVoteLimit
      }
    } catch (err) {
      console.error('检查投票状态失败:', err)
      // 如果API调用失败，回退到本地检查
      checkLocalVoteStatus()
    }
  }

  // 为队伍点赞
  const likeTeam = async (teamId: number) => {
    try {
      await teamApi.likeTeam(teamId)
      
      // 更新本地状态
      const team = teams.value.find(t => t.id === teamId)
      if (team) {
        team.likeCount += 1
      }
      
      // 重新加载数据确保同步
      await loadTeams()
      
      return true
    } catch (err: any) {
      console.error('点赞失败:', err)
      
      // 如果后端不可用，使用本地逻辑
      return likeTeamLocal(teamId)
    }
  }

  // 增加阅读量
  const increaseReadCount = async (teamId: number) => {
    try {
      await teamApi.increaseReadCount(teamId)
      
      // 更新本地状态
      const team = teams.value.find(t => t.id === teamId)
      if (team) {
        team.readCount += 1
      }
    } catch (err) {
      console.error('增加阅读量失败:', err)
      // 静默失败，不影响用户体验
    }
  }

  // 获取队伍详情
  const getTeamDetail = async (teamId: number) => {
    try {
      const response = await teamApi.getTeamDetail(teamId)
      return response
    } catch (err) {
      console.error('获取队伍详情失败:', err)
      // 回退到本地数据
      return teams.value.find(t => t.id === teamId)
    }
  }

  // 本地回退方法（当后端不可用时使用）

  // 加载本地回退数据
  const loadLocalFallbackData = () => {
    const defaultTeams: TeamCard[] = [
      {
        id: 1,
        teamName: "瑞安龙舟一队",
        teamLogo: "/assets/teams/team1.jpg",
        teamDescription: "瑞安市传统龙舟队，成立于1985年...",
        voteCount: 0,
        likeCount: 0,
        readCount: 0,
        status: "0",
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      }
      // 可以添加更多队伍数据
    ]

    // 尝试从本地存储加载
    const stored = localStorage.getItem('teams_fallback_data')
    if (stored) {
      try {
        teams.value = JSON.parse(stored)
      } catch (err) {
        teams.value = defaultTeams
      }
    } else {
      teams.value = defaultTeams
    }
  }

  // 检查本地投票状态
  const checkLocalVoteStatus = () => {
    const today = new Date().toDateString()
    const lastVoteDate = localStorage.getItem('last_vote_date')
    hasVotedToday.value = lastVoteDate === today
  }

  // 本地投票逻辑
  const voteForTeamLocal = (teamId: number) => {
    if (hasVotedToday.value) {
      throw new Error('今日已投票，请明天再来！')
    }

    const team = teams.value.find(t => t.id === teamId)
    if (team) {
      team.voteCount += 1
      hasVotedToday.value = true
      localStorage.setItem('last_vote_date', new Date().toDateString())
      saveToLocalStorage()
      return true
    }
    return false
  }

  // 本地点赞逻辑
  const likeTeamLocal = (teamId: number) => {
    const team = teams.value.find(t => t.id === teamId)
    if (team) {
      team.likeCount += 1
      saveToLocalStorage()
      return true
    }
    return false
  }

  // 保存到本地存储
  const saveToLocalStorage = () => {
    localStorage.setItem('teams_fallback_data', JSON.stringify(teams.value))
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
    currentUser,
    
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
    clearError,
    
    // 本地回退方法
    loadLocalFallbackData,
    saveToLocalStorage
  }
})
