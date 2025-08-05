import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { teamApi } from "@/api/team";
import { vote, cancelVote, getUserVoteStatus } from "@/api/vote"; // 添加正确的投票API导入
import { useAuthStore } from "./auth"; // 引入 auth store
// 定义队伍数据接口
interface TeamCard {
  id: number;
  title: string;
  author: string;
  votes: number;
  originalVotes: number; // 新增：保存原始票数
  readCount: number;
  img: string;
  description: string;
  status: number;
  voted: boolean;
  selected: boolean; // 本地选中状态
}

export const useTeamsStore = defineStore("teams", () => {
  // 队伍数据
  const teamCards = ref<TeamCard[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const hasVotedToday = ref(false); // 用户今日是否已投票

  // 从 API 加载队伍数据
  async function loadTeams() {
    loading.value = true;
    error.value = null;
    try {
      // 使用正确的 teamApi - 队伍列表接口
      const response = await teamApi.getTeamList() as any;
      
      // 处理分页格式的响应
      const teamsArray = response?.rows || response?.data || response || [];

      // 数据转换：将后端字段名转换为前端组件期望的字段名
      const transformedTeams =
        teamsArray?.map((team: any) => ({
          id: team.teamId,
          title: team.teamName,
          author: team.captainName || "未知",
          votes: team.totalVotes || 0,
          originalVotes: team.totalVotes || 0, // 新增：保存原始票数
          readCount: team.viewCount || 0,
          // 处理RuoYi框架的文件上传路径
          img: team.teamImage
            ? team.teamImage.startsWith("/profile/upload")
              ? `http://${window.location.hostname}:8080${team.teamImage}`
              : team.teamImage
            : "", // 空字符串，完全依赖数据库
          description: team.description || "",
          status: team.status || 0,
          voted: false, // 初始投票状态
          selected: false, // 初始本地选中状态
        })) || [];

      teamCards.value = transformedTeams;

      // 加载用户投票状态
      await loadUserVoteStatus();
    } catch (e) {
      error.value = "加载队伍数据失败";
      console.error("❌ 加载队伍数据失败:", e);
    } finally {
      loading.value = false;
    }
  }

  // 加载用户投票状态
  async function loadUserVoteStatus() {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated || !authStore.user?.userId) {
      hasVotedToday.value = false;
      return;
    }

    try {
      const userId = String(authStore.user.userId);
      const voteStatus = await getUserVoteStatus(userId) as any;

      hasVotedToday.value = voteStatus && voteStatus.todayVoteCount > 0;

      if (voteStatus && voteStatus.votedTeamIds && Array.isArray(voteStatus.votedTeamIds)) {
        // 先重置所有队伍的投票状态
        teamCards.value.forEach((team) => {
          team.voted = false;
        });

        // 再设置已投票的队伍
        voteStatus.votedTeamIds.forEach((teamId: number) => {
          const team = teamCards.value.find((t) => t.id === teamId);
          if (team) {
            team.voted = true;
          }
        });
      }
    } catch (e) {
      console.error("加载用户投票状态失败:", e);
      hasVotedToday.value = false;
    }
  }

  // 切换投票状态
  async function toggleVote(teamId: number) {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      return;
    }
  
    const userId = authStore.user?.userId;
    if (!userId) {
      return;
    }
  
    const team = teamCards.value.find((t) => t.id === teamId);
    if (!team) {
      return;
    }
  
    try {
      if (team.voted) {
        // 取消投票
        await cancelVote({
          userId: String(userId),
          workId: teamId,
        });
        team.votes--;
        team.voted = false;
      } else {
        // 投票
        await vote({
          userId: String(userId),
          workId: teamId,
          // Remove userAgent as it's not in the expected type
        });
        team.votes++;
        team.voted = true;
      }
      
      // 🔧 新增：投票成功后更新排名到数据库
      await updateRankingsToDatabase();
      
      // 🔧 新增：重新加载数据以获取最新排名
      await loadTeams();
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.msg || err.message || "投票操作失败，请稍后重试";
      
      // 如果后端说已经投过票了，更新前端状态
      if (errorMessage.includes("已经为该作品投过票了") || errorMessage.includes("您已经投过票了")) {
        team.voted = true;
        return;
      }
  
      throw err;
    }
  }

  // 切换本地选中状态（不调用API）- 基于原始票数的即时反馈
  function toggleLocalSelection(teamId: number) {
    const team = teamCards.value.find((t) => t.id === teamId);
    if (!team) return;
    
    // 如果要选中队伍，检查是否超过限制
    if (!team.selected) {
      const currentSelectedCount = teamCards.value.filter(t => t.selected).length;
      if (currentSelectedCount >= 3) {
        throw new Error("最多只能选择3个队伍进行投票");
      }
    }
    
    team.selected = !team.selected;
    // 基于原始票数计算显示票数
    team.votes = team.originalVotes + (team.selected ? 1 : 0);
  }

  // 批量提交投票
  async function submitVotes() {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      throw new Error("用户未登录");
    }
  
    const userId = authStore.user?.userId;
    if (!userId) {
      throw new Error("无法获取用户ID");
    }
  
    const selectedTeams = teamCards.value.filter(
      (team) => team.selected && !team.voted
    );
    
    // 修改：必须选择恰好3个队伍
    if (selectedTeams.length !== 3) {
      if (selectedTeams.length < 3) {
        throw new Error(`请再选择 ${3 - selectedTeams.length} 个队伍，必须投票给3个队伍`);
      } else {
        throw new Error("只能选择3个队伍进行投票");
      }
    }
  
    // 检查用户是否已经投过票
    if (hasVotedToday.value) {
      throw new Error("您今日已经投过票了，每人每天只能投票一次");
    }
  
    let successCount = 0;
    const errors: string[] = [];
  
    // 执行投票
    for (const team of selectedTeams) {
      try {
        const response = await vote({
          userId: String(userId),
          workId: team.id
        })
        
        // 投票成功处理
        team.voted = true;
        team.selected = false;
        successCount++;
      } catch (err: any) {
        const errorMsg = err.message || "投票失败";
        errors.push(`${team.title}: ${errorMsg}`);
      }
    }
  
    if (errors.length > 0) {
      throw new Error(`部分投票失败: ${errors.join("; ")}`);
    }
  
    // 投票成功后的处理
    if (successCount > 0) {
      hasVotedToday.value = true;
      
      // 🔧 关键修改：立即重新加载数据以获取最新票数
      await loadTeams();
      
      // 🔧 可选：更新排名到数据库
      await updateRankingsToDatabase();
    }
  
    return successCount;
  }

  // 兼容旧的方法名
  const toggleLike = toggleVote;

  // 按票数排序的计算属性
  const rankedCards = computed(() => {
    return [...teamCards.value].sort((a, b) => b.votes - a.votes);
  });

  // 根据 ID 获取队伍
  const getTeamById = (id: number) => {
    return teamCards.value.find((t) => t.id === id);
  };

  // 根据 ID 获取队伍排名
  const getTeamRank = (id: number) => {
    return rankedCards.value.findIndex((t) => t.id === id) + 1;
  };

  // 计算已选中的队伍数量（本地选中状态）
  const selectedCardsCount = computed(() => {
    return teamCards.value.filter((team) => team.selected).length;
  });

  // 获取已选中的队伍（本地选中状态）
  const selectedCards = computed(() => {
    return teamCards.value.filter((team) => team.selected);
  });

  // 计算已投票的队伍数量
  const votedCardsCount = computed(() => {
    return teamCards.value.filter((team) => team.voted).length;
  });

  // 检查是否是新的一天（兼容旧代码）
  const checkNewDay = () => {
    // 简单实现，可以根据需要扩展
    return false;
  };

  // 清除所有选择状态
  function clearSelections() {
    teamCards.value.forEach((team) => {
      team.selected = false;
      // 恢复到原始票数
      team.votes = team.originalVotes;
    });
  }

  return {
    // 数据
    teamCards,
    works: teamCards, // 兼容别名
    loading,
    error,
    hasVotedToday, // 暴露投票状态
  
    // 方法
    loadTeams, // 改为 loadTeams 而不是 loadWorks
    loadUserVoteStatus,
    toggleVote,
    toggleLike,
    toggleLocalSelection,
    submitVotes,
    getTeamById,
    getTeamRank,
    checkNewDay,
    clearSelections, // 新增清除选择状态方法
  
    // 计算属性
    rankedCards,
    selectedCardsCount,
    selectedCards,
    votedCardsCount,
  };
});

