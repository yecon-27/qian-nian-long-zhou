# 安装指南

## 环境要求

- **Java**: JDK 8 或以上版本
- **Node.js**: 16.x 或以上版本
- **MySQL**: 5.7 或以上版本
- **Redis**: 6.x 或以上版本
- **Maven**: 3.6 或以上版本

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/your-username/qian-nian-long-zhou.git
cd qian-nian-long-zhou
```

### 2. 数据库配置

1. 创建MySQL数据库
2. 导入基础数据：`sql/ry_20250522.sql`
3. 导入业务数据：`backend-sql/` 目录下的SQL文件

### 3. 后端配置

编辑配置文件：
```bash
ruoyi-admin/src/main/resources/application-druid.yml
```

配置数据库连接信息和Redis连接信息。

### 4. 启动服务

#### 后端服务
```bash
# 使用脚本启动
./ry.sh  # Linux/Mac
ry.bat   # Windows

# 或使用Maven
mvn clean install
cd ruoyi-admin
mvn spring-boot:run
```

#### 管理前端
```bash
cd ruoyi-ui
npm install
npm run dev
```

#### 主前端应用
```bash
cd qian-nian-long-zhou
npm install
npm run dev
```

## 默认账号

**管理员账号**：
- 用户名：`admin`
- 密码：`admin123`

## 访问地址

- 主前端应用：http://localhost:5173
- 管理后台：http://localhost:80
- 后端API：http://localhost:8080