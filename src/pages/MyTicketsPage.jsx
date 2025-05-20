
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/hooks/use-toast';
import { Calendar, Ticket } from 'lucide-react';

const MyTicketsPage = () => {
  const { user } = useSelector(state => state.auth);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const q = query(
          collection(db, "tickets"), 
          where("userId", "==", user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const userTickets = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setTickets(userTickets);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
        toast({
          title: "Error loading tickets",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Card className="shadow-sm border-gray-200">
          <CardContent className="pt-6 text-center py-12">
            <p className="text-gray-500">Please login to view your tickets</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Ticket size={20} className="text-primary" /> My Tickets
          </CardTitle>
          <CardDescription className="text-gray-500">
            View all the tickets you've booked for the event
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : tickets.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead><Calendar className="h-4 w-4 inline mr-2" /> Booking Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket, index) => (
                    <TableRow key={ticket.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <TableCell className="font-medium">{ticket.name}</TableCell>
                      <TableCell>
                        {new Date(ticket.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-md bg-gray-50">
              <p className="text-gray-500">You haven't booked any tickets yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTicketsPage;
