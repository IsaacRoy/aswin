
import React from 'react';
import { useSelector } from 'react-redux';
import BookTicket from '../components/BookTicket';
import TicketList from '../components/TicketList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">College Event Ticket Booking</h1>
        <p className="text-gray-600">Welcome to the ticket booking system for our college event!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} /> Ticket Information
            </CardTitle>
            <CardDescription>
              Check available seats and booked tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TicketList />
          </CardContent>
        </Card>
        
        <div>
          {isAuthenticated ? (
            <Card>
              <CardHeader>
                <CardTitle>Book Your Ticket</CardTitle>
                <CardDescription>
                  Fill in your details to reserve your seat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookTicket />
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                Please login to book tickets for the event.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
