# 项目结构

## 目录结构

```
千年龙舟项目/
├── .gitignore                    # Git 忽略文件
├── LICENSE                       # 开源协议
├── README.md                     # 项目说明文档
├── pom.xml                       # Maven 主配置文件
├── ry.bat                        # 后端启动脚本（Windows）
├── ry.sh                         # 后端启动脚本（Linux/Mac）
├── backend-sql/                  # MySQL数据库表
├── bin/                          # 批处理脚本目录
├── doc/                          # 文档目录
├── sql/                          # 数据库脚本
├── qian-nian-long-zhou/          # 主前端应用（Vue 3）
├── ruoyi-ui/                     # 若依管理前端（Vue 2）
├── ruoyi-admin/                  # 后端主模块
├── ruoyi-common/                 # 通用模块
├── ruoyi-framework/              # 框架模块
├── ruoyi-generator/              # 代码生成模块
├── ruoyi-quartz/                 # 定时任务模块
└── ruoyi-system/                 # 系统模块
```

## 核心模块说明

### 前端应用
- **qian-nian-long-zhou/** - 主前端应用，基于Vue 3 + TypeScript
- **ruoyi-ui/** - 管理后台前端，基于Vue 2

### 后端模块
- **ruoyi-admin/** - 主启动模块，包含控制器和配置
- **ruoyi-system/** - 系统核心模块，用户权限管理
- **ruoyi-common/** - 公共工具类和常量
- **ruoyi-framework/** - 框架集成配置

### 数据库
- **sql/** - 若依框架基础数据
- **backend-sql/** - 龙舟业务相关表结构

### 工具脚本
- **bin/** - 项目构建和运行脚本
- **ry.bat/ry.sh** - 后端服务启动脚本