const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/product');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create a unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images and videos
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    
    if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF, WEBP) and videos (MP4, WEBM, MOV) are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    }
});

// Get all products (admin view)
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific product (admin view)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new product
router.post('/products', upload.array('files'), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Parse availableSizes from the form data
        let availableSizes;
        try {
            availableSizes = JSON.parse(req.body.availableSizes);
            if (!Array.isArray(availableSizes)) {
                throw new Error('Available sizes must be an array');
            }
        } catch (error) {

            return res.status(400).json({ message: 'Invalid sizes format' });
        }

        const mediaFiles = files.map(file => ({
            url: `/uploads/${file.filename}`,
            type: file.mimetype.startsWith('image/') ? 'image' : 'video'
        }));

        const productData = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            currentPrice: Number(req.body.currentPrice),
            oldPrice: req.body.oldPrice ? Number(req.body.oldPrice) : undefined,
            media: mediaFiles,
            availableSizes: availableSizes,
            bestSeller: req.body.bestSeller === 'true'
        };

        const product = new Product(productData);
        const newProduct = await product.save();
        
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        // Delete uploaded files if product creation fails
        if (req.files) {
            req.files.forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            });
        }
        res.status(400).json({ message: error.message });
    }
});

// Update a product
router.patch('/products/:id', upload.array('files'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Handle new files if uploaded
        if (req.files && req.files.length > 0) {
            const newMediaFiles = req.files.map(file => ({
                url: `/uploads/${file.filename}`,
                type: file.mimetype.startsWith('image/') ? 'image' : 'video'
            }));
            
            // Delete old files
            product.media.forEach(media => {
                const filePath = path.join(__dirname, '..', media.url);
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Error deleting old file:', err);
                });
            });
            
            req.body.media = newMediaFiles;
        }

        // Update other fields
        if (req.body.availableSizes) {
            req.body.availableSizes = JSON.parse(req.body.availableSizes);
        }
        if (req.body.currentPrice) {
            req.body.currentPrice = Number(req.body.currentPrice);
        }
        if (req.body.oldPrice) {
            req.body.oldPrice = Number(req.body.oldPrice);
        }
        if (req.body.bestSeller) {
            req.body.bestSeller = req.body.bestSeller === 'true';
        }

        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        // Delete newly uploaded files if update fails
        if (req.files) {
            req.files.forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            });
        }
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete associated files
        product.media.forEach(media => {
            const filePath = path.join(__dirname, '..', media.url);
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        });

        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
