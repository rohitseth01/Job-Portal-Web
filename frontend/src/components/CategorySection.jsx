import React from 'react';
import { Layout, Database, Code, Smartphone } from "lucide-react";

const CategorySection = () => {
    const categories = [
        { name: "Frontend", icon: <Layout className="text-blue-600" />, jobs: "450+ Jobs" },
        { name: "Backend", icon: <Database className="text-green-600" />, jobs: "320+ Jobs" },
        { name: "Fullstack", icon: <Code className="text-purple-600" />, jobs: "180+ Jobs" },
        { name: "Mobile Dev", icon: <Smartphone className="text-orange-600" />, jobs: "95+ Jobs" },
    ];

    return (
        <div className="max-w-7xl mx-auto my-24 px-4">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
                Explore by <span className="text-[#6A38C2]">Category</span>
            </h2>
            <p className="text-gray-500 mb-10 font-medium">Find your next role in your favorite niche.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-purple-200 transition-all cursor-pointer group">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-50 transition-colors">
                            {cat.icon}
                        </div>
                        <h3 className="font-bold text-xl text-gray-900">{cat.name}</h3>
                        <p className="text-gray-400 text-sm font-bold mt-1 uppercase tracking-tighter">{cat.jobs}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;