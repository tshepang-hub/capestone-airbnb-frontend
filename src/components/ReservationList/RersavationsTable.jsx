import { useEffect, useState } from "react";
import "./ReservationTable.css";
import Cookies from 'universal-cookie';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationsTable = () => {
  const cookies = new Cookies();
  const loggedInUser = cookies.get('loggedInUser');
  const [reservations, setReservations] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://capstone-airbnb-backend-h39o.onrender.com/api/reservations/host`, {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
          'Content-Type': 'application/json',
        }
      });

      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchData();
    }
  }, [loggedInUser]);

  const deleteReserve = async (id) => {
    try {
      await axios.delete(`https://capstone-airbnb-backend-h39o.onrender.com/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        }
      });
      setReservations(reservations.filter(reservation => reservation._id !== id));
      toast.success('Reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast.error('Failed to delete reservation');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="reservations-table">
        <h2>My Reservations</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Booked by</th>
                <th>Property</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations?.map((reservation, i) => {
                const { checkInDate, checkOutDate } = reservation;
                
                if (reservation.accommodation.createdBy === loggedInUser.user.id) {
                  return (
                    <tr key={i}>
                      <td>{reservation?.guests}</td>
                      <td>{reservation?.accommodation?.name}</td>
                      <td>{checkInDate.split("T")[0]}</td>
                      <td>{checkOutDate.split("T")[0]}</td>
                      <td>
                        <button className="delete-button" onClick={() => deleteReserve(reservation._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReservationsTable;
