
import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/Register';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-md border-gray-200">
        <CardHeader className="space-y-2 border-b bg-gray-50 pb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Create Account</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Sign up to start booking event tickets
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Register />
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Login here</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
