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

## ✅ 项目进度

- ✅ **前端开发** - Vue 3 前端应用已完成
- ✅ **前端部署** - Vercel 部署配置已完成
- ✅ **后端开发** - 基于若依框架的 SpringBoot 后端已完成
- ✅ **后端部署** - 后端 API 接口部署配置已完成
- ✅ **全栈集成** - 前后端接口联调已完成
- ✅ **项目完成** - 全栈龙舟投票系统开发完成

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
- **管理后台** - 基于若依框架的完整管理系统

## 🚀 快速启动

### 环境要求

- **Java**: JDK 8 或以上版本
- **Node.js**: 16.x 或以上版本
- **MySQL**: 5.7 或以上版本
- **Redis**: 6.x 或以上版本
- **Maven**: 3.6 或以上版本

### 1. 数据库配置

1. 创建 MySQL 数据库
2. 导入 SQL 文件：
   ```bash
   # 导入基础数据
   mysql -u root -p your_database < sql/ry_20250522.sql
   # 导入龙舟相关表
   mysql -u root -p your_database < sql/longzhou_team.sql
   mysql -u root -p your_database < sql/longzhou_vote.sql
   ```

### 2. 后端启动（Spring Boot + 若依框架）

1. **配置数据库连接**
   ```bash
   # 编辑配置文件
   ruoyi-admin/src/main/resources/application-druid.yml
   ```

2. **启动后端服务**
   ```bash
   # 方式一：使用 IDE 运行
   # 运行 ruoyi-admin/src/main/java/com/ruoyi/RuoYiApplication.java
   
   # 方式二：使用 Maven 命令
   mvn clean install
   cd ruoyi-admin
   mvn spring-boot:run
   ```

   后端服务将在 `http://localhost:8080` 启动

### 3. 若依管理前端启动

```bash
# 进入若依前端目录
cd ruoyi-ui

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

若依管理系统将在 `http://localhost:80` 启动

**默认管理员账号**：
- 用户名：`admin`
- 密码：`admin123`

### 4. 主前端应用启动

```bash
# 进入主前端目录
cd qian-nian-long-zhou

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

主前端应用将在 `http://localhost:5173` 启动

### 5. 生产环境构建

```bash
# 构建后端
mvn clean package

# 构建若依前端
cd ruoyi-ui
npm run build:prod

# 构建主前端
cd qian-nian-long-zhou
npm run build
```

## 📁 项目结构

```
千年龙舟项目/
├── .gitignore                    # Git 忽略文件
├── LICENSE                       # 开源协议
├── README.md                     # 项目说明文档
├── pom.xml                       # Maven 主配置文件
├── ry.bat                        # 后端启动脚本（Windows）
├── ry.sh                         # 后端启动脚本（Linux/Mac）
├── bin/                          # 批处理脚本目录
│   ├── clean.bat                 # 清理脚本
│   ├── package.bat               # 打包脚本
│   └── run.bat                   # 运行脚本
├── doc/                          # 文档目录
│   └── 若依环境使用手册.docx      # 若依框架使用手册
├── sql/                          # 数据库脚本
│   ├── ry_20250522.sql           # 若依基础数据
│   ├── longzhou_team.sql         # 龙舟队伍表
│   ├── longzhou_vote.sql         # 投票记录表
│   └── quartz.sql                # 定时任务表
├── qian-nian-long-zhou/          # 主前端应用（Vue 3）
│   ├── src/
│   │   ├── api/                  # API 接口层
│   │   ├── assets/               # 静态资源
│   │   ├── components/           # 公共组件
│   │   ├── composables/          # 组合式函数
│   │   ├── directives/           # 自定义指令
│   │   ├── router/               # 路由配置
│   │   ├── stores/               # 状态管理 (Pinia)
│   │   ├── utils/                # 工具函数
│   │   └── views/                # 页面组件
│   ├── docs/                     # 项目文档
│   ├── public/                   # 公共资源
│   ├── package.json              # 依赖配置
│   ├── vite.config.ts            # Vite 配置
│   └── vercel.json               # Vercel 部署配置
├── ruoyi-ui/                     # 若依管理前端（Vue 2）
│   ├── src/
│   │   ├── api/                  # API 接口
│   │   ├── assets/               # 静态资源
│   │   ├── components/           # 组件
│   │   ├── directive/            # 指令
│   │   ├── layout/               # 布局
│   │   ├── router/               # 路由
│   │   ├── store/                # Vuex 状态管理
│   │   ├── utils/                # 工具类
│   │   └── views/                # 页面
│   ├── bin/                      # 批处理脚本
│   │   ├── build.bat             # 构建脚本
│   │   ├── package.bat           # 打包脚本
│   │   └── run-web.bat           # 启动脚本
│   ├── package.json              # 依赖配置
│   └── vue.config.js             # Vue CLI 配置
├── ruoyi-admin/                  # 后端主模块
│   ├── src/main/java/com/ruoyi/  # Java 源码
│   ├── src/main/resources/       # 配置文件
│   └── pom.xml                   # Maven 配置
├── ruoyi-common/                 # 通用模块
├── ruoyi-framework/              # 框架模块
├── ruoyi-generator/              # 代码生成模块
├── ruoyi-quartz/                 # 定时任务模块
└── ruoyi-system/                 # 系统模块
```


## 🔧 开发工具脚本

### Windows 批处理脚本

- `ry.bat` - 一键启动后端服务
- `bin/clean.bat` - 清理编译文件
- `bin/package.bat` - 打包项目
- `bin/run.bat` - 运行项目
- `ruoyi-ui/bin/run-web.bat` - 启动若依前端
- `ruoyi-ui/bin/build.bat` - 构建若依前端

### 启动顺序建议

1. **启动数据库服务**（MySQL、Redis）
2. **启动后端服务**：`ry.bat`
3. **启动若依管理前端**：`cd ruoyi-ui && npm run dev`
4. **启动主前端应用**：`cd qian-nian-long-zhou && npm run dev`

详细的技术实现和开发指南请参考 [完整文档](./qian-nian-long-zhou/docs/README.md)。

---

**作者**: yecon-27  
**最后更新**: 2025 年 8 月 1 日  
**技术栈**: Vue 3 + TypeScript + Pinia + Vite
---

