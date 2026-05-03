import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

// Dashboard data fetching — separate endpoints for user vs admin

// Pull JWT from storage for authenticated requests
const getAuthHeader = () => {
    const token = localStorage.getItem('byte_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleAxiosError = (error) => {
    if (error.response) {
        throw new Error(error.response.data?.message || 'Server error');
    } else if (error.request) {
        throw new Error('Network error - no response');
    } else {
        throw new Error(error.message);
    }
};

// Get user's personal stats (filtered server-side by token)
export const fetchUserDashboard = async () => {
    try {
        const response = await axios.get(`${API}/dashboard/user`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Get platform-wide stats (requires admin role)
export const fetchAdminDashboard = async () => {
    try {
        const response = await axios.get(`${API}/dashboard/admin`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
