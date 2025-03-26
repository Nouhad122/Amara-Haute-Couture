const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = express();
server.use(express.json());
server.use(cors());

// Serve static files from the uploads directory
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Admin routes for product management (CRUD operations)
server.use('/admin', adminRoutes);

// Shop routes for customer-facing operations
server.use('/shop', shopRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});



