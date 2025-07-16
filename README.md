# 千年龙舟创意新生 - 龙舟队伍投票系统

## 项目简介
这是一个基于 Vue 3 的龙舟队伍投票系统，用户可以为不同的龙舟队伍投票、点赞，并查看实时排行榜。项目具有完整的前端交互功能，包括数据持久化、每日重置机制等。

## 技术栈
- **Vue 3** - 使用 Composition API
- **TypeScript** - 类型安全
- **Pinia** - 状态管理
- **Vue Router** - 路由管理
- **Vite** - 构建工具
- **Vant** - 移动端UI组件库

## 项目结构
```
qian-nian-long-zhou/
├── src/
│   ├── assets/           # 静态资源文件
│   │   ├── 首页/         # 首页相关图片
│   │   ├── 排行榜/       # 排行榜相关图片
│   │   └── 投票页/       # 投票页相关图片
│   ├── components/       # 公共组件
│   │   ├── ToolTip.vue   # 统一的工具提示组件
│   │   ├── DetailInfo.vue # 详情信息展示组件
│   │   ├── TopThreeRanks.vue # 前三名展示组件
│   │   └── TeamVoteCard.vue # 队伍投票卡片组件
│   ├── stores/           # Pinia 状态管理
│   │   └── teams.ts      # 队伍数据管理
│   ├── views/            # 页面组件
│   │   ├── HomePage.vue  # 首页
│   │   ├── VotePage.vue  # 投票页
│   │   ├── RankPage.vue  # 排行榜页
│   │   ├── DetailPage.vue # 详情页
│   │   └── RulePage.vue  # 规则页
│   └── router/           # 路由配置
       └── index.ts
```

## 核心功能

### 1. 投票系统
- 用户可以为队伍投票（每日限制）
- 点赞功能（无限制）
- 投票数据本地持久化存储

### 2. 排行榜系统
- 实时显示队伍排名
- 前三名特殊展示
- 支持查看点赞数和阅读量

### 3. 每日重置机制
- 每日0点自动重置投票权限
- 保留历史点赞数据
- 日期追踪和状态管理

### 4. 响应式设计
- 移动端优先设计
- 适配不同屏幕尺寸
- 触摸友好的交互体验

## 重点技术实现

### 1. 状态管理 (Pinia)
```typescript
// stores/teams.ts
export const useTeamsStore = defineStore('teams', () => {
  const teams = ref<TeamCard[]>([])
  const hasVotedToday = ref(false)
  const lastVoteDate = ref<string>('')
  
  // 数据持久化
  const saveToStorage = () => {
    localStorage.setItem('teamsData', JSON.stringify(teams.value))
    localStorage.setItem('hasVotedToday', hasVotedToday.value.toString())
    localStorage.setItem('lastVoteDate', lastVoteDate.value)
  }
  
  // 每日重置逻辑
  const checkAndResetDaily = () => {
    const today = new Date().toDateString()
    if (lastVoteDate.value !== today) {
      hasVotedToday.value = false
      lastVoteDate.value = today
      saveToStorage()
    }
  }
})
```

### 2. 双向数据绑定
```typescript
// 使用 computed 实现真正的双向绑定
const teamData = computed(() => {
  return teamsStore.teams.find(team => team.id === parseInt(route.params.id as string))
})

// 监听数据变化自动保存
watch(teams, () => {
  saveToStorage()
}, { deep: true })
```

### 3. 组件通信
```vue
<!-- 父组件传递数据 -->
<TeamVoteCard 
  :team="team" 
  :hasVoted="teamsStore.hasVotedToday"
  @vote="handleVote"
  @like="handleLike"
/>

<!-- 子组件接收和发送事件 -->
<script setup>
const emit = defineEmits(['vote', 'like'])
const props = defineProps<{
  team: TeamCard
  hasVoted: boolean
}>()
</script>
```

## 开发中的重点难点

### 1. 工具提示组件的定位问题
**问题**: 工具提示在屏幕边缘时会溢出视窗
**解决**: 实现智能定位算法，根据触发元素位置自动调整提示框位置

