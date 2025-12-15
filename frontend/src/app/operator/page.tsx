"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function OperatorDashboard() {
    const router = useRouter();
    const [properties, setProperties] = useState<any[]>([]);
    const [newProp, setNewProp] = useState({ name: '', address: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'OPERATOR') {
            alert("Accès réservé aux opérateurs.");
            router.push('/dashboard');
            return;
        }
        loadProperties();
    }, [router]);

    const loadProperties = async () => {
        try {
            const res = await api.get('/operators/properties');
            setProperties(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProperty = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const operatorId = localStorage.getItem('userId');
        try {
            await api.post('/operators/properties', {
                operatorId,
                ...newProp
            });
            setNewProp({ name: '', address: '' });
            loadProperties();
        } catch (err) {
            alert("Erreur lors de l'ajout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Espace Opérateur</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Formulaire Ajout */}
                    <div className="bg-white p-6 rounded shadow h-fit">
                        <h2 className="text-xl font-bold mb-4">Ajouter une Propriété</h2>
                        <form onSubmit={handleAddProperty} className="space-y-4">
                            <input
                                placeholder="Nom (ex: Résidence Kley)"
                                value={newProp.name}
                                onChange={e => setNewProp({ ...newProp, name: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <textarea
                                placeholder="Adresse complète"
                                value={newProp.address}
                                onChange={e => setNewProp({ ...newProp, address: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                            >
                                {loading ? 'Ajout...' : 'Ajouter au Portfolio'}
                            </button>
                        </form>
                    </div>

                    {/* Liste Propriétés */}
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Mes Propriétés ({properties.length})</h2>
                        {properties.length === 0 ? <p className="text-gray-500">Aucune propriété gérée.</p> : (
                            <ul className="space-y-3">
                                {properties.map((p: any) => (
                                    <li key={p.id} className="border-b pb-2 last:border-0">
                                        <div className="font-bold">{p.name}</div>
                                        <div className="text-sm text-gray-600">{p.address}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
