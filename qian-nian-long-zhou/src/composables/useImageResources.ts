import { ref, reactive, readonly } from "vue";
import {
  getImageResourceByKey,
  getImageResourcesByCategory,
  type ImageResource,
} from "@/api/imageResources";

// 图片资源缓存
const imageResourceCache = reactive<Record<string, string>>({});
const categoryCache = reactive<Record<string, ImageResource[]>>({});

/**
 * 图片资源管理 Composable
 */
export function useImageResources() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * 根据资源键值获取图片URL
   * @param resourceKey 资源键值
   * @param fallbackUrl 备用图片URL
   * @returns 图片URL
   */
  const getImageUrl = async (
    resourceKey: string,
    fallbackUrl?: string
  ): Promise<string> => {
    // 检查缓存
    if (imageResourceCache[resourceKey]) {
      return imageResourceCache[resourceKey];
    }

    try {
      loading.value = true;
      error.value = null;
      
      const response = await getImageResourceByKey(resourceKey) as any;
      
      if (response.code === 200 && response.data) {
        const imageUrl = response.data.fileUrl;
        
        // 缓存结果
        imageResourceCache[resourceKey] = imageUrl;
        
        return imageUrl;
      } else {
        throw new Error(`图片资源不存在: ${resourceKey}`);
      }
    } catch (err: any) {
      error.value = err.message || "获取图片资源失败";
      
      const defaultUrl = fallbackUrl || "/src/assets/default-image.jpg";
      
      return defaultUrl;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 根据分类获取图片资源列表
   * @param category 分类名称
   * @returns 图片资源列表
   */
  const getImagesByCategory = async (
    category: string
  ): Promise<ImageResource[]> => {
    // 如果缓存中存在，直接返回
    if (categoryCache[category]) {
      return categoryCache[category];
    }

    try {
      loading.value = true;
      error.value = null;

      const response = await getImageResourcesByCategory(category) as any;
      if (response.code === 200 && response.rows) {
        const images = response.rows;
        // 缓存结果
        categoryCache[category] = images;
        return images;
      } else {
        throw new Error(`获取分类图片失败: ${category}`);
      }
    } catch (err: any) {
      error.value = err.message || "获取分类图片失败";
      console.warn(`获取分类图片失败 [${category}]:`, err.message);
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * 预加载图片资源
   * @param resourceKeys 资源键值数组
   */
  const preloadImages = async (resourceKeys: string[]) => {
    const promises = resourceKeys.map((key) => getImageUrl(key));
    await Promise.allSettled(promises);
  };

  /**
   * 清除缓存
   */
  const clearCache = () => {
    Object.keys(imageResourceCache).forEach((key) => {
      delete imageResourceCache[key];
    });
    Object.keys(categoryCache).forEach((key) => {
      delete categoryCache[key];
    });
  };

  /**
   * 获取缓存的图片URL（同步方法）
   * @param resourceKey 资源键值
   * @param fallbackUrl 备用图片URL
   * @returns 图片URL或null
   */
  const getCachedImageUrl = (
    resourceKey: string,
    fallbackUrl?: string
  ): string | null => {
    return imageResourceCache[resourceKey] || null;
  };

  return {
    loading,
    error,
    getImageUrl,
    getImagesByCategory,
    preloadImages,
    clearCache,
    getCachedImageUrl,
    imageResourceCache: readonly(imageResourceCache),
    categoryCache: readonly(categoryCache),
  };
}

// 全局实例，用于跨组件共享缓存
export const globalImageResources = useImageResources();
