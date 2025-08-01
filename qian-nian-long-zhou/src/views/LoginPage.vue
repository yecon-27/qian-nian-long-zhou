<template>
  <div class="login-page">
    <!-- 头部 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="goBack"
      class="login-nav"
    />

    <!-- 登录表单容器 -->
    <div class="login-container">
      <!-- Logo 区域 -->
      <div class="logo-section">
        <img src="@/assets/logo.svg" alt="龙舟投票" class="logo" />
        <h1 class="app-title">龙舟投票系统</h1>
        <p class="app-subtitle">请登录后参与投票</p>
      </div>

      <!-- 登录表单 -->
      <van-form @submit="handleLogin" class="login-form">
        <van-cell-group inset>
          <van-field
            v-model="loginForm.username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="usernameRules"
            left-icon="contact"
            clearable
          />
          <van-field
            v-model="loginForm.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="passwordRules"
            left-icon="lock"
            clearable
          />
        </van-cell-group>

        <!-- 登录按钮 -->
        <div class="login-actions">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="authStore.loading"
            loading-text="登录中..."
            class="login-btn"
          >
            登录
          </van-button>
        </div>
      </van-form>

      <!-- 其他操作 -->
      <div class="other-actions">
        <van-button
          type="default"
          size="small"
          @click="showRegisterDialog = true"
          class="register-btn"
        >
          还没有账号？立即注册
        </van-button>
      </div>
    </div>

    <!-- 注册对话框 -->
    <van-dialog
      v-model:show="showRegisterDialog"
      title="用户注册"
      show-cancel-button
      @confirm="handleRegister"
      :confirm-button-loading="authStore.loading"
    >
      <van-form class="register-form">
        <van-field
          v-model="registerForm.username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="usernameRules"
        />
        <van-field
          v-model="registerForm.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="passwordRules"
        />
        <van-field
          v-model="registerForm.confirmPassword"
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="confirmPasswordRules"
        />
        <van-field
          v-model="registerForm.nickname"
          label="昵称"
          placeholder="请输入昵称（可选）"
        />
      </van-form>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { showToast, showDialog } from 'vant'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: ''
})

// 对话框状态
const showRegisterDialog = ref(false)

// 表单验证规则
const usernameRules = [
  { required: true, message: '请输入用户名' },
  { min: 3, max: 20, message: '用户名长度为3-20个字符' }
]

const passwordRules = [
  { required: true, message: '请输入密码' },
  { min: 6, max: 20, message: '密码长度为6-20个字符' }
]

const confirmPasswordRules = [
  { required: true, message: '请确认密码' },
  {
    validator: (value: string) => {
      if (value !== registerForm.password) {
        return '两次输入的密码不一致'
      }
      return true
    }
  }
]

// 处理登录
const handleLogin = async () => {
  try {
    await authStore.login(loginForm.username, loginForm.password)
    
    showToast({
      type: 'success',
      message: '登录成功'
    })

    // 登录成功后跳转
    const redirect = route.query.redirect as string
    if (redirect) {
      router.push(redirect)
    } else {
      router.push('/')
    }
  } catch (error: any) {
    showToast({
      type: 'fail',
      message: error.message || '登录失败'
    })
  }
}

// 处理注册
const handleRegister = async () => {
  try {
    // 验证表单
    if (!registerForm.username || !registerForm.password) {
      showToast('请填写完整信息')
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      showToast('两次输入的密码不一致')
      return
    }

    await authStore.register({
      username: registerForm.username,
      password: registerForm.password,
      nickname: registerForm.nickname || registerForm.username
    })

    showToast({
      type: 'success',
      message: '注册成功'
    })

    // 关闭注册对话框
    showRegisterDialog.value = false
    
    // 清空注册表单
    Object.assign(registerForm, {
      username: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    })

    // 自动填入登录表单
    loginForm.username = registerForm.username
    
  } catch (error: any) {
    showToast({
      type: 'fail',
      message: error.message || '注册失败'
    })
  }
}

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

// 页面初始化
onMounted(() => {
  // 如果已经登录，直接跳转
  if (authStore.isAuthenticated) {
    const redirect = route.query.redirect as string
    router.push(redirect || '/')
  }
})
</script>

<style scoped>
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: skyblue; /* 您可以根据需要更改背景颜色 */
}

.login-container {
  padding: 20px;
  min-height: calc(100vh - 46px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.app-title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.app-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
}

.login-form {
  margin-bottom: 20px;
}

.login-actions {
  padding: 20px 16px 0;
}

.login-btn {
  height: 44px;
  font-size: 16px;
  font-weight: bold;
  --van-button-primary-background: #ff6b6b;
  --van-button-primary-border-color: #ff6b6b;
}

.other-actions {
  text-align: center;
  padding: 20px 0;
}

.register-btn {
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  --van-button-default-color: rgba(255, 255, 255, 0.9);
  --van-button-default-background: transparent;
  --van-button-default-border-color: rgba(255, 255, 255, 0.3);
}

.register-form {
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 375px) {
  .login-container {
    padding: 16px;
  }
  
  .logo {
    width: 60px;
    height: 60px;
  }
  
  .app-title {
    font-size: 20px;
  }
}
</style>