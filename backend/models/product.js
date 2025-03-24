const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true,
    },
    currentPrice: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    availableSizes: {
        type: [String],
        required: true,
    },
    bestSeller: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema);
