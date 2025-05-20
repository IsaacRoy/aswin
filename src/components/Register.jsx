
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess({
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }));
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 py-4">
      {error && <div className="p-3 rounded bg-red-50 text-red-500 text-sm border border-red-100">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="name@example.com"
            className="w-full rounded-md border"
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border"
            placeholder="Create a strong password" 
            required 
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-white hover:bg-primary/90"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
};

export default Register;
