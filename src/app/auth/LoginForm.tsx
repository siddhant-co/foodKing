'use client';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';


import { loginSuccess } from '../../../store/slices/authSlice';
import ForgotPassword from './ForgotPassword/page';





export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // New state to toggle between login and forgot password
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch('https://ecom-testing.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (res.ok) {
        const data = await res.json();
        if (data.user && data.token) {
          dispatch(loginSuccess({ customer: data.user, token: data.token }));
  
          toast.success('Login successful! Redirecting...');
          setEmail('');
          setPassword('');
  
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          toast.error('Invalid login response');
        }
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
  

  if (showForgotPassword) {
    // Show Forgot Password component
    return (
      <div className="max-w-md mx-auto p-6 border bg-white shadow rounded">
        <button
          onClick={() => setShowForgotPassword(false)}
          className="mb-4 text-blue-600 underline"
        >
          ← Back to Login
        </button>
        <ForgotPassword />
      </div>
    );
  }

  // Default: show login form
  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto p-6 border border-gray-300 bg-white shadow rounded"
      autoComplete="off"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded border-gray-300"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded border-gray-300"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer" 
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Forgot password toggle */}
      <p className="mt-4 text-center text-sm">
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-blue-600 underline"
        >
          Forgot password?
        </button>
      </p>
    </form>
  );
}
