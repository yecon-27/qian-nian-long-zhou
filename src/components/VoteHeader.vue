<template>
  <div class="header-container">
    <img src="@/assets/投票/千年龙舟创意新生：为隆隆龙创意短视频打call.jpg" alt="Activity Banner" class="header-banner" />
    <!-- 搜索部分 -->
    <div class="search-section">
      <div class="search-bar">
        <img src="@/assets/投票/搜索引擎（放大镜）.png" alt="Search Icon" class="search-icon" />
        <input 
          type="text" 
          placeholder="请输入搜索内容" 
          v-model="searchKeyword"
          @input="handleSearch"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
    <!-- 右侧悬浮按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rule')">
        <img src="@/assets/首页/规则.png" alt="规则" />
      </button>
      <button class="side-btn" @click="$router.push('/rank')">
        <img src="@/assets/首页/排行.png" alt="排行" />
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 搜索功能
const searchKeyword = ref('')
const emit = defineEmits<{
  search: [keyword: string]
}>()

const handleSearch = () => {
  emit('search', searchKeyword.value)
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
  display: flex; /* 使用弹性布局 */
  justify-content: center; /* 水平居中对齐 */
  margin-top: -70px !important; /* Adjust based on header height */
  z-index: 10; /* Ensure it's above other elements if needed */
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
  z-index: 10;
}
</style>