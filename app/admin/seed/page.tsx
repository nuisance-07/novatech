"use client";

import { useState } from "react";

export default function SeedPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSeed = async () => {
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch("/api/seed", {
                method: "POST",
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`✅ Success! Seeded ${data.count} products.`);
            } else {
                setError(`❌ Error: ${data.error || "Unknown error"}`);
            }
        } catch (err: any) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-white mb-4">Database Seed</h1>
                <p className="text-gray-300 mb-6">
                    Click the button below to populate the production database with products.
                </p>

                <button
                    onClick={handleSeed}
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                    {loading ? "Seeding..." : "Seed Database"}
                </button>

                {message && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-xl">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
