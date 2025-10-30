// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');
const settingsRoutes = require('./routes/settings');
dotenv.config();
const dashboardRoutes = require('./routes/dashboard');
const app = express();
const PORT = process.env.PORT || 5000;


// ✅ Configure CORS to allow your frontend origin
app.use(cors({
  origin: [
    'http://localhost:3000', // for local dev
    'https://bite-platform-frontend.onrender.com' // ← REPLACE with your actual frontend URL
  ],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' })); // Increase limit for profile pictures
// Add this after your existing middleware


// Routes
app.use('/api/auth', authRoutes);       
app.use('/api', dashboardRoutes);  
app.use('/api/settings', settingsRoutes);      

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'BITE API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});