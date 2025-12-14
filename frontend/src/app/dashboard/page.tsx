"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function DashboardPage() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        // Example: Fetch user profile (Assuming userId matches current user for simplicity in MVP)
        // Real implementation would decode token to get ID, or have /users/me endpoint
        // For now, we just show a placeholder
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Bienvenue sur Lease Peace</h1>
            <p className="mt-4 text-gray-600">Votre tableau de bord de co-living.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Mon Profil</h2>
                    <p className="text-sm text-gray-500">Gérez vos préférences de matching.</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Mes Matchs</h2>
                    <p className="text-sm text-gray-500">Découvrez vos futurs colocataires.</p>
                </div>
            </div>
        </div>
    );
}
