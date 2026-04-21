import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    const links = {
        platform: [
            { name: 'Dashboard', to: '/' },
            { name: 'Influencers', to: '/influencers' },
            { name: 'Clients', to: '/clients' },
            { name: 'Analytics', to: '#' },
        ],
        resources: [
            { name: 'Documentation', to: '#' },
            { name: 'API Reference', to: '#' },
            { name: 'Status Page', to: '#' },
            { name: 'Support', to: '#' },
        ],
        company: [
            { name: 'About Us', to: '#' },
            { name: 'Careers', to: '#' },
            { name: 'Blog', to: '#' },
            { name: 'Contact', to: '#' },
        ],
    };

    const socials = [
        { icon: FiTwitter, href: '#', label: 'Twitter' },
        { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
        { icon: FiGithub, href: '#', label: 'GitHub' },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
                <div className="absolute top-20 left-0 w-64 h-64 bg-teal-100/50 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-8">
                {/* Newsletter Section */}
                <div className="max-w-2xl mx-auto text-center mb-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Stay ahead of the curve
                    </h3>
                    <p className="text-gray-500 mb-8">
                        Get insights on influencer marketing trends and platform updates.
                    </p>
                    
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={subscribed}
                            className={`px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                                subscribed
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-gray-900 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25'
                            }`}
                        >
                            {subscribed ? (
                                <>
                                    <FiCheck className="w-5 h-5" />
                                    Subscribed!
                                </>
                            ) : (
                                <>
                                    Subscribe
                                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-2">
                        <Link to="/" className="inline-block text-2xl font-black tracking-tighter mb-4 group">
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                Byte
                            </span>
                            <span className="text-gray-900">Influencer</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                            The ultimate management platform for influencer marketing. Track, analyze, and grow your creator partnerships.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="p-2.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300 hover:scale-110"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
                        <ul className="space-y-3">
                            {links.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {links.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3">
                            {links.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        {new Date().getFullYear()} Byte Influencer. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;