/**
 * This script migrates existing product media from local/Vercel storage to Cloudinary
 * Run this when switching from file-based storage to Cloudinary
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { cloudinary } = require('./cloudinary');
const Product = require('../models/product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        migrateMediaToCloudinary();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

async function migrateMediaToCloudinary() {
    try {
        // Get all products
        const products = await Product.find();
        console.log(`Found ${products.length} products to process`);
        
        let successCount = 0;
        let errorCount = 0;
        
        // Create temporary directory for downloaded files
        const tempDir = path.join(__dirname, '..', 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        for (const product of products) {
            console.log(`Processing product: ${product.name} (${product._id})`);
            
            if (product.media && product.media.length > 0) {
                const updatedMedia = [];
                
                for (const media of product.media) {
                    try {
                        // Skip if already migrated
                        if (media.publicId) {
                            console.log(`Media already on Cloudinary: ${media.url}`);
                            updatedMedia.push(media);
                            continue;
                        }
                        
                        // Download file from URL
                        const fileUrl = media.url;
                        console.log(`Downloading file from: ${fileUrl}`);
                        
                        // Get file extension and create temp file path
                        const fileExt = path.extname(fileUrl) || '.jpg';
                        const tempFilePath = path.join(tempDir, `temp-${Date.now()}${fileExt}`);
                        
                        // Download file
                        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
                        fs.writeFileSync(tempFilePath, Buffer.from(response.data));
                        
                        // Upload to Cloudinary
                        console.log(`Uploading to Cloudinary: ${tempFilePath}`);
                        const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
                            folder: 'amara-haute-couture',
                            resource_type: 'auto'
                        });
                        
                        // Delete temp file
                        fs.unlinkSync(tempFilePath);
                        
                        // Create updated media object
                        updatedMedia.push({
                            url: uploadResult.secure_url,
                            publicId: uploadResult.public_id,
                            type: media.type
                        });
                        
                        console.log(`Successfully migrated media to Cloudinary: ${uploadResult.secure_url}`);
                        successCount++;
                    } catch (error) {
                        console.error(`Error migrating media: ${media.url}`, error);
                        errorCount++;
                        
                        // Keep original media if migration fails
                        updatedMedia.push(media);
                    }
                }
                
                // Update product with new media
                product.media = updatedMedia;
                await product.save();
                console.log(`Updated product ${product.name} with Cloudinary media`);
            }
        }
        
        console.log('Migration completed!');
        console.log(`Successfully migrated: ${successCount} files`);
        console.log(`Failed migrations: ${errorCount} files`);
        
        // Clean up temp directory
        fs.rmdirSync(tempDir, { recursive: true });
        
        // Close MongoDB connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error in migration:', error);
        mongoose.connection.close();
        process.exit(1);
    }
} 