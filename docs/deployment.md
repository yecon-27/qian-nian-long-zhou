# 部署指南

## 生产环境构建

### 后端构建
```bash
mvn clean package
```

### 前端构建
```bash
# 管理后台
cd ruoyi-ui
npm run build:prod

# 主前端应用
cd qian-nian-long-zhou
npm run build
```

## 部署方式

### 1. 传统服务器部署

#### 后端部署
1. 将构建好的jar包上传到服务器
2. 配置生产环境数据库连接
3. 启动服务：`java -jar ruoyi-admin.jar`

#### 前端部署
1. 将构建好的dist目录上传到Web服务器
2. 配置Nginx反向代理
3. 配置HTTPS证书

### 2. Docker部署

#### 后端Dockerfile
```dockerfile
FROM openjdk:8-jre-slim
COPY ruoyi-admin.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### 前端Dockerfile
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

### 3. 云平台部署

#### Vercel部署（前端）
1. 连接GitHub仓库
2. 配置构建命令和输出目录
3. 设置环境变量
4. 自动部署

#### 云服务器部署（后端）
1. 选择合适的云服务器配置
2. 安装Java运行环境
3. 配置数据库和Redis
4. 部署应用程序

## 环境变量配置

### 前端环境变量
```bash
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_TITLE=千年龙舟
```

### 后端环境变量
```bash
SPRING_PROFILES_ACTIVE=prod
MYSQL_HOST=your-mysql-host
MYSQL_PORT=3306
REDIS_HOST=your-redis-host
```

## 监控和维护

### 日志管理
- 配置日志轮转
- 设置日志级别
- 监控错误日志

### 性能监控
- 数据库连接池监控
- Redis缓存命中率
- 接口响应时间统计

### 备份策略
- 数据库定期备份
- 静态文件备份
- 配置文件版本控制