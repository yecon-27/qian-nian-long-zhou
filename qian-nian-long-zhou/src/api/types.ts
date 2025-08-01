// API 数据类型定义

// 作品信息
export interface Work {
  workId: number
  workTitle: string
  workAuthor: string
  workDescription: string
  workImage?: string
  workImages?: string[]
  workVideo?: string
  workCategory?: string
  workTags?: string[]
  authorIntro?: string
  creationStory?: string
  technicalInfo?: string
  activityId?: number
  totalVotes: number
  todayVotes: number
  totalViews: number
  todayViews: number
  ranking: number
  rankChange?: number
  isFeatured: boolean
  displayOrder: number
  status: number
  userVoted?: boolean
  createTime: string
  publishTime?: string
}

// 投票记录
export interface VoteRecord {
  voteId: number
  workId: number
  workTitle: string
  workAuthor: string
  voteDate: string
  voteTime: string
}

// 投票请求
export interface VoteRequest {
  userId: string
  workId: number
  userIp?: string
  userAgent?: string
}

// 投票响应
export interface VoteResponse {
  voteId: number
  remainingVotes: number
  newVoteCount: number
  newRanking: number
}

// 用户投票状态
export interface UserVoteStatus {
  userId: string
  todayVotes: number
  remainingVotes: number
  dailyLimit: number
  votedWorks: number[]
  canVote: boolean
}

// 活动配置
export interface ActivityConfig {
  configId: number
  activityName: string
  activityTitle: string
  activityDesc: string
  ruleImage?: string
  bannerImage?: string
  backgroundImage?: string
  startTime: string
  endTime: string
  voteStartTime: string
  voteEndTime: string
  dailyVoteLimit: number
  maxTeamsPerVote: number
  activityRules: string
  contactInfo?: string
  prizeInfo?: string
  status: number
}

// 活动规则
export interface ActivityRules {
  ruleImage?: string
  activityRules: string
  dailyVoteLimit: number
  maxTeamsPerVote: number
  voteStartTime: string
  voteEndTime: string
}

// 用户信息
export interface User {
  userId: string
  createTime: string
  expiresIn?: number
}

// 统计数据
export interface VoteStats {
  totalVotes: number
  todayVotes: number
  totalUsers: number
  activeUsers: number
  chartData: Array<{
    date: string
    votes: number
    users: number
  }>
}

export interface ViewStats {
  totalViews: number
  todayViews: number
  uniqueUsers: number
  avgDuration: number
  chartData: Array<{
    date: string
    views: number
    uniqueUsers: number
    avgDuration: number
  }>
}

// 请求参数类型
export interface WorkListParams {
  page?: number
  size?: number
  category?: string
  sort?: 'votes_desc' | 'votes_asc' | 'views_desc' | 'views_asc' | 'create_time_desc'
  keyword?: string
}

export interface RankingParams {
  limit?: number
  type?: 'total' | 'today'
}

export interface VoteRecordsParams {
  page?: number
  size?: number
  startDate?: string
  endDate?: string
}

export interface StatsParams {
  startDate?: string
  endDate?: string
  groupBy?: 'day' | 'work' | 'user'
  workId?: number
}

// 用户生成请求
export interface UserGenerateRequest {
  deviceInfo?: string
  userAgent?: string
  userIp?: string
}