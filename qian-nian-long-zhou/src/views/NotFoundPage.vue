<template>
  <div class="not-found-page">
    <!-- 背景图 -->
   <div class="bg-container">
      <img class="bg-img" src="@/assets/default-image.jpg" alt="背景" />
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <div class="center-content">
        <!-- 404 图标 -->
        <div class="error-icon">
          <div class="number-404">404</div>
        </div>

        <!-- 龙舟图标 -->
        <div class="dragon-boat-icon">
          <img src="@/assets/default-image.jpg" alt="龙舟" class="boat-img" />
        </div>

        <!-- 错误信息 -->
        <div class="error-message">
          <h2>页面走失了...</h2>
          <p>您访问的页面可能已经搬家或者不存在</p>
          <p>龙舟已经为您准备好回家的路</p>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="btn-primary" @click="goHome">
            <!-- 移除图片或使用默认图片 -->
            回到首页
          </button>
          <button class="btn-secondary" @click="goBack">
            返回上页
          </button>
        </div>

        <!-- 快捷导航 -->
        <div class="quick-nav">
          <div class="nav-title">快速导航</div>
          <div class="nav-buttons">
            <button class="nav-btn" @click="$router.push('/vote')">
              投票页面
            </button>
            <button class="nav-btn" @click="$router.push('/rank')">
              排行榜
            </button>
            <button class="nav-btn" @click="$router.push('/rule')">
              规则说明
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧悬浮按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rule')">
        <!-- 使用文字或移除图片 -->
        规则
      </button>
      <button class="side-btn" @click="$router.push('/rank')">
        <!-- 使用文字或移除图片 -->
        排行
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 回到首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

// 页面加载完成
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* 全屏容器 */
.not-found-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #87CEEB;
}

/* 背景图片 */
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
  object-position: center;
  opacity: 0.3;
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
  outline: none;
}

.side-btn:hover {
  transform: translateX(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.side-btn img {
  width: 30px;
  height: 60px;
  display: block;
  border-radius: 8px;
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
  text-align: center;
}

/* 404 错误图标 */
.error-icon {
  margin-bottom: 20px;
}

.number-404 {
  font-size: 120px;
  font-weight: bold;
  color: #ff6600;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  line-height: 1;
}

/* 龙舟图标 */
.dragon-boat-icon {
  margin: 20px 0;
}

.boat-img {
  width: 200px;
  height: auto;
  opacity: 0.8;
  animation: float 3s ease-in-out infinite;
}

/* 浮动动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 错误信息 */
.error-message {
  margin: 30px 0;
  color: #333;
}

.error-message h2 {
  font-size: 28px;
  color: #ff6600;
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.error-message p {
  font-size: 16px;
  line-height: 1.6;
  margin: 8px 0;
  color: #666;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6600, #ff8c33);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 102, 0, 0.4);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  border: 2px solid #ddd;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: white;
  border-color: #ff6600;
  color: #ff6600;
  transform: translateY(-2px);
}

/* 快捷导航 */
.quick-nav {
  margin-top: 40px;
}

.nav-title {
  font-size: 18px;
  color: #ff6600;
  margin-bottom: 15px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.nav-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.8);
  color: #666;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #ff6600;
  color: white;
  border-color: #ff6600;
  transform: translateY(-1px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .number-404 {
    font-size: 80px;
  }
  
  .boat-img {
    width: 150px;
  }
  
  .error-message h2 {
    font-size: 24px;
  }
  
  .error-message p {
    font-size: 14px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-buttons {
    gap: 10px;
  }
  
  .nav-btn {
    font-size: 12px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .number-404 {
    font-size: 60px;
  }
  
  .boat-img {
    width: 120px;
  }
  
  .error-message h2 {
    font-size: 20px;
  }
  
  .center-content {
    padding: 15px;
  }
}
</style>
