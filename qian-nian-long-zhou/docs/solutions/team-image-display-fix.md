# 队伍图片显示问题解决方案

## 问题描述

在为龙舟队伍插入JPG格式图片后，前端网页无法正确显示图片，同时出现用户认证相关的错误。

### 具体症状

1. **图片显示失败**：队伍图片无法在投票页面和详情页面正确显示
2. **Console错误**：`auth.ts:153 登出请求失败: Error: 获取用户信息异常`
3. **图片路径问题**：数据库中的图片路径为 `/profile/upload/2025/07/31/xxx.jpg` 格式，前端无法直接访问

### 错误日志示例

```
TeamVoteCard.vue:49 图片加载失败，使用默认图片: /profile/upload/2025/07/31/download_20250731083206A001.jpg
auth.ts:153 登出请求失败: Error: 获取用户信息异常
```

## 根本原因分析

### 1. 图片路径问题

**问题**：RuoYi框架的文件上传路径为 `/profile/upload/...` 格式，但前端无法直接访问这些路径。

**原因**：
- RuoYi框架将上传的文件存储在后端的 `/profile/upload/` 目录下
- 前端需要通过后端的文件服务来访问这些文件
- 正确的访问路径应该是 `http://localhost:8080/profile/upload/...`

### 2. 认证系统错误

**问题**：图片加载失败时触发了不必要的认证错误。

**原因**：
- 登出逻辑中的错误处理不够完善
- 没有清理所有本地存储数据

## 解决方案

### 1. 修复图片路径转换逻辑

#### 投票页面修复 (`src/stores/teams.ts`)

```typescript
// 修复前
img: team.teamImage || new URL('@/assets/投票/龙舟队伍配图.jpg', import.meta.url).href,

// 修复后
// 处理RuoYi框架的文件上传路径
img: team.teamImage ? 
  (team.teamImage.startsWith('/profile/upload') ? 
    `http://localhost:8080${team.teamImage}` : 
    team.teamImage) : 
  new URL('@/assets/投票/龙舟队伍配图.jpg', import.meta.url).href,
```

#### 详情页面修复 (`src/components/DetailInfo.vue`)

```typescript
// 修复前
img: teamDetail.teamImage || teamDetail.img || '/src/assets/详情/龙舟队伍配图.jpg',

// 修复后
// 处理RuoYi框架的文件上传路径
img: teamDetail.teamImage ? 
  (teamDetail.teamImage.startsWith('/profile/upload') ? 
    `http://localhost:8080${teamDetail.teamImage}` : 
    teamDetail.teamImage) : 
  (teamDetail.img ? 
    (teamDetail.img.startsWith('/profile/upload') ? 
      `http://localhost:8080${teamDetail.img}` : 
      teamDetail.img) : 
    '/src/assets/详情/龙舟队伍配图.jpg'),
```

### 2. 修复认证系统错误处理

#### 登出逻辑修复 (`src/stores/auth.ts`)

```typescript
// 修复前
const logout = async () => {
  try {
    if (token.value) {
      await authApi.logout()
    }
  } catch (error) {
    console.error('登出请求失败:', error)
  } finally {
    // 清除本地状态
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }
}

