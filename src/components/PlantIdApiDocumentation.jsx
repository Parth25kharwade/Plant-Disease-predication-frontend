import React from 'react';

const PlantIdApiDocumentation = () => {
    return (
        <div className="card shadow-lg border-0 glass-morph mb-4">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-book me-2"></i>
                    Plant.id API Setup Guide
                </h5>
                <small className="text-muted">How to configure and use the Plant.id API</small>
            </div>
            <div className="card-body">
                <div className="alert alert-info">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    <strong>401 Unauthorized Error Solution</strong>: The 401 error occurs when making requests to the Plant.id API without a valid API key.
                </div>

                <h6 className="mt-4 mb-3">
                    <i className="bi bi-1-circle me-2"></i>
                    Get a Plant.id API Key
                </h6>
                <ol className="mb-4">
                    <li>Visit <a href="https://web.plant.id/plant-identification-api/" target="_blank" rel="noopener noreferrer">Plant.id</a> and sign up for an account</li>
                    <li>Subscribe to a plan or start with the free tier</li>
                    <li>Navigate to your dashboard and copy your API key</li>
                </ol>

                <h6 className="mb-3">
                    <i className="bi bi-2-circle me-2"></i>
                    Configure Your Environment
                </h6>
                <div className="bg-light p-3 rounded mb-4">
                    <p className="mb-2">Add your API key to the <code>.env</code> file:</p>
                    <pre className="mb-0 bg-dark text-light p-2 rounded">
                        VITE_PLANT_ID_API_KEY=your_api_key_here
                    </pre>
                </div>

                <h6 className="mb-3">
                    <i className="bi bi-3-circle me-2"></i>
                    Backend Implementation
                </h6>
                <div className="bg-light p-3 rounded mb-4">
                    <p className="mb-2">In your backend code, use the API key when making requests to Plant.id:</p>
                    <pre className="mb-0 bg-dark text-light p-2 rounded" style={{ fontSize: '0.8rem' }}>
{`// Example Node.js implementation
const plantIdApiKey = process.env.PLANT_ID_API_KEY;

app.post('/api/upload', async (req, res) => {
  try {
    // Process the uploaded image...
    
    // Make request to Plant.id API
    const response = await fetch('https://api.plant.id/v2/health_assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': plantIdApiKey  // Include the API key here
      },
      body: JSON.stringify({
        images: [base64Image],
        modifiers: ["health_assessment"],
        plant_language: "en",
        disease_details: ["description", "treatment"]
      })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});`}
                    </pre>
                </div>

                <h6 className="mb-3">
                    <i className="bi bi-4-circle me-2"></i>
                    Testing Your Implementation
                </h6>
                <p>
                    Use the Plant.id API Tester component above to verify your API key works correctly.
                    If it works in the tester but not in your application, check your backend implementation.
                </p>

                <div className="alert alert-warning mt-4">
                    <i className="bi bi-shield-exclamation me-2"></i>
                    <strong>Security Note:</strong> Never expose your API key in frontend code in a production environment.
                    Always make Plant.id API calls from your backend server.
                </div>
            </div>
        </div>
    );
};

export default PlantIdApiDocumentation;