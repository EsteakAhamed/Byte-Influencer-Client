import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

// Double protection — must be logged in AND have admin role
const AdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin, loading, isLoggingOut } = useAuth();
    const toastShownRef = React.useRef(false);

    // Wait for auth check to complete before rendering anything
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // First check — are they logged in?
    if (!isLoggedIn) {
        if (!isLoggingOut && !toastShownRef.current) {
            setTimeout(() => toast.error('Please login to access this page'), 0);
            toastShownRef.current = true;
        }
        return <Navigate to="/login" replace />;
    }

    // Second check — are they actually an admin?
    if (!isAdmin) {
        toast.error('Access denied. Admin only.');
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default AdminRoute;
