"use client";

import Image from "next/image";
import { ArrowRight, Cpu, Globe, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <main className="min-h-screen bg-black text-white overflow-hidden">

            {/* Hero Section */}
            <section className="relative py-20 md:py-32 px-6">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                        We Are NovaTech.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Bridging the gap between humanity and the future. We curate the world's most advanced technology to empower creators, gamers, and visionaries.
                    </p>
                </div>
            </section>

            {/* Mission Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-surface border border-white/10 p-8 rounded-3xl hover:border-primary/50 transition duration-500 group">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Performance First</h3>
                        <p className="text-gray-400">
                            We only stock devices that push the boundaries of speed and efficiency. No compromises.
                        </p>
                    </div>
                    <div className="bg-surface border border-white/10 p-8 rounded-3xl hover:border-primary/50 transition duration-500 group">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Global Sourcing</h3>
                        <p className="text-gray-400">
                            From Silicon Valley to Shenzhen, we hunt down the rarest and most coveted tech on the planet.
                        </p>
                    </div>
                    <div className="bg-surface border border-white/10 p-8 rounded-3xl hover:border-primary/50 transition duration-500 group">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Authenticity Guaranteed</h3>
                        <p className="text-gray-400">
                            Every product is verified authentic. Full warranty support and premium after-sales care.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-white/5 bg-surface/50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">50k+</h4>
                        <p className="text-primary text-sm uppercase tracking-wider">Happy Customers</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
                        <p className="text-primary text-sm uppercase tracking-wider">Authentic</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">24/7</h4>
                        <p className="text-primary text-sm uppercase tracking-wider">Expert Support</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-white mb-2">Global</h4>
                        <p className="text-primary text-sm uppercase tracking-wider">Shipping</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center">
                <h2 className="text-4xl font-bold mb-8">Ready to upgrade your reality?</h2>
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition"
                >
                    Browse Collection <ArrowRight size={20} />
                </Link>
            </section>

        </main>
    );
}
