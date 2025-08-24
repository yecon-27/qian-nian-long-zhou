# 项目结构详细说明

## 完整目录结构

```
千年龙舟项目/
├── .gitignore                    # Git 忽略文件
├── LICENSE                       # 开源协议
├── README.md                     # 项目说明文档
├── README.cn.md                  # 中文说明文档
├── pom.xml                       # Maven 主配置文件
├── ry.bat                        # 后端启动脚本（Windows）
├── ry.sh                         # 后端启动脚本（Linux/Mac）
├── docs/                         # 项目文档
│   ├── project-structure.md      # 项目结构说明
│   ├── installation.md           # 安装指南
│   ├── features.md               # 功能特性
│   └── deployment.md             # 部署指南
├── bin/                          # 批处理脚本目录
│   ├── clean.bat                 # 清理脚本
│   ├── package.bat               # 打包脚本
│   └── run.bat                   # 运行脚本
├── doc/                          # 文档目录
│   └── 若依环境使用手册.docx      # 若依框架使用手册
├── sql/                          # 数据库脚本（合并后）
│   ├── ry_20250522.sql           # 若依基础数据
│   ├── longzhou_team.sql         # 龙舟队伍表
│   ├── longzhou_vote.sql         # 投票记录表
│   ├── quartz.sql                # 定时任务表
│   ├── longzhou_new_tables.sql   # 新增龙舟业务表
│   ├── reset-day.sql             # 重置日期脚本
│   ├── reset-today_votes&today_view.sql # 重置今日投票和浏览量
│   ├── reset-view-data.sql       # 重置浏览数据
│   └── reset-vote-data.sql       # 重置投票数据
├── qian-nian-long-zhou/          # 主前端应用（Vue 3 + TypeScript）
│   ├── .kiro/                    # Kiro IDE 配置
│   │   └── specs/                # 项目规格说明
│   ├── .vercel/                  # Vercel 部署配置
│   ├── .vscode/                  # VS Code 配置
│   ├── dist/                     # 构建输出目录
│   ├── docs/                     # 前端项目文档
│   │   ├── backend/              # 后端相关文档
│   │   ├── business/             # 业务逻辑文档
│   │   ├── debug/                # 调试相关文档
│   │   ├── development/          # 开发指南
│   │   ├── frontend/             # 前端开发文档
│   │   ├── setup/                # 环境配置文档
│   │   └── solutions/            # 解决方案文档
│   ├── public/                   # 公共静态资源
│   │   ├── favicon.ico           # 网站图标
│   │   ├── test-frontend-connection.html # 前端连接测试
│   │   └── 龙舟队伍配图.jpg       # 龙舟队伍配图
│   ├── scripts/                  # 构建脚本
│   │   └── verify-env-config.js  # 环境配置验证
│   ├── src/                      # 源代码目录
│   │   ├── api/                  # API 接口层
│   │   │   ├── config.ts         # API 配置
│   │   │   ├── imageResources.ts # 图片资源接口
│   │   │   ├── mockApi.ts        # 模拟 API
│   │   │   ├── stats.ts          # 统计接口
│   │   │   ├── team.ts           # 队伍相关接口
│   │   │   ├── types.ts          # 类型定义
│   │   │   ├── user.ts           # 用户接口
│   │   │   └── vote.ts           # 投票接口
│   │   ├── assets/               # 静态资源
│   │   │   ├── base.css          # 基础样式
│   │   │   ├── default-image.jpg # 默认图片
│   │   │   ├── logo.svg          # Logo
│   │   │   └── main.css          # 主样式
│   │   ├── components/           # 可复用组件
│   │   │   ├── DetailHeader.vue  # 详情页头部
│   │   │   ├── DetailInfo.vue    # 详情信息
│   │   │   ├── DynamicImage.vue  # 动态图片组件
│   │   │   ├── OtherRanks.vue    # 其他排名
│   │   │   ├── SubmissionBar.vue # 提交栏
│   │   │   ├── TeamVoteCard.vue  # 队伍投票卡片
│   │   │   ├── ToolTip.vue       # 工具提示
│   │   │   ├── TopThreeRanks.vue # 前三名排行
│   │   │   └── VoteHeader.vue    # 投票页头部
│   │   ├── composables/          # 组合式函数
│   │   │   ├── useImageResources.ts # 图片资源管理
│   │   │   └── useTooltipManager.js # 提示管理
│   │   ├── directives/           # 自定义指令（空）
│   │   ├── router/               # 路由配置
│   │   │   └── index.ts          # 路由定义
│   │   ├── stores/               # 状态管理 (Pinia)
│   │   │   ├── auth.test.ts      # 认证状态测试
│   │   │   ├── auth.ts           # 认证状态
│   │   │   ├── counter.ts        # 计数器状态
│   │   │   ├── teams.ts          # 队伍状态
│   │   │   ├── teamsImproved.ts  # 改进的队伍状态
│   │   │   ├── teamsSimple.ts    # 简化队伍状态
│   │   │   └── teamsWithRuoyi.ts # 若依集成队伍状态
│   │   ├── utils/                # 工具函数
│   │   │   ├── beginnerTest.ts   # 初学者测试
│   │   │   ├── imagePreloader.ts # 图片预加载
│   │   │   ├── mockData.ts       # 模拟数据
│   │   │   ├── request.ts        # HTTP 请求封装
│   │   │   ├── testConnection.ts # 连接测试
│   │   │   ├── testDailyReset.ts # 每日重置测试
│   │   │   └── testImageResources.ts # 图片资源测试
│   │   ├── views/                # 页面组件
│   │   │   ├── DetailPage.vue    # 详情页
│   │   │   ├── HomePage.vue      # 首页
│   │   │   ├── LoginPage.vue     # 登录页
│   │   │   ├── NotFoundPage.vue  # 404页面
│   │   │   ├── RankPage.vue      # 排行榜页面
│   │   │   ├── RulePage.vue      # 规则页面
│   │   │   └── VotePage.vue      # 投票页面
│   │   ├── App.vue               # 根组件
│   │   └── main.ts               # 应用入口
│   ├── .env.development          # 开发环境配置
│   ├── .env.production           # 生产环境配置
│   ├── package.json              # NPM 依赖配置
│   ├── tsconfig.json             # TypeScript 配置
│   ├── vite.config.ts            # Vite 构建配置
│   └── vercel.json               # Vercel 部署配置
├── ruoyi-ui/                     # 若依管理前端（Vue 2）
│   ├── src/
│   │   ├── api/                  # API 接口
│   │   │   ├── login.js          # 登录接口
│   │   │   ├── menu.js           # 菜单接口
│   │   │   ├── system/           # 系统管理接口
│   │   │   └── longzhou/         # 龙舟业务接口
│   │   ├── assets/               # 静态资源
│   │   ├── components/           # 通用组件
│   │   ├── directive/            # 指令
│   │   ├── layout/               # 页面布局
│   │   ├── router/               # 路由配置
│   │   ├── store/                # Vuex 状态管理
│   │   ├── utils/                # 工具类
│   │   └── views/                # 页面视图
│   │       ├── index.vue         # 首页
│   │       ├── login.vue         # 登录页
│   │       ├── system/           # 系统管理页面
│   │       └── longzhou/         # 龙舟业务页面
│   ├── bin/                      # 批处理脚本
│   │   ├── build.bat             # 构建脚本
│   │   ├── package.bat           # 打包脚本
│   │   └── run-web.bat           # 启动脚本
│   ├── package.json              # NPM 配置
│   └── vue.config.js             # Vue CLI 配置
├── ruoyi-admin/                  # 后端主模块
│   ├── src/main/java/com/ruoyi/  # Java 源码
│   │   ├── RuoYiApplication.java # 主启动类
│   │   ├── web/                  # 控制器层
│   │   │   └── controller/       # 控制器
│   │   │       ├── common/       # 通用控制器
│   │   │       ├── system/       # 系统控制器
│   │   │       └── longzhou/     # 龙舟业务控制器
│   │   └── longzhou/             # 龙舟业务模块
│   │       ├── controller/       # 业务控制器
│   │       ├── domain/           # 实体类
│   │       ├── mapper/           # 数据访问层
│   │       └── service/          # 业务逻辑层
│   ├── src/main/resources/       # 配置文件与资源
│   │   ├── application.yml       # 主配置文件
│   │   ├── application-druid.yml # 数据库配置
│   │   ├── mapper/               # MyBatis 映射文件
│   │   ├── static/               # 静态资源
│   │   └── image/redpacket/      # 红包图片资源
│   └── pom.xml                   # Maven 配置
├── ruoyi-common/                 # 通用工具模块
│   ├── src/main/java/com/ruoyi/common/
│   │   ├── annotation/           # 注解定义
│   │   ├── config/               # 配置类
│   │   ├── constant/             # 常量定义
│   │   ├── core/                 # 核心类
│   │   ├── enums/                # 枚举类
│   │   ├── exception/            # 异常处理
│   │   ├── filter/               # 过滤器
│   │   └── utils/                # 工具类
│   └── pom.xml
├── ruoyi-framework/              # 框架核心模块
│   ├── src/main/java/com/ruoyi/framework/
│   │   ├── aspectj/              # AOP 切面
│   │   ├── config/               # 框架配置
│   │   ├── datasource/           # 数据源配置
│   │   ├── interceptor/          # 拦截器
│   │   ├── manager/              # 管理器
│   │   ├── security/             # 安全配置
│   │   └── web/                  # Web 配置
│   └── pom.xml
├── ruoyi-generator/              # 代码生成器模块
│   ├── src/main/java/com/ruoyi/generator/
│   │   ├── config/               # 生成配置
│   │   ├── controller/           # 生成控制器
│   │   ├── domain/               # 生成实体
│   │   ├── mapper/               # 生成映射
│   │   ├── service/              # 生成服务
│   │   └── util/                 # 生成工具
│   └── pom.xml
├── ruoyi-quartz/                 # 定时任务模块
│   ├── src/main/java/com/ruoyi/quartz/
│   │   ├── config/               # 任务配置
│   │   ├── domain/               # 任务实体
│   │   ├── mapper/               # 任务映射
│   │   ├── service/              # 任务服务
│   │   ├── task/                 # 具体任务
│   │   └── util/                 # 任务工具
│   └── pom.xml
└── ruoyi-system/                 # 系统管理模块
    ├── src/main/java/com/ruoyi/system/
    │   ├── domain/               # 系统实体
    │   ├── mapper/               # 系统映射
    │   └── service/              # 系统服务
    └── pom.xml
```

