const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

// Get all products
router.get('/products', shopController.getAllProducts);

// Get a specific product
router.get('/products/:id', shopController.getProduct);

// Get products by category
router.get('/category/:category', shopController.getProductsByCategory);

// Get bestseller products
router.get('/bestsellers', shopController.getBestSellers);

// Get related products (same category, excluding current product)
router.get('/related/:id', shopController.getRelatedProducts);

module.exports = router;
