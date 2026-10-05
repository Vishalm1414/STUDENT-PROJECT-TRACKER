const express = require("express");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskcontroller");

const router = express.Router();

// Get all tasks
router.get("/", getTasks);

// Get single task
router.get("/:id", getTaskById);

// Create task
router.post("/", createTask);

// Update task
router.put("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;