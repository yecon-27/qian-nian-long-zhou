# Complete Vercel Deployment Guide

## Overview

This comprehensive guide covers the complete deployment process for the "千年龙舟创意新生" Vue 3 + Vite application to Vercel, including troubleshooting common issues and best practices.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Configuration](#project-configuration)
3. [Deployment Process](#deployment-process)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Common Issues and Solutions](#common-issues-and-solutions)
6. [Troubleshooting Guide](#troubleshooting-guide)
7. [Verification and Testing](#verification-and-testing)
8. [Maintenance and Updates](#maintenance-and-updates)

## Prerequisites

### System Requirements
- Node.js >= 18.0.0
- npm or yarn package manager
- Git repository access
- Vercel account with project access

### Local Development Setup
```bash
# Clone the repository
git clone <repository-url>
cd qian-nian-long-zhou

# Install dependencies
npm install

# Test local build
npm run build
npm run preview
```

## Project Configuration

### 1. Vercel Configuration (`vercel.json`)

The project uses a custom Vercel configuration for SPA routing:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Key Points:**
- Uses custom build command instead of framework preset
- Configures SPA routing with catch-all rewrite
- Specifies correct output directory

### 2. Package.json Configuration

Build scripts are configured for Vercel compatibility:

```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "build": "npm install && npm run type-check && npm run build-only",
    "vercel-build": "npm install && npm run type-check && npm run build-only",
    "build-only": "npx vite build",
    "type-check": "npx vue-tsc --build"
  }
}
```

**Key Points:**
- Specifies Node.js version requirement
- Includes type checking in build process
- Provides both `build` and `vercel-build` scripts

### 3. Vite Configuration (`vite.config.ts`)

Optimized for production deployment:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['vant', 'element-plus'],
          utils: ['axios', 'js-cookie']
        }
      }
    }
  },
  base: './'
})
```

**Key Points:**
- Uses relative base path for asset loading
- Implements code splitting for better performance
- Disables source maps for production

## Deployment Process

### Method 1: Automatic Deployment (Recommended)

1. **Configure Vercel Project Settings**
   ```
   Framework Preset: Other (NOT Vite)
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   Node.js Version: 18.x or higher
   ```

2. **Push to Repository**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

3. **Monitor Deployment**
   - Check Vercel dashboard for build progress
   - Review build logs for any errors
   - Test deployed application

### Method 2: Manual Deployment

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy via Vercel CLI**
   ```bash
   npx vercel --prod
   ```

3. **Or Upload dist Folder**
   - Zip the `dist` folder
   - Upload via Vercel dashboard

### Method 3: CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

## Environment Variables Setup

### Required Production Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

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

### Setup Instructions

1. **Via Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add each variable for "Production" environment
   - Click "Save" after each addition

2. **Via Vercel CLI:**
   ```bash
   vercel env add NODE_ENV production
   vercel env add VITE_APP_BASE_API /api production
   # ... repeat for all variables
   ```

3. **Bulk Import:**
   - Create `.env.production.vercel` file with all variables
   - Use Vercel dashboard import feature

## Common Issues and Solutions

### Issue 1: Framework Preset Override

**Problem:** Vercel's "Vite" framework preset overrides custom configuration

**Solution:**
1. Go to Vercel Project Settings
2. Change Framework Preset from "Vite" to "Other"
3. Set Build Command to: `npm run build`
4. Set Output Directory to: `dist`
5. Redeploy

### Issue 2: Build Command Not Found

**Problem:** `vite build` command not found during deployment

**Root Cause:** Missing npm scripts or incorrect build command

**Solution:**
```json
// Ensure package.json has correct scripts
{
  "scripts": {
    "build": "npm install && npm run type-check && npm run build-only",
    "build-only": "npx vite build"
  }
}
```

### Issue 3: SPA Routing 404 Errors

**Problem:** Direct URL access returns 404 errors

**Root Cause:** Missing SPA routing configuration

**Solution:**
```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Issue 4: Environment Variables Not Loading

**Problem:** Environment variables undefined in production

**Root Cause:** Variables not prefixed with `VITE_` or not set in Vercel

**Solution:**
1. Ensure all client-side variables start with `VITE_`
2. Set variables in Vercel dashboard for correct environment
3. Redeploy after adding variables

### Issue 5: API Connection Failures

**Problem:** API calls fail in production

**Root Cause:** Incorrect API URLs or CORS issues

**Solution:**
1. Use relative API paths (`/api`) in production
2. Configure backend CORS for Vercel domain
3. Verify API endpoints are accessible

### Issue 6: Asset Loading Failures

**Problem:** CSS, JS, or image files not loading

**Root Cause:** Incorrect base path configuration

