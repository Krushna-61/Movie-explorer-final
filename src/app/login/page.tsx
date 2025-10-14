"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  // Get session status and router
  const { status } = useSession();
  const router = useRouter();

  // Local state for form input and error messages
  const [email, setEmail] = useState('user@example.com'); // Pre-fill for easy testing
  const [password, setPassword] = useState('password123'); // Pre-fill for easy testing
  const [error, setError] = useState('');

  // Effect to redirect already logged-in users
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/'); // Redirect logged-in users to the main page
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Call NextAuth signIn function with the 'credentials' provider
    const result = await signIn('credentials', {
      redirect: false, // Prevent NextAuth from doing the redirect
      email,
      password,
    });

    if (result?.error) {
      setError('Login failed: Invalid email or password.');
    } else if (result?.ok) {
      // Manual redirect on success, which triggers the useEffect cleanup
      router.push('/'); 
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    // Show a global loading indicator while checking auth or redirecting
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-xl">
        Loading Session...
      </div>
    ); 
  }

  // Login Form for unauthenticated users
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Movie Explorer Login</h1>
        {error && <p className="text-red-400 mb-4 text-center border border-red-500 p-2 rounded">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email (use: user@example.com)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password (use: password123)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}