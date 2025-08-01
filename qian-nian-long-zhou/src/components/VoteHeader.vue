<template>
  <div class="header-container">
    <!-- 用户状态栏 - 移到最顶部 -->
    <div class="user-status-bar">
      <div v-if="authStore.isAuthenticated" class="user-info">
        <span class="welcome-text">欢迎，{{ authStore.user?.nickname || authStore.user?.username || '用户' }}</span>
        <van-button type="default" size="mini" @click="handleLogout" class="logout-btn">
          退出
        </van-button>
      </div>
      <div v-else class="login-prompt">
        <span class="prompt-text">请登录后参与投票</span>
        <van-button type="primary" size="mini" @click="goToLogin" class="login-btn">
          登录
        </van-button>
      </div>
    </div>

    <DynamicImage resource-key="activity_banner" fallback-url="/src/assets/投票/千年龙舟创意新生：为隆隆龙创意短视频打call.jpg"
      alt="Activity Banner" class="header-banner" preload />

    <!-- 搜索部分 -->
    <div class="search-section">
      <div class="search-bar">
        <DynamicImage resource-key="search_icon" fallback-url="/src/assets/投票/搜索引擎（放大镜）.png" alt="Search Icon"
          class="search-icon" />
        <input type="text" placeholder="请输入搜索内容" v-model="searchKeyword" @input="handleSearch"
          @keyup.enter="handleSearch" />
      </div>
    </div>
    <!-- 右侧悬浮按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rule')">
        <DynamicImage resource-key="rules_icon" alt="规则" />
      </button>
      <button class="side-btn" @click="$router.push('/rank')">
        <DynamicImage resource-key="ranking_icon" alt="排行" />
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { showToast, showDialog } from 'vant'
import DynamicImage from '@/components/DynamicImage.vue'

const router = useRouter()
const authStore = useAuthStore()

// 搜索功能
const searchKeyword = ref('')
const emit = defineEmits<{
  search: [keyword: string]
}>()

const handleSearch = () => {
  emit('search', searchKeyword.value)
}

// 登录相关方法
const goToLogin = () => {
  router.push({
    name: 'Login',
    query: { redirect: '/vote' }
  })
}

const handleLogout = async () => {
  try {
    await showDialog({
      title: '确认退出',
      message: '确定要退出登录吗？',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })

    await authStore.logout()
    showToast({
      type: 'success',
      message: '已退出登录'
    })

    // 退出后跳转到首页
    router.push('/')
  } catch (error) {
    // 用户取消或退出失败
    if (error !== 'cancel') {
      showToast({
        type: 'fail',
        message: '退出失败'
      })
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -10px;
}

.header-banner {
  width: 100%;
  height: auto;
  display: block;
}

/* 搜索部分 */
.search-section {
  width: 110%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  /* 使用弹性布局 */
  justify-content: center;
  /* 水平居中对齐 */
  margin-top: -70px !important;
  /* Adjust based on header height */
  z-index: 10;
  /* Ensure it's above other elements if needed */
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 25px;
  padding: 8px 15px;
  width: 90%;
  max-width: 400px;
}

.search-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.search-bar input {
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 15px;
  color: #333;
}

.search-bar input::placeholder {
  color: #aaa;
}

/* 按钮基础样式 */
.side-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  outline: none;
  /* 移除点击时的边框 */
}

.side-btn:hover {
  transform: translateX(-5px);
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); */
}

.side-btn:focus {
  outline: none;
  /* 移除焦点时的边框 */
}

.side-btn:active {
  outline: none;
  /* 移除激活时的边框 */
}

.side-btn img {
  width: 30px !important;
  height: 60px !important;
  display: block;
}

/* 用户状态栏样式 */
.user-status-bar {
  width: 100%;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  z-index: 15;
}

.user-info,
.login-prompt {
  display: flex;
  align-items: center;
  gap: 12px;
}

.welcome-text,
.prompt-text {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.logout-btn {
  --van-button-default-background: #f5f5f5;
  --van-button-default-border-color: #d9d9d9;
  --van-button-default-color: #666;
}

.login-btn {
  --van-button-primary-background: #1989fa;
  --van-button-primary-border-color: #1989fa;
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
  z-index: 10;
}
</style>