"use client";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { SearchCommand } from "@/components/ui/SearchCommand";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.length);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-heading font-bold text-white tracking-tighter hover:text-primary transition-colors duration-300">
                  NOVA<span className="text-primary">TECH</span>
                </span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-12 flex items-baseline space-x-8">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/shop">Shop</NavLink>
                  <NavLink href="/compare">Compare</NavLink>
                  <NavLink href="/admin">Admin</NavLink>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <SignedOut>
                <Link href="/sign-in" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/sign-up" className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                  Sign Up
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/5"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/5 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>


        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/5">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10">Home</Link>
              <Link href="/shop" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10">Shop</Link>
              <Link href="/compare" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10">Compare</Link>
              <Link href="/admin" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10">Admin</Link>
            </div>
          </div>
        )}
      </nav >
      <SearchCommand open={isSearchOpen} setOpen={setIsSearchOpen} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative group px-1 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}