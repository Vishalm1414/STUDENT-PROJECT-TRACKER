const API_URL = "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...(options.headers || {}),
      },
    });

    const contentType = response.headers.get("content-type");

    let data = {};

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : {};
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong"
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

/* =========================
   AUTH API
========================= */

export const registerUser = async (userData) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (userData) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

/* =========================
   PROJECT API
========================= */

export const getProjects = async () => {
  return apiRequest("/projects", {
    method: "GET",
  });
};

export const getProjectById = async (id) => {
  return apiRequest(`/projects/${id}`, {
    method: "GET",
  });
};

export const createProject = async (projectData) => {
  return apiRequest("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });
};

export const updateProject = async (id, projectData) => {
  return apiRequest(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(projectData),
  });
};

export const deleteProject = async (id) => {
  return apiRequest(`/projects/${id}`, {
    method: "DELETE",
  });
};

/* =========================
   TASK API
========================= */

export const getTasks = async () => {
  return apiRequest("/tasks", {
    method: "GET",
  });
};

export const getTaskById = async (id) => {
  return apiRequest(`/tasks/${id}`, {
    method: "GET",
  });
};

export const createTask = async (taskData) => {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
};

export const updateTask = async (id, taskData) => {
  return apiRequest(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (id) => {
  return apiRequest(`/tasks/${id}`, {
    method: "DELETE",
  });
};

/* =========================
   EVENT API
========================= */

export const getEvents = async () => {
  return apiRequest("/events", {
    method: "GET",
  });
};

export const getEventById = async (id) => {
  return apiRequest(`/events/${id}`, {
    method: "GET",
  });
};

export const createEvent = async (eventData) => {
  return apiRequest("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
};

export const updateEvent = async (id, eventData) => {
  return apiRequest(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
};

export const deleteEvent = async (id) => {
  return apiRequest(`/events/${id}`, {
    method: "DELETE",
  });
};

/* =========================
   TEAM API
========================= */

export const getTeams = async () => {
  return apiRequest("/teams", {
    method: "GET",
  });
};

export const getTeamById = async (id) => {
  return apiRequest(`/teams/${id}`, {
    method: "GET",
  });
};

export const createTeam = async (teamData) => {
  return apiRequest("/teams", {
    method: "POST",
    body: JSON.stringify(teamData),
  });
};

export const updateTeam = async (id, teamData) => {
  return apiRequest(`/teams/${id}`, {
    method: "PUT",
    body: JSON.stringify(teamData),
  });
};

export const deleteTeam = async (id) => {
  return apiRequest(`/teams/${id}`, {
    method: "DELETE",
  });
};

/* =========================
   LOGOUT
========================= */

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/* =========================
   DEFAULT EXPORT
========================= */

const api = {
  registerUser,
  loginUser,

  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,

  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,

  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,

  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,

  logoutUser,
};

export default api;