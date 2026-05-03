import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Extract readable error message from axios response
const handleAxiosError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'An error occurred');
};

// Pull token from storage for authenticated requests
const getAuthHeader = () => {
    const token = localStorage.getItem('byte_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registerUser = async (userData) => {
    try {
        const res = await axios.post(`${API}/auth/register`, userData);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const loginUser = async (credentials) => {
    try {
        const res = await axios.post(`${API}/auth/login`, credentials);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fetch current user — used to validate stored token on app load
export const getMe = async () => {
    try {
        const res = await axios.get(`${API}/auth/me`, {
            headers: getAuthHeader()
        });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateProfile = async (userData) => {
    try {
        const res = await axios.patch(`${API}/auth/profile`, userData, {
            headers: getAuthHeader()
        });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteProfile = async () => {
    try {
        const res = await axios.delete(`${API}/auth/profile`, {
            headers: getAuthHeader()
        });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
