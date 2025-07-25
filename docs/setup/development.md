# 开发环境配置

## 环境要求

- Node.js 16+
- npm 或 yarn
- Git

## 快速开始

1. **克隆项目**
   ```bash
   git clone [项目地址]
   cd qian-nian-long-zhou
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   ```bash
   # 复制环境配置文件
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或使用 PowerShell 脚本
   .\start-dev.ps1
   ```

## 开发脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览构建结果

## 项目结构

```
src/
├── api/           # API 接口
├── assets/        # 静态资源
├── components/    # 公共组件
├── composables/   # 组合式函数
├── router/        # 路由配置
├── stores/        # 状态管理
├── utils/         # 工具函数
└── views/         # 页面组件
```

## 开发规范

- 使用 TypeScript
- 遵循 Vue 3 Composition API
- 使用 Pinia 进行状态管理
- 使用 Vue Router 进行路由管理

## 调试工具

- Vue DevTools
- 浏览器开发者工具
- VS Code 插件推荐：
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin (Volar)