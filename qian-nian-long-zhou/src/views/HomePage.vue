<template>
  <div class="homepage">
    <!-- 背景图 -->
    <DynamicImage 
      class="bg-img" 
      resource-key="home_background" 
      alt="背景" 
      preload
    />

    <!-- 右侧悬浮按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rule')">
        <DynamicImage 
          resource-key="rules_icon" 
          alt="规则" 
        />
      </button>
      <button class="side-btn" @click="$router.push('/rank')">
        <DynamicImage 
          resource-key="ranking_icon" 
          alt="排行" 
        />
      </button>
    </div>

    <!-- 打板按钮 - 装饰性 -->
    <div class="top-left-button">
      <div class="daban-btn">
        <DynamicImage 
          resource-key="home_clapper" 
          alt="打板" 
        />
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <div class="center-content">
        <div class="main-title-container">
          <DynamicImage 
            class="main-title" 
            resource-key="home_main_title" 
            alt="主标题" 
            preload
          />
        </div>
        <!-- 我要投票 -->
        <div class="vote-btn-container">
          <button class="vote-btn" @click="$router.push('/vote')">
            <DynamicImage 
              resource-key="home_vote_button" 
              alt="我要投票" 
            />
          </button>
         </div> 
          <!-- 主视图龙舟插件 -->
        <div class="main-visual-container">
          <DynamicImage 
            class="main-visual" 
            resource-key="home_main_visual" 
            alt="主视觉" 
            preload
          />
        </div>
        <!-- LOGO -->
        <div class="logo-container">
          <DynamicImage 
            class="logo" 
            resource-key="home_organizer" 
            alt="LOGO" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DynamicImage from '@/components/DynamicImage.vue'

const router = useRouter()

// 可选的增强功能（目前暂未启用）
// const isLoading = ref(true)
// const showWelcome = ref(false)

// 页面加载完成
onMounted(() => {
  // 确保页面加载时滚动到顶部
  window.scrollTo(0, 0)
  // isLoading.value = false
  // setTimeout(() => {
  //   showWelcome.value = true
  // }, 500)
})

// 带确认的页面跳转
// const confirmNavigation = (path: string, message: string) => {
//   if (confirm(message)) {
//     router.push(path)
//   }
// }

// 统计按钮点击（如果需要埋点）
// const trackButtonClick = (buttonName: string) => {
//   console.log(`用户点击了：${buttonName}`)
//   // 这里可以发送统计数据到后端
// }
</script>

<style scoped>
/* 全屏首页容器 */
.homepage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #87CEEB;
}

/* 背景图片 */
.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

/* 所有按钮的通用样式 */
.vote-btn, .side-btn {
  background: none;
  border: none;
  padding: 0;
  outline: none; /* 移除点击时的边框 */
}



/* 打板装饰性元素 */
.daban-btn {
  display: block;
}

/* 按钮容器定位 */
.top-left-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 3;
}

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

/* 内容区域 */
.content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 60px 0 80px;
}

.vote-btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* 图片尺寸 - 集中管理 */
.daban-btn img {
  width: 30px !important;
  height: auto;
}

.side-btn img {
  width: 30px !important;
  height: 60px !important;
  display: block;

}

.vote-btn img {
  width: 80px !important;
  height: 80px !important;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(255, 108, 17, 0.4);
  animation: breathe 2s ease-in-out infinite; /* 添加呼吸动效 */
}

/* 呼吸动效关键帧 */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(255, 108, 17, 0.4);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 108, 17, 0.6);
  }
}

.main-title {
  width: 280px !important;
  max-width: 80vw;
  height: auto;
}

.main-visual {
  width: 400px !important;
  max-width: 85vw;
  height: auto;
}

.logo {
  width: 200px !important;
  max-width: 70vw;
  height: auto;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .top-left-button { top: 15px; left: 15px; }
  .right-buttons { right: 0; }
  .center-content { margin: 40px 0 60px; padding: 15px; }
  
  .daban-btn img { width: 50px; }
  .side-btn img { width: 40px; height: 80px; }
  .vote-btn img { width: 70px; height: 70px; }
  .main-visual { width: 280px; }
  .main-title { width: 220px; }
  .logo { width: 100px; }
}

@media (max-width: 360px) {
  .side-btn img { width: 35px; height: 70px; }
  .vote-btn img { width: 60px; height: 60px; }
  .main-visual { width: 240px; }
  .main-title { width: 180px; }
  .logo { width: 80px; }
}
</style>
