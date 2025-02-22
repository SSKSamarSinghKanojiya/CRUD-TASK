const express = require('express'); // Import Express
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController'); // Import task controller functions
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

const router = express.Router(); // Create a router

router.use(authMiddleware); // Protect all task routes with auth middleware
router.post('/', createTask); // Create task route
router.get('/', getTasks); // Get all tasks route
router.get('/:id', getTaskById); // Get task by ID route
router.put('/:id', updateTask); // Update task route
router.delete('/:id', deleteTask); // Delete task route

module.exports = router; // Export the router