// 队伍相关 API
import request from "@/utils/request";

export interface TeamCard {
  id: number;
  teamName: string;
  teamLogo: string;
  teamDescription: string;
  voteCount: number;
  likeCount: number;
  readCount: number;
  status: string;
  createTime: string;
  updateTime: string;
}

export interface VoteRecord {
  recordId: number;
  userId: number;
  teamId: number;
  voteType: string;
  voteDate: string;
  createTime: string;
}

// 队伍管理 API
export const teamApi = {
  // 获取队伍列表
  getTeamList: () => {
    return request({
      url: "/api/teams/list",
      method: "get",
    });
  },

  // 获取队伍详情
  getTeamDetail: (teamId: number) => {
    return request({
      url: `/api/teams/${teamId}`,
      method: "get",
    });
  },

  // 为队伍投票 - 修改为与后端匹配的格式
  voteForTeam: (teamId: number, userId: string) => {
    return request({
      url: "/api/vote",
      method: "post",
      data: {
        userId: userId,
        workId: teamId
      }
    });
  },

  // 为队伍点赞
  likeTeam: (teamId: number) => {
    return request({
      url: `/api/teams/${teamId}/like`,
      method: "post",
    });
  },

  // 获取排行榜
  getRanking: () => {
    return request({
      url: "/api/teams/ranking",
      method: "get",
    });
  },

  // 增加阅读量
  increaseReadCount: (teamId: number, userId?: string) => {
    return request({
      url: `/api/teams/${teamId}/view`,
      method: "post",
      headers: {
        'User-ID': userId || '',
        'Content-Type': 'application/json'
      }
    });
  },
  // 重新计算排名
  recalculateRankings: () => {
    return request({
      url: "/api/teams/recalculate-rankings-and-display-order",
      method: "post",
    });
  },
};

// 投票相关 API - 更新为与后端匹配
export const voteApi = {
  // 检查用户投票状态
  getUserVoteStatus: (userId: string) => {
    return request({
      url: `/api/vote/status/${userId}`,
      method: "get",
    });
  },

  // 获取用户投票记录
  getUserVoteHistory: (userId: string) => {
    return request({
      url: `/api/vote/records/${userId}`,
      method: "get",
    });
  },

  // 取消投票
  cancelVote: (teamId: number, userId: string) => {
    return request({
      url: "/api/vote",
      method: "delete",
      data: {
        userId: userId,
        workId: teamId
      }
    });
  },
};

// 用户认证 API
export const authApi = {
  // 用户登录
  login: (username: string, password: string) => {
    return request({
      url: "/api/auth/login",
      method: "post",
      data: { username, password },
    });
  },

  // 用户注册
  register: (userData: any) => {
    return request({
      url: "/api/auth/register",
      method: "post",
      data: userData,
    });
  },

  // 获取用户信息
  getUserInfo: () => {
    return request({
      url: "/api/auth/getInfo",
      method: "get",
    });
  },

  // 用户登出
  logout: () => {
    return request({
      url: "/api/auth/logout",
      method: "post",
    });
  },
};
