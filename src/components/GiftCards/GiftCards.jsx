import React from 'react';
import img from "../assets/Screenshot__120_-removebg-preview.png"
import './GiftCards.css'; 

const GiftCards = () => {
  return (
    <div className="gift-cards">
      <div className="gift-cards-text">
        <h1>Shop Airbnb <br/> gift cards</h1>
        <button>Learn more</button>
      </div>
      <div style={{width:"750px"}}>
        <img src={img} alt="Gift card 1" />
      </div>
    </div>
  );
};

export default GiftCards;
