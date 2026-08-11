import { useState } from "react";
import { registerUser, loginUser } from "../api";
import { toast } from "react-toastify";

const Auth = ({ setCurrentUser, setActivePage }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      toast.success(result.message);

      setActiveTab("login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      setCurrentUser(result.user);
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      toast.success(result.message);
      setActivePage("home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
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
                {loading ? (
                  <button
                    type="submit"
                    disabled
                    className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleRegister}>
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

              {loading ? (
                <button
                  type="submit"
                  disabled
                  className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
                >
                  Create Account
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
                >
                  Create Account
                </button>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Auth;
