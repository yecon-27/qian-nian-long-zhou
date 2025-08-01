# Vercel Deployment Quick Reference

## Environment Variables Setup

### Required Variables for Production

Copy and paste these environment variables in your Vercel project settings:

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

### Setup Steps

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Go to Settings → Environment Variables

2. **Add Each Variable**
   - Click "Add New"
   - Enter variable name and value
   - Select "Production" environment
   - Click "Save"

3. **Verify Configuration**
   ```bash
   # Run local verification
   node scripts/verify-env-config.js
   ```

### Important Notes

- ✅ All API URLs use relative paths (`/api`) for production
- ✅ Mock data is disabled for production
- ✅ Authentication is enabled
- ✅ Node.js version requirement: >=18.0.0

### Troubleshooting

If deployment fails:
1. Check all environment variables are set
2. Verify API endpoints are correct
3. Ensure backend CORS is configured for your domain
4. Review build logs for missing dependencies

For detailed instructions, see: `docs/vercel-environment-setup.md`