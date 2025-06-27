import React from 'react';

const TopCompanies = () => {
    const logos = ["Google", "Microsoft", "Amazon", "Netflix", "Samsung", "Juspay"];
    return (
        <div className="bg-white py-6 border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">
                    Trusted By Industry Leaders
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
                   {logos.map((logo, i) => (
                       <span 
                        key={i} 
                        className="text-xl md:text-2xl font-black tracking-tighter text-gray-400 hover:text-gray-900 transition-all duration-300 cursor-default select-none"
                       >
                           {logo}
                       </span>
                   ))}
                </div>
            </div>
        </div>
    );
};

export default TopCompanies;