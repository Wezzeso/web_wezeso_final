# 🚀 Quick Deploy Guide - Railway (5 Minutes)

## Fastest Way to Deploy Your Portfolio

### Prerequisites
- GitHub account
- Railway account (free - [railway.app](https://railway.app))

---

## Step 1: Push to GitHub (2 minutes)

```bash
# In your project folder
git init
git add .
git commit -m "Ready for deployment"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/portfolio-hub.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Railway (2 minutes)

1. **Go to** [railway.app](https://railway.app)
2. **Click** "Login with GitHub"
3. **Click** "New Project"
4. **Select** "Deploy from GitHub repo"
5. **Choose** your portfolio-hub repository
6. **Click** "Deploy Now"

✅ Railway will automatically start building!

---

## Step 3: Add Database (30 seconds)

1. **In your Railway project**, click **"+ New"**
2. **Select** "Database" → "PostgreSQL"
3. **Done!** Railway auto-connects it

---

## Step 4: Set Environment Variables (1 minute)

1. **Click** on your web service
2. **Go to** "Variables" tab
3. **Add these variables:**

```env
SESSION_SECRET=your-random-secret-generate-one-below
NODE_ENV=production
```

**Generate SESSION_SECRET:**
```bash
# Run this in your terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output and use it as SESSION_SECRET
```

**Optional - For Google Login:**
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://your-app-name.up.railway.app/api/auth/google/callback
```

---

## Step 5: Initialize Database (30 seconds)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Initialize database
railway run node backend/database/init.js
```

**Alternative without CLI:**

Add this to your `railway.json`:
```json
{
  "deploy": {
    "startCommand": "cd backend && node database/init.js && npm start"
  }
}
```

Then push to GitHub:
```bash
git add railway.json
git commit -m "Auto-initialize database"
git push
```

---

## Step 6: Get Your URL (10 seconds)

1. **In Railway dashboard**, click "Settings"
2. **Click** "Generate Domain"
3. **Copy** your URL: `https://your-app-name.up.railway.app`

---

## ✅ Test Your Deployment

Visit these URLs:

```
✅ Homepage: https://your-app.up.railway.app/
✅ API Health: https://your-app.up.railway.app/api/health
✅ Login Page: https://your-app.up.railway.app/login
```

---

## 🔧 If Google OAuth Needed

1. **Go to** [Google Cloud Console](https://console.cloud.google.com)
2. **APIs & Services** → **Credentials**
3. **Click** your OAuth 2.0 Client
4. **Add** to Authorized redirect URIs:
   ```
   https://your-app-name.up.railway.app/api/auth/google/callback
   ```
5. **Save**

---

## 🎉 You're Live!

Your portfolio is now deployed at:
```
https://your-app-name.up.railway.app
```

### Default Login:
- **Email:** admin@example.com
- **Password:** Admin123!@#

**⚠️ IMPORTANT:** Change this password immediately in the admin panel!

---

## 📝 Next Steps

### Add Custom Domain (Optional)
1. **In Railway**, go to Settings → Domains
2. **Click** "Custom Domain"
3. **Enter** your domain (e.g., portfolio.com)
4. **Update** your DNS records as shown

### Update Frontend Links
If you deployed frontend separately (Vercel/Netlify):

1. **Update API URL** in your frontend code
2. **Update CORS** in `backend/server.js`:
```javascript
app.use(cors({
    origin: [
        'https://your-frontend.vercel.app',
        'https://your-app.railway.app'
    ],
    credentials: true
}));
```

---

## 🔄 Auto-Deploy on Push

Railway automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update portfolio"
git push

# Railway deploys automatically!
```

---

## 💰 Costs

Railway Free Tier includes:
- ✅ $5 credit per month
- ✅ PostgreSQL database
- ✅ 500 execution hours
- ✅ Unlimited projects

**Good for:** Personal portfolio, learning, testing

**Upgrade when:** Getting real traffic, need more resources

---

## 🐛 Quick Troubleshooting

### Build Failed
**Check logs in Railway dashboard**

Common fixes:
```bash
# Ensure package.json exists in backend folder
# Verify all dependencies are listed
cd backend
npm install
```

### Database Connection Error
**Railway auto-injects DATABASE_URL** - don't override it!

### 404 on Login Page
**Check server.js has this:**
```javascript
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
```

### Files Upload Not Working
**Use Cloudinary** for production - see main deployment guide

---

## 📚 Resources

- 🚂 [Railway Docs](https://docs.railway.app)
- 📖 [Full Deployment Guide](./DEPLOYMENT_GUIDE.md)
- 🔧 [Troubleshooting](./TROUBLESHOOTING.md)
- 💬 [Railway Discord](https://discord.gg/railway)

---

## ⚡ Super Quick Deploy (One-Click)

Click this button to deploy to Railway instantly:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/YOUR-USERNAME/portfolio-hub)

*(Update the URL with your GitHub repo)*

---

**That's it! 🎉**

Your portfolio is live and ready to impress!

Need help? Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

