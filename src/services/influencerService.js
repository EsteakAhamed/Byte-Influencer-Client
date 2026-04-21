import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleAxiosError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'An error occurred');
};

export const fetchInfluencers = async () => {
    try {
        const res = await axios.get(`${API}/influencers`);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importInstagram = async (igUrl) => {
    try {
        const res = await axios.post(`${API}/influencers/import-ig`, { igUrl });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importYouTube = async (ytInput) => {
    try {
        const res = await axios.post(`${API}/influencers/import-youtube`, { ytInput });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importFacebook = async (fbUrl) => {
    try {
        const res = await axios.post(`${API}/influencers/import-facebook`, { fbUrl });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importTikTok = async (url) => {
    try {
        const res = await axios.post(`${API}/influencers/import-tiktok`, { url });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateInfluencer = async (id, data) => {
    try {
        const res = await axios.patch(`${API}/influencers/${id}`, data);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteInfluencer = async (id) => {
    try {
        const res = await axios.delete(`${API}/influencers/${id}`);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
