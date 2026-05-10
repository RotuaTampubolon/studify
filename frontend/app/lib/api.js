const BASE_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const api = {
  register: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.json();
  },

  getTasks: async () => {
    const res = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.json();
  },

  createTask: async (data) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateTask: async (id, data) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteTask: async (id) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.json();
  },
};
