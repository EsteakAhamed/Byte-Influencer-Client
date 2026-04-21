import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiLayout, FiUsers, FiBriefcase, FiMenu, FiX } from 'react-icons/fi';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location]);

    const navItems = [
        { name: 'Dashboard', to: '/', icon: FiLayout },
        { name: 'Influencers', to: '/influencers', icon: FiUsers },
        { name: 'Clients', to: '/clients', icon: FiBriefcase },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-200/20'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-black tracking-tighter flex items-center gap-1 group"
                >
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-emerald-400 group-hover:to-teal-500">
                        Byte
                    </span>
                    <span className="text-gray-900 transition-colors duration-300">Influencer</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${isActive
                                    ? "text-emerald-600 bg-emerald-50/50"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                                }`
                            }
                        >
                            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                            <span>{name}</span>
                            {/* ✅ Fixed: no function, just conditional JSX */}
                            <span
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-opacity ${location.pathname === to ? "bg-emerald-500 opacity-100" : "opacity-0"
                                    }`}
                            />
                        </NavLink>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex items-center gap-4">
                    <button className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-emerald-600 hover:to-teal-600 transition-all duration-500 shadow-lg shadow-gray-900/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition-all duration-300"
                    aria-label="Toggle menu"
                >
                    <div className="relative w-6 h-6">
                        <FiMenu
                            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${open ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
                        />
                        <FiX
                            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${open ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 overflow-hidden transition-all duration-500 ease-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-6 space-y-2">
                    {navItems.map(({ name, to, icon: Icon }, idx) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`
                            }
                            style={{
                                transitionDelay: open ? `${idx * 75}ms` : '0ms',
                                transform: open ? 'translateX(0)' : 'translateX(-20px)',
                                opacity: open ? 1 : 0
                            }}
                        >
                            <div className={`p-2 rounded-lg ${location.pathname === to
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : 'bg-gray-100 text-gray-500'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span>{name}</span>
                        </NavLink>
                    ))}
                    <div className="pt-4 border-t border-gray-100">
                        <button className="w-full py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-500 shadow-lg">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
