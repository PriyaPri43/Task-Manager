const express = require("express");
const Task = require("../models/modelTask");
const auth = require("../middleware/authmiddleware");

const router = express.Router();

// Get Tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).lean();
  res.json(tasks);
});

// Add Task
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.user.id
  });
  res.json(task);
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;