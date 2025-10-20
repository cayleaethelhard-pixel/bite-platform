// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');
// Load environment variables
dotenv.config();
const dashboardRoutes = require('./routes/dashboard');
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for profile pictures
// Add this after your existing middleware
if (process.env.NODE_ENV === 'production') {
  // Serve static files from client build
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Routes
app.use('/api/auth', authRoutes);       
app.use('/api', dashboardRoutes);        

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'BITE API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});