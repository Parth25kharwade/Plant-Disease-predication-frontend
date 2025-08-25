import { useState, useEffect } from 'react';

const PlantIdApiTester = () => {
    const [apiKey, setApiKey] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [testImage, setTestImage] = useState(null);

    // Initialize with environment variable if available
    useEffect(() => {
        const envApiKey = import.meta.env.VITE_PLANT_ID_API_KEY;
        if (envApiKey) {
            setApiKey(envApiKey);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setTestImage(file);
        }
    };

    const testPlantIdApi = async () => {
        if (!apiKey) {
            setError('Please enter your Plant.id API key');
            return;
        }

        if (!testImage) {
            setError('Please select a test image');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Convert image to base64
            const base64Image = await fileToBase64(testImage);

            // Prepare request to Plant.id API
            const data = {
                images: [base64Image.split(',')[1]],
                modifiers: ["health_assessment"],
                plant_language: "en",
                disease_details: ["description", "treatment"]
            };

            // Make request to Plant.id API
            const response = await fetch('https://api.plant.id/v2/health_assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': apiKey
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const responseData = await response.json();
            setResult(responseData);
        } catch (err) {
            console.error('Plant.id API test failed:', err);
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="card shadow-lg border-0 glass-morph">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-plant me-2"></i>
                    Plant.id API Tester
                </h5>
                <small className="text-muted">Test direct connection to the Plant.id API</small>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="apiKey" className="form-label">Plant.id API Key</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="apiKey" 
                        value={apiKey} 
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Plant.id API key"
                    />
                    <div className="form-text">
                        You can get an API key from <a href="https://web.plant.id/plant-identification-api/" target="_blank" rel="noopener noreferrer">Plant.id</a>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="testImage" className="form-label">Test Image</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="testImage" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <button 
                    className="btn btn-primary"
                    onClick={testPlantIdApi}
                    disabled={loading || !apiKey || !testImage}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Testing...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-send me-2"></i>
                            Test Plant.id API
                        </>
                    )}
                </button>

                {result && (
                    <div className="mt-4">
                        <h6>API Response:</h6>
                        <pre className="bg-light p-3 rounded" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}

                <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
                    <h6 className="text-info mb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        Troubleshooting 401 Unauthorized Errors
                    </h6>
                    <ul className="mb-0 small">
                        <li><strong>Invalid API Key:</strong> Make sure your API key is correct and active</li>
                        <li><strong>API Key Format:</strong> The API key should be passed in the 'Api-Key' header</li>
                        <li><strong>Subscription:</strong> Ensure your Plant.id subscription is active</li>
                        <li><strong>Rate Limits:</strong> Check if you've exceeded your API call limits</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlantIdApiTester;
