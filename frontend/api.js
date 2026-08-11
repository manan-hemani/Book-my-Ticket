import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_URI,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const getUser = async (userId) => {
  const res = await API.get(`/auth/${userId}`);
  return res.data;
};

export const updateUser = async (userId, data) => {
  const res = await API.put(`/auth/${userId}`, data);
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await API.delete(`/auth/${userId}`);
  return res.data;
};
