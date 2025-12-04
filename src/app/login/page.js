'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        setSuccess(data.message);

        
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);

        
        if (data.role === "admin") {
            router.push("/admin");
        } else if (data.role === "charity_staff") {
            router.push("/charityStaff");
        } else {
            router.push("/donor");
        }

    } else {
        setError(data.error || data.message);
    }
};


    return (
    <main>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-extrabold mb-6">SustainWear</h1>

            <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                        Log in
                    </button>

                    <Link href="/register">
                        <button type="button" className="w-full border border-black text-black py-2 rounded-md hover:bg-gray-200 transition">
                            Create an account
                        </button>
                    </Link>
                </form>

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
            </div>
        </div>
    </main>
);

}
