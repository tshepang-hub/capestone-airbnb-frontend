import React from 'react';
import './HotelCard.css';
import axios from 'axios';


const HotelCard = ({ image, title, details, price, id, onDelete }) => {

  const delet = async (id) => {
    try {
      const response = await axios.delete(`https://capstone-airbnb-backend-h39o.onrender.com/api/accommodations/${id}`);
      
      onDelete(id); // Trigger the parent to remove this card
    } catch (error) {
      console.error('Error deleting accommodation:', error);
    }
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-details">{details}</p>
        <div className="card-price">{price} /night</div>
      </div>
      <div className="button-group">
        <button className="button update">Update</button>
        <button className="button delete" onClick={() => delet(id)}>Delete</button>
      </div>
    </div>
  );
};

export default HotelCard;
