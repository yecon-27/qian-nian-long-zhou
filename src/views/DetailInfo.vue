<template>
  <div class="detail-container">
    <div class="detail-card" v-if="teamData">
      <!-- 队伍图片 -->
      <div class="team-image-container">
        <img :src="teamData.img || '/src/assets/首页/主视觉.png'" :alt="teamData.title" class="team-image" />
      </div>
      
      <!-- 队伍标题 -->
      <h1 class="team-title">{{ teamData.title }}</h1>
      
      <!-- 队伍作者 -->
      <p class="team-author">{{ teamData.author }}</p>
      
      <!-- 队伍描述 -->
      <p class="team-description">
        {{ teamData.description || '传承千年龙舟文化，展现民族传统体育魅力，弘扬团结拼搏精神，推动龙舟运动发展，让更多人了解和参与这项传统运动。' }}
      </p>
      
      <!-- 数据统计 -->
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">{{ teamData.votes }}</div>
          <div class="stat-label">当前票数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ teamData.readCount }}</div>
          <div class="stat-label">当前阅读量</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ teamData.likes }}</div>
          <div class="stat-label">当前点赞</div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn-return" @click="goBack">
          返回
        </button>
        <button class="btn-vote" @click="voteForTeam">
          <span class="heart-icon">♥</span>
          为TA点赞
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
import { useTeamsStore } from '@/stores/teams'

export default {
  name: 'DetailInfo',
  data() {
    return {
      teamId: null,
      teamData: null,
      teamsStore: null
    }
  },
  created() {
    this.teamsStore = useTeamsStore()
    this.teamId = this.$route.params.id
    this.loadTeamData()
  },
  methods: {
    loadTeamData() {
      // 从teams store中获取数据
      const team = this.teamsStore.teamCards.find(card => card.id === parseInt(this.teamId))
      if (team) {
        this.teamData = { ...team }
      }
    },
    goBack() {
      this.$router.go(-1) // 返回上一页
    },
    voteForTeam() {
      if (this.teamData) {
        this.teamsStore.toggleLike(this.teamData.id)
        // 更新本地数据显示
        this.teamData.liked = !this.teamData.liked
        this.teamData.likes = this.teamData.liked ? this.teamData.likes + 1 : this.teamData.likes - 1
      }
    }
  }
}
</script>

<style scoped>
.detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.detail-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.team-image-container {
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
}

.team-author {
  font-size: 16px;
  color: #666;
  margin: 0 0 20px 0;
}

.team-description {
  font-size: 14px;
  color: #888;
  line-height: 1.6;
  margin-bottom: 30px;
  text-align: left;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #ff6b35;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.btn-return {
  flex: 1;
  padding: 15px 0;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-return:hover {
  background: #1976D2;
  transform: translateY(-2px);
}

.btn-vote {
  flex: 1;
  padding: 15px 0;
  background: #FF6B35;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-vote:hover {
  background: #E55A2B;
  transform: translateY(-2px);
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
    padding: 20px;
    margin: 10px;
  }
  
  .team-title {
    font-size: 20px;
  }
  
  .stat-number {
    font-size: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
</script>
