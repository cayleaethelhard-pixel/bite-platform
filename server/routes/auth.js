// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Helper function to upload profile picture (for now, we'll store as base64)
// In production, you'd want to use cloud storage like AWS S3
const uploadProfilePicture = async (fileData) => {
  // For now, return the base64 string directly
  // In production: upload to cloud storage and return URL
  return fileData;
};

// Register route - handles complete registration flow
router.post('/register', async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const {
      // Personal info
      fullName,
      email,
      password,
      phoneNumber,
      city,
      country,
      profilePicture,
      
      // Role and tier
      role,
      tier,
      
      // Role-specific data
      studentData,
      startupData,
      businessData,
      investorData
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role || !tier) {
      return res.status(400).json({ 
        error: 'Missing required personal information fields' 
      });
    }

    // Check if email already exists
    const emailCheck = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Email already registered' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Start transaction
    await client.query('BEGIN');

    // Insert user into users table
    const userResult = await client.query(
      `INSERT INTO users 
       (full_name, email, password_hash, phone_number, city, country, profile_picture_url, role, tier) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id`,
      [fullName, email, passwordHash, phoneNumber, city, country, profilePicture, role, tier]
    );

    const userId = userResult.rows[0].id;

    // Insert role-specific data based on user role
    if (role === 'student' && studentData) {
      await client.query(
        `INSERT INTO student_profiles 
         (user_id, institution, degree, graduation_year, skills, career_goals, availability, linkedin_profile, portfolio_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          userId,
          studentData.institution,
          studentData.degree,
          parseInt(studentData.graduationYear),
          studentData.skills,
          studentData.careerGoals,
          studentData.availability,
          studentData.linkedinProfile || null,
          studentData.portfolioUrl || null
        ]
      );
    } 
    else if (role === 'startup' && startupData) {
      await client.query(
        `INSERT INTO startup_profiles 
         (user_id, company_name, industry, company_size, team_size, funding_stage, website, hiring_needs, project_description) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          userId,
          startupData.companyName,
          startupData.industry,
          startupData.companySize,
          parseInt(startupData.teamSize),
          startupData.fundingStage,
          startupData.website || null,
          startupData.hiringNeeds,
          startupData.projectDescription
        ]
      );
    }
    else if (role === 'business' && businessData) {
      await client.query(
        `INSERT INTO business_profiles 
         (user_id, company_name, industry, company_size, years_in_business, website, mentorship_program, internship_program, global_presence) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          userId,
          businessData.companyName,
          businessData.industry,
          businessData.companySize,
          parseInt(businessData.yearsInBusiness),
          businessData.website || null,
          businessData.mentorshipProgram,
          businessData.internshipProgram,
          businessData.globalPresence
        ]
      );
    }
    else if (role === 'investor' && investorData) {
      await client.query(
        `INSERT INTO investor_profiles 
         (user_id, firm_name, investment_focus, portfolio_size, average_investment, preferred_industries, investment_stage, geographic_focus, website) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          userId,
          investorData.firmName,
          investorData.investmentFocus,
          investorData.portfolioSize,
          investorData.averageInvestment,
          investorData.preferredIndustries,
          investorData.investmentStage,
          investorData.geographicFocus,
          investorData.website || null
        ]
      );
    }

    // Commit transaction
    await client.query('COMMIT');

    // Generate JWT token
    const token = jwt.sign(
      { userId, email, role, tier },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userId,
        fullName,
        email,
        role,
        tier
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed',
      details: error.message 
    });
  } finally {
    client.release();
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const userResult = await db.query(
      'SELECT id, email, password_hash, full_name, role, tier FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, tier: user.tier },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        tier: user.tier
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Forgot password route (sends reset link)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists
    const userResult = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      // Don't reveal if email exists or not for security
      return res.json({ message: 'If your email is registered, you will receive a password reset link' });
    }

    // In production, you would:
    // 1. Generate a password reset token
    // 2. Store it in database with expiration
    // 3. Send email with reset link
    
    // For now, just simulate success
    console.log(`Password reset link would be sent to: ${email}`);
    res.json({ message: 'If your email is registered, you will receive a password reset link' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Password reset request failed' });
  }
});

module.exports = router;