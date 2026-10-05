const mongoose = require("mongoose");
const Task = require("../models/Task");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(500).json({
      message: "Server error while fetching tasks"
    });
  }
};

// Get single task
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const task = await Task.findById(id)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task fetched successfully",
      task
    });
  } catch (error) {
    console.error("Get Task Error:", error);

    res.status(500).json({
      message: "Server error while fetching task"
    });
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      studentName,
      priority,
      status,
      deadline,
      project,
      user
    } = req.body;

    if (!title || !description || !deadline) {
      return res.status(400).json({
        message:
          "Title, description and deadline are required"
      });
    }

    if (
      assignedTo &&
      !mongoose.Types.ObjectId.isValid(assignedTo)
    ) {
      return res.status(400).json({
        message: "Invalid assigned user ID"
      });
    }

    if (
      project &&
      !mongoose.Types.ObjectId.isValid(project)
    ) {
      return res.status(400).json({
        message: "Invalid project ID"
      });
    }

    if (
      user &&
      !mongoose.Types.ObjectId.isValid(user)
    ) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      assignedTo: assignedTo || undefined,
      studentName: studentName
        ? studentName.trim()
        : undefined,
      priority: priority || "Medium",
      status: status || "Pending",
      deadline,
      project: project || undefined,
      user: user || undefined
    });

    const createdTask = await Task.findById(task._id)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.status(201).json({
      message: "Task created successfully",
      task: createdTask
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    res.status(500).json({
      message: "Server error while creating task"
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const {
      title,
      description,
      assignedTo,
      studentName,
      priority,
      status,
      deadline,
      project,
      user
    } = req.body;

    if (assignedTo !== undefined) {
      if (
        assignedTo &&
        !mongoose.Types.ObjectId.isValid(assignedTo)
      ) {
        return res.status(400).json({
          message: "Invalid assigned user ID"
        });
      }

      task.assignedTo = assignedTo || undefined;
    }

    if (project !== undefined) {
      if (
        project &&
        !mongoose.Types.ObjectId.isValid(project)
      ) {
        return res.status(400).json({
          message: "Invalid project ID"
        });
      }

      task.project = project || undefined;
    }

    if (user !== undefined) {
      if (
        user &&
        !mongoose.Types.ObjectId.isValid(user)
      ) {
        return res.status(400).json({
          message: "Invalid user ID"
        });
      }

      task.user = user || undefined;
    }

    if (title !== undefined) {
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (studentName !== undefined) {
      task.studentName = studentName.trim();
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (status !== undefined) {
      task.status = status;
    }

    if (deadline !== undefined) {
      task.deadline = deadline;
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (error) {
    console.error("Update Task Error:", error);

    res.status(500).json({
      message: "Server error while updating task"
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

    res.status(500).json({
      message: "Server error while deleting task"
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};