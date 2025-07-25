<template>
  <div class="rank-votes">
    <span>{{ votes }}票</span>
    <!-- <div class="tooltip-container" @click="toggleTooltip" ref="triggerRef">
      <img
        src="@/assets/排行榜/票数后的详细信息.png"
        alt="详细信息"
        class="info-icon"
      />
      <Teleport to="body">
        <div
          ref="tooltipRef"
          class="tooltip-text"
          v-if="show"
          @click.stop
          :style="tooltipStyle"
          :data-position="tooltipStyle['data-position']"
        >
          <div>点赞数：{{ likes || 0 }}</div>
          <div>天瑞地安客户端阅读量：{{ readCount || 0 }}</div>
        </div>
      </Teleport>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useTooltipManager } from '@/composables/useTooltipManager.js'

const props = defineProps({
  votes: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  readCount: {
    type: Number,
    default: 0
  }
})

const { registerTooltip, unregisterTooltip, showTooltip, hideTooltip } = useTooltipManager()

// 生成唯一的弹窗ID
const tooltipId = ref(`tooltip-${Date.now()}-${Math.random()}`)
const show = ref(false)
const triggerRef = ref(null)
const tooltipRef = ref(null)

// 强制重新计算位置的触发器
const recalculatePosition = ref(0)

// 计算tooltip的位置
const tooltipStyle = computed(() => {
  if (!triggerRef.value) return {}
  
  // 添加recalculatePosition依赖，确保在需要时重新计算
  recalculatePosition.value
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // 预估tooltip的尺寸（基于样式估算）
  const tooltipWidth = 140 // min-width
  const tooltipHeight = 50 // 大约高度
  const margin = 2 // 进一步减少间距，让tooltip紧贴触发元素
  
  // 默认位置：上方居中
  let left = triggerRect.left + triggerRect.width / 2
  let top = triggerRect.top - margin
  let transform = 'translateX(-50%) translateY(-100%)'
  let position = 'top'
  
  // 计算各个方向的溢出情况
  const wouldOverflowLeft = left - tooltipWidth / 2 < margin
  const wouldOverflowRight = left + tooltipWidth / 2 > viewportWidth - margin
  const wouldOverflowTop = top - tooltipHeight < margin
  const wouldOverflowBottom = triggerRect.bottom + tooltipHeight + margin > viewportHeight
  
  
  if (wouldOverflowRight && !wouldOverflowLeft) {
    // 右边溢出，调整到左边 - 紧贴触发元素
    left = triggerRect.left - margin
    top = triggerRect.top + triggerRect.height / 2
    transform = 'translateX(-70%) translateY(-50%)'
    position = 'left'
  }
  
  // 最终边界检查
  if (left < margin) left = margin
  if (left + tooltipWidth > viewportWidth - margin) left = viewportWidth - tooltipWidth - margin
  if (top < margin) top = margin
  if (top + tooltipHeight > viewportHeight - margin) top = viewportHeight - tooltipHeight - margin
  
  return {
    position: 'fixed',
    left: `${left}px`,
    top: `${top}px`,
    transform: transform,
    zIndex: 10001,
    'data-position': position
  }
})

// 创建弹窗实例对象
const tooltipInstance = {
  hide: () => {
    show.value = false
  }
}

const toggleTooltip = (event) => {
  if (show.value) {
    // 如果当前弹窗已显示，则隐藏
    show.value = false
    hideTooltip(tooltipId.value)
  } else {
    // 显示新弹窗前，先通知管理器关闭其他弹窗
    showTooltip(tooltipId.value)
    show.value = true
    
    // 在下一个tick中重新计算位置，确保DOM已更新
    nextTick(() => {
      recalculatePosition.value++
    })
  }
}

const handleClickOutside = (event) => {
  // 检查是否点击了当前组件的触发器或tooltip
  if (triggerRef.value && !triggerRef.value.contains(event.target) && 
      !event.target.closest('.tooltip-text')) {
    show.value = false
    hideTooltip(tooltipId.value)
  }
}

// 监听窗口大小变化和滚动事件
const handleResize = () => {
  if (show.value) {
    recalculatePosition.value++
  }
}

const handleScroll = () => {
  if (show.value) {
    recalculatePosition.value++
  }
}

// 监听show状态变化
watch(show, (newVal) => {
  if (newVal) {
    nextTick(() => {
      recalculatePosition.value++
    })
  }
})

onMounted(() => {
  // 注册弹窗实例
  registerTooltip(tooltipId.value, tooltipInstance)
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // 注销弹窗实例
  unregisterTooltip(tooltipId.value)
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.rank-votes {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 16px;
  color: #ff6600;
  font-weight: bold;
  margin-top: 6px;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.rank-votes span {
  font-weight: bold;
}

.tooltip-container {
  position: relative;
  display: inline-block;
  z-index: 10000;
}

.info-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.info-icon:hover {
  opacity: 1;
}

.tooltip-text {
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  min-width: 140px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
  position: relative;
}

/* 默认箭头样式 - 指向上方 */
.tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}


/* 当tooltip在左侧时，箭头指向左侧 */
.tooltip-text[data-position="left"]::after {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border-top-color: transparent;
  border-left-color: rgba(0, 0, 0, 0.9);
}


.tooltip-text div {
  margin: 0;
  margin-bottom: 4px;
  text-align: center;
}

.tooltip-text div:last-child {
  margin-bottom: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .tooltip-text {
    font-size: 10px;
    padding: 6px 8px;
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .tooltip-text {
    font-size: 9px;
    padding: 5px 7px;
    min-width: 100px;
  }
}
</style>
