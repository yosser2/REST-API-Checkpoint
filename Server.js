const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// POST route to add a new user
app.post("/", async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route to retrieve all users
app.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT route to update a user by ID
app.put("/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!updateUser) {
      res.status(404).send("User not found");
    }

    res.status(200).send(updateUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE route to remove a user by ID
app.delete("/:id", async (req, res, next) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Run the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port", port));
