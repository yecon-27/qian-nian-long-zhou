import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

// 定义队伍数据类型
export interface TeamCard {
  id: number
  title: string
  author: string
  votes: number
  originalVotes: number
  likes: number
  liked: boolean
  readCount: number
  description: string
  img?: string
}

// 本地存储的key
const STORAGE_KEY = 'dragon-boat-teams-data'
const LAST_VOTE_DATE_KEY = 'dragon-boat-last-vote-date'

// 获取今天的日期字符串
const getTodayString = (): string => {
  const today = new Date()
  return today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0')
}

// 检查是否是新的一天
const isNewDay = (): boolean => {
  const today = getTodayString()
  const lastVoteDate = localStorage.getItem(LAST_VOTE_DATE_KEY)
  return lastVoteDate !== today
}

// 更新最后投票日期
const updateLastVoteDate = () => {
  localStorage.setItem(LAST_VOTE_DATE_KEY, getTodayString())
}

// 从本地存储加载数据
const loadFromStorage = (): TeamCard[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      
      // 如果是新的一天，重置投票状态但保留点赞量
      if (isNewDay()) {
        console.log('检测到新的一天，重置投票状态但保留点赞量')
        const resetData = data.map((card: TeamCard) => ({
          ...card,
          liked: false, // 重置投票状态
          // 保留 likes 点赞量，不重置
          // 可以选择是否重置 readCount，这里保持不变
        }))
        
        // 保存重置后的数据
        saveToStorage(resetData)
        updateLastVoteDate()
        return resetData
      }
      
      // 检查数据是否有description字段，如果没有就从默认数据中获取
      const dataWithDescription = data.map((card: TeamCard) => {
        if (!card.description) {
          const defaultCard = getDefaultData().find(d => d.id === card.id)
          return {
            ...card,
            description: defaultCard?.description || '暂无描述'
          }
        }
        return card
      })
      
      // 如果有数据被更新，保存到localStorage
      if (dataWithDescription.some((card: TeamCard, index: number) => card.description !== data[index].description)) {
        saveToStorage(dataWithDescription)
      }
      
      return dataWithDescription
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error)
  }
  
  // 如果没有存储数据或加载失败，返回默认数据
  return getDefaultData()
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
      likes: 120, 
      liked: false, 
      readCount: 2350,
      description: '千年龙舟文化传承至今，展现了中华民族深厚的文化底蕴。每一桨都承载着历史的记忆，每一声呐喊都诉说着民族的精神。这不仅是一项体育竞技，更是文化的传承与发扬。'
    },
    { 
      id: 2, 
      title: '龙舟竞渡', 
      author: '李华', 
      votes: 1200, 
      originalVotes: 1200, 
      likes: 95, 
      liked: false, 
      readCount: 1880,
      description: '龙舟竞渡是端午节的传统项目，体现了团队合作的力量。队员们齐心协力，步调一致，在水上展现出完美的协调性。这项运动不仅锻炼身体，更培养了团队精神和拼搏意识。'
    },
    { 
      id: 3, 
      title: '水上飞龙', 
      author: '张三', 
      votes: 1800, 
      originalVotes: 1800, 
      likes: 150, 
      liked: false, 
      readCount: 2680,
      description: '龙舟在水面上飞速前行，如同蛟龙入海，威猛无比。这项运动结合了力量、速度和技巧，展现了运动员们的精湛技艺。每一次划桨都是对极限的挑战，每一次冲刺都是对胜利的渴望。'
    },
    { 
      id: 4, 
      title: '传统龙舟', 
      author: '王五', 
      votes: 1350, 
      originalVotes: 1350, 
      likes: 110, 
      liked: false, 
      readCount: 2120,
      description: '传统龙舟保持着古法制作工艺，每一艘龙舟都是匠人精心雕琢的艺术品。木质船身散发着岁月的香味，彩绘龙头栩栩如生。这是对传统文化的坚守，也是对祖先智慧的传承。'
    },
    { 
      id: 5, 
      title: '现代龙舟', 
      author: '赵六', 
      votes: 1600, 
      originalVotes: 1600, 
      likes: 130, 
      liked: false, 
      readCount: 2450,
      description: '现代龙舟运动融入了科技元素，在保持传统精神的同时，运用现代材料和技术提升竞技水平。这是传统与现代的完美结合，既传承了文化内涵，又适应了时代发展的需要。'
    },
    { 
      id: 6, 
      title: '龙舟文化', 
      author: '孙七', 
      votes: 1400, 
      originalVotes: 1400, 
      likes: 115, 
      liked: false, 
      readCount: 2180,
      description: '龙舟文化蕴含着丰富的民俗内涵，从祭祀仪式到竞技比赛，每个环节都承载着深厚的文化意义。这不仅是一项体育活动，更是民族文化的生动体现，值得我们珍视和传承。'
    },
    { 
      id: 7, 
      title: '端午龙舟', 
      author: '周八', 
      votes: 1700, 
      originalVotes: 1700, 
      likes: 140, 
      liked: false, 
      readCount: 2580,
      description: '端午时节，龙舟竞渡成为最受欢迎的民俗活动。粽香阵阵，鼓声震天，人们聚集在江河两岸为龙舟健儿呐喊助威。这是传统节日与体育竞技的完美融合，展现了浓厚的节日氛围。'
    },
    { 
      id: 8, 
      title: '民族传承', 
      author: '吴九', 
      votes: 1550, 
      originalVotes: 1550, 
      likes: 125, 
      liked: false, 
      readCount: 2320,
      description: '龙舟运动是中华民族传统文化的重要组成部分，承载着深厚的历史文化内涵。通过这项运动，我们不仅强身健体，更重要的是传承和弘扬了民族精神，让传统文化在新时代焕发出新的活力。'
    },
  ]
}

