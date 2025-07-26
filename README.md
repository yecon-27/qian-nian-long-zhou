# 千年龙舟创意新生 - 龙舟队伍投票系统

## 项目简介

这是一个基于 SpringBoot + Vue 3 的全栈龙舟队伍投票系统，用户可以为不同的龙舟队伍投票，并查看实时排行榜。项目采用前后端分离架构，后端基于若依（RuoYi）框架构建，提供完整的用户管理、权限控制和数据持久化功能。

## 技术栈

### 前端技术

- **Vue 3** - 使用 Composition API
- **TypeScript** - 类型安全
- **Pinia** - 状态管理
- **Vue Router** - 路由管理
- **Vite** - 构建工具
- **Element Plus / Vant** - UI 组件库

### 后端技术

- **Spring Boot** - 后端框架
- **若依（RuoYi）框架** - 快速开发平台
- **Spring Security** - 安全框架
- **MyBatis Plus** - ORM 框架
- **MySQL** - 数据库
- **Redis** - 缓存

## 🚧 项目进度

- ✅ **前端开发** - Vue 3 前端应用已完成
- ✅ **前端部署** - Vercel 部署配置已完成
- 🔄 **后端开发** - 基于若依框架的 SpringBoot 后端开发中
- 🔄 **后端部署** - 后端 API 接口部署配置进行中
- ⏳ **全栈集成** - 前后端接口联调待完成

## 📚 文档导航

完整的项目文档请查看 [docs/README.md](./docs/README.md)

### 快速链接

- [安装指南](./docs/setup/installation.md) - 项目安装和配置
- [开发环境配置](./docs/setup/development.md) - 开发环境设置
- [投票系统说明](./docs/business/voting-system.md) - 业务功能介绍
- [组件开发指南](./docs/frontend/component-guide.md) - 前端开发规范
- [问题排查](./docs/development/troubleshooting.md) - 常见问题解决

### 部署文档

- [完整部署指南](./docs/VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md) - Vercel 部署完整流程
- [部署检查清单](./docs/DEPLOYMENT_CHECKLIST.md) - 部署前后检查项目
- [故障排除快速参考](./docs/DEPLOYMENT_TROUBLESHOOTING_QUICK_REFERENCE.md) - 常见部署问题解决
- [环境变量配置](./docs/vercel-environment-setup.md) - 详细环境变量设置

## 核心功能

- **投票系统** - 每日限制投票，实时更新票数
- **排行榜** - 基于票数的实时排名展示
- **详情页面** - 队伍信息、统计数据展示
- **搜索功能** - 支持队伍名称和作者搜索
- **响应式设计** - 移动端和桌面端适配

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
# 或使用 PowerShell 脚本
.\start-dev.ps1
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── api/              # API 接口层
├── assets/           # 静态资源
├── components/       # 公共组件
├── composables/      # 组合式函数
├── router/           # 路由配置
├── stores/           # 状态管理 (Pinia)
├── utils/            # 工具函数
└── views/            # 页面组件
```

详细的技术实现和开发指南请参考 [完整文档](./docs/README.md)。

---

**作者**: yecon-27  
**最后更新**: 2025 年 7 月 24 日  
**技术栈**: Vue 3 + TypeScript + Pinia + Vite
