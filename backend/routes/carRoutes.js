import express from "express";
import multer from "multer";
import { body, validationResult } from "express-validator";
import Car from "../models/Car.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Add a new car
router.post(
  "/",
  upload.single("image"),
  [
    body("brand").notEmpty().withMessage("Brand is required"),
    body("model").notEmpty().withMessage("Model is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("year").isNumeric().withMessage("Year must be a number"),
    body("mileage").notEmpty().withMessage("Mileage is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("availability").isIn(["Available", "Not Available"]).withMessage("Invalid availability status"),
    body("description").notEmpty().withMessage("Description is required"),
    body("carNumber").notEmpty().withMessage("Car number is required"),
    body("userId").notEmpty().withMessage("User ID is required"), // Ensure userId is provided
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { brand, model, type, year, mileage, price, availability, description, carNumber, userId } = req.body;

      // Get the file path of the uploaded image
      const image = req.file ? req.file.path : null;

      const newCar = new Car({
        brand,
        model,
        type,
        year,
        mileage,
        price,
        availability,
        image, // Save the file path or URL
        description,
        carNumber,
        userId, // Use the userId from the request body
      });

      await newCar.save();
      res.status(201).json({ message: "Car added successfully!", car: newCar });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Fetch cars owned by a specific user
router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    const cars = await Car.find({ userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Car updated successfully!", car: updatedCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id); // Delete the car by ID
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Other routes (update, delete, etc.) remain unchanged
export default router;