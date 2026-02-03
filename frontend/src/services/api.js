import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
    timeout: 10000 // 10 seconds timeout (increased for slow networks)
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const loginUser = (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return api.post('/login', formData);
};

export const registerUser = (email, password) =>
    api.post('/register', { email, password });

export const fetchExercises = (muscle, style) =>
    api.get(`/exercises/${muscle}?preference=${style}`);

export const generatePlan = (muscle, exercise) =>
    api.get(`/generate/${muscle}?exercise_name=${exercise}`);

export const fetchHistory = (exercise) =>
    api.get(`/history/${exercise}`);

export const logWorkout = (data) =>
    api.post('/log', data);

export const fetchStats = () =>
    api.get('/stats/volume');

export const fetchUserStats = () =>
    api.get('/stats/user');

export default api;
