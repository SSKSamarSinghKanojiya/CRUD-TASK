const User = require("../models/User"); // Import User model
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation
const dotenv = require("dotenv"); // Import dotenv to load environment variables
const BlacklistedToken = require('../models/BlacklistedToken');

dotenv.config(); // Load environment variables

const register = async (req, res) => {
  const { username, email, password } = req.body; // Extract fields from request body
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" }); // Return error if email is already registered
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds

    // Create a new user with the hashed password and image path
    const user = new User({
      username,
      email,
      password: hashedPassword,
      image: req.file ? req.file.path : null, // Save the image path if uploaded
    });

    await user.save(); // Save the user to the database
    res.status(201).json({ message: "User registered successfully", user }); // Return success response
  } catch (err) {
    console.log(User);
    console.log(err);

    res.status(400).json({ message: err.message }); // Return error response
  }
};

const login = async (req, res) => {
  const { email, password } = req.body; // Extract fields from request body
  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" }); // Return error if user not found
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" }); // Return error if password is invalid
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
   
         // Manually create a new object without the password field
         const userResponse = {
          _id: user._id,
          username: user.username,
          email: user.email,
          password:user.password,
          createdAt: user.createdAt,
        };
        res.status(200).json({ message: "Login successful", token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return error response
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Manually create a response object without the password field
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
    res
      .status(200)
      .json({
        message: "User profile fetched successfully",
        user: userResponse,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract JWT token from header

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await BlacklistedToken.create({ token, expiresAt: new Date(decoded.exp * 1000) });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

module.exports = { register, login, getUserProfile, deleteUser, logoutUser }; // Export the functions
