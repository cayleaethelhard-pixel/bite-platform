// server/routes/dashboard.js
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Middleware to verify JWT token
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

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const { userId, role } = req.user;

    // Get basic user info
    const userResult = await db.query(
      'SELECT id, full_name, email, role, tier, profile_picture_url FROM users WHERE id = $1',
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
      roleData,
      dashboardWidgets: getDashboardWidgets(role, user.tier, roleData)
    });

  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Helper function to generate dashboard widgets based on role
const getDashboardWidgets = (role, tier, roleData) => {
  const baseWidgets = [
    {
      id: 'recent-activity',
      title: 'Recent Activity',
      type: 'activity',
      data: [
        { message: 'New message from Startup XYZ', timestamp: new Date().toISOString() },
        { message: 'Match found with Student ABC', timestamp: new Date().toISOString() },
        { message: 'Project update from Business 123', timestamp: new Date().toISOString() }
      ]
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions',
      type: 'actions',
      data: ['Send Message', 'Find Matches', 'Upgrade Plan']
    }
  ];

  // Helper: Check if user has at least Pro access
  const isPro = (t) => t !== 'Free';
  const isCareerPlus = (t) => t === 'Career+';
  const isProFounder = (t) => t === 'Pro Founder';
  const isTalentPlus = (t) => t === 'Talent+';
  const isProInvestor = (t) => t === 'Pro Investor';

  switch (role) {
    case 'student':
      const studentWidgets = [];
      // All students get project showcase
      studentWidgets.push({
        id: 'project-showcase',
        title: 'Project Showcase',
        type: 'projects',
        data: [
          { title: 'Academic Project', description: 'Machine Learning Model' },
          { title: 'Personal Project', description: 'Mobile App Development' }
        ]
      });
      // Pro+ features
      if (isPro(tier)) {
        studentWidgets.push({
          id: 'career-analytics',
          title: 'Career Analytics',
          type: 'analytics',
          data: { message: 'Engagement Metrics & Success Rates' }
        });
      }
      if (isCareerPlus(tier)) {
        studentWidgets.push({
          id: 'global-certificates',
          title: 'Global Certificates',
          type: 'certificates',
          data: { message: 'Earn certificates for verified experiences' }
        });
      }
      return [...studentWidgets, ...baseWidgets];

    case 'startup':
      const startupWidgets = [];
      if (isPro(tier)) {
        startupWidgets.push({
          id: 'tailored-matching',
          title: 'Tailored Matching',
          type: 'matching',
          data: { message: 'AI-powered student matching' }
        });
        startupWidgets.push({
          id: 'project-management',
          title: 'Project Management',
          type: 'projects',
          data: [
            { name: 'Mobile App Development', status: 'Active', progress: 75 }
          ]
        });
      }
      if (isProFounder(tier)) {
        startupWidgets.push({
          id: 'investor-discovery',
          title: 'Investor Discovery',
          type: 'investors',
          data: [
            { name: 'Venture Capital Firm', focus: 'Tech-focused investments' }
          ]
        });
      }
      return [...startupWidgets, ...baseWidgets];

    case 'business':
      const businessWidgets = [];
      if (isPro(tier)) {
        businessWidgets.push({
          id: 'internship-pipeline',
          title: 'Internship Pipeline',
          type: 'pipeline',
          data: [
            { name: 'John Doe', status: 'Interview' },
            { name: 'Jane Smith', status: 'Offered' }
          ]
        });
        businessWidgets.push({
          id: 'mentor-analytics',
          title: 'Mentor Analytics',
          type: 'analytics',
          data: { message: 'Mentorship Impact Metrics' }
        });
      }
      if (isTalentPlus(tier)) {
        businessWidgets.push({
          id: 'global-access',
          title: 'Global Access',
          type: 'global',
          data: { message: 'Manage candidates across regions' }
        });
      }
      return [...businessWidgets, ...baseWidgets];

    case 'investor':
      const investorWidgets = [];
      if (isPro(tier)) {
        investorWidgets.push({
          id: 'investment-analytics',
          title: 'Investment Analytics',
          type: 'analytics',
          data: { message: 'Performance Indicators' }
        });
        investorWidgets.push({
          id: 'portfolio-tracking',
          title: 'Portfolio Tracking',
          type: 'portfolio',
          data: [
            { name: 'Tech Startup A', value: '+$2.5M' },
            { name: 'Health Startup B', value: '-$0.8M' }
          ]
        });
      }
      if (isProInvestor(tier)) {
        investorWidgets.push({
          id: 'exclusive-pitches',
          title: 'Exclusive Pitches',
          type: 'pitches',
          data: [
            { title: 'AI Healthcare Platform', stage: 'Series A - $5M' }
          ]
        });
      }
      return [...investorWidgets, ...baseWidgets];

    default:
      return baseWidgets;
  }
};

module.exports = router;