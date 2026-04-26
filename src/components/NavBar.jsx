import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiLayout, FiUsers, FiBriefcase, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

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
            className={`fixed w-full z-50 transition-all duration-500 bg-base-100/80 dark:bg-base-100/80 backdrop-blur-xl border-b border-base-content/10 ${scrolled
                    ? 'shadow-lg shadow-base-300/20'
                    : ''
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
                    <span className="text-base-content transition-colors duration-300">Influencer</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${isActive
                                    ? "text-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/10"
                                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                                }`
                            }
                        >
                            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                            <span>{name}</span>
                            <span
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-opacity ${location.pathname === to ? "bg-emerald-500 opacity-100" : "opacity-0"
                                    }`}
                            />
                        </NavLink>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <label className="swap swap-rotate p-2.5 rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-all duration-300 hover:scale-110">
                        <input type="checkbox" className="theme-controller" value="dark" defaultChecked={localStorage.getItem('theme') === 'dark'} onChange={(e) => {
                            const newTheme = e.target.checked ? 'dark' : 'light';
                            localStorage.setItem('theme', newTheme);
                        }} />
                        <FiSun className="swap-on w-5 h-5" />
                        <FiMoon className="swap-off w-5 h-5" />
                    </label>

                    <button className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-emerald-600 hover:to-teal-600 transition-all duration-500 shadow-lg shadow-gray-900/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 border-none">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 lg:hidden">
                    <label className="swap swap-rotate p-2 rounded-xl text-base-content hover:bg-base-200 transition-all duration-300">
                        <input type="checkbox" className="theme-controller" value="dark" defaultChecked={localStorage.getItem('theme') === 'dark'} onChange={(e) => {
                            const newTheme = e.target.checked ? 'dark' : 'light';
                            localStorage.setItem('theme', newTheme);
                        }} />
                        <FiSun className="swap-on w-6 h-6" />
                        <FiMoon className="swap-off w-6 h-6" />
                    </label>
                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 rounded-xl text-base-content hover:bg-base-200 transition-all duration-300"
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
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-base-100/95 backdrop-blur-xl border-b border-base-content/10 overflow-hidden transition-all duration-500 ease-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-6 space-y-2">
                    {navItems.map(({ name, to, icon: Icon }, idx) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 text-emerald-600 font-semibold"
                                    : "text-base-content/70 hover:bg-base-200"
                                }`
                            }
                            style={{
                                transitionDelay: open ? `${idx * 75}ms` : '0ms',
                                transform: open ? 'translateX(0)' : 'translateX(-20px)',
                                opacity: open ? 1 : 0
                            }}
                        >
                            <div className={`p-2 rounded-lg ${location.pathname === to
                                    ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600'
                                    : 'bg-base-200 text-base-content/50'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span>{name}</span>
                        </NavLink>
                    ))}
                    <div className="pt-4 border-t border-base-content/10">
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
