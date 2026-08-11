import validator from "validator";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // console.log("Received registration data:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const isNameValid = (name) => /^[A-Za-z\s]+$/.test(name);
    if (!isNameValid(fullName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const isPasswordValid = validator.isStrongPassword(password, {
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isPasswordValid) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and include at least one uppercase letter, one number, and one symbol",
      });
    }

    const user = new User({ fullName, email, password: password });
    await user.save();
    res.status(200).json({ message: "User registered successfully"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("Received login data:", req.body);
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { fullName, currentPassword, newPassword } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    const isPasswordValid = validator.isStrongPassword(newPassword, {
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isPasswordValid) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and include at least one uppercase letter, one number, and one symbol",
      });
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (newPassword) {
      user.password = newPassword;
    }
    await user.save();
    res.json({ message: "User updated", user });
  } catch (error) {}
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
