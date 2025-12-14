"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function QuestionnairePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        circadian_rhythm: 'REGULAR',
        cleanliness: 5,
        noise_tolerance: 5,
        smoking: false,
        pets: false
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push('/login');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const userId = localStorage.getItem('userId');

        try {
            await api.post(`/profiles/${userId}`, formData);
            alert('Profil mis à jour !');
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la sauvegarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-8 max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Votre Profil & Préférences</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">

                    {/* Rythme */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Rythme de Sommeil</label>
                        <select
                            value={formData.circadian_rhythm}
                            onChange={e => setFormData({ ...formData, circadian_rhythm: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="EARLY_BIRD">Lève-tôt (Je me lève avant 7h)</option>
                            <option value="REGULAR">Régulier (7h - 23h)</option>
                            <option value="NIGHT_OWL">Oiseau de nuit (Je me couche tard)</option>
                        </select>
                    </div>

                    {/* Propreté */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Niveau de Propreté (1 = Relax, 10 = Maniaque) : {formData.cleanliness}
                        </label>
                        <input
                            type="range" min="1" max="10"
                            value={formData.cleanliness}
                            onChange={e => setFormData({ ...formData, cleanliness: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>

                    {/* Bruit */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Tolérance au Bruit (1 = Silence Absolu, 10 = Fête) : {formData.noise_tolerance}
                        </label>
                        <input
                            type="range" min="1" max="10"
                            value={formData.noise_tolerance}
                            onChange={e => setFormData({ ...formData, noise_tolerance: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>

                    {/* Booléens */}
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.smoking}
                                onChange={e => setFormData({ ...formData, smoking: e.target.checked })}
                            />
                            <span>Je fume</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.pets}
                                onChange={e => setFormData({ ...formData, pets: e.target.checked })}
                            />
                            <span>J'ai un animal</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Enregistrement...' : 'Sauvegarder mon Profil'}
                    </button>
                </form>
            </div>
        </div>
    );
}
