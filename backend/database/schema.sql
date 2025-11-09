-- Portfolio Hub Database Schema

-- Create database (run this separately if needed)
-- CREATE DATABASE portfolio_hub;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) UNIQUE,
    profile_picture VARCHAR(500),
    role VARCHAR(50) DEFAULT 'user',
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    description TEXT,
    profile_picture VARCHAR(500),
    email VARCHAR(255),
    telegram VARCHAR(255),
    instagram VARCHAR(255),
    github VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects/Cases table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    team_member_id INTEGER REFERENCES team_members(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT[],
    tags TEXT[],
    thumbnail VARCHAR(500),
    images TEXT[],
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    year INTEGER,
    duration VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table for express-session
CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (sid) NOT COLLATE "default"
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions (expire);

-- Insert default team members
INSERT INTO team_members (name, role, specialty, description, email, telegram, instagram, github, order_index) VALUES
('Wezeso', 'UI/UX & Branding Designer', 'Design', 'Creating meaningful digital experiences and memorable brand identities. Specialized in user research, interface design, and brand strategy.', 'wezeso@example.com', '@wezeso', '@wezeso', 'wezeso', 1),
('Sardor', 'Full-Stack Developer', 'Full-Stack', 'Building scalable web applications with modern technologies. Passionate about clean code, best practices, and creating efficient solutions.', 'sardor@example.com', '@sardor', '@sardor', 'sardor', 2),
('Alikhan', 'Backend Developer', 'Backend', 'Designing and implementing robust backend systems and APIs. Focused on performance, security, and database optimization.', 'alikhan@example.com', '@alikhan', '@alikhan', 'alikhan', 3),
('Amirkhan', 'Frontend Developer', 'Frontend', 'Crafting beautiful and responsive user interfaces with modern frameworks. Dedicated to pixel-perfect designs and smooth user experiences.', 'amirkhan@example.com', '@amirkhan', '@amirkhan', 'amirkhan', 4)
ON CONFLICT DO NOTHING;

-- Create admin user (password: Admin@123)
-- Password hash for 'Admin@123'
INSERT INTO users (email, password, name, role, is_admin) VALUES
('admin@portfoliohub.com', '$2b$10$XZ8QGvFqGp7YpCjH5.5qkOXWz2K8qQE6/5JvYmz8bKqvqM2N8QF.K', 'Admin User', 'admin', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

