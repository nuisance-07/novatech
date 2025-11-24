"use client";

import SalesChart from "@/components/admin/SalesChart";
import { Package, Users, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold">$45,231.89</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <DollarSign size={20} />
            </div>
          </div>
          <span className="text-green-500 text-sm flex items-center gap-1">
            <TrendingUp size={14} /> +20.1% from last month
          </span>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Active Orders</p>
              <h3 className="text-2xl font-bold">+573</h3>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-500">
              <Package size={20} />
            </div>
          </div>
          <span className="text-green-500 text-sm flex items-center gap-1">
            <TrendingUp size={14} /> +12% since last hour
          </span>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">Active Now</p>
              <h3 className="text-2xl font-bold">+2350</h3>
            </div>
            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500">
              <Users size={20} />
            </div>
          </div>
          <span className="text-gray-400 text-sm">
            +180 since last hour
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Recent Sales Table */}
        <div className="bg-surface rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-bold mb-4">Recent Sales</h3>
          <div className="space-y-4">
            {[
              { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
              { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
              { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
              { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
              { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" }
            ].map((sale, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold">
                    {sale.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{sale.name}</p>
                    <p className="text-xs text-gray-400">{sale.email}</p>
                  </div>
                </div>
                <span className="font-bold">{sale.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}