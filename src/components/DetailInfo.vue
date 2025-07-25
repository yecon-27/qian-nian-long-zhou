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
          <img src="@/assets/详情/返回按钮.png" alt="返回" class="button-image" />
        </button>
        <button class="btn-vote" @click="voteForTeam">
          <img src="@/assets/详情/为TA点赞按钮.png" alt="为TA点赞" class="button-image" />
        </button>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else class="loading">
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'

export default {
  name: 'DetailInfo',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const teamsStore = useTeamsStore()

    const teamId = ref(parseInt(route.params.id))

    // 使用计算属性直接引用 store 中的数据，实现真正的双向绑定
    const teamData = computed(() => {
      return teamsStore.teamCards.find(card => card.id === teamId.value)
    })

    // 计算当前队伍的排名
    const teamRank = computed(() => {
      if (teamData.value && teamData.value.id) {
        return teamsStore.getTeamRank(teamData.value.id)
      }
      return 0
    })

    onMounted(() => {
      // 检查是否是新的一天
      if (teamsStore.checkNewDay()) {
        console.log('检测到新的一天，数据已重置')
      }
    })

    const goBack = () => {
      router.go(-1) // 返回上一页
    }

    const voteForTeam = () => {
      if (teamData.value) {
        // 先检查是否是新的一天
        if (teamsStore.checkNewDay()) {
          console.log('检测到新的一天，数据已重置')
        }

        // 直接使用 store 的方法，自动处理数据同步和持久化
        teamsStore.toggleLike(teamData.value.id)
      }
    }

    return {
      teamData,
      teamRank,
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

.btn-return:hover,
.btn-vote:hover {
  transform: translateY(-2px);
}

.button-image {
  width: 90%;
  /* 缩小图标到80% */
  height: auto;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: block;
}

.button-image:hover {
  transform: scale(1.05);
}

.heart-icon {
  font-size: 18px;
}

.loading {
  text-align: center;
  color: white;
  font-size: 18px;
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
