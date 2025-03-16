import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AddCar.css';
import OwnerHeader from "./OwnerHeader";
import { addCar, updateCar } from '../api'; // Import the updateCar function

const AddCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { car, isUpdate } = location.state || {}; // Get car data and isUpdate flag from location.state

  console.log("isUpdate:", isUpdate); // Debugging: Check if isUpdate is true or false

  const [userId, setUserId] = useState(null);

  // Fetch the logged-in user's ID from the JWT token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // State for the form inputs
  const [newCar, setNewCar] = useState({
    brand: car?.brand || '',
    model: car?.model || '',
    type: car?.type || '',
    year: car?.year || '',
    mileage: car?.mileage || '',
    price: car?.price || '',
    availability: car?.availability || 'Available',
    image: car?.image || null,
    description: car?.description || '',
    carNumber: car?.carNumber || '',
    userId: userId,
  });

  // Update the userId in the newCar state when userId changes
  useEffect(() => {
    setNewCar((prevCar) => ({ ...prevCar, userId }));
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCar({ ...newCar, image: imageUrl });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (isUpdate) {
        // Update existing car
        const response = await updateCar(car._id, newCar, token);
        console.log("Car updated successfully:", response.data);
      } else {
        // Add new car
        const response = await addCar(newCar, token);
        console.log("Car added successfully:", response.data);
      }
      navigate('/owner/manage-cars');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit car. Please try again.');
    }
  };

  return (
    <div className="add-car-form">
      <OwnerHeader />
      <h2>{isUpdate ? "Update Car" : "Add New Car"}</h2> {/* Dynamic heading */}
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {/* Left Section */}
          <div className="left-section">
            <div className="form-group">
              <label>Brand:</label>
              <input
                type="text"
                name="brand"
                value={newCar.brand}
                onChange={handleInputChange}
                disabled={isUpdate} // Disable if in update mode
                required
              />
            </div>
            <div className="form-group">
              <label>Model:</label>
              <input
                type="text"
                name="model"
                value={newCar.model}
                onChange={handleInputChange}
                disabled={isUpdate} // Disable if in update mode
                required
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={newCar.type}
                onChange={handleInputChange}
                disabled={isUpdate} // Disable if in update mode
                required
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="number"
                name="year"
                value={newCar.year}
                onChange={handleInputChange}
                disabled={isUpdate} // Disable if in update mode
                required
              />
            </div>
            <div className="form-group">
              <label>Mileage:</label>
              <input
                type="text"
                name="mileage"
                value={newCar.mileage}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            <div className="form-group">
              <label>Car Number:</label>
              <input
                type="text"
                name="carNumber"
                value={newCar.carNumber}
                onChange={handleInputChange}
                disabled={isUpdate} // Disable if in update mode
                required
              />
            </div>
            <div className="form-group">
              <label>Availability:</label>
              <select
                name="availability"
                value={newCar.availability}
                onChange={handleInputChange}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price/hr:</label>
              <input
                type="number"
                name="price"
                value={newCar.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                disabled={isUpdate} // Disable if in update mode
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={newCar.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button in Center */}
        <div className="button-container">
          <button type="submit" className="submit-button">
            {isUpdate ? "Update Car" : "Add Car"} {/* Dynamic button text */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;