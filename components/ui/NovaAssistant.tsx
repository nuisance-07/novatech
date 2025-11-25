"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2, Bot, User } from "lucide-react";
import { chatWithNova } from "@/app/actions/chat";

interface Message {
    role: "user" | "model";
    parts: string;
}

export default function NovaAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", parts: "Hello! I'm Nova. Ask me anything about our futuristic gear." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", parts: userMessage }]);
        setIsLoading(true);

        try {
            // Convert messages to history format for the server action
            // We exclude the very last user message from history as it's the current prompt
            const history = messages.map(m => ({ role: m.role, parts: m.parts }));

            const response = await chatWithNova(history, userMessage);

            if (response.error) {
                setMessages(prev => [...prev, { role: "model", parts: "I'm having trouble connecting. Please check your API key." }]);
            } else if (response.text) {
                setMessages(prev => [...prev, { role: "model", parts: response.text }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "model", parts: "Something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl w-[350px] h-[500px] shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                <span className="font-bold text-white">Nova AI</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-white/10" : "bg-gradient-to-br from-cyan-500 to-blue-600"
                                        }`}>
                                        {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className={`rounded-2xl p-3 text-sm max-w-[80%] ${msg.role === "user"
                                            ? "bg-white/10 text-white rounded-tr-none"
                                            : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                                        }`}>
                                        {msg.parts}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 border border-white/5 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask about our products..."
                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-black p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                </button>
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
                <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    {isOpen ? <X className="text-white w-6 h-6" /> : <Sparkles className="text-white w-6 h-6" />}
                </div>
            </motion.button>
        </div>
    );
}
