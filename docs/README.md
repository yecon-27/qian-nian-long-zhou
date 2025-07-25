# 龙舟投票系统文档

## 📁 文档结构

```
docs/
├── README.md                    # 文档导航（本文件）
├── setup/                       # 项目设置相关
│   ├── installation.md          # 安装指南
│   ├── development.md           # 开发环境配置
│   └── deployment.md            # 部署指南
├── backend/                     # 后端相关文档
│   ├── ruoyi-integration.md     # RuoYi集成指南
│   ├── database-setup.md        # 数据库设置
│   ├── database-design.md       # 数据库设计
│   ├── api-development.md       # API开发指南
│   ├── sql-execution.md         # SQL执行指南
│   └── code-generator.md        # 代码生成器指南
├── frontend/                    # 前端相关文档
│   ├── store-evolution.md       # 状态管理演进
│   ├── component-guide.md       # 组件开发指南
│   └── file-relationships.md    # 文件关系说明
├── business/                    # 业务相关文档
│   ├── voting-system.md         # 投票系统说明
│   ├── user-flow.md            # 用户流程
│   └── table-structure.md       # 业务表结构
├── development/                 # 开发相关
│   ├── mock-guide.md           # Mock开发指南
│   ├── debugging.md            # 调试指南
│   └── troubleshooting.md      # 问题排查
└── solutions/                   # 解决方案
    ├── wechat-miniprogram.md   # 微信小程序方案
    └── master-detail-table.md  # 主从表解决方案
```

## 🚀 快速开始

1. [安装指南](./setup/installation.md) - 如何安装和配置项目
2. [开发环境配置](./setup/development.md) - 开发环境设置
3. [RuoYi 集成](./backend/ruoyi-integration.md) - 后端集成说明

## 📖 主要文档

### 项目设置

- [安装指南](./setup/installation.md)
- [开发环境配置](./setup/development.md)
- [部署指南](./setup/deployment.md)

### 后端开发

- [RuoYi 集成指南](./backend/ruoyi-integration.md)
- [数据库设置](./backend/database-setup.md)
- [数据库设计](./backend/database-design.md)
- [API 开发指南](./backend/api-development.md)
- [SQL 执行指南](./backend/sql-execution.md)
- [代码生成器指南](./backend/code-generator.md)

### 前端开发

- [状态管理演进](./frontend/store-evolution.md)
- [组件开发指南](./frontend/component-guide.md)
- [文件关系说明](./frontend/file-relationships.md)

### 业务文档

- [投票系统说明](./business/voting-system.md)
- [用户流程](./business/user-flow.md)
- [业务表结构](./business/table-structure.md)

### 开发指南

- [Mock 开发指南](./development/mock-guide.md)
- [调试指南](./development/debugging.md)
- [问题排查](./development/troubleshooting.md)

### 解决方案

- [微信小程序方案](./solutions/wechat-miniprogram.md)
- [主从表解决方案](./solutions/master-detail-table.md)

## 🔧 开发工具

- [代码生成器指南](./backend/code-generator.md)
- [数据库验证脚本](../verify-new-tables.sql)
- [数据库检查脚本](./development/database-check.md)

---

_最后更新: $(date)_
