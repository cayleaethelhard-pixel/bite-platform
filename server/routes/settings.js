//server/routes/settings.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Middleware to verify JWT token (reuse from dashboard)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// GET /api/settings/profile - Get full user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { userId, role } = req.user;

    // Get basic user info
    const userResult = await db.query(
      'SELECT id, full_name, email, phone_number, city, country, profile_picture_url, role, tier FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];
    let roleData = null;

    // Get role-specific data
    if (role === 'student') {
      const studentResult = await db.query(
        'SELECT * FROM student_profiles WHERE user_id = $1',
        [userId]
      );
      roleData = studentResult.rows[0] || {};
    } 
    else if (role === 'startup') {
      const startupResult = await db.query(
        'SELECT * FROM startup_profiles WHERE user_id = $1',
        [userId]
      );
      roleData = startupResult.rows[0] || {};
    }
    else if (role === 'business') {
      const businessResult = await db.query(
        'SELECT * FROM business_profiles WHERE user_id = $1',
        [userId]
      );
      roleData = businessResult.rows[0] || {};
    }
    else if (role === 'investor') {
      const investorResult = await db.query(
        'SELECT * FROM investor_profiles WHERE user_id = $1',
        [userId]
      );
      roleData = investorResult.rows[0] || {};
    }

    res.json({
      user,
      roleData
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /api/settings/profile - Update personal info
router.put('/profile', authenticateToken, async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { userId } = req.user;
    const { fullName, email, phoneNumber, city, country, profilePicture } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !city || !country) {
      return res.status(400).json({ error: 'All personal info fields are required' });
    }

    // Check if email is already taken by another user
    const emailCheck = await db.query(
      'SELECT id FROM users WHERE email = $1 AND id != $2',
      [email, userId]
    );
    
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    await client.query('BEGIN');

    // Update user table
    await client.query(
      `UPDATE users 
       SET full_name = $1, email = $2, phone_number = $3, city = $4, country = $5, profile_picture_url = $6 
       WHERE id = $7`,
      [fullName, email, phoneNumber, city, country, profilePicture, userId]
    );

    await client.query('COMMIT');

    res.json({ message: 'Profile updated successfully' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  } finally {
    client.release();
  }
});

// PUT /api/settings/password - Change password
router.put('/password', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Get current password hash
    const userResult = await db.query(
      'SELECT password_hash FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentHash = userResult.rows[0].password_hash;
    const isValid = await bcrypt.compare(currentPassword, currentHash);

    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update password
    await db.query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [newPasswordHash, userId]
    );

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// PUT /api/settings/notifications - Update notification preferences
// For now, we'll store this in a new table (you can implement later)
// For demo, just return success
router.put('/notifications', authenticateToken, async (req, res) => {
  try {
    // In a real app, you'd save to a notifications_preferences table
    // For now, just acknowledge
    console.log('Notification preferences received:', req.body);
    res.json({ message: 'Notification preferences updated' });
  } catch (error) {
    console.error('Update notifications error:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
});

// GET /api/settings/subscription - Get current subscription
router.get('/subscription', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const userResult = await db.query(
      'SELECT tier FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      tier: userResult.rows[0].tier
    });

  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

module.exports = router;