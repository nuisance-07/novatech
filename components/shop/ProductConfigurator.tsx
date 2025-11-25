"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface ProductConfiguratorProps {
    basePrice: number;
    onPriceChange: (price: number) => void;
}

const COLORS = [
    { name: "Titanium Black", hex: "#1c1c1e" },
    { name: "Titanium Gray", hex: "#8e8e93" },
    { name: "Titanium Blue", hex: "#215E7C" },
    { name: "Titanium Violet", hex: "#5D3A5D" },
];

const STORAGE_OPTIONS = [
    { size: "256GB", price: 0 },
    { size: "512GB", price: 100 },
    { size: "1TB", price: 300 },
];

export default function ProductConfigurator({ basePrice, onPriceChange }: ProductConfiguratorProps) {
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[0]);

    useEffect(() => {
        onPriceChange(basePrice + selectedStorage.price);
    }, [selectedStorage, basePrice, onPriceChange]);

    return (
        <div className="space-y-8 py-8 border-t border-white/10">
            {/* Color Selection */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4">Color: <span className="text-white">{selectedColor.name}</span></h3>
                <div className="flex gap-4">
                    {COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${selectedColor.name === color.name ? "ring-2 ring-white ring-offset-2 ring-offset-black" : "hover:scale-110"
                                }`}
                            style={{ backgroundColor: color.hex }}
                        >
                            {selectedColor.name === color.name && <Check size={16} className="text-white mix-blend-difference" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Storage Selection */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4">Storage</h3>
                <div className="grid grid-cols-3 gap-4">
                    {STORAGE_OPTIONS.map((option) => (
                        <button
                            key={option.size}
                            onClick={() => setSelectedStorage(option)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedStorage.size === option.size
                                    ? "border-primary bg-primary/10 text-white"
                                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30"
                                }`}
                        >
                            <span className="font-bold">{option.size}</span>
                            <span className="text-xs mt-1 text-gray-500">
                                {option.price === 0 ? "Base Price" : `+$${option.price}`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
