// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

// exports.authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer", "");
//   if (!token) {
//     return res.status(401).json({ message: "No token authorizaton denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };



const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token verification
const dotenv = require('dotenv'); // Import dotenv to load environment variables
const BlacklistedToken = require("../models/BlacklistedToken");

dotenv.config(); // Load environment variables

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' }); // Return error if no token
  }
// Check if token is blacklisted
const blacklistedToken = await BlacklistedToken.findOne({ token });
if (blacklistedToken) {
    return res.status(401).json({ message: "Token is expired. Please log in again." });
}
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.userId = decoded.userId; // Attach userId to request object
    next(); // Proceed to next middleware/route
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' }); // Return error if token is invalid
  }
};

module.exports = authMiddleware; // Export the middleware