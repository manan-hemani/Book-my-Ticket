// import React, { useState } from "react";
import { useState } from "react";
// import { registerUser, loginUser } from "../api";
import { toast } from "react-toastify";
import axios from "axios";

const Auth = ({ setCurrentUser, setActivePage }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await registerUser({
  //       fullName: formData.fullName,
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     toast.success(result.message);
  //     setActiveTab("login");
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Registration failed");
  //   }
  // };

  const handleRegisterFS = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/api/fsusers", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      toast.success(result.data.message);
      setActiveTab("login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await loginUser({
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     setCurrentUser(result.user);
  //     toast.success(result.message);
  //     setActivePage("home");
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Login failed");
  //   }
  // };

  const handleLoginFS = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/api/fsusers/login",
        {
          email: formData.email,
          password: formData.password,
        },
      );
      // setCurrentUser(result.user);
      // toast.success(result.message);
      toast.success(result.data.message);
      // setActivePage("home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <section id="auth" className="page min-h-screen py-10 px-4">
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg mx-auto my-auto">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 rounded-lg font-semibold cursor-pointer ${
                activeTab === "login"
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 rounded-lg font-semibold cursor-pointer ${
                activeTab === "register"
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Register
            </button>
          </div>
          {activeTab === "login" ? (
            <form className="flex flex-col gap-3" onSubmit={handleLoginFS}>
              <label htmlFor="loginEmail" className="font-medium text-gray-700">
                Email
              </label>
              <input
                id="loginEmail"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <label htmlFor="loginPass" className="font-medium text-gray-700">
                Password
              </label>
              <input
                id="loginPass"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <div className="flex flex-col items-center gap-3 mt-3">
                <a
                  href="#"
                  className="text-amber-500 text-sm hover:underline self-end"
                >
                  Forgot password?
                </a>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
                >
                  Login
                </button>
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleRegisterFS}>
              <label
                htmlFor="registrationName"
                className="font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="registrationName"
                type="text"
                placeholder="Enter your name"
                name="fullName"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <small className="text-red-500 text-xs hidden">
                Should only contain letters and spaces.
              </small>

              <label
                htmlFor="registrationEmail"
                className="font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="registrationEmail"
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <label
                htmlFor="registrationPassword"
                className="font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="registrationPassword"
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <label
                htmlFor="registrationConfirmPassword"
                className="font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="registrationConfirmPassword"
                type="password"
                placeholder="Enter your password again"
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <small className="text-red-500 text-xs hidden">
                Passwords do not match.
              </small>

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Auth;
