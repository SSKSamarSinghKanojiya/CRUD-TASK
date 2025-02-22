
const express = require('express'); // Import Express
const { register, login, getUserProfile, deleteUser, logoutUser } = require('../controllers/authController'); // Import auth controller functions
const upload = require('../utils/upload'); // Import Multer configuration
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router(); // Create a router

// Register route with image upload middleware
router.post('/register', upload.single('image'), register);

// Login route
router.post('/login', login);

// getUser details routes
router.get('/getUser', authMiddleware, getUserProfile)

router.delete("/delete/:id", deleteUser)

router.post('/logout',authMiddleware ,logoutUser);

module.exports = router; // Export the router