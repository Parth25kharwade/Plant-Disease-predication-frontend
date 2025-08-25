import { useState } from 'react';
import { uploadAPI, authAPI, googleAuthAPI, expertsAPI, statusAPI } from '../utils/api.js';

const ApiTester = () => {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState({});

    const testEndpoint = async (name, testFunction) => {
        setLoading(prev => ({ ...prev, [name]: true }));
        try {
            console.log(`Testing ${name} API...`);
            const result = await testFunction();
            console.log(`${name} API success:`, result);
            setResults(prev => ({ 
                ...prev, 
                [name]: { success: true, data: result, error: null } 
            }));
        } catch (error) {
            console.error(`${name} API failed:`, error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            setResults(prev => ({ 
                ...prev, 
                [name]: { success: false, data: null, error: error.message } 
            }));
        } finally {
            setLoading(prev => ({ ...prev, [name]: false }));
        }
    };

    const testHealthCheck = () => {
        testEndpoint('health', () => statusAPI.checkHealth());
    };

    const testExpertsAPI = () => {
        testEndpoint('experts', () => expertsAPI.getExperts());
    };

    const testUploadAPI = () => {
        // Create a small test image file
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, 0, 100, 100);
        
        canvas.toBlob((blob) => {
            const testFile = new File([blob], 'test-leaf.png', { type: 'image/png' });
            console.log('Testing upload with file:', testFile);
            testEndpoint('upload', () => uploadAPI.analyzeImage(testFile));
        }, 'image/png');
    };

    const testGoogleAuth = () => {
        // Test with mock data to see if endpoint is reachable
        const mockUserData = {
            email: 'test@example.com',
            name: 'Test User',
            picture: 'https://via.placeholder.com/150',
            access_token: 'mock_access_token'
        };
        
        console.log('Testing Google auth with mock data:', mockUserData);
        testEndpoint('auth', () => googleAuthAPI.authenticate(mockUserData));
    };

    const getStatusIcon = (name) => {
        if (loading[name]) return 'bi-hourglass-split text-warning';
        if (!results[name]) return 'bi-circle text-muted';
        return results[name].success ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger';
    };

    return (
        <div className="card shadow-lg border-0 glass-morph">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-gear me-2"></i>
                    API Connection Tester
                </h5>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    {/* Health Check */}
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <strong>Health Check</strong>
                                <br />
                                <small className="text-muted">GET /api/health</small>
                            </div>
                            <div className="text-end">
                                <i className={`bi ${getStatusIcon('health')} fs-4`}></i>
                                <br />
                                <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={testHealthCheck}
                                    disabled={loading.health}
                                >
                                    {loading.health ? 'Testing...' : 'Test'}
                                </button>
                            </div>
                        </div>
                        {results.health && (
                            <div className={`mt-2 p-2 rounded ${results.health.success ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                                <small>
                                    {results.health.success 
                                        ? `✓ Connected: ${JSON.stringify(results.health.data)}`
                                        : `✗ Error: ${results.health.error}`
                                    }
                                </small>
                            </div>
                        )}
                    </div>

                    {/* Upload API */}
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <strong>Plant Disease Detection</strong>
                                <br />
                                <small className="text-muted">POST /api/upload</small>
                            </div>
                            <div className="text-end">
                                <i className={`bi ${getStatusIcon('upload')} fs-4`}></i>
                                <br />
                                <button 
                                    className="btn btn-sm btn-outline-success"
                                    onClick={testUploadAPI}
                                    disabled={loading.upload}
                                >
                                    {loading.upload ? 'Testing...' : 'Test'}
                                </button>
                            </div>
                        </div>
                        {results.upload && (
                            <div className={`mt-2 p-2 rounded ${results.upload.success ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                                <small>
                                    {results.upload.success 
                                        ? `✓ Upload works: ${JSON.stringify(results.upload.data).substring(0, 100)}...`
                                        : `✗ Error: ${results.upload.error}`
                                    }
                                </small>
                            </div>
                        )}
                    </div>

                    {/* Google Auth */}
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <strong>Google Authentication</strong>
                                <br />
                                <small className="text-muted">POST /api/auth/google</small>
                            </div>
                            <div className="text-end">
                                <i className={`bi ${getStatusIcon('auth')} fs-4`}></i>
                                <br />
                                <button 
                                    className="btn btn-sm btn-outline-info"
                                    onClick={testGoogleAuth}
                                    disabled={loading.auth}
                                >
                                    {loading.auth ? 'Testing...' : 'Test'}
                                </button>
                            </div>
                        </div>
                        {results.auth && (
                            <div className={`mt-2 p-2 rounded bg-info bg-opacity-10`}>
                                <small>
                                    ℹ️ Auth endpoint ready - requires real Google credential
                                </small>
                            </div>
                        )}
                    </div>

                    {/* Experts API */}
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <strong>Experts Information</strong>
                                <br />
                                <small className="text-muted">GET /api/experts</small>
                            </div>
                            <div className="text-end">
                                <i className={`bi ${getStatusIcon('experts')} fs-4`}></i>
                                <br />
                                <button 
                                    className="btn btn-sm btn-outline-warning"
                                    onClick={testExpertsAPI}
                                    disabled={loading.experts}
                                >
                                    {loading.experts ? 'Testing...' : 'Test'}
                                </button>
                            </div>
                        </div>
                        {results.experts && (
                            <div className={`mt-2 p-2 rounded ${results.experts.success ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                                <small>
                                    {results.experts.success 
                                        ? `✓ Found ${Array.isArray(results.experts.data) ? results.experts.data.length : 'N/A'} experts`
                                        : `✗ Error: ${results.experts.error}`
                                    }
                                </small>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            testHealthCheck();
                            testExpertsAPI();
                            testUploadAPI();
                            testGoogleAuth();
                        }}
                        disabled={Object.values(loading).some(Boolean)}
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Test All APIs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiTester;