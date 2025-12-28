import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    
                    {/* Brand Branding Section */}
                    <div className="max-w-sm">
                        <h2 className="text-2xl font-black tracking-tight mb-4">
                            Job<span className="text-[#6A38C2]">Portal</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                            Connecting talent with opportunity. We provide a seamless platform for recruiters to discover top talent and for candidates to land their dream roles.
                        </p>
                    </div>

                    {/* Quick Links Grid */}
                    <div className="grid grid-cols-2 gap-10 md:gap-24">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 uppercase text-[10px] tracking-widest">Platform</h3>
                            <ul className="text-sm text-gray-500 space-y-3 font-medium">
                                <li><Link to="/jobs" className="hover:text-[#6A38C2] transition-colors">Browse Jobs</Link></li>
                                <li><Link to="/browse" className="hover:text-[#6A38C2] transition-colors">Browse Companies</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 uppercase text-[10px] tracking-widest">Support</h3>
                            <ul className="text-sm text-gray-500 space-y-3 font-medium">
                                {/* Modified: Added Links to the support items */}
                                <li>
                                    <Link to="/privacy" className="hover:text-[#6A38C2] transition-colors">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:text-[#6A38C2] transition-colors">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                        © 2025 JobPortal. All rights reserved.
                    </p>
                    
                    {/* Social Icons with Links */}
                    <div className="flex items-center gap-6 text-gray-400">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <Facebook size={18} className="hover:text-[#6A38C2] cursor-pointer transition-all hover:scale-110" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <Twitter size={18} className="hover:text-[#6A38C2] cursor-pointer transition-all hover:scale-110" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <Linkedin size={18} className="hover:text-[#6A38C2] cursor-pointer transition-all hover:scale-110" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <Instagram size={18} className="hover:text-[#6A38C2] cursor-pointer transition-all hover:scale-110" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;




// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="border-t border-t-gray-200 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <h2 className="text-xl font-bold">Job Hunt</h2>
//             <p className="text-sm">© 2025 Your Company. All rights reserved.</p>
//           </div>
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.691v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.917c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
//               </svg>
//             </a>
//             <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.373 4.482A13.944 13.944 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.574 4.902 4.902 0 0 1-2.228-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.923 4.923 0 0 0 4.598 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
//               </svg>
//             </a>
//             <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M20.447 20.452H17.21v-5.569c0-1.328-.026-3.037-1.85-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667H9.001V9h3.104v1.561h.043c.433-.82 1.492-1.683 3.071-1.683 3.288 0 3.894 2.165 3.894 4.977v6.597zM5.337 7.433c-1.004 0-1.818-.814-1.818-1.818 0-1.003.814-1.818 1.818-1.818s1.818.815 1.818 1.818c0 1.004-.814 1.818-1.818 1.818zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.555C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.278V1.723C24 .771 23.2 0 22.222 0z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
