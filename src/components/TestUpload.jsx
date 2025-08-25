import { useState } from 'react';
import { uploadAPI } from '../utils/api.js';

const TestUpload = () => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTestUpload = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            // Create a simple test file
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, 100, 100);
            
            canvas.toBlob(async (blob) => {
                const testFile = new File([blob], 'test-leaf.png', { type: 'image/png' });
                
                try {
                    const analysisResult = await uploadAPI.analyzeImage(testFile);
                    setResult(analysisResult);
                } catch (err) {
                    setError(err.message);
                }
                setIsLoading(false);
            });
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">Test Upload Functionality</h5>
                <button 
                    onClick={handleTestUpload}
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Testing...' : 'Test Upload'}
                </button>
                
                {error && (
                    <div className="alert alert-danger mt-3">
                        Error: {error}
                    </div>
                )}
                
                {result && (
                    <div className="alert alert-success mt-3">
                        <h6>Test Result:</h6>
                        <p><strong>Disease:</strong> {result.disease}</p>
                        <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
                        <p><strong>Treatment:</strong> {result.treatment}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestUpload;