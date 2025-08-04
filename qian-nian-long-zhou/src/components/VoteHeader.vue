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

    <!-- 退出确认对话框 -->
    <van-dialog
      v-model:show="showLogoutDialog"
      title="确认退出"
      message="确定要退出登录吗？"
      :show-cancel-button="true"
      :close-on-click-overlay="false"
    >
      <template #footer>
        <div class="custom-dialog-footer">
          <van-button 
            type="primary" 
            @click="confirmLogout"
            class="confirm-btn"
          >
            确定
          </van-button>
          <van-button 
            @click="cancelLogout"
            class="cancel-btn"
          >
            取消
          </van-button>
        </div>
      </template>
    </van-dialog>

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
const showLogoutDialog = ref(false)

const handleLogout = () => {
  // 直接显示对话框，不使用 showDialog 函数
  showLogoutDialog.value = true
}

const confirmLogout = async () => {
  try {
    await authStore.logout()
    showToast({
      type: 'success',
      message: '已退出登录'
    })
    router.push('/')
  } catch (error) {
    showToast({
      type: 'fail',
      message: '退出失败'
    })
  } finally {
    showLogoutDialog.value = false
  }
}

const cancelLogout = () => {
  showLogoutDialog.value = false
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
  outline: none;
  /* 移除点击时的边框 */
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
/* 自定义对话框样式 */
:deep(.van-dialog) {
  max-height: 300px; /* 限制对话框最大高度 */
  min-height: 200px; /* 设置最小高度 */
}

:deep(.van-dialog__content) {
  padding-bottom: 8px; /* 减少内容区域底部padding */
}

/* 自定义对话框底部样式 */
.custom-dialog-footer {
  display: flex;
  gap: 16px;
  padding: 8px 24px 20px 24px; /* 减少顶部padding，增加底部padding */
  justify-content: center;
  margin-top: -10px; /* 负边距让按钮更靠上 */
}

.confirm-btn {
  flex: 1;
  min-width: 120px;
  height: 44px;
  --van-button-primary-background: rgb(250, 130, 25);
  --van-button-primary-border-color:rgb(250, 130, 25);
  --van-button-border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
}

.cancel-btn {
  flex: 1;
  min-width: 120px;
  height: 44px;
  --van-button-default-background: #f5f5f5;
  --van-button-default-border-color: #d9d9d9;
  --van-button-default-color: #666;
  --van-button-border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
}
/* 按钮容器定位 */
.right-buttons {
  position: fixed;
  top: 15%;
  right: 0; /* 改为0，完全贴边 */
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}

.side-btn img {
  width: 30px !important;
  height: 60px !important;
  display: block;
  margin-right: -1px; /* 添加负边距，消除1px间隙 */
}

/* 移除媒体查询中的额外间距 */
@media (max-width: 375px) {
  .right-buttons {
    right: 0; /* 小屏幕也完全贴边 */
  }
}
</style>

