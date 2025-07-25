// 临时 Mock API (用于测试，不需要真实后端)
export interface TeamCard {
  id: number
  teamName: string
  teamLogo: string
  teamDescription: string
  voteCount: number
  likeCount: number
  readCount: number
  status: string
  createTime: string
  updateTime: string
}

// Mock 数据
const mockTeams: TeamCard[] = [
  {
    id: 1,
    teamName: "瑞安龙舟一队",
    teamLogo: "/assets/teams/team1.jpg",
    teamDescription: "瑞安市传统龙舟队，成立于1985年，历史悠久，技术精湛...",
    voteCount: 156,
    likeCount: 89,
    readCount: 1203,
    status: "0",
    createTime: "2025-01-01T00:00:00.000Z",
    updateTime: "2025-07-18T00:00:00.000Z"
  },
  {
    id: 2,
    teamName: "瑞安龙舟二队",
    teamLogo: "/assets/teams/team2.jpg",
    teamDescription: "年轻有活力的龙舟队伍，成员平均年龄25岁...",
    voteCount: 134,
    likeCount: 67,
    readCount: 987,
    status: "0",
    createTime: "2025-01-01T00:00:00.000Z",
    updateTime: "2025-07-18T00:00:00.000Z"
  },
  {
    id: 3,
    teamName: "瑞安龙舟三队",
    teamLogo: "/assets/teams/team3.jpg",
    teamDescription: "专业竞技龙舟队，多次获得省级比赛冠军...",
    voteCount: 178,
    likeCount: 123,
    readCount: 1456,
    status: "0",
    createTime: "2025-01-01T00:00:00.000Z",
    updateTime: "2025-07-18T00:00:00.000Z"
  }
]

// Mock 延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock 队伍 API
export const mockTeamApi = {
  // 获取队伍列表
  getTeamList: async () => {
    await delay(500) // 模拟网络延迟
    return mockTeams
  },

  // 获取队伍详情
  getTeamDetail: async (teamId: number) => {
    await delay(300)
    const team = mockTeams.find(t => t.id === teamId)
    if (!team) {
      throw new Error('队伍不存在')
    }
    return team
  },

  // 为队伍投票
  voteForTeam: async (teamId: number) => {
    await delay(400)
    const team = mockTeams.find(t => t.id === teamId)
    if (!team) {
      throw new Error('队伍不存在')
    }
    team.voteCount += 1
    return { success: true, message: '投票成功' }
  },

  // 为队伍点赞
  likeTeam: async (teamId: number) => {
    await delay(300)
    const team = mockTeams.find(t => t.id === teamId)
    if (!team) {
      throw new Error('队伍不存在')
    }
    team.likeCount += 1
    return { success: true, message: '点赞成功' }
  },

  // 获取排行榜
  getRanking: async () => {
    await delay(400)
    return [...mockTeams].sort((a, b) => b.voteCount - a.voteCount)
  },

  // 增加阅读量
  increaseReadCount: async (teamId: number) => {
    await delay(200)
    const team = mockTeams.find(t => t.id === teamId)
    if (team) {
      team.readCount += 1
    }
    return { success: true }
  }
}

// Mock 投票 API
export const mockVoteApi = {
  // 检查今日是否已投票
  checkTodayVote: async () => {
    await delay(300)
    const today = new Date().toDateString()
    const lastVoteDate = localStorage.getItem('last_vote_date')
    return { hasVoted: lastVoteDate === today }
  },

  // 获取用户投票历史
  getUserVoteHistory: async () => {
    await delay(400)
    return []
  }
}

// Mock 认证 API
export const mockAuthApi = {
  // 用户登录
  login: async (username: string, password: string) => {
    await delay(800)
    if (username === 'admin' && password === 'admin') {
      return {
        token: 'mock-token-' + Date.now(),
        user: {
          userId: 1,
          username: 'admin',
          nickname: '管理员',
          roles: ['admin'],
          permissions: ['*:*:*']
        }
      }
    } else {
      throw new Error('用户名或密码错误')
    }
  },

  // 用户注册
  register: async (userData: any) => {
    await delay(600)
    return { success: true, message: '注册成功' }
  },

  // 获取用户信息
  getUserInfo: async () => {
    await delay(300)
    return {
      user: {
        userId: 1,
        username: 'admin',
        nickname: '管理员',
        roles: ['admin'],
        permissions: ['*:*:*']
      }
    }
  },

  // 用户登出
  logout: async () => {
    await delay(300)
    return { success: true }
  }
}
