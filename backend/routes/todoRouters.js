const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a todo
router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title, user: req.userId });
  await todo.save();
  res.status(201).json(todo);
});

// Get todos for the logged-in user
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
});

router.get("/:id", auth, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// Update a todo by ID (only if it belongs to the user)
router.put("/:id", auth, async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { title },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// Delete a todo by ID (only if it belongs to the user)
router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json({ message: "Todo deleted" });
});

module.exports = router;
