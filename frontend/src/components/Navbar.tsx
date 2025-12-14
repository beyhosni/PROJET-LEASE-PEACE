"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/dashboard" className="text-xl font-bold">
                    Lease Peace
                </Link>
                <div className="space-x-4">
                    <Link href="/dashboard" className="hover:text-blue-200">
                        Dashboard
                    </Link>
                    <Link href="/questionnaire" className="hover:text-blue-200">
                        Mon Profil
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
