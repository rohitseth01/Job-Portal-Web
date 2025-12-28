import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully! We will get back to you soon.");
    };

    return (
        <div>
            <Navbar />
            <div className="bg-gradient-to-b from-white to-purple-50 min-h-screen py-20 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-purple-100">
                    
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="font-extrabold text-4xl text-gray-900 tracking-tight mb-4">Get in Touch</h1>
                            <p className="text-gray-500">Have questions about your job search or recruitment? Our team is here to help.</p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-full text-[#6A38C2]"><Mail /></div>
                                <div><p className="font-bold">Email</p><p className="text-sm text-gray-500">support@jobportal.com</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-full text-[#6A38C2]"><Phone /></div>
                                <div><p className="font-bold">Phone</p><p className="text-sm text-gray-500">+1 (234) 567-890</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-full text-[#6A38C2]"><MapPin /></div>
                                <div><p className="font-bold">Office</p><p className="text-sm text-gray-500">123 Career Blvd, Tech City</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-1.5">
                            <Label className="font-bold">Full Name</Label>
                            <Input placeholder="John Doe" className="rounded-xl" required />
                        </div>
                        <div className="grid gap-1.5">
                            <Label className="font-bold">Email</Label>
                            <Input type="email" placeholder="john@example.com" className="rounded-xl" required />
                        </div>
                        <div className="grid gap-1.5">
                            <Label className="font-bold">Message</Label>
                            <textarea 
                                className="flex min-h-[120px] w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] outline-none transition-all"
                                placeholder="How can we help you?"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#4b247a] rounded-xl font-bold py-6">
                            <Send className="mr-2 h-4 w-4" /> Send Message
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;