## 核心模块详细说明

### 前端应用模块

#### qian-nian-long-zhou/ (主前端应用)
- **技术栈**: Vue 3 + TypeScript + Pinia + Vite + Element Plus/Vant
- **功能**: 用户端投票界面，包含队伍展示、投票、排行榜等功能
- **特点**: 移动端优先的响应式设计，支持 PWA
- **部署**: 支持 Vercel 自动部署

#### ruoyi-ui/ (管理后台前端)
- **技术栈**: Vue 2 + Element UI + Vuex + Vue CLI
- **功能**: 管理员后台，用于管理队伍、用户、投票数据等
- **特点**: 基于若依框架的完整管理系统
- **访问**: 默认端口 80

### 后端模块架构

#### ruoyi-admin/ (主启动模块)
- **作用**: 项目启动入口，包含主要的控制器和配置
- **端口**: 默认 8080
- **包含**: 龙舟业务控制器、系统控制器、配置文件等

#### ruoyi-system/ (系统核心模块)
- **作用**: 提供用户管理、权限控制、菜单管理等系统功能
- **特点**: 若依框架的核心系统功能
- **功能**: RBAC 权限控制、用户管理、角色管理

#### ruoyi-common/ (通用模块)
- **作用**: 提供公共工具类、常量、异常处理等
- **包含**: 工具类、注解、枚举、异常处理等
- **特点**: 跨模块共享的基础功能

