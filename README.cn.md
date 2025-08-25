# 千年龙舟创意新生 - 龙舟队伍投票系统

**语言切换**: [English](./README.md) | [中文](./README.cn.md)

基于 SpringBoot + Vue 3 的移动端全栈龙舟队伍投票系统，支持实时投票、排行榜展示和完整的管理后台。采用前后端分离架构，基于若依框架构建。

![3bec9fbeec3cd8fbd514d2db3699f8c](https://github.com/user-attachments/assets/c576c689-01f5-4cf4-b7da-ca6ea25a901f)

## 技术栈

**前端**: Vue 3 + TypeScript + Pinia + Vite + Element Plus  
**后端**: Spring Boot + 若依框架 + Spring Security + MyBatis Plus  
**数据库**: MySQL + Redis

## 功能特性

- 每日限制投票系统，实时票数统计
- 基于票数的动态排行榜
- 队伍详情页面，浏览量实时更新
- 支持队伍名称和作者搜索
- 响应式设计，移动端优先
- 完整的管理后台系统
- 匿名用户访问支持


## 界面预览

<img src="https://github.com/user-attachments/assets/1289c5e5-f77f-49b0-84a8-8cd3a9fbe542" width ="200"> <img src="https://github.com/user-attachments/assets/2a0e9c27-a7d2-4f7f-a428-c84bd08fb66b" width ="200"> <img src="https://github.com/user-attachments/assets/c3df6fe7-4d02-4312-9a1b-0bba9b16a97c" width ="200"> <img src="https://github.com/user-attachments/assets/981add77-4450-4afa-843c-96b9149eeb19" width ="200">

## 快速开始

### 编辑文件
1. [行 11: 设置你自己的 SQL 密码](./ruoyi-admin/src/main/resources/application-druid.yml)
2. [行 34: 为 Ruoyi 管理前端设置你的 IPv4 地址](./ruoyi-ui/vue.config.js)
3. [行 3: 为主前端设置你的 IPv4 地址](./rain-of-coupon/.env.development)

### 环境要求

- Java 8+, Node.js 16+, MySQL 5.7+, Redis 6+, Maven 3.6+

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/qian-nian-long-zhou.git
   cd qian-nian-long-zhou
   ```

2. **数据库配置**
   - 导入 `sql/` 和 `backend-sql/` 目录下的SQL文件
   - 配置 `ruoyi-admin/src/main/resources/application-druid.yml`

3. **启动服务**
   ```bash
   # 后端服务
   ./ry.sh  # Linux/Mac 或 ry.bat (Windows)
   
   # 管理前端 (http://localhost:80)
   cd ruoyi-ui && npm install && npm run dev
   
   # 主前端应用 (http://localhost:5173)
   cd qian-nian-long-zhou && npm install && npm run dev
   ```

**默认管理员**: admin / admin123

## 项目结构

详细的项目结构说明请参考：[项目结构文档](./docs/project-structure.md)
## 文档

- [安装指南](./docs/installation.md) - 详细安装配置步骤
- [功能特性](./docs/features.md) - 完整功能说明
- [部署指南](./docs/deployment.md) - 生产环境部署
- [项目结构](./docs/project-structure.md) - 代码组织结构

## 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

## 许可证

本项目采用 [MIT 许可证](LICENSE) 开源。



