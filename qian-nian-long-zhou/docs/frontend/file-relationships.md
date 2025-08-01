# 项目文件关联关系详解

## 🏗️ 整体架构图

```
前端应用 (Vue 3)
├── 用户界面 (Views)
│   ├── HomePage.vue (首页)
│   ├── VotePage.vue (投票页)
│   └── RankPage.vue (排行榜)
│
├── 数据管理 (Stores)
│   ├── teams.ts (原始简单版本)
│   └── teamsWithRuoyi.ts (若依集成版本)
│
├── API接口 (API Layer)
│   ├── team.ts (真实API定义)
│   └── mockData.ts (Mock数据)
│
└── 后端连接
    ├── Mock模式 → mockData.ts
    └── 真实模式 → 若依后端
```

## 📂 文件详细关联

### 1. Store文件夹的演进历史

#### 🔄 您原来的 `teams.ts` (简单版本)
```typescript
// src/stores/teams.ts - 最初的简单版本
export const useTeamsStore = defineStore('teams', () => {
  const teams = ref([...]) // 硬编码的队伍数据
  
  const voteForTeam = (teamId) => {
    // 简单的本地投票逻辑
  }
  
  return { teams, voteForTeam }
})
```

**特点：**
- ✅ 简单易懂
- ✅ 数据写死在代码里
- ❌ 无法连接后端
- ❌ 数据不持久化

#### 🆕 现在的 `teamsWithRuoyi.ts` (增强版本)
```typescript
// src/stores/teamsWithRuoyi.ts - 若依集成版本
export const useTeamsStore = defineStore('teams', () => {
  const teams = ref<TeamCard[]>([])
  
  const fetchTeams = async () => {
    if (USE_MOCK) {
      // 使用Mock数据
      response = await mockApi.getTeams()
    } else {
      // 使用真实API
      response = await teamApi.getTeamList()
    }
    teams.value = response.data
  }
  
  return { teams, fetchTeams, voteForTeam }
})
```

**特点：**
- ✅ 支持Mock和真实API切换
- ✅ 可以连接若依后端
- ✅ 数据可持久化
- ✅ 错误处理完善

### 2. Mock数据系统

#### 📊 `mockData.ts` - 模拟数据源
```typescript
// 模拟真实的API响应格式
export const mockTeams = [
  {
    id: 1,
    teamName: '瑞安龙腾队',
    voteCount: 1256,
    // ... 完整的队伍信息
  }
]

export const mockApi = {
  getTeams: () => Promise.resolve({code: 200, data: mockTeams}),
  vote: (teamId, openid) => Promise.resolve({code: 200, msg: '投票成功'})
}
```

### 3. 后端连接方式对比

#### Mock模式流程：
```
用户操作 → Store → mockData.ts → 返回假数据 → 更新界面
```

#### 真实API模式流程：
```
用户操作 → Store → team.ts API → 若依后端 → MySQL数据库 → 返回真实数据 → 更新界面
```

## 🔄 切换机制详解

### 环境变量控制
```bash
# .env.development
VITE_USE_MOCK=true   # Mock模式
VITE_USE_MOCK=false  # 真实API模式
```

### Store中的判断逻辑
```typescript
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const fetchTeams = async () => {
  if (USE_MOCK) {
    console.log('🔧 使用Mock数据')
    response = await mockApi.getTeams()
  } else {
    console.log('🌐 使用真实API')
    response = await teamApi.getTeamList()
  }
}
```

## 🎯 对您学习的意义

### 当前阶段 (Mock模式)
1. **专注前端开发** - 不被后端复杂性干扰
2. **快速验证功能** - 立即看到效果
3. **学习Vue核心概念** - 组件、状态管理、路由

### 未来阶段 (真实API模式)
1. **一键切换** - 修改配置即可
2. **无需改代码** - Store逻辑已经写好
3. **数据持久化** - 连接真实数据库

## 💡 这种设计的优势

1. **渐进式学习** - 从简单到复杂
2. **代码复用** - 界面组件完全一样
3. **灵活切换** - 开发/测试/生产不同模式
4. **降低风险** - 前端不依赖后端进度

这就是现代前端开发的最佳实践！🚀
