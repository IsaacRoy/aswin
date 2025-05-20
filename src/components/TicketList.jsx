
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { fetchTicketsStart, fetchTicketsSuccess, fetchTicketsFailure } from '../redux/ticketSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/hooks/use-toast';
import { Calendar, User } from 'lucide-react';

const TicketList = () => {
  const { totalSeats, bookedSeats, loading, error } = useSelector(state => state.tickets);
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
        toast({
          title: "Error loading tickets",
          description: error.message,
          variant: "destructive"
        });
      }
    };

    fetchTickets();
  }, [dispatch]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-md text-red-700 text-center">
        Error loading tickets: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center mb-4">
        <Badge variant="outline" className="text-sm px-4 py-1">
          Total: {totalSeats}
        </Badge>
        <Badge variant="secondary" className="text-sm px-4 py-1">
          Booked: {bookedSeats.length}
        </Badge>
        <Badge variant="primary" className="text-sm px-4 py-1 bg-primary text-white">
          Available: {availableSeats}
        </Badge>
      </div>
      
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : bookedSeats.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><User className="h-4 w-4 inline mr-2" /> Name</TableHead>
                <TableHead><Calendar className="h-4 w-4 inline mr-2" /> Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookedSeats.map((ticket, index) => (
                <TableRow key={ticket.id || index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <TableCell className="font-medium">{ticket.name}</TableCell>
                  <TableCell>{ticket.userEmail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground border rounded-md bg-gray-50">
          <p className="text-gray-500">No tickets booked yet.</p>
          <p className="text-sm text-gray-400 mt-1">Be the first to book!</p>
        </div>
      )}
    </div>
  );
};

export default TicketList;
