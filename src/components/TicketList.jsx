
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { fetchTicketsStart, fetchTicketsSuccess, fetchTicketsFailure } from '../redux/ticketSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TicketList = () => {
  const { totalSeats, bookedSeats, loading } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  
  const availableSeats = totalSeats - bookedSeats.length;

  useEffect(() => {
    const fetchTickets = async () => {
      dispatch(fetchTicketsStart());
      
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const ticketsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch(fetchTicketsSuccess(ticketsData));
      } catch (error) {
        dispatch(fetchTicketsFailure(error.message));
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-4">Loading ticket information...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center mb-4">
        <Badge variant="outline" className="text-sm px-4 py-1">
          Total: {totalSeats}
        </Badge>
        <Badge variant="secondary" className="text-sm px-4 py-1">
          Booked: {bookedSeats.length}
        </Badge>
        <Badge variant="default" className="text-sm px-4 py-1">
          Available: {availableSeats}
        </Badge>
      </div>
      
      {bookedSeats.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookedSeats.map((ticket, index) => (
                <TableRow key={ticket.id || index}>
                  <TableCell>{ticket.name}</TableCell>
                  <TableCell>{ticket.userEmail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-4">No tickets booked yet.</p>
      )}
    </div>
  );
};

export default TicketList;
