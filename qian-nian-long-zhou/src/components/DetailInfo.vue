<template>
  <div class="detail-container">
    <div class="detail-card" v-if="teamData">
      <!-- 队伍图片 -->
      <div class="team-image-container">
        <img :src="teamData.img || '/src/assets/详情/龙舟队伍配图.jpg'" :alt="teamData.title" class="team-image" />
      </div>

      <!-- 队伍标题 -->
      <h1 class="team-title">{{ teamData.title }}</h1>

      <!-- 队伍作者 -->
      <p class="team-author">{{ teamData.author }}</p>

      <!-- 队伍描述 -->
      <p class="team-description">{{ teamData.description || '暂无描述' }}</p>

      <!-- 数据统计 -->
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">{{ teamData.readCount }}</div>
          <div class="stat-label">浏览量</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ teamData.votes }}</div>
          <div class="stat-label">当前票数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ teamRank || 0 }}</div>
          <div class="stat-label">当前排名</div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn-return" @click="goBack">
          <DynamicImage 
            resource-key="back_button" 
            fallback-url="/src/assets/详情/返回按钮.png"
            alt="返回" 
            class="button-image" 
          />
        </button>
        <button class="btn-vote" @click="voteForTeam">
          <DynamicImage 
            v-if="teamData.selected"
            resource-key="detail_liked" 
            fallback-url="/src/assets/详情/已点赞.jpg"
            alt="已点赞" 
            class="button-image" 
          />
          <DynamicImage 
            v-else
            resource-key="detail_like_button" 
            fallback-url="/src/assets/详情/为TA点赞按钮.png"
            alt="为TA点赞" 
            class="button-image" 
          />
        </button>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else-if="loading" class="loading">
      <p>加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadTeamDetail" class="retry-btn">重试</button>
    </div>

    <!-- 无数据状态 -->
    <div v-else class="no-data">
      <p>未找到作品信息</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'
import { useAuthStore } from '@/stores/auth'
import { teamApi } from '@/api/team'
import { ElMessage, ElMessageBox } from 'element-plus'
import { showToast } from 'vant'

import DynamicImage from '@/components/DynamicImage.vue'

export default {
  name: 'DetailInfo',
  components: {
    DynamicImage
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const teamsStore = useTeamsStore()

    const teamId = ref(parseInt(route.params.id))
    const teamData = ref(null)
    const loading = ref(true)
    const error = ref(null)

    // 计算当前队伍的排名
    const teamRank = computed(() => {
      if (teamData.value && teamData.value.id) {
        return teamsStore.getTeamRank(teamData.value.id)
      }
      return 0
    })

    // 从API加载作品详情数据
    const loadTeamDetail = async () => {
      try {
        loading.value = true
        error.value = null

        // 调用API获取作品详情（后端会自动记录浏览）
        const response = await teamApi.getTeamDetail(teamId.value)

        const teamDetail = response?.data?.data || response?.data || response

        if (teamDetail) {
          const teamIdValue = teamDetail.teamId || teamDetail.id

          // 从store中获取正确的投票状态
          const storeTeam = teamsStore.teamCards.find(t => t.id === teamIdValue)

          teamData.value = {
            id: teamIdValue,
            title: teamDetail.teamName || teamDetail.title,
            author: teamDetail.captainName || teamDetail.teamLeader || teamDetail.author || '未知',
            // 🔧 修复：优先使用store中的票数，如果store中没有则使用API返回的票数
            votes: storeTeam ? storeTeam.votes : (teamDetail.totalVotes || teamDetail.votes || 0),
            readCount: teamDetail.viewCount || teamDetail.totalViews || teamDetail.readCount || 0,
            // 处理RuoYi框架的文件上传路径
            img: teamDetail.teamImage ?
              (teamDetail.teamImage.startsWith('/profile/upload') ?
                `http://localhost:8080${teamDetail.teamImage}` :
                teamDetail.teamImage) :
              (teamDetail.img ?
                (teamDetail.img.startsWith('/profile/upload') ?
                  `http://localhost:8080${teamDetail.img}` :
                  teamDetail.img) :
                '/src/assets/详情/龙舟队伍配图.jpg'),
            description: teamDetail.description || teamDetail.teamDescription || '暂无描述',
            status: teamDetail.status || 1,
            // 🔧 修复：从store中获取正确的投票状态，而不是总是设置为false
            voted: storeTeam ? storeTeam.voted : false,
            selected: storeTeam ? storeTeam.selected : false
          }
        } else {
          throw new Error('未找到作品详情')
        }
      } catch (err) {
        console.error('❌ 加载作品详情失败:', err)
        error.value = '加载作品详情失败'

        // 降级处理：尝试从store中获取数据
        const fallbackData = teamsStore.teamCards.find(card => card.id === teamId.value)
        if (fallbackData) {
          teamData.value = fallbackData
          ElMessage.warning('网络异常，显示本地数据')
        } else {
          ElMessage.error('无法加载作品详情，请稍后重试')
        }
      } finally {
        loading.value = false
      }
    }

    // 简单记录浏览行为（只调用API，不重新获取数据）
    const recordViewSimple = async () => {
      try {
        // 只调用team API记录浏览（后端会自动更新数据库）
        await teamApi.increaseReadCount(teamId.value)

        // 手动增加本地显示的浏览数（避免重新请求API）
        if (teamData.value) {
          teamData.value.readCount += 1
        }

        // 同步更新store中的数据
        const storeTeam = teamsStore.teamCards.find(t => t.id === teamId.value)
        if (storeTeam && teamData.value) {
          storeTeam.readCount = teamData.value.readCount
        }

      } catch (err) {
        console.error('❌ 记录浏览行为失败:', err)
        // 浏览记录失败不影响页面显示，只记录错误
      }
    }

    onMounted(async () => {
      // 确保store已加载
      if (teamsStore.teamCards.length === 0) {
        await teamsStore.loadTeams() // 修改为 loadTeams
      }

      // 🔧 强制刷新用户投票状态
      await teamsStore.loadUserVoteStatus()
      
      // 🔧 添加调试信息
      console.log('用户投票状态:', {
        hasVotedToday: teamsStore.hasVotedToday,
        isAuthenticated: useAuthStore().isAuthenticated,
        userId: useAuthStore().user?.userId
      })

      // 加载作品详情
      await loadTeamDetail()
      
      // 🔧 添加浏览记录调用
      await recordViewSimple()
    })

    const goBack = () => {
      router.go(-1) // 返回上一页
    }

    const voteForTeam = async () => {
      if (!teamData.value) return

      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        ElMessage.warning('请先登录后再投票')
        router.push('/login')
        return
      }

      // 🔧 添加调试信息
      console.log('投票检查:', {
        hasVotedToday: teamsStore.hasVotedToday,
        userId: authStore.user?.userId,
        isAuthenticated: authStore.isAuthenticated
      })
      
      // 🔧 添加每日投票限制检查
      
      // 修改voteForTeam方法中的提示
      if (teamsStore.hasVotedToday) {
        showToast({
          type: 'fail',
          message: '您今日已经投过票了，每人每天只能投票一次'
        })
        return
      }

      try {
        // 切换本地选中状态（不调用API，只是标记选中）
        teamsStore.toggleLocalSelection(teamData.value.id)
        
        // 🔧 立即同步更新本地teamData的selected状态和票数
        const storeTeam = teamsStore.teamCards.find(t => t.id === teamData.value.id)
        if (storeTeam) {
          teamData.value.selected = storeTeam.selected
          teamData.value.votes = storeTeam.votes // 新增：同步更新票数显示
        }
        
        // 显示简单的消息提示（移除弹窗和页面跳转）
        if (teamData.value.selected) {
          ElMessage.success(`已选择${teamData.value.title}队伍`)
        } else {
          ElMessage.info(`已取消选择${teamData.value.title}队伍`)
        }
        
      } catch (err) {
        console.error('选择队伍失败:', err)
        ElMessage.error('操作失败，请稍后重试')
      }
    }

    return {
      teamData,
      teamRank,
      loading,
      error,
      loadTeamDetail,
      goBack,
      voteForTeam
    }
  }
}
</script>

