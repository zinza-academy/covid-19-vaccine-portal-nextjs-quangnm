'use client'
import axios from 'axios';

const BASE_URL = process.env.API_URL;
const ACCESS_TOKEN = '';


export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const axiosInstanceWithToken = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
});
