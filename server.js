const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDD


app.use(express.json())
app.use("/auth",authRoutes)
app.use("/tasks",taskRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
