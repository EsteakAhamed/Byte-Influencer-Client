import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-zinc-100 pt-16 pb-8 px-4 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 mb-4">
                            <span className="text-emerald-600">Byte</span>
                            <span className="text-zinc-800">Influencer</span>
                        </Link>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            The ultimate management stack for influencer marketing and client analytics. Real-time data, simplified.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-zinc-900 mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><Link to="/" className="hover:text-emerald-600 transition-colors">Dashboard</Link></li>
                            <li><Link to="/influencers" className="hover:text-emerald-600 transition-colors">Influencer Directory</Link></li>
                            <li><Link to="/clients" className="hover:text-emerald-600 transition-colors">Client Portal</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-zinc-900 mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">API Status</a></li>
                            <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h3 className="font-bold text-zinc-900 mb-4">Stay Connected</h3>
                        <div className="flex flex-col gap-3">
                            <p className="text-xs text-zinc-400">Get updates on new platform integrations.</p>
                            <div className="join">
                                <input className="input input-sm input-bordered join-item bg-zinc-50 border-zinc-200 focus:outline-emerald-500 w-full" placeholder="Email" />
                                <button className="btn btn-sm btn-emerald bg-emerald-600 hover:bg-emerald-700 border-none text-white join-item">Join</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-400">
                        © {new Date().getFullYear()} Byte Influencer. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-zinc-400">
                        <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;