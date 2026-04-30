import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleAxiosError = (error) => {
    if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error('Request failed');
};

const getAuthHeader = () => {
    const token = localStorage.getItem('byte_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${API}/admin/users`, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateUser = async (id, data) => {
    try {
        const res = await axios.patch(`${API}/admin/users/${id}`, data, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await axios.delete(`${API}/admin/users/${id}`, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const promoteToAdmin = async (id) => {
    try {
        const res = await axios.patch(`${API}/admin/users/${id}/role`, { role: 'admin' }, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
