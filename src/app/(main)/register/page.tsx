'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axiosInstance from '@/utils/axios';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post('/auth/register', { email, password });
      
      if (response.status === 201) {
        setSuccess('রেজিস্ট্রেশন সফল হয়েছে! এখন লগইন করতে পারেন।');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">রেজিস্ট্রেশন</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">ইমেইল</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="আপনার ইমেইল লিখুন"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'রেজিস্টারিং...' : 'রেজিস্টার'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-bold">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
