const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { query } = require('../database/db');
const { validatePassword } = require('../middleware/auth');

// ==================== REGISTER ====================
router.post('/register',
    [
        body('email').isEmail().normalizeEmail(),
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;

        try {
            // Validate password strength
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.isValid) {
                return res.status(400).json({ errors: passwordValidation.errors });
            }

            // Check if user already exists
            const existingUser = await query(
                'SELECT * FROM users WHERE email = $1',
                [email.toLowerCase()]
            );

            if (existingUser.rows.length > 0) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const result = await query(
                'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
                [email.toLowerCase(), hashedPassword, name, 'user']
            );

            const newUser = result.rows[0];

            // Log the user in
            req.login(newUser, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error logging in after registration' });
                }
                res.status(201).json({ 
                    message: 'Registration successful!',
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        name: newUser.name,
                        role: newUser.role
                    }
                });
            });

        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Error during registration' });
        }
    }
);

// ==================== LOGIN ====================
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Error during authentication' });
        }
        if (!user) {
            return res.status(401).json({ error: info.message || 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error logging in' });
            }
            res.json({
                message: 'Login successful!',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isAdmin: user.is_admin
                }
            });
        });
    })(req, res, next);
});

// ==================== GOOGLE AUTH ====================
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect(req.user.is_admin ? '/admin' : '/');
    }
);

// ==================== LOGOUT ====================
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.json({ message: 'Logout successful' });
    });
});

// ==================== CHECK AUTH STATUS ====================
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                name: req.user.name,
                role: req.user.role,
                isAdmin: req.user.is_admin,
                profilePicture: req.user.profile_picture
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router;

