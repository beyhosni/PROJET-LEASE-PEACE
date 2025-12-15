"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function MatchesPage() {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            const userId = localStorage.getItem('userId');

            // 1. Get My Profile
            const myProfileRes = await api.get(`/profiles/${userId}`);
            const myProfile = myProfileRes.data.answers;

            if (!myProfile) {
                alert("Remplissez d'abord votre profil !");
                return;
            }

            // 2. Get All Candidates
            const candidatesRes = await api.get('/profiles');
            const candidates = candidatesRes.data
                .filter((p: any) => p.userId !== userId) // Exclude self
                .map((p: any) => p.answers);

            // 3. Calculate Batch Match
            const matchRes = await api.post('/match/batch', {
                myProfile,
                candidates
            });

            setMatches(matchRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Mes Matchs Compatibles</h1>

                {loading ? <p>Recherche des âmes soeurs...</p> : (
                    <div className="grid grid-cols-1 gap-4">
                        {matches.length === 0 && <p>Aucun profil compatible trouvé pour le moment.</p>}

                        {matches.map((m, idx) => (
                            <div key={idx} className="bg-white p-6 rounded shadow flex justify-between items-center border-l-4 border-green-500">
                                <div>
                                    <h3 className="text-xl font-bold">Candidat #{idx + 1}</h3>
                                    <pre className="text-sm text-gray-500 mt-2 whitespace-pre-wrap font-sans">
                                        {m.result.explanation}
                                    </pre>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-bold text-green-600">{m.result.score}%</div>
                                    <div className="text-gray-500 text-sm">Compatibilité</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
