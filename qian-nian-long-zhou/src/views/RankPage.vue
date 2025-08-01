<template>
  <div class="rank-page">
    <!-- 背景图 -->
    <div class="bg-container">
      <DynamicImage 
        class="bg-img" 
        resource-key="activity_inner_bg" 
        fallback-url="/src/assets/排行榜/千年龙舟创意新生内页.png"
        alt="背景" 
        preload
      />
    </div>

    <!-- 右侧悬浮按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rule')">
        <DynamicImage 
          resource-key="rules_icon" 
          fallback-url="/src/assets/首页/规则.png"
          alt="规则" 
        />
      </button>
      <button class="side-btn" @click="$router.push('/rank')">
        <DynamicImage 
          resource-key="ranking_icon" 
          fallback-url="/src/assets/首页/排行.png"
          alt="排行" 
        />
      </button>
    </div>

    <!-- 排行榜标题 -->
    <div class="title-container">
      <DynamicImage 
        resource-key="ranking_title" 
        fallback-url="/src/assets/排行榜/排行榜标题.png"
        alt="排行榜标题" 
        class="title-img" 
      />
    </div>

    <!-- 前三名展示区 -->
    <div class="top-three-wrapper">
      <TopThreeRanks 
        :rankedCards="rankedWorks" 
      />
    </div>

    <!-- 其他排名列表 -->
    <div class="other-ranks-wrapper">
      <OtherRanks 
        :otherRankedCards="rankedWorks.slice(3)" 
      />
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

/* 右侧悬浮按钮组 */
.right-buttons {
  position: fixed;
  top: 15%;
  right: 10px;
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
  cursor: pointer;
  transition: transform 0.3s ease;
  outline: none; /* 移除点击时的边框 */
}

.side-btn:hover {
  transform: translateX(-5px);
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); */
}

.side-btn:focus {
  outline: none; /* 移除焦点时的边框 */
}

.side-btn:active {
  outline: none; /* 移除激活时的边框 */
}

.side-btn img {
  width: 30px;
  height: 60px;
  display: block;
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
</style>