<style scoped>
.detail-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 1;
}

.detail-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  /* 减少内边距，让图片有更多空间 */
  width: 100%;
  text-align: center;
  z-index: 2;
  /* 设置卡片的层级 */
}

.team-image-container {
  width: 100%;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 15px;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 0px 0;
}

.team-author {
  font-size: 13px;
  color: #666;
  margin: 0 0 5px 0;
}

.team-description {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
  margin-bottom: 10px;
  text-align: left;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  /* 浅灰色背景 */
  border-radius: 10px;
  /* 圆角矩形 */
  padding: 10px 5px;
  /* 内边距 */
  position: relative;
}

.stat-item {
  text-align: center;
  flex: 1;
  position: relative;
}

/* 第一个和第二个统计项后面添加分隔线 */
.stat-item:nth-child(1)::after,
.stat-item:nth-child(2)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
  background-color: #ccc;
  /* 灰色分隔线 */
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #ff6b35;
  margin-bottom: 0px;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: space-between;
}

.btn-return,
.btn-vote {
  flex: 1;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 48%;
  /* 确保按钮不会过宽 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .btn-return:hover,
.btn-vote:hover {
  transform: translateY(-2px);
} */

.button-image {
  width: 90%;
  /* 缩小图标到80% */
  height: auto;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: block;
}

/* 
.button-image:hover {
  transform: scale(1.05);
} */

.heart-icon {
  font-size: 18px;
}

.loading {
  text-align: center;
  color: white;
  font-size: 18px;
}

.error {
  text-align: center;
  color: white;
  font-size: 16px;
}

.error p {
  margin-bottom: 15px;
  color: #ff6b35;
}

.retry-btn {
  background: #ff6b35;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background: #e55a2b;
}

.no-data {
  text-align: center;
  color: white;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .detail-card {
    /* padding: 20px;
    margin: 10px; */
    max-width: 380px;
    /* 移动端适当减小宽度 */
    max-height: 500px;
  }

  .team-title {
    font-size: 15px;
  }

  .stat-number {
    font-size: 17px;
  }

  .action-buttons {
    gap: 10px;
    /* 在移动端减少按钮间距 */
  }

  .btn-return,
  .btn-vote {
    max-width: 47%;
    /* 移动端稍微调整宽度 */
  }
}
</style>
