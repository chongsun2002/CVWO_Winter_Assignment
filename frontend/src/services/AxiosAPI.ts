import axios, { AxiosInstance } from 'axios'

const baseURL = 'localhost:5000';

const http: AxiosInstance = axios.create({
    baseURL: baseURL, 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http