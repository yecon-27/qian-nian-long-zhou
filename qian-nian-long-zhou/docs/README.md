# 龙舟投票系统文档

## 📁 文档结构

```
docs/
├── README.md                    # 文档导航（本文件）
├── setup/                       # 项目设置相关
│   ├── development.md           # 开发环境配置
│   ├── deployment.md            # 部署指南
│   ├── vercel-deployment-guide.md # Vercel部署快速指南
│   ├── vercel-environment-setup.md # Vercel环境变量设置
│   └── VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md # Vercel完整部署指南
├── backend/                     # 后端相关文档
│   ├── ruoyi-integration.md     # RuoYi集成指南
│   ├── ruoyi-backend-tasks.md   # RuoYi后端配置任务
│   ├── ruoyi-code-generation-config.md # RuoYi代码生成配置
│   ├── database-setup.md        # 数据库设置
│   ├── database-design.md       # 数据库设计
│   ├── api-development.md       # API开发指南
│   ├── api-specification.md     # API接口规范
│   ├── code-generator.md        # 代码生成器指南
│   └── full-stack-implementation.md # 全栈实现指南
├── frontend/                    # 前端相关文档
│   ├── store-evolution.md       # 状态管理演进
│   ├── component-guide.md       # 组件开发指南
│   ├── file-relationships.md    # 文件关系说明
│   ├── auth-store-guide.md      # 认证状态管理指南
│   └── unit-testing-guide.md    # 单元测试指南
├── business/                    # 业务相关文档
│   ├── voting-system.md         # 投票系统说明
│   ├── user-flow.md            # 用户流程
│   └── table-structure.md       # 业务表结构
├── development/                 # 开发相关
│   └── mock-guide.md           # Mock开发指南
├── debug/                       # 调试和故障排除
│   ├── README.md               # 调试文档导航
│   ├── api-response-format-debugging.md  # API响应格式调试
│   ├── troubleshooting.md      # 通用问题排查
│   ├── deployment-checklist.md # 部署检查清单
│   ├── deployment-lessons-learned.md # 部署经验教训
│   ├── deployment-solution.md  # 部署解决方案
│   ├── deployment-troubleshooting-quick-reference.md # 部署故障快速参考
│   └── username-display-fix-guide.md # 用户名显示修复指南
└── solutions/                   # 解决方案
├── wechat-miniprogram.md   # 微信小程序方案
├── image-replacement-summary.md # 图片替换总结
├── image-resources-guide.md # 图片资源指南
└── team-image-display-fix.md # 队伍图片显示修复
```


## 🚀 快速开始

1. [开发环境配置](./setup/development.md) - 开发环境设置
2. [RuoYi 集成](./backend/ruoyi-integration.md) - 后端集成说明
3. [Vercel部署快速指南](./setup/vercel-deployment-guide.md) - 快速部署到Vercel

## 📖 主要文档

### 项目设置

- [开发环境配置](./setup/development.md)
- [部署指南](./setup/deployment.md)
- [Vercel部署快速指南](./setup/vercel-deployment-guide.md)
- [Vercel环境变量设置](./setup/vercel-environment-setup.md)
- [Vercel完整部署指南](./setup/VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md)

### 后端开发

- [RuoYi 集成指南](./backend/ruoyi-integration.md)
- [RuoYi 后端配置任务](./backend/ruoyi-backend-tasks.md)
- [RuoYi 代码生成配置](./backend/ruoyi-code-generation-config.md)
- [数据库设置](./backend/database-setup.md)
- [数据库设计](./backend/database-design.md)
- [API 开发指南](./backend/api-development.md)
- [API 接口规范](./backend/api-specification.md)
- [代码生成器指南](./backend/code-generator.md)
- [全栈实现指南](./backend/full-stack-implementation.md)

### 前端开发

- [状态管理演进](./frontend/store-evolution.md)
- [组件开发指南](./frontend/component-guide.md)
- [文件关系说明](./frontend/file-relationships.md)
- [认证状态管理指南](./frontend/auth-store-guide.md)
- [单元测试指南](./frontend/unit-testing-guide.md)

### 业务文档

- [投票系统说明](./business/voting-system.md)
- [用户流程](./business/user-flow.md)
- [业务表结构](./business/table-structure.md)

### 开发指南

- [Mock 开发指南](./development/mock-guide.md)

### 调试和故障排除

- [调试文档导航](./debug/README.md) - 完整的调试文档索引
- [API响应格式调试](./debug/api-response-format-debugging.md) - API调试实战教程
- [通用问题排查](./debug/troubleshooting.md) - 常见功能问题解决方案
- [部署解决方案](./debug/deployment-solution.md) - 具体部署问题解决方案
- [部署检查清单](./debug/deployment-checklist.md) - 部署前后检查项目
- [部署经验教训](./debug/deployment-lessons-learned.md) - 部署问题深度分析
- [部署故障快速参考](./debug/deployment-troubleshooting-quick-reference.md) - 紧急修复指南
- [用户名显示修复指南](./debug/username-display-fix-guide.md) - 用户名显示问题解决

### 解决方案

- [微信小程序方案](./solutions/wechat-miniprogram.md)
- [图片替换总结](./solutions/image-replacement-summary.md)
- [图片资源指南](./solutions/image-resources-guide.md)
- [队伍图片显示修复](./solutions/team-image-display-fix.md)

## 🔧 开发工具

- [代码生成器指南](./backend/code-generator.md)
- [RuoYi 代码生成配置](./backend/ruoyi-code-generation-config.md)
- [全栈实现指南](./backend/full-stack-implementation.md)

## 🆕 新增文档

以下是最近新增的文档：

### 后端相关
- [API 接口规范](./backend/api-specification.md) - 详细的API接口文档
- [RuoYi 代码生成配置](./backend/ruoyi-code-generation-config.md) - 代码生成器配置指南
- [全栈实现指南](./backend/full-stack-implementation.md) - 完整的全栈开发流程

### 前端相关
- [认证状态管理指南](./frontend/auth-store-guide.md) - 用户认证状态管理
- [单元测试指南](./frontend/unit-testing-guide.md) - 前端单元测试实践

### 部署相关
- [Vercel环境变量设置](./setup/vercel-environment-setup.md) - 详细的环境变量配置
- [Vercel完整部署指南](./setup/VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md) - 完整的部署流程

### 问题解决
- [用户名显示修复指南](./debug/username-display-fix-guide.md) - 用户名显示问题的解决方案
- [图片替换总结](./solutions/image-replacement-summary.md) - 图片资源替换的完整方案
- [图片资源指南](./solutions/image-resources-guide.md) - 图片资源管理指南
- [队伍图片显示修复](./solutions/team-image-display-fix.md) - 队伍图片显示问题修复

---

_最后更新: 2025年8月1日_