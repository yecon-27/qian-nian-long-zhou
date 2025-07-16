<template>
  <div class="rank-page">
    <!-- 背景图 -->
    <div class="bg-container">
      <img class="bg-img" src="@/assets/排行榜/千年龙舟创意新生内页.png" alt="背景" />
    </div>

    <!-- 右侧悬浮按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rule')">
        <img src="@/assets/排行榜/规则.png" alt="规则" />
      </button>
      <button class="side-btn" @click="$router.push('/rank')">
        <img src="@/assets/排行榜/排行.png" alt="排行" />
      </button>
    </div>

    <!-- 排行榜标题 -->
    <div class="title-container">
      <img src="@/assets/排行榜/排行榜标题.png" alt="排行榜标题" class="title-img" />
    </div>

    <!-- 前三名展示区 -->
    <div class="top-three-wrapper">
      <TopThreeRanks 
        :rankedCards="teamsStore.rankedCards" 
      />
    </div>

    <!-- 其他排名列表 -->
    <div class="other-ranks-wrapper">
      <OtherRanks 
        :otherRankedCards="teamsStore.rankedCards.slice(3)" 
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'
import TopThreeRanks from '@/components/TopThreeRanks.vue'
import OtherRanks from '@/components/OtherRanks.vue'

const router = useRouter()
const teamsStore = useTeamsStore()

// 确保页面加载时滚动到顶部
onMounted(() => {
  window.scrollTo(0, 0)
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