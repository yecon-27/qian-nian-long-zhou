# Deployment Troubleshooting Quick Reference

## 🚨 Emergency Quick Fixes

### Build Failing with "Command not found"
```bash
# Fix: Change Vercel Framework Preset
1. Go to Vercel Dashboard → Settings → General
2. Framework Preset: Change from "Vite" to "Other"
3. Build Command: npm run build
4. Output Directory: dist
5. Redeploy
```

### 404 Errors on Direct URL Access
```json
// Fix: Add to vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Environment Variables Not Working
```bash
# Fix: Check variable names and environment
1. Variables must start with VITE_ for client-side
2. Set in correct environment (Production/Preview)
3. Redeploy after adding variables
```

### API Calls Failing in Production
```javascript
// Fix: Use relative paths in production
// Change from: http://localhost:8080/api
// To: /api
VITE_API_BASE_URL=/api
```

## 🔍 Quick Diagnostic Commands

```bash
# Test local build
npm run build && npm run preview

# Check environment variables
vercel env ls

# Test with production environment
NODE_ENV=production npm run build

# Deploy to preview first
vercel --prod=false
```

## 📋 Pre-Deployment Checklist

- [ ] Framework Preset set to "Other" (not Vite)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] All environment variables set with VITE_ prefix
- [ ] vercel.json has SPA routing configuration
- [ ] Local build and preview work correctly

## 🔧 Common Error Messages and Solutions

| Error Message | Root Cause | Quick Fix |
|---------------|------------|-----------|
| `Command "vite" not found` | Framework preset override | Change preset to "Other" |
| `Module not found: Can't resolve` | Missing dependency | Run `npm install` |
| `404 - This page could not be found` | Missing SPA routing | Add rewrites to vercel.json |
| `ReferenceError: process is not defined` | Environment variable issue | Check VITE_ prefix |
| `Failed to fetch` | API connection issue | Use relative API paths |
| `Type error in src/` | TypeScript compilation | Fix type errors or skip type check |

## 📞 Escalation Path

1. **Self-Service:** Use this guide and main documentation
2. **Team Help:** Check with other developers
3. **Technical Lead:** For configuration issues
4. **DevOps/Infrastructure:** For platform-specific problems

## 🔗 Quick Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Complete Deployment Guide](./VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md)
- [Environment Setup Guide](./vercel-environment-setup.md)
- [Build Logs](https://vercel.com/dashboard) → Your Project → Deployments

---
*Keep this reference handy during deployments!*