
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { logout } from '../redux/authSlice';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Ticket, Home, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Navigation = () => {
  const { user } = useSelector(state => state.auth);
  const { bookedSeats, totalSeats } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem logging out",
        variant: "destructive"
      });
    }
  };

  return (
    <nav className="bg-white shadow-md mb-8 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Home className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl text-gray-800">Event Tickets</span>
            </Link>
            
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-300 transition-colors">
                Home
              </Link>
              {user && (
                <div className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600">
                  <Ticket className="mr-1" size={16} />
                  <span className="font-medium">Available: {totalSeats - bookedSeats.length}/{totalSeats}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  <User size={16} className="text-primary" />
                  <span className="hidden sm:inline text-gray-700">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="text-gray-700 hover:text-gray-900">
                  <Link to="/login" className="flex items-center gap-1"><LogIn className="h-4 w-4" />Login</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-gray-200 hover:border-gray-300">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
