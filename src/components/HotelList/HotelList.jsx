import React, { useState, useEffect } from 'react';
import HotelCard from '../HotelCard/HotelCard';
import Cookies from 'universal-cookie';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function HotelList() {
  const cookies = new Cookies();
  const loggedInUser = cookies.get('loggedInUser');
  const [hotels, setHotels] = useState([]); // Initialize as an empty array
  
  useEffect(() => {
    async function getAccommodations() {
      try {
        const response = await axios.get(`https://capstone-airbnb-backend-h39o.onrender.com/api/accommodations/user/${loggedInUser?.user?.id}`, {
          headers: {
            'Authorization': `Bearer ${loggedInUser.token}`
          }
        });
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (loggedInUser) {
      getAccommodations();
    }
  }, [loggedInUser]);

  const handleDelete = (id) => {
    setHotels(hotels.filter(hotel => hotel._id !== id)); // Remove the deleted hotel from the list
    toast.success("deleted succsefully");
  };

  return (
    <>
    <ToastContainer/>
    <div>
      <h1>My Hotel List</h1>
      {hotels.length === 0 ? (
        <p>No listings made</p>
      ) : (
        hotels.map((hotel, index) => (
          <HotelCard
            key={index}
            image={hotel.images[0]}
            title={hotel.name} // Assuming `name` is the title
            details={`Location: ${hotel.location}, Rating: ${hotel.rating}`} // Combine details
            price={`$${hotel.price}`} // Format price with $
            id={hotel._id}
            onDelete={handleDelete} // Pass down the delete handler
          />
        ))
      )}
    </div>
    </>
  );
}

export default HotelList;
