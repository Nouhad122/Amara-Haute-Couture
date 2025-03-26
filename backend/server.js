const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const isVercel = process.env.VERCEL === '1';

const server = express();
server.use(express.json());

// Enhanced CORS configuration for Vercel deployment
const allowedOrigins = [
  FRONTEND_URL,
  'https://amara-haute-couture.vercel.app', 
  'https://amara-haute-couture-jw7eak8aw-nouhad122s-projects.vercel.app',
];

server.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      // For debugging, allowing all origins in production
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With']
}));

// Pre-flight requests for CORS
server.options('*', cors());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir) && !isVercel) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the uploads directory
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In Vercel environment, also serve from /tmp
if (isVercel) {
  server.use('/uploads', express.static('/tmp'));
}

// Admin routes for product management (CRUD operations)
server.use('/admin', adminRoutes);

// Shop routes for customer-facing operations
server.use('/shop', shopRoutes);

// Health check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    isVercel: isVercel ? 'true' : 'false'
  });
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error(err);
});



