"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/app/actions/search";
import Image from "next/image";

interface SearchCommandProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function SearchCommand({ open, setOpen }: SearchCommandProps) {
    const router = useRouter();
    const [query, setQuery] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState<any[]>([]);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, setOpen]);

    React.useEffect(() => {
        if (!open) {
            setQuery("");
            setResults([]);
            return;
        }
    }, [open]);

    React.useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await searchProducts(query);
                setResults(data);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setOpen(false)}
            />

            <div className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center border-b border-white/10 px-4">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 h-14 bg-transparent text-white placeholder:text-gray-500 outline-none text-lg"
                        autoFocus
                    />
                    {loading && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                    <div className="ml-3 flex items-center gap-1">
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
                            ESC
                        </kbd>
                    </div>
                </div>

                {(results.length > 0 || query) && (
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {results.length === 0 && query && !loading && (
                            <div className="py-6 text-center text-sm text-gray-400">
                                No results found.
                            </div>
                        )}

                        {results.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => {
                                    router.push(`/shop/${product._id}`);
                                    setOpen(false);
                                }}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors"
                            >
                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white/5 flex-shrink-0">
                                    {product.images?.[0] ? (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop"
                                            alt={product.name}
                                            fill
                                            className="object-cover grayscale opacity-50"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">
                                        {product.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 truncate">
                                        {product.category}
                                    </p>
                                </div>
                                <div className="text-sm font-medium text-white">
                                    ${product.price.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
