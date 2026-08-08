import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import User from "./user.model.js";
import fs from "fs";

dotenv.config({ path: "./.env" });
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// college network block srv lookup so we need to set dns servers to public dns servers like cloudflare and google

const eventsPath = "./data/events.json";
const usersPath = "./data/users.json";
const tempUsersPath = "./data/tempUsers.json";
const tempUser = JSON.stringify({
  fullName: "TEST",
  email: "test@gmail.com",
  password: "1234",
});

const app = express();
app.use(cors());

app.use(express.json());
// middleware because we cannot directly send json data to server, we need to parse it first
app.use(express.static("./"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// FS MODULE APIs
app.get("/api/fsevents", (req, res) => {
  const data = fs.readFileSync(eventsPath, "utf-8");
  return res.json(JSON.parse(data));
});

async function readUsersFile() {
  try {
    const data = await fs.readFileSync(usersPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return error;
  }
}

app.post("/api/fsusers/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readUsersFile();
    console.log("Users read from file:", users);
    const user = users.find((u) => u.email === email);
    console.log("User found:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User logged in successfully",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/fsusers", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const isNameValid = (name) => /^[A-Za-z\s]+$/.test(name);
    if (!isNameValid(fullName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }
    const store = await fs.appendFileSync(
      usersPath,
      JSON.stringify({ fullName, email, password }, null, 2),
    );
    console.log("User registered successfully");
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/fsusers/:email", async (req, res) => {
  try {
    const { newFullName, currentPassword, newPassword } = req.body;
    // const fullNameReq = fullName;
    const data = await fs.readFileSync(usersPath, "utf-8");
    console.log("Data read from file:", data);
    const { fullName, password, email } = JSON.parse(data);
    // const emailReq = email;
    const newEmail = req.params.email;
    if (email === newEmail) {
      console.log("Email matches:", email);
      // const result = await fs.unlinkSync(usersPath);
      const store = await fs.appendFileSync(
        usersPath,
        JSON.stringify({ newFullName, email, newPassword }, null, 2),
      );
      res.status(200).json({ message: "User updated successfully" });
    } else {
      console.log("Email does not match:", email, newEmail);
      return res.status(400).json({ message: "Email not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

async function deleteUser(tempUsersPath) {
  try {
    await fs.access(tempUsersPath, fs.constants.F_OK, (err) => {
      console.log(err);
    });
    return true;
  } catch (err) {
    console.error("Error in checking the file", err);
    return false;
  }
}
async function createFile(filePath) {
  const fileCreation = await fs.writeFileSync(tempUsersPath, tempUser, "utf-8");
  console.log("File created:", tempUsersPath);
}
async function checkFileExists(filePath) {
  try {
    const fileCheck = await fs.access(tempUsersPath);
    return true;
  } catch (err) {
    console.error("Error in checking the file", err);
    return false;
  }
}

app.delete("/api/delete/fsusers", async (req, res) => {
  try {
    const fileCheck = await checkFileExists(tempUsersPath);
    if (!fileCheck) {
      await createFile(tempUsersPath);
    }
    const result = await deleteUser(tempUsersPath);
    if (result) {
      return res.json({ message: "User Deleted Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DB APIs
app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // console.log("Received registration data:", req.body);
    const isNameValid = (name) => /^[A-Za-z\s]+$/.test(name);
    console.log("Is name valid:", isNameValid(fullName));
    if (!isNameValid(fullName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }
    if (JSON.stringify(password).length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be of minimum 8 characters" });
    }
    const temp = (password) => {
      /[a-z*A-Z*0-9*!#$@^%&*(),.?\b]/g;
    };
    if (!temp(password)) {
      return res.status(400).json({ message: "Password is in Invalid format" });
    }
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
    // console.log("Received login data:", req.body);
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
