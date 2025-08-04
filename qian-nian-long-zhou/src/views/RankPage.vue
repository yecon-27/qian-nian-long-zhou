<template>
  <div class="rank-page">
    <!-- 背景图 -->
    <div class="bg-container">
      <DynamicImage class="bg-img" resource-key="activity_inner_bg" fallback-url="/src/assets/排行榜/千年龙舟创意新生内页.png"
        alt="背景" preload />
    </div>

    <!-- 右侧按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rule')">
        <DynamicImage resource-key="rules_icon" fallback-url="/src/assets/首页/规则.png" alt="规则" />
      </button>
      <button class="back-btn" @click="goBack" title="返回上一页">
        <span class="back-text">返回</span>
      </button>
    </div>

    <!-- 排行榜标题 -->
    <div class="title-container">
      <DynamicImage resource-key="ranking_title" fallback-url="/src/assets/排行榜/排行榜标题.png" alt="排行榜标题"
        class="title-img" />
    </div>

    <!-- 前三名展示区 -->
    <div class="top-three-wrapper">
      <TopThreeRanks :rankedCards="rankedWorks" />
    </div>

    <!-- 其他排名列表 -->
    <div class="other-ranks-wrapper">
      <OtherRanks :otherRankedCards="rankedWorks.slice(3)" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'
import TopThreeRanks from '@/components/TopThreeRanks.vue'
import OtherRanks from '@/components/OtherRanks.vue'
import DynamicImage from '@/components/DynamicImage.vue'

const router = useRouter()
const teamsStore = useTeamsStore()

// 使用 teams store 的排序数据作为排行榜数据源
const rankedWorks = computed(() => {
  return teamsStore.rankedCards
})

// 返回上一页函数
const goBack = () => {
  router.go(-1)
}

// 确保页面加载时滚动到顶部
onMounted(async () => {
  window.scrollTo(0, 0)

  // 如果 teams store 中没有数据，则加载数据
  if (teamsStore.teamCards.length === 0) {
    await teamsStore.loadTeams() // 修改为 loadTeams
  }
})
</script>

<style scoped>
.rank-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  z-index: 2;
}

.bg-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}



.back-btn {
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  border: none;
  border-radius: 5px;
  padding: 8px 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  width: 32px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -1px;
  /* 改为0，去除右边距 */
}


.back-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  writing-mode: vertical-rl;
  text-orientation: upright;
  line-height: 1.4;
  letter-spacing: 5px;
}

/* 右侧悬浮按钮组 */
.right-buttons {
  position: fixed;
  top: 15%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}

.side-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  position: relative;
  /* 移除点击时的边框 */
}

.side-btn img {
  width: 30px;
  height: 60px;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  position: relative;
  right: -1px;
  /* 向右偏移1px，确保完全贴边 */
}

/* 标题 */
.title-container {
  position: relative;
  text-align: center;
  padding: 40px 0 20px;
  z-index: 2;
}

.title-img {
  max-width: 150px;
  height: auto;
}

/* 前三名展示区包装器 */
.top-three-wrapper {
  position: relative;
  z-index: 2;
}

/* 其他排名列表包装器 */
.other-ranks-wrapper {
  position: relative;
  z-index: 2;
}

@media (max-width: 480px) {
  .right-buttons {
    right: -1px;
  }
}
</style>
<!-- <DynamicImage resource-key="rules_icon" alt="规则" />
<DynamicImage resource-key="ranking_icon" alt="排行" /> -->