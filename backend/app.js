import express from "express";
import cors from "cors";
// import bodyParser from "body-parser"; // Not needed if using express.json()
import authRoutes from "./routes/auth.js"; // Ensure this file exists
import carRoutes from "./routes/carRoutes.js"; // ✅ Import the cars route


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests
// app.use(bodyParser.json()); // Not needed since express.json() does this

// Routes
app.use("/api/users/auth", authRoutes);
// Register Routes
app.use("/api/cars", carRoutes); // ✅ Register the cars API

app.get("/", (req, res) => {
  res.send("🚗 Car Rental Backend is Running!");
});

export default app; // Export app for use in server.js
