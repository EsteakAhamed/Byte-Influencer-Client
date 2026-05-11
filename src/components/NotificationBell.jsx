import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { getNotifications, markAllRead, markOneRead } from '../services/notificationService';

// Relative time formatter
const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
};

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const panelRef = useRef(null);
    const buttonRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const fetchNotifications = async () => {
        try {
            const res = await getNotifications();
            setNotifications(res.data);
        } catch {
            // silent fail — polling will retry
        }
    };

    // Fetch on mount and poll every 60 seconds
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (
                panelRef.current && !panelRef.current.contains(e.target) &&
                buttonRef.current && !buttonRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleMarkAllRead = async () => {
        setLoading(true);
        try {
            await markAllRead();
            await fetchNotifications();
        } catch {
            // silent
        } finally {
            setLoading(false);
        }
    };

    const handleMarkOneRead = async (id) => {
        try {
            await markOneRead(id);
            await fetchNotifications();
        } catch {
            // silent
        }
    };

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <div className="relative">
            {/* Bell button */}
            <button
                ref={buttonRef}
                onClick={toggleOpen}
                className="btn btn-ghost btn-circle btn-sm"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="badge badge-primary badge-xs absolute -top-1 -right-1 text-[10px] font-bold px-1">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <div
                    ref={panelRef}
                    className="absolute right-0 top-12 z-50 w-80 bg-base-100 rounded-2xl shadow-2xl
                               border border-base-content/10 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-base-content/10">
                        <h3 className="text-sm font-bold text-base-content">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                disabled={loading}
                                className="btn btn-ghost btn-xs text-emerald-600 gap-1"
                            >
                                <CheckCheck className="w-3.5 h-3.5" />
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* Scrollable list */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-base-content/40">
                                <Bell className="w-8 h-8 mb-2 opacity-40" />
                                <p className="text-sm font-medium">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <button
                                    key={n._id}
                                    onClick={() => !n.isRead && handleMarkOneRead(n._id)}
                                    className={`w-full text-left px-4 py-3 border-b border-base-content/5
                                               hover:bg-base-200/60 transition-colors flex items-start gap-3
                                               ${!n.isRead ? 'bg-emerald-500/5' : ''}`}
                                >
                                    {/* Unread dot */}
                                    <div className="pt-1.5 shrink-0">
                                        {!n.isRead ? (
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        ) : (
                                            <Check className="w-3 h-3 text-base-content/20" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm leading-snug ${!n.isRead ? 'font-semibold text-base-content' : 'text-base-content/70'}`}>
                                            {n.message}
                                        </p>
                                        <p className="text-xs text-base-content/40 mt-1">
                                            {timeAgo(n.createdAt)}
                                        </p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
