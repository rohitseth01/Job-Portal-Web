import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gradient-to-b from-white to-purple-50 min-h-screen py-20 px-4">
                <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-purple-100">
                    <div className="flex items-center gap-3 mb-8">
                        <ShieldCheck className="text-[#6A38C2] size-10" />
                        <h1 className="font-extrabold text-4xl text-gray-900 tracking-tight">Privacy Policy</h1>
                    </div>
                    
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">1. Information We Collect</h2>
                            <p>We collect information such as your name, email, phone number, and professional details (resumes/skills) to provide better job matching services.</p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">2. How We Use Data</h2>
                            <p>Your data is used to facilitate the application process between students and recruiters. We do not sell your personal information to third parties.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">3. Data Security</h2>
                            <p>We implement security measures including encryption and secure cloud storage (Cloudinary) to protect your uploaded documents and photos.</p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;