// filepath: backend/models/Todo.js
const mongoose = require("mongoose");
const user = require("./user");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
