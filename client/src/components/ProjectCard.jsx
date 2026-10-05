import React from "react";

function ProjectCard({ project, onDelete }) {
  if (!project) {
    return (
      <div className="project-card">
        <p>No project data available.</p>
      </div>
    );
  }

  const getStatusClass = (status) => {
    const currentStatus = String(status || "Pending").toLowerCase();

    if (currentStatus === "completed") {
      return "status completed";
    }

    if (
      currentStatus === "in progress" ||
      currentStatus === "in-progress"
    ) {
      return "status in-progress";
    }

    if (currentStatus === "pending") {
      return "status pending";
    }

    return "status";
  };

  const progress = Math.min(
    100,
    Math.max(0, Number(project.progress) || 0)
  );

  const handleDelete = () => {
    const projectId = project._id || project.id;

    if (!projectId) {
      console.log("Project ID not found.");
      return;
    }

    if (onDelete) {
      onDelete(projectId);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "No deadline";
    }

    const formattedDate = new Date(date);

    if (isNaN(formattedDate.getTime())) {
      return "Invalid date";
    }

    return formattedDate.toLocaleDateString();
  };

  return (
    <div className="project-card">

      <div className="project-card-header">
        <h3>{project.name || "Untitled Project"}</h3>

        <span className={getStatusClass(project.status)}>
          {project.status || "Pending"}
        </span>
      </div>

      <p className="project-description">
        {project.description || "No description available"}
      </p>

      <div className="project-details">

        <div className="detail-item">
          <strong>Student:</strong>
          <span>{project.studentName || "Not assigned"}</span>
        </div>

        <div className="detail-item">
          <strong>Technology:</strong>
          <span>{project.technology || "Not specified"}</span>
        </div>

        <div className="detail-item">
          <strong>Deadline:</strong>
          <span>{formatDate(project.deadline)}</span>
        </div>

      </div>

      <div className="progress-section">

        <div className="progress-header">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      </div>

      <div className="project-actions">

        <button
          type="button"
          className="view-btn"
          onClick={() => console.log("View Project:", project)}
        >
          View
        </button>

        <button
          type="button"
          className="edit-btn"
          onClick={() => console.log("Edit Project:", project)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ProjectCard;