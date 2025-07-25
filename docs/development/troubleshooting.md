# 问题排查指南

## 常见问题

### 1. 投票功能问题

#### 问题：投票后数据不更新
**可能原因：**
- 状态管理问题
- 本地存储失败
- 组件响应式问题

**解决方案：**
```javascript
// 检查 store 状态
const teamsStore = useTeamsStore()
console.log('当前数据:', teamsStore.teamCards)

// 检查本地存储
console.log('本地存储:', localStorage.getItem('dragon-boat-teams-data'))

// 强制刷新数据
teamsStore.resetData()
```

#### 问题：每日投票限制不生效
**可能原因：**
- 日期检查逻辑错误
- 本地存储的日期格式问题

**解决方案：**
```javascript
// 检查日期信息
console.log('日期信息:', teamsStore.getDateInfo())

// 手动重置投票状态
teamsStore.checkNewDay()
```

### 2. 排名显示问题

#### 问题：排名计算错误
**可能原因：**
- 排序逻辑问题
- 数据类型错误

**解决方案：**
```javascript
// 检查排名计算
const teamId = 1
const rank = teamsStore.getTeamRank(teamId)
console.log(`队伍 ${teamId} 的排名:`, rank)

// 检查排序数据
console.log('排序后的数据:', teamsStore.rankedCards)
```

### 3. 页面渲染问题

#### 问题：页面白屏或组件不显示
**可能原因：**
- 数据为 null 或 undefined
- 组件路径错误
- 样式问题

**解决方案：**
```vue
<!-- 添加安全检查 -->
<div v-if="teamData">
  <div class="stat-number">第{{ teamRank || 0 }}名</div>
</div>

<!-- 添加加载状态 -->
<div v-else class="loading">
  <p>加载中...</p>
</div>
```

### 4. 本地存储问题

#### 问题：数据丢失或格式错误
**解决方案：**
```javascript
// 清除本地存储
localStorage.removeItem('dragon-boat-teams-data')
localStorage.removeItem('dragon-boat-last-vote-date')

// 重新加载页面
location.reload()
```

### 5. 路由问题

#### 问题：页面跳转失败
**检查路由配置：**
```javascript
// 检查路由参数
console.log('当前路由:', this.$route)
console.log('路由参数:', this.$route.params)

// 检查路由跳转
this.$router.push({
  name: 'DetailPage',
  params: { id: cardId }
})
```

## 调试工具

### 1. Vue DevTools
- 安装 Vue DevTools 浏览器扩展
- 查看组件状态和 Pinia store
- 监控事件和性能

### 2. 浏览器开发者工具
```javascript
// 在控制台中访问 store
window.__PINIA__ // Pinia 实例
```

### 3. 日志调试
```javascript
// 添加调试日志
console.log('投票前状态:', card.voted, card.votes)
teamsStore.toggleLike(cardId)
console.log('投票后状态:', card.voted, card.votes)
```

## 性能问题

### 1. 页面加载慢
**优化方案：**
- 图片懒加载
- 组件按需加载
- 减少不必要的计算

### 2. 内存泄漏
**检查项：**
- 事件监听器是否正确移除
- 定时器是否清理
- 组件销毁时的清理工作

## 数据检查脚本

项目根目录提供了以下检查脚本：

- `check-backend.js` - 后端连接检查
- `check-backend-simple.js` - 简单后端检查
- `check-database-status.sql` - 数据库状态检查
- `check-table-code-compatibility.sql` - 表结构兼容性检查

## 联系支持

如果问题仍然存在，请：

1. 收集错误信息和复现步骤
2. 检查浏览器控制台错误
3. 提供系统环境信息
4. 联系开发团队