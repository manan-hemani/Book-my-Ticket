import express from "express";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());

// middleware because we cannot directly send json data to server, we need to parse it first
app.use(express.json());
app.use(express.static("./"));

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Book my Ticket Backend");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
