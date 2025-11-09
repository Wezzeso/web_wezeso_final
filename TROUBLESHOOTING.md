# 🔧 Deployment Troubleshooting Guide

## Common Issues and Solutions

### 🗄️ Database Issues

#### Issue: "Connection to database failed"

**Symptoms:**
```
Error: connect ECONNREFUSED
FATAL: password authentication failed
```

**Solutions:**

1. **Check DATABASE_URL format**:
```env
# Correct format:
DATABASE_URL=postgresql://user:password@host:port/database

# Railway/Render auto-format:
DATABASE_URL=postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway
```

2. **Enable SSL for production**:
```javascript
// backend/database/db.js
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
});
```

3. **Test connection manually**:
```bash
# Using psql
psql "postgresql://user:pass@host:port/db"

# Using Railway CLI
railway run psql $DATABASE_URL
```

---

#### Issue: "Table does not exist"

**Symptoms:**
```
ERROR: relation "users" does not exist
```

**Solution:**

Run database initialization:
```bash
# Railway
railway run node backend/database/init.js

# Render
npm run init-db

# Local/VPS
cd backend && node database/init.js
```

---

#### Issue: "Too many connections"

**Symptoms:**
```
ERROR: sorry, too many clients already
```

**Solution:**

Update pool configuration in `backend/database/db.js`:
```javascript
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // Maximum connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
```

---

### 🔐 Authentication Issues

#### Issue: "Google OAuth redirect_uri_mismatch"

**Symptoms:**
```
Error 400: redirect_uri_mismatch
```

**Solution:**

1. **Go to Google Cloud Console** → Credentials
2. **Edit OAuth 2.0 Client**
3. **Add ALL possible redirect URIs**:
```
http://localhost:3000/api/auth/google/callback
https://yourdomain.com/api/auth/google/callback
https://your-app.railway.app/api/auth/google/callback
```

4. **Update environment variable**:
```env
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
```

---

#### Issue: "Session not persisting"

**Symptoms:**
- User logs in but immediately logged out
- Session lost on page refresh

**Solutions:**

1. **Check session secret is set**:
```env
SESSION_SECRET=use-a-long-random-string-here
```

2. **Enable credentials in CORS**:
```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true // IMPORTANT!
}));
```

3. **Check cookie settings**:
```javascript
app.use(session({
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));
```

---

### 🌐 CORS Issues

#### Issue: "CORS policy: No 'Access-Control-Allow-Origin'"

**Symptoms:**
```
Access to fetch at 'https://backend.com/api' from origin 'https://frontend.com'
has been blocked by CORS policy
```

**Solution:**

1. **Update CORS configuration** in `backend/server.js`:
```javascript
app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
        'https://yourdomain.com',
        'https://your-frontend.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

2. **Add CORS headers for file uploads**:
```javascript
app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
}, express.static(path.join(__dirname, 'uploads')));
```

---

### 📁 File Upload Issues

#### Issue: "File upload fails / ENOENT error"

**Symptoms:**
```
Error: ENOENT: no such file or directory, open 'uploads/...'
```

**Solutions:**

1. **Create uploads directory** on deployment:

Add to `backend/server.js`:
```javascript
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
```

2. **Use Cloudinary instead** (recommended for production):

See deployment guide for Cloudinary setup.

3. **Check file permissions** (VPS only):
```bash
chmod -R 755 /var/www/portfolio/backend/uploads
chown -R www-data:www-data /var/www/portfolio/backend/uploads
```

---

### 🚀 Deployment Platform Issues

#### Railway Issues

**Build fails:**
```bash
# Check build logs in Railway dashboard
# Common fix: Ensure package.json is in correct location
```

**Database not connecting:**
```bash
# Railway auto-injects DATABASE_URL
# Don't override it manually
# Just use: process.env.DATABASE_URL
```

**Static files not serving:**
```javascript
// Ensure this line is in server.js:
app.use(express.static(path.join(__dirname, '../')));
```

---

#### Vercel Issues

**API routes return 404:**

Create `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend.railway.app/api/:path*"
    }
  ]
}
```

**Environment variables not working:**
- Must prefix with `NEXT_PUBLIC_` for client-side
- Redeploy after changing variables

---

#### Render Issues

**Free tier sleeps after inactivity:**

Solution: Use a uptime monitor to ping every 14 minutes, or upgrade to paid tier.

**Build timeout:**

Increase build command timeout:
```json
{
  "build": {
    "timeout": 600
  }
}
```

---

### 🔒 SSL/HTTPS Issues

#### Issue: "Mixed content warnings"

**Symptoms:**
```
Mixed Content: The page was loaded over HTTPS, but requested an insecure resource
```

**Solution:**

Update all URLs to use HTTPS:
```javascript
// Change API URL to HTTPS
const API_URL = 'https://your-backend.com/api';

