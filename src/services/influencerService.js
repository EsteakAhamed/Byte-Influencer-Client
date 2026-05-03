import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Extract readable error from axios response
const handleAxiosError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'An error occurred');
};

// Attach JWT token to all requests
const getAuthHeader = () => {
    const token = localStorage.getItem('byte_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get paginated list of influencers (filtered by user server-side)
export const fetchInfluencers = async (params = {}) => {
    try {
        const { page = 1, limit = 20 } = params;
        const res = await axios.get(`${API}/influencers`, { 
            headers: getAuthHeader(),
            params: { page, limit }
        });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const fetchInfluencerProfile = async (id) => {
    try {
        const res = await axios.get(`${API}/influencers/${id}/profile`, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importInstagram = async (igUrl) => {
    try {
        const res = await axios.post(`${API}/influencers/import-ig`, { igUrl }, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importYouTube = async (ytInput) => {
    try {
        const res = await axios.post(`${API}/influencers/import-youtube`, { ytInput }, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importFacebook = async (fbUrl) => {
    try {
        const res = await axios.post(`${API}/influencers/import-facebook`, { fbUrl }, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const importTikTok = async (url) => {
    try {
        const res = await axios.post(`${API}/influencers/import-tiktok`, { url }, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const updateInfluencer = async (id, data) => {
    try {
        const res = await axios.patch(`${API}/influencers/${id}`, data, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const deleteInfluencer = async (id) => {
    try {
        const res = await axios.delete(`${API}/influencers/${id}`, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Remove specific platform from influencer (optionally delete whole influencer if no platforms left)
export const deleteInfluencerPlatform = async (id, platformName, deleteIfEmpty = false) => {
    try {
        const res = await axios.delete(
            `${API}/influencers/${id}/platform/${encodeURIComponent(platformName)}?deleteIfEmpty=${deleteIfEmpty}`,
            { headers: getAuthHeader() }
        );
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
