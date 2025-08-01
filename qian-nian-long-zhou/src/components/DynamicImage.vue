<template>
  <img 
    :src="currentImageUrl" 
    :alt="alt"
    :class="imageClass"
    :style="imageStyle"
    @load="handleLoad"
    @error="handleError"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { globalImageResources } from '@/composables/useImageResources'

interface Props {
  resourceKey: string;
  fallbackUrl?: string;
  alt?: string;
  style?: any;
  class?: string;
  preload?: boolean; // 添加 preload 属性
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  preload: false
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
  urlChanged: [url: string]
}>()

const currentImageUrl = ref<string>('')
const isLoading = ref(true)
const hasError = ref(false)

// 计算属性
const imageClass = computed(() => {
  const classes = [props.class]
  if (isLoading.value) classes.push('loading')
  if (hasError.value) classes.push('error')
  return classes.filter(Boolean)
})

const imageStyle = computed(() => {
  return props.style
})

// 加载图片URL
const loadImageUrl = async () => {
  try {
    isLoading.value = true
    hasError.value = false
    
    // 检查缓存
    const cachedUrl = globalImageResources.getCachedImageUrl(props.resourceKey)
    
    if (cachedUrl) {
      if (cachedUrl.startsWith('/image/longzhou/') || cachedUrl.startsWith('http')) {
        currentImageUrl.value = cachedUrl
        isLoading.value = false
        return
      }
    }

    // 从API获取
    const url = await globalImageResources.getImageUrl(props.resourceKey, props.fallbackUrl)
    
    currentImageUrl.value = url
    
    emit('urlChanged', url)
  } catch (error) {
    hasError.value = true
    const fallbackUrl = props.fallbackUrl || '/src/assets/default-image.jpg'
    currentImageUrl.value = fallbackUrl
  } finally {
    isLoading.value = false
  }
}

// 事件处理
const handleLoad = (event: Event) => {
  isLoading.value = false
  hasError.value = false
  emit('load', event)
}

const handleError = (event: Event) => {
  hasError.value = true
  isLoading.value = false
  
  if (props.fallbackUrl && currentImageUrl.value !== props.fallbackUrl) {
    currentImageUrl.value = props.fallbackUrl
  }
  
  emit('error', event)
}

// 监听资源键值变化
watch(() => props.resourceKey, () => {
  if (props.resourceKey) {
    loadImageUrl()
  }
}, { immediate: true })

// 预加载
onMounted(() => {
  if (props.preload && props.resourceKey) {
    globalImageResources.preloadImages([props.resourceKey])
  }
})
</script>

<style scoped>
img.loading {
  opacity: 0.7;
  filter: blur(1px);
}

img.error {
  opacity: 0.5;
  filter: grayscale(100%);
}
</style>