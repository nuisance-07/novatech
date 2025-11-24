"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
    { name: 'Aug', sales: 4000 },
    { name: 'Sep', sales: 3000 },
    { name: 'Oct', sales: 2000 },
    { name: 'Nov', sales: 2780 },
    { name: 'Dec', sales: 3890 },
];

export default function SalesChart() {
    return (
        <div className="h-[300px] w-full bg-surface rounded-xl border border-white/10 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Sales Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#007AFF" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#121212', borderColor: '#333', color: '#fff' }}
                        itemStyle={{ color: '#007AFF' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#007AFF" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
