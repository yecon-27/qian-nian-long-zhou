# 组件开发指南

## 组件结构

```
src/components/
├── DetailHeader.vue      # 详情页头部
├── DetailInfo.vue        # 详情信息展示
├── RankHeader.vue        # 排行榜头部
├── SubmissionBar.vue     # 提交栏
├── TeamVoteCard.vue      # 队伍投票卡片
├── TopThreeRanks.vue     # 前三名展示
├── VoteHeader.vue        # 投票页头部
└── ...
```

## 组件开发规范

### 1. 文件命名
- 使用 PascalCase 命名
- 文件名应该描述组件功能

### 2. 组件结构
```vue
<template>
  <!-- 模板内容 -->
</template>

<script>
// 使用 Composition API
import { ref, computed } from 'vue'

export default {
  name: 'ComponentName',
  props: {
    // 定义 props
  },
  emits: ['event-name'],
  setup(props, { emit }) {
    // 组件逻辑
    return {
      // 返回响应式数据和方法
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

### 3. Props 定义
```javascript
props: {
  card: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
}
```

### 4. 事件发射
```javascript
// 发射事件
emit('toggle-vote', cardId)

// 在父组件中监听
<TeamVoteCard @toggle-vote="handleVote" />
```

## 样式规范

### 1. 使用 scoped 样式
```vue
<style scoped>
.component-class {
  /* 样式规则 */
}
</style>
```

### 2. 响应式设计
```css
/* 移动端适配 */
@media (max-width: 480px) {
  .component-class {
    /* 移动端样式 */
  }
}
```

### 3. CSS 变量
```css
:root {
  --primary-color: #ff6b35;
  --secondary-color: #2196F3;
}
```

## 状态管理

### 使用 Pinia Store
```javascript
import { useTeamsStore } from '@/stores/teams'

export default {
  setup() {
    const teamsStore = useTeamsStore()
    
    return {
      teamsStore
    }
  }
}
```

## 最佳实践

1. **组件职责单一** - 每个组件只负责一个功能
2. **Props 向下，事件向上** - 数据流向清晰
3. **使用计算属性** - 避免在模板中写复杂逻辑
4. **合理使用 ref 和 reactive** - 根据数据类型选择
5. **组件复用** - 提取公共组件逻辑