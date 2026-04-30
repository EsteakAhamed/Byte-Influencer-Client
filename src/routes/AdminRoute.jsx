import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin, loading, isLoggingOut } = useAuth();
    const toastShownRef = React.useRef(false);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isLoggedIn) {
        if (!isLoggingOut && !toastShownRef.current) {
            setTimeout(() => toast.error('Please login to access this page'), 0);
            toastShownRef.current = true;
        }
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        toast.error('Access denied. Admin only.');
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default AdminRoute;
