# 🔧 Railway Deployment Fix

## Issue: "npm: command not found"

You got this error because Railway couldn't find Node.js during the build process.

---

## ✅ Solution 1: Use Dockerfile (RECOMMENDED)

I've created a `Dockerfile` for you. Now follow these steps:

### Step 1: Commit the New Files

```bash
git add Dockerfile .dockerignore railway.json
git commit -m "Add Dockerfile for Railway deployment"
git push origin main
```

### Step 2: Railway Will Auto-Deploy

Railway will automatically detect the push and rebuild with the Dockerfile.

**Wait 2-3 minutes** for the build to complete.

---

## ✅ Solution 2: Use Nixpacks (Alternative)

If Dockerfile doesn't work, try this simpler approach:

### Step 1: Create nixpacks.toml

Create a file called `nixpacks.toml` in your project root:

```toml
[phases.setup]
nixPkgs = ['nodejs-18_x']

[phases.install]
cmds = ['cd backend && npm install']

[start]
cmd = 'cd backend && npm start'
```

### Step 2: Update railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Step 3: Push Changes

```bash
git add nixpacks.toml railway.json
git commit -m "Use Nixpacks for Railway"
git push origin main
```

---

## ✅ Solution 3: Restructure Project (If Both Fail)

If both solutions above fail, restructure your project:

### Step 1: Move Everything to Root

```bash
# Move backend files to root
mv backend/package.json .
mv backend/server.js .
mv backend/.env.example .
# Keep backend folder for other files
```

### Step 2: Update package.json

```json
{
  "name": "portfolio-hub",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node backend/database/init.js"
  },
  "dependencies": {
    // ... same dependencies
  }
}
```

### Step 3: Update server.js paths

Change all paths from:
```javascript
require('./database/db')
```

To:
```javascript
require('./backend/database/db')
```

---

## 🎯 RECOMMENDED: Use Solution 1 (Dockerfile)

I've already created the Dockerfile for you. Just:

1. **Commit and push:**
   ```bash
   git add .
   git commit -m "Fix Railway deployment with Dockerfile"
   git push
   ```

2. **Wait for Railway** to rebuild (2-3 minutes)

3. **Check build logs** in Railway dashboard

---

## 📊 Verify Deployment

After successful build, check:

### 1. Railway Dashboard
- Build status: ✅ Success
- Service status: ✅ Running

### 2. Test URLs

```bash
# Health check
curl https://your-app.railway.app/api/health

# Should return:
{"status":"ok","message":"Server is running"}
```

### 3. Visit Your Site

```
https://your-app.railway.app/
```

---

## 🐛 If Still Having Issues

### Check Build Logs

1. Go to Railway dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click on latest deployment
5. Read the logs

### Common Issues

**Issue: Port binding error**
```
Solution: Railway auto-sets PORT, your code already handles this ✅
```

**Issue: Database connection fails**
```
Solution: Make sure PostgreSQL service is added and linked
```

**Issue: Environment variables missing**
```
Solution: Add these in Railway Variables tab:
- SESSION_SECRET
- NODE_ENV=production
```

---

## 🎉 After Successful Deployment

### Initialize Database

```bash
# Install Railway CLI if not done
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run database init
railway run node backend/database/init.js
```

### Test Everything

- ✅ Visit homepage
- ✅ Test login page: `/login`
- ✅ Test API: `/api/health`
- ✅ Test search functionality
- ✅ Login with default credentials:
  - Email: admin@example.com
  - Password: Admin123!@#

---

## 📝 What I Changed

### Created Files:
1. ✅ `Dockerfile` - Docker configuration for Railway
2. ✅ `.dockerignore` - Files to exclude from Docker build
3. ✅ Updated `railway.json` - Use Dockerfile builder

### Why This Fixes It:
- Dockerfile explicitly installs Node.js 18
- Properly sets up the working directory
- Installs dependencies correctly
- Creates necessary folders (uploads)
- Exposes the right port

---

## 💡 Pro Tips

### 1. Check Railway Service Settings

In Railway dashboard, verify:
- **Root Directory:** Leave empty (uses project root)
- **Start Command:** Set by Dockerfile (no need to override)

### 2. Watch Logs

```bash
# Using Railway CLI
railway logs

# Or in Railway dashboard → Logs tab
```

### 3. Environment Variables

Don't forget to set in Railway Variables:
```env
NODE_ENV=production
SESSION_SECRET=your-random-secret-here
GOOGLE_CLIENT_ID=your-client-id (optional)
GOOGLE_CLIENT_SECRET=your-secret (optional)
GOOGLE_CALLBACK_URL=https://your-app.railway.app/api/auth/google/callback
```

**Generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Quick Commands

```bash
# Fix and deploy
git add Dockerfile .dockerignore railway.json
git commit -m "Fix Railway deployment"
git push

# Watch deployment
railway logs --follow

# Test after deploy
curl https://your-app.railway.app/api/health
```

---

## 📞 Still Need Help?

### Check:
1. ✅ Railway Status: https://railway.app/status
2. ✅ Build Logs: Railway Dashboard → Deployments
3. ✅ Service Logs: Railway Dashboard → Logs

### Ask for Help:
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

---

## ✅ Next Steps After Fix

Once deployment succeeds:

1. **Initialize database** (commands above)
2. **Change admin password** (login and update in admin panel)
3. **Add your content** (projects, team info, etc.)
4. **Custom domain** (optional, in Railway settings)
5. **Share your portfolio!** 🎉

---

**TL;DR:** Push the new Dockerfile to GitHub, Railway will auto-rebuild and it should work! ✨

