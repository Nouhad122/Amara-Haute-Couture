const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Upload a file to Cloudinary
 * @param {String} filePath - The local path to the file
 * @returns {Promise} - A promise that resolves to the Cloudinary upload result
 */
const uploadToCloudinary = async (filePath) => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'amara-haute-couture', // Store all uploads in this folder
      resource_type: 'auto' // Auto-detect whether it's an image or video
    });
    
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of file objects from multer
 * @returns {Promise} - A promise that resolves to an array of Cloudinary upload results
 */
const uploadMultipleToCloudinary = async (files) => {
  try {
    // Use Promise.all to upload all files in parallel
    const uploadPromises = files.map(file => uploadToCloudinary(file.path));
    const results = await Promise.all(uploadPromises);
    
    return results;
  } catch (error) {
    console.error('Error uploading multiple files to Cloudinary:', error);
    throw error;
  }
};

/**
 * Delete a file from Cloudinary
 * @param {String} publicId - The public ID of the file to delete
 * @returns {Promise} - A promise that resolves to the Cloudinary deletion result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    // Delete the file from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary
}; 