```typescript
const tooltipStyle = computed(() => {
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  
  let left = triggerRect.left + triggerRect.width / 2
  let transform = 'translateX(-50%) translateY(-100%)'
  
  // 检测溢出并调整位置
  if (left + tooltipWidth / 2 > viewportWidth - margin) {
    left = triggerRect.left - margin
    transform = 'translateX(-70%) translateY(-50%)'
  }
  
  return { left: `${left}px`, transform }
})
```

### 2. Z-index 层级管理
**问题**: 多个浮动元素层级冲突
**解决**: 建立统一的 z-index 管理系统

```css
/* Z-index 层级规划 */
.bg-container { z-index: 1; }
.content { z-index: 2; }
.floating-buttons { z-index: 10; }
.tooltip { z-index: 10001; }
```

### 3. 移动端适配
**问题**: 双击放大影响用户体验
**解决**: 通过 meta 标签和 CSS 禁用缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

```css
* {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
```

### 4. 数据持久化
**问题**: 刷新页面数据丢失
**解决**: 使用 localStorage 配合 Pinia 实现数据持久化

```typescript
// 加载数据
const loadFromStorage = () => {
  const stored = localStorage.getItem('teamsData')
  if (stored) {
    const parsedData = JSON.parse(stored)
    // 合并存储数据和默认数据
    teams.value = teams.value.map(team => {
      const storedTeam = parsedData.find(t => t.id === team.id)
      return storedTeam ? { ...team, ...storedTeam } : team
    })
  }
}
```

### 5. 每日重置逻辑
**问题**: 需要每日自动重置投票状态，但保留历史数据
**解决**: 基于日期比较的重置机制

```typescript
const checkAndResetDaily = () => {
  const today = new Date().toDateString()
  if (lastVoteDate.value !== today) {
    hasVotedToday.value = false
    lastVoteDate.value = today
    // 只重置投票状态，不重置点赞数
    saveToStorage()
  }
}
```

## 性能优化

### 1. 图片资源优化
- 使用适当的图片格式和尺寸
- 实现响应式图片加载

### 2. 组件优化
- 合理使用 `computed` 和 `watch`
- 避免不必要的组件重新渲染

### 3. 代码分割
- 按需加载组件
- 路由懒加载

## 部署配置

### Vercel 部署
1. 连接 GitHub 仓库
2. 自动检测 Vue 项目
3. 自动部署和更新

### 构建配置
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```

## 后续改进计划

### 1. 功能增强
- [ ] 添加用户登录系统
- [ ] 实现评论功能
- [ ] 添加分享功能
- [ ] 队伍详情页面优化

### 2. 技术优化
- [ ] 引入 PWA 支持
- [ ] 添加单元测试
- [ ] 性能监控和优化
- [ ] 国际化支持

### 3. 数据管理
- [ ] 后端 API 集成
- [ ] 数据库支持
- [ ] 实时数据同步

## 开发心得

### 学到的重点知识
1. **Vue 3 Composition API** 的使用方法和优势
2. **Pinia** 状态管理的实际应用
3. **TypeScript** 在 Vue 项目中的集成
4. **响应式设计** 的最佳实践
5. **组件设计** 的原则和模式

### 踩过的坑
1. CSS 中 `!important` 的滥用问题
2. 移动端触摸事件的处理
3. 组件间通信的复杂性
4. 浏览器兼容性问题
5. 打包部署时的路径问题

## 运行项目

### 开发环境
```bash
npm install
npm run dev
```

### 生产构建
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 总结
这个项目是一个完整的 Vue 3 前端应用，涵盖了现代前端开发的核心技术和最佳实践。通过这个项目，深入理解了 Vue 3 的响应式系统、组件化开发、状态管理等核心概念，为后续的 Vue 项目开发打下了坚实的基础。

---

**作者**: yecon-27  
**创建时间**: 2025年7月16日  
**技术栈**: Vue 3 + TypeScript + Pinia + Vite
