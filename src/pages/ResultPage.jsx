import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ResultPage = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedResult = localStorage.getItem("result");
            if (!storedResult) {
                setError("No analysis result found. Please upload an image first.");
                return;
            }

            const parsedResult = JSON.parse(storedResult);
            if (!parsedResult || Object.keys(parsedResult).length === 0) {
                setError("Invalid analysis result. Please try uploading again.");
                return;
            }

            setResult(parsedResult);
        } catch (err) {
            console.error("Error parsing result:", err);
            setError("Failed to load analysis result. Please try again.");
        }
    }, []);

    const handleNewAnalysis = () => {
        localStorage.removeItem("result");
        navigate("/upload");
    };

    if (error) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow">
                            <div className="card-body text-center p-4">
                                <div className="mb-4">
                                    <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <h3 className="card-title text-warning mb-3">No Results Found</h3>
                                <p className="text-muted mb-4">{error}</p>
                                <button
                                    onClick={handleNewAnalysis}
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-cloud-upload me-2"></i>
                                    Upload New Image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow">
                            <div className="card-body text-center p-4">
                                <div className="spinner-border text-primary mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p>Loading analysis results...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const getConfidenceColor = (confidence) => {
        const percentage = confidence * 100;
        if (percentage >= 80) return 'text-success';
        if (percentage >= 60) return 'text-warning';
        return 'text-danger';
    };

    const getConfidenceIcon = (confidence) => {
        const percentage = confidence * 100;
        if (percentage >= 80) return 'bi-check-circle-fill';
        if (percentage >= 60) return 'bi-exclamation-triangle-fill';
        return 'bi-x-circle-fill';
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h2 className="card-title mb-0">
                                <i className="bi bi-clipboard-pulse me-2"></i>
                                Plant Disease Analysis Result
                            </h2>
                        </div>
                        <div className="card-body p-4">
                            {/* Disease Information */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">
                                                <i className="bi bi-bug me-2 text-danger"></i>
                                                Detected Disease
                                            </h5>
                                            <h3 className="text-primary">
                                                {result.disease || 'Unknown'}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">
                                                <i className="bi bi-speedometer2 me-2"></i>
                                                Confidence Level
                                            </h5>
                                            <h3 className={getConfidenceColor(result.confidence || 0)}>
                                                <i className={`bi ${getConfidenceIcon(result.confidence || 0)} me-2`}></i>
                                                {((result.confidence || 0) * 100).toFixed(1)}%
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Treatment Information */}
                            {result.treatment && (
                                <div className="mb-4">
                                    <div className="card border-success">
                                        <div className="card-header bg-success text-white">
                                            <h5 className="mb-0">
                                                <i className="bi bi-heart-pulse me-2"></i>
                                                Recommended Treatment
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">{result.treatment}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Additional Information */}
                            {result.description && (
                                <div className="mb-4">
                                    <div className="card border-info">
                                        <div className="card-header bg-info text-white">
                                            <h5 className="mb-0">
                                                <i className="bi bi-info-circle me-2"></i>
                                                Disease Information
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">{result.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button
                                    onClick={handleNewAnalysis}
                                    className="btn btn-primary btn-lg me-md-2"
                                >
                                    <i className="bi bi-cloud-upload me-2"></i>
                                    Analyze Another Image
                                </button>
                                <button
                                    onClick={() => navigate("/experts")}
                                    className="btn btn-outline-success btn-lg"
                                >
                                    <i className="bi bi-people me-2"></i>
                                    Consult Experts
                                </button>
                            </div>

                            {/* Disclaimer */}
                            <div className="mt-4 p-3 bg-warning bg-opacity-10 border border-warning rounded">
                                <small className="text-muted">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    <strong>Disclaimer:</strong> This analysis is for informational purposes only.
                                    For accurate diagnosis and treatment, please consult with agricultural experts or plant pathologists.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;