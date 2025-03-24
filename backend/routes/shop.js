const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('/products', async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

router.get('/products/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
})


module.exports = router;
