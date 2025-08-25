const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
        defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        console.log(`Making API call to: ${API_BASE_URL}${endpoint}`, config);
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        console.log(`API response status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorText = await response.text();
                if (errorText) {
                    errorMessage += ` - ${errorText}`;
                }
            } catch (e) {
                // Ignore error reading response body
            }
            throw new Error(errorMessage);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const jsonData = await response.json();
            console.log('API response data:', jsonData);
            return jsonData;
        }
        
        const textData = await response.text();
        console.log('API response text:', textData);
        return textData;
    } catch (error) {
        console.error(`API call failed for ${endpoint}:`, error);
        
        // Provide more specific error messages
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error(`Network error: Cannot connect to ${API_BASE_URL}${endpoint}. Is the backend server running?`);
        }
        
        throw error;
    }
};

// Plant disease detection API
export const uploadAPI = {
    analyzeImage: async (file) => {
        if (!file) {
            throw new Error('No file provided for analysis');
        }

        console.log('Preparing to upload file:', {
            name: file.name,
            size: file.size,
            type: file.type
        });

        const formData = new FormData();
        formData.append('file', file);

        // Log FormData contents for debugging
        console.log('FormData entries:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // For file uploads, we need to bypass the apiCall function to avoid Content-Type conflicts
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            console.log(`Making upload request to: ${API_BASE_URL}/api/upload`);
            const response = await fetch(`${API_BASE_URL}/api/upload`, {
                method: 'POST',
                headers: headers, // Don't set Content-Type for FormData - browser will set it with boundary
                body: formData
            });

            console.log('Upload response status:', response.status);
            console.log('Upload response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorText = await response.text();
                    console.error('Error response body:', errorText);
                    if (errorText) {
                        errorMessage += ` - ${errorText}`;
                    }
                } catch (e) {
                    console.error('Could not read error response:', e);
                }
                throw new Error(errorMessage);
            }

            const contentType = response.headers.get('content-type');
            console.log('Response content-type:', contentType);
            
            if (contentType && contentType.includes('application/json')) {
                const jsonData = await response.json();
                console.log('Upload response data:', jsonData);
                
                // Import and use response validator
                const { logResponseValidation } = await import('./responseValidator.js');
                const validation = logResponseValidation(jsonData, 'Upload API JSON Response');
                
                if (!validation.isValid) {
                    throw new Error(`Invalid response from server: ${validation.errors.join(', ')}`);
                }
                
                return jsonData;
            }

            const textData = await response.text();
            console.log('Upload response text:', textData);
            
            // Import and use response validator for text responses too
            const { logResponseValidation } = await import('./responseValidator.js');
            const validation = logResponseValidation(textData, 'Upload API Text Response');
            
            if (!validation.isValid) {
                throw new Error(`Invalid text response from server: ${validation.errors.join(', ')}`);
            }
            
            return textData;
        } catch (error) {
            console.error('Upload API call failed:', error);
            
            // Provide more specific error messages
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error(`Network error: Cannot connect to ${API_BASE_URL}/api/upload. Is the backend server running on port 8080?`);
            }
            
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Failed to connect to backend server. Please check if the server is running on http://localhost:8080');
            }
            
            throw error;
        }
    }
};

// Authentication API
export const authAPI = {
    googleAuth: async (credential) => {
        console.log('Sending Google credential to backend for authentication');
        try {
            return await apiCall('/api/auth/google', {
                method: 'POST',
                body: JSON.stringify({ credential })
            });
        } catch (error) {
            console.error('Google authentication failed:', error);
            throw new Error(`Authentication failed: ${error.message}`);
        }
    },
    
    // Alternative method for access token based auth
    googleAuthWithToken: async (accessToken, userInfo) => {
        console.log('Sending Google access token to backend for authentication');
        try {
            return await apiCall('/api/auth/google', {
                method: 'POST',
                body: JSON.stringify({ 
                    access_token: accessToken,
                    user: userInfo
                })
            });
        } catch (error) {
            console.error('Google token authentication failed:', error);
            throw new Error(`Token authentication failed: ${error.message}`);
        }
    }
};

// Google Auth API for client-side operations
export const googleAuthAPI = {
    getUserInfo: async (accessToken) => {
        try {
            const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
            if (!response.ok) {
                throw new Error(`Failed to get user info from Google: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Google getUserInfo failed:', error);
            throw error;
        }
    },
    
    authenticate: async (userData) => {
        console.log('Sending auth data to backend:', userData);
        return apiCall('/api/auth/google', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
};

// Experts API
export const expertsAPI = {
    getExperts: async () => {
        console.log('Fetching experts from backend');
        try {
            const result = await apiCall('/api/experts', {
                method: 'GET'
            });
            console.log('Successfully fetched experts:', result);
            return result;
        } catch (error) {
            console.error('Failed to fetch experts:', error);
            throw new Error(`Failed to load experts: ${error.message}`);
        }
    }
};

// Backend Status API
export const statusAPI = {
    checkHealth: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }
};

// Export API base URL for use in components
export { API_BASE_URL };