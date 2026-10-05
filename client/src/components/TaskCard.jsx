import React from "react";

function TaskCard({ task, onDelete, onStatusChange }) {
  if (!task) {
    return (
      <div className="task-card">
        <p>No task data available.</p>
      </div>
    );
  }

  const getStatusClass = (status) => {
    const currentStatus = String(status || "Pending").toLowerCase();

    if (currentStatus === "completed") {
      return "task-status completed";
    }

    if (
      currentStatus === "in progress" ||
      currentStatus === "in-progress"
    ) {
      return "task-status in-progress";
    }

    if (currentStatus === "pending") {
      return "task-status pending";
    }

    return "task-status";
  };

  const getPriorityClass = (priority) => {
    const currentPriority = String(priority || "Medium").toLowerCase();

    if (currentPriority === "high") {
      return "priority high";
    }

    if (currentPriority === "low") {
      return "priority low";
    }

    return "priority medium";
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

  const handleDelete = () => {
    const taskId = task._id || task.id;

    if (!taskId) {
      console.log("Task ID not found.");
      return;
    }

    if (onDelete) {
      onDelete(taskId);
    }
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    const taskId = task._id || task.id;

    if (taskId && onStatusChange) {
      onStatusChange(taskId, newStatus);
    }
  };

  return (
    <div className="task-card">

      <div className="task-card-header">
        <div>
          <h3>
            {task.title || task.name || "Untitled Task"}
          </h3>

          <p className="task-description">
            {task.description || "No description available"}
          </p>
        </div>

        <span className={getStatusClass(task.status)}>
          {task.status || "Pending"}
        </span>
      </div>

      <div className="task-details">

        <div className="task-detail-item">
          <strong>Assigned To:</strong>
          <span>
            {task.assignedToName ||
              task.studentName ||
              task.assignedTo ||
              "Not assigned"}
          </span>
        </div>

        <div className="task-detail-item">
          <strong>Priority:</strong>
          <span className={getPriorityClass(task.priority)}>
            {task.priority || "Medium"}
          </span>
        </div>

        <div className="task-detail-item">
          <strong>Deadline:</strong>
          <span>
            {formatDate(task.deadline)}
          </span>
        </div>

      </div>

      <div className="task-status-section">
        <label htmlFor={`status-${task._id || task.id || "task"}`}>
          Change Status:
        </label>

        <select
          id={`status-${task._id || task.id || "task"}`}
          value={task.status || "Pending"}
          onChange={handleStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="task-actions">

        <button
          type="button"
          className="view-btn"
          onClick={() => console.log("View Task:", task)}
        >
          View
        </button>

        <button
          type="button"
          className="edit-btn"
          onClick={() => console.log("Edit Task:", task)}
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

export default TaskCard;