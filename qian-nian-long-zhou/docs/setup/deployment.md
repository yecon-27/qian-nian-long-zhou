# 部署指南

## Vercel 部署

项目已配置 Vercel 部署，相关配置在 `.vercel/` 目录下。

### 自动部署
- 推送到主分支会自动触发部署
- 部署状态可在 Vercel 控制台查看

### 手动部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel --prod
```

## 本地构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 环境变量

确保在部署平台设置正确的环境变量：

- `VITE_API_BASE_URL` - API 基础地址
- `VITE_APP_TITLE` - 应用标题

## 静态资源

- 图片资源放在 `public/` 目录
- 组件内资源放在 `src/assets/` 目录

## 性能优化

- 启用 gzip 压缩
- 配置 CDN
- 图片懒加载
- 代码分割