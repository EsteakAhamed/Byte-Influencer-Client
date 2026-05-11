import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FiSun,
    FiMoon,
    FiUser,
    FiLogOut,
    FiSettings,
    FiChevronDown,
    FiMenu,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import GlobalSearch from './GlobalSearch';
import { scrollToTop } from '../utils/scroll';

const NavBar = ({ onMenuToggle }) => {
    const [isDark, setIsDark] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();

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

    const handleLogoClick = useCallback(() => {
        scrollToTop('smooth');
        // Navigate to dashboard if logged in, stay on home if not
        if (isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return (
        <nav className="h-16 bg-base-100 border-b border-base-200 shadow-sm flex items-center px-4 lg:px-6 shrink-0 z-40">
            {/* Left side — hamburger (mobile only) + brand logo (unauthenticated only) */}
            <div className="flex items-center gap-3 flex-1">
                {/* Mobile hamburger — only when logged in */}
                {isLoggedIn && (
                    <button
                        onClick={onMenuToggle}
                        className="md:hidden btn btn-ghost btn-sm btn-square"
                        aria-label="Toggle menu"
                    >
                        <FiMenu size={20} />
                    </button>
                )}

                {/* Brand logo — only show when NOT logged in (sidebar has logo when logged in) */}
                {!isLoggedIn && (
                    <button
                        onClick={handleLogoClick}
                        className="flex items-center text-xl font-black tracking-tighter hover:opacity-80 transition-opacity"
                        aria-label="Scroll to top"
                    >
                        <span className="text-base-content">Byte</span>
                        <span className="text-emerald-500 font-medium">Influencer</span>
                    </button>
                )}
            </div>

            {/* Global Search — only when logged in */}
            {isLoggedIn && <GlobalSearch />}

            {/* Right cluster */}
            <div className="flex items-center gap-2">
                {/* Notification bell — only when logged in */}
                {isLoggedIn && <NotificationBell />}

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle btn-sm"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>

                {!isLoggedIn ? (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm rounded-full px-5 normal-case font-bold">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-sm rounded-full px-6 text-white border-none bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105 transition-transform normal-case font-bold">
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
                        <ul tabIndex={0} className="mt-4 z-50 p-2 shadow-2xl menu dropdown-content bg-base-100 rounded-2xl w-60 border border-base-content/10">
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
            </div>
        </nav>
    );
};

export default NavBar;