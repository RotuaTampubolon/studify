'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await api.register(form);

    if (res.success) {
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } else {
      setError(res.message || 'Registrasi gagal');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">Buat Akun</h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Nama lengkap"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Minimal 6 karakter"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
