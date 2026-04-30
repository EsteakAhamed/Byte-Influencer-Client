import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getMe, updateProfile as updateProfileApi, deleteProfile as deleteProfileApi } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        localStorage.getItem('byte_user') ? JSON.parse(localStorage.getItem('byte_user')) : null
    );
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('byte_token'));
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        if (isLoggingOut) {
            const timer = setTimeout(() => {
                setIsLoggingOut(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoggingOut]);

    const logout = () => {
        setIsLoggingOut(true);
        localStorage.removeItem('byte_token');
        localStorage.removeItem('byte_user');
        setUser(null);
        setIsLoggedIn(false);
    };

    const login = (token, userData) => {
        localStorage.setItem('byte_token', token);
        localStorage.setItem('byte_user', JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
        setIsLoggingOut(false);
    };

    const getUser = async () => {
        const token = localStorage.getItem('byte_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const data = await getMe();
            setUser(data.user);
            localStorage.setItem('byte_user', JSON.stringify(data.user));
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Auth Error:", error.message);
            localStorage.removeItem('byte_token');
            localStorage.removeItem('byte_user');
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const updateUsername = async (newUsername) => {
        try {
            const data = await updateProfileApi({ username: newUsername });
            setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const deleteUserProfile = async () => {
        try {
            await deleteProfileApi();
            logout();
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isLoggedIn,
            login,
            logout,
            getUser,
            updateUsername,
            deleteUserProfile,
            isAdmin,
            isLoggingOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