// Update image URLs
<img src="https://yourdomain.com/uploads/image.jpg" />
```

---

#### Issue: "Certificate not valid"

**Solution for DigitalOcean:**
```bash
# Renew certificate
certbot renew

# If fails, get new one
certbot --nginx -d yourdomain.com --force-renewal
```

---

### 🐛 Common JavaScript Errors

#### Issue: "Cannot read property of undefined"

**Check in browser console:**

1. **API not responding:**
```javascript
// Add error handling
async function loadProjects() {
    try {
        const response = await fetch('http://localhost:3000/api/projects');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load projects:', error);
        return []; // Return empty array as fallback
    }
}
```

2. **DOM elements not found:**
```javascript
// Always check if element exists
const searchPanel = document.getElementById('searchPanel');
if (searchPanel) {
    searchPanel.classList.add('active');
}
```

---

### 📱 Mobile/Responsive Issues

#### Issue: "Buttons not visible on mobile"

**Check:**

1. **Viewport meta tag** in HTML:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. **Media queries** in CSS:
```css
@media (max-width: 768px) {
    .btn-login, .btn-signup {
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
    }
}
```

---

### ⚡ Performance Issues

#### Issue: "Slow page load"

**Solutions:**

1. **Compress images:**
```bash
# Use tools like ImageOptim, TinyPNG
# Or add sharp package for automatic compression
npm install sharp
```

2. **Enable gzip compression:**
```javascript
const compression = require('compression');
app.use(compression());
```

3. **Add caching headers:**
```javascript
app.use('/uploads', (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=31536000'); // 1 year
    next();
}, express.static('uploads'));
```

4. **Use CDN** for static assets (Cloudflare)

---

### 🔍 Search Not Working

#### Issue: "Search returns no results"

**Check:**

1. **Projects loaded:**
```javascript
console.log('All projects:', allProjects);
// Should show array of projects
```

2. **API endpoint:**
```javascript
// Test in browser
fetch('http://localhost:3000/api/projects')
    .then(r => r.json())
    .then(console.log);
```

3. **Search query:**
```javascript
// Add debug logging
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    console.log('Searching for:', query);
    const results = filterProjects(query);
    console.log('Found results:', results.length);
});
```

---

### 🗺️ Environment Variables Checklist

**Required variables:**
```env
✅ DATABASE_URL
✅ SESSION_SECRET
✅ NODE_ENV=production
✅ PORT (usually auto-set)
✅ GOOGLE_CLIENT_ID (if using OAuth)
✅ GOOGLE_CLIENT_SECRET (if using OAuth)
✅ GOOGLE_CALLBACK_URL (if using OAuth)
✅ FRONTEND_URL (for CORS)
```

**Optional but recommended:**
```env
CLOUDINARY_CLOUD_NAME (for file uploads)
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
ADMIN_EMAIL (for notifications)
```

---

## 🧪 Testing Checklist

Before considering deployment complete, test:

- ✅ Homepage loads
- ✅ All portfolio pages load
- ✅ Theme toggle works
- ✅ Search works
- ✅ Login page loads
- ✅ Registration works
- ✅ Login works
- ✅ Google OAuth works
- ✅ Admin panel accessible (when logged in as admin)
- ✅ File uploads work
- ✅ Projects display correctly
- ✅ Mobile responsive
- ✅ HTTPS enabled
- ✅ No console errors

---

## 🆘 Still Having Issues?

### Debug Steps:

1. **Check logs:**
```bash
# Railway
railway logs

# Render  
# Check logs in dashboard

# DigitalOcean
pm2 logs
```

2. **Test locally first:**
```bash
cd backend
npm install
node database/init.js
node server.js
```

3. **Check network tab** in browser DevTools
   - Look for failed requests
   - Check response codes and bodies

4. **Verify environment variables:**
```bash
# Railway
railway variables

# Or check in platform dashboard
```

5. **Test API endpoints directly:**
```bash
# Health check
curl https://yourdomain.com/api/health

# Projects
curl https://yourdomain.com/api/projects

# Should return JSON responses
```

---

## 📞 Getting Help

If you're still stuck:

1. **Check platform status pages:**
   - [Railway Status](https://railway.app/status)
   - [Vercel Status](https://vercel-status.com)
   - [Render Status](https://status.render.com)

2. **Platform communities:**
   - Railway Discord
   - Vercel Discord  
   - Render Community

3. **Stack Overflow** with tags:
   - `node.js`
   - `express`
   - `postgresql`
   - `deployment`

---

## 💡 Pro Tips

1. **Always test locally** before deploying
2. **Use staging environment** before production
3. **Keep backups** of database
4. **Monitor uptime** with external service
5. **Set up error tracking** (Sentry)
6. **Version control** everything (Git)
7. **Document** your specific setup
8. **Update dependencies** regularly

---

**Remember:** Most deployment issues are due to:
1. Missing environment variables (40%)
2. Database connection problems (30%)
3. CORS configuration (20%)
4. File paths (10%)

Check these first! 🎯

