import axios, { AxiosInstance } from 'axios'

const baseURL = 'https://cvwo-winter-assignment-zske.onrender.com/v1';

const http: AxiosInstance = axios.create({
    baseURL: baseURL, 
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http