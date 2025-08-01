mport { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

// 改进的队伍数据类型 - 与数据库字段对应
export interface TeamCard {
  id: number              // 对应 work_id
  title: string          // 对应 work_title  
  author: string         // 对应 work_author
  votes: number          // 对应 total_votes
  originalVotes: number  // 基础票数
  voted: boolean         // 当前用户是否已投票
  readCount: number      // 对应 total_views
  description: string    // 对应 work_description
  img?: string          // 对应 work_image
  // 新增字段，为将来数据库对接做准备
  todayVotes?: number   // 今日票数
  todayViews?: number   // 今日浏览数
  ranking?: number      // 排名
  category?: string     // 分类
  tags?: string[]       // 标签
}

// 用户投票记录（模拟数据库记录）
export interface VoteRecord {
  userId: string
  teamId: number
  voteDate: string
  voteTime: string
  userIP?: string
}

// 活动配置（模拟数据库配置）
export interface ActivityConfig {
  activityName: string
  dailyVoteLimit: number
  maxTeamsPerVote: number
  startTime: string
  endTime: string
  voteStartTime: string
  voteEndTime: string
  activityRules: string
  ruleImage?: string
  bannerImage?: string
}

// 本地存储的key
const STORAGE_KEY = 'dragon-boat-teams-data'
const VOTE_RECORDS_KEY = 'dragon-boat-vote-records'
const ACTIVITY_CONFIG_KEY = 'dragon-boat-activity-config'
const USER_ID_KEY = 'dragon-boat-user-id'

// 生成用户ID（模拟用户标识）
const generateUserId = (): string => {
  let userId = localStorage.getItem(USER_ID_KEY)
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem(USER_ID_KEY, userId)
  }
  return userId
}

// 获取今天的日期字符串
const getTodayString = (): string => {
  const today = new Date()
  return today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0')
}

// 默认活动配置
const getDefaultActivityConfig = (): ActivityConfig => ({
  activityName: '千年龙舟创意新生',
  dailyVoteLimit: 3,
  maxTeamsPerVote: 3,
  startTime: '2025-07-01 00:00:00',
  endTime: '2025-08-31 23:59:59',
  voteStartTime: '2025-07-15 00:00:00',
  voteEndTime: '2025-08-25 23:59:59',
  activityRules: '1. 每人每天最多可投票3次\n2. 每次最多可选择3个作品\n3. 投票时间：7月15日-8月25日\n4. 严禁刷票等作弊行为',
  ruleImage: '/src/assets/规则/活动规则.png',
  bannerImage: '/src/assets/首页/主视觉.png'
})

