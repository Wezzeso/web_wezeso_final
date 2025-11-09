// ==================== AUTHENTICATION SYSTEM ====================
// Client-side authentication using localStorage

// Initialize users array from localStorage or create default admin
function initializeUsers() {
    const users = localStorage.getItem('users');
    if (!users) {
        // Create default admin user
        const defaultUsers = [
            {
                id: 1,
                email: 'admin@portfoliohub.com',
                password: hashPassword('Admin@123'),
                name: 'Admin',
                role: 'admin',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        localStorage.setItem('userIdCounter', '2');
    }
}

// Simple hash function (for demo purposes - in production use proper crypto)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Verify password
function verifyPassword(inputPassword, storedHash) {
    return hashPassword(inputPassword) === storedHash;
}

// Get all users
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Find user by email
function findUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Register new user
function registerUser(name, email, password) {
    const users = getUsers();
    
    // Check if user exists
    if (findUserByEmail(email)) {
        throw new Error('Email already registered');
    }

    // Validate password
    const validation = validatePassword(password);
    if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
    }

    // Create new user
    const userIdCounter = parseInt(localStorage.getItem('userIdCounter') || '2');
    const newUser = {
        id: userIdCounter,
        email: email.toLowerCase(),
        password: hashPassword(password),
        name: name,
        role: 'user',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem('userIdCounter', (userIdCounter + 1).toString());

    return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
    };
}

// Login user
function loginUser(email, password) {
    const user = findUserByEmail(email);
    
    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (!verifyPassword(password, user.password)) {
        throw new Error('Invalid email or password');
    }

    // Create session
    const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');

    return userData;
}

// Logout user
function logoutUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true' && getCurrentUser() !== null;
}

// Validate password strength
function validatePassword(password) {
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// ==================== UI FUNCTIONS ====================

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.form-content').forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + 'Form').classList.add('active');
        clearAlerts();
    });
});

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.target.closest('button').querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Password strength checker
const registerPassword = document.getElementById('registerPassword');
registerPassword.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength() {
    const password = registerPassword.value;
    const strength = document.getElementById('passwordStrength');
    const requirements = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Update requirements
    Object.keys(requirements).forEach(key => {
        const elem = document.getElementById(`req-${key}`);
        if (requirements[key]) {
            elem.classList.add('valid');
        } else {
            elem.classList.remove('valid');
        }
    });

    // Calculate strength
    const score = Object.values(requirements).filter(Boolean).length;
    strength.className = 'password-strength';
    if (score <= 2) {
        strength.classList.add('strength-weak');
        strength.querySelector('.strength-text').textContent = 'Weak password';
    } else if (score <= 4) {
        strength.classList.add('strength-medium');
        strength.querySelector('.strength-text').textContent = 'Medium password';
    } else {
        strength.classList.add('strength-strong');
        strength.querySelector('.strength-text').textContent = 'Strong password';
    }
}

// Alert functions
function showAlert(message, type = 'error') {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => container.innerHTML = '', 5000);
}

function clearAlerts() {
    document.getElementById('alertContainer').innerHTML = '';
}

// Login form submission
document.getElementById('loginFormSubmit').addEventListener('submit', (e) => {
    e.preventDefault();
    clearAlerts();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const user = loginUser(email, password);
        showAlert('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        showAlert(error.message);
    }
});

// Register form submission
document.getElementById('registerFormSubmit').addEventListener('submit', (e) => {
    e.preventDefault();
    clearAlerts();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const user = registerUser(name, email, password);
        showAlert('Registration successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        showAlert(error.message);
    }
});

// Initialize users on page load
initializeUsers();

