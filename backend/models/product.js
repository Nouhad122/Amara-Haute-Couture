const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['image', 'video']
    }
});

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
    media: {
        type: [mediaSchema],
        required: true,
        validate: [array => array.length > 0, 'At least one media file is required']
    },
    availableSizes: {
        type: [String],
        required: true,
    },
    bestSeller: {
        type: Boolean,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    careInstructions: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema);
