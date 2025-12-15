"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-8 container mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Bienvenue sur Lease Peace</h1>
                <p className="mt-2 text-gray-600">Votre tableau de bord de co-living.</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {role === 'RESIDENT' && (
                        <>
                            <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                                <h2 className="text-xl font-semibold mb-2">Mon Profil</h2>
                                <p className="text-sm text-gray-500 mb-4">Gérez vos préférences de matching.</p>
                                <a href="/questionnaire" className="text-blue-600 font-medium hover:underline">Modifier mes réponses &rarr;</a>
                            </div>
                            <div className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
                                <h2 className="text-xl font-semibold mb-2">Mes Matchs</h2>
                                <p className="text-sm text-gray-500 mb-4">Découvrez vos futurs colocataires.</p>
                                <a href="/matches" className="text-purple-600 font-medium hover:underline">Voir mes matchs &rarr;</a>
                            </div>
                        </>
                    )}

                    {role === 'OPERATOR' && (
                        <div className="col-span-2 bg-white p-6 rounded shadow border-l-4 border-orange-500">
                            <h2 className="text-xl font-semibold mb-2">Espace Balleur (Opérateur)</h2>
                            <p className="text-sm text-gray-500 mb-4">Gérez votre parc immobilier.</p>
                            <a href="/operator" className="text-orange-600 font-bold text-lg hover:underline">Accéder au Dashboard Opérateur &rarr;</a>
                        </div>
                    )}

                    {!role && <p>Chargement...</p>}
                </div>
            </div>
        </div>
    );
}
