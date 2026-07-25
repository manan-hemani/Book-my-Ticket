// import React from 'react'
import { useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "../api";

const Profile = ({ currentUser, setCurrentUser, setActivePage }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(currentUser._id);
      setFormData({
        fullName: user.fullName,
        email: user.email,
        currentPassword: "",
        newPassword: "",
      });
    };
    if (currentUser) fetchUser();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await updateUser(currentUser._id, formData);
    alert(res.message);
    setCurrentUser(res.user);
  };

  const handleDelete = async () => {
    const res = await deleteUser(currentUser._id);
    alert(res.message);
    setCurrentUser(null);
    setActivePage("home");
  };

  return (
    <>
      <section id="profile" className="page py-10 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">User Profile</h2>
          <label for="profileName" className="font-medium text-gray-700">
            Name
          </label>
          <input
            id="profileName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            type="text"
            className="border border-gray-300 rounded p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <label for="profileEmail" className="font-medium text-gray-700">
            Email
          </label>
          <input
            id="profileEmail"
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="border border-gray-300 rounded p-2 w-full mb-3 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
          <label for="currentPass" className="font-medium text-gray-700">
            Current Password
          </label>
          <input
            id="currentPass"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <label for="newPass" className="font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPass"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleUpdate}
            className="w-full bg-amber-500 text-white py-2 rounded font-semibold cursor-pointer hover:bg-amber-600"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded font-semibold cursor-pointer hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
