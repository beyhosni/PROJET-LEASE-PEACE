"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        // Example: Fetch user profile (Assuming userId matches current user for simplicity in MVP)
        // Real implementation would decode token to get ID, or have /users/me endpoint
        // For now, we just show a placeholder
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-8 container mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Bienvenue sur Lease Peace</h1>
                <p className="mt-2 text-gray-600">Votre tableau de bord de co-living.</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                        <h2 className="text-xl font-semibold mb-2">Mon Profil</h2>
                        <p className="text-sm text-gray-500 mb-4">Gérez vos préférences de matching.</p>
                        <a href="/questionnaire" className="text-blue-600 font-medium hover:underline">Modifier mes réponses &rarr;</a>
                    </div>
                    <div className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
                        <h2 className="text-xl font-semibold mb-2">Mes Matchs</h2>
                        <p className="text-sm text-gray-500">Découvrez vos futurs colocataires.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
