# 🔗 您的Store文件演进历史和关联关系

## 📂 您当前有3个Store文件

### 1. `teams.ts` - 您的原始版本 ⭐ (最初的作品)
```typescript
// 特点：本地存储，简单直接
export interface TeamCard {
  id: number
  title: string        // 注意：这里用的是title
  author: string
  votes: number        // 注意：这里用的是votes
  likes: number
  // ...
}

// 数据存储在localStorage
const STORAGE_KEY = 'dragon-boat-teams-data'
```

### 2. `teamsSimple.ts` - Mock API版本 🧪 (过渡版本)
```typescript
// 特点：使用Mock API，但保持简单
export interface TeamCard {
  // 使用新的字段命名，与若依后端对应
  teamName: string     // 对应后端team_name
  voteCount: number    // 对应后端vote_count
}

// 使用Mock API
import { mockTeamApi } from '@/api/mockApi'
```

### 3. `teamsWithRuoyi.ts` - 若依集成版本 🚀 (最新版本)
```typescript
// 特点：完整的若依后端集成，支持Mock/真实API切换
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const fetchTeams = async () => {
  if (USE_MOCK) {
    response = await mockApi.getTeams()      // Mock数据
  } else {
    response = await teamApi.getTeamList()   // 真实API
  }
}
```

## 🔄 演进关系图

```
teams.ts (原始)
    ↓ (学习Mock概念)
teamsSimple.ts (过渡)
    ↓ (集成若依后端)
teamsWithRuoyi.ts (最终)
```

## 📊 字段映射对比

| 原始版本 | Mock版本 | 若依版本 | 后端字段 |
|---------|---------|---------|---------|
| `title` | `teamName` | `teamName` | `team_name` |
| `votes` | `voteCount` | `voteCount` | `vote_count` |
| `author` | `teamLeader` | `teamLeader` | `team_leader` |
| `likes` | `likeCount` | *(移除)* | *(不需要)* |

## 🎯 当前使用哪个文件？

### 检查您的组件导入
```typescript
// 您的Vue组件目前都在使用原始版本：
// src/views/VotePage.vue: import { useTeamsStore } from '@/stores/teams'
// src/views/RankPage.vue: import { useTeamsStore } from '@/stores/teams' 
// src/views/DetailInfo.vue: import { useTeamsStore } from '@/stores/teams'
```

**这意味着：**
- ✅ 您目前使用的是 `teams.ts` (原始版本)
- ✅ 数据存储在浏览器本地存储中
- ❌ 还没有连接到Mock或真实后端

## 🚀 升级路径建议

### 方案1：渐进式升级（推荐初学者）

#### 步骤1：先体验Mock模式
```bash
# 1. 修改Vue组件的导入
# 将 '@/stores/teams' 改为 '@/stores/teamsWithRuoyi'

# 2. 确保Mock模式开启
# .env.development: VITE_USE_MOCK=true
```

#### 步骤2：测试Mock功能
```javascript
// 在浏览器控制台运行
window.testMockData()
```

#### 步骤3：对比效果
- 原始版本：数据存储在本地，刷新后还在
- Mock版本：数据来自"假"API，但模拟真实后端行为

### 方案2：直接使用原始版本
```bash
# 继续使用您原来的teams.ts
# 优点：简单稳定，数据持久化
# 缺点：无法学习后端集成
```

## 🔄 Mock模式 vs 原始版本对比

| 特性 | 原始版本(teams.ts) | Mock版本(teamsWithRuoyi.ts) |
|------|-------------------|---------------------------|
| **数据存储** | localStorage | 内存(假API) |
| **数据持久化** | ✅ 刷新后保持 | ❌ 刷新后重置 |
| **学习价值** | 📚 本地存储概念 | 📚 API集成概念 |
| **真实性** | 🏠 本地应用模式 | 🌐 真实项目模式 |
| **复杂度** | 😊 简单易懂 | 🤔 稍微复杂 |

## 💡 我的学习建议

### 对于初学者：
1. **先保持现状** - 继续使用 `teams.ts`，完成基础功能
2. **然后体验Mock** - 切换到 `teamsWithRuoyi.ts` 学习API概念
3. **最后接入真实后端** - 设置 `VITE_USE_MOCK=false`

### 立即体验Mock模式：
```bash
# 只需要修改这4个文件的导入语句：
# VotePage.vue, RankPage.vue, DetailInfo.vue
# 将：import { useTeamsStore } from '@/stores/teams'
# 改为：import { useTeamsStore } from '@/stores/teamsWithRuoyi'
```

您想现在就试试切换到Mock模式吗？这样可以学习到真实项目中的API集成概念！🚀
