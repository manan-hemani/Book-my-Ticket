import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import User from "./user.model.js";

dotenv.config({ path: "./.env" });
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// college network block srv lookup so we need to set dns servers to public dns servers like cloudflare and google

const app = express();
app.use(cors());

app.use(express.json()); // middleware because we cannot directly send json data to server, we need to parse it first
app.use(express.static("./"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server running in 3000 port");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log("Received registration data:", req.body); // Debugging line
    const user = new User({ fullName, email, password: password });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login data:", req.body); // Debugging line
    const user = await User.findOne({ email, password: password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/user/:id", async (req, res) => {
  try {
    const { fullName, currentPassword, newPassword } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (newPassword) {
      user.password = newPassword;
    }
    await user.save();
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
