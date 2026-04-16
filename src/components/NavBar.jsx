import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import { LayoutDashboard, Users, UserCircle, Menu, X } from 'lucide-react';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Dashboard', to: '/', icon: LayoutDashboard },
        { name: 'Influencers', to: '/influencers', icon: Users },
        { name: 'Clients', to: '/clients', icon: UserCircle },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm py-2"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
                    <span className={`transition-colors duration-300 ${isScrolled ? "text-emerald-600" : "text-white"}`}>
                        Byte
                    </span>
                    <span className={`transition-colors duration-300 ${isScrolled ? "text-slate-900" : "text-emerald-50/80"}`}>
                        Influencer
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isActive
                                    ? "text-emerald-500 font-bold"
                                    : isScrolled
                                        ? "text-slate-600 hover:text-emerald-600"
                                        : "text-white/80 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={16} />
                            {name}
                        </NavLink>
                    ))}
                </div>

                {/* Right Side Action Button */}
                <div className="hidden lg:flex items-center">
                    <button className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${isScrolled
                            ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                            : "bg-white text-emerald-600 hover:bg-emerald-50"
                        }`}>
                        Admin Portal
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className={`lg:hidden p-2 rounded-md transition-colors ${isScrolled || open ? "text-slate-900" : "text-white"
                        }`}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden absolute w-full bg-white transition-all duration-300 shadow-2xl overflow-hidden ${open ? "max-h-screen border-b border-emerald-100" : "max-h-0"
                }`}>
                <div className="px-6 py-8 space-y-4">
                    {navItems.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-3 rounded-xl transition-all ${isActive
                                    ? "bg-emerald-50 text-emerald-600 font-bold"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {name}
                        </NavLink>
                    ))}
                    <div className="pt-4 border-t border-slate-100">
                        <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">
                            Admin Portal
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;