// 加载活动配置
const loadActivityConfig = (): ActivityConfig => {
  try {
    const stored = localStorage.getItem(ACTIVITY_CONFIG_KEY)
    if (stored) {
      return { ...getDefaultActivityConfig(), ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Failed to load activity config:', error)
  }
  return getDefaultActivityConfig()
}

// 保存活动配置
const saveActivityConfig = (config: ActivityConfig) => {
  try {
    localStorage.setItem(ACTIVITY_CONFIG_KEY, JSON.stringify(config))
  } catch (error) {
    console.error('Failed to save activity config:', error)
  }
}

// 加载投票记录
const loadVoteRecords = (): VoteRecord[] => {
  try {
    const stored = localStorage.getItem(VOTE_RECORDS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load vote records:', error)
  }
  return []
}

// 保存投票记录
const saveVoteRecords = (records: VoteRecord[]) => {
  try {
    localStorage.setItem(VOTE_RECORDS_KEY, JSON.stringify(records))
  } catch (error) {
    console.error('Failed to save vote records:', error)
  }
}

// 获取默认数据的函数
const getDefaultData = (): TeamCard[] => {
  return [
    { 
      id: 1, 
      title: '千年龙舟韵', 
      author: '魏永明', 
      votes: 1500, 
      originalVotes: 1500, 
      voted: false, 
      readCount: 2350,
      todayVotes: 0,
      todayViews: 0,
      description: '千年龙舟文化传承至今，展现了中华民族深厚的文化底蕴。每一桨都承载着历史的记忆，每一声呐喊都诉说着民族的精神。这不仅是一项体育竞技，更是文化的传承与发扬。',
      category: '传统文化',
      tags: ['传统', '文化', '传承']
    },
    { 
      id: 2, 
      title: '龙舟竞渡', 
      author: '李华', 
      votes: 1200, 
      originalVotes: 1200, 
      voted: false, 
      readCount: 1880,
      todayVotes: 0,
      todayViews: 0,
      description: '龙舟竞渡是端午节的传统项目，体现了团队合作的力量。队员们齐心协力，步调一致，在水上展现出完美的协调性。这项运动不仅锻炼身体，更培养了团队精神和拼搏意识。',
      category: '体育竞技',
      tags: ['竞技', '团队', '合作']
    },
    { 
      id: 3, 
      title: '水上飞龙', 
      author: '张三', 
      votes: 1800, 
      originalVotes: 1800, 
      voted: false, 
      readCount: 2680,
      todayVotes: 0,
      todayViews: 0,
      description: '龙舟在水面上飞速前行，如同蛟龙入海，威猛无比。这项运动结合了力量、速度和技巧，展现了运动员们的精湛技艺。每一次划桨都是对极限的挑战，每一次冲刺都是对胜利的渴望。',
      category: '竞技表演',
      tags: ['速度', '技巧', '挑战']
    },
    { 
      id: 4, 
      title: '传统龙舟', 
      author: '王五', 
      votes: 1350, 
      originalVotes: 1350, 
      voted: false, 
      readCount: 2120,
      todayVotes: 0,
      todayViews: 0,
      description: '传统龙舟保持着古法制作工艺，每一艘龙舟都是匠人精心雕琢的艺术品。木质船身散发着岁月的香味，彩绘龙头栩栩如生。这是对传统文化的坚守，也是对祖先智慧的传承。',
      category: '工艺制作',
      tags: ['传统', '工艺', '艺术']
    },
    { 
      id: 5, 
      title: '现代龙舟', 
      author: '赵六', 
      votes: 1600, 
      originalVotes: 1600, 
      voted: false, 
      readCount: 2450,
      todayVotes: 0,
      todayViews: 0,
      description: '现代龙舟运动融入了科技元素，在保持传统精神的同时，运用现代材料和技术提升竞技水平。这是传统与现代的完美结合，既传承了文化内涵，又适应了时代发展的需要。',
      category: '现代创新',
      tags: ['现代', '科技', '创新']
    },
    { 
      id: 6, 
      title: '龙舟文化', 
      author: '孙七', 
      votes: 1400, 
      originalVotes: 1400, 
      voted: false, 
      readCount: 2180,
      todayVotes: 0,
      todayViews: 0,
      description: '龙舟文化蕴含着丰富的民俗内涵，从祭祀仪式到竞技比赛，每个环节都承载着深厚的文化意义。这不仅是一项体育活动，更是民族文化的生动体现，值得我们珍视和传承。',
      category: '民俗文化',
      tags: ['民俗', '文化', '传承']
    },
    { 
      id: 7, 
      title: '端午龙舟', 
      author: '周八', 
      votes: 1700, 
      originalVotes: 1700, 
      voted: false, 
      readCount: 2580,
      todayVotes: 0,
      todayViews: 0,
      description: '端午时节，龙舟竞渡成为最受欢迎的民俗活动。粽香阵阵，鼓声震天，人们聚集在江河两岸为龙舟健儿呐喊助威。这是传统节日与体育竞技的完美融合，展现了浓厚的节日氛围。',
      category: '节日庆典',
      tags: ['端午', '节日', '庆典']
    },
    { 
      id: 8, 
      title: '民族传承', 
      author: '吴九', 
      votes: 1550, 
      originalVotes: 1550, 
      voted: false, 
      readCount: 2320,
      todayVotes: 0,
      todayViews: 0,
      description: '龙舟运动是中华民族传统文化的重要组成部分，承载着深厚的历史文化内涵。通过这项运动，我们不仅强身健体，更重要的是传承和弘扬了民族精神，让传统文化在新时代焕发出新的活力。',
      category: '民族精神',
      tags: ['民族', '传承', '精神']
    },
  ]
}

export const useTeamsStore = defineStore('teams', () => {
  // 基础数据
  const teamCards = ref<TeamCard[]>([])
  const voteRecords = ref<VoteRecord[]>(loadVoteRecords())
  const activityConfig = ref<ActivityConfig>(loadActivityConfig())
  const currentUserId = ref<string>(generateUserId())

  // 初始化数据
  const initializeData = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        teamCards.value = data.map((card: any) => ({
          ...card,
          todayVotes: card.todayVotes || 0,
          todayViews: card.todayViews || 0,
          ranking: card.ranking || 0,
          category: card.category || '未分类',
          tags: card.tags || []
        }))
      } catch (error) {
        console.error('Failed to load data:', error)
        teamCards.value = getDefaultData()
      }
    } else {
      teamCards.value = getDefaultData()
    }
    
    // 更新排名
    updateRankings()
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

  // 保存数据
  const saveData = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamCards.value))
      saveVoteRecords(voteRecords.value)
      saveActivityConfig(activityConfig.value)
    } catch (error) {
      console.error('Failed to save data:', error)
    }
  }

  // 监听数据变化，自动保存
  watch([teamCards, voteRecords, activityConfig], () => {
    saveData()
  }, { deep: true })

  // 计算属性：按票数排序
  const rankedCards = computed(() => {
    return [...teamCards.value].sort((a, b) => b.votes - a.votes)
  })

  // 计算属性：今日用户投票记录
  const todayUserVotes = computed(() => {
    const today = getTodayString()
    return voteRecords.value.filter(record => 
      record.userId === currentUserId.value && record.voteDate === today
    )
  })

  // 计算属性：已投票的卡片数量
  const selectedCardsCount = computed(() => {
    return todayUserVotes.value.length
  })

  // 计算属性：已投票的卡片
  const selectedCards = computed(() => {
    const votedTeamIds = todayUserVotes.value.map(vote => vote.teamId)
    return teamCards.value.filter(card => votedTeamIds.includes(card.id))
  })

  // 检查用户是否可以投票
  const canUserVote = (teamId: number): { canVote: boolean; message: string } => {
    const today = getTodayString()
    const todayVotes = voteRecords.value.filter(record => 
      record.userId === currentUserId.value && record.voteDate === today
    )
    
    // 检查是否已对该作品投票
    const alreadyVoted = todayVotes.some(vote => vote.teamId === teamId)
    if (alreadyVoted) {
      return { canVote: false, message: '您今天已经为该作品投过票了' }
    }
    
    // 检查今日投票次数
    if (todayVotes.length >= activityConfig.value.dailyVoteLimit) {
      return { 
        canVote: false, 
        message: `您今天的投票次数已用完，每日限投${activityConfig.value.dailyVoteLimit}次` 
      }
    }
    
    return { canVote: true, message: '可以投票' }
  }

  // 投票功能
  const toggleLike = (cardId: number) => {
    const card = teamCards.value.find(c => c.id === cardId)
    if (!card) return

    const today = getTodayString()
    const existingVote = voteRecords.value.find(record => 
      record.userId === currentUserId.value && 
      record.teamId === cardId && 
      record.voteDate === today
    )

    if (existingVote) {
      // 取消投票
      const index = voteRecords.value.indexOf(existingVote)
      voteRecords.value.splice(index, 1)
      card.votes = Math.max(card.originalVotes, card.votes - 1)
      card.todayVotes = Math.max(0, (card.todayVotes || 0) - 1)
      card.voted = false
    } else {
      // 检查投票权限
      const { canVote, message } = canUserVote(cardId)
      if (!canVote) {
        alert(message)
        return
      }

      // 添加投票
      const voteRecord: VoteRecord = {
        userId: currentUserId.value,
        teamId: cardId,
        voteDate: today,
        voteTime: new Date().toISOString(),
        userIP: 'localhost' // 前端无法获取真实IP
      }
      voteRecords.value.push(voteRecord)
      card.votes = card.votes + 1
      card.todayVotes = (card.todayVotes || 0) + 1
      card.voted = true
    }

    updateRankings()
  }

  // 记录浏览
  const recordView = (cardId: number) => {
    const card = teamCards.value.find(c => c.id === cardId)
    if (card) {
      card.readCount = card.readCount + 1
      card.todayViews = (card.todayViews || 0) + 1
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
      card.tags?.some(tag => tag.toLowerCase().includes(searchKeyword))
    )
  }

  // 每日重置（模拟）
  const checkNewDay = () => {
    // 这里可以添加每日重置逻辑
    // 比如清零 todayVotes 和 todayViews
    return false
  }

  // 重置所有投票
  const resetSelection = () => {
    const today = getTodayString()
    voteRecords.value = voteRecords.value.filter(record => 
      !(record.userId === currentUserId.value && record.voteDate === today)
    )
    
    teamCards.value.forEach(card => {
      if (card.voted) {
        card.voted = false
        card.votes = Math.max(card.originalVotes, card.votes - (card.todayVotes || 0))
        card.todayVotes = 0
      }
    })
    
    updateRankings()
  }

  // 初始化
  initializeData()

  return {
    teamCards,
    voteRecords,
    activityConfig,
    currentUserId,
    rankedCards,
    selectedCardsCount,
    selectedCards,
    todayUserVotes,
    toggleLike,
    recordView,
    getTeamRank,
    getFilteredCards,
    resetSelection,
    checkNewDay,
    canUserVote,
    updateRankings,
    saveData
  }
})