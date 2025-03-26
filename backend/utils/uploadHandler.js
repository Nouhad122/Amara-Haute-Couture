const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Determine if the app is running in Vercel or local environment
const isVercel = process.env.VERCEL === '1';

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir = path.join(__dirname, '..', 'uploads');
        
        // In Vercel environment, use /tmp directory (which is writable in serverless)
        if (isVercel) {
            uploadDir = '/tmp';
        } else {
            // Ensure directory exists for local development
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
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

// Helper function to fix file paths for Vercel
const getFilePath = (filename) => {
    if (isVercel) {
        return `/tmp/${filename}`;
    } else {
        return path.join(__dirname, '..', 'uploads', filename);
    }
};

// Helper function to get the public URL for the uploaded file
const getFileUrl = (filename) => {
    return `/uploads/${filename}`;
};

module.exports = {
    upload,
    getFilePath,
    getFileUrl,
    isVercel
}; 