#### ruoyi-framework/ (框架模块)
- **作用**: 框架集成配置，包含安全、数据源、拦截器等
- **特点**: 整合 Spring Security、MyBatis、Redis 等框架
- **功能**: 统一异常处理、日志记录、缓存管理

#### ruoyi-generator/ (代码生成模块)
- **作用**: 根据数据库表自动生成 CRUD 代码
- **功能**: 提高开发效率，减少重复代码
- **支持**: 生成 Controller、Service、Mapper、前端页面

#### ruoyi-quartz/ (定时任务模块)
- **作用**: 处理定时任务，如数据统计、清理等
- **功能**: 基于 Quartz 的任务调度
- **特点**: 支持动态添加、删除、暂停任务

### 数据库结构

#### sql/ (数据库脚本 - 已合并)
- **ry_20250522.sql**: 若依框架基础数据（用户、角色、菜单等）
- **longzhou_team.sql**: 龙舟队伍信息表
- **longzhou_vote.sql**: 投票记录表
- **quartz.sql**: 定时任务相关表
- **longzhou_new_tables.sql**: 新增业务表
- **reset-*.sql**: 各种数据重置脚本

### 开发工具与脚本

#### 启动脚本
- **ry.bat/ry.sh**: 后端服务一键启动脚本
- **ruoyi-ui/bin/run-web.bat**: 前端管理系统启动脚本

#### 构建脚本
- **bin/clean.bat**: 清理编译文件
- **bin/package.bat**: 项目打包脚本
- **bin/run.bat**: 项目运行脚本

#### 开发配置
- **.kiro/**: Kiro IDE 配置和项目规格
- **.vscode/**: VS Code 开发环境配置
- **scripts/**: 构建和验证脚本

## 技术架构特点

### 前端架构
- **组件化**: 高度组件化的 Vue 应用
- **状态管理**: 使用 Pinia 进行状态管理
- **类型安全**: TypeScript 提供类型检查
- **构建优化**: Vite 提供快速的开发和构建体验

### 后端架构
- **微服务**: 模块化的 Spring Boot 应用
- **数据访问**: MyBatis Plus 提供 ORM 支持
- **安全控制**: Spring Security 提供认证授权
- **缓存优化**: Redis 提供缓存支持

### 部署架构
- **前后端分离**: 独立部署和扩展
- **容器化**: 支持 Docker 容器化部署
- **云原生**: 支持各种云平台部署

## 开发流程

1. **环境准备**: 安装 JDK、Node.js、MySQL、Redis
2. **数据库初始化**: 导入 sql 目录下的所有脚本
3. **后端启动**: 使用 ry.bat 或 IDE 启动后端服务
4. **前端启动**: 分别启动管理后台和用户端前端
5. **开发调试**: 通过管理后台管理数据，用户端进行功能测试

## 部署结构

- **前端**: 构建后部署到 CDN 或静态服务器（如 Vercel）
- **后端**: 打包成 jar 文件部署到应用服务器
- **数据库**: MySQL 数据库服务器
- **缓存**: Redis 缓存服务器
- **负载均衡**: Nginx 反向代理和负载均衡