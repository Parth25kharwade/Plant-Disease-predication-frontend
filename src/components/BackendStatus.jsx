import { useState, useEffect } from 'react';
import { statusAPI, API_BASE_URL } from '../utils/api.js';

const BackendStatus = () => {
    const [status, setStatus] = useState('checking');
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const result = await statusAPI.checkHealth();
                setStatus('connected');
                setError(null);
            } catch (err) {
                setStatus('error');
                if (err.name === 'AbortError') {
                    setError('Connection timeout - backend server not responding');
                } else if (err.message.includes('fetch')) {
                    setError(`Backend server not running on ${API_BASE_URL}`);
                } else {
                    setError(err.message);
                }
            }
        };

        // Add a small delay to avoid immediate error flash
        const timer = setTimeout(checkBackend, 1000);
        return () => clearTimeout(timer);
    }, []);

    const getStatusColor = () => {
        switch (status) {
            case 'connected': return 'success';
            case 'error': return 'danger';
            default: return 'warning';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'connected': return 'bi-check-circle-fill';
            case 'error': return 'bi-x-circle-fill';
            default: return 'bi-clock-fill';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'connected': return 'Backend Connected';
            case 'error': return 'Backend Disconnected';
            default: return 'Checking Backend...';
        }
    };

    return (
        <div className={`alert alert-${getStatusColor()} d-flex align-items-center`} role="alert">
            <i className={`bi ${getStatusIcon()} me-2`}></i>
            <div>
                <strong>{getStatusText()}</strong>
                {error && (
                    <div className="small mt-1">
                        Error: {error}
                    </div>
                )}
                {status === 'connected' && (
                    <div className="small mt-1">
                        Successfully connected to backend at {API_BASE_URL}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BackendStatus;