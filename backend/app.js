const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // To use environment variables from a .env file

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // To parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Car Rental Management System API is running');
});

// Listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
