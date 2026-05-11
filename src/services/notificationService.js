// Notification service — fetches and updates notification state for the current user
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const getAuthHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('byte_token')}` });

export const getNotifications = () =>
    axios.get(`${API_URL}/notifications`, { headers: getAuthHeader() });

export const markAllRead = () =>
    axios.patch(`${API_URL}/notifications/read-all`, {}, { headers: getAuthHeader() });

export const markOneRead = (id) =>
    axios.patch(`${API_URL}/notifications/${id}/read`, {}, { headers: getAuthHeader() });
