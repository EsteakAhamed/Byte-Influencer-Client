import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, ShieldCheck, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

// Route definitions — filtered by role before rendering
const ADMIN_ROUTES = [
    { to: '/',            icon: LayoutDashboard, label: 'Dashboard'   },
    { to: '/influencers', icon: Users,           label: 'Influencers' },
    { to: '/clients',     icon: Briefcase,       label: 'Clients'     },
    { to: '/admin/users', icon: ShieldCheck,     label: 'Users'       },
];

const USER_ROUTES = [
    { to: '/',            icon: LayoutDashboard, label: 'Dashboard'   },
    { to: '/influencers', icon: Users,           label: 'Influencers' },
    { to: '/clients',     icon: Briefcase,       label: 'Clients'     },
];

const Sidebar = ({ mobile = false, onClose }) => {
    const { isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const routes = isAdmin ? ADMIN_ROUTES : USER_ROUTES;

    const handleLogout = () => {
        logout();
        toast.success('Signed out safely');
        navigate('/', { replace: true });
        if (onClose) onClose();
    };

    const handleLinkClick = () => {
        if (mobile && onClose) onClose();
    };

    return (
        <nav
            className={`
                ${mobile ? 'w-64' : 'group w-20 hover:w-64'}
                flex flex-col h-full
                bg-base-100 border-r border-base-200
                overflow-hidden shrink-0
                transition-all duration-300 ease-in-out z-30
            `}
        >
            {/* Logo area — text only, expands on hover */}
            <div className="flex items-center h-16 px-5 border-b border-base-200 shrink-0 overflow-hidden">
                <div className="flex items-center whitespace-nowrap">
                    {/* Collapsed: show Byte only */}
                    <span className={`font-black text-lg tracking-tighter transition-all duration-300 ${mobile ? 'opacity-100' : 'group-hover:opacity-0 group-hover:w-0'} text-base-content`}>
                        Byte
                    </span>
                    {/* Expanded on hover: show ByteInfluencer */}
                    <span className={`font-black text-lg tracking-tighter whitespace-nowrap transition-all duration-300 ${mobile ? 'opacity-100 translate-x-0' : 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto group-hover:ml-0'}`}>
                        <span className="text-base-content">Byte</span>
                        <span className="text-emerald-500">Influencer</span>
                    </span>
                </div>
            </div>

            {/* Navigation links */}
            <div className="flex-1 flex flex-col gap-2 p-3 mt-4 overflow-y-auto custom-scrollbar">
                {routes.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-3.5 py-3 rounded-2xl transition-all duration-200 group/item relative
                             ${isActive
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'
                             }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                        <span className={`font-bold text-sm whitespace-nowrap transition-all duration-300 ${mobile ? 'opacity-100' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                            {label}
                        </span>
                        
                        {/* Tooltip for collapsed state */}
                        {!mobile && (
                            <div className="absolute left-full ml-6 px-3 py-1.5 bg-neutral text-neutral-content text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover/item:opacity-0 group-hover:group-hover/item:opacity-0 group-hover/item:lg:opacity-0 transition-opacity whitespace-nowrap z-50">
                                {label}
                            </div>
                        )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Bottom actions */}
            <div className="p-3 border-t border-base-200 shrink-0">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-3.5 py-3 rounded-2xl w-full text-base-content/60 hover:bg-error/10 hover:text-error transition-all duration-200 group/logout overflow-hidden"
                >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <LogOut size={22} />
                    </div>
                    <span className={`font-bold text-sm whitespace-nowrap transition-all duration-300 ${mobile ? 'opacity-100' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                        Sign Out
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
