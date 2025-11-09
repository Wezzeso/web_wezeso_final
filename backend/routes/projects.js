const express = require('express');
const router = express.Router();
const { query } = require('../database/db');
const { ensureAdmin } = require('../middleware/auth');

// ==================== GET ALL PROJECTS ====================
router.get('/', async (req, res) => {
    try {
        const result = await query(
            `SELECT p.*, tm.name as member_name, tm.role as member_role
            FROM projects p
            LEFT JOIN team_members tm ON p.team_member_id = tm.id
            WHERE p.is_published = TRUE
            ORDER BY p.is_featured DESC, p.order_index ASC, p.created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Error fetching projects' });
    }
});

// ==================== GET PROJECTS BY TEAM MEMBER ====================
router.get('/member/:memberId', async (req, res) => {
    try {
        const { memberId } = req.params;
        const result = await query(
            'SELECT * FROM projects WHERE team_member_id = $1 AND is_published = TRUE ORDER BY order_index ASC, created_at DESC',
            [memberId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Error fetching projects' });
    }
});

// ==================== GET PROJECT BY ID ====================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            `SELECT p.*, tm.name as member_name, tm.role as member_role
            FROM projects p
            LEFT JOIN team_members tm ON p.team_member_id = tm.id
            WHERE p.id = $1`,
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Error fetching project' });
    }
});

// ==================== CREATE PROJECT (Admin only) ====================
router.post('/', ensureAdmin, async (req, res) => {
    try {
        const {
            team_member_id, title, category, description,
            challenge, solution, results, tags,
            thumbnail, images, project_url, github_url,
            year, duration, order_index, is_featured, is_published
        } = req.body;

        const result = await query(
            `INSERT INTO projects 
            (team_member_id, title, category, description, challenge, solution, results, tags,
            thumbnail, images, project_url, github_url, year, duration, order_index, is_featured, is_published)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *`,
            [
                team_member_id, title, category, description,
                challenge, solution, results || [], tags || [],
                thumbnail, images || [], project_url, github_url,
                year, duration, order_index || 0, is_featured || false, is_published !== false
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Error creating project' });
    }
});

// ==================== UPDATE PROJECT (Admin only) ====================
router.put('/:id', ensureAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            team_member_id, title, category, description,
            challenge, solution, results, tags,
            thumbnail, images, project_url, github_url,
            year, duration, order_index, is_featured, is_published
        } = req.body;

        const result = await query(
            `UPDATE projects SET
            team_member_id = COALESCE($1, team_member_id),
            title = COALESCE($2, title),
            category = COALESCE($3, category),
            description = COALESCE($4, description),
            challenge = COALESCE($5, challenge),
            solution = COALESCE($6, solution),
            results = COALESCE($7, results),
            tags = COALESCE($8, tags),
            thumbnail = COALESCE($9, thumbnail),
            images = COALESCE($10, images),
            project_url = COALESCE($11, project_url),
            github_url = COALESCE($12, github_url),
            year = COALESCE($13, year),
            duration = COALESCE($14, duration),
            order_index = COALESCE($15, order_index),
            is_featured = COALESCE($16, is_featured),
            is_published = COALESCE($17, is_published),
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $18
            RETURNING *`,
            [
                team_member_id, title, category, description,
                challenge, solution, results, tags,
                thumbnail, images, project_url, github_url,
                year, duration, order_index, is_featured, is_published, id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Error updating project' });
    }
});

// ==================== DELETE PROJECT (Admin only) ====================
router.delete('/:id', ensureAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await query(
            'DELETE FROM projects WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Error deleting project' });
    }
});

module.exports = router;

