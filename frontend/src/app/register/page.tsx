"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('RESIDENT');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Create User
            await api.post('/users', { email, password, role });
            // 2. Auto Login (Optional, but good UX) - skipping for simplicity, user goes to login
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Inscription</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="RESIDENT">Résident (Locataire)</option>
                        <option value="OPERATOR">Opérateur (Propriétaire)</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                    >
                        Créer mon compte
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-blue-500 text-sm hover:underline">Déjà un compte ? Se connecter</Link>
                </div>
            </div>
        </div>
    );
}
