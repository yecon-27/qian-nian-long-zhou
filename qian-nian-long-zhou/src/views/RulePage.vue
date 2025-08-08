<template>
  <div class="rule-page">
    <!-- 背景 -->
    <div class="bg-container">
      <DynamicImage class="bg-img" resource-key="activity_inner_bg" fallback-url="/src/assets/排行榜/千年龙舟创意新生内页.png"
        alt="背景" preload />
    </div>

    <!-- 右侧按钮组 -->
    <div class="right-buttons">
      <button class="side-btn" @click="$router.push('/rank')">
        <DynamicImage resource-key="ranking_icon" fallback-url="/src/assets/首页/排行.png" alt="排行" />
      </button>
      <button class="back-btn" @click="goBack" title="返回上一页">
        <span class="back-text">返回</span>
      </button>
    </div>

    <!-- 标题区域 -->
    <div class="header">
      <DynamicImage resource-key="vote_rules" fallback-url="/src/assets/规则/投票规则.png" alt="投票规则" />
    </div>

    <!-- 规则插图（包含龙舟） -->
    <div class="dragon-boat-image">
      <DynamicImage resource-key="rule_detail" fallback-url="/src/assets/规则/rule.png" alt="rule" />
    </div>


  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import DynamicImage from '@/components/DynamicImage.vue'

const router = useRouter()

// 返回上一页函数
const goBack = () => {
  router.go(-1)
}

// 确保页面加载时滚动到顶部
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* ================================
   规则页面容器 - 全屏布局
   ================================ */
.rule-page {
  position: relative;
  /* 为子元素绝对定位提供参考 */
  width: 100vw;
  /* 全屏宽度 */
  height: 100vh;
  /* 全屏高度 */
  overflow-y: auto;
  /* 允许垂直滚动 */
  display: flex;
  /* 弹性布局 */
  flex-direction: column;
  /* 垂直排列元素 */
}

.bg-container {
  position: absolute;
  /* 绝对定位铺满整个页面 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* 背景层级，在其他内容下方 */
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 保持比例裁剪适应容器 */
}

.header {
  position: relative;
  /* 相对定位 */
  z-index: 2;
  /* 在背景之上显示 */
  padding: 40px 20px 10px;
  /* 内边距：上40px 左右20px 下10px - 减少底部间距 */
  text-align: center;
  /* 标题居中对齐 */
}

.header img {
  width: 150px !important;
  /* 桌面端标题图片宽度 */
  max-width: 60vw;
  /* 最大宽度不超过视窗60% */
  height: auto;
  /* 高度自适应保持比例 */
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
  /* 添加阴影效果 */
}

/* ================================
   规则插图区域 - 主要内容展示
   ================================ */
.dragon-boat-image {
  position: relative;
  /* 相对定位 */
  z-index: 2;
  /* 在背景之上显示 */
  flex: 1;
  /* 占据剩余空间 */
  display: flex;
  /* 弹性布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  padding: 10px 5px 20px;
  /* 进一步减少左右内边距：上10px 左右5px 下20px */
  margin-bottom: 80px;
  /* 底部留空间给返回按钮 */
}

.dragon-boat-image img {
  width: 100%;
  /* 宽度占容器100% */
  max-width: 1100px !important;
  /* 进一步增大最大宽度限制 */
  height: auto;
  /* 高度自适应 */
  border-radius: 15px;
  /* 圆角效果 */
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
  margin-right: -1px;
  /* 向右偏移1px，确保完全贴边 */
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
  margin-right: 0;
  /* 改为0，去除右边距 */
}

.back-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  writing-mode: vertical-rl;
  text-orientation: upright;
  line-height: 1.4;
  letter-spacing: 5px;
}


/* ================================
   平板设备适配 (768px以下)
   ================================ */
@media (max-width: 768px) {
  .header {
    padding: 30px 15px 8px;
    /* 减少内边距，缩小标题和插图间距 */
  }

  .header img {
    width: 120px;
    /* 缩小标题图片 */
  }

  .dragon-boat-image {
    padding: 8px 8px 15px;
    /* 减少左右内边距，让图片更大 */
    margin-bottom: 70px;
    /* 调整底部间距 */
  }

  .dragon-boat-image img {
    width: 95%;
    /* 增大图片占比 */
    max-width: 600px;
    /* 大幅增加平板端最大宽度 */
  }

  .right-buttons {
    right: -1px;
    /* 确保移动端也贴边 */
  }
}

/* ================================
   手机设备适配 (480px以下)
   ================================ */
@media (max-width: 480px) {
  .header {
    padding: 25px 10px 5px;
    /* 进一步减少内边距，让间距更紧凑 */
  }

  .right-buttons {
    right: -1px;
    /* 确保移动端也贴边 */
  }

  .header img {
    width: 100px;
    /* 进一步缩小标题 */
  }

  .dragon-boat-image {
    padding: 5px 5px 10px;
    /* 最小边距，让图片最大化利用空间 */
    margin-bottom: 60px;
    /* 调整底部空间 */
  }

  .dragon-boat-image img {
    width: 98%;
    /* 最大化利用屏幕空间 */
    max-width: 500px;
    /* 大幅增加手机端最大宽度 */
  }


}

/* ================================
   矮屏幕设备适配 (高度600px以下)
   ================================ */
@media (max-height: 600px) {
  .header {
    padding: 20px 20px 10px;
    /* 压缩顶部空间 */
  }

  .dragon-boat-image {
    margin-bottom: 60px;
    /* 减少底部空间 */
  }
}
</style>