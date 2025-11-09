# Portfolio Hub Backend - Quick Start Guide

## 🚀 Get Started in 5 Minutes!

### Step 1: Install PostgreSQL
Make sure PostgreSQL is installed and running on your system.

### Step 2: Create Database
```bash
# Open PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE portfolio_hub;

# Exit
\q
```

### Step 3: Install Dependencies
```bash
cd backend
npm install
```

### Step 4: Configure Environment
```bash
# Copy env.example to .env
cp env.example .env

# Edit .env file with your database credentials
# For now, you can skip Google OAuth (optional)
```

Minimum required in `.env`:
```
DB_PASSWORD=your_postgres_password
SESSION_SECRET=any_random_long_string_here
```

### Step 5: Initialize Database
```bash
npm run init-db
```

### Step 6: Start Server
```bash
npm run dev
```

## ✅ You're Ready!

Server is running at: **http://localhost:3000**

### Access Points:
- **Login Page**: http://localhost:3000/login
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:3000/api

### Default Admin Login:
```
Email: admin@portfoliohub.com
Password: Admin@123
```

**⚠️ Change this password immediately after first login!**

## 📝 What's Next?

1. **Login** to admin panel
2. **Upload projects** for each team member
3. **Manage** team member profiles
4. **Connect** frontend to backend

## 🔧 Optional: Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:3000/api/auth/google/callback`
5. Copy Client ID and Secret to `.env`

## 🆘 Having Issues?

### Database connection error?
- Check PostgreSQL is running: `brew services list` (Mac) or `sudo service postgresql status` (Linux)
- Verify credentials in `.env`

### Can't login?
- Make sure you ran `npm run init-db`
- Check server logs for errors

### Port 3000 already in use?
- Change PORT in `.env` file
- Or kill process: `lsof -ti:3000 | xargs kill`

---

**Need Help?** Check the full README.md for detailed documentation.

