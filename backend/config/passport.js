const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { query } = require('../database/db');

module.exports = function(passport) {
    // ==================== LOCAL STRATEGY ====================
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // Find user by email
                const result = await query(
                    'SELECT * FROM users WHERE email = $1',
                    [email.toLowerCase()]
                );

                if (result.rows.length === 0) {
                    return done(null, false, { message: 'No user found with that email' });
                }

                const user = result.rows[0];

                // Check if user has a password (not Google OAuth only)
                if (!user.password) {
                    return done(null, false, { message: 'Please login with Google' });
                }

                // Verify password
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);

            } catch (error) {
                return done(error);
            }
        }
    ));

    // ==================== GOOGLE STRATEGY ====================
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists with this Google ID
                let result = await query(
                    'SELECT * FROM users WHERE google_id = $1',
                    [profile.id]
                );

                if (result.rows.length > 0) {
                    // User exists, return user
                    return done(null, result.rows[0]);
                }

                // Check if user exists with this email
                const email = profile.emails[0].value;
                result = await query(
                    'SELECT * FROM users WHERE email = $1',
                    [email.toLowerCase()]
                );

                if (result.rows.length > 0) {
                    // Email exists, link Google account
                    const updateResult = await query(
                        'UPDATE users SET google_id = $1, profile_picture = $2, updated_at = CURRENT_TIMESTAMP WHERE email = $3 RETURNING *',
                        [profile.id, profile.photos[0]?.value, email.toLowerCase()]
                    );
                    return done(null, updateResult.rows[0]);
                }

                // Create new user
                const name = profile.displayName || profile.name?.givenName || 'User';
                const newUserResult = await query(
                    'INSERT INTO users (email, google_id, name, profile_picture, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [email.toLowerCase(), profile.id, name, profile.photos[0]?.value, 'user']
                );

                return done(null, newUserResult.rows[0]);

            } catch (error) {
                return done(error);
            }
        }
    ));

    // ==================== SERIALIZATION ====================
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const result = await query('SELECT id, email, name, role, is_admin, profile_picture FROM users WHERE id = $1', [id]);
            done(null, result.rows[0]);
        } catch (error) {
            done(error);
        }
    });
};

