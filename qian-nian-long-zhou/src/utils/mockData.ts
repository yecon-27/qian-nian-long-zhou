// Mock数据 - 模拟龙舟队伍数据
export const mockTeams = [
  {
    id: 1,
    teamName: '瑞安龙腾队',
    teamLeader: '张三',
    teamMembers: 12,
    description: '传承千年龙舟文化，展现瑞安人民的团结精神。我们队伍成立于2020年，由一群热爱龙舟运动的年轻人组成。',
    teamLogo: '', // 删除图片引用
    voteCount: 1256,
    status: '1',
    createTime: '2024-06-01 10:00:00'
  },
  {
    id: 2,
    teamName: '千年传承队',
    teamLeader: '李四',
    teamMembers: 12,
    description: '弘扬龙舟传统文化，传承千年龙舟精神。队伍注重传统技艺的传承与创新。',
    teamLogo: '',
    voteCount: 1089,
    status: '1',
    createTime: '2024-06-02 10:00:00'
  },
  {
    id: 3,
    teamName: '文化创新队',
    teamLeader: '王五',
    teamMembers: 12,
    description: '在传承中创新，在创新中发展龙舟文化。融合现代元素，展现龙舟运动的新魅力。',
    teamLogo: '',
    voteCount: 987,
    status: '1',
    createTime: '2024-06-03 10:00:00'
  },
  {
    id: 4,
    teamName: '青春风采队',
    teamLeader: '赵六',
    teamMembers: 12,
    description: '年轻的力量，传承的使命。我们是最年轻的队伍，但有着最炽热的龙舟梦想。',
    teamLogo: '',
    voteCount: 856,
    status: '1',
    createTime: '2024-06-04 10:00:00'
  },
  {
    id: 5,
    teamName: '团结奋进队',
    teamLeader: '钱七',
    teamMembers: 12,
    description: '团结一心，奋勇向前。用团队的力量诠释龙舟精神的真谛。',
    teamLogo: '',
    voteCount: 743,
    status: '1',
    createTime: '2024-06-05 10:00:00'
  }
]

// Mock API - 模拟后端接口
export const mockApi = {
  // 获取队伍列表
  getTeams: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: mockTeams,
          msg: '操作成功'
        })
      }, 500) // 模拟网络延迟
    })
  },

  // 投票
  vote: (teamId: number, openid: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟投票逻辑
        const team = mockTeams.find(t => t.id === teamId)
        if (team) {
          team.voteCount += 1
          resolve({
            code: 200,
            data: team,
            msg: '投票成功'
          })
        } else {
          reject({
            code: 400,
            msg: '队伍不存在'
          })
        }
      }, 300)
    })
  },

  // 获取排行榜
  getRanking: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sortedTeams = [...mockTeams].sort((a, b) => b.voteCount - a.voteCount)
        resolve({
          code: 200,
          data: sortedTeams,
          msg: '操作成功'
        })
      }, 400)
    })
  },

  // 检查是否已投票
  checkVoted: (openid: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟检查逻辑 - 假设还没投票
        resolve({
          code: 200,
          data: { hasVoted: false, votedTeamId: null },
          msg: '操作成功'
        })
      }, 200)
    })
  }
}
