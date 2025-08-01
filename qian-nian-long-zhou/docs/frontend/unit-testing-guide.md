# 前端单元测试指南

本文档提供了在本项目中设置和编写前端单元测试的指南，主要使用 Vitest 作为测试框架。

## 1. 为什么需要单元测试？

- **保证代码质量**: 确保核心逻辑（如认证、状态管理）按预期工作。
- **安全重构**: 在修改或重构代码时，测试可以立即反馈是否引入了新的错误。
- **防止回归**: 避免修复一个 bug 时破坏了现有功能。
- **作为文档**: 测试用例是展示组件或函数如何使用的最佳“活文档”。

## 2. 技术选型

- **测试框架**: [Vitest](https://vitest.dev/) - 一个由 Vite 驱动的高性能测试框架。
- **测试工具**: [@vue/test-utils](https://test-utils.vuejs.org/) - Vue 官方的单元测试工具库。
- **DOM 环境**: [happy-dom](https://github.com/capricorn86/happy-dom) - 一个轻量级的 Node.js 环境中的浏览器实现。

## 3. 设置步骤

### a. 安装依赖

```bash
npm install -D vitest @vue/test-utils happy-dom
```

### b. 配置 `vite.config.ts`

为了让 Vitest 能够识别我们的测试文件并提供正确的环境，需要更新 `vite.config.ts`：

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
// ... 其他导入

export default defineConfig({
  // ... 其他配置
  test: {
    globals: true, // 无需导入 describe, it 等
    environment: 'happy-dom', // 模拟 DOM 环境
  },
})
```

## 4. 编写测试

测试文件通常与被测试的文件放在一起，并以 `.test.ts` 或 `.spec.ts` 结尾。例如，`src/stores/auth.ts` 的测试文件是 `src/stores/auth.test.ts`。

### 核心概念

- **`describe`**: 用于将相关的测试分组。
- **`it`** 或 **`test`**: 定义一个单独的测试用例。
- **`expect`**: 用于断言，检查一个值是否满足特定条件。
- **`vi.mock`**: 用于模拟模块，使我们能够将依赖项（如 API 调用）替换为受控的模拟实现。
- **`beforeEach`**: 一个钩子函数，在每个测试用例运行之前执行，常用于重置状态。

### 示例：测试 Pinia Store (`auth.ts`)

```typescript
// 导入所需工具
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { authApi } from '@/api/team'

// 模拟整个 api 模块
vi.mock('@/api/team', () => ({
  authApi: {
    login: vi.fn(), // 模拟 login 函数
    // ... 其他模拟函数
  },
}))

describe('Auth Store', () => {
  beforeEach(() => {
    // 为每个测试创建独立的 Pinia 实例
    setActivePinia(createPinia())
    // 清除所有模拟
    vi.clearAllMocks()
  })

  it('应成功登录', async () => {
    const auth = useAuthStore()
    // 模拟 API 成功返回
    vi.mocked(authApi.login).mockResolvedValue({ token: 'fake-token' })
    vi.mocked(authApi.getUserInfo).mockResolvedValue({ user: { /* ... */ } })

    // 执行 action
    await auth.login('user', 'pass')

    // 断言
    expect(auth.token).toBe('fake-token')
    expect(auth.isAuthenticated).toBe(true)
  })
})
```

## 5. 运行测试

在终端中运行以下命令：

```bash
# 运行所有测试一次
npx vitest

# 进入监视模式，文件更改时自动重跑测试
npx vitest --watch
```

通过以上步骤，您就可以为项目中的任何模块编写健壮的单元测试了。

## 6. 测试工具的选择

在不同的场景下，我们需要选择合适的测试工具。以下是一些常见场景的选择指南：

### 6.1 使用 Vitest/Jest 等 JavaScript 测试框架的场景

- **前端组件测试**：
  - Vue/React 等框架的组件测试
  - 状态管理（Vuex/Pinia/Redux）的测试
  - 前端路由逻辑的测试
  - UI 交互行为的测试

- **前端工具函数测试**：
  - 数据处理函数
  - 工具类库
  - API 请求封装
  - 格式化函数

- **适用特点**：
  - 与前端开发工具链完美集成
  - 支持 ES6+ 语法
  - 提供模拟浏览器环境
  - 支持组件快照测试
  - 支持异步测试
  - 热重载提高开发效率

### 6.2 使用 Python 等后端语言作为测试工具的场景

- **接口集成测试**：
  - API 端到端测试
  - 性能测试和压力测试
  - 数据库交互测试
  - 复杂业务流程测试

- **自动化测试**：
  - 爬虫测试
  - 批量数据处理
  - 跨平台自动化测试
  - 系统集成测试

- **适用特点**：
  - 强大的数据处理能力
  - 丰富的测试框架（pytest、unittest）
  - 完善的HTTP客户端库
  - 优秀的数据分析工具
  - 跨平台兼容性好

### 6.3 其他测试工具的使用场景

- **Cypress/Selenium（E2E测试）**：
  - 用户界面端到端测试
  - 跨浏览器兼容性测试
  - 用户操作流程测试

- **JMeter/K6（性能测试）**：
  - 负载测试
  - 性能基准测试
  - 并发测试

- **Postman（API测试）**：
  - API 快速测试
  - API 文档测试
  - 简单的集成测试

### 6.4 选择建议

1. **项目特点考虑**：
   - 前端项目优先选择 Vitest/Jest
   - 全栈项目可以组合使用多种工具
   - 微服务架构考虑专门的集成测试工具

2. **团队因素考虑**：
   - 团队技术栈
   - 维护成本
   - 学习曲线

3. **效率因素考虑**：
   - 开发效率
   - 执行效率
   - 调试便利性

4. **集成因素考虑**：
   - CI/CD 集成
   - 报告生成
   - 监控集成

通过合理选择和组合使用这些测试工具，我们可以构建一个全面且高效的测试体系。在本项目中，我们主要使用 Vitest 进行前端单元测试，这是因为它与我们的 Vue + Vite 技术栈最为匹配，并且能提供最好的开发体验。