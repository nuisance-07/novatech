"use client";

import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Search, ShoppingBag, User, Home, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [products, setProducts] = React.useState<any[]>([]);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // Fetch products for search
    React.useEffect(() => {
        if (open && products.length === 0) {
            fetch('/api/products')
                .then(res => res.json())
                .then(data => setProducts(data))
                .catch(err => console.error("Failed to fetch products for search", err));
        }
    }, [open, products.length]);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-md">
                <div className="w-full max-w-2xl bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center border-b border-white/10 px-4">
                        <Search className="mr-3 h-5 w-5 shrink-0 opacity-50" />
                        <CommandInput
                            placeholder="Search products, categories, or commands..."
                            value={query}
                            onValueChange={setQuery}
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <CommandList className="max-h-[400px] overflow-y-auto p-2">
                        <CommandEmpty className="py-12 text-center text-sm text-gray-500">No results found.</CommandEmpty>

                        {query === "" && (
                            <CommandGroup heading="Quick Links" className="text-xs text-gray-500 px-2 py-1.5 font-medium">
                                <CommandItem onSelect={() => runCommand(() => router.push("/"))} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/10 cursor-pointer transition">
                                    <Home className="h-4 w-4" />
                                    <span>Home</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push("/shop"))} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/10 cursor-pointer transition">
                                    <ShoppingBag className="h-4 w-4" />
                                    <span>Shop</span>
                                </CommandItem>
                            </CommandGroup>
                        )}

                        {filteredProducts.length > 0 && (
                            <CommandGroup heading="Products" className="text-xs text-gray-500 px-2 py-1.5 font-medium">
                                {filteredProducts.map((product) => (
                                    <CommandItem
                                        key={product._id}
                                        onSelect={() => runCommand(() => router.push(`/shop/${product._id}`))}
                                        className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition group"
                                    >
                                        <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                                            {product.images && product.images.length > 0 ? (
                                                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <ShoppingBag className="h-5 w-5 text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-white">{product.name}</span>
                                            <span className="text-xs text-gray-500">{product.category} • ${product.price}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </div>
            </div>
        </CommandDialog>
    );
}
