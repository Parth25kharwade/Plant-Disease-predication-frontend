import { useState } from 'react';

const DirectApiTest = () => {
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const testDirectUpload = async () => {
        setIsLoading(true);
        setTestResult(null);

        try {
            // Create a simple test image
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(0, 0, 100, 100);
            
            canvas.toBlob(async (blob) => {
                const testFile = new File([blob], 'test-plant.png', { type: 'image/png' });
                const formData = new FormData();
                formData.append('file', testFile);

                console.log('=== DIRECT API TEST START ===');
                console.log('Testing direct fetch to: http://localhost:8080/api/upload');
                
                try {
                    const response = await fetch('http://localhost:8080/api/upload', {
                        method: 'POST',
                        body: formData
                    });

                    console.log('Response status:', response.status);
                    console.log('Response ok:', response.ok);
                    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Error response:', errorText);
                        throw new Error(`HTTP ${response.status}: ${errorText}`);
                    }

                    const contentType = response.headers.get('content-type');
                    console.log('Content-Type:', contentType);

                    let result;
                    if (contentType && contentType.includes('application/json')) {
                        result = await response.json();
                        console.log('JSON result:', result);
                    } else {
                        result = await response.text();
                        console.log('Text result:', result);
                    }

                    console.log('=== DIRECT API TEST SUCCESS ===');

                    setTestResult({
                        success: true,
                        status: response.status,
                        contentType: contentType,
                        result: result,
                        resultType: typeof result,
                        headers: Object.fromEntries(response.headers.entries())
                    });

                } catch (error) {
                    console.error('=== DIRECT API TEST ERROR ===');
                    console.error('Error:', error);
                    
                    setTestResult({
                        success: false,
                        error: error.message,
                        errorType: error.name
                    });
                }

                setIsLoading(false);
            }, 'image/png');

        } catch (error) {
            console.error('Canvas error:', error);
            setTestResult({
                success: false,
                error: error.message,
                errorType: error.name
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="card shadow-lg border-0 glass-morph">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-lightning me-2"></i>
                    Direct API Test
                </h5>
                <small className="text-muted">Tests direct fetch to backend without proxy</small>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <button 
                        className="btn btn-info"
                        onClick={testDirectUpload}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Testing Direct Upload...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-arrow-up-circle me-2"></i>
                                Test Direct Upload to Backend
                            </>
                        )}
                    </button>
                </div>

                {testResult && (
                    <div className="mt-3">
                        {testResult.success ? (
                            <div className="alert alert-success">
                                <h6>✅ Direct API Test Successful</h6>
                                <div className="mt-2">
                                    <strong>Response Details:</strong>
                                    <ul className="mt-2">
                                        <li><strong>Status:</strong> {testResult.status}</li>
                                        <li><strong>Content-Type:</strong> {testResult.contentType}</li>
                                        <li><strong>Result Type:</strong> {testResult.resultType}</li>
                                    </ul>
                                </div>
                                
                                <div className="mt-3">
                                    <strong>Response Headers:</strong>
                                    <pre className="bg-light p-2 mt-2 small" style={{ maxHeight: '150px', overflow: 'auto' }}>
                                        {JSON.stringify(testResult.headers, null, 2)}
                                    </pre>
                                </div>

                                <div className="mt-3">
                                    <strong>Response Body:</strong>
                                    <pre className="bg-light p-2 mt-2 small" style={{ maxHeight: '200px', overflow: 'auto' }}>
                                        {typeof testResult.result === 'object' 
                                            ? JSON.stringify(testResult.result, null, 2)
                                            : testResult.result
                                        }
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-danger">
                                <h6>❌ Direct API Test Failed</h6>
                                <div className="mt-2">
                                    <strong>Error Type:</strong> {testResult.errorType}<br/>
                                    <strong>Error Message:</strong> {testResult.error}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-3">
                    <h6>What this test does:</h6>
                    <ul className="small">
                        <li>Creates a test image file</li>
                        <li>Makes a direct POST request to http://localhost:8080/api/upload</li>
                        <li>Bypasses Vite proxy to test backend directly</li>
                        <li>Shows exact response from your backend</li>
                        <li>Helps identify if the issue is in the backend or frontend</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DirectApiTest;