
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { bookTicketStart, bookTicketSuccess, bookTicketFailure } from '../redux/ticketSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Ticket } from 'lucide-react';

const BookTicket = () => {
  const [name, setName] = useState('');
  const { user } = useSelector(state => state.auth);
  const { totalSeats, bookedSeats, loading } = useSelector(state => state.tickets);
  const dispatch = useDispatch();

  const availableSeats = totalSeats - bookedSeats.length;
  const availabilityPercentage = (availableSeats / totalSeats) * 100;

  const handleBookTicket = async (e) => {
    e.preventDefault();
    
    if (availableSeats <= 0) {
      toast({
        title: "No seats available",
        description: "Sorry, all seats have been booked",
        variant: "destructive"
      });
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
      toast({
        title: "Success!",
        description: "Your ticket has been successfully booked",
      });
    } catch (error) {
      dispatch(bookTicketFailure(error.message));
      toast({
        title: "Booking failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return <p className="text-center py-4 text-gray-500">Please login to book tickets</p>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Ticket className="h-5 w-5 text-primary" /> Book Your Ticket
          </h3>
          <span className="text-sm font-medium">
            {availableSeats} / {totalSeats} seats left
          </span>
        </div>
        <Progress value={availabilityPercentage} className="h-2" />
      </div>
      
      {availableSeats > 0 ? (
        <form onSubmit={handleBookTicket} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            variant="white"
            className="w-full button-hover-effect"
          >
            {loading ? 'Booking...' : 'Book Ticket'}
          </Button>
        </form>
      ) : (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-center">
          Sorry, no seats available for this event.
        </div>
      )}
    </div>
  );
};

export default BookTicket;
