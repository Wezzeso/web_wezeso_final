# 🚀 Complete Deployment Guide

## Overview

This guide will help you deploy your Portfolio Hub with:
- ✅ Frontend (HTML/CSS/JS)
- ✅ Backend (Node.js/Express)
- ✅ Database (PostgreSQL)
- ✅ File uploads
- ✅ Google OAuth
- ✅ Custom domain (optional)

## 🎯 Recommended Deployment Stack

### Option 1: All-in-One (Easiest)
**Railway** - Deploy everything in one place
- ✅ Free PostgreSQL database
- ✅ Node.js backend
- ✅ Static file serving
- ✅ Automatic deployments
- ✅ Free tier available

### Option 2: Split (Most Popular)
- **Frontend**: Vercel or Netlify (free)
- **Backend + Database**: Railway or Render (free)
- **Files**: Cloudinary or AWS S3 (optional)

### Option 3: Full Control
- **VPS**: DigitalOcean, Linode, or AWS EC2
- **Database**: Managed PostgreSQL
- **Server**: Nginx + PM2
- **SSL**: Let's Encrypt

---

## 🚂 Option 1: Deploy to Railway (Recommended)

Railway is the easiest option and provides everything you need in one place.

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create `.gitignore`** (should already exist):
```gitignore
node_modules/
.env
uploads/
*.log
.DS_Store
```

3. **Push to GitHub**:
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/portfolio-hub.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Railway

1. **Sign up** at [railway.app](https://railway.app)
2. **Click** "New Project"
3. **Select** "Deploy from GitHub repo"
4. **Choose** your portfolio repository

### Step 3: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database" → "PostgreSQL"**
3. Railway will automatically create and connect the database
4. Note: Railway auto-injects `DATABASE_URL` environment variable

### Step 4: Configure Environment Variables

In Railway, go to your service → **Variables** tab:

```env
# Database (auto-configured by Railway)
DATABASE_URL=postgresql://...  # Already set by Railway

# Session
SESSION_SECRET=your-super-secret-key-change-this-to-random-string

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-app.railway.app/api/auth/google/callback

# Environment
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-app.railway.app
```

### Step 5: Update Database Configuration

Update `backend/database/db.js` to use Railway's connection string:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
});

module.exports = { pool };
```

### Step 6: Update Package.json

Add start script in `backend/package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node database/init.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### Step 7: Create Railway.json

