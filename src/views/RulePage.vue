<template>
  <div class="rule-page">
    <!-- 背景 -->
    <div class="bg-container">
      <img class="bg-img" src="@/assets/排行榜/千年龙舟创意新生内页.png" alt="背景" />
    </div>
    
    <!-- 标题区域 -->
    <div class="header">
      <img src="@/assets/规则/投票规则.png" alt="投票规则">
    </div>
    
    <!-- 规则插图（包含龙舟） -->
    <div class="dragon-boat-image">
      <img src="@/assets/规则/rule.png" alt="rule" />
    </div>
    
    <!-- 返回按钮 -->
    <div class="footer">
      <button class="back-btn" @click="$router.go(-1)">
        返回
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

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
  position: relative;        /* 为子元素绝对定位提供参考 */
  width: 100vw;             /* 全屏宽度 */
  height: 100vh;            /* 全屏高度 */
  overflow-y: auto;         /* 允许垂直滚动 */
  display: flex;            /* 弹性布局 */
  flex-direction: column;   /* 垂直排列元素 */
}

/* ================================
   背景图片容器 - 全屏背景
   ================================ */
.bg-container {
  position: absolute;       /* 绝对定位铺满整个页面 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;              /* 背景层级，在其他内容下方 */
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;        /* 保持比例裁剪适应容器 */
}

/* ================================
   标题区域 - 页面顶部标题
   ================================ */
.header {
  position: relative;       /* 相对定位 */
  z-index: 2;              /* 在背景之上显示 */
  padding: 40px 20px 10px; /* 内边距：上40px 左右20px 下10px - 减少底部间距 */
  text-align: center;      /* 标题居中对齐 */
}

.header img {
  width: 150px !important;            /* 桌面端标题图片宽度 */
  max-width: 60vw;         /* 最大宽度不超过视窗60% */
  height: auto;            /* 高度自适应保持比例 */
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)); /* 添加阴影效果 */
}

/* ================================
   规则插图区域 - 主要内容展示
   ================================ */
.dragon-boat-image {
  position: relative;       /* 相对定位 */
  z-index: 2;              /* 在背景之上显示 */
  flex: 1;                 /* 占据剩余空间 */
  display: flex;           /* 弹性布局 */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  padding: 10px 5px 20px;  /* 进一步减少左右内边距：上10px 左右5px 下20px */
  margin-bottom: 80px;     /* 底部留空间给返回按钮 */
}

.dragon-boat-image img {
  width: 100%;              /* 宽度占容器100% */
  max-width: 1100px !important;        /* 进一步增大最大宽度限制 */
  height: auto;            /* 高度自适应 */
  border-radius: 15px;     /* 圆角效果 */
}

/* ================================
   返回按钮 - 底部悬浮按钮
   ================================ */
.footer {
  position: fixed;         /* 固定定位，不随页面滚动 */
  bottom: 30px;           /* 距离底部30px */
  left: 50%;              /* 左边距50% */
  transform: translateX(-50%); /* 向左偏移自身宽度50%，实现水平居中 */
  z-index: 100;           /* 最高层级，确保在所有内容之上 */
}

.back-btn {
  /* 按钮样式设计 */
  background: linear-gradient(135deg, #4A90E2, #357ABD); /* 渐变背景 */
  color: white;            /* 白色文字 */
  border: none;            /* 无边框 */
  padding: 12px 30px;      /* 内边距 */
  border-radius: 25px;     /* 圆角按钮 */
  font-size: 16px;         /* 字体大小 */
  font-weight: bold;       /* 粗体文字 */
  cursor: pointer;         /* 鼠标悬停显示手型 */
  
  /* 视觉效果 */
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3); /* 按钮阴影 */
  transition: all 0.3s ease; /* 所有变化的平滑过渡效果 */
}

/* 按钮悬停效果 */
.back-btn:hover {
  transform: translateY(-2px); /* 向上移动2px */
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4); /* 加深阴影 */
}

/* 按钮点击效果 */
.back-btn:active {
  transform: translateY(0); /* 恢复原位置 */
}

/* ================================
   平板设备适配 (768px以下)
   ================================ */
@media (max-width: 768px) {
  .header {
    padding: 30px 15px 8px; /* 减少内边距，缩小标题和插图间距 */
  }
  
  .header img {
    width: 120px;            /* 缩小标题图片 */
  }
  
  .dragon-boat-image {
    padding: 8px 8px 15px; /* 减少左右内边距，让图片更大 */
    margin-bottom: 70px;     /* 调整底部间距 */
  }
  
  .dragon-boat-image img {
    width: 95%;              /* 增大图片占比 */
    max-width: 600px;        /* 大幅增加平板端最大宽度 */
  }
  
  .back-btn {
    padding: 10px 25px;      /* 缩小按钮尺寸 */
    font-size: 14px;         /* 减小字体 */
  }
  
  .footer {
    bottom: 20px;            /* 调整底部距离 */
  }
}

/* ================================
   手机设备适配 (480px以下)
   ================================ */
@media (max-width: 480px) {
  .header {
    padding: 25px 10px 5px; /* 进一步减少内边距，让间距更紧凑 */
  }
  
  .header img {
    width: 100px;            /* 进一步缩小标题 */
  }
  
  .dragon-boat-image {
    padding: 5px 5px 10px; /* 最小边距，让图片最大化利用空间 */
    margin-bottom: 60px;     /* 调整底部空间 */
  }
  
  .dragon-boat-image img {
    width: 98%;              /* 最大化利用屏幕空间 */
    max-width: 500px;        /* 大幅增加手机端最大宽度 */
  }
  
  .back-btn {
    padding: 8px 20px;       /* 最小按钮尺寸 */
    font-size: 13px;         /* 最小字体 */
  }
}

/* ================================
   矮屏幕设备适配 (高度600px以下)
   ================================ */
@media (max-height: 600px) {
  .header {
    padding: 20px 20px 10px; /* 压缩顶部空间 */
  }
  
  .dragon-boat-image {
    margin-bottom: 60px;     /* 减少底部空间 */
  }
  
  .footer {
    bottom: 15px;            /* 按钮更贴近底部 */
  }
}
</style>