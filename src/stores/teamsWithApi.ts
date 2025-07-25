import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getWorks, getWorkDetail, getWorksRanking } from '@/api/works'
import { vote, cancelVote, getUserVoteStatus, checkWorksVoteStatus } from '@/api/vote'
import { getActivityConfig } from '@/api/config'
import { getOrCreateUserId } from '@/api/user'
import { recordView } from '@/api/stats'
import type { Work, UserVoteStatus, ActivityConfig } from '@/api/types'

// 转换 API 数据到前端数据格式
const convertWorkToTeamCard = (work: Work) => ({
  id: work.workId,
  title: work.workTitle,
  author: work.workAuthor,
  votes: work.totalVotes,
  originalVotes: work.totalVotes, // API中没有原始票数概念，使用当前票数
  voted: work.userVoted || false,
  readCount: work.totalViews,
  description: work.workDescription,
  img: work.workImage,
  // 新增字段
  todayVotes: work.todayVotes,
  todayViews: work.todayViews,
  ranking: work.ranking,
  category: work.workCategory,
  tags: work.workTags || [],
  isFeatured: work.isFeatured,
  createTime: work.createTime
})

export const useTeamsStore = defineStore('teams', () => {
  // 基础状态
  const teamCards = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentUserId = ref<string>('')
  const userVoteStatus = ref<UserVoteStatus | null>(null)
  const activityConfig = ref<ActivityConfig | null>(null)

  // 初始化用户ID
  const initializeUserId = async () => {
    try {
      currentUserId.value = await getOrCreateUserId()
    } catch (error) {
      console.error('初始化用户ID失败:', error)
      // 降级方案
      currentUserId.value = `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
  }

  // 加载活动配置
  const loadActivityConfig = async () => {
    try {
      activityConfig.value = await getActivityConfig()
    } catch (error) {
      console.error('加载活动配置失败:', error)
      // 使用默认配置
      activityConfig.value = {
        configId: 1,
        activityName: '千年龙舟创意新生',
        activityTitle: '千年龙舟创意新生 - 龙舟文化作品征集活动',
        activityDesc: '传承千年龙舟文化，展现创意新生力量',
        startTime: '2025-07-01T00:00:00Z',
        endTime: '2025-08-31T23:59:59Z',
        voteStartTime: '2025-07-15T00:00:00Z',
        voteEndTime: '2025-08-25T23:59:59Z',
        dailyVoteLimit: 3,
        maxTeamsPerVote: 3,
        activityRules: '1. 每人每天最多可投票3次\n2. 每次最多可选择3个作品',
        status: 1
      }
    }
  }

  // 加载用户投票状态
  const loadUserVoteStatus = async () => {
    if (!currentUserId.value) return
    
    try {
      userVoteStatus.value = await getUserVoteStatus(currentUserId.value)
    } catch (error) {
      console.error('加载用户投票状态失败:', error)
      // 使用默认状态
      userVoteStatus.value = {
        userId: currentUserId.value,
        todayVotes: 0,
        remainingVotes: 3,
        dailyLimit: 3,
        votedWorks: [],
        canVote: true
      }
    }
  }

  // 加载作品列表
  const loadTeamCards = async (params: any = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await getWorks({
        page: 1,
        size: 100, // 加载所有作品
        sort: 'votes_desc',
        ...params
      })
      
      // 转换数据格式
      teamCards.value = response.list.map(convertWorkToTeamCard)
      
      // 批量检查投票状态
      if (currentUserId.value && teamCards.value.length > 0) {
        try {
          const workIds = teamCards.value.map(card => card.id)
          const voteStatus = await checkWorksVoteStatus(currentUserId.value, workIds)
          
          // 更新投票状态
          teamCards.value.forEach(card => {
            card.voted = voteStatus[card.id] || false
          })
        } catch (error) {
          console.warn('检查投票状态失败:', error)
        }
      }
      
    } catch (err: any) {
      error.value = err.message || '加载数据失败'
      console.error('加载作品列表失败:', err)
    } finally {
      loading.value = false
    }
  }

  // 计算属性：按票数排序
  const rankedCards = computed(() => {
    return [...teamCards.value].sort((a, b) => b.votes - a.votes)
  })

  // 计算属性：已投票的卡片数量
  const selectedCardsCount = computed(() => {
    return userVoteStatus.value?.todayVotes || 0
  })

  // 计算属性：已投票的卡片
  const selectedCards = computed(() => {
    const votedWorkIds = userVoteStatus.value?.votedWorks || []
    return teamCards.value.filter(card => votedWorkIds.includes(card.id))
  })

  // 投票功能
  const toggleLike = async (cardId: number) => {
    if (!currentUserId.value) {
      alert('用户身份验证失败，请刷新页面重试')
      return
    }

    const card = teamCards.value.find(c => c.id === cardId)
    if (!card) return

    try {
      if (card.voted) {
        // 取消投票
        const result = await cancelVote(currentUserId.value, cardId)
        
        // 更新本地状态
        card.voted = false
        card.votes = result.newVoteCount
        
        // 更新用户投票状态
        if (userVoteStatus.value) {
          userVoteStatus.value.todayVotes--
          userVoteStatus.value.remainingVotes++
          const index = userVoteStatus.value.votedWorks.indexOf(cardId)
          if (index > -1) {
            userVoteStatus.value.votedWorks.splice(index, 1)
          }
        }
        
      } else {
        // 检查投票权限
        if (userVoteStatus.value && userVoteStatus.value.remainingVotes <= 0) {
          alert(`您今天的投票次数已用完，每日限投${userVoteStatus.value.dailyLimit}次`)
          return
        }

        // 投票
        const result = await vote({
          userId: currentUserId.value,
          workId: cardId,
          userAgent: navigator.userAgent
        })
        
        // 更新本地状态
        card.voted = true
        card.votes = result.newVoteCount
        
        // 更新用户投票状态
        if (userVoteStatus.value) {
          userVoteStatus.value.todayVotes++
          userVoteStatus.value.remainingVotes--
          userVoteStatus.value.votedWorks.push(cardId)
        }
      }
      
      // 重新排序
      updateRankings()
      
    } catch (err: any) {
      error.value = err.message || '操作失败'
      alert(err.message || '操作失败，请稍后重试')
      console.error('投票操作失败:', err)
    }
  }

  // 更新排名
  const updateRankings = () => {
    const sorted = [...teamCards.value].sort((a, b) => b.votes - a.votes)
    sorted.forEach((card, index) => {
      const originalCard = teamCards.value.find(c => c.id === card.id)
      if (originalCard) {
        originalCard.ranking = index + 1
      }
    })
  }

  // 记录浏览
  const recordViewAction = async (cardId: number) => {
    if (!currentUserId.value) return
    
    try {
      await recordView(cardId, currentUserId.value, 'detail')
      
      // 更新本地浏览数
      const card = teamCards.value.find(c => c.id === cardId)
      if (card) {
        card.readCount++
        card.todayViews = (card.todayViews || 0) + 1
      }
    } catch (error) {
      console.warn('记录浏览失败:', error)
    }
  }

  // 获取队伍排名
  const getTeamRank = (teamId: number) => {
    const card = teamCards.value.find(c => c.id === teamId)
    return card?.ranking || 0
  }

  // 根据关键词过滤卡片
  const getFilteredCards = (keyword: string) => {
    if (!keyword) {
      return teamCards.value
    }
    
    const searchKeyword = keyword.toLowerCase()
    return teamCards.value.filter(card => 
      card.title.toLowerCase().includes(searchKeyword) || 
      card.author.toLowerCase().includes(searchKeyword) ||
      card.category?.toLowerCase().includes(searchKeyword) ||
      card.tags?.some((tag: string) => tag.toLowerCase().includes(searchKeyword))
    )
  }

  // 刷新数据
  const refreshData = async () => {
    await Promise.all([
      loadTeamCards(),
      loadUserVoteStatus(),
      loadActivityConfig()
    ])
  }

  // 每日重置检查（保持兼容性）
  const checkNewDay = () => {
    // API版本中，每日重置由后端处理
    return false
  }

  // 重置所有投票（保持兼容性）
  const resetSelection = async () => {
    // API版本中，这个功能需要调用后端接口
    console.warn('API版本中不支持重置所有投票')
  }

  // 初始化
  const initialize = async () => {
    await initializeUserId()
    await Promise.all([
      loadActivityConfig(),
      loadUserVoteStatus(),
      loadTeamCards()
    ])
  }

  return {
    // 状态
    teamCards,
    loading,
    error,
    currentUserId,
    userVoteStatus,
    activityConfig,
    
    // 计算属性
    rankedCards,
    selectedCardsCount,
    selectedCards,
    
    // 方法
    initialize,
    loadTeamCards,
    loadUserVoteStatus,
    toggleLike,
    recordViewAction,
    getTeamRank,
    getFilteredCards,
    refreshData,
    updateRankings,
    
    // 兼容性方法
    checkNewDay,
    resetSelection
  }
})