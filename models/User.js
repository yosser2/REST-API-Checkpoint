const mongoose = require("mongoose");

// Define the schema for the 'users' collection
const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  age: Number,
});

// Create a Mongoose model for the 'users' collection using the defined schema
module.exports = mongoose.model("users", userSchema);
