import React, { useState } from "react";

function TaskForm({ onTaskCreated, onCancel, initialData = null }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [assignedTo, setAssignedTo] = useState(
    initialData?.assignedTo || ""
  );
  const [priority, setPriority] = useState(
    initialData?.priority || "Medium"
  );
  const [status, setStatus] = useState(
    initialData?.status || "Pending"
  );
  const [deadline, setDeadline] = useState(
    initialData?.deadline
      ? initialData.deadline.split("T")[0]
      : ""
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(initialData?._id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Task description is required.");
      return;
    }

    if (!assignedTo.trim()) {
      setError("Please enter the assigned student.");
      return;
    }

    if (!deadline) {
      setError("Please select a deadline.");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      assignedTo: assignedTo.trim(),
      priority,
      status,
      deadline,
    };

    try {
      setLoading(true);

      console.log(
        isEditMode ? "Updated Task:" : "New Task:",
        taskData
      );

      if (onTaskCreated) {
        onTaskCreated(taskData);
      }

      if (!isEditMode) {
        setTitle("");
        setDescription("");
        setAssignedTo("");
        setPriority("Medium");
        setStatus("Pending");
        setDeadline("");
      }
    } catch (err) {
      console.error("Task Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>

        <div className="form-header">
          <h2>
            {isEditMode ? "Edit Task" : "Create New Task"}
          </h2>

          <p>
            {isEditMode
              ? "Update the task details"
              : "Add a new task to your project"}
          </p>
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="task-title">
            Task Title
          </label>

          <input
            id="task-title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">
            Description
          </label>

          <textarea
            id="task-description"
            placeholder="Enter task description"
            rows="4"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="assigned-to">
            Assigned Student
          </label>

          <input
            id="assigned-to"
            type="text"
            placeholder="Enter student name or ID"
            value={assignedTo}
            onChange={(event) =>
              setAssignedTo(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">
            Priority
          </label>

          <select
            id="priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deadline">
            Deadline
          </label>

          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(event) =>
              setDeadline(event.target.value)
            }
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Task"
              : "Create Task"}
          </button>

          {onCancel && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default TaskForm;