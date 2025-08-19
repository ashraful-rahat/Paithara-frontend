'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axiosInstance from '@/utils/axios';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Log the data being sent to the backend
      console.log('Sending login request with:', { email, password });

      const response = await axiosInstance.post('/auth/login', { email, password });

      if (response.status === 200) {
        // Step 2: Log the full response data from the backend
        console.log('Login successful! Response data:', response.data);

        localStorage.setItem('token', response.data.token);
        const userRole = response.data.role;

        // Step 3: Log the specific role received
        console.log('User role:', userRole);

        // Conditional redirection based on role
        if (userRole === 'admin') {
          console.log('Redirecting to dashboard...');
          router.push('/dashboard');
        } else {
          console.log('Redirecting to home page...');
          router.push('/');
        }
      }
    } catch (err) {
      // Step 4: Log the full error object if the request fails
      console.error('Login failed. Error object:', err);

      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message ||
            'লগইন ব্যর্থ হয়েছে। দয়া করে আপনার তথ্য যাচাই করুন।'
        );
      } else {
        setError('একটি অপ্রত্যাশিত ত্রুটি হয়েছে।');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          লগইন
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="আপনার ইমেইল লিখুন"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg 
                         focus:outline-none focus:shadow-outline transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            নতুন ইউজার?{' '}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
