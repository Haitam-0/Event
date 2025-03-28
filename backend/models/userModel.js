const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"], // You can add more roles if necessary
    default: "user", // Default role is 'user'
  },
});

module.exports = mongoose.model("User", userSchema);
