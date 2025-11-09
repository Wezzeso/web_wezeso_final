# Portfolio Hub Backend

Complete backend system with PostgreSQL database, authentication (local + Google OAuth), and admin panel for managing team portfolios.

## 🚀 Features

- ✅ User registration with strong password validation
- ✅ Email/Password authentication
- ✅ Google OAuth 2.0 authentication
- ✅ PostgreSQL database
- ✅ Admin panel for managing projects/cases
- ✅ File upload for project images
- ✅ RESTful API
- ✅ Session management
- ✅ Security middleware (Helmet, Rate Limiting)
- ✅ CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Google OAuth credentials (for Google login)

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup PostgreSQL Database

Create a new PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE portfolio_hub;
\q
```

### 3. Configure Environment Variables

Copy `env.example` to `.env` and update the values:

```bash
cp env.example .env
```

Edit `.env` file:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_hub
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Session
SESSION_SECRET=generate_a_random_secret_key_here

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5500
```

### 4. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

### 5. Initialize Database

Run the database initialization script:

```bash
npm run init-db
```

This will:
- Create all necessary tables
- Add default team members
- Create admin user (email: admin@portfoliohub.com, password: Admin@123)

**⚠️ IMPORTANT: Change the default admin password after first login!**

### 6. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will be running at: `http://localhost:3000`

## 🔐 Default Admin Credentials

```
Email: admin@portfoliohub.com
Password: Admin@123
```

**⚠️ Change this password immediately after first login!**

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/google` - Login with Google
- `GET /api/auth/status` - Check authentication status

### Team Members

- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get team member by ID
- `POST /api/team` - Create team member (Admin only)
- `PUT /api/team/:id` - Update team member (Admin only)
- `DELETE /api/team/:id` - Delete team member (Admin only)

### Projects/Cases

- `GET /api/projects` - Get all projects
- `GET /api/projects/member/:memberId` - Get projects by team member
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Admin

- `GET /api/admin/dashboard` - Get dashboard stats (Admin only)
- `POST /api/admin/upload` - Upload image (Admin only)

## 🔒 Password Requirements

Passwords must meet the following criteria:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*(),.?":{}|<>)

## 📁 File Upload

- Supported formats: JPEG, JPG, PNG, GIF, WEBP
- Max file size: 5MB
- Uploaded files stored in `backend/uploads/`

## 🎯 Usage

### 1. Access the Login Page

```
http://localhost:3000/login
```

### 2. Access the Admin Panel

```
http://localhost:3000/admin
```

(You must be logged in as admin)

### 3. Register a New User

Send POST request to:
```
http://localhost:3000/api/auth/register
```

Body:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

### 4. Login

Send POST request to:
```
http://localhost:3000/api/auth/login
```

Body:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

## 🗄️ Database Schema

### Tables

1. **users** - User accounts
2. **team_members** - Team member profiles
3. **projects** - Portfolio projects/cases
4. **sessions** - User sessions

See `database/schema.sql` for full schema.

## 🔧 Troubleshooting

### Database Connection Error

- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database exists

### Google OAuth Not Working

- Verify Google Cloud Console setup
- Check redirect URI matches exactly
- Ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct

### Session Issues

- Clear browser cookies
- Check SESSION_SECRET is set
- Verify sessions table exists in database

## 📝 Development Notes

- Sessions stored in PostgreSQL for scalability
- Passwords hashed with bcrypt (10 rounds)
- Rate limiting: 100 requests per 15 minutes
- CORS enabled for frontend communication
- Helmet.js for security headers

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use strong SESSION_SECRET
3. Enable HTTPS
4. Set secure cookie flags
5. Use environment-specific database
6. Set up proper CORS origins
7. Configure reverse proxy (nginx)
8. Enable database backups

## 📞 Support

For issues or questions, check the main README or contact the development team.

---

**Built with Node.js, Express, PostgreSQL, and Passport.js**

