import React, { useState, useEffect } from "react";
import { fetchAllCars } from "../api"; // Import the fetchAllCars function
import { FaHeart, FaRegHeart, FaShoppingCart, FaSearch } from "react-icons/fa"; // For wishlist, cart, and search icons
import "../styles/Catalog.css"; // Add CSS for styling

const Catalog = () => {
  const [cars, setCars] = useState([]); // State to store all cars
  const [filteredCars, setFilteredCars] = useState([]); // State to store filtered cars
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [selectedCar, setSelectedCar] = useState(null); // State to store the selected car for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch all cars from the database
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await fetchAllCars(); // Use the fetchAllCars function
        setCars(carsData);
        setFilteredCars(carsData); // Initialize filtered cars with all cars
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search (triggered by clicking the search icon or pressing Enter)
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    // Filter cars based on the search query
    const filtered = cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.type.toLowerCase().includes(query) ||
        car.year.toString().includes(query)
    );
    setFilteredCars(filtered);
  };

  // Handle "Enter" key press in the search bar
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle "Learn More" click
  const handleLearnMore = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="catalog">
      {/* Catalog Heading and Search Bar */}
      <div className="catalog-header">
        <h2>Catalog</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cars by brand, model, or year..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress} // Trigger search on Enter key press
          />
          <button className="search-icon-button" onClick={handleSearch}>
            <FaSearch /> {/* Search icon */}
          </button>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="car-grid">
        {filteredCars.map((car) => (
          <div key={car._id} className="car-tile">
            {/* Wishlist Icon */}
            <div className="wishlist-icon">
              {car.isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </div>

            {/* Car Image */}
            <div className="car-image-container">
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-image" />
            </div>

            {/* Car Details */}
            <div className="car-details">
              <h3>{car.brand} {car.model}, {car.year}</h3>
              <p className="car-price">${car.price}/hr</p>
            </div>

            {/* Buttons */}
            <div className="car-buttons">
              <button className="cart-button">
                <FaShoppingCart /> {/* Cart icon */}
              </button>
              <button
                className="learn-more-button"
                onClick={() => handleLearnMore(car)}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Detailed Car Information */}
      {isModalOpen && selectedCar && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button (Cross Mark) */}
            <button className="close-modal-button" onClick={handleCloseModal}>
              ×
            </button>

            {/* Car Image in Modal */}
            <div className="modal-car-image-container">
              <img src={selectedCar.image} alt={`${selectedCar.brand} ${selectedCar.model}`} className="modal-car-image" />
            </div>

            <h2>{selectedCar.brand} {selectedCar.model}</h2>
            <p>Type: {selectedCar.type}</p>
            <p>Mileage: {selectedCar.mileage}</p>
            <p>Price: ${selectedCar.price}/hr</p>
            <p>Availability: {selectedCar.availability}</p>

            <div className="modal-buttons">
              <button className="cart-button2">
                <FaShoppingCart /> {/* Cart icon */}
              </button>
              <button className="book-now-button">Book Now</button>
            </div>

            {/* Owner Details */}
            <div className="owner-details">
              <h3>Owner Details</h3>
              <p>Name: {selectedCar.owner?.firstName || "N/A"}</p>
              <p>Phone: {selectedCar.owner?.phoneNumber || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;