# Vercel Environment Variable Configuration

## Overview

This document provides comprehensive instructions for setting up environment variables for the "千年龙舟创意新生" Vue 3 + Vite application on Vercel.

## Required Environment Variables

### Core Application Variables

| Variable | Description | Development Value | Production Value | Required |
|----------|-------------|-------------------|------------------|----------|
| `NODE_ENV` | Environment mode | `development` | `production` | Yes |
| `VITE_APP_TITLE` | Application title | `千年龙舟创意新生` | `千年龙舟创意新生` | Yes |
| `VITE_APP_VERSION` | Application version | `1.0.0` | `1.0.0` | Yes |

### API Configuration Variables

| Variable | Description | Development Value | Production Value | Required |
|----------|-------------|-------------------|------------------|----------|
| `VITE_APP_BASE_API` | Legacy API base URL | `http://localhost:8080` | `/api` | Yes |
| `VITE_API_BASE_URL` | Primary API base URL | `http://localhost:8080/api` | `/api` | Yes |
| `VITE_RUOYI_API_BASE_URL` | RuoYi backend API URL | `http://localhost:8080` | `/api` | Yes |
| `VITE_RUOYI_UPLOAD_URL` | File upload endpoint | `http://localhost:8080/common/upload` | `/api/common/upload` | Yes |

### Feature Toggle Variables

| Variable | Description | Development Value | Production Value | Required |
|----------|-------------|-------------------|------------------|----------|
| `VITE_USE_MOCK` | Enable mock data | `false` | `false` | No |
| `VITE_ENABLE_MOCK` | Enable mock API | `false` | `false` | No |
| `VITE_ENABLE_AUTH` | Enable authentication | `true` | `true` | No |
| `VITE_ENABLE_FALLBACK` | Enable fallback features | `true` | `true` | No |

## Vercel Environment Variable Setup Instructions

### Method 1: Vercel Dashboard (Recommended)

1. **Access Project Settings**
   - Go to your Vercel dashboard
   - Select your project
   - Navigate to "Settings" → "Environment Variables"

2. **Add Production Variables**
   Add the following environment variables for **Production** environment:

   ```
   NODE_ENV=production
   VITE_APP_BASE_API=/api
   VITE_APP_TITLE=千年龙舟创意新生
   VITE_APP_VERSION=1.0.0
   VITE_API_BASE_URL=/api
   VITE_RUOYI_API_BASE_URL=/api
   VITE_RUOYI_UPLOAD_URL=/api/common/upload
   VITE_USE_MOCK=false
   VITE_ENABLE_MOCK=false
   VITE_ENABLE_AUTH=true
   VITE_ENABLE_FALLBACK=true
   ```

3. **Add Preview Variables** (Optional)
   For preview deployments, you can use the same values as production or customize them:

   ```
   NODE_ENV=production
   VITE_APP_BASE_API=/api
   VITE_APP_TITLE=千年龙舟创意新生 (Preview)
   VITE_APP_VERSION=1.0.0-preview
   VITE_API_BASE_URL=/api
   VITE_RUOYI_API_BASE_URL=/api
   VITE_RUOYI_UPLOAD_URL=/api/common/upload
   VITE_USE_MOCK=false
   VITE_ENABLE_MOCK=false
   VITE_ENABLE_AUTH=true
   VITE_ENABLE_FALLBACK=true
   ```

### Method 2: Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Set Environment Variables**
   ```bash
   # Production environment
   vercel env add NODE_ENV production
   vercel env add VITE_APP_BASE_API /api production
   vercel env add VITE_APP_TITLE 千年龙舟创意新生 production
   vercel env add VITE_APP_VERSION 1.0.0 production
   vercel env add VITE_API_BASE_URL /api production
   vercel env add VITE_RUOYI_API_BASE_URL /api production
   vercel env add VITE_RUOYI_UPLOAD_URL /api/common/upload production
   vercel env add VITE_USE_MOCK false production
   vercel env add VITE_ENABLE_MOCK false production
   vercel env add VITE_ENABLE_AUTH true production
   vercel env add VITE_ENABLE_FALLBACK true production
   ```

### Method 3: Environment File Upload

1. **Create Production Environment File**
   Create a temporary `.env.production.vercel` file:
   ```env
   NODE_ENV=production
   VITE_APP_BASE_API=/api
   VITE_APP_TITLE=千年龙舟创意新生
   VITE_APP_VERSION=1.0.0
   VITE_API_BASE_URL=/api
   VITE_RUOYI_API_BASE_URL=/api
   VITE_RUOYI_UPLOAD_URL=/api/common/upload
   VITE_USE_MOCK=false
   VITE_ENABLE_MOCK=false
   VITE_ENABLE_AUTH=true
   VITE_ENABLE_FALLBACK=true
   ```

2. **Import via Vercel Dashboard**
   - Go to Environment Variables settings
   - Use the "Import" feature to upload the file
   - Select appropriate environments (Production, Preview, Development)

## Environment-Specific Configuration Notes

### Production Environment
- **API URLs**: Use relative paths (`/api`) to work with Vercel's routing
- **Mock Data**: Disabled (`false`) for production use
- **Authentication**: Enabled for security
- **Fallback Features**: Enabled for better user experience

### Development Environment
- **API URLs**: Use full localhost URLs for local development
- **Mock Data**: Can be enabled for testing without backend
- **Debug Features**: Additional logging and development tools enabled

### Preview Environment
- **API URLs**: Same as production (relative paths)
- **Title**: Can include "(Preview)" suffix for identification
- **Version**: Can include "-preview" suffix

## Testing Environment Configuration

### Local Testing
1. **Test with Production Environment**
   ```bash
   # Copy production environment for local testing
   cp .env.production .env.local
   npm run build
   npm run preview
   ```

2. **Verify Environment Variables**
   ```bash
   # Check if variables are loaded correctly
   node -e "console.log(process.env)"
   ```

### Vercel Preview Testing
1. **Deploy to Preview**
   ```bash
   vercel --prod=false
   ```

2. **Test Environment Variables**
   - Check browser console for API calls
   - Verify correct API endpoints are being used
   - Test all application features

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_` prefix
   - Check variable names for typos
   - Verify environment is set correctly (Production/Preview/Development)

2. **API Connection Failures**
   - Verify API URLs are correct for production
   - Check CORS configuration on backend
   - Ensure relative paths work with Vercel routing

3. **Build Failures**
   - Check if all required variables are set
   - Verify Node.js version compatibility (>=18.0.0)
   - Review build logs for missing dependencies

### Debugging Commands

```bash
# Check current environment variables
vercel env ls

# Pull environment variables to local
vercel env pull .env.vercel

# Test build locally with production environment
NODE_ENV=production npm run build
```

## Security Considerations

1. **Sensitive Data**: Never store sensitive information in environment variables that start with `VITE_` as they are exposed to the client
2. **API Keys**: Use server-side environment variables for API keys and secrets
3. **CORS**: Ensure proper CORS configuration on your backend API
4. **Authentication**: Implement proper authentication mechanisms

## Deployment Checklist

- [ ] All required environment variables are set in Vercel
- [ ] API endpoints are configured correctly for production
- [ ] Environment variables are tested in preview environment
- [ ] Build process completes successfully
- [ ] Application loads and functions correctly in production
- [ ] API connections work properly
- [ ] Authentication flow works as expected
- [ ] All features are functional with production configuration

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)
- [Vue 3 Environment Configuration](https://vuejs.org/guide/best-practices/production-deployment.html)