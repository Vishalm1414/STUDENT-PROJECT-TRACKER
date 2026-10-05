const mongoose = require("mongoose");
const Project = require("../models/Project");

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      message: "Projects fetched successfully",
      projects
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    res.status(500).json({
      message: "Server error while fetching projects"
    });
  }
};

// Get single project
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid project ID"
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      project
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    res.status(500).json({
      message: "Server error while fetching project"
    });
  }
};

// Create project
const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      studentName,
      technology,
      status,
      deadline,
      progress
    } = req.body;

    if (
      !name ||
      !description ||
      !studentName ||
      !technology ||
      !deadline
    ) {
      return res.status(400).json({
        message:
          "Name, description, student name, technology and deadline are required"
      });
    }

    const project = await Project.create({
      name: name.trim(),
      description: description.trim(),
      studentName: studentName.trim(),
      technology: technology.trim(),
      status: status || "Pending",
      deadline,
      progress: progress || 0
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    res.status(500).json({
      message: "Server error while creating project"
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid project ID"
      });
    }

    const {
      name,
      description,
      studentName,
      technology,
      status,
      deadline,
      progress
    } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    if (name !== undefined) {
      project.name = name.trim();
    }

    if (description !== undefined) {
      project.description = description.trim();
    }

    if (studentName !== undefined) {
      project.studentName = studentName.trim();
    }

    if (technology !== undefined) {
      project.technology = technology.trim();
    }

    if (status !== undefined) {
      project.status = status;
    }

    if (deadline !== undefined) {
      project.deadline = deadline;
    }

    if (progress !== undefined) {
      project.progress = Math.min(
        100,
        Math.max(0, Number(progress) || 0)
      );
    }

    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      project
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    res.status(500).json({
      message: "Server error while updating project"
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid project ID"
      });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

    res.status(500).json({
      message: "Server error while deleting project"
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};