import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            // Verify token / fetch user details
            api.get('/me')
                .then(res => {
                    console.log("User verified:", res.data);
                    setUser(res.data);
                })
                .catch((err) => {
                    console.error("Auth verification failed:", err);
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setLoading(false);
        }
    }, [token]);

    const login = (newToken) => setToken(newToken);

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
