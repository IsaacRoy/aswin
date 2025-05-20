
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { logout } from '../redux/authSlice';
import { Button } from '@/components/ui/button';
import { LogIn, User, Ticket, Home, Users } from 'lucide-react';

const Navigation = () => {
  const { user } = useSelector(state => state.auth);
  const { bookedSeats, totalSeats } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Home className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-bold text-xl">Event Tickets</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Home
              </Link>
              {user && (
                <div className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500">
                  <Ticket className="mr-1" size={16} />
                  <span>Available: {totalSeats - bookedSeats.length}/{totalSeats}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1 rounded-full">
                  <User size={16} className="text-blue-600" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login"><LogIn className="mr-1" size={16} />Login</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
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
