"use client";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            NovaTech
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <Link href="/shop" className="hover:text-primary transition">Shop</Link>
              <Link href="/admin" className="hover:text-primary transition">Admin</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {useCartStore.getState().totalItems()}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-white/10">Home</Link>
            <Link href="/shop" className="block px-3 py-2 rounded-md hover:bg-white/10">Shop</Link>
            <Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-white/10">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
}