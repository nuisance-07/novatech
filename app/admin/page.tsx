"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Plus,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  DollarSign,
  Box
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- Mock Data (Replace with API calls) ---
const MOCK_STATS = [
  { label: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign },
  { label: "Active Orders", value: "+573", change: "+12.5%", icon: ShoppingCart },
  { label: "Products in Stock", value: "1,203", change: "-4.5%", icon: Box },
  { label: "Active Users", value: "2,405", change: "+8.2%", icon: Users },
];

const MOCK_PRODUCTS = [
  { id: 1, name: "NovaPhone X1 Pro", price: "$1,199", stock: 50, category: "Phones", status: "Active" },
  { id: 2, name: "BladeBook Ultra 16", price: "$2,499", stock: 20, category: "Laptops", status: "Low Stock" },
  { id: 3, name: "SonicPods Elite", price: "$249", stock: 150, category: "Audio", status: "Active" },
  { id: 4, name: "Lumina Hub", price: "$129", stock: 0, category: "Smart Home", status: "Out of Stock" },
];

const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Liam Johnson", total: "$1,448.00", status: "Processing", date: "2 mins ago" },
  { id: "ORD-002", customer: "Olivia Smith", total: "$249.00", status: "Shipped", date: "1 hour ago" },
  { id: "ORD-003", customer: "Noah Williams", total: "$3,698.00", status: "Completed", date: "3 hours ago" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Phones",
    stock: "",
    images: "",
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newProduct: any) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          images: newProduct.images.split(",").map((s: string) => s.trim()),
        }),
      });
      if (!res.ok) throw new Error('Failed to add product');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setNewProduct({ name: "", description: "", price: "", category: "Phones", stock: "", images: "" });
    },
  });

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure?")) return;
    deleteMutation.mutate(id);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate(newProduct);
  };

  return (
    <div className="flex min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-500/30">

      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-gray-950/50 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            NovaTech.
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Workspace</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SidebarItem icon={Package} label="Products" active={activeTab === "products"} onClick={() => setActiveTab("products")} />
          <SidebarItem icon={ShoppingCart} label="Orders" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
          <SidebarItem icon={Users} label="Customers" active={activeTab === "customers"} onClick={() => setActiveTab("customers")} />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <SidebarItem icon={Settings} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-black/80 backdrop-blur-md">
          <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-full bg-gray-900 border border-gray-800 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white/10" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">

          {/* Stats Grid */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_STATS.map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">{stat.label}</span>
                      <stat.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-emerald-400 mt-1 flex items-center">
                      {stat.change} <span className="text-gray-500 ml-1">from last month</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Orders & Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 rounded-2xl border border-gray-800 bg-gray-900/30 overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-semibold">Recent Transactions</h3>
                    <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                        <tr>
                          <th className="px-6 py-3">Order ID</th>
                          <th className="px-6 py-3">Customer</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {MOCK_ORDERS.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4 font-medium">{order.id}</td>
                            <td className="px-6 py-4">{order.customer}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={order.status} />
                            </td>
                            <td className="px-6 py-4">{order.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20">
                      <Plus size={18} /> Add New Product
                    </button>
                    <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl font-medium transition-all border border-gray-700">
                      Export Report
                    </button>
                    <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl font-medium transition-all border border-gray-700">
                      Manage Users
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/30 overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-semibold">Inventory</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-all">
                  <Plus size={16} /> Add Product
                </button>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map((product: any) => (
                    <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                      <td className="px-6 py-4 text-gray-400">{product.category}</td>
                      <td className="px-6 py-4">{product.price}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4"><StatusBadge status={product.status} /></td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                          <MoreHorizontal size={16} className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
        ${active
          ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          : "text-gray-400 hover:text-gray-200 hover:bg-gray-900"
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Active": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Processing": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Shipped": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Low Stock": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Out of Stock": "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const defaultStyle = "bg-gray-500/10 text-gray-400 border-gray-500/20";

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
}