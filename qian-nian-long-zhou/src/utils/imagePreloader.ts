import { globalImageResources } from '@/composables/useImageResources'

/**
 * 图片预加载器
 */
export class ImagePreloader {
  private static instance: ImagePreloader
  private preloadedKeys = new Set<string>()

  static getInstance(): ImagePreloader {
    if (!ImagePreloader.instance) {
      ImagePreloader.instance = new ImagePreloader()
    }
    return ImagePreloader.instance
  }

  /**
   * 预加载关键图片资源
   */
  async preloadCriticalImages(): Promise<void> {
    const criticalImages = [
      'home_background',
      'home_main_title',
      'home_main_visual',
      'home_vote_button',
      'activity_banner',
      'like_selected',
      'like_unselected',
      'rules_icon',
      'ranking_icon'
    ]

    try {
      await globalImageResources.preloadImages(criticalImages)
      criticalImages.forEach(key => this.preloadedKeys.add(key))
      console.log('关键图片资源预加载完成')
    } catch (error) {
      console.warn('图片预加载失败:', error)
    }
  }

  /**
   * 预加载指定分类的图片
   */
  async preloadImagesByCategory(category: string): Promise<void> {
    try {
      const images = await globalImageResources.getImagesByCategory(category)
      const keys = images.map(img => img.resourceKey)
      await globalImageResources.preloadImages(keys)
      keys.forEach(key => this.preloadedKeys.add(key))
      console.log(`分类 ${category} 的图片预加载完成`)
    } catch (error) {
      console.warn(`分类 ${category} 图片预加载失败:`, error)
    }
  }

  /**
   * 检查图片是否已预加载
   */
  isPreloaded(resourceKey: string): boolean {
    return this.preloadedKeys.has(resourceKey)
  }

  /**
   * 清除预加载记录
   */
  clearPreloadRecord(): void {
    this.preloadedKeys.clear()
  }
}

// 导出单例实例
export const imagePreloader = ImagePreloader.getInstance()