// 删除这个重复的 voteForTeam 函数，因为已经有 toggleVote 函数了
// async function voteForTeam(teamId: number) {
//   const authStore = useAuthStore();
//   if (!authStore.isAuthenticated) {
//     return;
//   }
// 
//   const userId = authStore.user?.userId;
//   if (!userId) {
//     return;
//   }
// 
//   const team = teamCards.value.find((t) => t.id === teamId);
//   if (!team) {
//     return;
//   }
// 
//   try {
//     await vote({
//       userId: String(userId), // Convert to string
//       workId: teamId
//       // Remove userAgent as it's not in the expected type
//     });
//     team.votes++;
//     team.voted = true;
//   } catch (err: any) {
//     const errorMessage = err.response?.data?.msg || err.message || "投票操作失败，请稍后重试";
//     
//     if (errorMessage.includes("已经为该作品投过票了") || errorMessage.includes("您已经投过票了")) {
//       team.voted = true;
//       return;
//     }
// 
//     throw err;
//   }
// }


// 投票后更新排名到数据库
const updateRankingsToDatabase = async () => {
  try {
    await teamApi.recalculateRankings();
    console.log('✅ 排名已更新到数据库');
  } catch (error) {
    console.error('❌ 更新排名到数据库失败:', error);
  }
};

// 修改投票方法，投票后自动更新排名
const voteForTeam = async (teamId: number, userId: string) => {
  try {
    // 调用后端投票API
    await teamApi.voteForTeam(teamId, userId);
    
    // 更新本地状态
    const team = useTeamsStore().teamCards.find(t => t.id === teamId);
    if (team) {
      team.votes += 1;
      team.voted = true;
    }
    
    // 更新排名到数据库
    await updateRankingsToDatabase();
    
    // 重新加载数据以获取最新排名
    await useTeamsStore().loadTeams();
    
  } catch (error) {
    console.error('投票失败:', error);
    throw error;
  }
};
