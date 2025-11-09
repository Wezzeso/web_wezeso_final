const express = require('express');
const router = express.Router();
const { query } = require('../database/db');
const { ensureAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes require admin access
router.use(ensureAdmin);

// ==================== DASHBOARD STATS ====================
router.get('/dashboard', async (req, res) => {
    try {
        // Get counts
        const teamCount = await query('SELECT COUNT(*) FROM team_members WHERE is_active = TRUE');
        const projectCount = await query('SELECT COUNT(*) FROM projects WHERE is_published = TRUE');
        const userCount = await query('SELECT COUNT(*) FROM users');
        
        // Get recent projects
        const recentProjects = await query(
            `SELECT p.*, tm.name as member_name 
            FROM projects p 
            LEFT JOIN team_members tm ON p.team_member_id = tm.id 
            ORDER BY p.created_at DESC LIMIT 5`
        );
        
        // Get projects by team member
        const projectsByMember = await query(
            `SELECT tm.name, COUNT(p.id) as project_count
            FROM team_members tm
            LEFT JOIN projects p ON tm.id = p.team_member_id
            WHERE tm.is_active = TRUE
            GROUP BY tm.id, tm.name
            ORDER BY tm.order_index ASC`
        );

        res.json({
            stats: {
                teamMembers: parseInt(teamCount.rows[0].count),
                projects: parseInt(projectCount.rows[0].count),
                users: parseInt(userCount.rows[0].count)
            },
            recentProjects: recentProjects.rows,
            projectsByMember: projectsByMember.rows
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Error fetching dashboard data' });
    }
});

// ==================== UPLOAD IMAGE ====================
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Return the file URL
        const fileUrl = `/uploads/${req.file.filename}`;
        
        res.json({
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
});

// ==================== UPLOAD MULTIPLE IMAGES ====================
router.post('/upload-multiple', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const fileUrls = req.files.map(file => ({
            url: `/uploads/${file.filename}`,
            filename: file.filename,
            size: file.size
        }));

        res.json({
            message: 'Files uploaded successfully',
            files: fileUrls
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Error uploading files' });
    }
});

// ==================== GET ALL USERS (Admin only) ====================
router.get('/users', async (req, res) => {
    try {
        const result = await query(
            'SELECT id, email, name, role, is_admin, created_at FROM users ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// ==================== GET ALL PROJECTS (including unpublished) ====================
router.get('/projects', async (req, res) => {
    try {
        const result = await query(
            `SELECT p.*, tm.name as member_name, tm.role as member_role
            FROM projects p
            LEFT JOIN team_members tm ON p.team_member_id = tm.id
            ORDER BY p.created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Error fetching projects' });
    }
});

// ==================== GET ALL TEAM MEMBERS (including inactive) ====================
router.get('/team', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM team_members ORDER BY order_index ASC, created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ error: 'Error fetching team members' });
    }
});

module.exports = router;

