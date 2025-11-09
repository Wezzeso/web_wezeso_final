const express = require('express');
const router = express.Router();
const { query } = require('../database/db');
const { ensureAdmin } = require('../middleware/auth');

// ==================== GET ALL TEAM MEMBERS ====================
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM team_members WHERE is_active = TRUE ORDER BY order_index ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ error: 'Error fetching team members' });
    }
});

// ==================== GET TEAM MEMBER BY ID ====================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'SELECT * FROM team_members WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Team member not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching team member:', error);
        res.status(500).json({ error: 'Error fetching team member' });
    }
});

// ==================== CREATE TEAM MEMBER (Admin only) ====================
router.post('/', ensureAdmin, async (req, res) => {
    try {
        const {
            name, role, specialty, description,
            profile_picture, email, telegram, instagram, github,
            order_index, is_active
        } = req.body;

        const result = await query(
            `INSERT INTO team_members 
            (name, role, specialty, description, profile_picture, email, telegram, instagram, github, order_index, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`,
            [name, role, specialty, description, profile_picture, email, telegram, instagram, github, order_index || 0, is_active !== false]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ error: 'Error creating team member' });
    }
});

// ==================== UPDATE TEAM MEMBER (Admin only) ====================
router.put('/:id', ensureAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, role, specialty, description,
            profile_picture, email, telegram, instagram, github,
            order_index, is_active
        } = req.body;

        const result = await query(
            `UPDATE team_members SET
            name = COALESCE($1, name),
            role = COALESCE($2, role),
            specialty = COALESCE($3, specialty),
            description = COALESCE($4, description),
            profile_picture = COALESCE($5, profile_picture),
            email = COALESCE($6, email),
            telegram = COALESCE($7, telegram),
            instagram = COALESCE($8, instagram),
            github = COALESCE($9, github),
            order_index = COALESCE($10, order_index),
            is_active = COALESCE($11, is_active),
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $12
            RETURNING *`,
            [name, role, specialty, description, profile_picture, email, telegram, instagram, github, order_index, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ error: 'Error updating team member' });
    }
});

// ==================== DELETE TEAM MEMBER (Admin only) ====================
router.delete('/:id', ensureAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Soft delete (set is_active to false)
        const result = await query(
            'UPDATE team_members SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ error: 'Error deleting team member' });
    }
});

module.exports = router;

