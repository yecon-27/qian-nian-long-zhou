# Vercel Deployment Checklist

## Pre-Deployment Setup

### 1. Local Environment Verification
- [ ] Node.js version >= 18.0.0 installed
- [ ] All dependencies installed (`npm install`)
- [ ] Local development server runs without errors (`npm run dev`)
- [ ] Local build completes successfully (`npm run build`)
- [ ] Preview server works correctly (`npm run preview`)
- [ ] All routes accessible in preview mode
- [ ] API connections functional in development

### 2. Code Quality Checks
- [ ] TypeScript compilation passes (`npm run type-check`)
- [ ] No console errors in browser
- [ ] All imports and dependencies resolved
- [ ] Code committed to version control
- [ ] Working branch merged to main/production branch

### 3. Configuration Files Review
- [ ] `vercel.json` exists with correct configuration
- [ ] `package.json` has proper build scripts
- [ ] `vite.config.ts` configured for production
- [ ] Environment files (`.env.production`) configured
- [ ] No sensitive data in client-side environment variables

## Vercel Project Configuration

### 4. Project Settings Verification
- [ ] Framework Preset set to "Other" (NOT "Vite")
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`
- [ ] Node.js Version: 18.x or higher
- [ ] Root Directory: `.` (if monorepo, set correct path)

### 5. Environment Variables Setup
- [ ] All required environment variables added to Vercel
- [ ] Variables set for correct environment (Production/Preview)
- [ ] Client-side variables prefixed with `VITE_`
- [ ] API URLs configured for production (relative paths)
- [ ] Mock data disabled for production
- [ ] Authentication enabled

**Required Variables Checklist:**
- [ ] `NODE_ENV=production`
- [ ] `VITE_APP_BASE_API=/api`
- [ ] `VITE_APP_TITLE=千年龙舟创意新生`
- [ ] `VITE_APP_VERSION=1.0.0`
- [ ] `VITE_API_BASE_URL=/api`
- [ ] `VITE_RUOYI_API_BASE_URL=/api`
- [ ] `VITE_RUOYI_UPLOAD_URL=/api/common/upload`
- [ ] `VITE_USE_MOCK=false`
- [ ] `VITE_ENABLE_MOCK=false`
- [ ] `VITE_ENABLE_AUTH=true`
- [ ] `VITE_ENABLE_FALLBACK=true`

## Deployment Process

### 6. Initial Deployment
- [ ] Code pushed to connected Git repository
- [ ] Automatic deployment triggered (or manual deployment initiated)
- [ ] Build logs reviewed for errors
- [ ] Build completed successfully
- [ ] Deployment URL generated

### 7. Post-Deployment Verification
- [ ] Application loads at deployment URL
- [ ] Home page renders correctly
- [ ] All navigation links work
- [ ] SPA routing functions (direct URL access works)
- [ ] Static assets (CSS, JS, images) load correctly
- [ ] API connections functional
- [ ] Authentication flow works
- [ ] Forms and user interactions work
- [ ] Mobile responsiveness verified
- [ ] Performance acceptable (loading times)

### 8. Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 9. Production Environment Testing
- [ ] All major user flows tested
- [ ] Data loading and display correct
- [ ] Error handling works properly
- [ ] 404 pages display correctly
- [ ] Search functionality works
- [ ] File uploads work (if applicable)

## Post-Deployment Tasks

### 10. Monitoring Setup
- [ ] Vercel Analytics enabled (if desired)
- [ ] Error tracking configured
- [ ] Performance monitoring in place
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### 11. Documentation Updates
- [ ] Deployment documented in project README
- [ ] Environment variables documented
- [ ] Deployment URL shared with team
- [ ] Any configuration changes documented
- [ ] Troubleshooting notes updated

### 12. Team Communication
- [ ] Deployment success communicated to team
- [ ] Production URL shared
- [ ] Any known issues documented
- [ ] Next steps or follow-up tasks identified

## Rollback Preparation

### 13. Rollback Plan
- [ ] Previous working deployment identified
- [ ] Rollback procedure documented
- [ ] Team notified of rollback plan
- [ ] Database backup created (if applicable)
- [ ] Rollback tested in preview environment

## Troubleshooting Checklist

### If Deployment Fails:

#### Build Errors
- [ ] Check build logs in Vercel dashboard
- [ ] Verify all dependencies are in package.json
- [ ] Test build locally with same Node.js version
- [ ] Check for TypeScript errors
- [ ] Verify environment variables are set

#### Runtime Errors
- [ ] Check browser console for JavaScript errors
- [ ] Verify API endpoints are accessible
- [ ] Check CORS configuration on backend
- [ ] Test with different browsers
- [ ] Check network requests in browser dev tools

#### Configuration Issues
- [ ] Verify Framework Preset is set to "Other"
- [ ] Check build command and output directory
- [ ] Verify vercel.json configuration
- [ ] Check environment variable names and values
- [ ] Test SPA routing configuration

## Success Criteria

### Deployment is considered successful when:
- [ ] Application loads without errors
- [ ] All core functionality works
- [ ] Performance meets requirements
- [ ] No critical bugs identified
- [ ] Team has access to production URL
- [ ] Monitoring is in place
- [ ] Documentation is updated

## Emergency Contacts

- **Technical Lead:** [Name/Contact]
- **DevOps Team:** [Contact Information]
- **Project Manager:** [Name/Contact]
- **Backend Team:** [Contact for API issues]

## Notes Section

**Deployment Date:** _______________
**Deployed By:** _______________
**Git Commit:** _______________
**Deployment URL:** _______________
**Issues Encountered:** 
_______________________________________________
_______________________________________________

**Resolution Notes:**
_______________________________________________
_______________________________________________

---

**Checklist Version:** 1.0
**Last Updated:** $(date)
**Next Review Date:** _______________