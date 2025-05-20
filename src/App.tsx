
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/config";
import { loginSuccess, logout } from "./redux/authSlice";

import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AuthObserver = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginSuccess({
          uid: user.uid,
          email: user.email
        }));
      } else {
        dispatch(logout());
      }
    });
    
    return () => unsubscribe();
  }, [dispatch]);
  
  return null;
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <AuthObserver />
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navigation />
            <main className="flex-1 py-6">
              <div className="container mx-auto px-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
            <footer className="py-4 border-t bg-white mt-auto">
              <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} College Event System. All rights reserved.
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
