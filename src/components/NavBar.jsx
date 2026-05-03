import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    FiLayout,
    FiUsers,
    FiBriefcase,
    FiMenu,
    FiX,
    FiSun,
    FiMoon,
    FiUser,
    FiLogOut,
    FiSettings,
    FiChevronDown
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, user, logout, isAdmin } = useAuth();

    // Restore theme preference or use system default
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        setIsDark(initialDark);
        document.documentElement.setAttribute('data-theme', initialDark ? 'dark' : 'light');
    }, []);

    // Persist theme choice across sessions
    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    // Add background blur when user scrolls down
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => setOpen(false), [location]);

    // Build nav items based on auth state and role
    const navItems = [{ name: 'Dashboard', to: '/', icon: FiLayout }];
    if (isLoggedIn) {
        navItems.push({ name: 'Influencers', to: '/influencers', icon: FiUsers });
        navItems.push({ name: 'Clients', to: '/clients', icon: FiBriefcase });
        if (isAdmin) navItems.push({ name: 'Users', to: '/admin/users', icon: FiUser });
    }

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? 'py-2 bg-base-100/80 backdrop-blur-md border-b border-base-content/10 shadow-xl shadow-base-300/10'
                : 'py-4 bg-transparent'
                }`}
        >
            {/* Top Progress Bar (Visual Polish) */}
            {scrolled && (
                <div className="absolute top-0 left-0 h-[2px] bg-linear-to-r from-emerald-500 to-teal-500 animate-pulse w-full" />
            )}

            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
                {/* Brand Logo*/}
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-2xl font-black tracking-tighter"
                >
                    {/* Text Logo */}
                    <div className="flex items-center">
                        <span className="text-black">
                            Byte
                        </span>
                        <span className="text-emerald-500 font-medium">
                            Influencer
                        </span>
                    </div>
                </Link>


                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center bg-base-200/50 p-1.5 rounded-full border border-base-content/5 backdrop-blur-sm">
                    {navItems.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${isActive
                                    ? "text-white bg-linear-to-r from-emerald-500 to-teal-600 shadow-md"
                                    : "text-base-content/60 hover:text-base-content hover:bg-base-300/50"
                                }`
                            }
                        >
                            <Icon className="w-4 h-4" />
                            <span>{name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Actions Area */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="hidden sm:flex p-2.5 rounded-full bg-base-200 text-base-content hover:bg-emerald-500 hover:text-white transition-all duration-500"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>

                    <div className="h-8 w-[1px] bg-base-content/10 hidden lg:block mx-1"></div>

                    {!isLoggedIn ? (
                        <div className="hidden lg:flex items-center gap-2">
                            <Link to="/login" className="btn btn-ghost btn-sm rounded-full px-5 normal-case font-bold">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm rounded-full px-6 text-white border-none bg-linear-to-r from-emerald-500 to-teal-600 hover:scale-105 transition-transform normal-case font-bold">
                                Join Now
                            </Link>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="group flex items-center gap-2 p-1 pr-3 rounded-full bg-base-200 hover:bg-base-300 transition-colors border border-base-content/5">
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-inner">
                                    <FiUser size={16} />
                                </div>
                                <span className="hidden md:block text-xs font-bold truncate max-w-[80px]">{user?.username}</span>
                                <FiChevronDown size={14} className="opacity-40 group-hover:translate-y-0.5 transition-transform" />
                            </div>
                            <ul tabIndex={0} className="mt-4 z-50 p-2 shadow-2xl menu dropdown-content bg-base-100 rounded-2xl w-60 border border-base-content/10 animate-in fade-in slide-in-from-top-2">
                                <li className="menu-title flex flex-row items-center gap-3 px-4 py-3 border-b border-base-content/5 mb-1">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black uppercase tracking-tighter text-emerald-600">Active Session</span>
                                        <span className="text-sm font-medium opacity-70">{user?.email}</span>
                                    </div>
                                </li>
                                <li className="mt-1">
                                    <Link to="/profile" className="py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-600 transition-colors">
                                        <FiSettings className="w-4 h-4" />
                                        <span className="font-medium">Account Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            logout();
                                            toast.success('Signed out safely');
                                            navigate('/', { replace: true });
                                        }}
                                        className="py-3 mt-1 rounded-xl text-error hover:bg-error/10 font-bold"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden p-2 rounded-xl bg-base-200 text-base-content active:scale-95 transition-all"
                    >
                        {open ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Enhanced Mobile Drawer */}
            <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-base-100/95 backdrop-blur-2xl border-b border-base-content/10 overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-8 flex flex-col gap-4">
                    {navItems.map(({ name, to, icon: Icon }, idx) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${isActive
                                    ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm"
                                    : "bg-base-200/50 text-base-content/70"
                                }`
                            }
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                            <Icon size={20} />
                            <span className="font-bold">{name}</span>
                        </NavLink>
                    ))}

                    {!isLoggedIn && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <Link to="/login" className="btn btn-ghost rounded-2xl normal-case">Login</Link>
                            <Link to="/register" className="btn btn-primary rounded-2xl border-none bg-linear-to-r from-emerald-500 to-teal-600 text-white normal-case">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

// Internal icon for the logo
const FiZap = ({ size, fill }) => (
    <svg
        width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

export default NavBar;