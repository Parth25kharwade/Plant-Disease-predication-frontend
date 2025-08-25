import { useState } from 'react';
import { API_BASE_URL } from '../utils/api.js';

const ApiDebugger = () => {
    const [debugResults, setDebugResults] = useState({});
    const [loading, setLoading] = useState({});

    const testRawEndpoint = async (name, url, options) => {
        setLoading(prev => ({ ...prev, [name]: true }));
        try {
            console.log(`Testing raw ${name} endpoint:`, url, options);
            const response = await fetch(url, options);
            
            const result = {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                ok: response.ok
            };

            if (response.ok) {
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        result.data = await response.json();
                    } else {
                        result.data = await response.text();
                    }
                } catch (parseError) {
                    result.data = 'Failed to parse response';
                    result.parseError = parseError.message;
                }
            } else {
                try {
                    result.errorData = await response.text();
                } catch (e) {
                    result.errorData = 'Could not read error response';
                }
            }

            setDebugResults(prev => ({
                ...prev,
                [name]: { success: response.ok, ...result }
            }));
        } catch (error) {
            console.error(`Raw ${name} test failed:`, error);
            setDebugResults(prev => ({
                ...prev,
                [name]: { 
                    success: false, 
                    error: error.message,
                    networkError: true
                }
            }));
        } finally {
            setLoading(prev => ({ ...prev, [name]: false }));
        }
    };

    const testHealthEndpoint = () => {
        testRawEndpoint('health', `${API_BASE_URL}/api/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const testUploadEndpoint = () => {
        // Create a test file
        const canvas = document.createElement('canvas');
        canvas.width = 10;
        canvas.height = 10;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(0, 0, 10, 10);
        
        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'test.png');
            
            testRawEndpoint('upload', `${API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: formData
                // No Content-Type header for FormData
            });
        }, 'image/png');
    };

    const testAuthEndpoint = () => {
        const testData = {
            email: 'test@example.com',
            name: 'Test User',
            access_token: 'test_token'
        };

        testRawEndpoint('auth', `${API_BASE_URL}/api/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
    };

    const testExpertsEndpoint = () => {
        testRawEndpoint('experts', `${API_BASE_URL}/api/experts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const renderResult = (name, result) => {
        if (!result) return null;

        return (
            <div className={`mt-2 p-3 rounded border ${result.success ? 'border-success bg-success bg-opacity-10' : 'border-danger bg-danger bg-opacity-10'}`}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>{result.success ? '✅ Success' : '❌ Failed'}</strong>
                    {result.status && (
                        <span className={`badge ${result.status < 400 ? 'bg-success' : 'bg-danger'}`}>
                            {result.status} {result.statusText}
                        </span>
                    )}
                </div>
                
                {result.networkError && (
                    <div className="alert alert-warning alert-sm mb-2">
                        <strong>Network Error:</strong> {result.error}
                    </div>
                )}

                {result.headers && (
                    <details className="mb-2">
                        <summary className="text-muted small">Response Headers</summary>
                        <pre className="small mt-1 mb-0" style={{ fontSize: '0.7rem' }}>
                            {JSON.stringify(result.headers, null, 2)}
                        </pre>
                    </details>
                )}

                {result.data && (
                    <details className="mb-2">
                        <summary className="text-muted small">Response Data</summary>
                        <pre className="small mt-1 mb-0" style={{ fontSize: '0.7rem' }}>
                            {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
                        </pre>
                    </details>
                )}

                {result.errorData && (
                    <details className="mb-2">
                        <summary className="text-danger small">Error Response</summary>
                        <pre className="small mt-1 mb-0 text-danger" style={{ fontSize: '0.7rem' }}>
                            {result.errorData}
                        </pre>
                    </details>
                )}
            </div>
        );
    };

    return (
        <div className="card shadow-lg border-0 glass-morph">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-bug me-2"></i>
                    API Raw Endpoint Debugger
                </h5>
                <small className="text-muted">Direct endpoint testing with detailed response information</small>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Health Check</strong>
                                <br />
                                <small className="text-muted">GET /api/health</small>
                            </div>
                            <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={testHealthEndpoint}
                                disabled={loading.health}
                            >
                                {loading.health ? 'Testing...' : 'Test'}
                            </button>
                        </div>
                        {renderResult('health', debugResults.health)}
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Upload API</strong>
                                <br />
                                <small className="text-muted">POST /api/upload</small>
                            </div>
                            <button 
                                className="btn btn-sm btn-outline-success"
                                onClick={testUploadEndpoint}
                                disabled={loading.upload}
                            >
                                {loading.upload ? 'Testing...' : 'Test'}
                            </button>
                        </div>
                        {renderResult('upload', debugResults.upload)}
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Google Auth</strong>
                                <br />
                                <small className="text-muted">POST /api/auth/google</small>
                            </div>
                            <button 
                                className="btn btn-sm btn-outline-info"
                                onClick={testAuthEndpoint}
                                disabled={loading.auth}
                            >
                                {loading.auth ? 'Testing...' : 'Test'}
                            </button>
                        </div>
                        {renderResult('auth', debugResults.auth)}
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Experts API</strong>
                                <br />
                                <small className="text-muted">GET /api/experts</small>
                            </div>
                            <button 
                                className="btn btn-sm btn-outline-warning"
                                onClick={testExpertsEndpoint}
                                disabled={loading.experts}
                            >
                                {loading.experts ? 'Testing...' : 'Test'}
                            </button>
                        </div>
                        {renderResult('experts', debugResults.experts)}
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => {
                            testHealthEndpoint();
                            testUploadEndpoint();
                            testAuthEndpoint();
                            testExpertsEndpoint();
                        }}
                        disabled={Object.values(loading).some(Boolean)}
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Test All Endpoints
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => setDebugResults({})}
                    >
                        <i className="bi bi-trash me-2"></i>
                        Clear Results
                    </button>
                </div>

                <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
                    <h6 className="text-info mb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        Debug Information
                    </h6>
                    <ul className="mb-0 small">
                        <li><strong>Base URL:</strong> {API_BASE_URL}</li>
                        <li><strong>CORS:</strong> Make sure your backend allows requests from this origin</li>
                        <li><strong>Content-Type:</strong> Upload uses FormData (no Content-Type header), others use application/json</li>
                        <li><strong>Network Errors:</strong> Usually indicate the backend server is not running</li>
                        <li><strong>4xx Errors:</strong> Backend is running but rejecting the request</li>
                        <li><strong>5xx Errors:</strong> Backend is running but has internal errors</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ApiDebugger;