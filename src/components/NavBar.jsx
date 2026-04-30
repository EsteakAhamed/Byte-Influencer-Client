import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiLayout, FiUsers, FiBriefcase, FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, user, logout, isAdmin } = useAuth();

    // Initialize theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        setIsDark(initialDark);
        document.documentElement.setAttribute('data-theme', initialDark ? 'dark' : 'light');
    }, []);

    // Apply theme whenever isDark changes
    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

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
        { name: 'Dashboard', to: '/', icon: FiLayout }
    ];

    if (isLoggedIn) {
        navItems.push({ name: 'Influencers', to: '/influencers', icon: FiUsers });
        navItems.push({ name: 'Clients', to: '/clients', icon: FiBriefcase });
        if (isAdmin) {
            navItems.push({ name: 'Users', to: '/admin/users', icon: FiUser });
        }
    }

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
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-all duration-300 hover:scale-110"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? (
                            <FiSun className="w-5 h-5" />
                        ) : (
                            <FiMoon className="w-5 h-5" />
                        )}
                    </button>

                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="btn btn-ghost rounded-full">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary rounded-full px-6 text-white border-none">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-content/10">
                                <div className="w-10 rounded-full flex items-center justify-center">
                                    <FiUser className="w-6 h-6 mx-auto mt-2" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-content/10 backdrop-blur-lg">
                                <li className="menu-title px-4 py-2 border-b border-base-content/5 mb-1">
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-50">Account</span>
                                    <span className="text-sm font-semibold block text-base-content">{user?.username}</span>
                                </li>
                                <li>
                                    <Link to="/profile" className="py-3 flex items-center gap-3">
                                        <FiSettings className="w-4 h-4" />
                                        <span>View Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        logout();
                                        toast.success('Logged out successfully');
                                        navigate('/', { replace: true });
                                    }} className="py-3 text-error flex items-center gap-3 hover:bg-error/10">
                                        <FiLogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-base-content hover:bg-base-200 transition-all duration-300"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? (
                            <FiSun className="w-6 h-6" />
                        ) : (
                            <FiMoon className="w-6 h-6" />
                        )}
                    </button>
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
                    <div className="pt-4 border-t border-base-content/10 flex flex-col gap-2">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="btn btn-ghost w-full">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary w-full text-white border-none">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 px-4 py-3 bg-base-200 rounded-xl mb-2">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <FiUser size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{user?.username}</p>
                                        <p className="text-xs opacity-60">{user?.email}</p>
                                    </div>
                                </div>
                                <Link to="/profile" className="btn btn-ghost w-full justify-start gap-3">
                                    <FiSettings size={18} />
                                    View Profile
                                </Link>
                                <button onClick={() => {
                                    logout();
                                    toast.success('Logged out successfully');
                                    navigate('/', { replace: true });
                                }} className="btn btn-error btn-outline w-full justify-start gap-3">
                                    <FiLogOut size={18} />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
