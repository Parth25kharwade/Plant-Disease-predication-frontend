import { useState } from 'react';
import { uploadAPI } from '../utils/api.js';

const UploadDebugger = () => {
    const [debugInfo, setDebugInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const testUpload = async () => {
        setIsLoading(true);
        setDebugInfo(null);

        try {
            // Create a small test image
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(0, 0, 100, 100);
            
            canvas.toBlob(async (blob) => {
                const testFile = new File([blob], 'test-plant.png', { type: 'image/png' });
                
                try {
                    console.log('=== UPLOAD DEBUG START ===');
                    console.log('Test file:', testFile);
                    
                    const result = await uploadAPI.analyzeImage(testFile);
                    
                    console.log('=== UPLOAD DEBUG RESULT ===');
                    console.log('Raw result:', result);
                    console.log('Result type:', typeof result);
                    console.log('Result keys:', result ? Object.keys(result) : 'No keys');
                    console.log('=== UPLOAD DEBUG END ===');
                    
                    setDebugInfo({
                        success: true,
                        result: result,
                        resultType: typeof result,
                        resultKeys: result ? Object.keys(result) : [],
                        isNull: result === null,
                        isUndefined: result === undefined,
                        isEmpty: result && Object.keys(result).length === 0,
                        stringified: JSON.stringify(result, null, 2)
                    });
                } catch (error) {
                    console.error('=== UPLOAD DEBUG ERROR ===');
                    console.error('Error:', error);
                    console.error('Error message:', error.message);
                    console.error('Error stack:', error.stack);
                    console.error('=== UPLOAD DEBUG ERROR END ===');
                    
                    setDebugInfo({
                        success: false,
                        error: error.message,
                        errorType: error.name,
                        fullError: error
                    });
                }
                
                setIsLoading(false);
            }, 'image/png');
        } catch (error) {
            setDebugInfo({
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
                    <i className="bi bi-bug me-2"></i>
                    Upload Debugger
                </h5>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <button 
                        className="btn btn-warning"
                        onClick={testUpload}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Testing Upload...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-upload me-2"></i>
                                Test Upload with Debug Info
                            </>
                        )}
                    </button>
                </div>

                {debugInfo && (
                    <div className="mt-3">
                        <h6>Debug Information:</h6>
                        {debugInfo.success ? (
                            <div className="alert alert-success">
                                <h6>✅ Upload Successful</h6>
                                <div className="mt-2">
                                    <strong>Result Analysis:</strong>
                                    <ul className="mt-2">
                                        <li><strong>Type:</strong> {debugInfo.resultType}</li>
                                        <li><strong>Is Null:</strong> {debugInfo.isNull ? 'Yes' : 'No'}</li>
                                        <li><strong>Is Undefined:</strong> {debugInfo.isUndefined ? 'Yes' : 'No'}</li>
                                        <li><strong>Is Empty Object:</strong> {debugInfo.isEmpty ? 'Yes' : 'No'}</li>
                                        <li><strong>Keys:</strong> {debugInfo.resultKeys.join(', ') || 'None'}</li>
                                    </ul>
                                </div>
                                <div className="mt-3">
                                    <strong>Raw Response:</strong>
                                    <pre className="bg-light p-2 mt-2 small" style={{ maxHeight: '200px', overflow: 'auto' }}>
                                        {debugInfo.stringified}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-danger">
                                <h6>❌ Upload Failed</h6>
                                <div className="mt-2">
                                    <strong>Error Type:</strong> {debugInfo.errorType}<br/>
                                    <strong>Error Message:</strong> {debugInfo.error}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-3">
                    <h6>Expected Backend Response Format:</h6>
                    <pre className="bg-light p-2 small">
{`{
  "disease": "Disease Name",
  "confidence": 0.85,
  "treatment": "Treatment recommendation",
  "description": "Disease description"
}`}
                    </pre>
                </div>

                <div className="mt-3">
                    <h6>Troubleshooting Steps:</h6>
                    <ol className="small">
                        <li>Check if backend is running on port 8080</li>
                        <li>Verify /api/upload endpoint exists and accepts POST with multipart/form-data</li>
                        <li>Check backend logs for any processing errors</li>
                        <li>Ensure backend returns valid JSON response</li>
                        <li>Check CORS configuration allows file uploads</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default UploadDebugger;