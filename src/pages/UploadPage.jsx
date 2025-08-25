import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAPI } from "../utils/api.js";
import { logResponseValidation } from "../utils/responseValidator.js";
import BackendStatus from "../components/BackendStatus.jsx";
import ApiTester from "../components/ApiTester.jsx";
import ApiDebugger from "../components/ApiDebugger.jsx";
import BackendConnectivityChecker from "../components/BackendConnectivityChecker.jsx";
import PlantIdApiTester from "../components/PlantIdApiTester.jsx";
import PlantIdApiDocumentation from "../components/PlantIdApiDocumentation.jsx";
import ApiConnectionTester from "../components/ApiConnectionTester.jsx";
import UploadDebugger from "../components/UploadDebugger.jsx";
import DirectApiTest from "../components/DirectApiTest.jsx";
import TiltCard from "../components/TiltCard.jsx";
import Loading3D from "../components/Loading3D.jsx";
import InteractiveButton from "../components/InteractiveButton.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import FloatingIcons from "../components/FloatingIcons.jsx";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        setError(null);

        if (!selectedFile) {
            setFile(null);
            setPreview(null);
            return;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Please select a valid image file (JPEG, PNG, or WebP)');
            return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (selectedFile.size > maxSize) {
            setError('File size must be less than 10MB');
            return;
        }

        setFile(selectedFile);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select an image file first');
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            console.log('Starting image analysis for file:', file.name);
            const result = await uploadAPI.analyzeImage(file);

            // Use the response validator for detailed analysis
            const validation = logResponseValidation(result, 'Upload Result');

            if (!validation.isValid) {
                const errorMsg = validation.errors.join(', ');
                throw new Error(`Invalid server response: ${errorMsg}`);
            }

            // Log warnings but don't fail
            if (validation.warnings.length > 0) {
                console.warn('Response validation warnings:', validation.warnings);
            }

            // Store the result and navigate to result page
            localStorage.setItem("result", JSON.stringify(result));
            navigate("/result");
        } catch (error) {
            console.error('Upload error:', error);

            // Handle different types of errors with more specific messages
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setError('Unable to connect to the server. Please check if the backend is running on http://localhost:8080');
            } else if (error.message.includes('Network error')) {
                setError('Network connection failed. Please ensure the backend server is running on port 8080.');
            } else if (error.message.includes('404')) {
                setError('Upload endpoint not found. Please check the backend configuration at /api/upload');
            } else if (error.message.includes('413')) {
                setError('File too large. Please select a smaller image (max 10MB).');
            } else if (error.message.includes('415')) {
                setError('Unsupported file type. Please upload a JPEG, PNG, or WebP image.');
            } else if (error.message.includes('500')) {
                setError('Server error occurred while processing the image. Please try again.');
            }
            else {
                setError(`Failed to process image: ${error.message}`);
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setError(null);
        // Reset file input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="position-relative">
            <FloatingIcons icons={['📸', '🔍', '🌿', '💡']} count={5} />
            <div className="container mt-5">
                {/* Backend Status Check */}
                {/*<ScrollReveal direction="up" delay={0}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-8 col-lg-6">*/}
                {/*            <BackendStatus />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* API Connection Tester *!/*/}
                {/*<ScrollReveal direction="up" delay={100}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-10 col-lg-8">*/}
                {/*            <ApiConnectionTester />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* Upload Debugger *!/*/}
                {/*<ScrollReveal direction="up" delay={150}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-10 col-lg-8">*/}
                {/*            <UploadDebugger />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* Direct API Test *!/*/}
                {/*<ScrollReveal direction="up" delay={200}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-10 col-lg-8">*/}
                {/*            <DirectApiTest />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* API Tester *!/*/}
                {/*<ScrollReveal direction="up" delay={100}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-10 col-lg-8">*/}
                {/*            <ApiTester />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* Backend Connectivity Checker *!/*/}
                {/*<ScrollReveal direction="up" delay={200}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-10 col-lg-8">*/}
                {/*            <BackendConnectivityChecker />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* API Debugger *!/*/}
                {/*<ScrollReveal direction="up" delay={300}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-12 col-lg-10">*/}
                {/*            <ApiDebugger />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* Plant.id API Documentation *!/*/}
                {/*<ScrollReveal direction="up" delay={400}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-12 col-lg-10">*/}
                {/*            <PlantIdApiDocumentation />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                {/*/!* Plant.id API Tester *!/*/}
                {/*<ScrollReveal direction="up" delay={500}>*/}
                {/*    <div className="row justify-content-center mb-4">*/}
                {/*        <div className="col-md-12 col-lg-10">*/}
                {/*            <PlantIdApiTester />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ScrollReveal>*/}

                <ScrollReveal direction="scale" delay={200}>
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <TiltCard intensity={10}>
                                <div className="card shadow-lg border-0 glass-morph animated-border">
                                    <div className="card-body p-4">
                                        <h2 className="card-title text-center mb-4 gradient-text">
                                            <i className="bi bi-cloud-upload me-2 wobble"></i>
                                            Upload Plant Leaf Image
                                        </h2>

                                        {/* Error Alert */}
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                {error}
                                            </div>
                                        )}

                                        {/* File Input Section */}
                                        <div className="mb-4">
                                            <label htmlFor="fileInput" className="form-label">
                                                Select an image of a plant leaf for disease analysis
                                            </label>
                                            <input
                                                id="fileInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="form-control"
                                                disabled={isAnalyzing}
                                            />
                                            <div className="form-text">
                                                Supported formats: JPEG, PNG, WebP (max 10MB)
                                            </div>
                                        </div>

                                        {/* Preview Section */}
                                        {preview && (
                                            <ScrollReveal direction="scale" delay={100}>
                                                <div className="mb-4 text-center">
                                                    <div className="position-relative d-inline-block">
                                                        <TiltCard intensity={8}>
                                                            <div className="morph-blob position-absolute" style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                top: '0',
                                                                left: '0',
                                                                zIndex: -1,
                                                                opacity: 0.2
                                                            }}></div>
                                                            <img
                                                                src={preview}
                                                                alt="Preview"
                                                                className="img-fluid rounded shadow-lg breathe zoom-blur"
                                                                style={{ maxHeight: '300px', maxWidth: '100%' }}
                                                            />
                                                        </TiltCard>
                                                        <InteractiveButton
                                                            variant="secondary"
                                                            size="sm"
                                                            effect="magnetic"
                                                            className="position-absolute top-0 end-0 m-2 btn-danger"
                                                            onClick={clearFile}
                                                            disabled={isAnalyzing}
                                                        >
                                                            <i className="bi bi-x"></i>
                                                        </InteractiveButton>
                                                    </div>
                                                    <p className="mt-2 text-muted fade-in">
                                                        <i className="bi bi-file-earmark-image me-1"></i>
                                                        {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)
                                                    </p>
                                                </div>
                                            </ScrollReveal>
                                        )}

                                        {/* Buttons Section */}
                                        <div className="d-grid gap-2">
                                            <InteractiveButton
                                                onClick={handleUpload}
                                                variant="primary"
                                                size="lg"
                                                effect="morph"
                                                className="ripple"
                                                disabled={!file || isAnalyzing}
                                            >
                                                {isAnalyzing ? (
                                                    <>
                                                        <Loading3D size={20} color="#ffffff" text="" />
                                                        <span className="ms-2">Analyzing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-search me-2"></i>
                                                        Analyze Plant Disease
                                                    </>
                                                )}
                                            </InteractiveButton>

                                            {file && !isAnalyzing && (
                                                <InteractiveButton
                                                    onClick={clearFile}
                                                    variant="secondary"
                                                    effect="skew"
                                                >
                                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                                    Choose Different Image
                                                </InteractiveButton>
                                            )}
                                        </div>

                                        <div className="mt-4 text-center">
                                            <small className="text-muted">
                                                <i className="bi bi-info-circle me-1"></i>
                                                For best results, upload a clear image of a single leaf with good lighting
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default UploadPage;
