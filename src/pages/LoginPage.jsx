
import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Login />
          <div className="mt-4 text-center text-sm">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Register here</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
