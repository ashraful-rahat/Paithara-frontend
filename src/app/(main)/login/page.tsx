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
      const response = await axiosInstance.post('/auth/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role); // ✅ role save করা হচ্ছে

        if (response.data.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/');
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'লগইন ব্যর্থ হয়েছে।');
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">লগইন</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg w-full py-3 px-4"
              placeholder="আপনার ইমেইল লিখুন"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg w-full py-3 px-4"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            নতুন ইউজার?{' '}
            <Link href="/register" className="text-blue-600 font-bold">
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