// 保存数据到本地存储
const saveToStorage = (data: TeamCard[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save data to localStorage:', error)
  }
}

export const useTeamsStore = defineStore('teams', () => {
  // 队伍数据 - 从本地存储加载
  const teamCards = ref<TeamCard[]>(loadFromStorage())

  // 监听数据变化，自动保存到 localStorage
  watch(teamCards, (newData) => {
    saveToStorage(newData)
  }, { deep: true })

  // 计算属性：按票数排序
  const rankedCards = computed(() => {
    return [...teamCards.value].sort((a, b) => b.votes - a.votes)
  })

  // 计算属性：已选择的卡片数量
  const selectedCardsCount = computed(() => {
    return teamCards.value.filter(card => card.liked).length
  })

  // 计算属性：已选择的卡片
  const selectedCards = computed(() => {
    return teamCards.value.filter(card => card.liked)
  })

  // 切换点赞状态
  const toggleLike = (cardId: number) => {
    const card = teamCards.value.find(c => c.id === cardId)
    if (card) {
      // 限制最多选择3个
      if (!card.liked && selectedCardsCount.value >= 3) {
        alert('每天最多只能选择3个作品哦！')
        return
      }
      
      // 切换选中状态并更新点赞数（不影响投票数）
      if (card.liked) {
        // 取消点赞：只减少点赞数，不改变投票数
        card.liked = false
        card.likes = Math.max(0, card.likes - 1)
      } else {
        // 点赞：只增加点赞数，不改变投票数
        card.liked = true
        card.likes = card.likes + 1
      }
      
      // 更新最后投票日期（数据会通过 watcher 自动保存）
      updateLastVoteDate()
    }
  }

  // 根据关键词过滤卡片
  const getFilteredCards = (keyword: string) => {
    if (!keyword) {
      return teamCards.value
    }
    
    const searchKeyword = keyword.toLowerCase()
    return teamCards.value.filter(card => 
      card.title.toLowerCase().includes(searchKeyword) || 
      card.author.toLowerCase().includes(searchKeyword)
    )
  }

  // 重置所有选择
  const resetSelection = () => {
    teamCards.value.forEach(card => {
      if (card.liked) {
        card.liked = false
        card.likes = Math.max(0, card.likes - 1)
        // 不重置投票数，保持 votes 不变
      }
    })
    // 数据会通过 watcher 自动保存
  }

  // 手动保存数据（现在主要用于更新日期）
  const saveData = () => {
    updateLastVoteDate()
  }

  // 手动检查并处理新的一天
  const checkNewDay = () => {
    if (isNewDay()) {
      console.log('检测到新的一天，重置投票状态')
      teamCards.value.forEach(card => {
        card.liked = false // 重置投票状态但保留点赞量
      })
      updateLastVoteDate()
      return true
    }
    return false
  }

  // 获取当前日期信息（用于调试）
  const getDateInfo = () => {
    return {
      today: getTodayString(),
      lastVoteDate: localStorage.getItem(LAST_VOTE_DATE_KEY),
      isNewDay: isNewDay()
    }
  }

  // 重置数据到初始状态（可选，用于调试或管理）
  const resetData = () => {
    teamCards.value = loadFromStorage()
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_VOTE_DATE_KEY)
    location.reload()
  }

  return {
    teamCards,
    rankedCards,
    selectedCardsCount,
    selectedCards,
    toggleLike,
    getFilteredCards,
    resetSelection,
    saveData,
    resetData,
    checkNewDay,
    getDateInfo
  }
})
