const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected : ",process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB Connection error : ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
