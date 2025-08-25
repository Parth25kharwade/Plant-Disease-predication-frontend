import { useState } from 'react';
import { uploadAPI, authAPI, expertsAPI, statusAPI } from '../utils/api.js';

const ApiConnectionTester = () => {
    const [testResults, setTestResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const testEndpoint = async (name, testFunction) => {
        setTestResults(prev => ({ ...prev, [name]: { status: 'testing', message: 'Testing...' } }));
        
        try {
            const result = await testFunction();
            setTestResults(prev => ({ 
                ...prev, 
                [name]: { 
                    status: 'success', 
                    message: 'Connected successfully',
                    data: result
                } 
            }));
        } catch (error) {
            setTestResults(prev => ({ 
                ...prev, 
                [name]: { 
                    status: 'error', 
                    message: error.message,
                    error: error
                } 
            }));
        }
    };

    const testAllEndpoints = async () => {
        setIsLoading(true);
        setTestResults({});

        // Test health endpoint
        await testEndpoint('health', () => statusAPI.checkHealth());

        // Test experts endpoint
        await testEndpoint('experts', () => expertsAPI.getExperts());

        // Test upload endpoint with a dummy file
        await testEndpoint('upload', async () => {
            // Create a small test image file
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(0, 0, 100, 100);
            
            return new Promise((resolve) => {
                canvas.toBlob(async (blob) => {
                    const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
                    try {
                        const result = await uploadAPI.analyzeImage(testFile);
                        resolve(result);
                    } catch (error) {
                        throw error;
                    }
                }, 'image/png');
            });
        });

        // Test auth endpoint (this will likely fail without proper credentials, but we can test connectivity)
        await testEndpoint('auth', async () => {
            try {
                return await authAPI.googleAuth('test-credential');
            } catch (error) {
                // If it's a 400 error (bad request), the endpoint is reachable
                if (error.message.includes('400')) {
                    return { message: 'Endpoint reachable (expected auth error)' };
                }
                throw error;
            }
        });

        setIsLoading(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'testing': return '🔄';
            default: return '⚪';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'text-success';
            case 'error': return 'text-danger';
            case 'testing': return 'text-warning';
            default: return 'text-muted';
        }
    };

    return (
        <div className="card shadow-lg border-0 glass-morph">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-wifi me-2"></i>
                    API Connection Tester
                </h5>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <button 
                        className="btn btn-primary"
                        onClick={testAllEndpoints}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Testing All Endpoints...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Test All API Endpoints
                            </>
                        )}
                    </button>
                </div>

                <div className="row">
                    {[
                        { key: 'health', name: 'Health Check', endpoint: 'GET /api/health' },
                        { key: 'experts', name: 'Experts', endpoint: 'GET /api/experts' },
                        { key: 'upload', name: 'Image Upload', endpoint: 'POST /api/upload' },
                        { key: 'auth', name: 'Google Auth', endpoint: 'POST /api/auth/google' }
                    ].map(({ key, name, endpoint }) => (
                        <div key={key} className="col-md-6 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="card-title">
                                        {getStatusIcon(testResults[key]?.status)} {name}
                                    </h6>
                                    <p className="card-text">
                                        <small className="text-muted">{endpoint}</small>
                                    </p>
                                    <div className={`small ${getStatusColor(testResults[key]?.status)}`}>
                                        {testResults[key]?.message || 'Not tested yet'}
                                    </div>
                                    {testResults[key]?.data && (
                                        <details className="mt-2">
                                            <summary className="text-muted small">Response Data</summary>
                                            <pre className="small mt-1" style={{ fontSize: '0.7rem' }}>
                                                {JSON.stringify(testResults[key].data, null, 2)}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-3">
                    <h6>Backend Configuration:</h6>
                    <ul className="list-unstyled small">
                        <li><strong>Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}</li>
                        <li><strong>Expected Endpoints:</strong></li>
                        <li className="ms-3">• GET /api/health - Server health check</li>
                        <li className="ms-3">• GET /api/experts - Get expert information</li>
                        <li className="ms-3">• POST /api/upload - Plant disease detection</li>
                        <li className="ms-3">• POST /api/auth/google - Google authentication</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ApiConnectionTester;