import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AddCar.css'; // Reuse the same styles as AddCar
import OwnerHeader from "./OwnerHeader";
import { updateCar } from '../api'; // Import the updateCar function

const UpdateCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { car } = location.state || {}; // Get car data from location.state

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
  const [updatedCar, setUpdatedCar] = useState({
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

  // Update the userId in the updatedCar state when userId changes
  useEffect(() => {
    setUpdatedCar((prevCar) => ({ ...prevCar, userId }));
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar({ ...updatedCar, [name]: value });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdatedCar({ ...updatedCar, image: imageUrl });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await updateCar(car._id, updatedCar, token);
      console.log("Car updated successfully:", response.data);
      navigate('/owner/manage-cars');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update car. Please try again.');
    }
  };

  return (
    <div className="add-car-form">
      <OwnerHeader />
      <h2>Update Car</h2> {/* Static heading for Update Car */}
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {/* Left Section */}
          <div className="left-section">
            <div className="form-group">
              <label>Brand:</label>
              <input
                type="text"
                name="brand"
                value={updatedCar.brand}
                onChange={handleInputChange}
                disabled // Disable non-editable fields
                required
              />
            </div>
            <div className="form-group">
              <label>Model:</label>
              <input
                type="text"
                name="model"
                value={updatedCar.model}
                onChange={handleInputChange}
                disabled // Disable non-editable fields
                required
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={updatedCar.type}
                onChange={handleInputChange}
                disabled // Disable non-editable fields
                required
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="number"
                name="year"
                value={updatedCar.year}
                onChange={handleInputChange}
                disabled // Disable non-editable fields
                required
              />
            </div>
            <div className="form-group">
              <label>Mileage:</label>
              <input
                type="text"
                name="mileage"
                value={updatedCar.mileage}
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
                value={updatedCar.carNumber}
                onChange={handleInputChange}
                disabled // Disable non-editable fields
                required
              />
            </div>
            <div className="form-group">
              <label>Availability:</label>
              <select
                name="availability"
                value={updatedCar.availability}
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
                value={updatedCar.price}
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
                disabled // Disable non-editable fields
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={updatedCar.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button in Center */}
        <div className="button-container">
          <button type="submit" className="submit-button">Update Car</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCar;