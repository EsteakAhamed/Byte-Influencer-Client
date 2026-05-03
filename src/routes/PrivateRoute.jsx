import React, { useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

// Prevent unauthenticated users from accessing protected pages
const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading, isLoggingOut } = useAuth();
    const toastShownRef = useRef(false);

    // Show spinner while we check auth status to avoid flash of wrong content
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        // Don't show toast during logout to avoid confusing user
        if (!isLoggingOut && !toastShownRef.current) {
            setTimeout(() => toast.error('Please login to access this page'), 0);
            toastShownRef.current = true;
        }
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;
