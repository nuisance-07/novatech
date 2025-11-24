"use client";

import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Search, ShoppingBag, User, Home, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
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

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-lg bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    <div className="flex items-center border-b border-white/10 px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandInput
                            placeholder="Type a command or search..."
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <CommandList className="max-h-[300px] overflow-y-auto p-2">
                        <CommandEmpty className="py-6 text-center text-sm text-gray-500">No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions" className="text-xs text-gray-500 px-2 py-1.5 font-medium">
                            <CommandItem onSelect={() => runCommand(() => router.push("/"))} className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 cursor-pointer transition">
                                <Home className="h-4 w-4" />
                                <span>Home</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push("/shop"))} className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 cursor-pointer transition">
                                <ShoppingBag className="h-4 w-4" />
                                <span>Shop</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push("/admin"))} className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 cursor-pointer transition">
                                <User className="h-4 w-4" />
                                <span>Admin</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </div>
            </div>
        </CommandDialog>
    );
}
