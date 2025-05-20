
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { logout } from '../redux/authSlice';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Ticket, 
  LogIn, 
  LogOut, 
  User, 
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const { bookedSeats, totalSeats } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md mb-8 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Home className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl text-gray-800">Event Tickets</span>
            </Link>
            
            <div className="hidden md:ml-8 md:flex md:items-center md:space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link 
                      to="/" 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive('/') ? 'bg-primary/10 text-primary' : ''
                      )}
                    >
                      Home
                    </Link>
                  </NavigationMenuItem>
                  
                  {user && (
                    <>
                      <NavigationMenuItem>
                        <div className={cn(
                          navigationMenuTriggerStyle(),
                          "cursor-default"
                        )}>
                          <Ticket className="mr-1" size={16} />
                          <span>Available: {totalSeats - bookedSeats.length}/{totalSeats}</span>
                        </div>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link 
                          to="/tickets" 
                          className={cn(
                            navigationMenuTriggerStyle(),
                            isActive('/tickets') ? 'bg-primary/10 text-primary' : ''
                          )}
                        >
                          <Calendar className="mr-1" size={16} />
                          My Tickets
                        </Link>
                      </NavigationMenuItem>
                    </>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  <User size={16} className="text-primary" />
                  <span className="hidden sm:inline text-gray-700">{user.email}</span>
                </div>
                <Button variant="white" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="white" size="sm" asChild className="text-gray-700">
                  <Link to="/login" className="flex items-center gap-1"><LogIn className="h-4 w-4" />Login</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-gray-200 hover:border-gray-300">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {user && (
              <>
                <div className="px-3 py-2 flex items-center text-sm text-gray-700">
                  <Ticket className="mr-2" size={16} />
                  <span>Available: {totalSeats - bookedSeats.length}/{totalSeats}</span>
                </div>
                <Link 
                  to="/tickets"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/tickets') ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Calendar className="mr-2" size={16} />
                    My Tickets
                  </div>
                </Link>
                <div className="pt-2 pb-1 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2 px-3 py-1">
                    <User size={16} className="text-primary" />
                    <span className="text-sm text-gray-700">{user.email}</span>
                  </div>
                  <Button variant="white" size="sm" onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }} className="w-full flex justify-center items-center gap-1">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </div>
              </>
            )}
            
            {!user && (
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Button variant="white" size="sm" asChild className="w-full">
                  <Link 
                    to="/login" 
                    className="flex justify-center items-center gap-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4" /> Login
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link 
                    to="/register" 
                    className="flex justify-center items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
