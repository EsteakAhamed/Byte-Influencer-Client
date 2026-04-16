import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCircle, Menu, X } from 'lucide-react';

const NavBar = () => {
    const [open, setOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', to: '/', icon: LayoutDashboard },
        { name: 'Influencers', to: '/influencers', icon: Users },
        { name: 'Clients', to: '/clients', icon: UserCircle },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white border-b border-emerald-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">

                <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
                    <span className="text-emerald-600">Byte</span>
                    <span className="text-slate-900">Influencer</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map(({ name, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 text-sm font-medium transition-colors ${isActive
                                    ? "text-emerald-600 font-bold"
                                    : "text-slate-700 hover:text-emerald-600"
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
                    <button className="px-5 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition">
                        Admin Portal
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden p-2 rounded-md text-slate-900"
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden bg-white border-t border-emerald-100 shadow-sm">
                    <div className="px-6 py-6 space-y-4">
                        {navItems.map(({ name, to, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 p-3 rounded-md ${isActive
                                        ? "bg-emerald-50 text-emerald-600 font-bold"
                                        : "text-slate-700 hover:bg-slate-900"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                {name}
                            </NavLink>
                        ))}
                        <div className="pt-4 border-t border-emerald-100">
                            <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700">
                                Admin Portal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
