const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createProduct = async (req, res) => {
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
            bestSeller: req.body.bestSeller === 'true',
            material: req.body.material,
            careInstructions: req.body.careInstructions
        };

        const product = new Product(productData);
        const newProduct = await product.save();
        
        res.status(201).json(newProduct);
    } catch (error) {
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
}

exports.updateProduct = async (req, res) => {
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
        if (req.body.material) {
            req.body.material = req.body.material.trim();
        }
        if (req.body.careInstructions) {
            req.body.careInstructions = req.body.careInstructions.trim();
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
}

exports.deleteProduct = async (req, res) => {
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
}

