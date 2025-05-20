
import React from 'react';
import { useSelector } from 'react-redux';
import BookTicket from '../components/BookTicket';
import TicketList from '../components/TicketList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Ticket, CalendarCheck } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">College Event Ticket Booking</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Welcome to our official ticket booking system for the upcoming college event! Secure your seat for an unforgettable experience.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Users size={20} className="text-primary" /> Event Attendance
            </CardTitle>
            <CardDescription className="text-gray-500">
              Check available seats and current registrations
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <TicketList />
          </CardContent>
        </Card>
        
        <div>
          {isAuthenticated ? (
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <CalendarCheck size={20} className="text-primary" /> Reserve Your Spot
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Fill in your details to book your ticket
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <BookTicket />
              </CardContent>
            </Card>
          ) : (
            <Alert className="bg-blue-50 border-blue-100">
              <Ticket className="h-5 w-5 text-blue-500" />
              <AlertTitle className="text-blue-800 font-medium">Authentication Required</AlertTitle>
              <AlertDescription className="text-blue-700">
                Please login or register to book tickets for this event.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
