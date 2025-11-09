#!/bin/bash

# Portfolio Hub Backend Installation Script

echo "╔═══════════════════════════════════════════╗"
echo "║  Portfolio Hub Backend Installation       ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✓ Node.js found: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✓ npm found: $(npm -v)"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found in PATH."
    echo "   Make sure PostgreSQL is installed and running."
else
    echo "✓ PostgreSQL found"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Check for .env file
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and set:"
    echo "   - DB_PASSWORD"
    echo "   - SESSION_SECRET"
    echo "   - (Optional) Google OAuth credentials"
    echo ""
    read -p "Press Enter when you've updated .env file..."
fi

echo ""
echo "🗄️  Initializing database..."
echo "   This will create tables and default data."
echo ""

npm run init-db

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Database initialization failed"
    echo ""
    echo "Troubleshooting:"
    echo "1. Make sure PostgreSQL is running"
    echo "2. Check database credentials in .env"
    echo "3. Ensure database 'portfolio_hub' exists"
    echo ""
    echo "To create database manually:"
    echo "   psql -U postgres"
    echo "   CREATE DATABASE portfolio_hub;"
    echo "   \\q"
    exit 1
fi

echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║  ✅ Installation Complete!                ║"
echo "╚═══════════════════════════════════════════╝"
echo ""
echo "🚀 Start the server with:"
echo "   npm run dev         (development)"
echo "   npm start           (production)"
echo ""
echo "📍 Server will run at: http://localhost:3000"
echo ""
echo "🔐 Default admin login:"
echo "   Email: admin@portfoliohub.com"
echo "   Password: Admin@123"
echo ""
echo "⚠️  CHANGE THE ADMIN PASSWORD AFTER FIRST LOGIN!"
echo ""

