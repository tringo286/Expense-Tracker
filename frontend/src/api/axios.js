import axios from 'axios';
const BASE_URL = 'https://expense-tracker-fpid.onrender.com'; // Backend

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});