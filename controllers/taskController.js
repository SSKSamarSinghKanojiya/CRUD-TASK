const Task = require('../models/Task.js'); // Import Task model

const createTask = async (req, res) => {
  const { title, description } = req.body; // Extract fields from request body
  try {
    const task = new Task({ title, description, userId: req.userId }); // Create new task
    await task.save(); // Save task to database
    res.status(201).json(task); // Return success response
  } catch (err) {
    console.log(err);
    
    res.status(400).json({ message: err.message }); // Return error response
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }); // Find tasks for logged-in user
    res.json(tasks); // Return tasks
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return error response
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId }); // Find task by ID and userId
    if (!task) return res.status(404).json({ message: 'Task not found' }); // Return error if task not found
    res.json(task); // Return task
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return error response
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Find task by ID and userId
      req.body, // Update with request body
      { new: true } // Return updated task
    );
    if (!task) return res.status(404).json({ message: 'Task not found' }); // Return error if task not found
    res.json(task); // Return updated task
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return error response
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId }); // Find and delete task
    if (!task) return res.status(404).json({ message: 'Task not found' }); // Return error if task not found
    res.json({ message: 'Task deleted successfully' }); // Return success response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return error response
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask }; // Export the functions