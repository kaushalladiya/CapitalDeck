import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

const AuthService = {
    // 1. LOGIN
    login: async (email, password) => {
        const response = await axios.post(API_URL + "signin", {
            email,
            password
        });
        
        // If success, save the "Badge" (User object + Token) to LocalStorage
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    },

    // 2. LOGOUT
    logout: () => {
        localStorage.removeItem("user");
    },

    // 3. REGISTER
    register: async (fullName, email, password, role) => {
        return axios.post(API_URL + "signup", {
            fullName,
            email,
            password,
            role
        });
    },

    // 4. GET CURRENT USER
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default AuthService;