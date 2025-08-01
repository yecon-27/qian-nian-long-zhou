# 动态图片资源管理系统使用指南

## 概述

本系统将静态的 `@/assets` 图片路径替换为动态的图片资源管理系统，支持通过数据库管理图片资源，实现图片的动态加载、缓存和备用方案。

## 系统架构

### 后端组件
- **LongzhouImageResources**: 图片资源实体类
- **LongzhouImageResourcesMapper**: 数据访问层
- **LongzhouImageResourcesService**: 业务逻辑层
- **LongzhouImageResourcesController**: 控制器层，提供REST API

### 前端组件
- **DynamicImage.vue**: 动态图片组件
- **useImageResources.ts**: 图片资源管理Composable
- **imageResources.ts**: API接口定义
- **imagePreloader.ts**: 图片预加载工具

## 使用方法

### 1. 替换静态图片

**原来的写法：**
```vue
<img src="@/assets/首页/背景.jpg" alt="背景" />
```

**新的写法：**
```vue
<DynamicImage 
  resource-key="homepage_background" 
  fallback-url="/src/assets/首页/背景.jpg"
  alt="背景" 
  preload
/>
```

### 2. 组件导入

在需要使用动态图片的组件中导入：
```vue
<script setup lang="ts">
import DynamicImage from '@/components/DynamicImage.vue'
</script>
```

### 3. DynamicImage 组件属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| resource-key | string | 是 | 图片资源键值，用于从数据库查询 |
| fallback-url | string | 否 | 备用图片URL，当资源加载失败时使用 |
| alt | string | 否 | 图片alt属性 |
| class | string/object/array | 否 | CSS类名 |
| style | string/object | 否 | 内联样式 |
| preload | boolean | 否 | 是否预加载该图片 |

### 4. 事件监听

```vue
<DynamicImage 
  resource-key="homepage_background"
  @load="handleImageLoad"
  @error="handleImageError"
  @url-changed="handleUrlChanged"
/>
```

## 图片资源配置

### 1. 数据库初始化

运行 `init-image-resources.sql` 脚本初始化图片资源数据：

```sql
-- 执行初始化脚本
source init-image-resources.sql;
```

### 2. 资源键值规范

- **首页图片**: `homepage_*`
- **投票页图片**: `vote_*`
- **通用图片**: `common_*`
- **默认图片**: `default_*`

### 3. 分类说明

- `homepage`: 首页相关图片
- `vote`: 投票页面相关图片
- `common`: 通用图片（多页面使用）
- `default`: 默认占位图片

## API接口

### 1. 根据资源键值获取图片

```
GET /longzhou/imageResources/key/{resourceKey}
```

### 2. 根据分类获取图片列表

```
GET /longzhou/imageResources/category/{category}
```

### 3. 获取所有图片资源

```
GET /longzhou/imageResources/list
```

## 缓存机制

系统实现了多层缓存：

1. **内存缓存**: 已加载的图片URL缓存在内存中
2. **分类缓存**: 按分类缓存图片资源列表
3. **浏览器缓存**: 利用浏览器原生图片缓存

### 缓存管理

```typescript
import { globalImageResources } from '@/composables/useImageResources'

// 清除所有缓存
globalImageResources.clearCache()

// 获取缓存的图片URL
const cachedUrl = globalImageResources.getCachedImageUrl('homepage_background')
```

## 预加载机制

### 1. 关键图片预加载

系统启动时自动预加载关键图片：
- 首页背景、主标题、主视觉
- 投票页横幅
- 通用按钮图片

### 2. 手动预加载

```typescript
import { imagePreloader } from '@/utils/imagePreloader'

// 预加载指定分类的图片
await imagePreloader.preloadImagesByCategory('homepage')

// 检查是否已预加载
const isLoaded = imagePreloader.isPreloaded('homepage_background')
```

## 错误处理

### 1. 图片加载失败

当图片资源加载失败时，系统会：
1. 尝试使用fallback-url指定的备用图片
2. 如果没有备用图片，使用默认占位图片
3. 在控制台输出警告信息

### 2. API请求失败

当API请求失败时：
1. 返回备用图片URL
2. 缓存备用图片URL避免重复请求
3. 记录错误日志

## 性能优化

### 1. 懒加载

非关键图片采用懒加载策略，只有在需要时才从API获取。

### 2. 批量预加载

支持批量预加载多个图片资源，减少网络请求次数。

### 3. 缓存策略

- 成功加载的图片URL永久缓存
- 失败的请求缓存备用URL，避免重复失败请求

## 管理后台

通过若依管理后台可以：
1. 添加新的图片资源
2. 修改现有图片的URL
3. 管理图片分类和状态
4. 上传和替换图片文件

访问路径：`/longzhou/imageResources`

## 迁移指南

### 1. 识别静态图片

搜索项目中的静态图片引用：
```bash
grep -r "@/assets" src/
grep -r "src=\"/.*\.(jpg|png|gif|svg)" src/
```

### 2. 创建资源记录

为每个静态图片在数据库中创建对应的资源记录。

### 3. 替换组件

将 `<img>` 标签替换为 `<DynamicImage>` 组件。

### 4. 测试验证

确保所有图片都能正常加载，并且备用方案生效。

## 故障排除

### 1. 图片不显示

检查：
- 数据库中是否存在对应的资源记录
- resource-key是否正确
- 图片URL是否可访问
- 网络连接是否正常

### 2. 加载缓慢

优化方案：
- 启用图片预加载
- 检查图片文件大小
- 使用CDN加速
- 优化图片格式

### 3. 缓存问题

解决方法：
- 清除浏览器缓存
- 调用clearCache()方法
- 重启应用程序

## 最佳实践

1. **合理使用预加载**: 只对关键图片启用预加载
2. **设置备用图片**: 为所有动态图片设置fallback-url
3. **统一资源键值**: 使用规范的命名约定
4. **定期清理**: 删除不再使用的图片资源
5. **监控性能**: 关注图片加载时间和失败率