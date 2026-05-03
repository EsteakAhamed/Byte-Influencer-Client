import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiArrowRight,
    FiCheck,
    FiGithub,
    FiTwitter,
    FiLinkedin,
    FiInstagram,
    FiSend
} from 'react-icons/fi';

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

    const footerLinks = {
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

    return (
        <footer className="relative bg-base-100 border-t border-base-content/5 pt-24 pb-12 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-[-5%] w-[30%] h-[30%] bg-teal-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Newsletter Card - Glassmorphism style */}
                <div className="relative mb-24 p-8 md:p-12 rounded-[2rem] bg-linear-to-br from-base-200 to-base-100 border border-base-content/5 shadow-2xl shadow-emerald-500/5">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 italic">
                                Stay ahead of the <span className="text-emerald-500">curve.</span>
                            </h3>
                            <p className="text-base-content/60 text-lg">
                                Join 5,000+ creators and brands receiving weekly insights on the creator economy.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="relative group">
                            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-base-100 rounded-2xl border border-base-content/10 focus-within:border-emerald-500/50 transition-all shadow-inner">
                                <div className="flex-1 flex items-center px-4 gap-3">
                                    <FiSend className="text-emerald-500 opacity-50" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your work email"
                                        className="w-full py-3 bg-transparent focus:outline-none text-sm font-medium"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={subscribed}
                                    className={`px-8 py-3 rounded-xl font-bold transition-all duration-500 flex items-center justify-center gap-2 ${subscribed
                                        ? 'bg-emerald-500 text-white scale-95'
                                        : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 active:scale-95'
                                        }`}
                                >
                                    {subscribed ? <FiCheck /> : <FiArrowRight />}
                                    {subscribed ? 'Subscribed' : 'Join Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
                    <div className="col-span-2">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-2xl font-black tracking-tighter mb-6"
                        >
                            <span>
                                <span className="text-black">Byte</span>
                                <span className="text-emerald-500 font-medium">Influencer</span>
                            </span>
                        </Link>
                        <p className="text-base-content/50 text-sm leading-relaxed mb-8 max-w-xs">
                            Empowering the next generation of digital marketing through data-driven creator partnerships and seamless campaign management.
                        </p>
                        <div className="flex gap-4">
                            {[FiTwitter, FiLinkedin, FiGithub, FiInstagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:bg-emerald-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>


                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([title, items]) => (
                        <div key={title} className="col-span-1">
                            <h4 className="text-xs uppercase tracking-[0.2em] font-black text-emerald-600 mb-6">
                                {title}
                            </h4>
                            <ul className="space-y-4">
                                {items.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.to}
                                            className="text-sm font-medium text-base-content/60 hover:text-emerald-500 transition-colors flex items-center group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-[2px] bg-emerald-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Copyright Area */}
                <div className="pt-8 border-t border-base-content/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-base-content/40">
                        <span>© {new Date().getFullYear()} BYTE LABS INC.</span>
                        <span className="w-1 h-1 rounded-full bg-base-content/20" />
                        <span className="flex items-center gap-1">
                            MADE WITH <span className="text-orange-500 text-base">♥</span> DRAGON DIGITALS
                        </span>
                    </div>

                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((text) => (
                            <a key={text} href="#" className="text-xs font-bold text-base-content/40 hover:text-emerald-500 transition-colors">
                                {text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;