// 修复后
const logout = async () => {
  try {
    if (token.value) {
      await authApi.logout()
    }
  } catch (error) {
    console.error('登出请求失败:', error)
    // 即使登出请求失败，也要清除本地状态
  } finally {
    // 清除本地状态
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')  // 新增：清除用户信息
  }
}
```

### 3. 添加图片错误处理

#### 图片加载错误处理 (`src/components/TeamVoteCard.vue`)


<!-- 模板部分 -->
<img 
  :src="card.img" 
  :alt="card.title" 
  class="card-image" 
  @error="handleImageError"
  @load="handleImageLoad"
/>

<!-- 脚本部分 -->
<script>
export default {
  methods: {
    handleImageError(event) {
      // 图片加载失败时使用默认图片
      console.log('图片加载失败，使用默认图片:', this.card.img);
      event.target.src = '/src/assets/投票/龙舟队伍配图.jpg';
    },
    handleImageLoad() {
      // 图片加载成功
      console.log('图片加载成功:', this.card.img);
    }
  }
}
</script>


## 实施步骤

### 步骤1：修复图片路径转换
1. 修改 `src/stores/teams.ts` 中的图片路径处理逻辑
2. 修改 `src/components/DetailInfo.vue` 中的图片路径处理逻辑

### 步骤2：修复认证错误处理
1. 修改 `src/stores/auth.ts` 中的登出逻辑
2. 确保清除所有本地存储数据

### 步骤3：添加图片错误处理
1. 为图片元素添加 `@error` 和 `@load` 事件处理
2. 实现降级处理逻辑

### 步骤4：测试验证
1. 重启前端应用
2. 检查投票页面图片显示
3. 检查详情页面图片显示
4. 验证认证错误是否消失

## 技术原理

### RuoYi框架文件服务

RuoYi框架提供了文件上传和访问服务：
- **上传路径**：文件存储在 `profile/upload/` 目录下
- **访问路径**：通过 `http://域名:端口/profile/upload/文件路径` 访问
- **开发环境**：`http://localhost:8080/profile/upload/...`
- **生产环境**：需要配置正确的域名和端口

### 图片路径转换逻辑

```typescript
const processImagePath = (imagePath: string, fallbackImage: string) => {
  if (!imagePath) return fallbackImage;
  
  // 检查是否是RuoYi上传路径
  if (imagePath.startsWith('/profile/upload')) {
    return `http://localhost:8080${imagePath}`;
  }
  
  // 其他路径直接返回
  return imagePath;
}
```

## 最佳实践

### 1. 统一图片路径处理

建议创建一个统一的图片路径处理工具函数：

```typescript
// src/utils/imageUtils.ts
export const processImageUrl = (imagePath: string, fallbackImage: string = '') => {
  if (!imagePath) return fallbackImage;
  
  // RuoYi框架上传路径处理
  if (imagePath.startsWith('/profile/upload')) {
    const baseUrl = import.meta.env.DEV ? 'http://localhost:8080' : '';
    return `${baseUrl}${imagePath}`;
  }
  
  return imagePath;
}
```

### 2. 环境配置

在不同环境中使用不同的基础URL：

```typescript
const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8080';
  } else if (import.meta.env.PROD) {
    return 'https://your-production-domain.com';
  }
  return '';
}
```

### 3. 图片懒加载

对于包含多张图片的页面，建议实现懒加载：

```vue
<img 
  :src="imageSrc" 
  :alt="imageAlt"
  loading="lazy"
  @error="handleImageError"
/>
```

## 验证结果

修复完成后，应该看到：

1. ✅ 投票页面的队伍图片正常显示
2. ✅ 详情页面的队伍图片正常显示  
3. ✅ Console中不再出现认证相关错误
4. ✅ 图片加载失败时显示默认图片
5. ✅ 用户登出功能正常工作

## 相关文件

- `src/stores/teams.ts` - 队伍数据管理和图片路径处理
- `src/stores/auth.ts` - 用户认证和登出逻辑
- `src/components/TeamVoteCard.vue` - 投票页面队伍卡片组件
- `src/components/DetailInfo.vue` - 详情页面信息组件
- `sql/longzhou_team.sql` - 数据库表结构（包含team_image字段）

## 总结

这个问题的核心是**路径转换**和**错误处理**：

1. **路径问题**：RuoYi框架的上传文件需要通过后端服务访问，不能直接使用相对路径
2. **认证问题**：登出逻辑需要完整清理本地存储，避免状态不一致
3. **用户体验**：添加图片加载错误处理，提供降级方案

通过统一的路径处理逻辑和完善的错误处理机制，确保了图片功能的稳定性和用户体验的一致性。