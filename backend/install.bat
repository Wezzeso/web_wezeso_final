@echo off
echo ========================================
echo Portfolio Hub Backend Installation
echo ========================================
echo.

echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found: 
node --version

echo.
echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.

if not exist ".env" (
    echo Creating .env file...
    copy env.example .env
    echo.
    echo IMPORTANT: Edit .env file and set:
    echo   - DB_PASSWORD
    echo   - SESSION_SECRET
    echo   - Optional: Google OAuth credentials
    echo.
    echo Press any key when you've updated .env file...
    pause >nul
)

echo.
echo Initializing database...
echo This will create tables and default data.
echo.
call npm run init-db

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Database initialization failed
    echo.
    echo Troubleshooting:
    echo 1. Make sure PostgreSQL is running
    echo 2. Check database credentials in .env
    echo 3. Ensure database 'portfolio_hub' exists
    echo.
    echo To create database manually:
    echo   psql -U postgres
    echo   CREATE DATABASE portfolio_hub;
    echo   \q
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Start the server with:
echo   npm run dev         (development)
echo   npm start           (production)
echo.
echo Server will run at: http://localhost:3000
echo.
echo Default admin login:
echo   Email: admin@portfoliohub.com
echo   Password: Admin@123
echo.
echo CHANGE THE ADMIN PASSWORD AFTER FIRST LOGIN!
echo.
pause

