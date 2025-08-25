import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState(null);

    useEffect(() => {
        // Check for stored data on mount
        const storedUser = localStorage.getItem('user');
        const storedTokens = localStorage.getItem('tokens');
        
        if (storedUser && storedTokens) {
            setUser(JSON.parse(storedUser));
            setTokens(JSON.parse(storedTokens));
        }
        setLoading(false);
    }, []);

    const login = (userData, tokenData) => {
        setUser(userData);
        setTokens(tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('tokens', JSON.stringify(tokenData));
        
        // Also store the backend token separately for API calls if it exists
        if (tokenData.backendToken) {
            localStorage.setItem('token', tokenData.backendToken);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await authAPI.googleAuth(credentialResponse.credential);
            
            // Store the token and user data
            const tokenData = { backendToken: response.token };
            login(response.user, tokenData);
            
            return response;
        } catch (error) {
            console.error('Google login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokens');
        setUser(null);
        setTokens(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, tokens, login, handleGoogleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);