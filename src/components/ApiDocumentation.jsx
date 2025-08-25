import { useState } from 'react';

const ApiDocumentation = () => {
    const [activeTab, setActiveTab] = useState('upload');

    const apiEndpoints = {
        upload: {
            title: 'Plant Disease Detection',
            method: 'POST',
            endpoint: '/api/upload',
            description: 'Upload a plant leaf image for disease analysis',
            requestFormat: 'FormData with file field',
            responseFormat: 'JSON with analysis results',
            example: `// Using the uploadAPI
import { uploadAPI } from '../utils/api.js';

const analyzeImage = async (file) => {
    try {
        const result = await uploadAPI.analyzeImage(file);
        console.log('Analysis result:', result);
        // Expected response:
        // {
        //   disease: "Leaf Spot",
        //   confidence: 0.95,
        //   treatment: "Apply fungicide...",
        //   severity: "moderate"
        // }
    } catch (error) {
        console.error('Upload failed:', error);
    }
};`
        },
        auth: {
            title: 'Google Authentication',
            method: 'POST',
            endpoint: '/api/auth/google',
            description: 'Authenticate user with Google OAuth',
            requestFormat: 'JSON with Google credential or user data',
            responseFormat: 'JSON with user info and JWT token',
            example: `// Using the authAPI
import { authAPI } from '../utils/api.js';

const authenticateUser = async (credential) => {
    try {
        const result = await authAPI.googleAuth(credential);
        console.log('Auth result:', result);
        // Expected response:
        // {
        //   user: { id, email, name, picture },
        //   token: "jwt_token_here"
        // }
    } catch (error) {
        console.error('Auth failed:', error);
    }
};

// Or using googleAuthAPI for more control
import { googleAuthAPI } from '../utils/api.js';

const handleGoogleLogin = async (accessToken) => {
    try {
        const userInfo = await googleAuthAPI.getUserInfo(accessToken);
        const authResult = await googleAuthAPI.authenticate(userInfo);
    } catch (error) {
        console.error('Google auth failed:', error);
    }
};`
        },
        experts: {
            title: 'Expert Information',
            method: 'GET',
            endpoint: '/api/experts',
            description: 'Retrieve list of plant disease experts',
            requestFormat: 'No body required',
            responseFormat: 'JSON array of expert objects',
            example: `// Using the expertsAPI
import { expertsAPI } from '../utils/api.js';

const getExperts = async () => {
    try {
        const experts = await expertsAPI.getExperts();
        console.log('Experts:', experts);
        // Expected response:
        // [
        //   {
        //     id: 1,
        //     name: "Dr. Sarah Johnson",
        //     specialty: "Plant Pathology",
        //     contact: "sarah@example.com",
        //     phone: "+1-555-0123",
        //     location: "University",
        //     experience: "15 years",
        //     rating: 4.8
        //   }
        // ]
    } catch (error) {
        console.error('Failed to fetch experts:', error);
    }
};`
        }
    };

    return (
        <div className="card shadow-lg border-0 glass-morph">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-book me-2"></i>
                    API Documentation
                </h5>
            </div>
            <div className="card-body">
                {/* Tabs */}
                <ul className="nav nav-pills mb-3" role="tablist">
                    {Object.entries(apiEndpoints).map(([key, api]) => (
                        <li className="nav-item" key={key}>
                            <button
                                className={`nav-link ${activeTab === key ? 'active' : ''}`}
                                onClick={() => setActiveTab(key)}
                            >
                                <span className={`badge me-2 ${
                                    api.method === 'POST' ? 'bg-success' : 'bg-primary'
                                }`}>
                                    {api.method}
                                </span>
                                {api.title}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Tab Content */}
                {Object.entries(apiEndpoints).map(([key, api]) => (
                    <div
                        key={key}
                        className={`tab-pane ${activeTab === key ? 'show active' : 'd-none'}`}
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="text-primary">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Endpoint Details
                                </h6>
                                <table className="table table-sm">
                                    <tbody>
                                        <tr>
                                            <td><strong>Method:</strong></td>
                                            <td>
                                                <span className={`badge ${
                                                    api.method === 'POST' ? 'bg-success' : 'bg-primary'
                                                }`}>
                                                    {api.method}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Endpoint:</strong></td>
                                            <td><code>{api.endpoint}</code></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Request:</strong></td>
                                            <td>{api.requestFormat}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Response:</strong></td>
                                            <td>{api.responseFormat}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="text-muted">{api.description}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-success">
                                    <i className="bi bi-code-slash me-2"></i>
                                    Usage Example
                                </h6>
                                <pre className="bg-dark text-light p-3 rounded" style={{ fontSize: '0.8rem', overflow: 'auto' }}>
                                    <code>{api.example}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
                    <h6 className="text-info">
                        <i className="bi bi-lightbulb me-2"></i>
                        Important Notes
                    </h6>
                    <ul className="mb-0">
                        <li>All APIs use the base URL: <code>http://localhost:8080</code></li>
                        <li>Authentication tokens are automatically included when available</li>
                        <li>File uploads support JPEG, PNG, and WebP formats (max 10MB)</li>
                        <li>Error handling is built into all API functions</li>
                        <li>The app falls back to mock data when backend is unavailable</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ApiDocumentation;