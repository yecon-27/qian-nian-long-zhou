import { globalImageResources } from '@/composables/useImageResources'
import { listImageResources, getImageResourceByKey } from '@/api/imageResources'

/**
 * 图片资源系统测试工具
 */
export class ImageResourcesTester {
  /**
   * 测试API连接
   */
  static async testApiConnection(): Promise<boolean> {
    try {
      console.log('🔍 测试图片资源API连接...')
      // 使用没有权限检查的接口进行测试
      const response = await getImageResourceByKey('home_background')
      
      console.log('API响应:', response)
      
      if (response && (response.code === 200 || response.resourceKey)) {
        console.log('✅ API连接正常，成功获取图片资源')
        return true
      } else {
        console.error('❌ API连接失败:', response)
        return false
      }
    } catch (error) {
      console.error('❌ API连接异常:', error)
      return false
    }
  }

  /**
   * 测试关键图片资源
   */
  static async testCriticalImages(): Promise<void> {
    const criticalImages = [
      'home_background',
      'home_main_title',
      'home_vote_button',
      'activity_banner',
      'like_selected',
      'like_unselected'
    ]

    console.log('🔍 测试关键图片资源...')
    
    for (const resourceKey of criticalImages) {
      try {
        const url = await globalImageResources.getImageUrl(resourceKey)
        console.log(`✅ ${resourceKey}: ${url}`)
      } catch (error) {
        console.error(`❌ ${resourceKey}: 加载失败 -`, error)
      }
    }
  }

  /**
   * 测试图片分类
   */
  static async testImageCategories(): Promise<void> {
    const categories = ['home', 'vote', 'ranking'] // 将 'homepage' 改为 'home'
    
    console.log('🔍 测试图片分类...')
    
    for (const category of categories) {
      try {
        const images = await globalImageResources.getImagesByCategory(category)
        console.log(`✅ ${category}: 找到 ${images.length} 个图片`)
        
        // 显示前3个图片的详细信息
        images.slice(0, 3).forEach(img => {
          console.log(`  - ${img.resourceKey}: ${img.resourceName}`)
        })
      } catch (error) {
        console.error(`❌ ${category}: 获取失败 -`, error)
      }
    }
  }

  /**
   * 测试缓存机制
   */
  static async testCaching(): Promise<void> {
    console.log('🔍 测试缓存机制...')
    
    const testKey = 'home_background'
    
    // 清除缓存
    globalImageResources.clearCache()
    console.log('🧹 缓存已清除')
    
    // 第一次加载（应该从API获取）
    const start1 = Date.now()
    const url1 = await globalImageResources.getImageUrl(testKey)
    const time1 = Date.now() - start1
    console.log(`⏱️ 首次加载耗时: ${time1}ms`)
    
    // 第二次加载（应该从缓存获取）
    const start2 = Date.now()
    const url2 = await globalImageResources.getImageUrl(testKey)
    const time2 = Date.now() - start2
    console.log(`⏱️ 缓存加载耗时: ${time2}ms`)
    
    if (url1 === url2 && time2 < time1) {
      console.log('✅ 缓存机制正常工作')
    } else {
      console.log('⚠️ 缓存机制可能存在问题')
    }
  }

  /**
   * 测试错误处理
   */
  static async testErrorHandling(): Promise<void> {
    console.log('🔍 测试错误处理...')
    
    // 测试不存在的资源键值
    try {
      const url = await globalImageResources.getImageUrl('non_existent_key', '/fallback.jpg')
      console.log(`✅ 错误处理正常，返回备用URL: ${url}`)
    } catch (error) {
      console.error('❌ 错误处理异常:', error)
    }
  }

  /**
   * 简单的API测试
   */
  static async testSimpleApi(): Promise<void> {
    console.log('🔍 测试简单API调用...')
    
    try {
      const response = await getImageResourceByKey('home_background')
      console.log('API响应:', response)
      
      if (response && response.code === 200 && response.data) {
        console.log('✅ API调用成功，资源键值:', response.data.resourceKey)
        console.log('✅ 图片URL:', response.data.fileUrl)
        
        // 测试图片是否可以访问
        const imageUrl = `http://localhost:8080${response.data.fileUrl}`
        console.log('🔍 测试图片访问:', imageUrl)
        
        try {
          const imgResponse = await fetch(imageUrl, { method: 'HEAD' })
          if (imgResponse.ok) {
            console.log('✅ 图片文件可以访问')
          } else {
            console.log('❌ 图片文件无法访问，状态码:', imgResponse.status)
          }
        } catch (imgError) {
          console.log('❌ 图片访问测试失败:', imgError)
        }
      } else {
        console.log('⚠️ API响应格式异常:', response)
      }
    } catch (error) {
      console.error('❌ API调用失败:', error)
    }
  }

  /**
   * 运行完整测试套件
   */
  static async runFullTest(): Promise<void> {
    console.log('🚀 开始图片资源系统完整测试...')
    console.log('=' .repeat(50))
    
    // 测试简单API
    await this.testSimpleApi()
    console.log('')
    
    // 测试API连接
    const apiOk = await this.testApiConnection()
    if (!apiOk) {
      console.log('❌ API连接失败，跳过后续测试')
      return
    }
    
    console.log('')
    
    // 测试关键图片
    await this.testCriticalImages()
    console.log('')
    
    // 测试分类
    await this.testImageCategories()
    console.log('')
    
    // 测试缓存
    await this.testCaching()
    console.log('')
    
    // 测试错误处理
    await this.testErrorHandling()
    
    console.log('=' .repeat(50))
    console.log('✅ 图片资源系统测试完成')
  }
}

// 在开发环境下自动运行测试
if (import.meta.env.DEV) {
  // 延迟执行，确保应用初始化完成
  setTimeout(() => {
    console.log('🔧 开发环境检测到，可以运行以下命令测试图片资源系统:')
    console.log('window.testImageResources = ImageResourcesTester')
    console.log('window.testImageResources.runFullTest()')
    
    // 将测试工具挂载到全局对象
    ;(window as any).testImageResources = ImageResourcesTester
  }, 2000)
}

export default ImageResourcesTester