import axios, { AxiosInstance } from 'axios'

const baseURL = 'http://localhost:8000/v1';

const http: AxiosInstance = axios.create({
    baseURL: baseURL, 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http