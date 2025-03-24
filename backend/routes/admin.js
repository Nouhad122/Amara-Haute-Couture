const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            currentPrice: req.body.currentPrice,
            oldPrice: req.body.oldPrice,
            imageUrl: req.body.imageUrl,
            availableSizes: req.body.sizes,
            bestSeller: req.body.bestSeller
        }); 

        const savedProduct = await product.save();
        
        if (!savedProduct) {
            return res.status(400).json({ message: 'Product not added' });
        }
        
        res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

module.exports = router;
