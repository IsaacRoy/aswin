
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { bookTicketStart, bookTicketSuccess, bookTicketFailure } from '../redux/ticketSlice';

const BookTicket = () => {
  const [name, setName] = useState('');
  const { user } = useSelector(state => state.auth);
  const { totalSeats, bookedSeats, loading } = useSelector(state => state.tickets);
  const dispatch = useDispatch();

  const availableSeats = totalSeats - bookedSeats.length;

  const handleBookTicket = async (e) => {
    e.preventDefault();
    
    if (availableSeats <= 0) {
      alert('No seats available');
      return;
    }
    
    dispatch(bookTicketStart());
    
    try {
      const newTicket = {
        name,
        userId: user.uid,
        userEmail: user.email,
        timestamp: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, "tickets"), newTicket);
      dispatch(bookTicketSuccess({ ...newTicket, id: docRef.id }));
      setName('');
      alert('Ticket booked successfully!');
    } catch (error) {
      dispatch(bookTicketFailure(error.message));
      alert('Failed to book ticket: ' + error.message);
    }
  };

  if (!user) {
    return <p>Please login to book tickets</p>;
  }

  return (
    <div>
      <h3>Book a Ticket</h3>
      <p>Available Seats: {availableSeats} / {totalSeats}</p>
      
      {availableSeats > 0 ? (
        <form onSubmit={handleBookTicket}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Booking...' : 'Book Ticket'}
          </button>
        </form>
      ) : (
        <p>Sorry, no seats available.</p>
      )}
    </div>
  );
};

export default BookTicket;
