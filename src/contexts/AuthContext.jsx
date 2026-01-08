import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const storedUser = localStorage.getItem('mediaid_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const userData = response.data.user;
            setUser(userData);
            localStorage.setItem('mediaid_user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error.response); // Debug log
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Register Error Status:", error.response?.status);
            console.error("Register Error Data:", error.response?.data);
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }

    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mediaid_user');
        localStorage.removeItem('mediaid_profile'); // Clear legacy local profile if any
    };

    const updateProfile = async (updatedData) => {
        if (!user) return;
        try {
            await api.put(`/profile/${user.id}`, updatedData);
            const newUser = { ...user, ...updatedData };
            setUser(newUser);
            localStorage.setItem('mediaid_user', JSON.stringify(newUser));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Update failed'
            }
        }
    }

    const value = {
        user,
        login,
        register,
        logout,
        updateProfile,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