**Solution:**
```typescript
// vite.config.ts
export default defineConfig({
  base: './', // Use relative paths
  build: {
    assetsDir: 'assets'
  }
})
```

## Troubleshooting Guide

### Step 1: Identify the Issue

1. **Check Build Logs**
   - Go to Vercel dashboard → Deployments
   - Click on failed deployment
   - Review "Build Logs" tab

2. **Common Error Patterns:**
   - `Command "vite" not found` → Framework preset issue
   - `Module not found` → Missing dependencies
   - `Type error` → TypeScript compilation issues
   - `404 on routes` → SPA routing not configured

### Step 2: Debug Locally

1. **Test Production Build**
   ```bash
   NODE_ENV=production npm run build
   npm run preview
   ```

2. **Check Environment Variables**
   ```bash
   # Create test file
   echo "console.log(import.meta.env)" > test-env.js
   # Check in browser console
   ```

3. **Verify Dependencies**
   ```bash
   npm audit
   npm ls
   ```

### Step 3: Fix Configuration

1. **Update Vercel Settings**
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node Version: 18.x

2. **Verify Files**
   - `vercel.json` exists and is correct
   - `package.json` has proper scripts
   - `vite.config.ts` has correct base path

3. **Environment Variables**
   - All required variables set
   - Correct environment selected
   - Variables start with `VITE_` for client-side

### Step 4: Test and Deploy

1. **Preview Deployment**
   ```bash
   vercel --prod=false
   ```

2. **Production Deployment**
   ```bash
   vercel --prod
   ```

3. **Verify Functionality**
   - Test all routes
   - Check API connections
   - Verify assets load correctly

## Verification and Testing

### Pre-Deployment Checklist

- [ ] Local build completes successfully
- [ ] Preview server works correctly
- [ ] All routes accessible
- [ ] API connections functional
- [ ] Environment variables configured
- [ ] Vercel project settings correct

### Post-Deployment Testing

1. **Smoke Tests**
   ```bash
   # Test main routes
   curl -I https://your-app.vercel.app/
   curl -I https://your-app.vercel.app/about
   curl -I https://your-app.vercel.app/contact
   ```

2. **Functional Testing**
   - Navigate through all pages
   - Test form submissions
   - Verify API data loading
   - Check responsive design

3. **Performance Testing**
   - Use Lighthouse for performance audit
   - Check Core Web Vitals
   - Monitor loading times

### Monitoring and Alerts

1. **Vercel Analytics**
   - Enable Vercel Analytics
   - Monitor page views and performance
   - Set up error tracking

2. **Custom Monitoring**
   ```javascript
   // Add to main.ts for error tracking
   window.addEventListener('error', (event) => {
     console.error('Global error:', event.error);
     // Send to monitoring service
   });
   ```

## Maintenance and Updates

### Regular Maintenance Tasks

1. **Dependency Updates**
   ```bash
   npm audit
   npm update
   npm run build # Test after updates
   ```

2. **Environment Variable Review**
   - Review and update API endpoints
   - Check for deprecated variables
   - Update version numbers

3. **Performance Optimization**
   - Review bundle size
   - Update code splitting strategy
   - Optimize images and assets

### Deployment Best Practices

1. **Version Control**
   - Tag releases: `git tag v1.0.0`
   - Use semantic versioning
   - Maintain changelog

2. **Staging Environment**
   - Use Vercel preview deployments
   - Test changes before production
   - Maintain separate environment variables

3. **Rollback Strategy**
   - Keep previous deployment accessible
   - Document rollback procedures
   - Test rollback process

### Emergency Procedures

1. **Quick Rollback**
   ```bash
   # Via Vercel CLI
   vercel rollback <deployment-url>
   
   # Via Dashboard
   # Go to Deployments → Select previous → Promote to Production
   ```

2. **Hotfix Deployment**
   ```bash
   # Create hotfix branch
   git checkout -b hotfix/critical-fix
   # Make changes
   git commit -m "hotfix: critical issue"
   git push origin hotfix/critical-fix
   # Deploy directly
   vercel --prod
   ```

## Support and Resources

### Documentation Links
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vue 3 Production Deployment](https://vuejs.org/guide/best-practices/production-deployment.html)

### Internal Resources
- `DEPLOYMENT_SOLUTION.md` - Specific solution for framework preset issue
- `VERCEL_DEPLOYMENT_GUIDE.md` - Quick reference guide
- `docs/vercel-environment-setup.md` - Detailed environment setup

### Getting Help
1. Check this troubleshooting guide first
2. Review Vercel build logs
3. Test locally with production configuration
4. Contact team lead or DevOps for complex issues

---

**Last Updated:** $(date)
**Version:** 1.0.0
**Maintainer:** Development Team