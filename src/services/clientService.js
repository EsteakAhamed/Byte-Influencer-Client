import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleAxiosError = (error) => {
    if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error('Request failed');
};

export const fetchClients = async () => {
    try {
        const res = await axios.get(`${API}/clients`);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const createClient = async (data) => {
    try {
        const res = await axios.post(`${API}/clients`, data);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateClient = async (id, data) => {
    try {
        const res = await axios.patch(`${API}/clients/${id}`, data);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteClient = async (id) => {
    try {
        const res = await axios.delete(`${API}/clients/${id}`);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
