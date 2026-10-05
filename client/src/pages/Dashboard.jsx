import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoProjects = [
      {
        _id: "project1",
        name: "Student Attendance System",
        description: "A web application to manage student attendance.",
        studentName: "Thirupathi",
        technology: "MERN Stack",
        status: "In Progress",
        deadline: "2026-10-15",
        progress: 70,
      },
      {
        _id: "project2",
        name: "College Event Management",
        description:
          "Application for managing college events and registrations.",
        studentName: "Thirupathi",
        technology: "React + Node.js",
        status: "Pending",
        deadline: "2026-11-10",
        progress: 30,
      },
    ];

    const demoTasks = [
      {
        _id: "task1",
        title: "Create Login Page",
        description: "Develop login page using React.",
        assignedToName: "Thirupathi",
        priority: "High",
        status: "Completed",
        deadline: "2026-09-30",
      },
      {
        _id: "task2",
        title: "Create MongoDB Models",
        description: "Create Project and Task models.",
        assignedToName: "Thirupathi",
        priority: "Medium",
        status: "In Progress",
        deadline: "2026-10-05",
      },
      {
        _id: "task3",
        title: "Build Dashboard",
        description: "Create student project dashboard.",
        assignedToName: "Thirupathi",
        priority: "Low",
        status: "Pending",
        deadline: "2026-10-12",
      },
    ];

    setProjects(demoProjects);
    setTasks(demoTasks);
    setLoading(false);
  }, []);

  const handleDeleteProject = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    setProjects((previousProjects) =>
      previousProjects.filter((project) => project._id !== id)
    );
  };

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task._id !== id)
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task._id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) =>
      String(project.status).toLowerCase() === "completed"
  ).length;

  const inProgressProjects = projects.filter(
    (project) =>
      String(project.status).toLowerCase() === "in progress"
  ).length;

  const pendingProjects = projects.filter(
    (project) =>
      String(project.status).toLowerCase() === "pending"
  ).length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) =>
      String(task.status).toLowerCase() === "completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) =>
      String(task.status).toLowerCase() === "in progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) =>
      String(task.status).toLowerCase() === "pending"
  ).length;

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Student Project Tracker</h1>
          <p>Manage your projects, tasks and progress.</p>
        </div>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{totalProjects}</p>
        </div>

        <div className="stat-card">
          <h3>Completed Projects</h3>
          <p>{completedProjects}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressProjects}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Projects</h3>
          <p>{pendingProjects}</p>
        </div>

      </div>

      <div className="task-statistics">
        <h2>Task Overview</h2>

        <div className="task-stats-container">

          <div className="task-stat-card">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>

          <div className="task-stat-card">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>

          <div className="task-stat-card">
            <h3>In Progress</h3>
            <p>{inProgressTasks}</p>
          </div>

          <div className="task-stat-card">
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>

        </div>
      </div>

      <section className="dashboard-section">

        <div className="section-header">
          <h2>My Projects</h2>

          <span>
            {totalProjects} Project
            {totalProjects !== 1 ? "s" : ""}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="empty-message">
            <p>No projects available.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}

      </section>

      <section className="dashboard-section">

        <div className="section-header">
          <h2>My Tasks</h2>

          <span>
            {totalTasks} Task
            {totalTasks !== 1 ? "s" : ""}
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-message">
            <p>No tasks available.</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}

export default Dashboard;