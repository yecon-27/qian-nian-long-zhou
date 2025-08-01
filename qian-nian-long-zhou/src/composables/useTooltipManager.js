import { ref } from 'vue'

// 全局弹窗状态管理
const currentTooltipId = ref(null)
const tooltipInstances = ref(new Map())

export const useTooltipManager = () => {
  const registerTooltip = (id, instance) => {
    tooltipInstances.value.set(id, instance)
  }
  
  const unregisterTooltip = (id) => {
    tooltipInstances.value.delete(id)
  }
  
  const showTooltip = (id) => {
    // 关闭当前显示的弹窗
    if (currentTooltipId.value && currentTooltipId.value !== id) {
      const currentInstance = tooltipInstances.value.get(currentTooltipId.value)
      if (currentInstance) {
        currentInstance.hide()
      }
    }
    
    // 设置新的当前弹窗
    currentTooltipId.value = id
  }
  
  const hideTooltip = (id) => {
    if (currentTooltipId.value === id) {
      currentTooltipId.value = null
    }
  }
  
  return {
    registerTooltip,
    unregisterTooltip,
    showTooltip,
    hideTooltip,
    currentTooltipId
  }
}
