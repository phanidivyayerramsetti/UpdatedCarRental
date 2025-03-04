import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

// ✅ API to add a new car
router.post("/add", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ message: "Car added successfully!", car: newCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API to get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
