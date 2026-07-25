import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

export const registerUser = async (data) => {
  const res = await API.post("/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

export const getUser = async (userId) => {
  const res = await API.get(`/user/${userId}`);
  return res.data;
};

export const updateUser = async (userId, data) => {
  const res = await API.put(`/user/${userId}`, data);
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await API.delete(`/user/${userId}`);
  return res.data;
};
