const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb'); // Add MongoDB native driver
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const adminRoutes = require('../routes/admin');
const shopRoutes = require('../routes/shop');

// Load environment variables from .env file
dotenv.config();

// Log all environment variables for debugging
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);

// Global variable to store the database connection
let cachedClient = null;
let cachedDb = null;

// Connect to MongoDB using native driver - better for serverless
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Connection options
  const options = {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    maxPoolSize: 10,
    minPoolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  try {
    console.log('Connecting to MongoDB using native driver...');
    // Connect using the MongoDB native driver
    const client = await MongoClient.connect(process.env.MONGODB_URI, options);
    
    // Get the database name from the connection string
    const dbName = process.env.MONGODB_URI.split('/').pop().split('?')[0];
    const db = client.db(dbName);
    
    console.log(`Connected to MongoDB database: ${dbName}`);
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Create Express app
const app = express();
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: '*', // Allow all origins for now
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

// Add explicit CORS pre-flight handling
app.options('*', cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Special route for products that uses native MongoDB driver
app.get('/shop/native-products', async (req, res) => {
    try {
        console.log('Native products endpoint called');
        const { db } = await connectToDatabase();
        
        // Set a timeout for the MongoDB operation
        const products = await db.collection('products').find({}).toArray();
        
        console.log(`Successfully fetched ${products.length} products with native driver`);
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products with native driver:', error);
        return res.status(500).json({ 
            message: 'Failed to fetch products', 
            error: error.message 
        });
    }
});

// Admin routes for product management (CRUD operations)
app.use('/admin', adminRoutes);

// Shop routes for customer-facing operations
app.use('/shop', shopRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// Database check endpoint
app.get('/api/db-check', async (req, res) => {
    try {
        await connectToDatabase();
        const Product = require('../models/product');
        const count = await Product.countDocuments();
        
        res.status(200).json({ 
            message: 'Database connection successful', 
            productCount: count,
            dbUri: process.env.MONGODB_URI ? 'MONGODB_URI is set' : 'MONGODB_URI is missing'
        });
    } catch (error) {
        console.error('Database check failed:', error);
        res.status(500).json({ 
            message: 'Database check failed', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Test endpoint to create a sample product if none exist
app.get('/api/create-test-product', async (req, res) => {
    try {
        await connectToDatabase();
        const Product = require('../models/product');
        
        // Check if products already exist
        const count = await Product.countDocuments();
        if (count > 0) {
            return res.status(200).json({ message: 'Products already exist', count });
        }
        
        // Create a test product
        const testProduct = new Product({
            name: 'Test Dress',
            description: 'This is a test product created automatically',
            currentPrice: 199.99,
            oldPrice: 250,
            category: 'Dresses',
            media: [
                {
                    url: 'https://via.placeholder.com/500',
                    type: 'image'
                }
            ],
            availableSizes: ['S', 'M', 'L'],
            bestSeller: true,
            material: 'Cotton',
            careInstructions: 'Machine washable'
        });
        
        await testProduct.save();
        res.status(201).json({ 
            message: 'Test product created successfully',
            product: testProduct
        });
    } catch (error) {
        console.error('Creating test product failed:', error);
        res.status(500).json({ 
            message: 'Creating test product failed', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Combined check and fix endpoint (more reliable)
app.get('/api/test', async (req, res) => {
    try {
        console.log('Test endpoint called');
        
        // Try to connect to MongoDB with a shorter timeout
        const mongoOptions = {
            serverSelectionTimeoutMS: 3000,
            socketTimeoutMS: 3000,
            connectTimeoutMS: 3000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        
        // Connect manually for this test
        await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
        console.log('MongoDB connected for test');
        
        // Check for products
        const Product = require('../models/product');
        const count = await Product.countDocuments().maxTimeMS(2000);
        console.log(`Product count: ${count}`);
        
        if (count === 0) {
            // Create a simple test product
            const testProduct = new Product({
                name: 'Test Product',
                description: 'Test Description',
                currentPrice: 99.99,
                category: 'Test',
                media: [{ url: 'https://via.placeholder.com/500', type: 'image' }],
                availableSizes: ['S', 'M', 'L'],
                bestSeller: true,
                material: 'Test Material',
                careInstructions: 'Test Care'
            });
            
            await testProduct.save();
            console.log('Created test product');
            
            return res.status(200).json({ 
                message: 'Test product created successfully', 
                productCount: 1,
                mongoStatus: 'connected'
            });
        }
        
        return res.status(200).json({ 
            message: 'Database is working correctly', 
            productCount: count,
            mongoStatus: 'connected'
        });
    } catch (error) {
        console.error('Test endpoint error:', error);
        return res.status(500).json({ 
            message: 'Test endpoint failed',
            error: error.message,
            mongoStatus: 'error'
        });
    }
});

// Static test endpoint (no MongoDB)
app.get('/api/static-test', (req, res) => {
    console.log('Static test endpoint called - no MongoDB connection used');
    
    // Return static data without using MongoDB
    const mockProducts = [
        {
            _id: 'mock-product-1',
            name: 'Mock Dress',
            description: 'This is a mock product with no database connection',
            currentPrice: 199.99,
            oldPrice: 250,
            category: 'Dresses',
            media: [
                {
                    url: 'https://via.placeholder.com/500',
                    type: 'image'
                }
            ],
            availableSizes: ['S', 'M', 'L'],
            bestSeller: true,
            material: 'Cotton',
            careInstructions: 'Machine washable'
        },
        {
            _id: 'mock-product-2',
            name: 'Mock Skirt',
            description: 'Another mock product',
            currentPrice: 99.99,
            category: 'Skirts',
            media: [
                {
                    url: 'https://via.placeholder.com/500',
                    type: 'image'
                }
            ],
            availableSizes: ['S', 'M'],
            bestSeller: false,
            material: 'Silk',
            careInstructions: 'Dry clean only'
        }
    ];
    
    return res.status(200).json({
        message: 'Static test successful',
        mockProducts: mockProducts,
        timestamp: new Date().toISOString(),
        env: {
            nodeEnv: process.env.NODE_ENV || 'not set',
            frontendUrl: process.env.FRONTEND_URL || 'not set',
            mongoDbUriSet: process.env.MONGODB_URI ? 'yes' : 'no'
        }
    });
});

// Also create a static products endpoint
app.get('/shop/static-products', (req, res) => {
    console.log('Static products endpoint called - for frontend testing');
    
    // Return static products data without using MongoDB
    const mockProducts = [
        {
            _id: 'mock-product-1',
            name: 'Mock Dress',
            description: 'This is a mock product with no database connection',
            currentPrice: 199.99,
            oldPrice: 250,
            category: 'Dresses',
            media: [
                {
                    url: 'https://via.placeholder.com/500',
                    type: 'image'
                }
            ],
            availableSizes: ['S', 'M', 'L'],
            bestSeller: true,
            material: 'Cotton',
            careInstructions: 'Machine washable'
        },
        {
            _id: 'mock-product-2',
            name: 'Mock Skirt',
            description: 'Another mock product',
            currentPrice: 99.99,
            category: 'Skirts',
            media: [
                {
                    url: 'https://via.placeholder.com/500',
                    type: 'image'
                }
            ],
            availableSizes: ['S', 'M'],
            bestSeller: false,
            material: 'Silk',
            careInstructions: 'Dry clean only'
        }
    ];
    
    return res.status(200).json(mockProducts);
});

// Export the Express app
module.exports = app; 