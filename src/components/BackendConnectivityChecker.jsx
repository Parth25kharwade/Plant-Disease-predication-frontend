import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api.js';

const BackendConnectivityChecker = () => {
    const [connectivity, setConnectivity] = useState({
        baseUrl: 'checking',
        cors: 'checking',
        endpoints: {}
    });

    useEffect(() => {
        checkConnectivity();
    }, []);

    const checkConnectivity = async () => {
        // Reset state
        setConnectivity({
            baseUrl: 'checking',
            cors: 'checking',
            endpoints: {}
        });

        // Test 1: Basic connectivity to base URL
        try {
            const response = await fetch(API_BASE_URL, { 
                method: 'GET',
                mode: 'cors'
            });
            setConnectivity(prev => ({
                ...prev,
                baseUrl: 'connected',
                cors: 'working'
            }));
        } catch (error) {
            console.error('Base URL connectivity failed:', error);
            if (error.message.includes('CORS')) {
                setConnectivity(prev => ({
                    ...prev,
                    baseUrl: 'connected',
                    cors: 'blocked'
                }));
            } else {
                setConnectivity(prev => ({
                    ...prev,
                    baseUrl: 'failed',
                    cors: 'unknown'
                }));
            }
        }

        // Test 2: Check individual endpoints
        const endpoints = [
            { name: 'health', path: '/api/health', method: 'GET' },
            { name: 'experts', path: '/api/experts', method: 'GET' },
            { name: 'upload', path: '/api/upload', method: 'POST' },
            { name: 'auth', path: '/api/auth/google', method: 'POST' }
        ];

        for (const endpoint of endpoints) {
            try {
                const options = {
                    method: endpoint.method,
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                // For POST endpoints, add minimal test data
                if (endpoint.method === 'POST') {
                    if (endpoint.name === 'upload') {
                        // Skip upload test here as it needs FormData
                        setConnectivity(prev => ({
                            ...prev,
                            endpoints: {
                                ...prev.endpoints,
                                [endpoint.name]: 'skipped'
                            }
                        }));
                        continue;
                    } else {
                        options.body = JSON.stringify({ test: true });
                    }
                }

                const response = await fetch(`${API_BASE_URL}${endpoint.path}`, options);
                
                setConnectivity(prev => ({
                    ...prev,
                    endpoints: {
                        ...prev.endpoints,
                        [endpoint.name]: {
                            status: response.status,
                            ok: response.ok,
                            statusText: response.statusText
                        }
                    }
                }));
            } catch (error) {
                console.error(`Endpoint ${endpoint.name} failed:`, error);
                setConnectivity(prev => ({
                    ...prev,
                    endpoints: {
                        ...prev.endpoints,
                        [endpoint.name]: {
                            error: error.message,
                            failed: true
                        }
                    }
                }));
            }
        }
    };

    const getStatusColor = (status) => {
        if (status === 'connected' || status === 'working') return 'success';
        if (status === 'checking') return 'warning';
        if (status === 'blocked') return 'danger';
        return 'secondary';
    };

    const getEndpointStatus = (endpoint) => {
        if (!endpoint) return { color: 'secondary', text: 'Not tested' };
        if (endpoint === 'skipped') return { color: 'info', text: 'Skipped' };
        if (endpoint.failed) return { color: 'danger', text: `Failed: ${endpoint.error}` };
        if (endpoint.ok) return { color: 'success', text: `${endpoint.status} ${endpoint.statusText}` };
        return { color: 'warning', text: `${endpoint.status} ${endpoint.statusText}` };
    };

    return (
        <div className="card shadow-lg border-0 glass-morph">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-wifi me-2"></i>
                    Backend Connectivity Checker
                </h5>
                <small className="text-muted">Diagnose connection issues with the backend server</small>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    {/* Base Connectivity */}
                    <div className="col-md-6">
                        <div className="card border-0 bg-light h-100">
                            <div className="card-body">
                                <h6 className="card-title">
                                    <i className="bi bi-server me-2"></i>
                                    Base URL Connectivity
                                </h6>
                                <div className="d-flex align-items-center">
                                    <span className={`badge bg-${getStatusColor(connectivity.baseUrl)} me-2`}>
                                        {connectivity.baseUrl}
                                    </span>
                                    <small className="text-muted">{API_BASE_URL}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CORS Status */}
                    <div className="col-md-6">
                        <div className="card border-0 bg-light h-100">
                            <div className="card-body">
                                <h6 className="card-title">
                                    <i className="bi bi-shield-check me-2"></i>
                                    CORS Status
                                </h6>
                                <div className="d-flex align-items-center">
                                    <span className={`badge bg-${getStatusColor(connectivity.cors)} me-2`}>
                                        {connectivity.cors}
                                    </span>
                                    <small className="text-muted">
                                        {connectivity.cors === 'blocked' ? 'CORS policy blocking requests' : 'Cross-origin requests allowed'}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Endpoints Status */}
                    <div className="col-12">
                        <div className="card border-0 bg-light">
                            <div className="card-body">
                                <h6 className="card-title">
                                    <i className="bi bi-list-check me-2"></i>
                                    API Endpoints Status
                                </h6>
                                <div className="row g-2">
                                    {Object.entries(connectivity.endpoints).map(([name, status]) => {
                                        const statusInfo = getEndpointStatus(status);
                                        return (
                                            <div key={name} className="col-md-6">
                                                <div className="d-flex justify-content-between align-items-center p-2 rounded bg-white">
                                                    <span className="fw-medium">/api/{name}</span>
                                                    <span className={`badge bg-${statusInfo.color}`}>
                                                        {statusInfo.text}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button 
                        className="btn btn-primary"
                        onClick={checkConnectivity}
                        disabled={connectivity.baseUrl === 'checking'}
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Recheck Connectivity
                    </button>
                </div>

                {/* Troubleshooting Tips */}
                <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
                    <h6 className="text-info mb-2">
                        <i className="bi bi-lightbulb me-2"></i>
                        Troubleshooting Tips
                    </h6>
                    <ul className="mb-0 small">
                        <li><strong>Base URL Failed:</strong> Backend server is not running on {API_BASE_URL}</li>
                        <li><strong>CORS Blocked:</strong> Backend needs to allow requests from this origin</li>
                        <li><strong>404 Errors:</strong> Endpoint doesn't exist on the backend</li>
                        <li><strong>405 Errors:</strong> HTTP method not allowed for this endpoint</li>
                        <li><strong>500 Errors:</strong> Backend server error - check backend logs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BackendConnectivityChecker;