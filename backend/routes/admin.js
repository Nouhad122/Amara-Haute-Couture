const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { upload } = require('../utils/uploadHandler');

// Get all products
router.get('/products', adminController.getProducts);

// Get a specific product
router.get('/products/:id', adminController.getProduct);

// Add a new product
router.post('/products', upload.array('files'), adminController.createProduct);

// Update a product
router.patch('/products/:id', upload.array('files'), adminController.updateProduct);

// Delete a product
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
