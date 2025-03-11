import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

const Car = mongoose.model("Car", carSchema);

export default Car;
