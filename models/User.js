const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    //     image: { type: String }, // Image field (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
