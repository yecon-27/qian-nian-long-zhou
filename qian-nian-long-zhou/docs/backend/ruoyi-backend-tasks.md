# 若依后端配置任务清单

## 🎯 目标

配置若依后端支持龙舟投票系统的认证和 API 接口，解决前端登录认证失败问题。

## ❌ 当前问题

前端调用 `/api/auth/login` 接口时返回：

```json
{
  "msg": "请求访问：/api/auth/login，认证失败，无法访问系统资源",
  "code": 401
}
```

## 📋 需要完成的任务

### 1. 配置认证白名单

在若依后端的安全配置中添加以下接口到白名单，允许匿名访问：

**需要添加的接口：**

- `/api/auth/login` - 用户登录
- `/api/auth/register` - 用户注册

**配置位置：**

- 文件：`SecurityConfig.java` 或类似的安全配置文件
- 添加代码：

```java
.antMatchers("/api/auth/login", "/api/auth/register").permitAll()
```

### 2. 创建认证相关的 Controller

创建或确保存在以下 Controller 来处理认证请求：

**需要的接口：**

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/auth/getInfo` - 获取用户信息
- `POST /api/auth/logout` - 用户登出

**期望的响应格式：**

登录成功响应：

```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "user": {
      "userId": 1,
      "username": "admin",
      "nickname": "管理员",
      "roles": ["admin"],
      "permissions": ["*:*:*"]
    }
  },
  "msg": "操作成功"
}
```

### 5. 配置 CORS 跨域

确保后端配置了正确的 CORS 设置，允许前端域名访问：

```java
// 允许的前端地址
- http://localhost:5173
- http://localhost:5174
- 生产环境域名
```

### 6. 验证配置

完成配置后，请验证以下接口是否正常工作：

1. **测试登录接口：**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

2. **测试获取用户信息：**

```bash
curl -X GET http://localhost:8080/api/auth/getInfo \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔍 前端配置信息

前端当前配置：

- 开发环境 API 地址：`http://localhost:8080`
- 认证接口路径：`/api/auth/*`
- Token 存储：localStorage
- 请求头格式：`Authorization: Bearer TOKEN`

## ✅ 完成标志

配置完成后，前端应该能够：

1. 成功调用登录接口而不返回 401 错误
2. 获取到有效的 JWT token
3. 使用 token 访问受保护的 API 接口
4. 正常进行用户注册和登出操作

## 📞 联系方式

如有问题，请及时反馈当前的错误信息和日志，以便进一步调试。
