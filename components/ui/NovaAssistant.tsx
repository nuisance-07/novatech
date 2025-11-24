"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const FACTS: Record<string, string[]> = {
    "/": [
        "Welcome to NovaTech! Check out our latest arrivals.",
        "Did you know? We offer free shipping on orders over $500.",
        "Our 'BladeBook' is rated #1 for creative professionals.",
    ],
    "/shop": [
        "Looking for something specific? Try Cmd+K to search.",
        "All our products come with a 2-year warranty.",
        "The 'SonicPods' have active noise cancellation.",
    ],
    "/cart": [
        "Almost there! Secure checkout is just a click away.",
        "Don't forget to check for promo codes!",
    ],
    "/admin": [
        "Welcome back, Admin. Check the dashboard for new orders.",
        "Inventory looking low on 'CyberWatch 7'.",
    ],
    "default": [
        "I'm Nova, your AI assistant. How can I help?",
        "Experience the future of technology with NovaTech.",
    ]
};

export default function NovaAssistant() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Pick a random fact based on current path
        const facts = FACTS[pathname] || FACTS["default"];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setMessage(randomFact);

        // Auto-open occasionally or on route change
        setIsOpen(true);
        const timer = setTimeout(() => setIsOpen(false), 8000);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div className="fixed bottom-6 right-24 z-50 flex items-end flex-col gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl max-w-xs shadow-2xl pointer-events-auto relative"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        >
                            <X size={12} />
                        </button>
                        <div className="flex gap-3">
                            <div className="w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-cyan-400 mb-1">NOVA AI</p>
                                <p className="text-sm text-gray-200 leading-relaxed">{message}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="pointer-events-auto relative group"
            >
                {/* Glowing Orb Effect */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"
                />
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    <Sparkles className="text-white w-5 h-5" />
                </div>
            </motion.button>
        </div>
    );
}
