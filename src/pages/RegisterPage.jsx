
import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/Register';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Register />
          <div className="mt-4 text-center text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login here</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
