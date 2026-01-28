import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// REQUEST INTERCEPTOR: The "Badge Attacher"
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user')); // Get user from storage
        if (user && user.token) {
            config.headers['Authorization'] = 'Bearer ' + user.token; // Attach Token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;