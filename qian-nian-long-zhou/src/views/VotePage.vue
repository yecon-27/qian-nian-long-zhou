<template>
  <div id="app">
    <VoteHeader @search="handleSearch" />
    <div class="team-cards-container">
      <TeamVoteCard v-for="card in filteredCards" :key="card.id" :card="card" @toggle-vote="toggleVote" />
    </div>
    <SubmissionBar 
      :selectedCount="teamsStore.selectedCardsCount" 
      :hasVotedToday="teamsStore.hasVotedToday"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'
import { useAuthStore } from '@/stores/auth'
import { showToast, showDialog } from 'vant'
import VoteHeader from '../components/VoteHeader.vue'
import TeamVoteCard from '../components/TeamVoteCard.vue'
import SubmissionBar from '../components/SubmissionBar.vue'

// 只保留一次声明
const router = useRouter()
const authStore = useAuthStore()
const teamsStore = useTeamsStore()

// 响应式数据
const searchKeyword = ref('')

// 计算属性
const filteredCards = computed(() => {
  if (!searchKeyword.value) {
    return teamsStore.works
  }
  return teamsStore.works.filter(card =>
    card.title?.includes(searchKeyword.value) || card.author?.includes(searchKeyword.value)
  )
})

// 方法
const handleSearch = (keyword: string) => {
  searchKeyword.value = keyword
}

const toggleVote = (id) => {
  // 如果用户已经投过票，则不允许再选择
  if (teamsStore.hasVotedToday) {
    showToast({
      type: 'fail',
      message: '您今日已经投过票了，每人每天只能投票一次'
    })
    return
  }
  
  // 只切换本地选中状态，不调用API
  teamsStore.toggleLocalSelection(id)
}

const handleSubmit = async (selectedCount: number) => {
  // 检查登录状态
  if (!authStore.isAuthenticated) {
    showDialog({
      title: '需要登录',
      message: '请先登录后再提交投票',
      confirmButtonText: '去登录',
      cancelButtonText: '取消'
    }).then(() => {
      router.push({
        name: 'Login',
        query: { redirect: '/vote' }
      })
    }).catch(() => {
      // 用户取消，不做任何操作
    })
    return
  }

  if (selectedCount === 0) {
    showToast({
      type: 'fail',
      message: '请选择要投票的队伍'
    })
    return
  }

  try {
    const successCount = await teamsStore.submitVotes()
    showToast({
      type: 'success',
      message: `成功提交 ${successCount} 个投票`
    })
  } catch (error: any) {
    showToast({
      type: 'fail',
      message: error.message || '投票提交失败，请稍后重试'
    })
  }
}

// 生命周期
onMounted(async () => {
  window.scrollTo(0, 0)
  // 从 API 加载数据
  if (teamsStore.works.length === 0) { // 仅在数据为空时加载
    await teamsStore.loadWorks()
  } else if (authStore.isAuthenticated) {
    // 如果数据已存在但用户已登录，重新加载投票状态
    await teamsStore.loadUserVoteStatus()
  }
})
</script>

<style>
body {
  overflow-y: auto !important;
}

html {
  overflow-y: auto !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #d7f4fa;
  min-height: 100vh;
  height: auto !important; /* 允许高度自适应内容 */
  width: 100%;
  padding-bottom: 200px; /* 大幅增加底部空间 */
  box-sizing: border-box;
  overflow-y: visible !important; /* 强制显示垂直滚动 */
  position: relative; /* 确保定位正确 */
}

.team-cards-container {
  display: grid;
  
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  gap: 15px;
  padding: 20px 20px 80px 20px; /* 大幅增加底部内边距 */
  width: 100%;
  max-width: 768px; /* Max width for the card grid */
  box-sizing: border-box;
  margin: 0 auto; /* 居中容器 */
  justify-items: center; /* 卡片在grid中居中 */
  position: relative; /* 确保定位正确 */
}
</style>