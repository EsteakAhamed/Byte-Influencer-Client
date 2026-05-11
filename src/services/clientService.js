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

export const fetchClients = async (params = {}) => {
    try {
        const { page = 1, limit = 20, search = '' } = params;
        const res = await axios.get(`${API}/clients`, { 
            headers: getAuthHeader(),
            params: { page, limit, search }
        });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const createClient = async (data) => {
    try {
        const res = await axios.post(`${API}/clients`, data, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateClient = async (id, data) => {
    try {
        const res = await axios.patch(`${API}/clients/${id}`, data, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteClient = async (id) => {
    try {
        const res = await axios.delete(`${API}/clients/${id}`, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
