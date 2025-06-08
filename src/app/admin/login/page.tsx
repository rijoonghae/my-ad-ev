'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      router.push('/admin/dashboard');
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <main className="min-h-screen bg-[#FBD9CD] flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#FBD9CD]">
        <div className="flex items-center justify-center mb-12">
          <Link href="/">
            <Image src="/ADA-EV.png" alt="Logo Ada-EV" width={108*1.5} height={60*1.5} priority/>
          </Link>
        </div>  
        
        <h1 className="mb-8 text-center text-gray-700 text-3xl font-semibold">Welcome back, Admin</h1>

        {error && (
          <p className="text-red-600 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium text-gray-700 pl-4 px-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full border bg-[#f89c8a] border-gray-700 text-white p-4"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700 pl-4 px-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border bg-[#f89c8a] border-gray-700 text-white p-4"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="rounded-full border-gray-800 border bg-gray-900 px-15 py-3 text-white hover:bg-[#F27E68] transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
