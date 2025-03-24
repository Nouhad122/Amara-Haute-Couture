const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const server = express();
server.use(express.json());
server.use(cors());

// Serve static files from the uploads directory
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Admin routes for product management (CRUD operations)
server.use('/admin', adminRoutes);

// Shop routes for customer-facing operations
server.use('/shop', shopRoutes);

mongoose.connect('mongodb+srv://nouhadalhallab122:U30eYfNYXwRZJQGz@amara-cluster.wqmrg.mongodb.net/shop?retryWrites=true&w=majority&appName=Amara-Cluster')
.then(() =>{
    server.listen(3000);
})
.catch((err) =>{
    console.log(err);
});



