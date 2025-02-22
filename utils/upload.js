
const multer = require('multer'); // Import Multer
const path = require('path'); // Import path module for file paths

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Generate a unique filename
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Save the file with a unique name
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

module.exports = upload; // Export the Multer configuration