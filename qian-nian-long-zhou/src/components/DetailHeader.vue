<template>
  <div class="header-container">
    <DynamicImage 
      resource-key="activity_banner" 
      fallback-url="/src/assets/投票/千年龙舟创意新生：为隆隆龙创意短视频打call.jpg"
      alt="Activity Banner" 
      class="header-banner" 
      preload
    />
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
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DynamicImage from '@/components/DynamicImage.vue'

const router = useRouter()

</script>

<style scoped>
.header-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -170px;
}

.header-banner {
  width: 100%;
  height: auto;
  display: block;
}

/* 按钮基础样式 */
.side-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative; /* 添加相对定位 */
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
  width: 30px !important;
  height: 60px !important;
  display: block;
}

/* 按钮容器定位 */
.right-buttons {
  position: fixed;
  top: 15%;
  right: 10px !important;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10; /* 提高z-index值，确保在最上层 */
}
</style>