Create `railway.json` in project root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install"
  },
  "deploy": {
    "startCommand": "cd backend && npm run init-db && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Step 8: Deploy!

1. **Push to GitHub**:
```bash
git add .
git commit -m "Configure for Railway deployment"
git push
```

2. Railway will **automatically deploy**
3. Wait for build to complete (2-5 minutes)
4. Click **"Generate Domain"** to get your URL

### Step 9: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **APIs & Services** → **Credentials**
3. **Edit** your OAuth 2.0 Client
4. Add authorized redirect URIs:
```
https://your-app.railway.app/api/auth/google/callback
```

### Step 10: Initialize Database

Run once to set up database schema:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run database initialization
railway run node backend/database/init.js
```

### ✅ Done!

Your site is live at: `https://your-app.railway.app`

---

## 🌐 Option 2: Vercel (Frontend) + Railway (Backend)

### Frontend on Vercel

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import** your GitHub repository
3. **Configure**:
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `./`

4. **Add Environment Variables**:
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

5. **Create** `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend.railway.app/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

6. **Deploy**: Vercel auto-deploys on push

### Backend on Railway

Follow steps from Option 1 for Railway backend.

Update `backend/server.js` CORS:
```javascript
app.use(cors({
    origin: [
        'http://localhost:5500',
        'https://your-frontend.vercel.app'
    ],
    credentials: true
}));
```

---

## 🎨 Option 3: Netlify (Frontend) + Render (Backend)

### Frontend on Netlify

1. **Sign up** at [netlify.com](https://netlify.com)
2. **Drag and drop** your folder, or connect GitHub
3. **Build settings**:
   - Base directory: (empty)
   - Build command: (empty)
   - Publish directory: `./`

4. **Create** `_redirects` file in root:
```
/api/*  https://your-backend.onrender.com/api/:splat  200
```

### Backend on Render

1. **Sign up** at [render.com](https://render.com)
2. **New** → **Web Service**
3. **Connect** your GitHub repository
4. **Configure**:
   - Name: `portfolio-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

5. **Add PostgreSQL**:
   - Click **"New +"** → **PostgreSQL**
   - Connect to your web service

6. **Environment Variables**: Same as Railway

---

## 🖥️ Option 4: DigitalOcean VPS (Advanced)

### Step 1: Create Droplet

1. **Sign up** at [digitalocean.com](https://digitalocean.com)
2. **Create Droplet**:
   - Image: Ubuntu 22.04 LTS
   - Plan: Basic ($6/month)
   - Add SSH keys

### Step 2: Initial Server Setup

```bash
# Connect to server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2

# Install certbot for SSL
apt install -y certbot python3-certbot-nginx
```

### Step 3: Set Up PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

### Step 4: Deploy Application

```bash
# Create app directory
mkdir -p /var/www/portfolio
cd /var/www/portfolio

# Clone repository
git clone https://github.com/yourusername/portfolio-hub.git .

# Install dependencies
cd backend
npm install

# Create .env file
nano .env
```

Add your environment variables:
```env
DATABASE_URL=postgresql://portfolio_user:your-secure-password@localhost:5432/portfolio_db
SESSION_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
NODE_ENV=production
PORT=3000
```

```bash
# Initialize database
npm run init-db

# Start with PM2
pm2 start server.js --name portfolio-backend
pm2 save
pm2 startup
```

### Step 5: Configure Nginx

```bash
nano /etc/nginx/sites-available/portfolio
```

Add configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend files
    root /var/www/portfolio;
    index index.html;

    # Frontend routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Uploads
    location /uploads {
        alias /var/www/portfolio/backend/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Login page
    location /login {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Admin page
    location /admin {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 6: Set Up SSL

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 7: Set Up Firewall

```bash
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable
```

---

## 🔐 Security Checklist

### Before Deploying:

- ✅ **Change default passwords**
- ✅ **Use environment variables** for all secrets
- ✅ **Never commit** `.env` file
- ✅ **Enable HTTPS/SSL**
- ✅ **Set up CORS** properly
- ✅ **Use strong session secret**
- ✅ **Enable rate limiting** (already implemented)
- ✅ **Set up database backups**
- ✅ **Update Google OAuth** redirect URLs
- ✅ **Set NODE_ENV=production**

### Generate Strong Session Secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ Database Management

### Backup Database

**Railway/Render**:
```bash
# Using Railway CLI
railway run pg_dump $DATABASE_URL > backup.sql

# Using pg_dump directly
pg_dump postgresql://user:pass@host:port/db > backup.sql
```

**DigitalOcean**:
```bash
pg_dump -U portfolio_user portfolio_db > backup.sql
```

### Restore Database

```bash
psql $DATABASE_URL < backup.sql
```

### Migrations

For schema changes, create migration files:
```bash
# Example: add new column
psql $DATABASE_URL -c "ALTER TABLE projects ADD COLUMN featured BOOLEAN DEFAULT false;"
```

---

## 📁 File Upload Options

### Option A: Store on Server (Simple)
- Files stored in `backend/uploads/`
- Works for small scale
- Need to handle backups

### Option B: Cloudinary (Recommended)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Install: `npm install cloudinary multer-storage-cloudinary`
3. Update `backend/middleware/upload.js`:

```javascript
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    }
});

const upload = multer({ storage: storage });
```

### Option C: AWS S3
Similar setup with `multer-s3` package.

---

## 🌍 Custom Domain Setup

### For Railway/Render/Vercel:

1. **Buy domain** (Namecheap, GoDaddy, Google Domains)
2. **Add custom domain** in platform dashboard
3. **Update DNS records**:
   - Type: `A` or `CNAME`
   - Name: `@` or `www`
   - Value: Provided by platform

### For DigitalOcean:

1. **Add domain** to DigitalOcean
2. **Update nameservers** at domain registrar:
   - `ns1.digitalocean.com`
   - `ns2.digitalocean.com`
   - `ns3.digitalocean.com`
3. **Create DNS records**:
   - A record: `@` → Your droplet IP
   - A record: `www` → Your droplet IP

---

## 🧪 Testing Your Deployment

### Checklist:

```bash
# Test API health
curl https://yourdomain.com/api/health

# Test static files
curl https://yourdomain.com/

# Test login page
curl https://yourdomain.com/login

# Test database connection
# Check logs in platform dashboard
```

### Common Issues:

**Database connection fails**:
- Check `DATABASE_URL` format
- Enable SSL for production: `ssl: { rejectUnauthorized: false }`
- Check database is running

**CORS errors**:
- Update `FRONTEND_URL` in environment
- Add your domain to CORS origins

**File uploads don't work**:
- Check `uploads/` directory exists
- Check write permissions
- Consider using Cloudinary

**Google OAuth fails**:
- Update redirect URIs in Google Console
- Check `GOOGLE_CALLBACK_URL` matches exactly

---

## 📊 Monitoring & Maintenance

### Logging

**Railway**: Built-in logs in dashboard

**DigitalOcean**: View PM2 logs
```bash
pm2 logs portfolio-backend
pm2 monit
```

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com) (free)
- [Pingdom](https://pingdom.com)
- [Better Uptime](https://betteruptime.com)

### Performance Monitoring

- [Google Analytics](https://analytics.google.com)
- [Sentry](https://sentry.io) for error tracking
- [New Relic](https://newrelic.com) for APM

---

## 💰 Cost Estimates

### Free Tier (Good for Portfolio):
- **Railway**: Free PostgreSQL + 500 hrs/month
- **Vercel**: Free frontend hosting
- **Render**: Free PostgreSQL + backend (with sleep)
- **Cloudinary**: 25GB free storage

### Paid (Production Ready):
- **Railway**: ~$5-20/month
- **DigitalOcean**: $6-12/month (VPS)
- **Managed DB**: $15-30/month
- **Domain**: $10-15/year

---

## 🚀 Quick Start Commands

### Deploy to Railway:
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Deploy to Vercel:
```bash
npm install -g vercel
vercel login
vercel
```

### Deploy to Render:
```bash
# Just push to GitHub, Render auto-deploys
git push origin main
```

---

## 📚 Additional Resources

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)

---

## 🆘 Need Help?

Common deployment issues and solutions: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

**Recommended Path for You:**

1. Start with **Railway** (easiest, all-in-one)
2. If you need more control, move to **Vercel + Railway**
3. Once you're comfortable, consider **DigitalOcean VPS**

Choose based on your comfort level and requirements!

