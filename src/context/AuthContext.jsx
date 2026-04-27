import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getMe, updateProfile as updateProfileApi, deleteProfile as deleteProfileApi } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        localStorage.removeItem('byte_token');
        setUser(null);
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
    };

    const login = (token, userData) => {
        localStorage.setItem('byte_token', token);
        setUser(userData);
        setIsLoggedIn(true);
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
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Auth Error:", error.message);
            localStorage.removeItem('byte_token');
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
            deleteUserProfile
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
