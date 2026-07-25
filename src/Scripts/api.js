import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const API = axios.create({
  baseURL: process.env.VITE_APP_URI,
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
